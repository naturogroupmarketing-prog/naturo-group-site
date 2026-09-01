# Lead backup

A second, independent destination for every web enquiry.

## Why this exists

Leads go to two places: the Sophiie CRM (Inbox + auto-capture) and this Sheet.

Formspree was a third, and was there for a real reason: admin staff who never
open the AI Reception dashboard saw an enquiry only via that email, so for them
it was the delivery rather than a copy. Sophiie now sends that alert itself over
the Gmail connection it already has, so in August 2026 Formspree was removed —
the job it was doing is done by something we run.

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

## What it refuses

The `/exec` URL has to be public — the website is not signed in as anyone — and
it is printed in the page source, so anything on the internet can post to it.
Three bot submissions did, on 17 August 2026: US phone numbers, throwaway
addresses, gibberish message bodies. They reached this Sheet. They did not reach
the CRM, because `captureLead` requires a name plus a contact — luck rather than
design, and the new enquiry alert raises the cost of being wrong, since anything
that gets through is now emailed to staff.

`spamReason()` in `Code.gs` refuses a submission on its **shape**:

| Rule | What it catches |
|---|---|
| the spam trap has a value | a bot that walks the DOM and fills every field |
| no `name` and no `full_name` | the three that arrived — same bar the CRM applies |
| no `form_location` and no `lead_id` | posted straight at the URL, not through a form |

…and, since 1 September 2026, on its **content**:

| Rule | Strength |
|---|---|
| Cyrillic text | conclusive |
| an `<a href>` tag | conclusive |
| three or more links | conclusive |
| two or more domains on `.ru .su .cc .to .top .xyz .icu .club .site .online .link .onion` | conclusive |
| exactly two links · one such domain · two or more inline HTML tags · `#if<html>`/`#else`/`{a\|b}` spintax · over 1000 characters | weak — **two** are needed |

This section used to say the rules read the shape and never the message text,
because judging text would eventually throw away a real enquiry written in a
hurry. That held until a bot arrived the shape rules cannot see. On **31 August
2026 at 10:57** a marketplace-spam post came through the quote lead gate with a
plausible Australian name, mobile and email, a real `form_location`, a real
`lead_id` and an empty honeypot. Every shape rule passed it and it was filed on
the **Leads** tab as a genuine enquiry.

The CRM had met the same family the day before and grown a content gate, so the
identical submission was quarantined there and filed as a lead here. This Sheet
is meant to be an independent destination of *equal standing*, and it had
quietly become the weaker one. The rules above are that gate, ported, so the two
agree — keep them in step with `src/lib/lead-spam.ts` in the sophiie repo. Two
destinations that disagree about what spam is are worse than either alone,
because the answer then depends on which one you happen to open.

The original caution is answered by keeping each rule narrow rather than by
having none: every one is something a real Geelong cleaning enquiry cannot
plausibly contain. No keyword lists, nothing that fires on how a sentence reads,
and **length alone never rejects** — a customer describing a hoarding clean or an
NDIS plan at length is the enquiry we least want to drop.

One trap worth knowing: a Cloudflare Turnstile token is about a kilobyte of
base64, so it is excluded from the scan along with the other captcha and
plumbing fields. Scanning it would trip the length rule on every genuine
enquiry.

Refusals are answered exactly like successes — a bot that can see which rule
caught it can tune around it — and are parked on the **Spam** tab with the
reason, rather than dropped. Nothing here ever deletes: a gate that discards
silently is a gate nobody can audit, and if a rule is ever wrong the enquiry it
ate would be gone with no trace it arrived, while the person who typed it simply
never hears back. Clearing the tab is a human decision. Check it first if
someone says their enquiry vanished.

The CRM keeps its own copy the same way, under **Spam** in the Inbox sidebar, so
a submission blocked at either destination is still there to be looked at.

The trap itself is an unlabelled input placed off-screen (`.nl-hp` in
`src/styles/global.css`), hidden from assistive technology and skipped by the
keyboard. Off-screen rather than `display:none`, because a bot that skips hidden
inputs would walk straight past it. `deliverLead()` reads it in the one place
every form's delivery already passes through, so a new form cannot forget to
wire it up.

```bash
node scripts/lead-backup/spam-gate.test.mjs
```

`reportExistingSpam()` and `moveExistingSpam()` in the editor are the one-off
pair for rows that reached Leads before the gate existed: the first logs what it
would move and changes nothing, the second copies each row to Spam with its
reason and only then removes it from Leads. Both rebuild the payload from the
Raw JSON column, so the same rules decide it as would have decided it live.

A warning if you run them: the editor's function picker and its Run button can
fall out of step — the name shown in the toolbar is not always the function that
runs. Check the execution log names the function you expected before trusting
what it did.

That runs the rules against the real rows — four genuine enquiries and the three
bot posts — without touching the deployment.

## Forwarding no-JavaScript enquiries to the CRM

The contact page's form posts **natively to this URL** when JavaScript is off or
broken — `action` is `webhookUrls[0]`, see `contact-us.astro`. That path cannot
run the site's delivery code, so until 1 September 2026 those enquiries landed
here and **nowhere else**: no Inbox conversation, no alert email, no AI capture.
Nobody who does not open this spreadsheet knew they existed. The backup had
quietly become the *only* copy, for the one visitor least able to work around
it.

`forwardToCrm()` now passes them on, after the row is written. Off unless both
script properties are set — **File → Project properties → Script properties**:

| Property | Value |
|---|---|
| `CRM_LEAD_URL` | `https://sophiie-web.onrender.com/api/widget/lead` |
| `CRM_RELAY_SECRET` | any long random string; the same value goes in Render as `LEAD_RELAY_SECRET` |

The secret lives in Script Properties and **never in `Code.gs`** — this file is
in a public repository.

Four things about it that are deliberate:

- **Sheet first, CRM second.** Pointing the form at the CRM instead would mean a
  no-JavaScript visitor gets an error page when the CRM is down, and the row
  never reaches this Sheet at all — losing the exact redundancy this script
  exists to provide.
- **Native form posts only.** A submission made with JavaScript on has already
  been posted to the CRM directly, in parallel, by `deliverLead()`. Forwarding
  those as well would send the same enquiry twice at almost the same instant,
  and the CRM de-duplicates by looking for an existing row before writing one —
  which two simultaneous requests can both do before either has written.
- **It never throws.** The lead is already saved by the time it runs. A CRM that
  is down, slow or misconfigured must not become a 500 and an error page for
  someone who has just typed their enquiry out.
- **The header says who, never what.** `x-lead-relay` tells the CRM this is our
  own relay, so it skips its captcha check — a native form post never ran
  JavaScript, has no Turnstile token, and never could. The CRM still runs its
  own honeypot and content rules on the payload.

**This costs an OAuth scope.** `UrlFetchApp` adds `script.external_request`, so
Google will ask to authorise the script again on the next deploy. It permits
outbound HTTP to anywhere. That is narrower than the mail scope this script
still refuses (which would allow sending email *as* the account owner), and
unlike that one it buys something concrete. If the trade ever stops being worth
it, delete `forwardToCrm()` and its call and the scope goes with them.

## What it does not do

It is a record, not a workflow. Nothing reads the Sheet, nothing assigns or
follows up, and a lead landing here while the CRM is down still has to be
carried across by hand. Its job is to make sure the enquiry exists somewhere.
