/**
 * Lead backup -- Google Apps Script web app.
 *
 * A second, independent home for every enquiry the website captures. The
 * primary destination is the Sophiie CRM; this one exists so that an outage
 * there (or a mis-set widget flag, which returns 403 and silently drops the
 * lead) does not cost a customer. It runs on Google's infrastructure, so it
 * survives our app and our host being down at the same time.
 *
 * Why Apps Script rather than a form service: at ~350 enquiries a month every
 * hosted free tier is too small (Formspree 50, Basin 100, Netlify Forms 100,
 * Web3Forms 250), and paying for a second one was the thing we were trying to
 * stop doing. This costs nothing and 350/month is nowhere near any quota.
 *
 * --- Deploy ---------------------------------------------------------------
 *  1. Create a Google Sheet. Name the first tab "Leads". Note its ID from the
 *     URL: docs.google.com/spreadsheets/d/<THIS PART>/edit
 *  2. Extensions -> Apps Script. Paste this file over Code.gs.
 *  3. Put the ID in SHEET_ID below.
 *  4. Deploy -> New deployment -> type "Web app".
 *       Execute as:        Me
 *       Who has access:    Anyone            <- required; the website is not
 *                                              signed in as anyone
 *  5. Copy the /exec URL it gives you and put it in `webhookUrl` in
 *     src/data/site.ts.
 *  6. Re-deploy (Deploy -> Manage deployments -> edit -> Version: New version)
 *     after ANY edit to this file. Apps Script serves the deployed version,
 *     not the saved one -- an edit alone changes nothing.
 *
 * --- Note on CORS ---------------------------------------------------------
 * Apps Script web apps do not answer CORS preflight (OPTIONS) requests, so a
 * browser POST carrying `Content-Type: application/json` fails before it is
 * ever sent. The site therefore posts this endpoint as `text/plain`, which is
 * CORS-safelisted and skips the preflight; the body is still JSON, and is
 * parsed as such below. Do not "fix" the site to send application/json.
 */

/*
 * --- This file is deliberately pure ASCII ---------------------------------
 *
 * It is deployed by PASTING it into the Apps Script web editor, and a clipboard
 * round trip into that editor does not reliably preserve UTF-8. Pasting a
 * version of this file containing em-dashes and box-drawing characters turned
 * every one of them into mojibake -- and, far worse, silently destroyed the
 * literal Cyrillic character range in spamReason(), which is the single rule
 * that catches the spam this gate exists for. It still saved, still ran, and
 * would have quietly passed every submission it was meant to stop.
 *
 * So: no smart quotes, no em-dashes, no arrows, no box drawing. Non-ASCII
 * characters that MUST be matched are written as \u escapes, which survive any
 * encoding because they are themselves ASCII.
 */

/** Spreadsheet the leads are appended to. */
var SHEET_ID = 'PASTE_SHEET_ID_HERE';

/** Tab within that spreadsheet. Created automatically if missing. */
var SHEET_NAME = 'Leads';

/**
 * Tab spam is parked in. Created automatically if missing.
 *
 * Quarantined, never dropped, and never cleared by this script -- deleting is a
 * person's decision. A gate that discards silently is a gate nobody can audit:
 * if a rule turns out to be wrong, the enquiries it ate would be gone with no
 * trace they had ever arrived, and whoever typed them would simply never hear
 * back. Here they sit one tab away with the reason recorded beside them.
 */
var SPAM_SHEET_NAME = 'Spam';

/**
 * Deliberately no email alerting.
 *
 * Apps Script derives its OAuth scopes from the code rather than from what
 * actually runs, so any reference to Google's mail service -- even one that is
 * switched off and never called -- makes this script request permission to send
 * email as the account owner. That is a wide permission to hand an unverified
 * script for no benefit: the Sheet is the record, and the CRM Inbox is already
 * the notification. The reference is left out entirely, including in prose,
 * because the scope scanner is not always careful about the difference.
 *
 * To add alerts later, send mail from doPost and re-deploy. Google will ask for
 * the extra scope then -- which is the right moment to weigh it.
 */

/** Column order. Changing this only affects rows written from here on. */
var HEADERS = [
  'Received',
  'Name',
  'Phone',
  'Email',
  'Service',
  'Location',
  'Message',
  'Form',
  'Lead ID',
  'Source',
  'Medium',
  'Campaign',
  'Landing page',
  'Referrer',
  'Raw JSON',
];

/** Where a browser that posted the form natively should end up. */
var THANK_YOU_URL = 'https://naturogroup.com.au/thank-you';

/**
 * Fields that are ours, not the sender's -- never scanned for content.
 *
 * The captcha tokens matter more than they look: a Turnstile token is a
 * kilobyte of opaque base64, so scanning it would trip the length rule on
 * every single submission and hand every genuine enquiry a free weak signal.
 */
var NOT_SENDER_TEXT = {
  _gotcha: 1, honeypot: 1, attribution: 1, lead_id: 1, form_location: 1,
  'g-recaptcha-response': 1, 'h-captcha-response': 1,
  'cf-turnstile-response': 1, cf_turnstile_response: 1, turnstileToken: 1,
  submissionKey: 1, sessionKey: 1, photoIds: 1
};

/** Everything the sender actually typed, flattened into one string. */
function senderText(p) {
  var parts = [];
  for (var key in p) {
    if (!Object.prototype.hasOwnProperty.call(p, key)) continue;
    if (NOT_SENDER_TEXT[key]) continue;
    var v = p[key];
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
      parts.push(String(v));
    }
  }
  return parts.join('\n');
}

function countMatches(text, re) {
  var m = text.match(re);
  return m ? m.length : 0;
}

/**
 * Why this submission is not a lead, or null if it is one.
 *
 * --- Shape rules ----------------------------------------------------------
 * Three bot submissions reached this Sheet on 17 August 2026 -- US phone
 * numbers, throwaway addresses, gibberish bodies. What gave them away was not
 * the content but the shape: no name, and none of the markers the website's own
 * forms always attach. They had been posted straight at this URL, which is
 * public by necessity (the site is not signed in as anyone) and printed in the
 * page source. So the endpoint has to decide for itself what a lead looks like.
 *
 * --- Content rules, added 1 September 2026 --------------------------------
 * The note that used to sit here said judging message text would eventually
 * throw away a real enquiry. That reasoning held until a bot arrived that the
 * shape rules cannot see: on 31 August a marketplace-spam post came through
 * the quote lead gate carrying a plausible Australian name, mobile and email,
 * a real form marker and an empty honeypot. Every shape rule passed it, and it
 * was filed here as a genuine enquiry.
 *
 * The CRM had already learned this the day before and grown a content gate.
 * This Sheet is meant to be an INDEPENDENT destination of equal standing, and
 * it had become the weaker one -- the same submission was quarantined there and
 * filed as a lead here. These rules are that gate, ported, so the two agree.
 *
 * The original caution is answered by keeping every rule narrow rather than by
 * having none: each is something a real Geelong cleaning enquiry cannot
 * plausibly contain. No keyword lists, no judging how a sentence reads, and
 * ordinary prose -- however hurried -- passes untouched. Length alone never
 * rejects. And nothing here deletes: a refusal is parked on the Spam tab with
 * its reason, exactly as the shape rules' refusals always have been.
 *
 * Keep in step with src/lib/lead-spam.ts in the sophiie repo. Two destinations
 * that disagree about what spam is are worse than either rule set alone,
 * because the answer then depends on which one you happen to look at.
 */
function spamReason(p) {
  // Filled by a bot that reads the form and completes every field. Invisible
  // and unlabelled for people, so any value at all is a machine.
  if (str(p._gotcha).trim() || str(p.honeypot).trim()) return 'honeypot';

  // The CRM requires a name too, which is why these three never reached it.
  if (!str(p.name).trim() && !str(p.full_name).trim()) return 'no name';

  // Every path from the website carries one of these: the JavaScript one sets
  // both, and the no-JavaScript fallback posts a hidden form_location. Neither
  // is guessable from the outside without reading the site, so their absence
  // means the post did not come through a form on the site.
  if (!str(p.form_location).trim() && !str(p.lead_id).trim()) return 'no form marker';

  var text = senderText(p);
  if (!text.replace(/\s/g, '')) return null;

  // ---- Strong signals: any one is conclusive on its own. ----

  // A Geelong cleaning enquiry is not written in Cyrillic.
  if (/[\u0400-\u04FF]/.test(text)) return 'Cyrillic text';

  // An actual anchor tag. Customers type words, not markup.
  if (/<\s*a\b[^>]*\bhref\b/i.test(text)) return 'HTML link tag';

  var links = countMatches(text, /\b(?:https?:\/\/|www\.)[^\s<>"')]+/gi);
  if (links >= 3) return links + ' links';

  // Bare domains on TLDs that essentially never appear in a domestic cleaning
  // enquiry but are the standard habitat of this spam family. Deliberately
  // excludes .com / .com.au / .net / .org -- a customer may well mention those.
  var suspicious = countMatches(
    text,
    /\b[a-z0-9][a-z0-9-]{1,62}\.(?:ru|su|cc|to|top|xyz|icu|club|site|online|link|onion)\b/gi
  );
  if (suspicious >= 2) return suspicious + ' suspicious domains';

  // ---- Weak signals: an ordinary enquiry trips at most one. Two is spam. ----
  var weak = [];
  if (links === 2) weak.push('2 links');
  if (suspicious === 1) weak.push('suspicious domain');

  // Inline markup a person would never hand-write into a contact form.
  if (countMatches(text, /<\s*\/?\s*(?:b|i|u|p|strong|em|div|span|br)\s*\/?\s*>/gi) >= 2) {
    weak.push('HTML markup');
  }

  // Mail-merge wreckage. `#if<html>` / `#else` and `{a|b}` spintax appear when
  // a bulk-spam template fails to render -- never in something a person typed.
  if (/#if\s*<|#else\b|\{[^{}\n]{1,80}\|[^{}\n]{1,80}\}/i.test(text)) {
    weak.push('mail-merge template');
  }

  // Roughly 150 words -- longer than any enquiry we have received, and short of
  // the multi-screen wall these bots send. WEAK on purpose: a customer
  // describing a hoarding clean or an NDIS plan in detail is exactly the
  // enquiry we least want to drop, so length only bites beside a second signal.
  if (text.length > 1000) weak.push('very long');

  if (weak.length >= 2) return weak.join(' + ');

  return null;
}

function doPost(e) {
  // A native form post (no JavaScript) arrives form-encoded and the browser
  // NAVIGATES to whatever comes back, so it gets a page rather than JSON. The
  // site's fetch path sends JSON and reads the status, so it gets JSON.
  var isNativeFormPost = !!(
    e &&
    e.postData &&
    String(e.postData.type || '').indexOf('form-urlencoded') !== -1
  );
  try {
    var payload = parseBody(e);
    var rejected = spamReason(payload);
    if (rejected) {
      appendRejected(payload, rejected);
      // Answered exactly like a success. A bot that can see which rule caught
      // it can tune around it, and the site's own forms never reach here.
      return isNativeFormPost ? redirectOut(THANK_YOU_URL) : jsonOut({ ok: true });
    }
    appendLead(payload);
    // AFTER the Sheet write, always. This Sheet exists because the CRM can be
    // down; a forward that threw before the row was appended would hand that
    // property away for the sake of the thing it was insuring against.
    //
    // ONLY for native form posts. A submission made with JavaScript on has
    // already been posted to the CRM directly, in parallel with this one, by
    // deliverLead() in Analytics.astro. Forwarding those as well would send the
    // same enquiry twice, arriving at almost the same instant -- and the CRM
    // de-duplicates by looking for an existing row before writing one, which
    // two simultaneous requests can both do before either has written. The
    // no-JavaScript path is the one with no other way in, and it is the only
    // one that needs this.
    if (isNativeFormPost) forwardToCrm(payload);
    return isNativeFormPost ? redirectOut(THANK_YOU_URL) : jsonOut({ ok: true });
  } catch (err) {
    // Logged rather than swallowed: a failure here is invisible to the site
    // (it only reads ok/not-ok), so the execution log is the only record.
    console.error('lead-backup failed: ' + (err && err.stack ? err.stack : err));
    if (isNativeFormPost) return redirectOut(THANK_YOU_URL);
    return jsonOut({ ok: false, error: String(err) });
  }
}

/**
 * Pass a clean lead on to the CRM.
 *
 * --- The gap this closes ---------------------------------------------------
 * The contact page's form posts natively to this URL when JavaScript is off or
 * broken (`action` is webhookUrls[0]; see contact-us.astro). That path cannot
 * run the site's delivery code, so those enquiries landed here and NOWHERE
 * else -- no Inbox conversation, no alert email, no AI capture. Nobody who does
 * not open this spreadsheet ever knew they existed. The backup had quietly
 * become the only copy for the one visitor least able to work around it.
 *
 * --- Why the forward goes this way round ----------------------------------
 * Sheet first, CRM second. Pointing the form at the CRM instead would mean a
 * no-JavaScript visitor gets an error page when the CRM is down, and the row
 * never reaches this Sheet at all -- losing exactly the redundancy this script
 * was written to provide.
 *
 * --- Deliberately inert ---------------------------------------------------
 * Off unless BOTH script properties are set (File -> Project properties ->
 * Script properties):
 *
 *     CRM_LEAD_URL      https://sophiie-web.onrender.com/api/widget/lead
 *     CRM_RELAY_SECRET  the same value as LEAD_RELAY_SECRET in Render
 *
 * The secret lives in Script Properties, never in this file -- this file is in
 * a public git repository.
 *
 * --- The scope this costs -------------------------------------------------
 * UrlFetchApp adds `script.external_request`, so Google will ask to authorise
 * the script again on the next deploy. That is a real cost and worth stating
 * plainly: it permits outbound HTTP to anywhere. It is narrower than the mail
 * scope this script still refuses to take (which would allow sending email AS
 * the account owner), and unlike that one it buys something -- the enquiries
 * above reaching a person. If that trade ever stops being worth it, delete
 * this function and the call to it and the scope goes with them.
 *
 * Never throws. A CRM that is down, slow or misconfigured must not turn a
 * saved lead into a 500 and an error page for someone who has already typed
 * everything out once.
 */
function forwardToCrm(payload) {
  try {
    var props = PropertiesService.getScriptProperties();
    var url = str(props.getProperty('CRM_LEAD_URL')).trim();
    var secret = str(props.getProperty('CRM_RELAY_SECRET')).trim();
    if (!url || !secret) return; // not configured -- nothing to do

    var res = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      // Marks this as our own relay, which has already applied the gate above.
      // The CRM skips its captcha check on the strength of it -- a native form
      // post never ran JavaScript, so it has no token and never could. It
      // still runs its own honeypot and content rules on the payload: the
      // header says who is calling, never that the lead is genuine.
      headers: { 'x-lead-relay': secret },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true,
    });

    var code = res.getResponseCode();
    // 403 is the webform widget switched off in Sophiie, which is a setting
    // rather than a fault. Everything else non-2xx is worth a log line: the
    // site cannot see this call, so the execution log is the only record it
    // happened at all.
    if (code < 200 || code >= 300) {
      console.warn('lead forward: CRM answered ' + code + ' -- ' + res.getContentText().slice(0, 200));
    }
  } catch (err) {
    console.warn('lead forward failed: ' + (err && err.message ? err.message : err));
  }
}

/** Lets you confirm the deployment is alive without sending a fake lead. */
function doGet() {
  return jsonOut({ ok: true, service: 'naturo-lead-backup' });
}

/**
 * Read the posted body.
 *
 * The site sends JSON with a text/plain content type (see the CORS note), so
 * postData.contents is the JSON string. Form-encoded posts are accepted too,
 * so the endpoint still works if something ever posts to it the ordinary way.
 */
function parseBody(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      // Not JSON -- fall through to the parsed form parameters.
    }
  }
  if (e && e.parameter && Object.keys(e.parameter).length) return e.parameter;
  throw new Error('empty request body');
}

/**
 * The spreadsheet to write to.
 *
 * A container-bound script (one created from Extensions -> Apps Script inside a
 * Sheet) is often granted the narrow "current spreadsheet only" scope, under
 * which openById throws even for the very sheet the script is attached to.
 * getActive() is the correct call in that case and needs no wider permission,
 * so it is tried first; openById remains the fallback for a standalone copy.
 */
function targetSpreadsheet() {
  try {
    var active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active;
  } catch (err) {
    // Not bound to a spreadsheet -- fall through to the id.
  }
  return SpreadsheetApp.openById(SHEET_ID);
}

/** Run this from the editor to check the sheet write in isolation. */
function selfTest() {
  appendLead({
    name: 'Self test -- please delete',
    phone: '0400 000 000',
    email: 'selftest@example.com',
    message: 'Written by selfTest() from the Apps Script editor.',
    form_location: 'self_test',
  });
  return 'appended OK';
}

function appendLead(p) {
  // Writes straight to the sheet: the spam gate lives in doPost, so selfTest()
  // still isolates a permission problem from a delivery one without having to
  // satisfy rules that only apply to something arriving off the internet.
  var sheet = sheetNamed(SHEET_NAME, HEADERS);

  var attr = p.attribution && typeof p.attribution === 'object' ? p.attribution : {};
  sheet.appendRow([
    new Date(),
    // `full_name` as well as `name`: the contact page's no-JavaScript fallback
    // posts the former, so every submission down that path was landing here
    // with a blank Name column while the sender's name sat in the Raw JSON a
    // few columns over. appendRejected() has always read both; this did not.
    // Found while reading two spam rows that showed no name at all -- the same
    // gap silently blanked the name on genuine no-JS enquiries.
    str(p.name || p.full_name),
    // Leading apostrophe: a phone number is an identifier, and Sheets would
    // otherwise read "0400 123 456" as a number and drop the leading zero.
    p.phone ? "'" + str(p.phone) : '',
    str(p.email),
    str(p.service || p.serviceLabel),
    str(p.location || p.service_location || p.suburb),
    str(p.message || p.notes),
    str(p.form_location || p.source),
    str(p.lead_id),
    str(attr.utm_source || attr.source),
    str(attr.utm_medium || attr.medium),
    str(attr.utm_campaign || attr.campaign),
    str(attr.landing_page || (p.page && p.page.path) || p.page),
    str(attr.referrer),
    JSON.stringify(p).slice(0, 45000), // cell limit is 50k characters
  ]);
}

/** Park a rejected submission on the quarantine tab, with the reason. */
function appendRejected(p, reason) {
  var sheet = sheetNamed(SPAM_SHEET_NAME, ['Received', 'Reason', 'Name', 'Phone', 'Email', 'Raw JSON']);
  sheet.appendRow([
    new Date(),
    reason,
    str(p.name || p.full_name),
    p.phone ? "'" + str(p.phone) : '',
    str(p.email),
    JSON.stringify(p).slice(0, 45000),
  ]);
}

/** A tab by name, created with the given header row if it does not exist. */
function sheetNamed(name, headers) {
  var ss = targetSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function str(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'object') return JSON.stringify(v);
  return String(v);
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

/**
 * Send a natively-posting browser onward.
 *
 * Apps Script cannot return a 302, so this is a meta refresh with a link
 * behind it for anyone the refresh does not carry.
 */
function redirectOut(url) {
  var safe = String(url).replace(/"/g, '&quot;');
  return HtmlService.createHtmlOutput(
    '<!doctype html><meta charset="utf-8">' +
      '<meta http-equiv="refresh" content="0;url=' + safe + '">' +
      '<title>Thank you</title>' +
      '<p>Thanks -- your enquiry has been received. ' +
      '<a href="' + safe + '">Continue</a>.</p>',
  );
}

/**
 * One-off: report which rows already on Leads would be judged spam.
 *
 * Run from the editor and read the log. Nothing is changed. The payload is
 * rebuilt from the Raw JSON column, which is the submission exactly as it
 * arrived, so the same rules decide it as would have decided it live.
 */
function reportExistingSpam() {
  var found = findExistingSpam();
  if (!found.length) return 'No spam on the Leads tab.';
  var lines = found.map(function (f) {
    return 'row ' + f.row + ' -- ' + f.reason + ' -- ' + (f.payload.email || f.payload.phone || '(no contact)');
  });
  Logger.log(lines.join('\n'));
  return found.length + ' row(s) would move:\n' + lines.join('\n');
}

/**
 * One-off: MOVE those rows to the Spam tab.
 *
 * A move, not a delete -- every one of them is copied across with its reason
 * before it leaves Leads, and deleting from Spam stays a human decision. Rows
 * are removed bottom-up so the earlier indexes stay valid.
 */
function moveExistingSpam() {
  var found = findExistingSpam();
  if (!found.length) return 'Nothing to move.';

  found.forEach(function (f) {
    appendRejected(f.payload, f.reason);
  });

  var sheet = sheetNamed(SHEET_NAME, HEADERS);
  found
    .map(function (f) { return f.row; })
    .sort(function (a, b) { return b - a; })
    .forEach(function (row) { sheet.deleteRow(row); });

  return 'Moved ' + found.length + ' row(s) to ' + SPAM_SHEET_NAME + '.';
}

/** Rows on Leads whose stored payload the spam rules would refuse. */
function findExistingSpam() {
  var sheet = sheetNamed(SHEET_NAME, HEADERS);
  var last = sheet.getLastRow();
  if (last < 2) return [];

  var rawCol = HEADERS.indexOf('Raw JSON') + 1;
  var values = sheet.getRange(2, 1, last - 1, HEADERS.length).getValues();
  var out = [];
  for (var i = 0; i < values.length; i++) {
    var raw = values[i][rawCol - 1];
    if (!raw) continue;
    var payload;
    try {
      payload = JSON.parse(raw);
    } catch (err) {
      continue; // Unreadable payload is not evidence of anything.
    }
    var reason = spamReason(payload);
    if (reason) out.push({ row: i + 2, reason: reason, payload: payload });
  }
  return out;
}
