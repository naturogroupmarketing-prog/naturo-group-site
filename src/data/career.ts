// Shared career copy. The national /career/ page and the per-city
// /cleaning-jobs-<city>/ pages all read from here, so pay, requirements and
// the hiring process are stated once and cannot drift apart.
//
// Every figure here is a business fact. Change it here, not on a page.

export const payRange = { min: 32, max: 42, currency: 'AUD', unit: 'HOUR' as const };

export const benefits = [
  {
    title: 'Above-award pay',
    body: 'Top performers earn $32–$42 per hour all-in, paid weekly. Travel reimbursed for employees between jobs.',
  },
  {
    title: 'Pick your hours',
    body: 'You set your availability. School-hours-only, three days a week, full-time — we build a schedule around your life.',
  },
  {
    title: 'Local clients near you',
    body: 'We route you to repeat clients in your suburb. Less driving, more productive hours, real relationships.',
  },
  {
    title: 'Eco products supplied',
    body: 'All non-toxic products, microfibre cloths and equipment provided. No buying or carrying chemicals around.',
  },
  {
    title: 'Paid induction',
    body: 'A senior cleaner trains you on your first shift — paid. Ongoing upskilling for end-of-lease, NDIS and insurance work.',
  },
  {
    title: 'Real coordinator support',
    body: 'Your area coordinator is one phone call away. Shift swaps, client questions, awkward situations — you are never on your own.',
  },
];

export const wellLook = [
  'Reliable, on time, and you do what you say you’ll do',
  'Eye for detail — you notice the smudge on the tap',
  'Respectful of clients, their homes and their privacy',
  'Working rights in Australia',
  'Willing to undergo a Police Check (we help with the cost)',
  'Conversational English to read instructions and chat with clients',
];

export const niceToHave = [
  'Cleaning, hospitality, hotel housekeeping or aged-care experience',
  'Driver’s licence and reliable transport',
  'Working with Children Check (or willing to apply for one)',
  'First Aid certificate',
  'Experience with NDIS or aged care participants',
  'Bond/end-of-lease cleaning experience',
];

export const steps = [
  {
    n: '01',
    title: 'Apply online',
    body: 'Two-minute form. Tell us where you’re based, your availability and a little about you.',
  },
  {
    n: '02',
    title: 'Phone chat',
    body: 'Quick 10-minute call with your local coordinator within 48 hours of a successful application.',
  },
  {
    n: '03',
    title: 'Meet the team',
    body: 'In-person interview at a local cafe. Bring ID, references and your availability calendar.',
  },
  {
    n: '04',
    title: 'Paid induction',
    body: 'Shadow a senior cleaner for your first shift — paid from minute one. You’re on the team.',
  },
];

// ---------------------------------------------------------------------------
// Per-city hiring pages. One JobPosting per city, one jobLocation each: Google
// for Jobs treats a single posting spread across eight cities poorly, and a
// search for "cleaning jobs port macquarie" had nothing on the site targeting
// it. Indeed and Seek win those results one listing, one place at a time.
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
      'NATURO GROUP is hiring cleaners in Port Macquarie and across the Hastings. Our Port Macquarie team looks after regular household cleans, NDIS participants, DVA card holders and Home Care Package clients — steady, repeat work with people who get to know you by name.',
      'Work is routed to clients near you, so a cleaner based in Wauchope is not sent to Laurieton and back. Holiday-let turnovers at Lake Cathie and Bonny Hills add flexible one-off shifts around the regular runs.',
      'You are paid above the Cleaning Services Award, weekly, with every product and piece of equipment supplied. A local coordinator handles the scheduling and is a phone call away on every shift.',
    ],
    faqs: [
      {
        q: 'Where in Port Macquarie are the cleaning jobs?',
        a: 'Across Port Macquarie and the Hastings region — Wauchope, Lake Cathie, Bonny Hills, Laurieton, North Haven, Lighthouse Beach, Settlement Point and surrounding areas. We route you to clients close to where you live.',
      },
      {
        q: 'What kind of cleaning work is it?',
        a: 'Mostly regular household cleans for repeat clients, plus NDIS, DVA and aged-care work for participants and card holders. Holiday-let turnovers along the coast add one-off shifts. You can tell us which of these you prefer.',
      },
      {
        q: 'How much do cleaners earn in Port Macquarie?',
        a: 'You are paid above the Cleaning Services Award 2020. Top performers earn $32–$42 per hour all-in, paid weekly. Travel between jobs is reimbursed for employees.',
      },
      {
        q: 'Do I need a car?',
        a: 'A licence and reliable transport make scheduling far easier across the Hastings and unlock more shifts. Tell us your transport situation on the form and we will be honest about what we can offer.',
      },
      {
        q: 'Do I need a Police Check or Working with Children Check?',
        a: 'Every cleaner is police-checked before their first shift, and we help cover the cost. A WWCC is required for NDIS work, and we can guide you through applying for one.',
      },
      {
        q: 'How long does it take to start?',
        a: 'From application to first shift typically takes 7–14 days: a phone chat with your local coordinator, an in-person interview, reference checks and your police check, then a paid induction shift alongside a senior cleaner.',
      },
    ],
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
      'NATURO GROUP is hiring cleaners across Greater Geelong, the Bellarine Peninsula and the Surf Coast. Our Geelong team looks after regular household cleans and NDIS participants — repeat clients, familiar homes, and a schedule built around where you live.',
      'Work is routed by suburb, so a cleaner in Highton stays on the southern side and a cleaner in Lara stays north. Holiday-let turnovers at Ocean Grove, Barwon Heads and Torquay add flexible one-off shifts on top of the regular runs.',
      'You are paid above the Cleaning Services Award, weekly, with every product and piece of equipment supplied. A local coordinator handles the scheduling and is a phone call away on every shift.',
    ],
    faqs: [
      {
        q: 'Where in Geelong are the cleaning jobs?',
        a: 'Across Greater Geelong, the Bellarine and the Surf Coast — Newtown, Highton, Belmont, Geelong West, Lara, Leopold, Grovedale, Armstrong Creek, Ocean Grove, Barwon Heads, Torquay and surrounding suburbs. We route you to clients close to where you live.',
      },
      {
        q: 'What kind of cleaning work is it?',
        a: 'Mostly regular household cleans for repeat clients, plus NDIS work for participants. Holiday-let turnovers on the Bellarine and Surf Coast add one-off shifts. You can tell us which of these you prefer.',
      },
      {
        q: 'How much do cleaners earn in Geelong?',
        a: 'You are paid above the Cleaning Services Award 2020. Top performers earn $32–$42 per hour all-in, paid weekly. Travel between jobs is reimbursed for employees.',
      },
      {
        q: 'Do I need a car?',
        a: 'A licence and reliable transport make scheduling far easier across Geelong and the Bellarine and unlock more shifts. Tell us your transport situation on the form and we will be honest about what we can offer.',
      },
      {
        q: 'Do I need a Police Check or Working with Children Check?',
        a: 'Every cleaner is police-checked before their first shift, and we help cover the cost. A WWCC is required for NDIS work, and we can guide you through applying for one.',
      },
      {
        q: 'How long does it take to start?',
        a: 'From application to first shift typically takes 7–14 days: a phone chat with your local coordinator, an in-person interview, reference checks and your police check, then a paid induction shift alongside a senior cleaner.',
      },
    ],
  },
];
