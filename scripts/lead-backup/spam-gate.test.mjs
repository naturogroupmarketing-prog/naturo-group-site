/**
 * Shape tests for spamReason() in Code.gs.
 *
 * The rows are the real ones: four genuine enquiries and the three bot posts
 * that arrived on 17 August 2026. The gate has to separate them without ever
 * reading the message text, because judging text eventually throws away a real
 * enquiry written in a hurry.
 *
 *   node scripts/lead-backup/spam-gate.test.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const g = {};
new Function(
  'g',
  readFileSync(join(here, 'Code.gs'), 'utf8') +
    '; g.spamReason = spamReason; g.forwardToCrm = forwardToCrm;',
)(g);

const CASES = [
  // Genuine — every one of these is a row that is already in the Sheet.
  ['Enza Mooyman (quote gate)', { name: 'Enza Mooyman', phone: '0410360762', email: 'enzamcv@gmail.com', lead_id: 'lead_598e9c85', form_location: 'quote_lead_gate' }, null],
  ['Sarah (quote gate)', { name: 'Sarah', phone: '0411027083', lead_id: 'lead_ac299e72', form_location: 'quote_lead_gate' }, null],
  ['contact page, JavaScript on', { name: 'Jo', email: 'jo@example.com', lead_id: 'contact-msykwnxp', form_location: 'contact_page' }, null],
  ['contact page, JavaScript off', { full_name: 'Jo', phone: '0400000000', form_location: 'contact_page' }, null],

  // The three bot posts: no name, and none of the site's markers.
  ['bot post 1', { phone: '+1-713-131-169', email: 'ozondhuv@imme.co', message: 'ovrtmosomhokjwhkoxyjdgzlvgkhwz' }, 'no name'],
  ['bot post 2', { phone: '+1-241-755-516', email: 'eyrjsyds@imme.co', message: 'ljwhkuspjhxhrefqfvgxzllydmjxji' }, 'no name'],
  ['bot post 3', { phone: '+1-363-355-634', email: 'vtmwkjuj@imme.co', message: 'gwwjyogxfkiyznxvisdstnyvytxjxr' }, 'no name'],

  // The next escalations.
  ['named, but posted straight at the URL', { name: 'Bot', email: 'b@example.com', message: 'hi' }, 'no form marker'],
  ['walked the DOM and filled everything', { name: 'Bot', email: 'b@example.com', form_location: 'contact_page', _gotcha: 'http://spam.example' }, 'honeypot'],
  ['whitespace in the trap is not a bot', { name: 'Jo', form_location: 'contact_page', _gotcha: '   ' }, null],

  // ---- Content rules, added 1 September 2026 -----------------------------
  //
  // The submission that actually got through, 31 August 10:57. Every shape
  // rule passes it: a plausible Australian name, mobile and email, a real form
  // marker, an empty honeypot. Only the body gives it away — which is why the
  // shape-only gate filed it on the Leads tab as a genuine enquiry while the
  // CRM, which had grown a content gate the day before, quarantined it.
  ['the 31 August marketplace spam', {
    name: 'Kane Hill',
    phone: '0421 198 306',
    email: 'kane_hill@hotmail.com',
    service: 'deep_cleaning',
    suburb: 'campbells_creek',
    form_location: 'quote_lead_gate',
    lead_id: 'lead_38a06b4e-65cc-4095-ad80-e7abdb810f77',
    message: [
      '#if<html>',
      '<b>Инструкция: найти кракен в тор сети</b>',
      '<p>Рабочая кракен ссылка для входа доступна сегодня',
      '• Запасная ссылка: <a href="http://example.onion">тут</a>',
      '#else',
    ].join('\n'),
  }, 'Cyrillic text'],

  // The same person, same everything, writing an ordinary enquiry. If this
  // ever fails, the gate has started judging the sender rather than the text.
  ['the same shape with a real message', {
    name: 'Kane Hill', phone: '0421 198 306', email: 'kane_hill@hotmail.com',
    service: 'deep_cleaning', suburb: 'campbells_creek',
    form_location: 'quote_lead_gate', lead_id: 'lead_38a06b4e',
    message: 'Service: Deep Clean\nLocation: Campbells Creek 3451\nNotes: This will be a house that my wife and I will be moving into.\nSubmitted via naturogroup.com.au',
  }, null],

  // The two rows lifted from the Sheet's own Raw JSON column. Both came
  // through the CONTACT PAGE, not the quote gate, and both cleared every shape
  // rule: `_gotcha` empty, `full_name` set, `form_location` present. Note the
  // Gmail dot-trick — wo.odfor.d.ja.mes.on4@ and wo.o.d.f.o.r.dja.m.es.on4@
  // are the same underlying mailbox — and the Russian-format phone numbers,
  // neither of which any shape rule looks at.
  ['30 Aug 11:20, contact page', {
    _gotcha: '',
    full_name: 'Roberthef',
    service: 'General enquiry',
    form_location: 'contact_page',
    phone: '88579995923',
    email: 'wo.odfor.d.ja.mes.on4@gmail.com',
    state: 'QLD',
    message: '#if<html>\n\n<b>ggkr.to===Kraken зеркало </b>\n\nДарова\n\nktag.cc===В сети обсуждают необычный брелок\n\n<p>kmirrors.cc===Инструкция по настройке соединения\n#else\n<b>kraroulette.cc=== Как играть</b>',
  }, 'Cyrillic text'],

  ['31 Aug 12:06, contact page, Cyrillic in the suburb field', {
    suburb_postcode: 'Калининград',
    full_name: 'Rolandpef',
    email: 'wo.o.d.f.o.r.dja.m.es.on4@gmail.com',
    submit: '',
    state: 'QLD',
    _gotcha: '',
    service: 'General enquiry',
    phone: '87993361466',
    form_location: 'contact_page',
    message: '#if<html>\n<b>Инструкция: найти кракен в тор сети</b>\n\nПриветушки',
  }, 'Cyrillic text'],

  // Caught even with the body stripped out entirely — senderText() reads every
  // field the sender filled, not just `message`, so putting the payload
  // somewhere else does not get past it.
  ['Cyrillic hidden in a field other than the message', {
    full_name: 'Rolandpef', form_location: 'contact_page', suburb_postcode: 'Калининград', message: 'hello',
  }, 'Cyrillic text'],

  ['an anchor tag alone', { name: 'Bot', form_location: 'contact_page', message: 'Click <a href="http://x.to">here</a>' }, 'HTML link tag'],
  ['three links', { name: 'Bot', form_location: 'contact_page', message: 'https://a.example https://b.example www.c.example' }, '3 links'],
  ['two suspicious domains', { name: 'Bot', form_location: 'contact_page', message: 'visit ggkr.to and ktag.cc' }, '2 suspicious domains'],
  ['two weak signals combine', { name: 'Bot', form_location: 'contact_page', message: '#else\nmirror at kmirrors.cc' }, 'suspicious domain + mail-merge template'],

  // ---- Genuine enquiries the content rules must not touch ---------------
  ['a customer mentioning our own site', { name: 'Dave', form_location: 'contact_page', lead_id: 'x', message: 'I saw the prices on https://naturogroup.com.au/quote — still current?' }, null],
  ['a long, detailed NDIS enquiry with no other signal', {
    name: 'Margaret Doyle', phone: '0499 123 456', form_location: 'quote_lead_gate', lead_id: 'x',
    message: 'Enquiring for my brother, an NDIS participant in Belmont. His plan is self-managed and includes household tasks. '.repeat(12),
  }, null],
  ['a Turnstile token does not make an enquiry look long', {
    name: 'Sarah', phone: '0411 027 083', form_location: 'quote_lead_gate', lead_id: 'x',
    message: 'Fortnightly clean for a 3 bedroom in Highton please.',
    'cf-turnstile-response': '0.' + 'A1b2C3d4E5f6G7h8'.repeat(80),
  }, null],
  ['nor does it combine with one ordinary link', {
    name: 'Dave', form_location: 'contact_page', lead_id: 'x',
    message: 'Saw https://naturogroup.com.au — is Saturday possible?',
    'cf-turnstile-response': '0.' + 'A1b2C3d4E5f6G7h8'.repeat(80),
  }, null],
];

let fail = 0;
for (const [label, payload, want] of CASES) {
  const got = g.spamReason(payload);
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(38)} -> ${JSON.stringify(got)}${ok ? '' : `  (wanted ${JSON.stringify(want)})`}`);
}

/*
 * forwardToCrm() must never throw.
 *
 * The lead is already in the Sheet by the time it runs, and doPost has still to
 * return a redirect to someone with JavaScript off who has just typed their
 * enquiry out. A CRM that is down, an unset property, a missing Apps Script
 * global — none of them may become a 500 and an error page.
 *
 * Running it here with no Apps Script runtime at all (no PropertiesService, no
 * UrlFetchApp) is the harshest version of that, and the one a plain `node` run
 * can actually check.
 */
let extra = 0;
function check(label, fn) {
  let ok = true;
  let detail = '';
  try {
    fn();
  } catch (err) {
    ok = false;
    detail = `  (threw ${err && err.message})`;
  }
  if (!ok) fail++;
  else extra++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(38)} -> ${ok ? 'did not throw' : detail}`);
}

/*
 * Code.gs must stay pure ASCII.
 *
 * It is deployed by pasting it into the Apps Script web editor, and that
 * clipboard round trip does not reliably preserve UTF-8. A paste on 1 September
 * 2026 mangled every em-dash AND silently destroyed the literal Cyrillic range
 * in spamReason() — the one rule that catches this spam. The file saved fine
 * and ran fine; it just quietly stopped blocking anything.
 *
 * Characters that must be MATCHED are written as \u escapes, which are
 * themselves ASCII and therefore survive.
 */
check('Code.gs is pure ASCII, so pasting it cannot corrupt it', () => {
  const src = readFileSync(join(here, 'Code.gs'), 'utf8');
  const bad = [...new Set([...src].filter((c) => c.charCodeAt(0) > 127))];
  if (bad.length) {
    throw new Error(
      `non-ASCII: ${bad.map((c) => `${JSON.stringify(c)} U+${c.charCodeAt(0).toString(16).padStart(4, '0')}`).join(', ')}`,
    );
  }
});

check('the Cyrillic rule is an escape, not a literal range', () => {
  const src = readFileSync(join(here, 'Code.gs'), 'utf8');
  if (!src.includes('\\u0400-\\u04FF')) throw new Error('escaped Cyrillic range missing');
});

check('and it still actually matches Cyrillic', () => {
  if (g.spamReason({ name: 'x', form_location: 'contact_page', message: 'Дарова' }) !== 'Cyrillic text') {
    throw new Error('the escaped range does not match Cyrillic text');
  }
});

check('forward survives no Apps Script runtime', () => g.forwardToCrm({ name: 'Jo' }));
check('forward survives a null payload', () => g.forwardToCrm(null));
check('forward is inert with no properties set', () => {
  globalThis.PropertiesService = { getScriptProperties: () => ({ getProperty: () => null }) };
  globalThis.UrlFetchApp = {
    fetch: () => {
      throw new Error('must not be called when unconfigured');
    },
  };
  g.forwardToCrm({ name: 'Jo' });
  delete globalThis.PropertiesService;
  delete globalThis.UrlFetchApp;
});

console.log(`\n${CASES.length + extra - fail} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
