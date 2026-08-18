# Lead backup

A second, independent destination for every web enquiry.

## Why this exists

Leads go to three places: the Sophiie CRM (Inbox + auto-capture), this Sheet,
and Formspree. Formspree is not legacy — admin staff who do not work in the AI
Reception dashboard see an enquiry only via that email, so for them it is the
delivery rather than a copy.

Formspree was briefly switched off in August 2026, which left the
CRM as the only path — and the forms could not tell when that path failed,
because `fetch` only rejects on network errors. An HTTP 403 (the webform widget
switched off in Sophiie) or a 500 read as success, and the visitor was thanked
regardless.

Two things changed:

1. **The site now checks the response.** `window.naturoLeads.deliver()` in
   `src/components/Analytics.astro` posts every configured destination, checks
   each answer, and reports whether the lead landed anywhere. When nothing
   accepted it, the form says so and shows the phone number instead of a
   confirmation.
2. **This script is the second destination**, restoring the redundancy without
   restoring the subscription.

At ~350 enquiries a month, every hosted free tier is too small — Formspree 50,
Basin 100, Netlify Forms 100, Web3Forms 250 — so the choice was pay again or
self-host. Apps Script is free and 350/month is far below any quota that
matters.

## Live setup

Deployed 16 August 2026 under `naturogroupmarketing@gmail.com`:

| | |
|---|---|
| Spreadsheet | **NATURO — Website leads (backup)**, tab `Leads` |
| Apps Script project | **NATURO lead backup** (bound to that sheet) |
| Deployment | Web app · Execute as **Me** · Access **Anyone** |
| Wired into | `leadCapture.webhookUrl` in `src/data/site.ts` |

Re-deploy a **new version** after any edit — Apps Script serves the deployed
version, not the saved one, so editing `Code.gs` alone changes nothing. The
`/exec` URL survives a re-deploy, so the site needs no change when you do.

To rebuild it from scratch, follow the steps at the top of `Code.gs`.

## Checking it works

```bash
curl -sL "$(grep -o "https://script.google.com[^']*" ../../src/data/site.ts | head -1)"
# → {"ok":true,"service":"naturo-lead-backup"}
```

That only proves the deployment answers. To test the real path, submit a form on
the site and confirm a row appears in the Sheet AND a conversation appears in
the CRM Inbox — the two are independent, and the whole point is that either can
fail without the other.

`selfTest()` in the editor writes one row directly, which isolates a
spreadsheet-permission problem from a request-delivery one.

Two things that will waste your time otherwise:

- The `/exec` URL 302-redirects to `googleusercontent.com`. `curl -L` follows it
  but downgrades POST to GET and drops the body, so a curl POST can look like a
  silent failure. Use the browser, or `curl -L --post302`.
- Google Sheets does not always repaint a newly appended row in an idle tab.
  Press <kbd>Cmd</kbd>+<kbd>↓</kbd> from A1 before concluding nothing was
  written — this cost an hour once.

## The CORS constraint

Apps Script web apps do not answer CORS preflight (`OPTIONS`) requests. A
browser POST with `Content-Type: application/json` triggers a preflight and
therefore fails before it is sent.

The site posts this endpoint as `text/plain;charset=utf-8`, which is
CORS-safelisted and skips the preflight. The body is still JSON and is parsed
as JSON. **Do not change the site to send `application/json` to this URL** — it
will silently stop working, which is precisely the failure mode this whole
exercise was about.

## What it does not do

It is a record, not a workflow. Nothing reads the Sheet, nothing assigns or
follows up, and a lead landing here while the CRM is down still has to be
carried across by hand. Its job is to make sure the enquiry exists somewhere.
