// Competitor comparison, published at /compare-cleaning-services/.
//
// EVERY CELL IS A FACT READ FROM THAT COMPANY'S OWN PUBLIC WEBSITE on the
// date in `verifiedOn`, with their wording quoted where it matters. Nothing
// here is opinion, inference or a claim about what a competitor is "like".
// Comparative advertising is lawful in Australia only while every statement
// is true and not misleading (CCA 2010 Sch 2, ss18 and 29), so:
//
//   • If a company does not state something, the cell says "Not stated" —
//     never "No", and never a guess. Absence from a website is not absence
//     from the business.
//   • NATURO's own cells are held to the same standard: where we are behind
//     (we do not publish prices; we are not a registered NDIS provider) the
//     row says so.
//   • Re-verify before changing any cell, and move `verifiedOn` when you do.
//     A stale comparison is a misleading one.
//
// Sources are linked on the page so a reader — or an AI assistant citing it —
// can check every line.

export const verifiedOn = '30 October 2026';

export interface Competitor {
  key: string;
  name: string;
  /** How they describe their own model, in a few words. */
  model: string;
  url: string;
}

export const columns: Competitor[] = [
  { key: 'naturo', name: 'NATURO GROUP', model: 'Local team, employed', url: 'https://naturogroup.com.au' },
  { key: 'jims', name: "Jim's Cleaning", model: 'National franchise', url: 'https://jimscleaning.com.au' },
  { key: 'absolute', name: 'Absolute Domestics', model: 'Cleaner agency', url: 'https://www.absolutedomestics.com.au' },
  { key: 'houseproud', name: 'Houseproud', model: 'National franchise', url: 'https://www.houseproud.com.au' },
  { key: 'maid2match', name: 'Maid2Match', model: 'Online booking service', url: 'https://maid2match.com.au' },
  { key: 'airtasker', name: 'Airtasker', model: 'Gig marketplace', url: 'https://www.airtasker.com' },
];

export interface Row {
  label: string;
  /** Why this line matters to the person reading it. One short sentence. */
  why?: string;
  values: Record<string, string>;
}

export const rows: Row[] = [
  {
    label: 'Who cleans your home',
    why: 'Decides who carries the training, the insurance and the responsibility when something goes wrong.',
    values: {
      naturo: 'Our own employees — permanent and casual. No ABN, contractor or gig arrangements.',
      jims: 'Franchisees. “Each of our franchises is run as a small business by a dedicated professional.”',
      absolute: 'Independent cleaners, who “set their own hourly rates by suburb”.',
      houseproud: '“The franchise owner will be your cleaner or the cleaner that works for them.”',
      maid2match: '“Our permanent employee cleaners.”',
      airtasker: 'Taskers who make offers on your job. Their relationship to Airtasker is not stated.',
    },
  },
  {
    label: 'Police check',
    values: {
      naturo: 'Every cleaner, before their first shift.',
      jims: '“We also only use cleaners who are police-checked.”',
      absolute: '“Every cleaner is police-checked and vetted before joining us.”',
      houseproud: '“Extensive background checks” — a police check is not specified.',
      maid2match: 'Police check during hiring, with a phone screen and final interview.',
      airtasker: 'Not stated. Profiles show ID and mobile verification.',
    },
  },
  {
    label: 'NDIS Worker Screening Check',
    why: 'The check the NDIS Commission requires for workers in risk-assessed roles. A police check is not the same thing.',
    values: {
      naturo: 'Every cleaner, because the work includes NDIS and DVA clients.',
      jims: 'Not stated.',
      absolute: 'Not stated.',
      houseproud: 'For NDIS clients, staff “have verified the necessary credentials”. The check is not named.',
      maid2match: 'Not stated.',
      airtasker: 'Not stated.',
    },
  },
  {
    label: 'NDIS funding',
    values: {
      naturo: 'Plan-managed and self-managed. We are not a registered NDIS provider, so NDIA-managed funding cannot be used.',
      jims: 'Registered NDIS provider — the registration logo appears on their site.',
      absolute: 'Offers “funded cleaning support through NDIS, aged care and DVA”.',
      houseproud: '“If you are someone who is either NDIS plan-managed or self-managed, we can help.”',
      maid2match: 'Not stated.',
      airtasker: 'Not stated.',
    },
  },
  {
    label: 'DVA and aged care',
    values: {
      naturo: 'DVA, aged care and insurance work, invoiced direct to the plan manager or insurer.',
      jims: 'Not stated.',
      absolute: 'Aged care and DVA, “aligned with your care plan”.',
      houseproud: '“Long standing relationships with Aged Care providers.” DVA not stated.',
      maid2match: 'Not stated.',
      airtasker: 'Not stated.',
    },
  },
  {
    label: 'Products and equipment',
    values: {
      naturo: 'Supplied, every visit. Eco-friendly, non-toxic products, safe around kids and pets.',
      jims: '“Access to the very latest in cleaning equipment”, plus their own product range. Supply per job not stated.',
      absolute: 'Not stated.',
      houseproud: '“Professional-grade equipment” and “eco-friendly cleaning products”.',
      maid2match: 'Cleaners “bring their own cleaning products and equipment”, described as eco-friendly.',
      airtasker: 'Set job by job — some listings require the Tasker to bring their own, others the customer.',
    },
  },
  {
    label: 'The same team each visit',
    values: {
      naturo: 'A regular local team. Familiar faces matter for NDIS and aged care clients.',
      jims: 'Not stated.',
      absolute: '“Keep your favourite cleaner or request a quick replacement anytime.”',
      houseproud: 'The owner “will endeavour to keep the same cleaner for every visit”.',
      maid2match: 'Same cleaner assigned on recurring bookings.',
      airtasker: 'A new set of offers each time, unless you rebook the same Tasker.',
    },
  },
  {
    label: 'Price before you book',
    why: 'Where we are behind: our prices are quoted, not published.',
    values: {
      naturo: 'Free quote, same day in business hours. Prices are not published on the site.',
      jims: 'House cleaning “start[s] at just $149”, based on a 3-bedroom single-storey home.',
      absolute: 'From $82 for 2 hours, and “pricing does vary according to your suburb location”.',
      houseproud: 'Quote only — “clear, upfront quotes with no hidden fees”.',
      maid2match: 'Instant price online, then book and pay on the site.',
      airtasker: 'Taskers bid. The site gives a $149–$260 range, median $200.',
    },
  },
  {
    label: 'Who you pay',
    values: {
      naturo: 'NATURO GROUP. One invoice, GST included, suitable for plan managers and insurers.',
      jims: 'The local franchise.',
      absolute: '“Pay securely by card, bank transfer, or cash, directly to your cleaner.”',
      houseproud: 'The local franchise.',
      maid2match: 'Maid2Match, online at booking.',
      airtasker: 'Airtasker, by “secure cashless payments”.',
    },
  },
  {
    label: 'Insurance',
    values: {
      naturo: 'Fully insured, including public liability.',
      jims: '“Fully insured, giving you, your family or your business total protection.”',
      absolute: '“$20M public liability plus accident coverage for your cleaner.”',
      houseproud: '“All our franchisees are insured.” Cover not specified.',
      maid2match: 'Cleaners “fully vetted and covered by insurance”. Cover not specified.',
      airtasker: '“Free insurance coverage.” Policy limits not stated.',
    },
  },
  {
    label: 'If something is missed',
    values: {
      naturo: 'Tell us and we put it right. End-of-lease includes a bond-back re-clean.',
      jims: 'The Jim’s Work Guarantee: “we will always do whatever we can to fix it”.',
      absolute: 'Not stated.',
      houseproud: 'Not stated.',
      maid2match: '100% satisfaction guarantee — a re-clean, or a partial or full refund.',
      airtasker: 'Not stated. Resolution runs through the platform.',
    },
  },
  {
    label: 'Lock-in contract',
    values: {
      naturo: 'None. Skip, pause or reschedule any clean.',
      jims: 'Not stated.',
      absolute: 'Not stated.',
      houseproud: 'Not stated.',
      maid2match: 'Not stated.',
      airtasker: 'None — each job is booked on its own.',
    },
  },
];
