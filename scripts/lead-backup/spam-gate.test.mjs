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
new Function('g', readFileSync(join(here, 'Code.gs'), 'utf8') + '; g.spamReason = spamReason;')(g);

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
];

let fail = 0;
for (const [label, payload, want] of CASES) {
  const got = g.spamReason(payload);
  const ok = got === want;
  if (!ok) fail++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(38)} -> ${JSON.stringify(got)}${ok ? '' : `  (wanted ${JSON.stringify(want)})`}`);
}
console.log(`\n${CASES.length - fail} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
