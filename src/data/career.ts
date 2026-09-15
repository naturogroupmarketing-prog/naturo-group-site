// Shared career copy. The national /career/ page and the per-city
// /cleaning-jobs-<city>/ pages all read from here, so pay, requirements and
// the hiring process are stated once and cannot drift apart.
//
// SOURCE OF TRUTH: the live Indeed listing "Domestic Cleaner – Permanent &
// Casual Roles | Paid Training | No Nights or Weekends" (NATURO GROUP PTY LTD,
// Port Macquarie NSW, read 15 Sep 2026). Every figure and requirement below
// is taken from it. Where the site previously said something different —
// $32–$42/hr, contractor roles offered, car "nice to have", WWCC — Indeed is
// the version the business is actually hiring on, and the site now matches.
// Change it here, not on a page, and keep it in step with the listing.

export const payRange = { min: 36.21, max: 45, currency: 'AUD', unit: 'HOUR' as const };
export const payLine = '$36.21 per hour including superannuation and vehicle allowance';

// Indeed's own posting title. Used as the JobPosting title so the site's
// listing and the Indeed listing read as the same job in Google for Jobs.
export const jobTitle = 'Domestic Cleaner – Permanent & Casual Roles';

export const benefits = [
  {
    title: '$36.21/hr incl. super & vehicle allowance',
    body: 'Paid as an employee, with superannuation and a vehicle allowance built into the rate. Casual staff receive the casual loading on top.',
  },
  {
    title: 'Employee roles — no ABN, no gig work',
    body: 'Permanent part-time, full-time or casual: you choose, and either way you are our employee. We do not do ABN, contractor or gig arrangements.',
  },
  {
    title: 'No nights. No weekends.',
    body: 'Monday to Friday between 8am and 4pm, with school-hours shifts (9am–3pm) available. You know what your week looks like.',
  },
  {
    title: 'Paid induction and ongoing training',
    body: 'Your training is paid from the first day. We hire in small intakes so every new cleaner gets a proper induction and hands-on support.',
  },
  {
    title: 'A path up: Cleaner → Team Leader → Management',
    body: 'Career progression is real here. Regular one-on-ones with your local Team Leader, and recognition for great work.',
  },
  {
    title: 'Everything supplied. Travel paid.',
    body: 'All equipment, uniforms and cleaning products are provided, and your travel time between client homes is paid.',
  },
];

// The hard requirements, exactly as the listing states them. Applications
// that do not meet these are not considered — say so plainly.
export const wellLook = [
  'A reliable car and a current Australian driver’s licence — you drive between client homes every shift',
  'Living locally — within about 25 minutes’ drive of the town centre. We roster locally and do not relocate staff',
  'Available at least two weekdays, Monday to Friday, between 8am and 4pm',
  'Willing to complete a National Police Check and an NDIS Worker Screening Check',
  'Working rights in Australia',
  'Reliable — the person your friends and family know they can count on',
];

export const niceToHave = [
  'Cleaning experience — preferred, but not essential for the right person',
  'Strong attention to detail',
  'Good communication with clients and your team',
  'Willingness to complete paid training (length depends on your experience)',
];

// What a shift actually involves, from the listing's "Your Daily Work".
export const dailyWork = [
  'Residential house cleaning',
  'NDIS disability support cleaning',
  'DVA client services',
  'Deep and spring cleans',
  'Optional bond cleans',
];

export const steps = [
  {
    n: '01',
    title: 'Apply and answer the screening questions',
    body: 'A short form. Tell us whether you want permanent or casual hours, which suburb you live in, and which weekdays you can work.',
  },
  {
    n: '02',
    title: 'We read every application',
    body: 'We hire in small intakes and review every application from local candidates with a reliable car. Your local Team Leader will be in touch.',
  },
  {
    n: '03',
    title: 'Checks',
    body: 'National Police Check and NDIS Worker Screening Check, so you are cleared for NDIS and DVA client work.',
  },
  {
    n: '04',
    title: 'Paid induction',
    body: 'Hands-on training alongside the team — paid from minute one. Immediate start available for the right candidates.',
  },
];

// ---------------------------------------------------------------------------
// Per-city hiring pages. One JobPosting per city, one jobLocation each: Google
// for Jobs treats a single posting spread across eight cities poorly, and a
// search for "cleaning jobs port macquarie" had nothing on the site targeting
// it. Indeed and Seek win those results one listing, one place at a time.
//
// Titles follow the pattern both Seek and Indeed rank with for these
// searches — "Cleaning Jobs in <City> <STATE> <postcode>" — measured on the
// live SERP 15 Sep 2026.
//
// Suburb lists are the ones the matching NDIS pages already publish. No
// street address on either: cleaners work in clients' homes, and the Geelong
// base is a private residence that must never be published.
// ---------------------------------------------------------------------------
export interface CareerCity {
  slug: string;         // /cleaning-jobs-<slug>/
  city: string;
  region: string;       // the wider area, for copy
  state: 'VIC' | 'NSW';
  postcode: string;
  hubHref: string;      // the city's main cleaning page
  hubLabel: string;
  suburbs: { name: string; slug: string }[];
  intro: string[];
  faqs: { q: string; a: string }[];
}

const sharedFaqs = (city: string, region: string) => [
  {
    q: `How much do cleaners earn in ${city}?`,
    a: '$36.21 per hour including superannuation and vehicle allowance, with a range up to $45.00. You are paid as an employee — permanent or casual — with your training and your travel between jobs paid too. Casual staff receive the casual loading.',
  },
  {
    q: 'Is this an employee role or a contractor role?',
    a: 'Employee, always. We hire both permanent part-time and casual cleaners, and either way superannuation is paid, training is paid and travel between jobs is paid. We do not do ABN, contractor or gig arrangements.',
  },
  {
    q: 'Do I need a car?',
    a: 'Yes. You must have a reliable car and a current Australian driver’s licence, because you drive between client homes every shift. Applications without a car cannot be considered.',
  },
  {
    q: 'What hours are the shifts?',
    a: 'Monday to Friday between 8am and 4pm — no nights and no weekends. School-hours shifts (9am–3pm) are available. We ask for a minimum of two weekdays.',
  },
  {
    q: 'What checks do I need?',
    a: 'A National Police Check and an NDIS Worker Screening Check, because the role includes NDIS and DVA client work. We help cover the cost and walk you through applying.',
  },
  {
    q: `Where in ${city} do you need to live?`,
    a: `Within about 25 minutes’ drive of the town centre. We roster locally across ${region} and do not relocate staff, so we can only consider applications from people already living in the area.`,
  },
  {
    q: 'Do I need cleaning experience?',
    a: 'It is preferred but not essential for the right person. Your training is paid, and how long it runs depends on the experience you bring.',
  },
];

export const careerCities: CareerCity[] = [
  {
    slug: 'port-macquarie',
    city: 'Port Macquarie',
    region: 'Port Macquarie and the Hastings',
    state: 'NSW',
    postcode: '2444',
    hubHref: '/cleaners-port-macquarie/',
    hubLabel: 'House cleaning in Port Macquarie',
    suburbs: [
      { name: 'Port Macquarie', slug: 'cleaners-port-macquarie' },
      { name: 'Wauchope', slug: 'house-cleaning-wauchope' },
      { name: 'Lake Cathie', slug: 'house-cleaning-lake-cathie' },
      { name: 'Bonny Hills', slug: 'house-cleaning-bonny-hills' },
      { name: 'Laurieton', slug: 'house-cleaning-laurieton' },
      { name: 'North Haven', slug: 'house-cleaning-north-haven' },
      { name: 'Lighthouse Beach', slug: 'house-cleaning-lighthouse-beach' },
      { name: 'Settlement Point', slug: 'house-cleaning-settlement-point' },
    ],
    intro: [
      'NATURO GROUP is hiring domestic cleaners in Port Macquarie — permanent and casual employee roles, $36.21 per hour including superannuation and vehicle allowance. Not ABN or contractor work. Your daily work is residential house cleaning, NDIS disability support cleaning and DVA client services, with deep and spring cleans and optional bond cleans on top.',
      'No nights and no weekends: shifts run Monday to Friday between 8am and 4pm, with school-hours shifts available. We roster locally across the Hastings, so you need to live within about 25 minutes of the town centre and have a reliable car to drive between client homes.',
      'We hire in small intakes so every new cleaner gets paid induction, hands-on training and regular support from a local Team Leader. There is a real path up — Cleaner to Team Leader to Management — and we supply every piece of equipment, uniform and product you need.',
    ],
    faqs: sharedFaqs('Port Macquarie', 'Port Macquarie and the Hastings'),
  },
  {
    slug: 'geelong',
    city: 'Geelong',
    region: 'Greater Geelong, the Bellarine and the Surf Coast',
    state: 'VIC',
    postcode: '3220',
    hubHref: '/house-cleaning-geelong/',
    hubLabel: 'House cleaning in Geelong',
    suburbs: [
      { name: 'Geelong CBD', slug: 'house-cleaning-geelong' },
      { name: 'Newtown', slug: 'house-cleaning-newtown-geelong' },
      { name: 'Highton', slug: 'house-cleaning-highton' },
      { name: 'Belmont', slug: 'house-cleaning-belmont-geelong' },
      { name: 'Geelong West', slug: 'house-cleaning-geelong-west' },
      { name: 'Lara', slug: 'house-cleaning-lara' },
      { name: 'Leopold', slug: 'house-cleaning-leopold' },
      { name: 'Ocean Grove', slug: 'house-cleaning-ocean-grove' },
      { name: 'Torquay', slug: 'house-cleaning-torquay' },
      { name: 'Barwon Heads', slug: 'house-cleaning-barwon-heads' },
      { name: 'Armstrong Creek', slug: 'house-cleaning-armstrong-creek' },
      { name: 'Grovedale', slug: 'house-cleaning-grovedale' },
    ],
    intro: [
      'NATURO GROUP is hiring domestic cleaners in Geelong — permanent and casual employee roles, $36.21 per hour including superannuation and vehicle allowance. Not ABN or contractor work. Your daily work is residential house cleaning and NDIS disability support cleaning, with deep and spring cleans and optional bond cleans on top.',
      'No nights and no weekends: shifts run Monday to Friday between 8am and 4pm, with school-hours shifts available. We roster locally across Greater Geelong, the Bellarine and the Surf Coast, so you need to live within about 25 minutes of the town centre and have a reliable car to drive between client homes.',
      'We hire in small intakes so every new cleaner gets paid induction, hands-on training and regular support from a local Team Leader. There is a real path up — Cleaner to Team Leader to Management — and we supply every piece of equipment, uniform and product you need.',
    ],
    faqs: sharedFaqs('Geelong', 'Greater Geelong, the Bellarine and the Surf Coast'),
  },
];
