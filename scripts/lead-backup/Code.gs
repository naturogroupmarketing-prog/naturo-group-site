/**
 * Lead backup — Google Apps Script web app.
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
 * ─── Deploy ───────────────────────────────────────────────────────────────
 *  1. Create a Google Sheet. Name the first tab "Leads". Note its ID from the
 *     URL: docs.google.com/spreadsheets/d/<THIS PART>/edit
 *  2. Extensions → Apps Script. Paste this file over Code.gs.
 *  3. Put the ID in SHEET_ID below. Set ALERT_EMAIL if you want an email per
 *     lead ('' disables it).
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as:        Me
 *       Who has access:    Anyone            ← required; the website is not
 *                                              signed in as anyone
 *  5. Copy the /exec URL it gives you and put it in `webhookUrl` in
 *     src/data/site.ts.
 *  6. Re-deploy (Deploy → Manage deployments → edit → Version: New version)
 *     after ANY edit to this file. Apps Script serves the deployed version,
 *     not the saved one — an edit alone changes nothing.
 *
 * ─── Note on CORS ─────────────────────────────────────────────────────────
 * Apps Script web apps do not answer CORS preflight (OPTIONS) requests, so a
 * browser POST carrying `Content-Type: application/json` fails before it is
 * ever sent. The site therefore posts this endpoint as `text/plain`, which is
 * CORS-safelisted and skips the preflight; the body is still JSON, and is
 * parsed as such below. Do not "fix" the site to send application/json.
 */

/** Spreadsheet the leads are appended to. */
var SHEET_ID = 'PASTE_SHEET_ID_HERE';

/** Tab within that spreadsheet. Created automatically if missing. */
var SHEET_NAME = 'Leads';

/** Email a copy of each lead here. Set to '' to turn the emails off. */
var ALERT_EMAIL = '';

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
    appendLead(payload);
    if (ALERT_EMAIL) sendAlert(payload);
    return isNativeFormPost ? redirectOut(THANK_YOU_URL) : jsonOut({ ok: true });
  } catch (err) {
    // Logged rather than swallowed: a failure here is invisible to the site
    // (it only reads ok/not-ok), so the execution log is the only record.
    console.error('lead-backup failed: ' + (err && err.stack ? err.stack : err));
    if (isNativeFormPost) return redirectOut(THANK_YOU_URL);
    return jsonOut({ ok: false, error: String(err) });
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
      // Not JSON — fall through to the parsed form parameters.
    }
  }
  if (e && e.parameter && Object.keys(e.parameter).length) return e.parameter;
  throw new Error('empty request body');
}

function appendLead(p) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }

  var attr = p.attribution && typeof p.attribution === 'object' ? p.attribution : {};
  sheet.appendRow([
    new Date(),
    str(p.name),
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

function sendAlert(p) {
  var name = str(p.name) || 'Someone';
  var lines = [
    'Name:     ' + str(p.name),
    'Phone:    ' + str(p.phone),
    'Email:    ' + str(p.email),
    'Service:  ' + str(p.service || p.serviceLabel),
    'Location: ' + str(p.location || p.service_location || p.suburb),
    'Form:     ' + str(p.form_location || p.source),
    '',
    str(p.message || p.notes),
  ];
  MailApp.sendEmail({
    to: ALERT_EMAIL,
    subject: 'Website enquiry — ' + name,
    body: lines.join('\n'),
  });
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
      '<p>Thanks — your enquiry has been received. ' +
      '<a href="' + safe + '">Continue</a>.</p>',
  );
}
