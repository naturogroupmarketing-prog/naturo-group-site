/* The quick-quote form.
 *
 * Plain JavaScript, no framework — matching the rest of this site, and keeping
 * the page fast on a phone on mobile data, which is where most of these
 * enquiries are actually filled in.
 *
 * Three things here are load-bearing and easy to break:
 *
 *   1. THE QUESTIONS COME FROM THE SERVER. Services, extras, property types and
 *      the consent wording are fetched from the AI Reception app's own
 *      catalogue. Hard-coding them here would mean adding a service in one
 *      place and quietly not offering it in the other.
 *
 *   2. ANSWERS ARE PRESERVED. Everything typed is mirrored to localStorage, so
 *      a phone call mid-form, an accidental back-swipe or a dropped connection
 *      does not cost somebody the four questions they already answered. It is
 *      cleared the moment the enquiry is submitted.
 *
 *   3. THE SUBMISSION IS IDEMPOTENT. One key is generated per form session and
 *      reused on every retry, so a double tap or a retried request produces one
 *      enquiry rather than two.
 */
(function () {
  'use strict';

  var form = document.getElementById('qfForm');
  if (!form) return;

  var BASE = form.getAttribute('data-funnel-base') || '';
  var STORAGE_KEY = 'naturo.quote.draft.v1';
  var SESSION_KEY = 'naturo.quote.session.v1';

  var state = {
    step: 1,
    totalSteps: 5,
    config: null,
    service: null,
    photoIds: [],
    submissionKey: null,
    submitting: false,
  };

  // ── Small helpers ─────────────────────────────────────────────────────────
  var $ = function (id) { return document.getElementById(id); };
  var $$ = function (sel) { return Array.prototype.slice.call(form.querySelectorAll(sel)); };

  function uid() {
    try { return crypto.randomUUID(); }
    catch (e) { return 'k_' + Date.now() + '_' + Math.random().toString(36).slice(2); }
  }

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function drop(key) {
    try { localStorage.removeItem(key); } catch (e) { /* nothing to do */ }
  }

  /* A per-visitor id for the funnel counter. Opaque and meaningless outside
   * that table — no name, no address, nothing that identifies a person. */
  function sessionKey() {
    var k = read(SESSION_KEY);
    if (!k) { k = uid(); store(SESSION_KEY, k); }
    return k;
  }

  state.submissionKey = read(STORAGE_KEY + '.key') || uid();
  store(STORAGE_KEY + '.key', state.submissionKey);

  // ── Attribution, read once from the URL and the referrer ──────────────────
  function attribution() {
    var p = new URLSearchParams(location.search);
    var ref = '';
    try { ref = document.referrer ? new URL(document.referrer).hostname : ''; } catch (e) { ref = ''; }
    return {
      source: p.get('utm_source') || (ref && ref.indexOf(location.hostname) === -1 ? ref : '') || '',
      medium: p.get('utm_medium') || '',
      campaign: p.get('utm_campaign') || '',
      term: p.get('utm_term') || '',
      landingPage: location.pathname + location.search,
      referrerHost: ref,
      gclid: p.get('gclid') || '',
    };
  }

  /* Fire-and-forget. keepalive so the beacon still goes out if the person
   * navigates away in the same moment — which is exactly when an abandonment
   * happens, and exactly the event worth counting. */
  function track(type, extra) {
    if (!BASE) return;
    var body = Object.assign(
      { type: type, sessionKey: sessionKey(), landingPage: location.pathname, service: state.service ? state.service.slug : null },
      attribution(),
      extra || {}
    );
    try {
      fetch(BASE + '/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      }).catch(function () {});
    } catch (e) { /* analytics must never break the form */ }
  }

  // ── Draft persistence ─────────────────────────────────────────────────────
  function saveDraft() {
    var data = {};
    $$('input, select, textarea').forEach(function (el) {
      if (!el.name || el.type === 'file' || el.name === '_gotcha') return;
      data[el.name] = el.type === 'checkbox' ? el.checked : el.value;
    });
    data.__service = state.service ? state.service.slug : null;
    data.__step = state.step;
    store(STORAGE_KEY, JSON.stringify(data));
  }

  function restoreDraft() {
    var raw = read(STORAGE_KEY);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch (e) { return null; }
  }

  // ── Rendering ─────────────────────────────────────────────────────────────
  function fillSelect(el, options, placeholder) {
    if (!el) return;
    el.innerHTML = '';
    if (placeholder) {
      var blank = document.createElement('option');
      blank.value = '';
      blank.textContent = placeholder;
      el.appendChild(blank);
    }
    options.forEach(function (o) {
      var opt = document.createElement('option');
      opt.value = o.value;
      opt.textContent = o.label;
      el.appendChild(opt);
    });
  }

  function renderServices(cfg) {
    var wrap = $('qfServices');
    wrap.innerHTML = '';
    cfg.services.forEach(function (s) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'qf-option';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', 'false');
      b.dataset.service = s.slug;
      b.innerHTML =
        '<span class="qf-option-title"></span><span class="qf-option-desc"></span>';
      b.querySelector('.qf-option-title').textContent = s.name;
      b.querySelector('.qf-option-desc').textContent = s.summary;
      b.addEventListener('click', function () { chooseService(s.slug); });
      wrap.appendChild(b);
    });
  }

  function chooseService(slug) {
    var svc = state.config.services.filter(function (s) { return s.slug === slug; })[0];
    if (!svc) return;
    state.service = svc;

    $$('#qfServices .qf-option').forEach(function (b) {
      var on = b.dataset.service === slug;
      b.classList.toggle('is-selected', on);
      b.setAttribute('aria-checked', on ? 'true' : 'false');
    });

    // Branch: only one set of questions is present in the DOM at a time, so a
    // hidden commercial field can never be submitted with a house clean.
    $$('[data-branch]').forEach(function (el) {
      el.hidden = el.getAttribute('data-branch') !== svc.branch;
    });
    toggle('[data-ask="size"]', svc.askSize);
    toggle('[data-ask="furnished"]', svc.askFurnished);
    toggle('[data-ask="condition"]', svc.askCondition);
    toggle('[data-ask="frequency"]', svc.askFrequency);

    fillSelect($('qfFrequency'), svc.frequencies, 'Choose one');
    renderExtras(svc);
    $('qfPhotoField').hidden = !state.config.photoUpload.enabled;
    clearError('service');
    saveDraft();
  }

  function toggle(sel, on) {
    var el = form.querySelector(sel);
    if (el) el.hidden = !on;
  }

  function renderExtras(svc) {
    var wrap = $('qfExtras');
    wrap.innerHTML = '';
    if (!svc.extras.length) {
      $('qfExtrasHint').textContent = 'No optional extras for this service.';
      return;
    }
    $('qfExtrasHint').textContent = 'Add any extras you’d like included.';
    svc.extras.forEach(function (e) {
      var id = 'qfExtra_' + e.value;
      var label = document.createElement('label');
      label.className = 'qf-check qf-extra';
      label.innerHTML = '<input type="checkbox" value="" name="extras" /><span><strong></strong><em></em></span>';
      var input = label.querySelector('input');
      input.value = e.value;
      input.id = id;
      label.querySelector('strong').textContent = e.label;
      label.querySelector('em').textContent = e.hint;
      wrap.appendChild(label);
    });
  }

  // ── Steps ─────────────────────────────────────────────────────────────────
  function showStep(n) {
    state.step = n;
    $$('.qf-step').forEach(function (fs) {
      fs.hidden = Number(fs.getAttribute('data-step')) !== n;
    });
    $('qfBack').hidden = n === 1;
    $('qfNext').hidden = n === state.totalSteps;
    $('qfSubmit').hidden = n !== state.totalSteps;
    $('qfProgressLabel').textContent = 'Step ' + n + ' of ' + state.totalSteps;
    $('qfProgressFill').style.width = Math.round((n / state.totalSteps) * 100) + '%';

    // Move focus to the step's own legend so a keyboard or screen-reader user
    // lands on the new question rather than somewhere in the middle of it.
    var current = form.querySelector('.qf-step[data-step="' + n + '"] .qf-legend');
    if (current) { current.setAttribute('tabindex', '-1'); current.focus(); }

    track('QUOTE_STEP', { step: n });
    saveDraft();
  }

  // ── Validation. The server validates again; this is for the person. ───────
  function setError(field, message) {
    var el = form.querySelector('[data-error-for="' + field + '"]');
    if (el) { el.textContent = message; el.hidden = false; }
    var input = form.querySelector('[name="' + field + '"]');
    if (input) { input.setAttribute('aria-invalid', 'true'); }
  }
  function clearError(field) {
    var el = form.querySelector('[data-error-for="' + field + '"]');
    if (el) { el.textContent = ''; el.hidden = true; }
    var input = form.querySelector('[name="' + field + '"]');
    if (input) { input.removeAttribute('aria-invalid'); }
  }
  function clearAllErrors() {
    $$('[data-error-for]').forEach(function (el) { el.textContent = ''; el.hidden = true; });
    $$('[aria-invalid]').forEach(function (el) { el.removeAttribute('aria-invalid'); });
  }
  function val(name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? String(el.value || '').trim() : '';
  }

  function validateStep(n) {
    clearAllErrors();
    var ok = true;
    var first = null;
    var fail = function (field, message) {
      setError(field, message);
      if (!first) first = form.querySelector('[name="' + field + '"]') || form.querySelector('[data-error-for="' + field + '"]');
      ok = false;
    };

    if (n === 1 && !state.service) fail('service', 'Please choose the type of clean you need.');

    if (n === 2) {
      if (!val('suburb') && !val('postcode')) fail('suburb', 'Please tell us the suburb or postcode.');
      if (val('postcode') && !/^\d{4}$/.test(val('postcode'))) fail('postcode', 'Australian postcodes are four digits.');
      if (state.service && state.service.branch === 'RESIDENTIAL') {
        if (!val('propertyType')) fail('propertyType', 'Please choose the type of property.');
        if (val('bedrooms') === '') fail('bedrooms', 'Please tell us how many bedrooms.');
        if (val('bathrooms') === '') fail('bathrooms', 'Please tell us how many bathrooms.');
        if (state.service.askCondition && !val('condition')) fail('condition', 'Please tell us roughly what state it is in.');
      } else if (state.service) {
        if (!val('premisesType')) fail('premisesType', 'Please choose the type of premises.');
        if (!val('floorAreaSqm')) fail('floorAreaSqm', 'Please give us an approximate floor area.');
        if (!val('operatingHours')) fail('operatingHours', 'Please tell us when we can access the site.');
      }
    }

    if (n === 3) {
      var d = val('preferredDate');
      if (d) {
        var chosen = new Date(d + 'T00:00:00');
        var today = new Date(); today.setHours(0, 0, 0, 0);
        if (chosen < today) fail('preferredDate', 'Please choose a date from today onwards.');
      }
      if (state.service && state.service.askFrequency && !val('frequency')) {
        fail('frequency', 'Please choose how often you’d like the clean.');
      }
    }

    if (n === 5) {
      if (!val('name')) fail('name', 'Please tell us your name.');
      var email = val('email');
      var phone = val('phone');
      if (!email && !phone) fail('phone', 'We need a phone number or an email so we can send your quote.');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fail('email', 'That email address doesn’t look right.');
      var method = val('contactMethod');
      if ((method === 'PHONE' || method === 'SMS') && !phone) fail('contactMethod', 'Please add a phone number, or choose email instead.');
      if (method === 'EMAIL' && !email) fail('contactMethod', 'Please add an email address, or choose phone instead.');
      if (!$('qfContactConsent').checked) fail('contactConsent', 'We need your permission to contact you about this quote.');
    }

    if (first && first.focus) first.focus();
    return ok;
  }

  // ── Photos ────────────────────────────────────────────────────────────────
  function uploadPhotos(files) {
    var cfg = state.config.photoUpload;
    var list = $('qfPhotoList');

    Array.prototype.slice.call(files).forEach(function (file) {
      if (state.photoIds.length >= cfg.maxFiles) return;

      var li = document.createElement('li');
      li.textContent = file.name + ' — uploading…';
      list.appendChild(li);

      if (file.size > cfg.maxBytesPerFile) {
        li.textContent = file.name + ' — too large (max ' + Math.round(cfg.maxBytesPerFile / 1048576) + 'MB)';
        li.className = 'is-error';
        return;
      }

      var fd = new FormData();
      fd.append('file', file);
      fetch(BASE + '/photo', { method: 'POST', body: fd })
        .then(function (r) { return r.json(); })
        .then(function (body) {
          if (body && body.ok && body.id) {
            state.photoIds.push(body.id);
            li.textContent = file.name + ' — added';
          } else {
            li.textContent = file.name + ' — couldn’t be added';
            li.className = 'is-error';
          }
        })
        .catch(function () {
          li.textContent = file.name + ' — couldn’t be added';
          li.className = 'is-error';
        });
    });
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  function payload() {
    var extras = $$('input[name="extras"]:checked').map(function (el) { return el.value; });
    var furnished = val('furnished');
    return {
      service: state.service ? state.service.slug : '',
      suburb: val('suburb'),
      postcode: val('postcode'),
      propertyType: val('propertyType'),
      // Sent as null, not "", when unanswered — an empty string would read as
      // a studio with no bedrooms rather than a question nobody answered.
      bedrooms: val('bedrooms') === '' ? null : Number(val('bedrooms')),
      bathrooms: val('bathrooms') === '' ? null : Number(val('bathrooms')),
      approxSize: val('approxSize') === '' ? null : Number(val('approxSize')),
      approxSizeUnit: val('approxSize') === '' ? null : 'SQM',
      furnished: furnished === '' ? null : furnished === 'true',
      condition: val('condition'),
      premisesType: val('premisesType'),
      floorAreaSqm: val('floorAreaSqm') === '' ? null : Number(val('floorAreaSqm')),
      operatingHours: val('operatingHours'),
      accessConstraints: val('accessConstraints'),
      siteInspectionRequested: $('qfInspection') ? $('qfInspection').checked : false,
      preferredDate: val('preferredDate'),
      timeWindow: val('timeWindow'),
      frequency: val('frequency'),
      extras: extras,
      notes: val('notes'),
      name: val('name'),
      email: val('email'),
      phone: val('phone'),
      contactMethod: val('contactMethod'),
      contactConsent: $('qfContactConsent').checked,
      marketingConsent: $('qfMarketingConsent').checked,
      photoIds: state.photoIds,
      submissionKey: state.submissionKey,
      sessionKey: sessionKey(),
      attribution: attribution(),
      _gotcha: val('_gotcha'),
    };
  }

  function submit(e) {
    e.preventDefault();
    if (state.submitting) return;
    if (!validateStep(5)) return;

    state.submitting = true;
    var button = $('qfSubmit');
    var label = button.textContent;
    button.disabled = true;
    button.textContent = 'Sending…';
    $('qfFormError').hidden = true;

    fetch(BASE + '/quote-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload()),
    })
      .then(function (r) { return r.json().then(function (b) { return { status: r.status, body: b }; }); })
      .then(function (res) {
        if (res.body && res.body.ok) {
          // Cleared only on success, so a failed attempt keeps everything the
          // person typed.
          drop(STORAGE_KEY);
          drop(STORAGE_KEY + '.key');
          form.hidden = true;
          document.querySelector('.qf-progress').hidden = true;
          $('qfDone').hidden = false;
          $('qfDone').focus();

          // The site's existing conversion tags, fired the same way the lead
          // modal fires them, so reporting stays continuous.
          try {
            if (window.dataLayer) window.dataLayer.push({ event: 'lead_captured', form: 'quote' });
            if (window.gtag) window.gtag('event', 'generate_lead', { form: 'quote' });
            if (window.fbq) window.fbq('track', 'Lead');
          } catch (err) { /* tags must not break the confirmation */ }
          return;
        }

        if (res.status === 422 && res.body && res.body.errors) {
          clearAllErrors();
          res.body.errors.forEach(function (err) { setError(err.field, err.message); });
          $('qfFormError').textContent = 'Please check the highlighted answers.';
          $('qfFormError').hidden = false;
          return;
        }
        if (res.status === 429) {
          $('qfFormError').textContent = 'That’s a lot of requests from this connection. Please wait a moment and try again.';
          $('qfFormError').hidden = false;
          return;
        }
        throw new Error('failed');
      })
      .catch(function () {
        $('qfFormError').textContent =
          'We couldn’t send that just now. Please try again — nothing you typed has been lost. If it keeps happening, call us.';
        $('qfFormError').hidden = false;
      })
      .finally(function () {
        state.submitting = false;
        button.disabled = false;
        button.textContent = label;
      });
  }

  // ── Boot ──────────────────────────────────────────────────────────────────
  function boot(cfg) {
    state.config = cfg;
    // renderServices() clears #qfServices, and the "Loading services…" line is
    // a child of it — so it is already gone by the time this returns. There was
    // a second, explicit remove() here, which threw on null and took the whole
    // boot down with it.
    renderServices(cfg);

    fillSelect($('qfPropertyType'), cfg.propertyTypes, 'Choose one');
    fillSelect($('qfPremisesType'), cfg.premisesTypes, 'Choose one');
    fillSelect($('qfCondition'), cfg.conditions, 'Choose one');
    fillSelect($('qfTimeWindow'), cfg.timeWindows, 'No preference');
    fillSelect($('qfContactMethod'), cfg.contactMethods, 'Either is fine');

    // The consent wording is rendered from the server's copy, so the words on
    // screen are the same string stored against the consent record.
    $('qfContactConsentText').textContent = cfg.consent.contact.text;
    $('qfMarketingConsentText').textContent = cfg.consent.marketing.text;

    var draft = restoreDraft();
    if (draft) {
      Object.keys(draft).forEach(function (name) {
        if (name.indexOf('__') === 0) return;
        var el = form.querySelector('[name="' + name + '"]');
        if (!el) return;
        if (el.type === 'checkbox') el.checked = Boolean(draft[name]);
        else el.value = draft[name];
      });
      if (draft.__service) chooseService(draft.__service);
    }

    // A service pre-selected by the landing page that sent them here.
    var wanted = new URLSearchParams(location.search).get('service');
    if (wanted) chooseService(wanted);

    showStep(draft && draft.__step ? Math.min(Number(draft.__step) || 1, state.totalSteps) : 1);
    track('QUOTE_START');
  }

  $('qfNext').addEventListener('click', function () {
    if (!validateStep(state.step)) return;
    showStep(Math.min(state.step + 1, state.totalSteps));
  });
  $('qfBack').addEventListener('click', function () {
    showStep(Math.max(state.step - 1, 1));
  });
  form.addEventListener('submit', submit);
  form.addEventListener('input', saveDraft);
  form.addEventListener('change', saveDraft);
  $('qfPhotos').addEventListener('change', function (e) { uploadPhotos(e.target.files); });

  // Enter should advance the form, not submit it from step two.
  form.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'textarea') return;
    if (state.step < state.totalSteps) {
      e.preventDefault();
      $('qfNext').click();
    }
  });

  /* Without the catalogue there are no questions to ask, so say so and give
   * them the phone number rather than showing an empty form.
   *
   * The failure is REPORTED, not just displayed. An earlier version caught
   * everything from the fetch AND from boot() in one handler, so a
   * programming error inside boot() showed the customer "we couldn't load the
   * form" while the console said only that the handler itself had then failed
   * on an element boot() had already removed. A catch that hides the thing it
   * caught costs more than it saves. */
  function bootFailed(err) {
    console.error('[quote-form] could not start', err);
    var loading = $('qfServicesLoading');
    if (loading) {
      loading.textContent =
        'We couldn’t load the quote form just now. Please call us and we’ll take your details.';
    } else {
      var box = $('qfFormError');
      if (box) {
        box.textContent =
          'Something went wrong loading this form. Please call us and we’ll take your details.';
        box.hidden = false;
      }
    }
    $('qfNext').hidden = true;
  }

  fetch(BASE + '/config')
    .then(function (r) {
      if (!r.ok) throw new Error('config responded ' + r.status);
      return r.json();
    })
    .then(boot)
    .catch(bootFailed);
})();
