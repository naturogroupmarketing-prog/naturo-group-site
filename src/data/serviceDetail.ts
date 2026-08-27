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
  faqIds?: string[];
  /** Slugs from posts.ts that genuinely cover this service. Optional:
   *  services with no matching guide render no resources block. */
  relatedPosts?: string[];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  'house-cleaning': {
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
};
