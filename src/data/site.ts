// Single source of truth for site copy & assets.
// Copy is mirrored from the live naturogroup.com.au extraction (extracted/home-full.json).

export const site = {
  name: 'Naturo Group',
  legalName: 'NATURO GROUP PTY LTD ATF Hanelg Trust',
  abn: 'ABN 59 132 954 348',
  tagline: 'Trusted, Trained and Thorough',
  description:
    'Eco-friendly residential and commercial cleaning across Australia. Specialists in NDIS, aged care, veterans affairs and insurance cleaning.',
  url: 'https://naturogroup.com.au',
  phone: '1300 876 472',
  phoneHref: 'tel:1300876472',
  email: 'admin@naturogroup.com.au',
  emailHref: 'mailto:admin@naturogroup.com.au',
  hours: 'Monday – Fridays  8:30am – 5:00pm',
  bookingUrl: '/quote',
  // Replace with your actual Google Business Profile review link.
  // Get it from: Google Maps → search your business → Share → Copy link,
  // then append &review=1 — or use the direct short link from your GBP dashboard.
  googleReviewUrl: 'https://g.page/r/CZxUFyLhnHLbEAE/review',
  social: {
    facebook: 'https://www.facebook.com/naturogroup',
    instagram: 'https://www.instagram.com/naturogroup/',
    youtube: 'https://www.youtube.com/@NGclean',
  },
  copyright: '© 2026 NATURO GROUP PTY LTD ATF Hanelg Trust. All rights reserved.',
};

export const ctaPrimary = { text: 'Get a Free Quote', href: site.bookingUrl };
export const ctaPhone = { text: site.phone, href: site.phoneHref };

// ---------------------------------------------------------------------------
// Verified aggregate review data — the ONLY source for AggregateRating markup.
//
// Populate a key strictly from the figures shown in the Google Business Profile
// dashboard for that location, and refresh them when they move. Leave a key as
// `null` to emit no AggregateRating at all for those pages.
//
// `null` is the correct default, not a gap to fill with something plausible.
// Publishing a rating that is not backed by real reviews puts gold stars on the
// search result that no customer earned. That is review spam under Google's
// structured-data policies — enforced with a manual action against the whole
// domain, not the single page — and a false representation about testimonials
// under Australian Consumer Law (CCA 2010 Sch 2, s29).
//
// History: every template previously hardcoded 4.7/127 (Geelong) or 4.8/94
// (Port Macquarie) as acknowledged placeholders — reviews.astro carried the
// comment "Replace the placeholder values below with verified figures", which
// never happened. Those values shipped on 239 pages. Hence one gated source.
// ---------------------------------------------------------------------------
export type VerifiedRating = { ratingValue: string; reviewCount: string };

// Verified against the live Google Business Profiles on 13 August 2026.
// Re-check quarterly — these numbers move, and a stale figure is the same
// misrepresentation as an invented one.
export const verifiedRatings: Record<string, VerifiedRating | null> = {
  // NATURO GROUP Geelong — genuinely 5.0, but from a single review. Google
  // generally won't render a star rating off one review, and publishing
  // "5.0" without context would oversell a one-review sample. Left null
  // deliberately; populate once the review base is meaningful.
  geelong: null,

  // NATURO GROUP Port Macquarie — real and substantial. This is where the
  // site's long-standing "4.7" figure actually comes from.
  portMacquarie: { ratingValue: '4.7', reviewCount: '48' },

  // Across both verified profiles: (4.7 x 48 + 5.0 x 1) / 49 = 4.71 -> 4.7.
  siteWide: { ratingValue: '4.7', reviewCount: '49' },
};

/** Returns an AggregateRating fragment to spread, or `{}` when unverified. */
export function aggregateRatingSchema(key: keyof typeof verifiedRatings) {
  const r = verifiedRatings[key];
  if (!r) return {};
  return {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: r.ratingValue,
      reviewCount: r.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
  };
}

// ---------------------------------------------------------------------------
// Lead capture / retargeting destinations
//
// The "Get a free quote" modal collects {name, phone, email} and pushes
// the lead to whichever destinations are configured below. Leave a value
// empty to skip that destination — everything is opt-in.
//
// Pick whichever combination matches your stack:
//   - webhookUrl:    Any endpoint that accepts JSON POST (Formspree,
//                    Web3Forms, Getform, Zapier, Make, n8n, Brevo,
//                    HubSpot Forms API, a Google Apps Script web app,
//                    your own backend, etc.). This is the primary place
//                    leads end up so you can export / sync them later.
//   - metaPixelId:   Facebook/Instagram Pixel ID. Fires the standard
//                    `Lead` event so you can build a Custom Audience
//                    of "people who started a quote" for retargeting.
//   - googleAdsId +
//     googleAdsLabel:Google Ads conversion ID + label. Fires a
//                    `conversion` event so you can build a remarketing
//                    list / measure ad-driven leads.
//   - gtmId:         Google Tag Manager container ID. We push a
//                    `lead_captured` event to dataLayer so any tag
//                    inside GTM (LinkedIn, TikTok, Pinterest, etc.)
//                    can fire on it.
//   - clarityProjectId:
//                    Microsoft Clarity project ID (Clarity → Settings →
//                    Overview → "Project ID", a ~10-character string like
//                    'abcd1234ef'). Clarity records session replays and
//                    heatmaps, so it only loads after cookie consent, the
//                    same as every other tag here. Leave it '' to keep
//                    Clarity switched off entirely.
// ---------------------------------------------------------------------------
export const leadCapture = {
  // Destinations posted ALONGSIDE crmUrl, each independently: one failing does
  // not affect the others, and the visitor is only warned if every one of them
  // fails. Order matters only in that the first is also the no-JS form target
  // on the contact page, so it has to be something that can answer a plain
  // browser form post.
  //
  // Content type is chosen per host by the deliverer in Analytics.astro:
  // Apps Script gets text/plain because it does not answer CORS preflight and
  // would reject application/json before the request was even sent; everything
  // else gets JSON. Do not "simplify" that to one content type.
  webhookUrls: [
    // Appends every lead to the "NATURO — Website leads (backup)" sheet.
    // Source and deployment notes in scripts/lead-backup/.
    'https://script.google.com/macros/s/AKfycbx3d4tNS99N9ZQQBLmz476_rfZGEfncX9ubNp3TV2dWdGf9b3vuat1ap1vyds_Zt7Y/exec',
    // Formspree was here, and was the reason admin staff who never open the AI
    // Reception dashboard saw an enquiry at all — for them it was the delivery,
    // not a copy. Sophiie now sends that alert itself over the Gmail connection
    // it already has (notifyNewLead in the app), so the job Formspree was doing
    // is done by something we run. Removed August 2026; the third-party
    // paragraph in cookies-data-policy.astro came out with it.
    //
    // Nothing here is load-bearing for the alert. If the emails ever stop, the
    // cause is in the app, not on this list.
  ],
  // Sophiie AI-reception CRM lead-intake (public, CORS-open). One of three
  // destinations, not the only one — see webhookUrls above.
  // Creates a Customer (status LEAD, source "Web form") + an Inbox message and
  // runs the CRM's AI auto-capture. Requires the webform widget enabled in
  // Sophiie (Settings → widgets); if it is switched off this endpoint answers
  // 403 and the lead is dropped.
  crmUrl: 'https://sophiie-web.onrender.com/api/widget/lead',
  // The full quote funnel in the AI Reception app. The short lead-gate modal
  // still posts to crmUrl above; the multi-step form on /quote posts here,
  // because it carries far more than {name, phone, email} — property answers,
  // extras, photos and two separate consent records.
  //
  // Same origin, different endpoint on purpose: /api/widget/lead is the
  // generic widget intake shared with the Google Ads lead-form webhook, and
  // widening it to understand bedrooms and consent versions would couple those
  // two things together for no reason.
  funnelBase: 'https://sophiie-web.onrender.com/api/funnel',
  metaPixelId: '',         // e.g. '1234567890'
  googleAdsId: 'AW-17734678183',          // Google Ads conversion ID (NATURO GROUP)
  googleAdsLabel: 'kZ58CPzQ9cYcEKftxohC', // "Quote form submitted" conversion action label
  // GA4 measurement IDs. Every ID listed here gets its own gtag config call,
  // so the site can report to more than one property at once — which is how
  // you move between properties without a gap in reporting. To stop sending
  // to a property, delete its line.
  ga4Ids: [
    'G-XHSW654XGS', // Naturo Group — property 451557724, stream naturogroup.com.au
    'G-G8R9DWS9CV', // previous property, kept so its reporting stays unbroken
  ],
  gtmId: 'GTM-MKXP59G9',
  // Microsoft Clarity — session replay + heatmaps. Paste the project ID from
  // clarity.microsoft.com → Settings → Overview. Empty = not installed.
  clarityProjectId: '',
};

export const nav = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'House Cleaning', href: '/services/house-cleaning/' },
      { label: 'Deep Clean', href: '/services/deep-clean/' },
      { label: 'End of Lease Cleaning', href: '/services/end-of-lease/' },
      { label: 'Commercial & Office', href: '/services/commercial-cleaning/' },
      { label: 'Airbnb Turnover', href: '/services/airbnb-cleaning/' },
      { label: 'NDIS Cleaning', href: '/services/ndis-cleaning/' },
      { label: 'Aged Care Cleaning', href: '/services/aged-care-cleaning/' },
      { label: 'Insurance Cleaning', href: '/services/insurance-cleaning/' },
      { label: 'Veterans (DVA) Cleaning', href: '/services/veterans-cleaning/' },
    ],
  },
  { label: 'Resource', href: '/resource/' },
  { label: 'Career', href: '/career/' },
  { label: 'Contact us', href: '/contact-us/' },
];

export const pricingCards = [
  {
    name: 'Deep Clean',
    slug: 'deep-clean',
    priceFrom: 371,
    label: 'Starting from',
    bullets: [
      'For homes not professionally cleaned in over 30 days.',
      'Once-off full spring clean',
      'Kitchen, bathroom & oven deep scrub',
      'Inside cupboards, windows & skirting boards',
      'Eco-friendly, non-toxic products',
      'Experienced, police-checked cleaners',
    ],
    cta: { text: 'Get a Free Quote', href: '/quote/' },
  },
  {
    name: 'Regular Clean',
    slug: 'house-cleaning',
    priceFrom: 153,
    label: 'Starting from',
    bullets: [
      'Recurring weekly or fortnightly clean for everyday homes.',
      'Customised cleaning checklist',
      'Kitchen, bathroom, bedrooms & living areas',
      'Choose job-rate or hourly-rate cleaning',
      'A trusted, regular cleaning team',
      'Skip, pause or reschedule anytime',
    ],
    cta: { text: 'Get a Free Quote', href: '/quote/' },
    featured: true,
  },
  {
    name: 'End of Lease',
    slug: 'end-of-lease',
    priceFrom: 560,
    label: 'Starting from',
    bullets: [
      'Full bond clean for landlords and tenants at handover.',
      'Covers all agency inspection criteria',
      'Oven, carpet spot-clean, walls & windows',
      'Detailed receipt for your property manager',
      'Bond-back re-clean included if issues arise',
      'Professional, experienced cleaners',
    ],
    cta: { text: 'Get a Free Quote', href: '/quote/' },
  },
];

// Display cards for the "Choose your clean" section (homepage, services
// index, suburb + service pages). Decoupled from `pricingCards` — which
// still drives the /services routing and nav — so this section can run a
// lead-gen layout (no prices, prompt the user for their details) and swap
// the third card to a specialist card (NDIS / DVA / aged care / insurance)
// without affecting the End of Lease service page or its links.
export const chooseYourClean = [
  pricingCards[1], // Regular Clean (featured)
  pricingCards[0], // Deep Clean
  {
    name: 'Specialist Cleaning',
    slug: 'specialist-cleaning',
    priceFrom: 0,
    label: '',
    bullets: [
      'NDIS, DVA, aged care and insurance cleaning — tailored to your plan.',
      'NDIS — plan-managed & self-managed participants',
      'DVA — Gold & White card holders',
      'Aged Care — Home Care Packages & CHSP',
      'Insurance — claim scopes, photos & reports',
    ],
    cta: { text: 'Get a free quote', href: '/quote/' },
  },
];

// For service-detail page generation
export const services = pricingCards.map((c) => ({
  slug: c.slug,
  title: c.name,
  short: c.bullets[0],
  priceFrom: c.priceFrom,
  features: c.bullets,
}));

// Specialty services (no instant-quote pricing card; quoted on enquiry)
export const specialtyServices = [
  {
    slug: 'ndis-cleaning',
    title: 'NDIS Cleaning',
    short:
      'Non-toxic, in-home cleaning for NDIS participants &mdash; plan-managed and self-managed welcome.',
    features: [
      'Plan-managed and self-managed participants welcome',
      'A trusted, trained cleaning team',
      'Non-toxic products supplied',
      'Police-checked, fully insured',
      'Reports and invoicing for plan managers',
    ],
  },
  {
    slug: 'aged-care-cleaning',
    title: 'Aged Care Cleaning',
    short:
      'Compassionate, trained cleaners helping older Australians stay independent at home.',
    features: [
      'Working with My Aged Care providers and Home Care Package recipients',
      'Patient, friendly, trained team',
      'Consistent team where possible, for familiarity',
      'Fragrance-conscious, non-toxic products',
      'Police-checked, fully insured',
      'Care notes and reports on request',
    ],
  },
  {
    slug: 'insurance-cleaning',
    title: 'Insurance Cleaning',
    short:
      'Detailed scopes, photos and reporting for insurance claim work — direct billing where supported.',
    features: [
      'Trusted by major Australian insurers on claim work',
      'Detailed claim scopes and quotes',
      'Before / after photo documentation',
      'Direct billing where supported',
      'Trauma, fire, water and storm work',
      'Fully insured, police-checked teams',
    ],
  },
  {
    slug: 'veterans-cleaning',
    title: 'Veterans (DVA) Cleaning',
    short:
      'Respectful, reliable in-home cleaning for DVA cardholders &mdash; we work alongside your case manager.',
    features: [
      'Gold and White card holders welcome',
      'Coordinate with your DVA case manager',
      'A consistent cleaning team where possible',
      'Police-checked, fully insured',
      'Non-toxic products supplied',
      'Detailed reporting for your file',
    ],
  },
];

// Services quoted on enquiry with their own landing page, but no pricing card.
//
// Kept apart from `specialtyServices` (NDIS/DVA/aged care/insurance) because
// these are ordinary commercial offerings rather than funded-care programmes,
// and the two groups are shown in different places. Both feed /services/[slug].
export const funnelServices = [
  {
    slug: 'commercial-cleaning',
    title: 'Commercial & Office Cleaning',
    short:
      'Scheduled cleaning for offices and commercial premises, worked around your trading hours.',
    features: [
      'Offices, consulting rooms, retail and venues',
      'Cleaning outside your trading hours',
      'Washrooms cleaned and consumables restocked',
      'Waste and recycling collected',
      'Non-toxic products supplied',
      'Quoted after a site walk-through',
    ],
  },
  {
    slug: 'airbnb-cleaning',
    title: 'Airbnb Turnover Cleaning',
    short:
      'Between-guest turnovers, presented and restocked ready for the next check-in.',
    features: [
      'Back-to-back bookings turned around inside the changeover window',
      'Beds stripped and remade, bathrooms restocked',
      'Kitchen reset and rubbish removed',
      'Presentation check before the next guest arrives',
      'Works for single listings or a whole portfolio',
      'Non-toxic products supplied',
    ],
  },
];

// All services covered by /services/[slug] route
export const allServices = [...services, ...specialtyServices, ...funnelServices];

export const features = [
  {
    title: 'Excellent customer service',
    body: 'We are committed to delivering outstanding customer service with care and professionalism.',
  },
  {
    title: 'Dedicated area co-ordinator',
    body: 'Our local customer service team is here to provide tailored support. We are here to help.',
  },
  {
    title: 'Fast and easy booking',
    body: 'Book your house cleaning service online in 60 seconds. With our easy to use online booking system.',
  },
];

export const trustBadges = [
  {
    title: 'Police checked',
    body: 'Friendly and trustworthy, all our cleaners are police-checked for your assurance and safety.',
  },
  {
    title: 'Fully Insured',
    body: 'Public Liability Cover and our cleaners all have accidental coverage for your peace of mind.',
  },
  {
    title: 'Satisfaction guaranteed',
    body: 'We provide a satisfaction guarantee for complete peace of mind. We make things right.',
  },
];

// Grouped to mirror the per-service "What's included" cards (see
// ServiceInclusions.astro). Three balanced columns keep the overview
// scan-able while still surfacing every task previously listed flat.
export const includesChecklist: Array<{ group: string; items: string[] }> = [
  {
    group: 'Living areas',
    items: ['Dusting', 'Vacuuming', 'Mopping', 'Tidying up', 'Surfaces'],
  },
  {
    group: 'Kitchen & bathrooms',
    items: [
      'Kitchen cleaning',
      'Bathroom cleaning',
      'Fridge cleaning',
      'Oven cleaning',
      'Pantry tidying',
    ],
  },
  {
    group: 'Laundry & linens',
    items: ['Bed making', 'Linen changing', 'Washing', 'Ironing', 'And much more'],
  },
];

export const founder = {
  name: 'Anna Biram',
  role: 'Managing Director',
  image: '/images/founder.webp',
  imageAlt:
    'Eco-friendly cleaning service by NATURO GROUP showcasing natural products and police-checked cleaners.',
  body: [
    'At NATURO GROUP, we deliver exceptional cleaning services across Australia, backed by a unique nursing background that drives our compassionate care.',
    'We take pride in supporting NDIS participants, Veterans Affairs, Workers Compensation, Insurance, and Aged Care recipients with tailored services that prioritise comfort and independence.',
    'Our commitment to quality, reliability, and personalised care ensures every client feels valued in their own home. At NATURO GROUP, we don’t just clean—we create spaces where people feel truly cared for.',
  ],
};

export const providers = [
  { name: 'CCI', logo: '/images/partners/5.jpg' },
  { name: 'NRMA', logo: '/images/partners/4.png' },
  { name: 'Prudence Rehab', logo: '/images/partners/3.png' },
  { name: 'ipar', logo: '/images/partners/2.png' },
  { name: 'Allianz', logo: '/images/partners/1.png' },
  { name: 'phsa', logo: '/images/partners/7.png' },
  { name: 'QBE', logo: '/images/partners/6.png' },
];

export const faqs = [
  {
    q: 'What time are your services available?',
    // Derived from `site.hours` so there is one source of truth. This answer
    // previously hardcoded "8:00 AM – 5:30 PM", contradicting site.hours on the
    // same page. Opening hours are a field customers and search engines both
    // check for consistency, so they must never be stated twice by hand.
    a: `Our office is open ${site.hours.replace('Monday – Fridays', 'Monday to Friday,').replace(/\s+/g, ' ').trim()}. For special requests or after-hours service, please contact us in advance.`,
  },
  {
    q: 'What services are included?',
    a: 'Our services include residential and commercial cleaning, deep cleaning, end-of-lease cleaning, NDIS Cleaning, Aged Care Cleaning and Department of Veteran Affairs Cleaning. For a full list of services, visit our website or contact us directly.',
  },
  {
    q: 'How much does it cost to clean my house?',
    a: 'The cost of cleaning your house depends on factors such as the size of your home, the type of cleaning service required, and any additional requests. For a personalised quote, please contact us or click on Get a Free Quote.',
  },
  {
    q: 'Are cleaning supplies provided?',
    a: 'Yes, we provide all necessary cleaning supplies and equipment. If you have specific product preferences or would like us to use your supplies, please let us know in advance.',
  },
  {
    q: 'Are your cleaning supplies safe for children and pets?',
    a: 'Yes, we use eco-friendly and non-toxic cleaning supplies that are safe for children and pets. If you have specific concerns or preferences, please let us know, and we can accommodate your needs.',
  },
  {
    q: 'How does a recurring service work?',
    a: 'Our recurring cleaning service allows you to schedule regular cleanings on a weekly, bi-weekly, or monthly basis. Once set up, our team will arrive at the scheduled time to maintain your home’s cleanliness. You can adjust, reschedule, or cancel at any time with advance notice. Contact us to set up a plan that fits your needs!',
  },
  {
    q: 'How easily can I book online?',
    a: 'Booking online is quick and easy! Simply visit our website, choose your preferred service, select a date and time that works for you, and confirm your booking in just a few clicks. If you need assistance, our team is happy to help.',
  },
  {
    q: 'What forms of payment do you accept?',
    a: 'We accept various payment methods, including credit and debit cards. All online payments are securely processed through Stripe. Please contact us if you have any specific payment preferences.',
  },
  {
    q: 'How long does it take to clean my house?',
    a: 'The time required to clean your house depends on factors such as the size of your home, the level of cleaning needed, and the number of cleaners assigned. On average, a standard cleaning for a 3-bedroom home takes about 2 to 3 hours. Deep cleaning or larger homes may take longer. Contact us for a more accurate estimate based on your specific needs.',
  },
];

export const testimonials = [
  { name: 'Simon O', text: 'Great service, super happy with these folk.' },
  {
    name: 'Gem K',
    text: 'Excellent service, very professional & thorough & the guys did a great job. Highly recommend. Positive: Responsiveness, Punctuality, Quality, Professionalism, Value. Services: Deep clean.',
  },
  {
    name: 'Catherine M',
    text: 'We have been using NATURO GROUP since 2022 to clean our holiday house. They are fantastic cleaners who consistently do a professional job as well as being reliable. We highly recommend them to anyone looking for excellent cleaners.',
  },
  {
    name: 'Jules Y',
    text: 'I am so happy with them every time. They never miss the little things that are often overlooked. I get a regular clean and even when the house is in a bit of a state like yesterday it’s always so well done. Thank you so much, it is so nice getting home to a beautiful clean house. They also took care of my massive moving out clean from a two story house with a wall of windows backing on to bush. I couldn’t even imagine doing it but they sorted it out and at short notice too.',
  },
  {
    name: 'Liana S',
    text: 'The best ever, their work ethic is awesome. The cleaning on my windows and screens was fantastic. Positive: Responsiveness, Punctuality, Quality, Professionalism, Value. Services: General housekeeping.',
  },
  {
    name: 'Kim H',
    text: 'Being someone who is not 100 percent comfortable with someone in my home I was cautious! I was wrong! Communication and flexibility with Anna was excellent. Jacqui was so lovely when she arrived and throughout her hours here. Not only was a wonderful job done but was definitely not invasive at all. Obliging, understanding and again a perfect job done (the lasting fragrance was a bonus lol). Would definitely recommend Naturo Group at any level and I look forward to future visits.',
  },
  {
    name: 'Marilyn W',
    text: 'Thank you very much for a perfect job done — everyone’s commenting on the windows, they’re so sparkling and shiny. Your team has done a marvelous job for me, thank you.',
  },
];

export const heroBg = '/images/hero-bathroom.webp'; // user to supply

export const sectionBgs = {
  experience: '/images/experience-staff.webp', // user to supply
  bookCTA: '/images/book-cta.webp', // user to supply
  sixtySeconds: '/images/sixty-seconds.jpg', // user to supply
};

export const aboutImage = '/images/founder.webp'; // user to supply

export const appPromo = {
  heading: 'Easily manage your cleaning schedule with our user friendly App',
  phoneImg: '/images/app-phone.webp', // user to supply
  appStore: 'https://www.apple.com/app-store/',
  googlePlay: 'https://play.google.com/store',
};

export const footerLocations = {
  'New South Wales': [
    { label: 'Byron Bay', href: '/cleaners-byron-bay/' },
    { label: 'Central Coast', href: '/cleaners-central-coast/' },
    { label: 'Lismore', href: '/cleaners-lismore/' },
    { label: 'Newcastle', href: '/cleaners-newcastle/' },
    { label: 'Port Macquarie', href: '/cleaners-port-macquarie/' },
    { label: 'Sutherland', href: '/house-cleaning-sutherland/' },
    { label: 'Sydney', href: '/cleaners-sydney/' },
    { label: 'Tweed Heads', href: '/house-cleaning-tweed-heads/' },
    { label: 'Parramatta', href: '/house-cleaning-parramatta/' },
    { label: 'Wollongong', href: '/cleaners-wollongong/' },
    { label: 'Northern Beaches', href: '/house-cleaning-in-northern-beaches/' },
    { label: 'Eastern Beaches', href: '/house-cleaning-in-eastern-beaches/' },
    { label: 'Bondi', href: '/cleaners-bondi/' },
    { label: 'Manly', href: '/cleaners-manly/' },
    { label: 'Mosman', href: '/cleaners-mosman/' },
    { label: 'Hunters Hill', href: '/cleaners-hunters-hill/' },
    { label: 'Vaucluse', href: '/cleaners-vaucluse/' },
  ],
  Queensland: [
    { label: 'Brisbane', href: '/cleaners-brisbane/' },
    { label: 'Cairns', href: '/cleaners-cairns/' },
    { label: 'Gold Coast', href: '/cleaners-gold-coast/' },
    { label: 'Ipswich', href: '/house-cleaning-ipswich/' },
    { label: 'Sunshine Coast', href: '/cleaners-sunshine-coast/' },
    { label: 'Toowoomba', href: '/cleaners-toowoomba/' },
    { label: 'Townsville', href: '/cleaners-townsville/' },
  ],
  Victoria: [
    { label: 'Melbourne', href: '/cleaners-melbourne/' },
    { label: 'Geelong', href: '/house-cleaning-geelong/' },
    { label: 'Ballarat', href: '/cleaners-ballarat/' },
    { label: 'Dandenong', href: '/cleaners-dandenong/' },
    { label: 'Mornington', href: '/cleaners-mornington/' },
    { label: 'Narre Warren', href: '/cleaners-narre-warren/' },
    { label: 'Toorak', href: '/cleaners-toorak/' },
  ],
};

export const footerInfoLinks = [
  { label: 'How does it work', href: '/how-it-works/' },
  { label: 'Meet the Team', href: '/team/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Become a Cleaner', href: '/career/' },
  { label: 'Resources', href: '/resource/' },
  { label: 'FAQS', href: '/faqs/' },
  { label: 'Contact us', href: '/contact-us/' },
];

export const footerServiceLinks = [
  { label: 'House Cleaning', href: '/services/house-cleaning/' },
  { label: 'Deep Clean', href: '/services/deep-clean/' },
  { label: 'End of Lease Cleaning', href: '/services/end-of-lease/' },
  { label: 'NDIS Cleaning', href: '/services/ndis-cleaning/' },
  { label: 'Aged Care Cleaning', href: '/services/aged-care-cleaning/' },
  { label: 'Insurance Cleaning', href: '/services/insurance-cleaning/' },
  { label: 'Veterans (DVA) Cleaning', href: '/services/veterans-cleaning/' },
];

export const subFooterLinks = [
  { label: 'Privacy Policy', href: '/privacy-policies/' },
  { label: 'Terms of service', href: '/terms-of-service/' },
  { label: 'Cookies & Data Policy', href: '/cookies-data-policy/' },
  { label: 'Collection Notice Statement', href: '/collection-statementment-notice/' },
];

// Kept for compatibility with existing pages that import it.
export const specialties = [
  { title: 'NDIS Cleaning', desc: 'Non-toxic in-home cleaning for plan-managed and self-managed NDIS participants.' },
  { title: 'Aged Care', desc: 'Compassionate, trained cleaners for older Australians at home.' },
  { title: 'Veterans Affairs (DVA)', desc: 'Cleaning support for DVA cardholders &mdash; we work with your case manager.' },
  { title: 'Insurance Cleaning', desc: 'Detailed scopes and reporting for insurance claim work.' },
];

