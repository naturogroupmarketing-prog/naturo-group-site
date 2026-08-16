# Lead backup

A second, independent destination for every web enquiry.

## Why this exists

Leads used to go to two places: Formspree (email alert) and the Sophiie CRM
(Inbox + auto-capture). Formspree was retired in August 2026, which left the
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

## Setup

See the deployment steps at the top of `Code.gs`. In short: make a Sheet, paste
the script, deploy as a web app with access set to **Anyone**, and put the
`/exec` URL into `webhookUrl` in `src/data/site.ts`.

Re-deploy a **new version** after any edit — Apps Script serves the deployed
version, not the saved one.

## Checking it works

```bash
curl -s "<YOUR_EXEC_URL>"
# → {"ok":true,"service":"naturo-lead-backup"}
```

To test the real path, submit a form on the site and confirm a row appears.
Note that the `/exec` URL 302-redirects to `googleusercontent.com`; that is
normal, and `curl -L` follows it.

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
