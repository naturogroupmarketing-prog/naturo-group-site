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
  social: {
    facebook: 'https://www.facebook.com/naturogroup',
    instagram: 'https://www.instagram.com/naturogroup/',
    youtube: 'https://www.youtube.com/@NGclean',
  },
  copyright: '© 2026 NATURO GROUP PTY LTD ATF Hanelg Trust. All rights reserved.',
};

export const ctaPrimary = { text: 'Get an Instant Price', href: site.bookingUrl };
export const ctaPhone = { text: site.phone, href: site.phoneHref };

// ---------------------------------------------------------------------------
// Lead capture / retargeting destinations
//
// The "Get an instant price" modal collects {name, phone, email} and pushes
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
// ---------------------------------------------------------------------------
export const leadCapture = {
  webhookUrl: 'https://formspree.io/f/xyklabez',
  metaPixelId: '',         // e.g. '1234567890'
  googleAdsId: '',         // e.g. 'AW-1234567890'
  googleAdsLabel: '',      // e.g. 'AbCdEfGhIjK'
  ga4Id: 'G-G8R9DWS9CV',
  gtmId: 'GTM-MKXP59G9',
};

export const nav = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'House Cleaning', href: '/services/house-cleaning' },
      { label: 'Deep Clean', href: '/services/deep-clean' },
      { label: 'End of Lease Cleaning', href: '/services/end-of-lease' },
      { label: 'NDIS Cleaning', href: '/services/ndis-cleaning' },
      { label: 'Aged Care Cleaning', href: '/services/aged-care-cleaning' },
      { label: 'Insurance Cleaning', href: '/services/insurance-cleaning' },
      { label: 'Veterans (DVA) Cleaning', href: '/services/veterans-cleaning' },
    ],
  },
  { label: 'Resource', href: '/resource' },
  { label: 'Career', href: '/career' },
  { label: 'Contact us', href: '/contact-us' },
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
    cta: { text: 'Get an Instant Price', href: '/quote' },
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
    cta: { text: 'Get an Instant Price', href: '/quote' },
    featured: true,
  },
  {
    name: 'End of Lease',
    slug: 'end-of-lease',
    priceFrom: 478,
    label: 'Starting from',
    bullets: [
      'Full bond clean for landlords and tenants at handover.',
      'Covers all agency inspection criteria',
      'Oven, carpet spot-clean, walls & windows',
      'Detailed receipt for your property manager',
      'Bond-back re-clean included if issues arise',
      'Professional, experienced cleaners',
    ],
    cta: { text: 'Get an Instant Price', href: '/quote' },
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

// All services covered by /services/[slug] route
export const allServices = [...services, ...specialtyServices];

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
  image: '/images/founder.png',
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
    a: 'Our services are available 8:00 AM – 5:30 PM, Monday to Friday. For special requests or after-hours service, please contact us in advance.',
  },
  {
    q: 'What services are included?',
    a: 'Our services include residential and commercial cleaning, deep cleaning, end-of-lease cleaning, NDIS Cleaning, Aged Care Cleaning and Department of Veteran Affairs Cleaning. For a full list of services, visit our website or contact us directly.',
  },
  {
    q: 'How much does it cost to clean my house?',
    a: 'The cost of cleaning your house depends on factors such as the size of your home, the type of cleaning service required, and any additional requests. Our pricing typically starts from $131.00 for a standard clean. For a personalised quote, please contact us or click on Get an Instant Price.',
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

export const heroBg = '/images/hero-bathroom.jpg'; // user to supply

export const sectionBgs = {
  experience: '/images/experience-staff.jpg', // user to supply
  bookCTA: '/images/book-cta.jpg', // user to supply
  sixtySeconds: '/images/sixty-seconds.jpg', // user to supply
};

export const aboutImage = '/images/founder.png'; // user to supply

export const appPromo = {
  heading: 'Easily manage your cleaning schedule with our user friendly App',
  phoneImg: '/images/app-phone.jpg', // user to supply
  appStore: 'https://www.apple.com/app-store/',
  googlePlay: 'https://play.google.com/store',
};

export const footerLocations = {
  'New South Wales': [
    { label: 'Byron Bay', href: '/cleaners-byron-bay' },
    { label: 'Central Coast', href: '/cleaners-central-coast' },
    { label: 'Lismore', href: '/cleaners-lismore' },
    { label: 'Newcastle', href: '/cleaners-newcastle' },
    { label: 'Port Macquarie', href: '/cleaners-port-macquarie' },
    { label: 'Wauchope', href: '/house-cleaning-wauchope' },
    { label: 'Lake Cathie', href: '/house-cleaning-lake-cathie' },
    { label: 'Bonny Hills', href: '/house-cleaning-bonny-hills' },
    { label: 'Laurieton', href: '/house-cleaning-laurieton' },
    { label: 'North Haven', href: '/house-cleaning-north-haven' },
    { label: 'Lighthouse Beach', href: '/house-cleaning-lighthouse-beach' },
    { label: 'Settlement Point', href: '/house-cleaning-settlement-point' },
    { label: 'Sutherland', href: '/house-cleaning-sutherland' },
    { label: 'Sydney', href: '/cleaners-sydney' },
    { label: 'Tweed Heads', href: '/house-cleaning-tweed-heads' },
    { label: 'Parramatta', href: '/house-cleaning-parramatta' },
    { label: 'Wollongong', href: '/cleaners-wollongong' },
    { label: 'Northern Beaches', href: '/house-cleaning-in-northern-beaches' },
    { label: 'Eastern Beaches', href: '/house-cleaning-in-eastern-beaches' },
    { label: 'Bondi', href: '/cleaners-bondi' },
    { label: 'Manly', href: '/cleaners-manly' },
    { label: 'Mosman', href: '/cleaners-mosman' },
    { label: 'Hunters Hill', href: '/cleaners-hunters-hill' },
    { label: 'Vaucluse', href: '/cleaners-vaucluse' },
  ],
  Queensland: [
    { label: 'Brisbane', href: '/cleaners-brisbane' },
    { label: 'Cairns', href: '/cleaners-cairns' },
    { label: 'Gold Coast', href: '/cleaners-gold-coast' },
    { label: 'Ipswich', href: '/house-cleaning-ipswich' },
    { label: 'Sunshine Coast', href: '/cleaners-sunshine-coast' },
    { label: 'Toowoomba', href: '/cleaners-toowoomba' },
    { label: 'Townsville', href: '/cleaners-townsville' },
  ],
  Victoria: [
    { label: 'Melbourne', href: '/cleaners-melbourne' },
    { label: 'Geelong', href: '/house-cleaning-geelong' },
    { label: 'Torquay', href: '/house-cleaning-torquay' },
    { label: 'Ocean Grove', href: '/house-cleaning-ocean-grove' },
    { label: 'Barwon Heads', href: '/house-cleaning-barwon-heads' },
    { label: 'Drysdale', href: '/house-cleaning-drysdale' },
    { label: 'Leopold', href: '/house-cleaning-leopold' },
    { label: 'Jan Juc', href: '/house-cleaning-jan-juc' },
    { label: 'Lara', href: '/house-cleaning-lara' },
    { label: 'Curlewis', href: '/house-cleaning-curlewis' },
    { label: 'Belmont', href: '/house-cleaning-belmont-geelong' },
    { label: 'Highton', href: '/house-cleaning-highton' },
    { label: 'Geelong West', href: '/house-cleaning-geelong-west' },
    { label: 'Corio', href: '/house-cleaning-corio' },
    { label: 'Ballarat', href: '/cleaners-ballarat' },
    { label: 'Dandenong', href: '/cleaners-dandenong' },
    { label: 'Mornington', href: '/cleaners-mornington' },
    { label: 'Narre Warren', href: '/cleaners-narre-warren' },
    { label: 'Toorak', href: '/cleaners-toorak' },
  ],
};

export const footerInfoLinks = [
  { label: 'How does it work', href: '/how-it-works' },
  { label: 'Meet the Team', href: '/team' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Areas we serve', href: '/areas-we-serve' },
  { label: 'Become a Cleaner', href: '/career' },
  { label: 'Resources', href: '/resource' },
  { label: 'FAQS', href: '/faqs' },
  { label: 'Contact us', href: '/contact-us' },
];

export const footerServiceLinks = [
  { label: 'House Cleaning', href: '/services/house-cleaning' },
  { label: 'Deep Clean', href: '/services/deep-clean' },
  { label: 'End of Lease Cleaning', href: '/services/end-of-lease' },
  { label: 'NDIS Cleaning', href: '/services/ndis-cleaning' },
  { label: 'Aged Care Cleaning', href: '/services/aged-care-cleaning' },
  { label: 'Insurance Cleaning', href: '/services/insurance-cleaning' },
  { label: 'Veterans (DVA) Cleaning', href: '/services/veterans-cleaning' },
];

export const subFooterLinks = [
  { label: 'Privacy Policy', href: '/privacy-policies' },
  { label: 'Terms of service', href: '/terms-of-service' },
  { label: 'Cookies & Data Policy', href: '/cookies-data-policy' },
  { label: 'Collection Notice Statement', href: '/collection-statementment-notice' },
];

// Kept for compatibility with existing pages that import it.
export const specialties = [
  { title: 'NDIS Cleaning', desc: 'Non-toxic in-home cleaning for plan-managed and self-managed NDIS participants.' },
  { title: 'Aged Care', desc: 'Compassionate, trained cleaners for older Australians at home.' },
  { title: 'Veterans Affairs (DVA)', desc: 'Cleaning support for DVA cardholders &mdash; we work with your case manager.' },
  { title: 'Insurance Cleaning', desc: 'Detailed scopes and reporting for insurance claim work.' },
];

