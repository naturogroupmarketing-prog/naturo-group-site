// Long-form copy for each /services/[slug] page.

export type ServiceDetail = {
  hero: {
    eyebrow: string;
    heading: string; // may contain <br /> for line breaks
    sub: string;
    image: string;
  };
  intro: {
    kicker: string;
    heading: string;
    body: string[];
    stats?: { num: string; label: string }[];
  };
  whatsIncluded: { group: string; items: string[] }[];
  process: { step: string; title: string; desc: string }[];
  /** Slugs from posts.ts that genuinely cover this service. Optional:
   *  services with no matching guide render no resources block. */
  relatedPosts?: string[];
  /** ISO date this page's copy last genuinely changed; feeds sitemap lastmod. */
  contentUpdated?: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'house-cleaning': {
    contentUpdated: '2026-08-30',
    relatedPosts: [
      'house-cleaning-cost-geelong',
      'house-cleaning-cost-port-macquarie',
      'eco-friendly-cleaning-geelong',
      'non-toxic-cleaning-products-australia',
    ],
    hero: {
      eyebrow: 'Regular cleaning',
      heading: 'House Cleaning<br />Reliable<br />Every visit',
      sub: 'Reliable, recurring house cleaning from a friendly, trained team &mdash; with non-toxic products supplied.',
      image: '/images/hero-bathroom.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'A spotless home, every week.',
      body: [
        'Life is busy. A regular clean from NATURO GROUP gives you back your weekends and a home that always feels guest-ready. We tailor every visit to your home and your priorities &mdash; no rigid checklists, just a real conversation about what matters.',
        'Trained, police-checked cleaners. Non-toxic products supplied. Skip, pause or reschedule any time.',
      ],
      stats: [
        { num: '100%', label: 'Non-toxic products' },
        { num: '10k+', label: 'Happy households' },
        { num: 'Mon–Fri', label: '5-day service' },
      ],
    },
    whatsIncluded: [
      {
        group: 'Kitchen',
        items: [
          'Wipe down benches, splashbacks and cabinet fronts',
          'Clean stovetop, microwave exterior and sink',
          'Empty bins and replace liners',
          'Sweep and mop floors',
        ],
      },
      {
        group: 'Bathrooms',
        items: [
          'Scrub and disinfect basins, showers and toilets',
          'Wipe mirrors, tiles and fittings',
          'Restock toilet paper if supplied',
          'Mop floors with eco-friendly cleaner',
        ],
      },
      {
        group: 'Living areas & bedrooms',
        items: [
          'Dust all reachable surfaces and skirting',
          'Vacuum rugs, carpets and upholstery',
          'Make beds (sheet change on request)',
          'Tidy and reset rooms to a calm, clean state',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Quick quote', desc: 'Tell us about your home in 60 seconds — get instant pricing.' },
      { step: '2', title: 'Pick a time', desc: 'Choose your day, frequency and any extras.' },
      { step: '3', title: 'Meet your cleaner', desc: 'Trained, police-checked &mdash; with consistent teams where possible.' },
      { step: '4', title: 'Enjoy the difference', desc: 'Come home to a spotless space. We adjust as you go.' },
    ],
  },
  'deep-clean': {
    contentUpdated: '2026-08-30',
    relatedPosts: [
      'how-to-clean-oven-grease-naturally',
      'shower-screen-soap-scum-removal',
      'pet-safe-carpet-stain-removal',
    ],
    hero: {
      eyebrow: 'One-off deep clean',
      heading: 'Deep Cleaning<br />Top-to-bottom<br />Sparkle',
      sub: "A top-to-bottom clean for the rooms, corners and surfaces a regular clean doesn't reach. Perfect after renovations, before guests, or just because.",
      image: '/images/hero-kitchen.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'A complete reset for your home.',
      body: [
        'Our deep clean digs into the detail. Inside ovens. Behind appliances. Skirting boards, switch plates, light fittings and cabinet interiors. The result feels like a brand-new home &mdash; without the moving boxes.',
        'Designed for homes that haven\u2019t had a professional clean in 30+ days, after a renovation, or before a special event. Two cleaners on most jobs to keep the day moving.',
      ],
      stats: [
        { num: '30+', label: 'Detail tasks per home' },
        { num: '2&nbsp;cleaners', label: 'On most deep cleans' },
        { num: '100%', label: 'Non-toxic products' },
      ],
    },
    whatsIncluded: [
      {
        group: 'Kitchen \u2014 deep',
        items: [
          'Inside oven, racks, range hood filter',
          'Inside fridge and freezer (on request)',
          'Inside cabinets and drawers',
          'Behind and under appliances where accessible',
        ],
      },
      {
        group: 'Bathrooms \u2014 deep',
        items: [
          'Grout scrub and tile descale',
          'Showerheads and screens',
          'Exhaust fans and light fittings',
          'Cabinet interiors',
        ],
      },
      {
        group: 'Whole home detail',
        items: [
          'Skirting boards, door frames, light switches',
          'Internal windows and tracks',
          'Air vents and ceiling fans',
          'Spot-cleaning walls and marks',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Walk-through quote', desc: 'Quick photos or a video call so we can size the job accurately.' },
      { step: '2', title: 'Lock in the day', desc: 'We block out the time needed — no rushed jobs.' },
      { step: '3', title: 'Two-cleaner team', desc: 'Most deep cleans are done by a pair to keep the day moving.' },
      { step: '4', title: 'Final check', desc: 'We walk the home with you (or send photos) before signing off.' },
    ],
  },
  'end-of-lease': {
    contentUpdated: '2026-08-30',
    relatedPosts: [
      'end-of-lease-cleaning-checklist-australia',
      'end-of-lease-cleaning-geelong-checklist',
      'end-of-lease-cleaning-port-macquarie-checklist',
    ],
    hero: {
      eyebrow: 'Bond clean',
      heading: 'End of Lease<br />Bond-back<br />Guaranteed',
      sub: 'A 100% bond-back guaranteed end-of-lease clean, done to the real estate exit checklist. Receipt and report supplied for your agent.',
      image: '/images/team-staff.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'Get every dollar of your bond back.',
      body: [
        'Moving is stressful enough. Our end-of-lease team knows exactly what property managers look for &mdash; and we back it with a re-clean guarantee. If anything is flagged on inspection, we come back and fix it free of charge.',
        'Detailed receipt and clean report supplied for your property manager so handover is smooth and dispute-free.',
      ],
      stats: [
        { num: '100%', label: 'Bond-back guarantee' },
        { num: '72&nbsp;hr', label: 'Free re-clean window' },
        { num: '24/7', label: 'Booking online' },
      ],
    },
    whatsIncluded: [
      {
        group: 'All areas',
        items: [
          'Vacuum carpets & sweep all floors',
          'Mop all hard floors',
          'Wipe down skirting boards',
          'Dust cornices & remove cobwebs',
          'Wipe window frames, ledges & tracks',
          'Clean window interiors & tracks',
          'Wipe doors, frames & handles',
          'Clean accessible light fittings',
          'Ceiling fans dusted',
          'Wipe inside & outside wardrobes',
        ],
      },
      {
        group: 'Kitchen',
        items: [
          'Clean all surfaces & sanitise benchtops',
          'Sanitise splashback',
          'Clean stovetop & oven exterior',
          'Clean rangehood & filters',
          'Wipe outside cabinets & appliance exteriors',
          'Clean inside cupboards, shelves & drawers',
          'Polish sink & taps',
        ],
      },
      {
        group: 'Bathrooms',
        items: [
          'Scrub & sanitise toilet',
          'Scrub clean bathtub & shower',
          'Clean mirrors streak-free',
          'Polish sink & taps',
          'Wipe down benchtops',
          'Wipe outside cabinets',
          'Clean inside cabinets, shelves & drawers',
          'Dust accessible exterior fan vents',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Tell us about the property', desc: 'Bedrooms, bathrooms, condition, lease end date.' },
      { step: '2', title: 'Lock in 1\u20132 days before handover', desc: 'We coordinate around your move-out timing.' },
      { step: '3', title: 'Bond-back guarantee', desc: 'If your agent flags anything, we re-clean within 72 hours, free.' },
      { step: '4', title: 'Receipt + report', desc: 'Forward straight to your property manager for sign-off.' },
    ],
  },
  'ndis-cleaning': {
    contentUpdated: '2026-08-30',
    relatedPosts: [
      'ndis-cleaning-routine-supports-independence',
      'ndis-cleaning-geelong-guide',
      'ndis-cleaning-port-macquarie-guide',
    ],
    hero: {
      eyebrow: 'NDIS-friendly cleaning',
      heading: 'NDIS Cleaning<br />Compassionate<br />In-home support',
      sub: 'Compassionate, in-home cleaning for NDIS participants from a trusted, trained team &mdash; with non-toxic products supplied.',
      image: '/images/hero-ocean.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'Cleaning that supports your independence at home.',
      body: [
        'NATURO GROUP supports NDIS participants with everyday cleaning so home stays comfortable, safe and easy to live in &mdash; delivered by a trained team that aims for consistency where possible. We work with plan-managed and self-managed participants every week.',
        'We handle invoicing and reporting direct to your plan manager or support coordinator so you don\u2019t have the paperwork. Note: we are not currently a registered NDIS provider, so agency-managed funding cannot be used.',
      ],
      stats: [
        { num: 'NDIS', label: 'Plan & self-managed welcome' },
        { num: '100%', label: 'Non-toxic products' },
        { num: '100%', label: 'Police-checked team' },
      ],
    },
    whatsIncluded: [
      {
        group: 'Kitchen & living',
        items: [
          'Wipe benches, splashbacks and cabinet fronts',
          'Clean stovetop, microwave and sink',
          'Vacuum and mop floors',
          'Empty bins and replace liners',
        ],
      },
      {
        group: 'Bathrooms & bedrooms',
        items: [
          'Disinfect basins, showers and toilets',
          'Wipe mirrors, tiles and fittings',
          'Change linen on request',
          'Dust surfaces and tidy rooms',
        ],
      },
      {
        group: 'Plan support',
        items: [
          'Direct invoicing to plan managers',
          'Detailed service notes',
          'Flexible scheduling around appointments',
          'Police-checked, fully insured cleaners',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Talk it through', desc: 'A friendly call to understand your goals and plan.' },
      { step: '2', title: 'Tailored plan', desc: 'A cleaning plan matched to your supports and budget.' },
      { step: '3', title: 'Meet your team', desc: 'Trained, police-checked cleaners who treat your home with care.' },
      { step: '4', title: 'Reporting', desc: 'Notes and invoices direct to your plan manager.' },
    ],
  },
  'aged-care-cleaning': {
    contentUpdated: '2026-08-30',
    hero: {
      eyebrow: 'Aged care cleaning',
      heading: 'Aged Care Cleaning<br />Patient<br />Trusted at home',
      sub: 'Patient, friendly cleaners helping older Australians stay independent and comfortable in their own home.',
      image: '/images/phone-woman.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'Cleaning that feels like family.',
      body: [
        'Our team is trained to support older Australians with respect and patience. We aim to send the same friendly cleaner where possible so your loved one feels comfortable at home.',
        'Fragrance-conscious, non-toxic products. Flexible visits around medical appointments and care routines. Reports available for family or care coordinators.',
      ],
      stats: [
        { num: 'Mon–Fri', label: '5-day service' },
        { num: '100%', label: 'Police-checked team' },
        { num: 'Fragrance', label: 'Conscious products' },
      ],
    },
    whatsIncluded: [
      {
        group: 'Kitchen & living',
        items: [
          'Wash dishes and tidy benches',
          'Wipe stovetop and microwave',
          'Vacuum and mop floors',
          'Empty bins and replace liners',
        ],
      },
      {
        group: 'Bathrooms & bedrooms',
        items: [
          'Disinfect bathroom and toilet',
          'Strip and remake beds',
          'Light laundry on request',
          'Tidy and dust bedrooms',
        ],
      },
      {
        group: 'Care-friendly extras',
        items: [
          'Fragrance-conscious products',
          'Flexible around appointments',
          'Reports for family / coordinator',
          'Consistent cleaning team where possible',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Friendly intro call', desc: 'We chat with you (and family if helpful) about needs.' },
      { step: '2', title: 'Tailored plan', desc: 'A schedule that works around medical and care routines.' },
      { step: '3', title: 'Meet your cleaner', desc: 'Trained, police-checked &mdash; with consistent teams where possible.' },
      { step: '4', title: 'Stay in touch', desc: 'Easy contact for changes, with reports as needed.' },
    ],
  },
  'insurance-cleaning': {
    contentUpdated: '2026-08-30',
    hero: {
      eyebrow: 'Insurance work',
      heading: 'Insurance Cleaning<br />Detailed scopes<br />Direct billing',
      sub: 'Detailed scopes, photo reporting and direct billing for insurance claim work &mdash; from water and storm damage to trauma cleans.',
      image: '/images/banner-staff.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'Trusted by insurers, trusted by clients.',
      body: [
        'NATURO GROUP works directly with insurance providers and assessors on claim work. We supply detailed scopes, before/after photographs and itemised reports so claims are paid without back-and-forth.',
        'Our teams handle water, fire, storm and trauma cleans, plus general property restoration. Direct billing is available where the insurer supports it.',
      ],
      stats: [
        { num: '$20M', label: 'Public liability cover' },
        { num: 'Fast', label: 'Urgent response' },
        { num: 'Direct', label: 'Billing where supported' },
      ],
    },
    whatsIncluded: [
      {
        group: 'Scope & assessment',
        items: [
          'On-site or remote scoping',
          'Itemised quote for insurer',
          'Before / after photographs',
          'Final report on completion',
        ],
      },
      {
        group: 'Cleaning works',
        items: [
          'Water and storm damage cleaning',
          'Smoke and soot remediation',
          'Trauma and biohazard cleans',
          'Carpet, hard floor and surface restoration',
        ],
      },
      {
        group: 'Billing & reporting',
        items: [
          'Direct billing where supported',
          'Itemised invoices',
          'Photo evidence supplied',
          'Fully insured, police-checked teams',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Claim referral', desc: 'Insurer or client contacts us with the claim details.' },
      { step: '2', title: 'Scope on-site', desc: 'We attend, photograph and quote the works.' },
      { step: '3', title: 'Approved works', desc: 'Once approved, we complete the clean to scope.' },
      { step: '4', title: 'Report & invoice', desc: 'Photos, report and invoice sent for sign-off.' },
    ],
  },
  'veterans-cleaning': {
    contentUpdated: '2026-08-30',
    hero: {
      eyebrow: 'Department of Veterans\u2019 Affairs',
      heading: 'Veterans (DVA)<br />Cleaning<br />Coordinated with your case manager',
      sub: 'Respectful, reliable in-home cleaning for DVA Gold and White card holders &mdash; we work alongside your DVA case manager.',
      image: '/images/team-staff.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'A clean home, with the respect you\u2019ve earned.',
      body: [
        'NATURO GROUP cleans for DVA Gold and White card holders every week. We coordinate with your DVA case manager and supply detailed reports for your file.',
        'A friendly, police-checked team that aims for consistency where possible. Non-toxic products supplied. Visits scheduled around your routine.',
      ],
      stats: [
        { num: 'DVA', label: 'Card holders welcome' },
        { num: '100%', label: 'Police-checked team' },
        { num: 'Reports', label: 'Sent to your case manager' },
      ],
    },
    whatsIncluded: [
      {
        group: 'Kitchen & living',
        items: [
          'Wipe benches and cabinet fronts',
          'Clean stovetop and microwave',
          'Vacuum and mop floors',
          'Empty bins and replace liners',
        ],
      },
      {
        group: 'Bathrooms & bedrooms',
        items: [
          'Disinfect bathroom and toilet',
          'Wipe mirrors, tiles and fittings',
          'Make beds (sheet change on request)',
          'Dust surfaces and tidy rooms',
        ],
      },
      {
        group: 'DVA support',
        items: [
          'Coordinate with your DVA case manager',
          'Gold and White card holders welcome',
          'Consistent cleaning team where possible',
          'Police-checked, fully insured cleaners',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Quick chat', desc: 'Confirm your DVA card details and what you need.' },
      { step: '2', title: 'Confirm schedule', desc: 'We arrange visits in line with your case manager\u2019s plan.' },
      { step: '3', title: 'Meet your cleaner', desc: 'Trained, police-checked &mdash; with consistent teams where possible.' },
      { step: '4', title: 'Reports filed', desc: 'Detailed visit reports sent to your case manager for the file.' },
    ],
  },
  // ── Commercial & office ──────────────────────────────────────────────────
  // Deliberately promises a quote, not a price: commercial work is scoped on
  // site, and the funnel's pricing engine refuses to auto-quote it for the same
  // reason. No claim here about response times, insurance limits or client
  // names — those belong in funnel-config.ts once the business confirms them.
  'commercial-cleaning': {
    contentUpdated: '2026-08-30',
    hero: {
      eyebrow: 'Commercial cleaning',
      heading: 'Office Cleaning<br />Around<br />Your Hours',
      sub: 'Scheduled cleaning for offices and commercial premises &mdash; worked around your trading hours, with non-toxic products supplied.',
      image: '/images/hero-kitchen.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'A workplace your team is glad to walk into.',
      body: [
        'Commercial cleaning is not a bigger house clean. It runs to your hours, respects your access and security arrangements, and has to be consistent enough that nobody in your team ever has to think about it.',
        'We scope every site before quoting, so the schedule matches how the space is actually used &mdash; which rooms take the traffic, when the bins need to go out, and what has to be restocked.',
      ],
    },
    whatsIncluded: [
      {
        group: 'Workspaces',
        items: [
          'Workstations, desks and shared surfaces',
          'Meeting rooms reset between uses',
          'Reception and entry glass',
          'Floors vacuumed and mopped throughout',
        ],
      },
      {
        group: 'Amenities',
        items: [
          'Kitchens and break rooms',
          'Washrooms cleaned and sanitised',
          'Consumables restocked',
          'Waste and recycling collected',
        ],
      },
      {
        group: 'Working with you',
        items: [
          'Cleaning outside your trading hours',
          'Access, key and alarm arrangements agreed up front',
          'Police-checked, fully insured cleaners',
          'A schedule set to how the space is actually used',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Tell us about the site', desc: 'Premises type, floor area, hours and how we get in.' },
      { step: '2', title: 'Site walk-through', desc: 'We look at the space so the quote reflects the real job.' },
      { step: '3', title: 'Written quote', desc: 'A scope and a schedule you can put in front of a decision-maker.' },
      { step: '4', title: 'Regular service', desc: 'A consistent team, on the agreed schedule.' },
    ],
  },

  // ── Airbnb turnovers ─────────────────────────────────────────────────────
  'airbnb-cleaning': {
    contentUpdated: '2026-08-30',
    hero: {
      eyebrow: 'Short-stay turnovers',
      heading: 'Airbnb Turnovers<br />Guest-Ready<br />Every Time',
      sub: 'Between-guest cleans presented and restocked ready for check-in &mdash; for single listings or a whole portfolio.',
      image: '/images/hero-bathroom.webp',
    },
    intro: {
      kicker: 'About this service',
      heading: 'The changeover, handled.',
      body: [
        'A short-stay turnover is a deadline, not just a clean. Checkout to check-in is a fixed window, and everything &mdash; beds, bathrooms, kitchen, bins, presentation &mdash; has to be done inside it.',
        'We work to that window, and we tell you if something is not right before your next guest finds it.',
      ],
    },
    whatsIncluded: [
      {
        group: 'Reset',
        items: [
          'Whole property cleaned between guests',
          'Beds stripped and remade',
          'Kitchen reset &mdash; dishes, appliances and surfaces',
          'Rubbish removed and bins put out where required',
        ],
      },
      {
        group: 'Restock',
        items: [
          'Bathrooms restocked',
          'Linen change with your linen',
          'Consumables checked',
          'Anything left behind set aside for you',
        ],
      },
      {
        group: 'Presentation',
        items: [
          'Final walk-through before the next arrival',
          'Damage or missing items reported to you',
          'Consistent presentation across every stay',
          'Non-toxic products supplied',
        ],
      },
    ],
    process: [
      { step: '1', title: 'Tell us the listing', desc: 'Size, location and how tight the changeover window is.' },
      { step: '2', title: 'Agree the turnaround', desc: 'We confirm what we can commit to between checkout and check-in.' },
      { step: '3', title: 'Turnover', desc: 'Cleaned, reset and restocked ready for the next guest.' },
      { step: '4', title: 'You hear from us', desc: 'A note if anything needs your attention &mdash; before your guest arrives.' },
    ],
  },
};

// ---------------------------------------------------------------------------
// Per-service FAQs.
//
// Why this exists
// --------------
// Every /services/<slug> page rendered the same nine site-wide FAQs from
// site.ts, and emitted the same FAQPage schema built from that same array. On
// nine pages that is one block of duplicated copy repeated nine times, and nine
// pages competing for the identical FAQ rich result. Measured on the built
// HTML the nine service pages ran 82–84% similar to one another in the
// specialty cluster; the FAQ block was the single largest shared chunk.
//
// The distinguishing facts were never missing — "we are not a registered NDIS
// provider", "DVA Gold and White card holders", "$20m public liability",
// "72-hour free re-clean" — they were just outweighed by boilerplate. These
// answers put those facts in front of the reader, and they make the FAQPage
// markup honest: the schema on each page is now generated from the questions
// that page actually displays.
//
// Sourcing rule
// -------------
// Every claim below is already published elsewhere in this repo — the service's
// own intro/stats/process copy in this file, or site.ts. Nothing here is new.
// If a service has no verified answer to a common question, the question is
// left out rather than answered plausibly. Do not add a price, a response time,
// a certification or a registration that the business has not confirmed.
// ---------------------------------------------------------------------------
export const serviceFaqs: Record<string, { q: string; a: string }[]> = {
  'house-cleaning': [
    {
      q: 'How often should I book a regular house clean?',
      a: 'Most households book weekly or fortnightly. We tailor each visit to your home and your priorities rather than working to a rigid checklist, so the frequency that suits a busy family is not the one that suits a couple in an apartment. Tell us how the house is used and we will suggest a schedule.',
    },
    {
      q: 'Can I skip, pause or reschedule a clean?',
      a: 'Yes — skip, pause or reschedule any time. Recurring cleaning should fit around holidays, visitors and a change of plans, not lock you in.',
    },
    {
      q: 'Do I need to supply anything?',
      a: 'No. Our cleaners bring all products and equipment, and every product we use is non-toxic. You do not need to leave anything out for us.',
    },
    {
      q: 'Will I get the same cleaner each visit?',
      a: 'We aim for consistency and send the same team where possible, so your cleaner learns your home and you are not re-explaining it every fortnight. Leave, illness and scheduling mean we cannot promise it every single visit.',
    },
    {
      q: 'Are your cleaners police-checked and insured?',
      a: 'Every NATURO GROUP cleaner is trained, police-checked and fully insured, with $20m public liability cover held by the business.',
    },
  ],

  'deep-clean': [
    {
      q: 'What is the difference between a deep clean and a regular clean?',
      a: 'A regular clean maintains a home that is already on top of things. A deep clean goes after what a regular visit does not reach — inside the oven, behind and under accessible appliances, inside cabinets and drawers, grout, exhaust fans, light fittings, skirting boards, air vents, ceiling fans, and internal windows and their tracks.',
    },
    {
      q: 'When is a deep clean the right choice?',
      a: 'It is built for homes that have not had a professional clean in 30 or more days, for the mess left after a renovation, and for the week before a special event. It is a reset rather than a routine.',
    },
    {
      q: 'How many cleaners come, and how long does it take?',
      a: 'We put two cleaners on most deep cleans to keep the day moving. How long it takes depends on the size and condition of the home, so we confirm that when we quote rather than guessing up front.',
    },
    {
      q: 'Is the inside of the fridge included?',
      a: 'Inside the fridge and freezer is done on request. Inside the oven, the racks and the range hood filter are part of the standard deep clean.',
    },
    {
      q: 'Do you use non-toxic products for a deep clean?',
      a: 'Yes. The products are the same non-toxic range we use on every job — the difference in a deep clean is the detail and the time spent, not harsher chemicals.',
    },
  ],

  'end-of-lease': [
    {
      q: 'What does the bond-back guarantee actually cover?',
      a: 'If your property manager flags anything from our scope at the exit inspection, we come back and re-clean it free of charge within a 72-hour window. That is the guarantee in full — a return visit at our cost, not a cash promise about the bond itself, which is your agent and the tenancy authority to decide.',
    },
    {
      q: 'When should I book the clean relative to handover?',
      a: 'One to two days before handover works best. It leaves the property in inspection condition without a gap long enough for dust and use to undo it, and it keeps the re-clean window open before your keys are due.',
    },
    {
      q: 'Do you supply anything for my property manager?',
      a: 'Yes — a detailed receipt and a clean report you can forward straight to your agent for sign-off. Handover disputes usually come down to what can be evidenced, so we put it in writing.',
    },
    {
      q: 'Is the clean done to the real estate exit checklist?',
      a: 'It is. The scope covers all areas, kitchen and bathrooms to the standard exit list — inside cupboards, shelves and drawers, oven exterior, range hood and filters, window interiors and tracks, skirting boards, cornices, wardrobes inside and out, and accessible light fittings.',
    },
    {
      q: 'Does the property need to be empty?',
      a: 'An empty property gets the best result, because we can reach inside and behind everything on the exit list. Tell us what will still be in place when you book so the quote reflects the job we will actually walk into.',
    },
  ],

  'ndis-cleaning': [
    {
      q: 'Can I use my NDIS funding for your cleaning?',
      a: 'Plan-managed and self-managed participants can, and we work with both every week. We are not currently a registered NDIS provider, which means agency-managed funding cannot be used for our services. We would rather tell you that up front than have an invoice rejected later.',
    },
    {
      q: 'Do I have to handle the invoicing?',
      a: 'No. We invoice your plan manager or support coordinator direct and supply detailed service notes, so the paperwork does not land on you.',
    },
    {
      q: 'Can visits work around my appointments?',
      a: 'Yes. Scheduling is flexible around therapy, medical appointments and your other supports — tell us what your week looks like and we build the visits around it.',
    },
    {
      q: 'What does an NDIS clean cover?',
      a: 'Everyday cleaning that keeps home comfortable and easy to live in: kitchen benches, splashbacks and cabinet fronts, stovetop, microwave and sink, vacuuming and mopping, bins, bathroom and toilet disinfecting, mirrors, tiles and fittings, dusting and tidying, and a linen change on request.',
    },
    {
      q: 'Are the cleaners police-checked?',
      a: 'Every cleaner is trained, police-checked and fully insured, and we aim to send the same team where possible so you are not welcoming a stranger into your home each visit.',
    },
  ],

  'aged-care-cleaning': [
    {
      q: 'Will my parent see the same cleaner each time?',
      a: 'That is what we aim for. Familiarity matters more in aged care than in any other service we run, so we send the same friendly cleaner where possible rather than whoever is free that day.',
    },
    {
      q: 'What if strong smells are a problem?',
      a: 'Our products are non-toxic and fragrance-conscious, which matters where a resident is sensitive to scent or has a respiratory condition.',
    },
    {
      q: 'Can visits fit around medical appointments and care routines?',
      a: 'Yes — the schedule is built around appointments and the rhythm of the day rather than the other way round.',
    },
    {
      q: 'Can family or a care coordinator get an update?',
      a: 'Reports are available for family or care coordinators, which helps when the person arranging the cleaning is not the person living in the home.',
    },
    {
      q: 'What is included beyond a standard clean?',
      a: 'Alongside the kitchen, bathroom and floors, our aged care visits cover washing dishes and tidying benches, stripping and remaking beds, light laundry on request, and dusting and tidying bedrooms.',
    },
  ],

  'veterans-cleaning': [
    {
      q: 'Which DVA cards do you accept?',
      a: 'We clean for DVA Gold and White card holders, and we do it every week.',
    },
    {
      q: 'Do you deal with my DVA case manager?',
      a: 'Yes. We coordinate visits in line with your case manager’s plan and send detailed visit reports through for your file, so the arrangement stays documented without you chasing it.',
    },
    {
      q: 'How do I get started?',
      a: 'A quick chat to confirm your card details and what you need, then we arrange the schedule with your case manager. Call 1300 876 472 during business hours, Monday to Friday, 8:30am to 5:00pm.',
    },
    {
      q: 'Will it be the same cleaner each visit?',
      a: 'We aim for consistency and send the same police-checked team where possible, and we schedule visits around your routine rather than expecting you to work around ours.',
    },
    {
      q: 'What products do you use in the home?',
      a: 'Non-toxic products, supplied by us. You do not need to have anything ready for the cleaner.',
    },
  ],

  'insurance-cleaning': [
    {
      q: 'Do you bill the insurer directly?',
      a: 'Direct billing is available where the insurer supports it. Where it is not, we supply an itemised invoice with the photo evidence attached so the claim can be settled without a round of questions.',
    },
    {
      q: 'What types of claim work do you handle?',
      a: 'Water, fire, storm and trauma cleans, smoke and soot remediation, carpet, hard floor and surface restoration, and general property restoration.',
    },
    {
      q: 'What documentation comes with the job?',
      a: 'On-site or remote scoping, an itemised quote written for the insurer, before and after photographs, and a final report on completion. Claims stall on missing evidence, so the reporting is part of the service rather than an extra.',
    },
    {
      q: 'How does the process run from referral to invoice?',
      a: 'The insurer or the client contacts us with the claim details. We attend, photograph and quote the works. Once approved, we complete the clean to that scope. Photos, report and invoice then go across for sign-off.',
    },
    {
      q: 'What insurance do your teams carry?',
      a: 'The business holds $20m public liability cover, and every cleaner on site is police-checked and fully insured.',
    },
  ],

  'commercial-cleaning': [
    {
      q: 'Can you clean outside our trading hours?',
      a: 'Yes — the schedule is worked around your trading hours. Commercial cleaning has to be consistent enough that nobody on your team ever has to think about it, which usually means we are not there while they are.',
    },
    {
      q: 'How do you quote a commercial site?',
      a: 'We scope every site before quoting. A quote written off a floor area misses what actually drives the work: which rooms take the traffic, when the bins need to go out, and what has to be restocked.',
    },
    {
      q: 'How do you handle keys, alarms and site access?',
      a: 'Access and security arrangements are agreed as part of the site scope and we work to them. Tell us how your building runs and the schedule is built to fit it.',
    },
    {
      q: 'Is commercial cleaning just a larger house clean?',
      a: 'No, and treating it that way is why scheduled cleaning fails. It runs to your hours, respects your access and security arrangements, and has to hold the same standard every visit regardless of who is rostered.',
    },
    {
      q: 'What does the scope cover?',
      a: 'Workspaces, amenities, and the working-with-you arrangements — the detail is set per site during scoping, because an office, a clinic and a warehouse do not need the same round.',
    },
  ],

  'airbnb-cleaning': [
    {
      q: 'Can you turn a property around between checkout and check-in?',
      a: 'That window is the job. A short-stay turnover is a deadline, not just a clean — beds, bathrooms, kitchen, bins and presentation all have to be finished inside it, and we work to that window.',
    },
    {
      q: 'Do you handle more than one listing?',
      a: 'Yes — single listings or a whole portfolio.',
    },
    {
      q: 'What happens if something is damaged or missing?',
      a: 'We tell you before your next guest finds it. Being the first to know is most of the value of having someone in the property between stays.',
    },
    {
      q: 'Do you restock consumables?',
      a: 'Restocking is part of the turnover, alongside the reset and the presentation of the property for check-in.',
    },
    {
      q: 'Are your cleaners police-checked?',
      a: 'Every cleaner is trained, police-checked and fully insured, which matters when they hold access to a property you are not living in.',
    },
  ],
};
