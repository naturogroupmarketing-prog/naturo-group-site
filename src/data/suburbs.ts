// Single source of truth for every suburb / location landing page.
// Each entry powers /src/pages/[suburb].astro via getStaticPaths().
// Slugs MUST match those in src/data/site.ts → footerLocations so the footer
// links point at real URLs.

export interface SuburbTrustPoint {
  title: string;
  body: string;
  icon: 'shield' | 'clock' | 'sparkle';
}

export interface Suburb {
  /** Path slug (no leading slash). Drives the URL and getStaticPaths param. */
  slug: string;
  /** Plain suburb / city name used in headings and props. */
  name: string;
  /** Full state name for JSON-LD. */
  state: string;
  /** Two-letter state code for SEO title. */
  stateCode: string;
  /** Surrounding region — e.g. "Northern Rivers", "Hunter Region". */
  region: string;
  /**
   * Single full-width hero photo for this suburb.
   * Recommended path: `/images/suburbs/<slug>.webp` so each suburb has
   * its own iconic local landmark image (Cape Byron Lighthouse for
   * Byron Bay, Sydney Opera House for Sydney, etc.). Until that file
   * is dropped in, we point at one of the existing stock images so the
   * page still renders.
   */
  heroImage: string;
  /**
   * Alt text describing the iconic landmark we want shown on this
   * page's hero. Doubles as a brief for whoever sources the photo.
   */
  heroImageAlt: string;
  /** Image used in og:image + LocalBusiness schema. */
  ogImage: string;
  hero: {
    /** Three lines for the H1, joined with <br />. */
    h1Lines: [string, string, string];
    tagline: string;
  };
  intro: {
    kicker: string;
    h2: string;
    paragraphs: [string, string];
  };
  trust: {
    h2: string;
    paragraphs: [string, string];
    points: [SuburbTrustPoint, SuburbTrustPoint, SuburbTrustPoint];
  };
  founderBody: [string, string, string];
  finalCta: {
    h2Pre: string;
    h2Highlight: string;
    h2Post: string;
    sub: string;
    trust: string;
  };
  seo: {
    title: string;
    description: string;
  };
  /**
   * Real surrounding suburbs / villages we service from this hub.
   * Rendered as a 2- or 3-column list next to the Google Map for local SEO.
   */
  nearbySuburbs: string[];
  /**
   * Optional override for the Google Maps iframe `src`.
   * If omitted, the dynamic route builds a Google Maps embed from
   * `name + ', ' + state + ', Australia'` (no API key needed).
   * Use this when you have a verified Google Business Profile to embed
   * (e.g. NATURO GROUP's Port Macquarie listing) so that authority signal
   * carries onto the page.
   */
  mapEmbedSrc?: string;
  /**
   * Optional per-suburb FAQ list. When supplied, [suburb].astro renders
   * these instead of the generic site.faqs and emits FAQPage JSON-LD with
   * the localised content — Google rewards differentiated local FAQ
   * sections and they're a meaningful local SEO signal.
   *
   * When omitted, the dynamic route falls back to a generated 4-question
   * set that interpolates the suburb name into the generic questions so
   * each city still gets some uniqueness for free.
   */
  localFaqs?: Array<{ q: string; a: string }>;
  /**
   * Optional per-suburb testimonials. When supplied, the suburb page
   * renders these in the Testimonials marquee AND emits Review schema
   * entries on the LocalBusiness JSON-LD with the suburb appended to
   * each reviewer's name (e.g. "Sarah K. — Byron Bay") — so each city
   * page surfaces locally attributed quotes.
   *
   * When omitted, the dynamic route reuses the first five generic
   * testimonials and tags each reviewer with the suburb name in the
   * Review schema only (visible cards stay generic).
   */
  localTestimonials?: Array<{ name: string; text: string }>;
  /**
   * Optional local phone number override — e.g. a Geelong 03 number.
   * When set, the suburb page uses this instead of the national 1300 number.
   * Format: '03 XXXX XXXX' for display, 'tel:03XXXXXXXX' for href.
   */
  phone?: string;
  phoneHref?: string;
  /**
   * Optional per-suburb aggregate rating to override the site-wide
   * hardcoded values. Should reflect real GBP numbers for this location.
   */
  aggregateRating?: { ratingValue: string; reviewCount: string };
}


export const suburbs: Suburb[] = [
  // ────────────────────────────────────────────────────────────────────────
  // NEW SOUTH WALES
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'cleaners-port-macquarie',
    name: 'Port Macquarie',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Coastal sunset over Town Beach with Norfolk pines, Port Macquarie NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Port Macquarie'],
      tagline: 'Trusted, Trained and Thorough — across the Mid North Coast',
    },
    intro: {
      kicker: 'House cleaning in Port Macquarie',
      h2: 'Best house cleaning in Port Macquarie & the Mid North Coast',
      paragraphs: [
        'Port Macquarie homes face a unique mix of salt air, sand, beach gear and busy holiday schedules. NATURO GROUP\u2019s local Port Macquarie cleaners take the work off your plate with eco-friendly, non-toxic products that are gentle on coastal timbers, tiles and natural-stone benchtops \u2014 and tough on grime.',
        'From Settlement Point to Lighthouse Beach, our trained, police-checked team services apartments, family homes, holiday rentals and aged-care residences across the Hastings region \u2014 with the same care we\u2019d give our own homes.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Port Macquarie & the Mid North Coast',
      paragraphs: [
        'Port Macquarie sits at the heart of the Mid North Coast \u2014 a relaxed coastal city of around 50,000 residents known for its beaches, koala hospital, riverside trails and welcoming community. Whether you\u2019re a busy local family, a holiday-rental owner or a retiree, we provide cleaning that fits the way you live.',
        'Our Port Macquarie team also services Wauchope, Lake Cathie, Bonny Hills, Laurieton and the surrounding Hastings villages \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every Port Macquarie clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Port Macquarie cleaners', body: 'A trained, police-checked team that knows the Mid North Coast \u2014 from Town Beach apartments to Lighthouse Beach family homes.' },
        { icon: 'clock', title: 'Flexible bookings to suit coastal life', body: 'One-off, weekly or fortnightly cleans. Reschedule around school holidays, surf trips or visiting family in 60 seconds online.' },
        { icon: 'sparkle', title: 'Eco-friendly, salt-air friendly', body: 'Non-toxic products that are safe for kids, pets and asthma sufferers \u2014 and gentle on the timber, tiles and windows in coastal homes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Port Macquarie homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Hastings region with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Port Macquarie client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Port Macquarie?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Port Macquarie clean in under 60 seconds.',
      trust: 'Trusted by Port Macquarie families, retirees and holiday-let owners.',
    },
    seo: {
      title: 'House Cleaning Port Macquarie | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Port Macquarie & the Mid North Coast. Police-checked, fully insured cleaners. NDIS, aged care, DVA & insurance jobs welcome.',
    },
    nearbySuburbs: ['Wauchope', 'Lake Cathie', 'Bonny Hills', 'Laurieton', 'North Haven', 'Dunbogan', 'Camden Head', 'Telegraph Point', 'Sancrox', 'Kendall', 'Comboyne', 'Beechwood', 'Bago', 'Rollands Plains', 'Pembrooke', 'Kew', 'Lakewood', 'King Creek', 'Settlement Point', 'Lighthouse Beach'],
    mapEmbedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.1628905664766!2d152.89266101302883!3d-31.43718227414483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9dff93e1b980a5%3A0xe69d72ece7939e02!2sNATURO%20GROUP!5e0!3m2!1sen!2sau!4v1760513116223!5m2!1sen!2sau',
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Port Macquarie?',
        a: 'House cleaning in Port Macquarie starts from $153 for a regular clean and $371 for a deep clean. End-of-lease bond cleans start from $478. Pricing depends on the size of your home and the type of clean — get a transparent instant price online in under 60 seconds with no obligation.',
      },
      {
        q: 'Do you clean holiday rentals and Airbnb properties in Port Macquarie?',
        a: 'Yes — we regularly clean short-stay and holiday rental properties across Port Macquarie, Lighthouse Beach, Town Beach, Settlement Point and the surrounding Hastings region. We can coordinate same-day turnovers between guests, supply fresh linen and provide condition reports to owners and property managers.',
      },
      {
        q: 'Do you offer NDIS and aged care cleaning in Port Macquarie?',
        a: 'Yes. NATURO GROUP supports NDIS participants and aged care recipients across Port Macquarie and the Mid North Coast. We work with plan managers, support coordinators and Home Care Package providers to arrange regular in-home cleaning — with detailed invoicing and reports on request. Call 1300 876 472 to discuss your support needs.',
      },
      {
        q: 'Which areas around Port Macquarie do you service?',
        a: 'We service all of Port Macquarie and the broader Hastings region, including Wauchope, Lake Cathie, Bonny Hills, Laurieton, North Haven, Dunbogan, Telegraph Point and Kendall. If you are unsure whether we cover your street, call 1300 876 472 and we will confirm in 60 seconds.',
      },
      {
        q: 'Are your Port Macquarie cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner working in Port Macquarie is police-checked, fully insured for $20m public liability and trained to our nursing-grade cleaning standards. We supply all eco-friendly, non-toxic products and equipment — you do not need to provide anything.',
      },
    ],
  },

  // ── Port Macquarie sub-suburbs ──────────────────────────────────────────

  {
    slug: 'house-cleaning-wauchope',
    name: 'Wauchope',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Wauchope NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Wauchope'],
      tagline: 'Trusted, Trained and Thorough — across the Hastings Valley',
    },
    intro: {
      kicker: 'House cleaning in Wauchope',
      h2: 'Professional house cleaning in Wauchope & the Hastings Valley',
      paragraphs: [
        'Wauchope is the gateway to the Hastings Valley — a heritage timber town with a strong community spirit, known for Timbertown and its connection to the region\'s rich pioneering history. Homes here range from classic weatherboard cottages to modern family houses on quiet leafy streets. NATURO GROUP brings eco-friendly, nursing-grade cleaning to every Wauchope home.',
        'From central Wauchope to Beechwood, Pembrooke and the surrounding rural properties, our police-checked team provides regular, deep clean and end-of-lease services — reliable, insured and ready to work around your schedule.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Wauchope & the Mid North Coast',
      paragraphs: [
        'Wauchope sits at the junction of the Pacific and Oxley highways, making it the commercial and community hub for the Upper Hastings. Families, retirees and rural residents rely on its services, and our cleaners are part of that community — trained, vetted and insured.',
        'We also service Beechwood, Bago, Pembrooke, Rollands Plains, Telegraph Point and the broader Hastings Valley, giving rural and semi-rural households access to the same premium cleaning standard as city clients.',
      ],
      points: [
        { icon: 'shield', title: 'Local Wauchope cleaners', body: 'Police-checked, insured and trained to nursing-grade standards — ready for Wauchope homes, rural properties and heritage cottages.' },
        { icon: 'clock', title: 'Flexible rural scheduling', body: 'We work around farm schedules, school runs and country routines — morning, afternoon or weekend slots available.' },
        { icon: 'sparkle', title: 'Eco products safe for families', body: 'Plant-based, biodegradable products that are safe for kids, pets and sensitive airways — no harsh chemical fumes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we are proud to bring professional cleaning to regional communities like Wauchope that deserve the same quality of service as any city suburb.',
      'We support NDIS participants, Veterans Affairs recipients, aged care clients and Home Care Package holders across the Hastings Valley with personalised, compassionate in-home cleaning.',
      'Our team understands the pace and priorities of country life — we show up on time, communicate clearly and leave your home genuinely clean.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Wauchope?',
      sub: 'Eco-friendly products, police-checked cleaners and flexible scheduling — book your Wauchope clean in under 60 seconds online.',
      trust: 'Trusted by Wauchope families, retirees and rural homeowners across the Hastings Valley.',
    },
    seo: {
      title: 'House Cleaning Wauchope | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Wauchope & Hastings Valley NSW. Police-checked, fully insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Port Macquarie', 'Beechwood', 'Bago', 'Pembrooke', 'Sancrox', 'Telegraph Point', 'Rollands Plains', 'King Creek', 'Comboyne', 'Kendall'],
  },

  {
    slug: 'house-cleaning-lake-cathie',
    name: 'Lake Cathie',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Lake Cathie NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Lake Cathie'],
      tagline: 'Trusted, Trained and Thorough — on the Mid North Coast',
    },
    intro: {
      kicker: 'House cleaning in Lake Cathie',
      h2: 'Professional house cleaning in Lake Cathie & surrounds',
      paragraphs: [
        'Lake Cathie is a peaceful coastal village nestled between the ocean and a pristine coastal lake just south of Port Macquarie. With its beachside lifestyle, mix of holiday homes and permanent residences, and growing community, Lake Cathie is a sought-after address on the Mid North Coast. NATURO GROUP brings eco-friendly cleaning to every home here.',
        'From lakefront properties and holiday lets to family homes and retirement units, our police-checked team delivers regular, deep clean and end-of-lease services — with eco-friendly products and flexible scheduling around tides, guests and family life.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Lake Cathie & the Mid North Coast',
      paragraphs: [
        'Lake Cathie\'s coastal lifestyle attracts families, retirees and holidaymakers alike. Many homes double as short-stay rentals during peak season, and our team is experienced in fast, thorough holiday-let turnovers with condition reports for property managers.',
        'We also service Bonny Hills, Lakewood, Settlement Point, King Creek and Port Macquarie — so you have one trusted team across the whole coastal corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Local coastal cleaners', body: 'Police-checked, insured cleaners who understand the sand, salt air and humidity challenges of coastal homes.' },
        { icon: 'clock', title: 'Holiday-let turnovers', body: 'Same-day and next-day turnovers for short-stay and Airbnb properties — coordinated with check-in/check-out times.' },
        { icon: 'sparkle', title: 'Eco-friendly & lake-safe products', body: 'Biodegradable, non-toxic products that are safe for the nearby lake ecosystem and gentle on coastal surfaces.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we love the Mid North Coast lifestyle and are proud to support the Lake Cathie community with professional, reliable in-home cleaning.',
      'We work with holiday rental owners, NDIS participants, aged care recipients and local families — providing a service that is both thorough and gentle on coastal homes and the surrounding environment.',
      'Our team shows up on time, uses eco-friendly products and guarantees satisfaction on every clean. That\'s the NATURO GROUP promise.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Lake Cathie?',
      sub: 'Eco-friendly products, police-checked cleaners and flexible scheduling — book your Lake Cathie clean in under 60 seconds online.',
      trust: 'Trusted by Lake Cathie families, holiday homeowners and retirees on the Mid North Coast.',
    },
    seo: {
      title: 'House Cleaning Lake Cathie | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Lake Cathie & Mid North Coast NSW. Police-checked, insured. Holiday-let turnovers, regular & deep cleans.',
    },
    nearbySuburbs: ['Port Macquarie', 'Bonny Hills', 'Lakewood', 'King Creek', 'Settlement Point', 'North Haven', 'Dunbogan', 'Wauchope'],
  },

  {
    slug: 'house-cleaning-bonny-hills',
    name: 'Bonny Hills',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Bonny Hills NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Bonny Hills'],
      tagline: 'Trusted, Trained and Thorough — on the Mid North Coast',
    },
    intro: {
      kicker: 'House cleaning in Bonny Hills',
      h2: 'Professional house cleaning in Bonny Hills & Rainbow Beach',
      paragraphs: [
        'Bonny Hills is a relaxed coastal community perched above Rainbow Beach, south of Port Macquarie. Known for its surfing, bushwalking and unpretentious village atmosphere, it attracts families and sea-changers who value the quieter side of the Mid North Coast lifestyle. NATURO GROUP\'s eco-friendly cleaning service fits right in.',
        'Whether you\'re in a beach cottage, a modern family home or a holiday rental, our police-checked team delivers regular, deep clean and end-of-lease services — using plant-based products that are safe for your family and the coastal environment.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Bonny Hills & the surrounding coast',
      paragraphs: [
        'Bonny Hills sits between Lake Cathie and North Haven, giving it a distinct community feel distinct from Port Macquarie\'s busier centre. Many residents here have made a deliberate lifestyle choice — and they expect local services that match that care and attention.',
        'We service Bonny Hills, Lake Cathie, North Haven, Dunbogan and surrounding coastal communities, giving the whole stretch of the southern Mid North Coast access to the same premium eco-friendly cleaning.',
      ],
      points: [
        { icon: 'shield', title: 'Vetted coastal cleaners', body: 'Police-checked and insured, with training in eco-friendly products suited to coastal timber and fibro homes.' },
        { icon: 'clock', title: 'Flexible beach-town scheduling', body: 'We work around surf sessions, school runs and guest arrivals — morning slots, weekend cleans and same-day turnovers available.' },
        { icon: 'sparkle', title: 'Ocean-safe, non-toxic products', body: 'Biodegradable products that protect the coastal environment while delivering a genuinely deep clean.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we understand that communities like Bonny Hills choose their local services carefully — and we\'re proud to meet that standard with thorough, eco-friendly cleaning.',
      'We support NDIS clients, aged care recipients and holiday homeowners across the southern Mid North Coast with reliable, compassionate service.',
      'Every clean is backed by our satisfaction guarantee. If something\'s not right, we come back and fix it — no questions asked.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'fresh, clean home',
      h2Post: 'in Bonny Hills?',
      sub: 'Police-checked cleaners, eco-friendly products and easy online booking — your Bonny Hills clean is just 60 seconds away.',
      trust: 'Trusted by Bonny Hills families, holiday homeowners and the Rainbow Beach community.',
    },
    seo: {
      title: 'House Cleaning Bonny Hills | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Bonny Hills & Rainbow Beach NSW. Police-checked, insured. Regular, deep clean & holiday-let turnovers.',
    },
    nearbySuburbs: ['Port Macquarie', 'Lake Cathie', 'North Haven', 'Dunbogan', 'Laurieton', 'Wauchope', 'King Creek', 'Settlement Point'],
  },

  {
    slug: 'house-cleaning-laurieton',
    name: 'Laurieton',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Laurieton NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Laurieton'],
      tagline: 'Trusted, Trained and Thorough — on Camden Haven',
    },
    intro: {
      kicker: 'House cleaning in Laurieton',
      h2: 'Professional house cleaning in Laurieton & Camden Haven',
      paragraphs: [
        'Laurieton is the heart of the Camden Haven region — a scenic waterfront town at the mouth of Queens Lake, flanked by the Camden Haven Inlet and North Brother Mountain. With its mix of heritage homes, modern residences and holiday properties, it\'s one of the most desirable addresses between Port Macquarie and Taree. NATURO GROUP is proud to service this community.',
        'From Laurieton\'s historic foreshore to North Haven, Dunbogan and the surrounding Camden Haven villages, our police-checked team offers regular, deep clean and end-of-lease cleaning — with eco-friendly products and scheduling that suits the relaxed waterfront lifestyle.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Laurieton & the Camden Haven area',
      paragraphs: [
        'Camden Haven is a patchwork of waterways, beaches and rural land that attracts retirees, young families and sea-changers in roughly equal measure. Our team understands the local mix of weatherboard cottages, brick homes and waterfront holiday lets.',
        'We service Laurieton, North Haven, Dunbogan, Bonny Hills, Lake Cathie and Port Macquarie — one reliable team across the entire Mid North Coast corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Local Camden Haven cleaners', body: 'Police-checked and insured, with deep knowledge of the Laurieton and North Haven communities.' },
        { icon: 'clock', title: 'Waterfront-lifestyle scheduling', body: 'Flexible booking times that work around boat trips, fishing runs, golf and weekend getaways.' },
        { icon: 'sparkle', title: 'Products safe for waterways', body: 'Eco-friendly, biodegradable products that protect Camden Haven\'s estuaries and are non-toxic for children and pets.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we love the Camden Haven lifestyle and are committed to supporting Laurieton households with cleaning that is professional, eco-conscious and genuinely caring.',
      'We work with NDIS participants, aged care recipients and Home Care Package holders across the Camden Haven region with personalised, respectful in-home service.',
      'Every clean is backed by our satisfaction guarantee — a fresh, healthy home with no harsh chemicals and no surprises.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Laurieton?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Laurieton clean in under 60 seconds.',
      trust: 'Trusted by Laurieton families, retirees and Camden Haven holiday homeowners.',
    },
    seo: {
      title: 'House Cleaning Laurieton | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Laurieton & Camden Haven NSW. Police-checked, insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Port Macquarie', 'North Haven', 'Dunbogan', 'Bonny Hills', 'Lake Cathie', 'Camden Head', 'Wauchope', 'Kew'],
  },

  {
    slug: 'house-cleaning-north-haven',
    name: 'North Haven',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in North Haven NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'North Haven'],
      tagline: 'Trusted, Trained and Thorough — on the Camden Haven',
    },
    intro: {
      kicker: 'House cleaning in North Haven',
      h2: 'Professional house cleaning in North Haven & Camden Haven',
      paragraphs: [
        'North Haven is a quiet beachside village on the northern shore of Camden Haven, popular with fishing families, retirees and holiday visitors. With its small-town feel, pristine beaches and the natural beauty of Crowdy Bay National Park nearby, it\'s a community that takes pride in its surroundings — including their homes. NATURO GROUP matches that pride with professional eco-friendly cleaning.',
        'From North Haven\'s beach houses and fishing cottages to holiday rentals and permanent family homes, our police-checked team provides regular, deep clean and end-of-lease services — using non-toxic, biodegradable products and flexible scheduling.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across North Haven & the Mid North Coast',
      paragraphs: [
        'North Haven\'s community is tight-knit and values trusted local tradespeople. As an eco-conscious cleaning business, we fit naturally into a community that cares about its coastal environment and the health of its families.',
        'We service North Haven, Dunbogan, Camden Head, Laurieton, Bonny Hills and Port Macquarie — providing consistent, reliable cleaning across the entire Camden Haven corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Trusted local cleaners', body: 'Police-checked and insured, with the professionalism and reliability that North Haven residents expect.' },
        { icon: 'clock', title: 'Flexible scheduling', body: 'Bookings that fit around fishing, boat maintenance, guests and the relaxed North Haven pace of life.' },
        { icon: 'sparkle', title: 'Eco products for coastal homes', body: 'Plant-based, non-toxic formulas that protect timber, fibro and fibreglass surfaces common in coastal properties.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we are honoured to serve coastal communities like North Haven that take pride in their homes and their environment.',
      'We support local NDIS participants, aged care recipients and holiday homeowners with professional cleaning that is caring, thorough and eco-friendly.',
      'Our satisfaction guarantee means every clean meets the high standard North Haven residents expect — or we come back and make it right.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner, healthier home',
      h2Post: 'in North Haven?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — your North Haven clean is just 60 seconds away.',
      trust: 'Trusted by North Haven families, retirees and holiday homeowners on the Camden Haven.',
    },
    seo: {
      title: 'House Cleaning North Haven | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in North Haven & Camden Haven NSW. Police-checked, insured. Regular, deep clean & holiday-let turnovers.',
    },
    nearbySuburbs: ['Port Macquarie', 'Laurieton', 'Dunbogan', 'Camden Head', 'Bonny Hills', 'Lake Cathie', 'Wauchope'],
  },

  {
    slug: 'house-cleaning-dunbogan',
    name: 'Dunbogan',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Dunbogan NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Dunbogan'],
      tagline: 'Trusted, Trained and Thorough — on the Camden Haven',
    },
    intro: {
      kicker: 'House cleaning in Dunbogan',
      h2: 'Professional house cleaning in Dunbogan & Camden Haven',
      paragraphs: [
        'Dunbogan is a peaceful waterfront village on the Camden Haven Inlet, known for its quiet streets, waterside reserves and strong sense of community. Tucked between Laurieton and North Haven, it\'s a place where residents genuinely know their neighbours and take care of their properties. NATURO GROUP is proud to support Dunbogan homes with eco-friendly, professional cleaning.',
        'From holiday cabins and waterfront cottages to established family homes, our police-checked team covers regular maintenance cleans, deep cleans and end-of-lease services — all using biodegradable products and flexible scheduling that respects the village lifestyle.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Dunbogan & the Camden Haven',
      paragraphs: [
        'Dunbogan may be small, but its residents expect the same quality and reliability as any larger town. Our team serves this community with the same attention to detail we bring to every Mid North Coast job — thorough, timely and fully insured.',
        'We cover Dunbogan, North Haven, Laurieton, Camden Head and the surrounding Camden Haven villages, ensuring the whole waterfront corridor has access to a premium eco-friendly cleaning service.',
      ],
      points: [
        { icon: 'shield', title: 'Professional & insured', body: 'Every NATURO GROUP cleaner is police-checked and insured for $20m — so you can trust us with your Dunbogan home.' },
        { icon: 'clock', title: 'Village-friendly scheduling', body: 'Flexible appointment times that work around the quiet rhythms of waterfront village life.' },
        { icon: 'sparkle', title: 'Eco-friendly products', body: 'Non-toxic, plant-based formulas safe for children, pets and the adjacent Camden Haven waterways.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we believe every community — large or small — deserves professional, eco-conscious cleaning. Dunbogan is no exception.',
      'We support NDIS participants, aged care clients and local families across the Camden Haven with compassionate, reliable in-home cleaning.',
      'Our satisfaction guarantee applies to every job, no matter the size. Your Dunbogan home will be clean, fresh and healthy.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Dunbogan?',
      sub: 'Eco-friendly products, police-checked cleaners and simple online booking — book your Dunbogan clean in 60 seconds.',
      trust: 'Trusted by Dunbogan waterfront residents, holiday homeowners and the Camden Haven community.',
    },
    seo: {
      title: 'House Cleaning Dunbogan | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Dunbogan & Camden Haven NSW. Police-checked, insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Laurieton', 'North Haven', 'Camden Head', 'Bonny Hills', 'Port Macquarie', 'Lake Cathie'],
  },

  {
    slug: 'house-cleaning-camden-head',
    name: 'Camden Head',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Camden Head NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Camden Head'],
      tagline: 'Trusted, Trained and Thorough — on the Mid North Coast',
    },
    intro: {
      kicker: 'House cleaning in Camden Head',
      h2: 'Professional house cleaning in Camden Head & Camden Haven',
      paragraphs: [
        'Camden Head is a secluded coastal community at the northern tip of Camden Haven, adjacent to Crowdy Bay National Park. With its remote beaches, fishing culture and close-knit resident base, it\'s a place where people value reliability and trust above all. NATURO GROUP brings that same reliable, eco-friendly cleaning standard to Camden Head homes.',
        'Whether you\'re in a permanent residence or a holiday property, our police-checked cleaners deliver thorough regular, deep clean and end-of-lease services using plant-based products and scheduling that works around your life.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Camden Head & the Mid North Coast',
      paragraphs: [
        'Camden Head\'s small permanent population and seasonal influx of holiday visitors means local homeowners need a cleaning service they can count on year-round. Our team is consistent, insured and fully equipped to handle any property type.',
        'We service Camden Head, Dunbogan, North Haven, Laurieton and the broader Camden Haven — one trusted team for the whole coastal corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Reliable & fully insured', body: 'Police-checked cleaners backed by $20m public liability — your Camden Head home is in safe hands.' },
        { icon: 'clock', title: 'Flexible for remote living', body: 'We coordinate around your schedule, including holiday-let turnovers and seasonal deep cleans.' },
        { icon: 'sparkle', title: 'Nature-safe products', body: 'Biodegradable, non-toxic formulas chosen to protect the coastal bushland and National Park environment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we respect the trust that residents of places like Camden Head place in service providers who access their homes. Every cleaner we send is thoroughly vetted.',
      'We support NDIS clients, aged care recipients and holiday homeowners across the Camden Haven with dependable, compassionate cleaning.',
      'Our satisfaction guarantee means your Camden Head home will be cleaned to the standard you deserve — every time.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'at Camden Head?',
      sub: 'Police-checked cleaners, eco-friendly products and easy online booking — book your Camden Head clean in under 60 seconds.',
      trust: 'Trusted by Camden Head residents and holiday homeowners on the Mid North Coast.',
    },
    seo: {
      title: 'House Cleaning Camden Head | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Camden Head & Camden Haven NSW. Police-checked, insured. Regular, deep clean & holiday-let turnovers.',
    },
    nearbySuburbs: ['Dunbogan', 'North Haven', 'Laurieton', 'Bonny Hills', 'Port Macquarie', 'Lake Cathie'],
  },

  {
    slug: 'house-cleaning-telegraph-point',
    name: 'Telegraph Point',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Telegraph Point NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Telegraph Point'],
      tagline: 'Trusted, Trained and Thorough — in the Hastings Valley',
    },
    intro: {
      kicker: 'House cleaning in Telegraph Point',
      h2: 'Professional house cleaning in Telegraph Point & surrounds',
      paragraphs: [
        'Telegraph Point is a rural community in the upper Hastings Valley, where cattle properties, hobby farms and timber-clad homes line quiet country roads. It\'s a community built on hard work and trust — and that\'s exactly what NATURO GROUP brings to your home with eco-friendly, professional cleaning.',
        'From farmhouses and rural cottages to modern homes, our police-checked team provides regular, deep clean and end-of-lease services — using non-toxic products and scheduling around farm life, school runs and the rhythms of country living.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Telegraph Point & the Hastings Valley',
      paragraphs: [
        'Rural communities like Telegraph Point need cleaning services that understand country homes — dust, mud, timber floors and the demands of large properties. Our trained team is equipped and experienced for exactly these conditions.',
        'We service Telegraph Point, Wauchope, Sancrox, Beechwood, Bago and Port Macquarie, giving Hastings Valley households access to the same quality cleaning as city residents.',
      ],
      points: [
        { icon: 'shield', title: 'Vetted & insured', body: 'Every cleaner is police-checked and carries $20m public liability — the standard rural homeowners deserve.' },
        { icon: 'clock', title: 'Country-schedule friendly', body: 'We book around farm operations, school buses, stock moves and everything else that rural life demands.' },
        { icon: 'sparkle', title: 'Safe for rural properties', body: 'Eco-friendly, non-toxic products that are safe for working dogs, horses and water tanks.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we understand the value of a genuinely trusted local service in rural areas like Telegraph Point. That trust is something we earn with every clean.',
      'We support NDIS participants, aged care recipients and rural families across the Hastings Valley with compassionate, reliable in-home cleaning.',
      'Our satisfaction guarantee applies to every job — your Telegraph Point home will be clean, fresh and ready for whatever life brings next.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'fresh, clean home',
      h2Post: 'in Telegraph Point?',
      sub: 'Police-checked cleaners, eco-friendly products and flexible scheduling — book your Telegraph Point clean in 60 seconds.',
      trust: 'Trusted by Telegraph Point farming families and rural homeowners across the Hastings Valley.',
    },
    seo: {
      title: 'House Cleaning Telegraph Point | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Telegraph Point & Hastings Valley NSW. Police-checked, insured. Suitable for rural and hobby-farm homes.',
    },
    nearbySuburbs: ['Wauchope', 'Port Macquarie', 'Sancrox', 'Beechwood', 'Bago', 'Kendall', 'Comboyne', 'Rollands Plains'],
  },

  {
    slug: 'house-cleaning-sancrox',
    name: 'Sancrox',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Sancrox NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Sancrox'],
      tagline: 'Trusted, Trained and Thorough — near Port Macquarie',
    },
    intro: {
      kicker: 'House cleaning in Sancrox',
      h2: 'Professional house cleaning in Sancrox & Port Macquarie',
      paragraphs: [
        'Sancrox is a semi-rural suburb on the western outskirts of Port Macquarie, where modern estate homes sit alongside larger rural residential blocks. It\'s a growing community that bridges country living with city convenience — and NATURO GROUP\'s eco-friendly cleaning service fits both lifestyles perfectly.',
        'From Sancrox\'s newer housing estates to hobby-farm properties, our police-checked team delivers regular, deep clean and end-of-lease services — with plant-based products and flexible scheduling to suit both weekend warriors and work-from-home families.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Sancrox & the Port Macquarie region',
      paragraphs: [
        'Sancrox\'s mix of new residential estates and rural holdings means our team needs to handle everything from tiled open-plan homes to older timber properties with weatherboard walls and large back yards — and we do.',
        'We service Sancrox, Wauchope, King Creek, Telegraph Point, Lakewood and Port Macquarie — one reliable team for the entire Port Macquarie hinterland.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every NATURO GROUP cleaner is vetted, trained and insured — ready for Sancrox homes of all sizes and styles.' },
        { icon: 'clock', title: 'Flexible booking', body: 'Regular fortnightly cleans, one-off deep cleans or end-of-lease — all scheduled around your work and lifestyle.' },
        { icon: 'sparkle', title: 'Eco-friendly formulas', body: 'Plant-based, non-toxic products safe for children, pets and the semi-rural environment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we\'re proud to support the growing Sancrox community with cleaning that is eco-friendly, reliable and thorough.',
      'We work with NDIS participants, aged care clients and local families to provide personalised in-home cleaning that makes a real difference.',
      'Our satisfaction guarantee covers every clean in Sancrox — so you can book with confidence.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner, healthier home',
      h2Post: 'in Sancrox?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — your Sancrox clean is just 60 seconds away.',
      trust: 'Trusted by Sancrox families and semi-rural homeowners near Port Macquarie.',
    },
    seo: {
      title: 'House Cleaning Sancrox | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Sancrox near Port Macquarie NSW. Police-checked, insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Port Macquarie', 'Wauchope', 'King Creek', 'Lakewood', 'Telegraph Point', 'Beechwood', 'Settlement Point'],
  },

  {
    slug: 'house-cleaning-kendall',
    name: 'Kendall',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Kendall NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Kendall'],
      tagline: 'Trusted, Trained and Thorough — in the Manning Valley',
    },
    intro: {
      kicker: 'House cleaning in Kendall',
      h2: 'Professional house cleaning in Kendall & the Manning Valley',
      paragraphs: [
        'Kendall is a charming timber and dairy town in the Manning Valley, known for its arts community, heritage buildings and the annual Kendall Art Show. Surrounded by lush green hills and state forest, it\'s a town that marries rural character with creative community spirit. NATURO GROUP is proud to bring professional, eco-friendly cleaning to Kendall homes.',
        'From Kendall\'s federation-era homes and character cottages to modern family residences, our police-checked team provides regular, deep clean and end-of-lease services — using biodegradable products and flexible scheduling that suits country town life.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Kendall & the Manning Valley',
      paragraphs: [
        'Kendall\'s small-town community values reliability and local connections. Our team\'s eco-conscious approach aligns with the environmental values of this green, arts-focused community — we clean thoroughly without harsh chemicals.',
        'We service Kendall, Comboyne, Wauchope, Telegraph Point and Port Macquarie, giving Manning Valley households access to the same quality cleaning as coastal residents.',
      ],
      points: [
        { icon: 'shield', title: 'Trusted by country communities', body: 'Police-checked, insured cleaners with the reliability and discretion that Kendall residents expect.' },
        { icon: 'clock', title: 'Country-schedule friendly', body: 'Flexible booking around markets, art shows, farm operations and the Manning Valley way of life.' },
        { icon: 'sparkle', title: 'Eco-friendly — genuinely', body: 'Plant-based, biodegradable products that match Kendall\'s environmental values and are safe for bush-sensitive properties.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we believe communities like Kendall — with their strong values and sense of place — deserve cleaning services that share those values.',
      'We support NDIS participants, aged care clients and local families across the Manning Valley with caring, professional in-home cleaning.',
      'Our satisfaction guarantee means your Kendall home will be cleaned with the thoroughness and respect it deserves.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Kendall?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Kendall clean in 60 seconds.',
      trust: 'Trusted by Kendall families, artists and the Manning Valley community.',
    },
    seo: {
      title: 'House Cleaning Kendall NSW | Eco-Friendly Cleaners',
      description: 'Eco-friendly house cleaning in Kendall & Manning Valley NSW. Police-checked, insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Wauchope', 'Comboyne', 'Port Macquarie', 'Telegraph Point', 'Rollands Plains', 'Beechwood', 'Laurieton'],
  },

  {
    slug: 'house-cleaning-comboyne',
    name: 'Comboyne',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Comboyne NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Comboyne'],
      tagline: 'Trusted, Trained and Thorough — on the Comboyne Plateau',
    },
    intro: {
      kicker: 'House cleaning in Comboyne',
      h2: 'Professional house cleaning in Comboyne & surrounds',
      paragraphs: [
        'Comboyne sits high on the Comboyne Plateau above the Manning Valley — a cool, green farming community famous for its award-winning cheese, dairy farms and breathtaking mountain scenery. Homes here are often spacious rural properties with timber finishes, verandahs and the kind of dust that comes with country living. NATURO GROUP handles it all with eco-friendly, professional cleaning.',
        'From Comboyne\'s farmhouses and country cottages to modern homes, our police-checked team provides regular, deep clean and end-of-lease services using biodegradable products safe for farm animals and sensitive rural environments.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners serving Comboyne & the plateau community',
      paragraphs: [
        'Comboyne\'s farming community trusts local service providers who understand rural life — the mud, the animals, the wide-open spaces. Our team is trained and equipped for large rural properties and their unique cleaning demands.',
        'We service Comboyne, Kendall, Wauchope, Telegraph Point and the surrounding plateau communities, bringing city-quality cleaning to the Comboyne highlands.',
      ],
      points: [
        { icon: 'shield', title: 'Rural property specialists', body: 'Police-checked cleaners equipped for farm homes, large rural properties and plateau conditions.' },
        { icon: 'clock', title: 'Flexible for farm life', body: 'Bookings scheduled around milking, farm operations and the seasonal rhythms of plateau life.' },
        { icon: 'sparkle', title: 'Safe for animals & water', body: 'Eco-friendly, biodegradable products safe for dairy cattle, horses, water tanks and the plateau environment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we understand that rural communities like Comboyne need service providers who respect the land and the lifestyle. That\'s exactly the approach we bring.',
      'We support NDIS participants, aged care clients and farming families across the plateau with compassionate, professional in-home cleaning.',
      'Your Comboyne home will be cleaned to the same standard we hold ourselves to in every city suburb — thorough, eco-friendly and guaranteed.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Comboyne?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Comboyne clean in 60 seconds.',
      trust: 'Trusted by Comboyne farming families and plateau homeowners.',
    },
    seo: {
      title: 'House Cleaning Comboyne | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Comboyne & Comboyne Plateau NSW. Police-checked, insured. Regular, deep clean & rural property cleaning.',
    },
    nearbySuburbs: ['Kendall', 'Wauchope', 'Port Macquarie', 'Telegraph Point', 'Beechwood', 'Rollands Plains'],
  },

  {
    slug: 'house-cleaning-beechwood',
    name: 'Beechwood',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Beechwood NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Beechwood'],
      tagline: 'Trusted, Trained and Thorough — in the Hastings Valley',
    },
    intro: {
      kicker: 'House cleaning in Beechwood',
      h2: 'Professional house cleaning in Beechwood & Wauchope',
      paragraphs: [
        'Beechwood is a small rural community between Wauchope and Port Macquarie, nestled in the Hastings Valley. Known for its peaceful setting, horse properties and hobby farms, it\'s a community where people value quality and trust in their service providers. NATURO GROUP brings that standard to every Beechwood home.',
        'From timber homes and hobby-farm residences to newer rural blocks, our police-checked team provides regular, deep clean and end-of-lease services — using biodegradable products and scheduling that suits rural and semi-rural living.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Beechwood & the Hastings Valley',
      paragraphs: [
        'Beechwood\'s proximity to both Wauchope and Port Macquarie means residents enjoy the best of both worlds — rural peace with easy access to coastal amenities. Our cleaning service bridges that same gap: professional city standards delivered to your country doorstep.',
        'We service Beechwood, Wauchope, Sancrox, Telegraph Point, Bago and Port Macquarie — one trusted team for the Hastings Valley.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every NATURO GROUP cleaner is thoroughly vetted and insured — the reliability Beechwood residents deserve.' },
        { icon: 'clock', title: 'Rural-schedule friendly', body: 'Flexible booking times that work around horse care, farming schedules and country routines.' },
        { icon: 'sparkle', title: 'Eco products for rural homes', body: 'Plant-based, non-toxic formulas safe for horses, pets, children and rural water supplies.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we are proud to service communities like Beechwood that might be small in population but deserve the same professional care as any city suburb.',
      'We support NDIS participants, aged care clients and rural families across the Hastings Valley with reliable, compassionate in-home cleaning.',
      'Our satisfaction guarantee covers every Beechwood clean — your home will be spotless, or we make it right.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Beechwood?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Beechwood clean in 60 seconds.',
      trust: 'Trusted by Beechwood families, horse-property owners and Hastings Valley residents.',
    },
    seo: {
      title: 'House Cleaning Beechwood NSW | Eco-Friendly Cleaners',
      description: 'Eco-friendly house cleaning in Beechwood & Wauchope NSW. Police-checked, insured. Regular, deep clean & rural property services.',
    },
    nearbySuburbs: ['Wauchope', 'Port Macquarie', 'Sancrox', 'Telegraph Point', 'Bago', 'Pembrooke', 'King Creek'],
  },

  {
    slug: 'house-cleaning-bago',
    name: 'Bago',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Bago NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Bago'],
      tagline: 'Trusted, Trained and Thorough — near Wauchope NSW',
    },
    intro: {
      kicker: 'House cleaning in Bago',
      h2: 'Professional house cleaning in Bago & Wauchope',
      paragraphs: [
        'Bago is a quiet rural community bordering the Bago State Forest near Wauchope, where timber homes and farming properties sit amid tall eucalypts and native bushland. It\'s a serene, community-minded area that values trustworthy local services. NATURO GROUP brings professional, eco-friendly cleaning to Bago homes.',
        'From farmhouses and bush-block properties to hobby-farm residences, our police-checked team provides regular, deep clean and end-of-lease services — using non-toxic products that are safe for the bush environment and your family.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Bago & the Hastings Valley',
      paragraphs: [
        'Bago\'s bushland setting means homes face unique cleaning challenges — dust, pollen, leaf litter and the general demands of rural living. Our team is trained and equipped to handle all of these with thoroughness and care.',
        'We service Bago, Wauchope, Beechwood, Telegraph Point, Pembrooke and Port Macquarie — covering the rural western corridor of the Hastings Valley.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & trusted', body: 'Every NATURO GROUP cleaner is vetted and insured — ideal for remote and rural Bago properties.' },
        { icon: 'clock', title: 'Flexible rural scheduling', body: 'Bookings that work around farm operations, bush tracks and the quiet Bago pace of life.' },
        { icon: 'sparkle', title: 'Bush-safe eco products', body: 'Biodegradable, non-toxic formulas that protect native gardens, water tanks and rainforest environments.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we take pride in servicing every corner of the Mid North Coast — including rural communities like Bago that are often overlooked by city-based services.',
      'We support NDIS participants, aged care clients and farming families with in-home cleaning that is caring, thorough and eco-friendly.',
      'Our satisfaction guarantee means your Bago home will be cleaned to the standard you deserve, no matter how remote.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'clean, fresh home',
      h2Post: 'in Bago?',
      sub: 'Police-checked cleaners, eco-friendly products and easy online booking — book your Bago clean in under 60 seconds.',
      trust: 'Trusted by Bago farming families and bush-block homeowners near Wauchope.',
    },
    seo: {
      title: 'House Cleaning Bago NSW | Eco-Friendly Cleaners',
      description: 'Eco-friendly house cleaning in Bago near Wauchope NSW. Police-checked, insured. Regular, deep clean & rural property services.',
    },
    nearbySuburbs: ['Wauchope', 'Beechwood', 'Pembrooke', 'Telegraph Point', 'Port Macquarie', 'Sancrox', 'Rollands Plains'],
  },

  {
    slug: 'house-cleaning-rollands-plains',
    name: 'Rollands Plains',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Rollands Plains NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Rollands Plains'],
      tagline: 'Trusted, Trained and Thorough — in the Hastings Hinterland',
    },
    intro: {
      kicker: 'House cleaning in Rollands Plains',
      h2: 'Professional house cleaning in Rollands Plains & surrounds',
      paragraphs: [
        'Rollands Plains is a small rural community in the Hastings hinterland north of Wauchope, where cattle properties and hobby farms spread across open rolling country. It\'s a place where community trust matters and quality service is appreciated. NATURO GROUP brings professional, eco-friendly cleaning to Rollands Plains homes.',
        'From farmhouses and rural cottages to modern country homes, our police-checked team delivers regular, deep clean and end-of-lease services — using non-toxic products and scheduling that accommodates the demands of rural life.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Rollands Plains & the Hastings hinterland',
      paragraphs: [
        'Rollands Plains sits within the broader Wauchope service area, where our team regularly covers both small rural communities and larger towns. We understand the cleaning needs of country homes — from dust and pollen to muddy boot entries and timber floors.',
        'We service Rollands Plains, Wauchope, Telegraph Point, Bago, Beechwood and Port Macquarie — one reliable team for the whole Hastings hinterland.',
      ],
      points: [
        { icon: 'shield', title: 'Professional & insured', body: 'Police-checked cleaners with $20m public liability — the standard that rural Rollands Plains homeowners deserve.' },
        { icon: 'clock', title: 'Rural-schedule flexibility', body: 'We book around mustering, cropping seasons and country routines — no rigid city-hours policy.' },
        { icon: 'sparkle', title: 'Safe eco products', body: 'Plant-based, biodegradable formulas suitable for farm homes, water tanks and native garden environments.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we believe every rural community like Rollands Plains deserves access to professional, eco-conscious cleaning — not just city suburbs.',
      'We support NDIS clients, aged care recipients and farming families across the Hastings hinterland with caring, reliable in-home cleaning.',
      'Our satisfaction guarantee applies to every clean, no matter the location — your Rollands Plains home will be spotless.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Rollands Plains?',
      sub: 'Police-checked cleaners, eco-friendly products and easy online booking — book your Rollands Plains clean in 60 seconds.',
      trust: 'Trusted by Rollands Plains farming families and rural homeowners in the Hastings hinterland.',
    },
    seo: {
      title: 'House Cleaning Rollands Plains | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Rollands Plains & Hastings hinterland NSW. Police-checked, insured. Regular, deep clean & rural services.',
    },
    nearbySuburbs: ['Wauchope', 'Telegraph Point', 'Bago', 'Beechwood', 'Pembrooke', 'Port Macquarie', 'Kendall'],
  },

  {
    slug: 'house-cleaning-pembrooke',
    name: 'Pembrooke',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Pembrooke NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Pembrooke'],
      tagline: 'Trusted, Trained and Thorough — near Wauchope NSW',
    },
    intro: {
      kicker: 'House cleaning in Pembrooke',
      h2: 'Professional house cleaning in Pembrooke & Wauchope',
      paragraphs: [
        'Pembrooke is a quiet rural settlement near Wauchope, set among dairy farms, timber forests and native bush in the upper Hastings Valley. With its small permanent population and agricultural character, it\'s a community where trust in service providers is earned and valued. NATURO GROUP delivers that trust with professional, eco-friendly in-home cleaning.',
        'From rural homes and farmhouses to hobby-farm properties, our police-checked team provides regular, deep clean and end-of-lease services using biodegradable products safe for farm animals, native gardens and water supplies.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Pembrooke & the Hastings Valley',
      paragraphs: [
        'Pembrooke\'s agricultural community appreciates service providers who respect the land and the lifestyle. Our eco-friendly approach and fully vetted team align with those values — professional cleaning that leaves no harsh residues.',
        'We service Pembrooke, Wauchope, Bago, Beechwood, Rollands Plains and Port Macquarie, covering the rural western corridor of the Hastings Valley.',
      ],
      points: [
        { icon: 'shield', title: 'Vetted & fully insured', body: 'Police-checked cleaners with $20m public liability — the professionalism rural Pembrooke homeowners deserve.' },
        { icon: 'clock', title: 'Farm-schedule friendly', body: 'Bookings around milking, mustering and country routines — no rigid city-hours restrictions.' },
        { icon: 'sparkle', title: 'Eco-safe for rural living', body: 'Biodegradable products that protect your farm animals, native garden and local waterways.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we extend the same professional care to rural communities like Pembrooke as we do in every city suburb we serve.',
      'We support NDIS participants, aged care clients and farming families across the Hastings Valley with reliable, compassionate in-home cleaning.',
      'Your Pembrooke home will be cleaned to the high standard our satisfaction guarantee demands — every single visit.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Pembrooke?',
      sub: 'Police-checked cleaners, eco-friendly products and easy online booking — book your Pembrooke clean in 60 seconds.',
      trust: 'Trusted by Pembrooke farming families and rural homeowners near Wauchope.',
    },
    seo: {
      title: 'House Cleaning Pembrooke NSW | Eco-Friendly Cleaners',
      description: 'Eco-friendly house cleaning in Pembrooke near Wauchope NSW. Police-checked, insured. Regular, deep clean & rural property services.',
    },
    nearbySuburbs: ['Wauchope', 'Bago', 'Beechwood', 'Rollands Plains', 'Telegraph Point', 'Port Macquarie'],
  },

  {
    slug: 'house-cleaning-kew-port-macquarie',
    name: 'Kew',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Kew near Port Macquarie NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Kew'],
      tagline: 'Trusted, Trained and Thorough — on the Mid North Coast',
    },
    intro: {
      kicker: 'House cleaning in Kew NSW',
      h2: 'Professional house cleaning in Kew & the Mid North Coast',
      paragraphs: [
        'Kew is a coastal township between Taree and Port Macquarie, set on the shores of the Manning River estuary. With its relaxed waterfront lifestyle, mix of long-term residents and holiday visitors, and beautiful Manning River scenery, Kew is an underrated gem of the Mid North Coast. NATURO GROUP brings eco-friendly, professional cleaning to Kew homes.',
        'From Kew\'s waterfront properties and coastal cottages to family homes and rural blocks, our police-checked team delivers regular, deep clean and end-of-lease services — with eco-friendly products and scheduling around the tide and your lifestyle.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Kew & the Manning River area',
      paragraphs: [
        'Kew residents enjoy the quieter side of Mid North Coast life, away from the Port Macquarie crowds. Our team respects that lifestyle and brings professional cleaning that matches the quality of the location.',
        'We service Kew, Laurieton, North Haven, Dunbogan and Port Macquarie — one trusted team across the entire southern Mid North Coast.',
      ],
      points: [
        { icon: 'shield', title: 'Professional & insured', body: 'Police-checked cleaners with $20m public liability — ready for Kew\'s waterfront and family homes.' },
        { icon: 'clock', title: 'Flexible for coastal living', body: 'Bookings around fishing, boating and the relaxed Mid North Coast lifestyle.' },
        { icon: 'sparkle', title: 'Eco products for waterways', body: 'Biodegradable, non-toxic formulas that protect the Manning River estuary and coastal environment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we appreciate the unique character of communities like Kew — and we\'re proud to service them with the same professional care as our city clients.',
      'We support NDIS participants, aged care recipients and local families on the Mid North Coast with caring, eco-friendly in-home cleaning.',
      'Our satisfaction guarantee means your Kew home will be cleaned to the standard you deserve — every time.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Kew?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Kew clean in under 60 seconds.',
      trust: 'Trusted by Kew waterfront residents and Mid North Coast homeowners.',
    },
    seo: {
      title: 'House Cleaning Kew NSW | Eco-Friendly Mid North Coast Cleaners',
      description: 'Eco-friendly house cleaning in Kew on the Mid North Coast NSW. Police-checked, insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Laurieton', 'North Haven', 'Dunbogan', 'Port Macquarie', 'Camden Head', 'Bonny Hills'],
  },

  {
    slug: 'house-cleaning-lakewood',
    name: 'Lakewood',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Lakewood NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Lakewood'],
      tagline: 'Trusted, Trained and Thorough — near Port Macquarie',
    },
    intro: {
      kicker: 'House cleaning in Lakewood',
      h2: 'Professional house cleaning in Lakewood & Port Macquarie',
      paragraphs: [
        'Lakewood is a developing outer suburb of Port Macquarie, popular with young families and first-home buyers drawn to its newer housing estates, affordable blocks and easy access to both the Port Macquarie centre and the Hastings Valley hinterland. NATURO GROUP is proud to grow with this community, delivering eco-friendly cleaning to every new Lakewood home.',
        'From Lakewood\'s modern estates and new-build homes to semi-rural properties, our police-checked team provides regular, deep clean and end-of-lease cleaning — with plant-based products and flexible scheduling.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Lakewood & Port Macquarie',
      paragraphs: [
        'Lakewood\'s growing community includes many young families, dual-income households and busy professionals who need a reliable, trustworthy cleaning service. Our team fits that brief perfectly.',
        'We service Lakewood, Sancrox, King Creek, Settlement Point and Port Macquarie — one team for the entire outer-ring Port Macquarie community.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every NATURO GROUP cleaner is vetted and insured — ideal for new estates and young families in Lakewood.' },
        { icon: 'clock', title: 'Flexible for busy families', body: 'Regular fortnightly cleans, one-off deep cleans and end-of-lease services — all scheduled around your family\'s routine.' },
        { icon: 'sparkle', title: 'Child-safe eco products', body: 'Plant-based, non-toxic formulas safe for babies, toddlers, pets and sensitive skin.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we love being part of growing communities like Lakewood — providing reliable, professional cleaning as the suburb finds its feet.',
      'We support NDIS participants, aged care recipients and young families across Port Macquarie with caring, thorough in-home cleaning.',
      'Our satisfaction guarantee covers every Lakewood clean — book with confidence.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Lakewood?',
      sub: 'Child-safe, eco-friendly products, police-checked cleaners and easy online booking — your Lakewood clean is just 60 seconds away.',
      trust: 'Trusted by Lakewood families and new-home owners near Port Macquarie.',
    },
    seo: {
      title: 'House Cleaning Lakewood | Eco-Friendly Cleaners Port Macquarie',
      description: 'Eco-friendly house cleaning in Lakewood near Port Macquarie NSW. Police-checked, insured. Regular, deep clean & new-home services.',
    },
    nearbySuburbs: ['Port Macquarie', 'Sancrox', 'King Creek', 'Settlement Point', 'Wauchope', 'Lake Cathie', 'Bonny Hills'],
  },

  {
    slug: 'house-cleaning-king-creek',
    name: 'King Creek',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in King Creek NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'King Creek'],
      tagline: 'Trusted, Trained and Thorough — near Port Macquarie',
    },
    intro: {
      kicker: 'House cleaning in King Creek',
      h2: 'Professional house cleaning in King Creek & Port Macquarie',
      paragraphs: [
        'King Creek is a semi-rural outer suburb of Port Macquarie, known for its larger residential blocks, acreage properties and quieter lifestyle just a short drive from the coast. Residents here often have hobby farms, large gardens and homes that benefit from a professional, thorough clean. NATURO GROUP delivers that eco-friendly clean to King Creek.',
        'From spacious rural homes and hobby-farm properties to modern family residences, our police-checked team provides regular, deep clean and end-of-lease services — using biodegradable products and flexible scheduling around country-suburban life.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across King Creek & the Port Macquarie region',
      paragraphs: [
        'King Creek\'s semi-rural lifestyle means homes often face specific cleaning challenges — larger floor areas, more surfaces to treat and the general dust and pollen that comes with acreage. Our team is trained and equipped for exactly these conditions.',
        'We service King Creek, Sancrox, Lakewood, Settlement Point, Wauchope and Port Macquarie — one reliable team for the whole outer-ring Port Macquarie community.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every NATURO GROUP cleaner is vetted and insured — reliable enough for your acreage King Creek home.' },
        { icon: 'clock', title: 'Acreage-schedule friendly', body: 'Flexible bookings for larger properties and rural residential blocks — thorough cleans without the rush.' },
        { icon: 'sparkle', title: 'Safe for animals & gardens', body: 'Eco-friendly, non-toxic formulas safe for pets, chickens, orchards and rainwater tanks.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we understand that semi-rural homes like those in King Creek have different cleaning needs — and we bring the expertise and equipment to meet them.',
      'We support NDIS participants, aged care clients and rural families with professional, caring in-home cleaning across the Port Macquarie region.',
      'Our satisfaction guarantee means your King Creek home will be cleaned thoroughly and to the standard you expect — every time.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in King Creek?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your King Creek clean in 60 seconds.',
      trust: 'Trusted by King Creek acreage owners and semi-rural families near Port Macquarie.',
    },
    seo: {
      title: 'House Cleaning King Creek | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in King Creek near Port Macquarie NSW. Police-checked, insured. Acreage and rural property cleaning specialists.',
    },
    nearbySuburbs: ['Port Macquarie', 'Sancrox', 'Lakewood', 'Wauchope', 'Settlement Point', 'Beechwood', 'Lake Cathie'],
  },

  {
    slug: 'house-cleaning-settlement-point',
    name: 'Settlement Point',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Settlement Point NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Settlement Point'],
      tagline: 'Trusted, Trained and Thorough — on the Hastings River',
    },
    intro: {
      kicker: 'House cleaning in Settlement Point',
      h2: 'Professional house cleaning in Settlement Point & Port Macquarie',
      paragraphs: [
        'Settlement Point is a tranquil riverside suburb on the southern bank of the Hastings River, known for its waterfront homes, boat ramps and peaceful natural setting just minutes from Port Macquarie. With its mix of long-term residents, holiday homes and growing permanent population, Settlement Point is one of the area\'s most sought-after addresses. NATURO GROUP is proud to service it.',
        'From Settlement Point\'s waterfront homes and holiday cottages to family residences, our police-checked team provides regular, deep clean and end-of-lease services — using eco-friendly products that are safe for children, pets and the adjacent river environment.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Settlement Point & Port Macquarie',
      paragraphs: [
        'Settlement Point\'s riverside lifestyle attracts retirees, families and holiday homeowners who value quality services and discretion. Our team understands waterfront properties — salt air, humidity, timber decks and all.',
        'We service Settlement Point, Lake Cathie, King Creek, Sancrox, Lakewood and Port Macquarie — one trusted team for the Hastings River corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Waterfront property specialists', body: 'Police-checked, insured cleaners experienced with waterfront homes and the specific needs of riverside living.' },
        { icon: 'clock', title: 'Flexible scheduling', body: 'Bookings that work around boat trips, fishing and the relaxed riverside pace of Settlement Point.' },
        { icon: 'sparkle', title: 'River-safe eco products', body: 'Biodegradable, non-toxic formulas that protect the Hastings River ecosystem and are safe for families and pets.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we\'re proud to service beautiful waterfront communities like Settlement Point with the same professional care we bring to every Port Macquarie suburb.',
      'We support NDIS participants, aged care clients and holiday homeowners on the Hastings River with caring, thorough and eco-friendly cleaning.',
      'Our satisfaction guarantee ensures your Settlement Point home is always cleaned to the standard its beautiful location deserves.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless riverside home',
      h2Post: 'in Settlement Point?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Settlement Point clean in 60 seconds.',
      trust: 'Trusted by Settlement Point waterfront residents and holiday homeowners on the Hastings River.',
    },
    seo: {
      title: 'House Cleaning Settlement Point | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Settlement Point on the Hastings River NSW. Police-checked, insured. Waterfront, holiday-let & regular cleans.',
    },
    nearbySuburbs: ['Port Macquarie', 'Lake Cathie', 'King Creek', 'Sancrox', 'Lakewood', 'Lighthouse Beach', 'Bonny Hills'],
  },

  {
    slug: 'house-cleaning-lighthouse-beach',
    name: 'Lighthouse Beach',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Mid North Coast',
    heroImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Lighthouse Beach NSW',
    ogImage: '/images/suburbs/cleaners-port-macquarie.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Lighthouse Beach'],
      tagline: 'Trusted, Trained and Thorough — on the Mid North Coast',
    },
    intro: {
      kicker: 'House cleaning in Lighthouse Beach',
      h2: 'Professional house cleaning in Lighthouse Beach & Port Macquarie',
      paragraphs: [
        'Lighthouse Beach is one of Port Macquarie\'s most prestigious suburbs — a prime beachside address in the shadow of the historic Tacking Point Lighthouse, with stunning ocean views, premium homes and a vibrant coastal lifestyle. Residents here expect the best, and NATURO GROUP delivers it with eco-friendly, professional cleaning services.',
        'From Lighthouse Beach\'s luxury homes and holiday lets to established family residences, our police-checked team provides regular, deep clean, end-of-lease and holiday-let turnover services — using plant-based products and scheduling coordinated with check-in and check-out times.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Lighthouse Beach & Port Macquarie',
      paragraphs: [
        'Lighthouse Beach\'s premium real estate attracts high standards in every service — and our cleaning is no exception. From ocean-view apartments to architect-designed homes, we bring the thorough, professional clean that this address demands.',
        'We service Lighthouse Beach, Settlement Point, Lake Cathie, Bonny Hills and all of Port Macquarie, giving the entire Mid North Coast beachside corridor access to the same premium eco-friendly cleaning.',
      ],
      points: [
        { icon: 'shield', title: 'Premium home specialists', body: 'Police-checked, insured cleaners experienced with luxury homes, oceanfront properties and short-stay rentals.' },
        { icon: 'clock', title: 'Same-day holiday-let turnovers', body: 'Fast, thorough turnovers between guests for Lighthouse Beach holiday homes — coordinated with your check-in times.' },
        { icon: 'sparkle', title: 'Premium eco-friendly products', body: 'Plant-based, non-toxic formulas that deliver a luxury-level clean while protecting the coastal environment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we are proud to service Port Macquarie\'s most prestigious beachside suburb with the professional standard that Lighthouse Beach deserves.',
      'We support NDIS participants, aged care clients and holiday homeowners at Lighthouse Beach with eco-friendly, caring and thorough in-home cleaning.',
      'Our satisfaction guarantee covers every clean — your Lighthouse Beach property will always meet the standard your guests and family expect.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'premium clean',
      h2Post: 'at Lighthouse Beach?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — your Lighthouse Beach clean is just 60 seconds away.',
      trust: 'Trusted by Lighthouse Beach homeowners, holiday-let managers and Port Macquarie residents.',
    },
    seo: {
      title: 'House Cleaning Lighthouse Beach | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Lighthouse Beach Port Macquarie NSW. Police-checked, insured. Regular, deep clean & holiday-let turnovers.',
    },
    nearbySuburbs: ['Port Macquarie', 'Settlement Point', 'Lake Cathie', 'Bonny Hills', 'King Creek', 'Sancrox'],
  },

  {
    slug: 'cleaners-byron-bay',
    name: 'Byron Bay',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Northern Rivers',
    heroImage: '/images/suburbs/cleaners-byron-bay.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Byron Bay NSW',
    ogImage: '/images/suburbs/cleaners-byron-bay.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Byron Bay'],
      tagline: 'Trusted, Trained and Thorough — across the Northern Rivers',
    },
    intro: {
      kicker: 'House cleaning in Byron Bay',
      h2: 'Best house cleaning in Byron Bay & the Northern Rivers',
      paragraphs: [
        'Byron Bay homes blend beach lifestyle with high-end finishes \u2014 polished concrete floors, recycled timber, salt-exposed glass and outdoor living spaces that take a beating from sand and sun. NATURO GROUP\u2019s Byron cleaners use plant-based, non-toxic products that match the values of the community and protect the natural materials in your home.',
        'From Wategos and Suffolk Park to Belongil, Tallow Beach and Ewingsdale, our trained, police-checked team services owner-occupied homes, holiday lets, surf retreats and short-stay properties across the Byron Shire \u2014 with the consistency that demanding turnovers and Airbnb reviews require.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Byron Bay & the Northern Rivers',
      paragraphs: [
        'Byron Bay is a creative, surf-soaked community of around 9,000 residents at the easternmost point of the Australian mainland \u2014 famous for Cape Byron Lighthouse, Main Beach and a year-round visitor economy. Locals expect cleaners who care about sustainability, animal welfare and the impact products have on the ocean.',
        'Our Byron team also services Suffolk Park, Lennox Head, Bangalow, Brunswick Heads and Mullumbimby \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Byron cleaners who get it', body: 'Trained, police-checked and respectful of the lifestyle \u2014 whether it\u2019s a Wategos retreat or a Belongil family home.' },
        { icon: 'clock', title: 'Holiday-let turnovers, done right', body: 'Same-day Airbnb and short-stay turnovers, weekly or fortnightly maintenance cleans \u2014 reschedule online in seconds.' },
        { icon: 'sparkle', title: 'Reef-safe, ocean-friendly products', body: 'Plant-based, non-toxic cleaning products that are kind to the ocean, your pets and your sensitive-skin guests.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Byron Bay homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Northern Rivers with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Byron client \u2014 whether a homeowner or a holiday-let host \u2014 feels valued. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Byron Bay?',
      sub: 'Plant-based products, police-checked local cleaners and same-day holiday-let turnovers \u2014 book your first Byron clean in under 60 seconds.',
      trust: 'Trusted by Byron Bay locals, holiday-let hosts and retreat owners.',
    },
    seo: {
      title: 'House Cleaning Byron Bay | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Byron Bay & the Northern Rivers. Holiday-let turnovers, regular cleans, police-checked and fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Suffolk Park', 'Lennox Head', 'Ballina', 'Mullumbimby', 'Bangalow', 'Brunswick Heads', 'Ocean Shores', 'Tyagarah', 'Newrybar', 'Federal', 'Possum Creek', 'Eureka', 'Coopers Shoot', 'Skennars Head', 'Wategos', 'Tallow Beach', 'Myocum', 'Ewingsdale'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Byron Bay?',
        a: 'House cleaning in Byron Bay starts from $153 for a regular clean and $371 for a deep clean. Short-stay and Airbnb turnovers are quoted based on property size and turnover requirements. Get a transparent instant price online in under 60 seconds — no phone call needed.',
      },
      {
        q: 'Do you do Airbnb and holiday rental turnovers in Byron Bay?',
        a: 'Yes — holiday-let and short-stay turnovers are one of our most requested services in Byron Bay. We service properties in Wategos, Suffolk Park, Belongil, Tallow Beach, Ewingsdale and across the Byron Shire. We coordinate check-out and check-in times, can handle linen and provide condition reports to owners and property managers.',
      },
      {
        q: 'Do you use eco-friendly products in Byron Bay homes?',
        a: 'Always. We use plant-based, biodegradable, non-toxic products on every Byron Bay clean — kind to the ocean, reef-safe and safe for kids, pets and allergy sufferers. We never use harsh chemicals that wash into the Byron Bay catchment or affect sensitive indoor environments.',
      },
      {
        q: 'Which areas around Byron Bay do you service?',
        a: 'We service all of Byron Bay and the surrounding Northern Rivers region including Suffolk Park, Wategos, Belongil, Lennox Head, Bangalow, Brunswick Heads, Mullumbimby, Ballina, Ocean Shores and Ewingsdale. Call 1300 876 472 if you are unsure whether we cover your area.',
      },
      {
        q: 'Are your Byron Bay cleaners police-checked and insured?',
        a: 'Yes — every NATURO GROUP cleaner in Byron Bay is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We supply all eco-friendly products and equipment. You do not need to leave anything out for us.',
      },
    ],
  },

  {
    slug: 'cleaners-central-coast',
    name: 'Central Coast',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Central Coast',
    heroImage: '/images/suburbs/cleaners-central-coast.jpg',
    heroImageAlt: 'NATURO Group eco-friendly cleaning across the Central Coast NSW',
    ogImage: '/images/suburbs/cleaners-central-coast.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning on the', 'Central Coast'],
      tagline: 'Trusted, Trained and Thorough — across the Central Coast',
    },
    intro: {
      kicker: 'House cleaning on the Central Coast',
      h2: 'Best house cleaning across the Central Coast',
      paragraphs: [
        'The Central Coast is a region of beaches, lakes and family suburbs an hour north of Sydney. Homes here range from waterfront houses around Brisbane Water to weatherboard cottages in older Gosford streets and modern builds in growth corridors like Warnervale and Hamlyn Terrace. NATURO GROUP\u2019s Central Coast team uses eco-friendly products that are safe for the lake catchments and gentle on coastal finishes.',
        'From Gosford and Terrigal to Avoca Beach, Woy Woy, The Entrance and Tuggerah, our trained, police-checked cleaners service family homes, holiday rentals and retirement villages \u2014 with the reliability busy commuter households need.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across the Central Coast',
      paragraphs: [
        'The Central Coast is home to around 350,000 people across a network of beachside towns, lakeside suburbs and bush-fringed valleys. It\u2019s a region built around family life and weekend recreation \u2014 and we work around school runs, commutes and the busy summer holiday season.',
        'Our team also services Wyong, Bateau Bay, Erina, Kincumber, Ettalong and Umina Beach \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Central Coast cleaners', body: 'A trained, police-checked team that knows the Coast \u2014 from Brisbane Water peninsulas to Tuggerah Lakes communities.' },
        { icon: 'clock', title: 'Bookings that suit commuter life', body: 'Weekly, fortnightly or one-off cleans scheduled around the train timetable, school pickup and weekend plans.' },
        { icon: 'sparkle', title: 'Lake- and ocean-friendly products', body: 'Non-toxic, biodegradable products that are kind to Tuggerah Lakes, the Hawkesbury and the kids and pets at home.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Central Coast homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Central Coast with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Central Coast client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'on the Central Coast?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Central Coast clean in under 60 seconds.',
      trust: 'Trusted by Central Coast families, commuters and retirees.',
    },
    seo: {
      title: 'House Cleaning Central Coast | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning across the Central Coast \u2014 Gosford, Terrigal, Avoca, Woy Woy & The Entrance. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Gosford', 'Terrigal', 'Avoca Beach', 'Erina', 'Wyong', 'Tuggerah', 'The Entrance', 'Long Jetty', 'Woy Woy', 'Ettalong Beach', 'Umina Beach', 'Killarney Vale', 'Bateau Bay', 'Forresters Beach', 'Kincumber', 'Saratoga', 'Davistown', 'Berkeley Vale', 'Lake Munmorah', 'Toukley'],
  },

  {
    slug: 'cleaners-lismore',
    name: 'Lismore',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Northern Rivers',
    heroImage: '/images/suburbs/cleaners-lismore.png',
    heroImageAlt: 'NATURO Group eco-friendly cleaning in Lismore NSW',
    ogImage: '/images/suburbs/cleaners-lismore.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Lismore'],
      tagline: 'Trusted, Trained and Thorough — across the Northern Rivers',
    },
    intro: {
      kicker: 'House cleaning in Lismore',
      h2: 'Best house cleaning in Lismore & the Northern Rivers',
      paragraphs: [
        'Lismore is a green, river-fed regional city with a strong arts and university community \u2014 and a recent flood history that has changed the way locals think about homes, materials and recovery. NATURO GROUP\u2019s Lismore cleaners use plant-based products that are gentle on freshly renovated joinery, polished concrete and replaced subfloors.',
        'From the CBD heritage streetscape to Goonellabah, North Lismore and East Lismore, our trained, police-checked team services owner-occupied homes, student rentals and aged-care residences \u2014 with the empathy this community deserves.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Lismore & the Northern Rivers',
      paragraphs: [
        'Lismore is a regional centre of around 28,000 residents on the Wilsons River, anchored by Southern Cross University, the regional gallery and a tight-knit community that has rallied through serious flood events. We work alongside locals as they rebuild and re-establish homes they love.',
        'Our team also services Goonellabah, Nimbin, Bangalow, Alstonville and Casino \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Lismore cleaners', body: 'A trained, police-checked team that lives and works in the Northern Rivers and understands the community.' },
        { icon: 'clock', title: 'Flexible bookings, post-flood friendly', body: 'One-off, weekly or fortnightly cleans \u2014 with extra hours available for rebuild handovers and insurance work.' },
        { icon: 'sparkle', title: 'Gentle on new builds and renos', body: 'Non-toxic, low-residue products that protect freshly renovated joinery, concrete floors and timber finishes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Lismore homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Northern Rivers with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Lismore client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Lismore?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Lismore clean in under 60 seconds.',
      trust: 'Trusted by Lismore families, students and rebuilding households.',
    },
    seo: {
      title: 'House Cleaning Lismore | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Lismore & the Northern Rivers. Insurance, post-flood and regular cleans. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Goonellabah', 'Wollongbar', 'Alstonville', 'Casino', 'Nimbin', 'Clunes', 'Dunoon', 'Bexhill', 'Modanville', 'Ruthven', 'Caniaba', 'Tregeagle', 'Wyrallah', 'North Lismore', 'East Lismore', 'South Lismore', 'Girards Hill', 'Loftville', 'Eltham'],
  },

  {
    slug: 'cleaners-newcastle',
    name: 'Newcastle',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Hunter Region',
    heroImage: '/images/suburbs/cleaners-newcastle.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Newcastle NSW',
    ogImage: '/images/suburbs/cleaners-newcastle.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Newcastle'],
      tagline: 'Trusted, Trained and Thorough — across the Hunter Region',
    },
    intro: {
      kicker: 'House cleaning in Newcastle',
      h2: 'Best house cleaning in Newcastle & the Hunter',
      paragraphs: [
        'Newcastle homes range from heritage terraces in Cooks Hill and The Hill to modern apartments along the harbour and family houses out through Adamstown, Charlestown and New Lambton. NATURO GROUP\u2019s Newcastle cleaners use eco-friendly products that are kind to coastal finishes, period detail and the people who live with them.',
        'From Newcastle East and Merewether to Hamilton, Mayfield and the Junction, our trained, police-checked team services apartments, family homes and rental turnovers \u2014 with the consistency a working harbour city expects.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Newcastle & the Hunter',
      paragraphs: [
        'Newcastle is NSW\u2019s second-largest city \u2014 a working harbour, a string of surf beaches and a rapidly modernising CBD with around 170,000 residents in the LGA and 500,000 across Greater Newcastle. We service the full mix of inner-city apartments, suburban family homes and Hunter Valley villages.',
        'Our team also services Lake Macquarie, Maitland, Cessnock, Charlestown, Warners Bay and Belmont \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Newcastle cleaners', body: 'A trained, police-checked team that knows the city \u2014 from harbourside apartments to Merewether family homes.' },
        { icon: 'clock', title: 'Flexible bookings for shift workers', body: 'Weekly, fortnightly or one-off cleans scheduled around hospital, port and FIFO shift patterns.' },
        { icon: 'sparkle', title: 'Eco-friendly, salt-air friendly', body: 'Non-toxic products that are gentle on heritage timber, coastal glass and the people who live in them.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Newcastle homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Hunter Region with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Newcastle client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Newcastle?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Newcastle clean in under 60 seconds.',
      trust: 'Trusted by Newcastle families, shift workers and apartment dwellers.',
    },
    seo: {
      title: 'House Cleaning Newcastle | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Newcastle & the Hunter \u2014 Merewether, Hamilton, Mayfield, Charlestown. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Hamilton', 'Merewether', 'The Junction', 'Cooks Hill', 'New Lambton', 'Adamstown', 'Bar Beach', 'Stockton', 'Mayfield', 'Wickham', 'Islington', 'Hamilton East', 'Tighes Hill', 'Carrington', 'Waratah', 'Lambton', 'Charlestown', 'Kahibah', 'Newcastle East', 'Newcastle West'],
  },

  {
    slug: 'house-cleaning-sutherland',
    name: 'Sutherland',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Sutherland Shire',
    heroImage: '/images/suburbs/house-cleaning-sutherland.png',
    heroImageAlt: 'NATURO Group eco-friendly house cleaning across the Sutherland Shire NSW',
    ogImage: '/images/suburbs/house-cleaning-sutherland.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Sutherland Shire'],
      tagline: 'Trusted, Trained and Thorough — across the Shire',
    },
    intro: {
      kicker: 'House cleaning in Sutherland',
      h2: 'Best house cleaning in Sutherland & the Shire',
      paragraphs: [
        'Sutherland Shire wraps from Cronulla\u2019s surf beaches across the Georges River to the Royal National Park \u2014 a region of family suburbs, weatherboard cottages, modern townhouses and harbour-edge homes. NATURO GROUP\u2019s Shire cleaners use eco-friendly products that are safe for the kids, the dog and the koi pond.',
        'From Sutherland and Miranda to Cronulla, Caringbah, Engadine and Gymea, our trained, police-checked team services family homes, units and downsizers \u2014 with the consistency local Shire households expect.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Sutherland Shire',
      paragraphs: [
        'The Sutherland Shire is home to around 230,000 residents across 30+ suburbs, bordered by the Pacific to the east and the Royal National Park to the south. It\u2019s one of Sydney\u2019s tightest-knit communities \u2014 and we work with families, downsizers, NDIS participants and DVA recipients across the area.',
        'Our team also services Cronulla, Caringbah, Miranda, Engadine, Gymea, Kirrawee and Menai \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Shire cleaners', body: 'Trained, police-checked locals who know the Shire \u2014 from Cronulla beach apartments to Engadine family homes.' },
        { icon: 'clock', title: 'Bookings that fit Shire life', body: 'Weekly, fortnightly or one-off cleans scheduled around school runs, sport and weekend trips to the Royal.' },
        { icon: 'sparkle', title: 'Eco-friendly, kid- and pet-safe', body: 'Non-toxic products that are gentle on hardwood floors, asthma-prone kids and the family labrador.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Sutherland Shire homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Shire with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Shire client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in the Shire?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Sutherland clean in under 60 seconds.',
      trust: 'Trusted by Sutherland Shire families, downsizers and NDIS households.',
    },
    seo: {
      title: 'House Cleaning Sutherland Shire | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning across Sutherland Shire \u2014 Cronulla, Miranda, Caringbah, Engadine. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Cronulla', 'Caringbah', 'Miranda', 'Gymea', 'Engadine', 'Heathcote', 'Sylvania', 'Kirrawee', 'Jannali', 'Como', 'Oyster Bay', 'Bonnet Bay', 'Sylvania Waters', 'Yowie Bay', 'Grays Point', 'Loftus', 'Woronora', 'Menai', 'Illawong', 'Bangor'],
  },

  {
    slug: 'cleaners-sydney',
    name: 'Sydney',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Greater Sydney',
    heroImage: '/images/suburbs/cleaners-sydney.jpg',
    heroImageAlt: 'Eco-friendly house cleaning across Sydney NSW',
    ogImage: '/images/suburbs/cleaners-sydney.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Sydney'],
      tagline: 'Trusted, Trained and Thorough — across Greater Sydney',
    },
    intro: {
      kicker: 'House cleaning in Sydney',
      h2: 'Best house cleaning across Sydney',
      paragraphs: [
        'Sydney homes span everything from inner-city apartments in Surry Hills and Pyrmont to harbourside terraces in Balmain and family houses across the Hills, the Inner West and the Eastern Suburbs. NATURO GROUP\u2019s Sydney cleaners use eco-friendly products that suit dense apartment living and protect period finishes alike.',
        'From the CBD and North Sydney to Parramatta, Bondi, the Inner West and the Northern Beaches, our trained, police-checked team services apartments, family homes and end-of-lease handovers \u2014 with the reliability a city this size demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Greater Sydney',
      paragraphs: [
        'Sydney is Australia\u2019s largest city, home to more than 5 million people across 658 suburbs \u2014 from the harbour foreshore to the foothills of the Blue Mountains. We work across the metropolitan area with the same standards every customer should expect: police-checked cleaners, eco-friendly products and a satisfaction guarantee.',
        'Our team services the CBD, Eastern Suburbs, Inner West, Northern Beaches, North Shore, Hills District, Western Sydney and the Sutherland Shire \u2014 every clean booked online in under 60 seconds.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked Sydney cleaners', body: 'Every cleaner vetted, trained and insured \u2014 so you can welcome them into a CBD apartment or a family home with confidence.' },
        { icon: 'clock', title: 'Bookings that fit Sydney life', body: 'Weekly, fortnightly or one-off cleans scheduled around the office, school run and weekend plans.' },
        { icon: 'sparkle', title: 'Apartment- and harbour-friendly', body: 'Low-fume, plant-based products that won\u2019t set off the smoke alarm in a closed apartment or harm the harbour catchment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Sydney homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting Sydney\u2019s NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients with tailored services that prioritise comfort and independence \u2014 in every postcode from Bondi to Penrith.',
      'Our commitment to quality, reliability and personalised care ensures every Sydney client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Sydney?',
      sub: 'Eco-friendly products, police-checked Sydney cleaners and flexible scheduling \u2014 book your first clean in under 60 seconds.',
      trust: 'Trusted by Sydney families, apartment dwellers and end-of-lease tenants.',
    },
    seo: {
      title: 'House Cleaning Sydney | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning across Sydney \u2014 CBD, Eastern Suburbs, Inner West, Northern Beaches and beyond. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Surry Hills', 'Darlinghurst', 'Newtown', 'Chippendale', 'Pyrmont', 'Ultimo', 'Glebe', 'Redfern', 'Alexandria', 'Waterloo', 'Zetland', 'Potts Point', 'Elizabeth Bay', 'Rushcutters Bay', 'Paddington', 'Woollahra', 'Edgecliff', 'Millers Point', 'The Rocks', 'Barangaroo'],
  },

  {
    slug: 'house-cleaning-tweed-heads',
    name: 'Tweed Heads',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Tweed Coast',
    heroImage: '/images/suburbs/house-cleaning-tweed-heads.png',
    heroImageAlt: 'NATURO Group eco-friendly house cleaning in Tweed Heads NSW',
    ogImage: '/images/suburbs/house-cleaning-tweed-heads.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Tweed Heads'],
      tagline: 'Trusted, Trained and Thorough — across the Tweed Coast',
    },
    intro: {
      kicker: 'House cleaning in Tweed Heads',
      h2: 'Best house cleaning in Tweed Heads & the Tweed Coast',
      paragraphs: [
        'Tweed Heads sits right on the NSW\u2013QLD border, where the Tweed River meets the Pacific. Homes here mix high-rise apartments along the river, beachside houses through Kingscliff and Cabarita, and rural-residential blocks in the green Tweed hinterland. NATURO GROUP\u2019s Tweed cleaners use eco-friendly products that are kind to the river, the ocean and the people who live by them.',
        'From Tweed Heads and Banora Point to Kingscliff, Pottsville, Cabarita and Murwillumbah, our trained, police-checked team services holiday rentals, retiree apartments and family homes \u2014 with the consistency cross-border living demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Tweed Heads & the Tweed',
      paragraphs: [
        'Tweed Heads anchors the Tweed Shire \u2014 a fast-growing coastal community of around 100,000 residents that flows seamlessly into Coolangatta and the southern Gold Coast. Locals enjoy the lifestyle of two states without the cost of one, and we work to the same standards either side of the border.',
        'Our team also services Kingscliff, Cabarita, Pottsville, Banora Point, Casuarina and Murwillumbah \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Tweed cleaners', body: 'A trained, police-checked team that knows both sides of the border \u2014 from Tweed apartments to Kingscliff family homes.' },
        { icon: 'clock', title: 'Flexible holiday-let scheduling', body: 'Same-day Airbnb turnovers, weekly maintenance cleans and one-off deep cleans for the busy summer season.' },
        { icon: 'sparkle', title: 'River- and reef-friendly products', body: 'Non-toxic, biodegradable products that protect the Tweed catchment and the wildlife that depends on it.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Tweed Heads homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Tweed and Northern Rivers with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Tweed client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Tweed Heads?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Tweed clean in under 60 seconds.',
      trust: 'Trusted by Tweed Heads locals, retirees and holiday-let owners.',
    },
    seo: {
      title: 'House Cleaning Tweed Heads | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Tweed Heads, Kingscliff, Cabarita & the Tweed Coast. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Banora Point', 'Tweed Heads South', 'Tweed Heads West', 'Bilambil', 'Terranora', 'Cobaki Lakes', 'Kingscliff', 'Casuarina', 'Pottsville', 'Cabarita Beach', 'Hastings Point', 'Bogangar', 'Murwillumbah', 'Chinderah', 'Fingal Head', 'Bilambil Heights', 'Piggabeen'],
  },

  {
    slug: 'house-cleaning-parramatta',
    name: 'Parramatta',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Western Sydney',
    heroImage: '/images/suburbs/house-cleaning-parramatta.png',
    heroImageAlt: 'NATURO Group eco-friendly house cleaning in Parramatta NSW',
    ogImage: '/images/suburbs/house-cleaning-parramatta.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Parramatta'],
      tagline: 'Trusted, Trained and Thorough — across Western Sydney',
    },
    intro: {
      kicker: 'House cleaning in Parramatta',
      h2: 'Best house cleaning in Parramatta & Western Sydney',
      paragraphs: [
        'Parramatta is Sydney\u2019s second CBD \u2014 a fast-growing river city of high-rise apartments, restored Victorian terraces and family suburbs out through North Parramatta, Westmead and Harris Park. NATURO GROUP\u2019s Parramatta cleaners use eco-friendly products that suit small apartments, modern townhouses and heritage homes alike.',
        'From the Parramatta CBD and Westmead to Harris Park, Granville, Rosehill and North Parramatta, our trained, police-checked team services apartments, family homes and end-of-lease handovers \u2014 with the consistency a working professional city expects.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Parramatta & Western Sydney',
      paragraphs: [
        'Parramatta is the geographic heart of Greater Sydney \u2014 a city of around 250,000 residents in the LGA, and a major hub for healthcare, finance and government. Apartments are popping up faster than anywhere in NSW, and the household mix spans students, professionals, multigenerational families and downsizers.',
        'Our team also services Westmead, Harris Park, Rosehill, Granville, North Parramatta, Carlingford and Epping \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Parramatta cleaners', body: 'A trained, police-checked team that\u2019s comfortable in CBD towers, Westmead apartments and Harris Park terraces.' },
        { icon: 'clock', title: 'Bookings that fit professional life', body: 'Weekly, fortnightly or one-off cleans scheduled around hospital shifts, office hours and family schedules.' },
        { icon: 'sparkle', title: 'Apartment-friendly, low-fume', body: 'Plant-based products that won\u2019t trip a closed-apartment smoke alarm or irritate sensitive lungs.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Parramatta homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across Western Sydney with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Parramatta client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Parramatta?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Parramatta clean in under 60 seconds.',
      trust: 'Trusted by Parramatta families, professionals and apartment dwellers.',
    },
    seo: {
      title: 'House Cleaning Parramatta | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Parramatta & Western Sydney \u2014 CBD apartments, Westmead, Harris Park, North Parramatta. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Harris Park', 'Westmead', 'North Parramatta', 'Northmead', 'Wentworthville', 'Granville', 'Merrylands', 'Rosehill', 'Camellia', 'Carlingford', 'Telopea', 'Rydalmere', 'Dundas', 'Ermington', 'Oatlands', 'Old Toongabbie', 'South Granville', 'Holroyd'],
  },

  {
    slug: 'cleaners-wollongong',
    name: 'Wollongong',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Illawarra',
    heroImage: '/images/suburbs/cleaners-wollongong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Wollongong NSW',
    ogImage: '/images/suburbs/cleaners-wollongong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Wollongong'],
      tagline: 'Trusted, Trained and Thorough — across the Illawarra',
    },
    intro: {
      kicker: 'House cleaning in Wollongong',
      h2: 'Best house cleaning in Wollongong & the Illawarra',
      paragraphs: [
        'Wollongong sits between the Illawarra escarpment and the Pacific, a coastal city of beach suburbs, university student housing and family neighbourhoods stretching from Helensburgh to Shellharbour. NATURO GROUP\u2019s Wollongong cleaners use eco-friendly products that are gentle on coastal finishes and safe for the catchment.',
        'From North Wollongong and Wollongong CBD to Thirroul, Bulli, Corrimal, Figtree and Mount Keira, our trained, police-checked team services family homes, student rentals and apartments \u2014 with the reliability locals expect.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Wollongong & the Illawarra',
      paragraphs: [
        'Wollongong is a coastal city of around 220,000 residents \u2014 NSW\u2019s third-largest urban area, anchored by the University of Wollongong, the steelworks and a 17-beach coastline. Locals balance city life with weekend escapes to the escarpment, the Sea Cliff Bridge and Royal National Park.',
        'Our team also services Thirroul, Bulli, Corrimal, Figtree, Unanderra, Shellharbour and Kiama \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Illawarra cleaners', body: 'A trained, police-checked team that knows the Gong \u2014 from Thirroul beach houses to Figtree family homes.' },
        { icon: 'clock', title: 'Flexible bookings for busy locals', body: 'Weekly, fortnightly or one-off cleans scheduled around UOW timetables, shift work and school runs.' },
        { icon: 'sparkle', title: 'Catchment- and ocean-friendly', body: 'Non-toxic, biodegradable products that protect the Illawarra catchment and the surf you swim in.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Wollongong homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Illawarra with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Wollongong client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Wollongong?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Wollongong clean in under 60 seconds.',
      trust: 'Trusted by Wollongong families, students and shift workers.',
    },
    seo: {
      title: 'House Cleaning Wollongong | Eco-Friendly Cleaners NSW',
      description: 'Eco-friendly house cleaning in Wollongong & the Illawarra \u2014 Thirroul, Bulli, Corrimal, Shellharbour. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Fairy Meadow', 'North Wollongong', 'Coniston', 'Mangerton', 'Mount Pleasant', 'Mount Ousley', 'Keiraville', 'Gwynneville', 'Figtree', 'West Wollongong', 'Mount Saint Thomas', 'Cordeaux Heights', 'Unanderra', 'Berkeley', 'Corrimal', 'Bellambi', 'Thirroul', 'Bulli', 'Woonona', 'Austinmer'],
  },

  {
    slug: 'house-cleaning-in-northern-beaches',
    name: 'Northern Beaches',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Sydney\u2019s Northern Beaches',
    heroImage: '/images/suburbs/house-cleaning-in-northern-beaches.png',
    heroImageAlt: 'NATURO Group eco-friendly cleaning across the Northern Beaches Sydney',
    ogImage: '/images/suburbs/house-cleaning-in-northern-beaches.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning on the', 'Northern Beaches'],
      tagline: 'Trusted, Trained and Thorough — from Manly to Palm Beach',
    },
    intro: {
      kicker: 'House cleaning on the Northern Beaches',
      h2: 'Best house cleaning across the Northern Beaches',
      paragraphs: [
        'Sydney\u2019s Northern Beaches stretch 30km from Manly to Palm Beach \u2014 a peninsula of surf beaches, leafy headlands and homes that range from beachfront houses on Avalon to Federation cottages in Newport. NATURO GROUP\u2019s Northern Beaches cleaners use eco-friendly products that protect the Pittwater catchment and the lifestyle you live by it.',
        'From Manly and Dee Why to Collaroy, Mona Vale, Avalon, Newport and Palm Beach, our trained, police-checked team services family homes, holiday lets and harbourside houses \u2014 with the consistency this stretch of coast expects.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Sydney\u2019s Northern Beaches',
      paragraphs: [
        'The Northern Beaches LGA is home to around 270,000 residents across 30+ suburbs, bordered by the Pacific to the east and Pittwater to the west. It\u2019s one of Sydney\u2019s most loved places to live \u2014 and we work with families, downsizers, holiday-let owners and weekenders the length of the peninsula.',
        'Our team services Manly, Freshwater, Dee Why, Collaroy, Narrabeen, Mona Vale, Newport, Avalon, Whale Beach and Palm Beach \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Northern Beaches cleaners', body: 'A trained, police-checked team based on the peninsula \u2014 they know the surf, the streets and the parking.' },
        { icon: 'clock', title: 'Bookings that suit beach life', body: 'Weekly, fortnightly or one-off cleans scheduled around the school run, ferry timetable and weekend visitors.' },
        { icon: 'sparkle', title: 'Pittwater- and ocean-friendly', body: 'Plant-based products that protect the catchment and the beaches you swim, surf and paddleboard at.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Northern Beaches homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Northern Beaches with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Northern Beaches client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'on the Northern Beaches?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Northern Beaches clean in under 60 seconds.',
      trust: 'Trusted by Northern Beaches families, holiday-let hosts and weekenders.',
    },
    seo: {
      title: 'House Cleaning Northern Beaches | Eco-Friendly Cleaners Sydney',
      description: 'Eco-friendly house cleaning across the Northern Beaches \u2014 Manly to Palm Beach. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Manly', 'Dee Why', 'Brookvale', 'Collaroy', 'Narrabeen', 'Mona Vale', 'Avalon Beach', 'Newport', 'Palm Beach', 'Whale Beach', 'Freshwater', 'Curl Curl', 'Queenscliff', 'Balgowlah', 'Seaforth', 'Forestville', 'Frenchs Forest', 'Beacon Hill', 'Cromer', 'Warriewood', 'Bayview', 'Church Point'],
  },

  {
    slug: 'house-cleaning-in-eastern-beaches',
    name: 'Eastern Beaches',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Sydney\u2019s Eastern Beaches',
    heroImage: '/images/suburbs/house-cleaning-in-eastern-beaches.png',
    heroImageAlt: 'NATURO Group eco-friendly cleaning across the Eastern Beaches Sydney',
    ogImage: '/images/suburbs/house-cleaning-in-eastern-beaches.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning on the', 'Eastern Beaches'],
      tagline: 'Trusted, Trained and Thorough — Bondi to Maroubra',
    },
    intro: {
      kicker: 'House cleaning on the Eastern Beaches',
      h2: 'Best house cleaning across Sydney\u2019s Eastern Beaches',
      paragraphs: [
        'Sydney\u2019s Eastern Beaches run from Bondi south through Bronte, Tamarama and Coogee to Maroubra \u2014 a string of headlands, ocean pools and dense apartment blocks within walking distance of the surf. NATURO GROUP\u2019s Eastern Beaches cleaners use eco-friendly products that suit small-footprint apartments and the saltwater finishes that come with them.',
        'From Bondi and Bronte to Tamarama, Clovelly, Coogee and Maroubra, our trained, police-checked team services apartments, terrace houses and end-of-lease handovers \u2014 with the consistency a transient, beach-loving community expects.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Sydney\u2019s Eastern Beaches',
      paragraphs: [
        'The Eastern Beaches strip is a postcode-rich pocket of around 80,000 residents in the Waverley and Randwick LGAs \u2014 home to one of the most photographed coastal walks on earth. The mix of long-term locals, professionals and short-stay tenants means homes turn over often and standards stay high.',
        'Our team also services Bondi Junction, Waverley, Queens Park, Kensington, Kingsford and Randwick \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Eastern Beaches cleaners', body: 'A trained, police-checked team that knows the strip \u2014 from Bondi apartments to Coogee terraces.' },
        { icon: 'clock', title: 'Bookings that suit beach apartment life', body: 'Weekly, fortnightly or one-off cleans scheduled around bus timetables, surf checks and weekend brunches.' },
        { icon: 'sparkle', title: 'Apartment- and ocean-friendly', body: 'Low-fume, plant-based products that won\u2019t set off a closed-apartment smoke alarm or harm the surf you swim in.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Eastern Beaches homes and apartments, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across Sydney\u2019s Eastern Beaches with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Eastern Beaches client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'on the Eastern Beaches?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Eastern Beaches clean in under 60 seconds.',
      trust: 'Trusted by Eastern Beaches locals, professionals and end-of-lease tenants.',
    },
    seo: {
      title: 'House Cleaning Eastern Beaches | Eco-Friendly Cleaners Sydney',
      description: 'Eco-friendly house cleaning across Sydney\u2019s Eastern Beaches \u2014 Bondi, Bronte, Coogee, Maroubra. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Bondi', 'Bondi Beach', 'Bronte', 'Coogee', 'Tamarama', 'Clovelly', 'Maroubra', 'Randwick', 'Waverley', 'Bondi Junction', 'Queens Park', 'Kensington', 'Kingsford', 'North Bondi', 'Dover Heights', 'Vaucluse', 'Rose Bay', 'Little Bay', 'Malabar'],
  },

  {
    slug: 'cleaners-bondi',
    name: 'Bondi',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Sydney\u2019s Eastern Beaches',
    heroImage: '/images/suburbs/cleaners-bondi.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Bondi NSW',
    ogImage: '/images/suburbs/cleaners-bondi.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Bondi'],
      tagline: 'Trusted, Trained and Thorough — at Australia\u2019s most famous beach',
    },
    intro: {
      kicker: 'House cleaning in Bondi',
      h2: 'Best house cleaning in Bondi & the Eastern Suburbs',
      paragraphs: [
        'Bondi is dense, salty and stylish \u2014 a postcode of art-deco apartments, beachfront houses and renovated terraces between Bondi Junction and the Icebergs. NATURO GROUP\u2019s Bondi cleaners use eco-friendly products that suit small apartments, sensitive guests and the iconic stretch of ocean at the end of the street.',
        'From Bondi Beach and North Bondi to Tamarama, Bronte, Bondi Junction and Bellevue Hill, our trained, police-checked team services apartments, terrace houses, holiday lets and end-of-lease properties \u2014 with the speed and consistency this market expects.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Bondi & the Eastern Suburbs',
      paragraphs: [
        'Bondi is home to around 11,000 residents in a few square kilometres \u2014 a creative, fitness-loving community where homes are smaller, turnovers are faster and standards are exceptionally high. From Icebergs to the Bondi-to-Coogee Coastal Walk, locals expect cleaners who care about the ocean as much as they do.',
        'Our team also services North Bondi, Tamarama, Bronte, Bondi Junction, Bellevue Hill and Rose Bay \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Bondi cleaners', body: 'A trained, police-checked team that knows the postcode \u2014 from beachfront apartments to terrace houses behind Campbell Parade.' },
        { icon: 'clock', title: 'Same-day Airbnb turnovers', body: 'Holiday-let turnovers, weekly maintenance cleans and one-off deep cleans \u2014 booked online in seconds.' },
        { icon: 'sparkle', title: 'Reef- and apartment-friendly', body: 'Plant-based, low-fume products that protect the ocean and won\u2019t bother sensitive-skinned guests.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Bondi homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Eastern Suburbs with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Bondi client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Bondi?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Bondi clean in under 60 seconds.',
      trust: 'Trusted by Bondi locals, holiday-let hosts and end-of-lease tenants.',
    },
    seo: {
      title: 'House Cleaning Bondi | Eco-Friendly Cleaners Sydney',
      description: 'Eco-friendly house cleaning in Bondi & the Eastern Suburbs. Holiday-let turnovers, regular cleans, end-of-lease. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Bondi Beach', 'North Bondi', 'Bondi Junction', 'Tamarama', 'Bronte', 'Waverley', 'Queens Park', 'Dover Heights', 'Vaucluse', 'Rose Bay', 'Watsons Bay', 'Double Bay', 'Bellevue Hill', 'Woollahra', 'Paddington', 'Centennial Park', 'Clovelly', 'Coogee'],
  },

  {
    slug: 'cleaners-manly',
    name: 'Manly',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Sydney\u2019s Northern Beaches',
    heroImage: '/images/suburbs/cleaners-manly.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Manly NSW',
    ogImage: '/images/suburbs/cleaners-manly.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Manly'],
      tagline: 'Trusted, Trained and Thorough — at the gateway to the Northern Beaches',
    },
    intro: {
      kicker: 'House cleaning in Manly',
      h2: 'Best house cleaning in Manly & the Northern Beaches',
      paragraphs: [
        'Manly is the gateway to Sydney\u2019s Northern Beaches \u2014 a peninsula of beachfront apartments, Federation cottages and renovated terraces a ferry ride from the CBD. NATURO GROUP\u2019s Manly cleaners use eco-friendly products that suit beachside living and the small-footprint apartments that come with it.',
        'From Manly Beach and Shelly Beach to Fairlight, Balgowlah, Seaforth and Freshwater, our trained, police-checked team services apartments, family homes, holiday lets and end-of-lease properties \u2014 with the reliability ferry-commuter life demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Manly & the Northern Beaches',
      paragraphs: [
        'Manly is home to around 16,000 residents on a sliver of land between Manly Cove and the Pacific. It\u2019s a community of long-term locals, ferry commuters, holiday-let hosts and active families who care about the harbour they live on.',
        'Our team also services Fairlight, Balgowlah, Seaforth, Freshwater, Curl Curl and Queenscliff \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Manly cleaners', body: 'A trained, police-checked team that knows the peninsula \u2014 from Manly Beach apartments to Balgowlah family homes.' },
        { icon: 'clock', title: 'Bookings that suit ferry life', body: 'Weekly, fortnightly or one-off cleans scheduled around the ferry timetable, school run and weekend plans.' },
        { icon: 'sparkle', title: 'Harbour- and ocean-friendly', body: 'Plant-based, low-fume products that protect Sydney Harbour and the surf you swim in.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Manly homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Northern Beaches with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Manly client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Manly?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Manly clean in under 60 seconds.',
      trust: 'Trusted by Manly locals, ferry commuters and holiday-let hosts.',
    },
    seo: {
      title: 'House Cleaning Manly | Eco-Friendly Cleaners Sydney',
      description: 'Eco-friendly house cleaning in Manly, Fairlight, Balgowlah & Freshwater. Holiday-let turnovers, regular cleans. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Fairlight', 'Balgowlah', 'Balgowlah Heights', 'Clontarf', 'Seaforth', 'North Balgowlah', 'Queenscliff', 'Freshwater', 'Curl Curl', 'North Manly', 'Brookvale', 'Allambie Heights', 'Beacon Hill', 'Frenchs Forest', 'Killarney Heights', 'Manly Vale', 'Dee Why'],
  },

  {
    slug: 'cleaners-mosman',
    name: 'Mosman',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Sydney\u2019s Lower North Shore',
    heroImage: '/images/suburbs/cleaners-mosman.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Mosman NSW',
    ogImage: '/images/suburbs/cleaners-mosman.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Mosman'],
      tagline: 'Trusted, Trained and Thorough — across Sydney\u2019s Lower North Shore',
    },
    intro: {
      kicker: 'House cleaning in Mosman',
      h2: 'Best house cleaning in Mosman & the Lower North Shore',
      paragraphs: [
        'Mosman is a leafy harbourside suburb of Federation homes, contemporary architectural builds and high-end apartments overlooking Sydney Harbour and Middle Harbour. NATURO GROUP\u2019s Mosman cleaners use eco-friendly products that protect natural-stone benchtops, marble bathrooms and the harbour catchment they back onto.',
        'From Mosman Junction and Beauty Point to Balmoral, Clifton Gardens and The Spit, our trained, police-checked team services premium homes, harbourfront houses and apartments \u2014 with the discretion and consistency the suburb expects.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Mosman & the Lower North Shore',
      paragraphs: [
        'Mosman is home to around 30,000 residents on the harbourside peninsula between Middle Harbour and Sydney Harbour \u2014 a postcode known for Taronga Zoo, Balmoral Beach, leafy streets and a strong sense of community. We work with long-term residents, downsizers and busy professional families.',
        'Our team also services Cremorne, Neutral Bay, Cammeray, Beauty Point, Clifton Gardens and Balmoral \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Mosman cleaners', body: 'A trained, police-checked team that\u2019s comfortable in heritage homes, premium apartments and harbourfront houses.' },
        { icon: 'clock', title: 'Bookings that fit your week', body: 'Weekly, fortnightly or one-off cleans scheduled around school runs, work travel and weekend visitors.' },
        { icon: 'sparkle', title: 'Stone- and harbour-friendly', body: 'pH-neutral, plant-based products that are safe for marble, natural stone, the labrador and the harbour you back onto.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Mosman homes, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Lower North Shore with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Mosman client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Mosman?',
      sub: 'Eco-friendly products, police-checked local cleaners and discreet, flexible scheduling \u2014 book your first Mosman clean in under 60 seconds.',
      trust: 'Trusted by Mosman families, downsizers and harbourside homeowners.',
    },
    seo: {
      title: 'House Cleaning Mosman | Eco-Friendly Cleaners Sydney',
      description: 'Eco-friendly house cleaning in Mosman, Cremorne, Neutral Bay & Balmoral. Premium harbourside homes, gentle on stone & marble. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Beauty Point', 'Clifton Gardens', 'Balmoral', 'The Spit', 'Cremorne', 'Cremorne Point', 'Neutral Bay', 'Cammeray', 'Northbridge', 'Castlecrag', 'Castle Cove', 'Willoughby', 'Naremburn', 'Wollstonecraft', 'McMahons Point', 'Kirribilli', 'Lavender Bay', 'Crows Nest'],
  },

  {
    slug: 'cleaners-hunters-hill',
    name: 'Hunters Hill',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Sydney\u2019s Lower North Shore',
    heroImage: '/images/suburbs/cleaners-hunters-hill.png',
    heroImageAlt: 'NATURO Group eco-friendly house cleaning in Hunters Hill Sydney',
    ogImage: '/images/suburbs/cleaners-hunters-hill.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Hunters Hill'],
      tagline: 'Trusted, Trained and Thorough — on Sydney\u2019s historic peninsula',
    },
    intro: {
      kicker: 'House cleaning in Hunters Hill',
      h2: 'Best house cleaning in Hunters Hill & the Lower North Shore',
      paragraphs: [
        'Hunters Hill is the oldest garden suburb in Australia \u2014 a leafy peninsula of sandstone heritage homes, restored Victorian villas and contemporary architectural builds wrapped by the Lane Cove and Parramatta Rivers. NATURO GROUP\u2019s Hunters Hill cleaners use eco-friendly products that protect heritage timber, sandstone and the river catchment.',
        'From Hunters Hill village and Woolwich to Henley, Gladesville and Boronia Park, our trained, police-checked team services heritage homes, apartments and family houses \u2014 with the care heritage features demand.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Hunters Hill & the Lower North Shore',
      paragraphs: [
        'Hunters Hill is home to around 14,000 residents on a small harbourside peninsula \u2014 a tightly held postcode known for its 1860s sandstone houses, mature gardens and walkability to the ferry. Locals care about heritage, sustainability and a discreet professional service.',
        'Our team also services Woolwich, Henley, Gladesville, Boronia Park, Riverview and Lane Cove \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Hunters Hill cleaners', body: 'A trained, police-checked team comfortable in heritage homes \u2014 we know how to look after sandstone, timber and original detail.' },
        { icon: 'clock', title: 'Bookings that fit family life', body: 'Weekly, fortnightly or one-off cleans scheduled around school runs, ferry commutes and weekend plans.' },
        { icon: 'sparkle', title: 'Heritage-friendly, river-safe', body: 'pH-neutral, plant-based products that protect heritage finishes and the rivers your peninsula sits on.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Hunters Hill homes, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Lower North Shore with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Hunters Hill client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Hunters Hill?',
      sub: 'Eco-friendly products, police-checked local cleaners and discreet, flexible scheduling \u2014 book your first Hunters Hill clean in under 60 seconds.',
      trust: 'Trusted by Hunters Hill families, heritage homeowners and downsizers.',
    },
    seo: {
      title: 'House Cleaning Hunters Hill | Eco-Friendly Cleaners Sydney',
      description: 'Eco-friendly house cleaning in Hunters Hill, Woolwich, Henley & Gladesville. Heritage-home friendly. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Woolwich', 'Henley', 'Gladesville', 'Boronia Park', 'Putney', 'Tennyson Point', 'Mortlake', 'Concord', 'Drummoyne', 'Russell Lea', 'Five Dock', 'Abbotsford', 'Chiswick', 'Wareemba', 'Lane Cove', 'Riverview', 'Linley Point', 'Longueville', 'Northwood'],
  },

  {
    slug: 'cleaners-vaucluse',
    name: 'Vaucluse',
    state: 'New South Wales',
    stateCode: 'NSW',
    region: 'Sydney\u2019s Eastern Suburbs',
    heroImage: '/images/suburbs/cleaners-vaucluse.png',
    heroImageAlt: 'Eco-friendly house cleaning in Vaucluse and the Eastern Beaches Sydney',
    ogImage: '/images/suburbs/cleaners-vaucluse.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Vaucluse'],
      tagline: 'Trusted, Trained and Thorough — on Sydney\u2019s harbour edge',
    },
    intro: {
      kicker: 'House cleaning in Vaucluse',
      h2: 'Best house cleaning in Vaucluse & the Eastern Suburbs',
      paragraphs: [
        'Vaucluse is one of Sydney\u2019s most prestigious harbourside addresses \u2014 a suburb of architectural homes, sandstone walls and gardens overlooking Sydney Harbour and the South Head approaches. NATURO GROUP\u2019s Vaucluse cleaners use eco-friendly products that protect natural stone, marble, premium joinery and the harbour catchment they back onto.',
        'From Vaucluse village and Watsons Bay to Rose Bay, Bellevue Hill and Dover Heights, our trained, police-checked team services premium homes, harbourfront houses and apartments \u2014 with the discretion and consistency the postcode demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Vaucluse & the Eastern Suburbs',
      paragraphs: [
        'Vaucluse is home to around 9,000 residents on Sydney\u2019s eastern harbour edge \u2014 a quiet, family-oriented community known for harbourside homes, Vaucluse House heritage gardens and Nielsen Park. The mix of established families and busy professionals means homes are well loved and standards are exacting.',
        'Our team also services Watsons Bay, Rose Bay, Bellevue Hill, Dover Heights and Bondi \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Vaucluse cleaners', body: 'A trained, police-checked team comfortable in premium harbourside homes \u2014 with the discretion the postcode expects.' },
        { icon: 'clock', title: 'Bookings that fit your schedule', body: 'Weekly, fortnightly or one-off cleans scheduled around school runs, work travel and weekend visitors.' },
        { icon: 'sparkle', title: 'Stone- and harbour-friendly', body: 'pH-neutral, plant-based products that are safe for marble, natural stone and the harbour catchment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Vaucluse homes, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Eastern Suburbs with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Vaucluse client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Vaucluse?',
      sub: 'Eco-friendly products, police-checked local cleaners and discreet, flexible scheduling \u2014 book your first Vaucluse clean in under 60 seconds.',
      trust: 'Trusted by Vaucluse families, harbourside homeowners and downsizers.',
    },
    seo: {
      title: 'House Cleaning Vaucluse | Eco-Friendly Cleaners Sydney',
      description: 'Eco-friendly house cleaning in Vaucluse, Watsons Bay, Rose Bay & Bellevue Hill. Premium harbourside homes, gentle on stone & marble. Police-checked.',
    },
    nearbySuburbs: ['Watsons Bay', 'Dover Heights', 'Rose Bay', 'Point Piper', 'Bellevue Hill', 'Double Bay', 'Darling Point', 'Edgecliff', 'Woollahra', 'Paddington', 'Bondi', 'North Bondi', 'Bondi Junction', 'Diamond Bay', 'Hermit Point', 'Parsley Bay'],
  },

  // ────────────────────────────────────────────────────────────────────────
  // QUEENSLAND
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'cleaners-brisbane',
    name: 'Brisbane',
    state: 'Queensland',
    stateCode: 'QLD',
    region: 'Greater Brisbane',
    heroImage: '/images/suburbs/cleaners-brisbane.png',
    heroImageAlt: 'NATURO Group eco-friendly cleaning across Brisbane QLD',
    ogImage: '/images/suburbs/cleaners-brisbane.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Brisbane'],
      tagline: 'Trusted, Trained and Thorough — across Greater Brisbane',
    },
    intro: {
      kicker: 'House cleaning in Brisbane',
      h2: 'Best house cleaning across Brisbane',
      paragraphs: [
        'Brisbane homes range from Queenslander cottages with timber floors and breezeways to inner-city apartments along the river and modern family houses across the suburbs. NATURO GROUP\u2019s Brisbane cleaners use eco-friendly products that suit the subtropical climate, polished timber and the river catchment.',
        'From the CBD and South Bank to West End, New Farm, Paddington, Toowong and Bulimba, our trained, police-checked team services apartments, Queenslanders and family homes \u2014 with the consistency a fast-growing capital demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Brisbane',
      paragraphs: [
        'Brisbane is home to around 2.6 million people across Greater Brisbane \u2014 a subtropical river city of 190 suburbs, anchored by the Brisbane River, the Story Bridge and a year-round outdoor lifestyle. We work the full mix of inner-city apartments, classic Queenslanders and modern family suburbs.',
        'Our team services New Farm, West End, Paddington, Toowong, Bulimba, Indooroopilly, Chermside and Mount Gravatt \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Brisbane cleaners', body: 'A trained, police-checked team that knows the city \u2014 from CBD apartments to Queenslander cottages on the high side of New Farm.' },
        { icon: 'clock', title: 'Bookings that fit Brisbane life', body: 'Weekly, fortnightly or one-off cleans scheduled around the office, school run and weekend trips down the coast.' },
        { icon: 'sparkle', title: 'Subtropical-friendly products', body: 'Plant-based, low-residue products that work in humid conditions and protect timber floors and breezeway joinery.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Brisbane homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across Greater Brisbane with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Brisbane client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Brisbane?',
      sub: 'Eco-friendly products, police-checked Brisbane cleaners and flexible scheduling \u2014 book your first clean in under 60 seconds.',
      trust: 'Trusted by Brisbane families, professionals and apartment dwellers.',
    },
    seo: {
      title: 'House Cleaning Brisbane | Eco-Friendly Cleaners QLD',
      description: 'Eco-friendly house cleaning across Brisbane \u2014 New Farm, West End, Paddington, Bulimba & beyond. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['New Farm', 'Fortitude Valley', 'Newstead', 'Teneriffe', 'West End', 'South Brisbane', 'Highgate Hill', 'Paddington', 'Milton', 'Toowong', 'Auchenflower', 'Spring Hill', 'Kelvin Grove', 'Red Hill', 'Bardon', 'Ascot', 'Hamilton', 'Bulimba', 'Hawthorne', 'Norman Park', 'Camp Hill', 'Coorparoo', 'Greenslopes'],
  },

  {
    slug: 'cleaners-cairns',
    name: 'Cairns',
    state: 'Queensland',
    stateCode: 'QLD',
    region: 'Far North Queensland',
    heroImage: '/images/suburbs/cleaners-cairns.png',
    heroImageAlt: 'NATURO Group eco-friendly cleaning in Cairns QLD',
    ogImage: '/images/suburbs/cleaners-cairns.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Cairns'],
      tagline: 'Trusted, Trained and Thorough — across Far North Queensland',
    },
    intro: {
      kicker: 'House cleaning in Cairns',
      h2: 'Best house cleaning in Cairns & Far North Queensland',
      paragraphs: [
        'Cairns sits on the doorstep of the Great Barrier Reef and the Daintree \u2014 a tropical city of high-rise apartments, beachside houses through the Northern Beaches and rainforest-edge homes in the foothills. NATURO GROUP\u2019s Cairns cleaners use reef-safe, plant-based products that handle the humidity and protect the World Heritage waters next door.',
        'From the Cairns CBD and the Esplanade to Trinity Beach, Palm Cove, Edge Hill, Whitfield and Smithfield, our trained, police-checked team services apartments, family homes and short-stay properties \u2014 with the consistency a tropical tourist city expects.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Cairns & Far North Queensland',
      paragraphs: [
        'Cairns is home to around 155,000 residents \u2014 a tropical regional capital, gateway to the Great Barrier Reef and the Daintree, and a year-round destination for visitors. The household mix spans long-term locals, FIFO workers, retirees and short-stay hosts.',
        'Our team also services Trinity Beach, Palm Cove, Edge Hill, Whitfield, Smithfield, Gordonvale and Redlynch \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Cairns cleaners', body: 'A trained, police-checked team that knows the tropics \u2014 from Esplanade apartments to Palm Cove holiday homes.' },
        { icon: 'clock', title: 'Bookings that suit FIFO and tourism', body: 'Weekly, fortnightly or one-off cleans scheduled around shift rotations, dive trips and busy season turnovers.' },
        { icon: 'sparkle', title: 'Reef-safe, humidity-friendly', body: 'Plant-based, biodegradable products that are kind to the reef, respect the rainforest and handle the humidity.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Cairns homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across Far North Queensland with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Cairns client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Cairns?',
      sub: 'Reef-safe products, police-checked local cleaners and flexible scheduling \u2014 book your first Cairns clean in under 60 seconds.',
      trust: 'Trusted by Cairns locals, FIFO workers and short-stay hosts.',
    },
    seo: {
      title: 'House Cleaning Cairns | Eco-Friendly Cleaners QLD',
      description: 'Eco-friendly house cleaning in Cairns, Trinity Beach, Palm Cove & the Northern Beaches. Reef-safe products. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Edge Hill', 'Whitfield', 'Manunda', 'Manoora', 'Mooroobool', 'Westcourt', 'Earlville', 'Bungalow', 'Parramatta Park', 'Trinity Beach', 'Palm Cove', 'Clifton Beach', 'Kewarra Beach', 'Smithfield', 'Yorkeys Knob', 'Holloways Beach', 'Machans Beach', 'Redlynch', 'Stratford', 'Freshwater', 'Brinsmead'],
  },

  {
    slug: 'cleaners-gold-coast',
    name: 'Gold Coast',
    state: 'Queensland',
    stateCode: 'QLD',
    region: 'Gold Coast',
    heroImage: '/images/suburbs/cleaners-gold-coast.jpg',
    heroImageAlt: 'Eco-friendly house cleaning across the Gold Coast QLD',
    ogImage: '/images/suburbs/cleaners-gold-coast.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning on the', 'Gold Coast'],
      tagline: 'Trusted, Trained and Thorough — Coolangatta to Surfers Paradise',
    },
    intro: {
      kicker: 'House cleaning on the Gold Coast',
      h2: 'Best house cleaning across the Gold Coast',
      paragraphs: [
        'The Gold Coast is 70km of beaches, high-rise apartments, canal estates and hinterland villages \u2014 from Coolangatta in the south to Hope Island in the north. NATURO GROUP\u2019s Gold Coast cleaners use eco-friendly products that suit beachside apartments, salt-air glass and the canals you live on.',
        'From Surfers Paradise and Broadbeach to Burleigh Heads, Palm Beach, Mermaid Beach, Robina and Coolangatta, our trained, police-checked team services apartments, beach houses, holiday lets and family homes \u2014 with the speed busy turnover seasons demand.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across the Gold Coast',
      paragraphs: [
        'The Gold Coast is Australia\u2019s sixth-largest city \u2014 around 750,000 residents across a string of beachside suburbs, hinterland villages and master-planned canal estates. It\u2019s a year-round visitor economy and a fast-growing place to live.',
        'Our team services Surfers Paradise, Broadbeach, Burleigh, Palm Beach, Mermaid Beach, Robina, Varsity Lakes and Coolangatta \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Gold Coast cleaners', body: 'A trained, police-checked team that knows the strip \u2014 from Surfers high-rises to Burleigh Heads beach houses.' },
        { icon: 'clock', title: 'Same-day Airbnb turnovers', body: 'Holiday-let turnovers, weekly maintenance cleans and one-off deep cleans \u2014 booked online in seconds.' },
        { icon: 'sparkle', title: 'Salt-air, canal-friendly products', body: 'Plant-based products that protect salt-exposed glass, canal-edge timber and the waterways behind your house.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Gold Coast homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Gold Coast with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Gold Coast client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'on the Gold Coast?',
      sub: 'Eco-friendly products, police-checked local cleaners and same-day holiday-let turnovers \u2014 book your first Gold Coast clean in under 60 seconds.',
      trust: 'Trusted by Gold Coast families, holiday-let hosts and downsizers.',
    },
    seo: {
      title: 'House Cleaning Gold Coast | Eco-Friendly Cleaners QLD',
      description: 'Eco-friendly house cleaning across the Gold Coast \u2014 Surfers, Broadbeach, Burleigh, Palm Beach, Coolangatta. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Surfers Paradise', 'Broadbeach', 'Mermaid Beach', 'Burleigh Heads', 'Palm Beach', 'Currumbin', 'Coolangatta', 'Tugun', 'Miami', 'Nobby Beach', 'Bilinga', 'Kirra', 'Robina', 'Varsity Lakes', 'Mudgeeraba', 'Reedy Creek', 'Helensvale', 'Hope Island', 'Southport', 'Main Beach', 'Labrador', 'Biggera Waters', 'Runaway Bay'],
  },

  {
    slug: 'house-cleaning-ipswich',
    name: 'Ipswich',
    state: 'Queensland',
    stateCode: 'QLD',
    region: 'Greater Brisbane',
    heroImage: '/images/suburbs/house-cleaning-ipswich.png',
    heroImageAlt: 'NATURO Group eco-friendly house cleaning in Ipswich QLD',
    ogImage: '/images/suburbs/house-cleaning-ipswich.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Ipswich'],
      tagline: 'Trusted, Trained and Thorough — across Ipswich and the West Moreton',
    },
    intro: {
      kicker: 'House cleaning in Ipswich',
      h2: 'Best house cleaning in Ipswich & the West Moreton',
      paragraphs: [
        'Ipswich is one of Queensland\u2019s oldest cities \u2014 a fast-growing river city of heritage timber houses, contemporary family suburbs and rural-residential blocks 40 minutes west of Brisbane. NATURO GROUP\u2019s Ipswich cleaners use eco-friendly products that suit Queenslander timber, modern builds and the Bremer River catchment.',
        'From central Ipswich to Booval, Karalee, Ripley, Springfield and Yamanto, our trained, police-checked team services family homes, rentals and end-of-lease properties \u2014 with the reliability fast-growth corridors demand.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Ipswich & the West Moreton',
      paragraphs: [
        'Ipswich is home to around 245,000 residents and one of South-East Queensland\u2019s fastest-growing local government areas. The household mix spans heritage homes in the CBD, established family suburbs and brand-new estates in Ripley, Springfield Lakes and South Ripley.',
        'Our team also services Booval, Karalee, Ripley, Springfield Lakes, Yamanto, Brassall and Goodna \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Ipswich cleaners', body: 'A trained, police-checked team that knows Ipswich \u2014 from heritage Queenslanders to brand-new Ripley estate homes.' },
        { icon: 'clock', title: 'Bookings that fit family life', body: 'Weekly, fortnightly or one-off cleans scheduled around the school run, FIFO shifts and weekend plans.' },
        { icon: 'sparkle', title: 'Eco-friendly, kid- and pet-safe', body: 'Plant-based products that are gentle on timber floors, asthma-prone kids and the family dog.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Ipswich homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across Ipswich and the West Moreton with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Ipswich client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Ipswich?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Ipswich clean in under 60 seconds.',
      trust: 'Trusted by Ipswich families, growth-corridor homeowners and renters.',
    },
    seo: {
      title: 'House Cleaning Ipswich | Eco-Friendly Cleaners QLD',
      description: 'Eco-friendly house cleaning in Ipswich, Booval, Karalee, Ripley & Springfield Lakes. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Brassall', 'Booval', 'Bundamba', 'Eastern Heights', 'Newtown', 'Raceview', 'Silkstone', 'Sadliers Crossing', 'North Ipswich', 'Wulkuraka', 'One Mile', 'Goodna', 'Redbank', 'Springfield', 'Springfield Lakes', 'Augustine Heights', 'Karalee', 'Karana Downs', 'Rosewood', 'Walloon', 'Marburg', 'Yamanto'],
  },

  {
    slug: 'cleaners-sunshine-coast',
    name: 'Sunshine Coast',
    state: 'Queensland',
    stateCode: 'QLD',
    region: 'Sunshine Coast',
    heroImage: '/images/suburbs/cleaners-sunshine-coast.png',
    heroImageAlt: 'NATURO Group eco-friendly cleaning across the Sunshine Coast QLD',
    ogImage: '/images/suburbs/cleaners-sunshine-coast.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning on the', 'Sunshine Coast'],
      tagline: 'Trusted, Trained and Thorough — Caloundra to Noosa',
    },
    intro: {
      kicker: 'House cleaning on the Sunshine Coast',
      h2: 'Best house cleaning across the Sunshine Coast',
      paragraphs: [
        'The Sunshine Coast stretches from Caloundra to Noosa \u2014 a region of beach suburbs, hinterland villages and modern family estates. NATURO GROUP\u2019s Sunshine Coast cleaners use eco-friendly products that protect coastal finishes, the marine park and the people who love them both.',
        'From Caloundra and Mooloolaba to Maroochydore, Buderim, Noosa Heads, Coolum and Peregian, our trained, police-checked team services beach houses, family homes and holiday lets \u2014 with the consistency busy turnover seasons demand.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across the Sunshine Coast',
      paragraphs: [
        'The Sunshine Coast is home to around 350,000 residents across a network of beachside suburbs, hinterland villages like Maleny and Montville, and growing health and education precincts. It\u2019s one of Australia\u2019s fastest-growing regions and a year-round destination for visitors.',
        'Our team services Caloundra, Mooloolaba, Maroochydore, Buderim, Noosa Heads, Noosaville, Coolum and Peregian \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Sunshine Coast cleaners', body: 'A trained, police-checked team that knows the Coast \u2014 from Mooloolaba apartments to Noosa beach houses.' },
        { icon: 'clock', title: 'Same-day Airbnb turnovers', body: 'Holiday-let turnovers, weekly maintenance cleans and one-off deep cleans \u2014 booked online in seconds.' },
        { icon: 'sparkle', title: 'Marine-park-friendly products', body: 'Plant-based, biodegradable products that protect the marine park and respect the coast you live on.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Sunshine Coast homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Sunshine Coast with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Sunshine Coast client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'on the Sunshine Coast?',
      sub: 'Eco-friendly products, police-checked local cleaners and same-day holiday-let turnovers \u2014 book your first Sunshine Coast clean in under 60 seconds.',
      trust: 'Trusted by Sunshine Coast families, holiday-let hosts and retirees.',
    },
    seo: {
      title: 'House Cleaning Sunshine Coast | Eco-Friendly Cleaners QLD',
      description: 'Eco-friendly house cleaning across the Sunshine Coast \u2014 Caloundra, Mooloolaba, Noosa, Coolum. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Maroochydore', 'Mooloolaba', 'Caloundra', 'Buderim', 'Noosa Heads', 'Noosaville', 'Tewantin', 'Sunshine Beach', 'Coolum Beach', 'Marcoola', 'Mudjimba', 'Twin Waters', 'Pacific Paradise', 'Bli Bli', 'Nambour', 'Yandina', 'Eumundi', 'Cooroy', 'Pomona', 'Kawana Waters', 'Currimundi', 'Wurtulla', 'Sippy Downs', 'Peregian Beach'],
  },

  {
    slug: 'cleaners-toowoomba',
    name: 'Toowoomba',
    state: 'Queensland',
    stateCode: 'QLD',
    region: 'Darling Downs',
    heroImage: '/images/suburbs/cleaners-toowoomba.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Toowoomba QLD',
    ogImage: '/images/suburbs/cleaners-toowoomba.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Toowoomba'],
      tagline: 'Trusted, Trained and Thorough — across the Darling Downs',
    },
    intro: {
      kicker: 'House cleaning in Toowoomba',
      h2: 'Best house cleaning in Toowoomba & the Darling Downs',
      paragraphs: [
        'Toowoomba sits on the edge of the Great Dividing Range \u2014 the \u201cGarden City\u201d of Queensland, with heritage Federation homes, Queenslander cottages and modern family suburbs spread across a 700m-elevation plateau. NATURO GROUP\u2019s Toowoomba cleaners use eco-friendly products that protect period detail and suit the cooler highland climate.',
        'From central Toowoomba and East Toowoomba to Rangeville, Centenary Heights, Glenvale and Highfields, our trained, police-checked team services family homes, rentals and aged-care residences \u2014 with the reliability locals expect.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Toowoomba & the Darling Downs',
      paragraphs: [
        'Toowoomba is the regional capital of the Darling Downs \u2014 a city of around 140,000 residents known for the Carnival of Flowers, more than 150 public parks and a growing tertiary, health and agricultural sector. We work with families, downsizers and rural-residential households across the region.',
        'Our team also services East Toowoomba, Rangeville, Centenary Heights, Glenvale, Highfields, Wilsonton and Newtown \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Toowoomba cleaners', body: 'A trained, police-checked team that knows the Range \u2014 from East Toowoomba heritage homes to Highfields family houses.' },
        { icon: 'clock', title: 'Bookings that fit Darling Downs life', body: 'Weekly, fortnightly or one-off cleans scheduled around school runs, farm days and weekend trips down the Range.' },
        { icon: 'sparkle', title: 'Heritage- and asthma-friendly', body: 'Plant-based, low-fume products that protect period joinery and are kind to sensitive lungs.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Toowoomba homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Darling Downs with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Toowoomba client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Toowoomba?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Toowoomba clean in under 60 seconds.',
      trust: 'Trusted by Toowoomba families, retirees and rural-residential households.',
    },
    seo: {
      title: 'House Cleaning Toowoomba | Eco-Friendly Cleaners QLD',
      description: 'Eco-friendly house cleaning in Toowoomba, East Toowoomba, Rangeville & Highfields. Heritage-home friendly. Police-checked, fully insured.',
    },
    nearbySuburbs: ['East Toowoomba', 'North Toowoomba', 'South Toowoomba', 'Newtown', 'Rangeville', 'Mount Lofty', 'Centenary Heights', 'Middle Ridge', 'Kearneys Spring', 'Glenvale', 'Wilsonton', 'Harristown', 'Drayton', 'Westbrook', 'Highfields', 'Cabarlah', 'Crows Nest', 'Withcott', 'Helidon', 'Hodgson Vale'],
  },

  {
    slug: 'cleaners-townsville',
    name: 'Townsville',
    state: 'Queensland',
    stateCode: 'QLD',
    region: 'North Queensland',
    heroImage: '/images/suburbs/cleaners-townsville.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Townsville QLD',
    ogImage: '/images/suburbs/cleaners-townsville.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Townsville'],
      tagline: 'Trusted, Trained and Thorough — across North Queensland',
    },
    intro: {
      kicker: 'House cleaning in Townsville',
      h2: 'Best house cleaning in Townsville & North Queensland',
      paragraphs: [
        'Townsville is North Queensland\u2019s biggest city \u2014 a tropical port and garrison town anchored by Castle Hill, The Strand and the gateway to Magnetic Island. Homes range from Queenslanders in North Ward to modern family houses in Annandale, Kirwan and Mount Louisa. NATURO GROUP\u2019s Townsville cleaners use eco-friendly products that handle the dry-tropics climate and protect the reef next door.',
        'From North Ward and the Strand to Annandale, Kirwan, Mount Louisa, Idalia and Aitkenvale, our trained, police-checked team services family homes, defence-housing properties and short-stay apartments \u2014 with the consistency garrison-town life demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Townsville & North Queensland',
      paragraphs: [
        'Townsville is home to around 200,000 residents \u2014 a tropical regional centre, defence garrison and gateway to Magnetic Island and the inner Great Barrier Reef. The household mix spans long-term locals, ADF families, FIFO workers and JCU students.',
        'Our team also services North Ward, South Townsville, Annandale, Kirwan, Mount Louisa, Idalia and Magnetic Island \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Townsville cleaners', body: 'A trained, police-checked team that knows the city \u2014 from North Ward Queenslanders to Annandale family homes.' },
        { icon: 'clock', title: 'Bookings that suit ADF life', body: 'Weekly, fortnightly or one-off cleans \u2014 plus end-of-posting cleans for ADF families relocating in or out.' },
        { icon: 'sparkle', title: 'Reef- and tropics-friendly', body: 'Plant-based, biodegradable products that handle the humidity and protect the reef on your doorstep.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Townsville homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across North Queensland with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Townsville client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Townsville?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Townsville clean in under 60 seconds.',
      trust: 'Trusted by Townsville families, ADF households and JCU students.',
    },
    seo: {
      title: 'House Cleaning Townsville | Eco-Friendly Cleaners QLD',
      description: 'Eco-friendly house cleaning in Townsville, North Ward, Annandale, Kirwan & Magnetic Island. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['North Ward', 'Belgian Gardens', 'Castle Hill', 'South Townsville', 'Railway Estate', 'Hyde Park', 'Mundingburra', 'Hermit Park', 'Aitkenvale', 'Currajong', 'Gulliver', 'Pimlico', 'Rosslea', 'Cranbrook', 'Vincent', 'Heatley', 'Kirwan', 'Thuringowa Central', 'Annandale', 'Douglas', 'Idalia', 'Pallarenda'],
  },

  // ────────────────────────────────────────────────────────────────────────
  // VICTORIA
  // ────────────────────────────────────────────────────────────────────────
  {
    slug: 'cleaners-melbourne',
    name: 'Melbourne',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Melbourne',
    heroImage: '/images/suburbs/cleaners-melbourne.jpg',
    heroImageAlt: 'Eco-friendly house cleaning across Melbourne VIC',
    ogImage: '/images/suburbs/cleaners-melbourne.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Melbourne'],
      tagline: 'Trusted, Trained and Thorough — across Greater Melbourne',
    },
    intro: {
      kicker: 'House cleaning in Melbourne',
      h2: 'Best house cleaning across Melbourne',
      paragraphs: [
        'Melbourne homes span everything from CBD apartments and Carlton terraces to bayside houses in Brighton and family suburbs across the east, north and south-east. NATURO GROUP\u2019s Melbourne cleaners use eco-friendly products that suit period detail, modern apartments and the four-seasons-in-a-day climate.',
        'From the CBD and South Yarra to Richmond, Fitzroy, Brighton, Hawthorn, Brunswick and St Kilda, our trained, police-checked team services apartments, terraces and family homes \u2014 with the consistency a city this size demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Greater Melbourne',
      paragraphs: [
        'Melbourne is Australia\u2019s second-largest city, home to more than 5 million people across hundreds of suburbs \u2014 from the inner-city laneways to the bayside, the Yarra Valley and the outer growth corridors. We work the full mix of apartments, terraces and family homes.',
        'Our team services the CBD, South Yarra, Richmond, Fitzroy, Brighton, Hawthorn, Brunswick, St Kilda, Box Hill and beyond \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked Melbourne cleaners', body: 'Every cleaner vetted, trained and insured \u2014 so you can welcome them into a CBD apartment or a Camberwell family home.' },
        { icon: 'clock', title: 'Bookings that fit Melbourne life', body: 'Weekly, fortnightly or one-off cleans scheduled around the office, school run and weekend plans.' },
        { icon: 'sparkle', title: 'Heritage- and apartment-friendly', body: 'Plant-based, pH-neutral products that protect period detail in terraces and won\u2019t set off apartment smoke alarms.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Melbourne homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting Melbourne\u2019s NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients with tailored services that prioritise comfort and independence \u2014 in every postcode from St Kilda to Werribee.',
      'Our commitment to quality, reliability and personalised care ensures every Melbourne client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Melbourne?',
      sub: 'Eco-friendly products, police-checked Melbourne cleaners and flexible scheduling \u2014 book your first clean in under 60 seconds.',
      trust: 'Trusted by Melbourne families, professionals and apartment dwellers.',
    },
    seo: {
      title: 'House Cleaning Melbourne | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning across Melbourne \u2014 CBD, South Yarra, Richmond, Brighton, Hawthorn, St Kilda. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Carlton', 'Fitzroy', 'Collingwood', 'Richmond', 'South Yarra', 'Prahran', 'Windsor', 'St Kilda', 'Albert Park', 'Port Melbourne', 'Southbank', 'Docklands', 'North Melbourne', 'West Melbourne', 'Parkville', 'East Melbourne', 'South Melbourne', 'Hawthorn', 'Toorak', 'Brunswick', 'Cremorne', 'Carlton North', 'Fitzroy North'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Melbourne?',
        a: 'House cleaning in Melbourne starts from $153 for a regular clean and $371 for a deep clean. End-of-lease bond cleans start from $478. Pricing depends on the size of your home and the service type \u2014 get a transparent instant price online in under 60 seconds, no phone call required.',
      },
      {
        q: 'Which Melbourne suburbs do you service?',
        a: 'We service Melbourne CBD and surrounding inner suburbs including South Yarra, Richmond, Hawthorn, Toorak, St Kilda, Albert Park, Port Melbourne, Fitzroy, Collingwood, Brunswick, Carlton, Prahran, Windsor, Southbank and Docklands. Call 1300 876 472 to confirm availability in your suburb.',
      },
      {
        q: 'Do you offer end-of-lease cleaning in Melbourne?',
        a: 'Yes \u2014 end-of-lease bond cleans are one of our most popular Melbourne services. We cover everything on the standard rental inspection checklist: oven, stovetop, range hood, bathrooms, windows, walls, skirting boards and carpets. We provide a detailed receipt and a bond-back re-clean guarantee if your property manager raises any issue.',
      },
      {
        q: 'Do you offer NDIS and aged care cleaning in Melbourne?',
        a: 'Yes. NATURO GROUP supports NDIS participants and aged care recipients across Melbourne, working with plan managers, support coordinators and Home Care Package providers. We provide consistent cleaners, detailed invoicing and care reports on request. Call 1300 876 472 to discuss your support plan.',
      },
      {
        q: 'Are your Melbourne cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner working in Melbourne is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We supply all eco-friendly, non-toxic products and equipment \u2014 you do not need to provide anything for the clean.',
      },
    ],
  },

  {
    slug: 'house-cleaning-geelong',
    name: 'Geelong',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Geelong & Bellarine',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'NATURO Group eco-friendly house cleaning in Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Geelong'],
      tagline: 'Trusted, Trained and Thorough — across Geelong & the Bellarine',
    },
    intro: {
      kicker: 'House cleaning in Geelong',
      h2: 'Best house cleaning in Geelong & the Bellarine',
      paragraphs: [
        'Geelong is Victoria\u2019s second-largest city \u2014 a coastal city of waterfront terraces, restored Edwardian homes and modern family suburbs through Armstrong Creek and the growth corridor. NATURO GROUP\u2019s Geelong cleaners use eco-friendly products that suit period detail and the bay catchment.',
        'From the Geelong CBD and Eastern Beach to Newtown, Highton, Belmont, Ocean Grove, Barwon Heads and Torquay, our trained, police-checked team services family homes, holiday lets and end-of-lease properties \u2014 with the reliability locals expect.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Geelong & the Bellarine',
      paragraphs: [
        'Geelong is home to around 290,000 residents \u2014 anchored by Corio Bay, Deakin University, the waterfront and a fast-growing population spreading across the Bellarine Peninsula and the Surf Coast. We work with families, students, downsizers and short-stay hosts across the region.',
        'Our team also services Newtown, Highton, Belmont, Ocean Grove, Barwon Heads, Torquay and Lara \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Geelong cleaners', body: 'A trained, police-checked team that knows the Bay \u2014 from waterfront apartments to Bellarine beach houses.' },
        { icon: 'clock', title: 'Bookings that suit family life', body: 'Weekly, fortnightly or one-off cleans scheduled around school runs, the V/Line and weekend trips down the Surf Coast.' },
        { icon: 'sparkle', title: 'Bay- and ocean-friendly', body: 'Plant-based, biodegradable products that protect Corio Bay and the Bellarine\u2019s beaches.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Geelong homes and short-stay properties, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across Geelong and the Bellarine with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Geelong client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Geelong?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Geelong clean in under 60 seconds.',
      trust: 'Trusted by Geelong families, students and Bellarine homeowners.',
    },
    seo: {
      title: 'Eco-Friendly House Cleaning Geelong | Naturo Group',
      description: 'House cleaning in Geelong from $153. Police-checked, fully insured team across Geelong, Newtown, Highton, Belmont, Ocean Grove & Torquay. Instant online price — no phone call needed.',
    },
    nearbySuburbs: ['Newtown', 'East Geelong', 'South Geelong', 'Geelong West', 'Belmont', 'Highton', 'Wandana Heights', 'Manifold Heights', 'Herne Hill', 'Hamlyn Heights', 'Bell Park', 'Bell Post Hill', 'Norlane', 'North Shore', 'Corio', 'Lara', 'Ocean Grove', 'Barwon Heads', 'Torquay', 'Jan Juc', 'Drysdale', 'Leopold', 'Curlewis'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Geelong?',
        a: 'House cleaning in Geelong starts from $153 for a regular clean and $371 for a deep clean. End-of-lease bond cleans start from $478. The final price depends on the size of your home and the service type — get a transparent instant price online in under 60 seconds, no phone call required.',
      },
      {
        q: 'Which Geelong suburbs do you service?',
        a: 'We service all of Geelong and the surrounding region including Newtown, Highton, Belmont, Geelong West, South Geelong, East Geelong, Manifold Heights, Hamlyn Heights, Lara, Corio, Leopold, Ocean Grove, Barwon Heads, Torquay, Jan Juc and Drysdale. If you are unsure whether we cover your street, call 1300 876 472 and we will confirm straight away.',
      },
      {
        q: 'Do you offer NDIS and aged care cleaning in Geelong?',
        a: 'Yes. NATURO GROUP provides NDIS cleaning for plan-managed and self-managed participants across Geelong and the Bellarine, working closely with Barwon Disability Services, local support coordinators and Home Care Package providers. We supply detailed invoicing, reports and consistent cleaners where possible. Call 1300 876 472 to discuss your needs.',
      },
      {
        q: 'Can you clean end-of-lease properties in Geelong?',
        a: 'Yes — end-of-lease bond cleans are one of our most popular services in Geelong, covering everything agents check at final inspection: oven, stovetop, bathrooms, windows, skirting boards, walls and carpets. We provide a receipt and a bond-back re-clean guarantee if any issue is raised by your property manager.',
      },
      {
        q: 'Are your Geelong cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner in Geelong is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We bring all eco-friendly, non-toxic products and equipment to every job — you do not need to supply anything.',
      },
      {
        q: 'What eco-friendly products do you use in Geelong homes?',
        a: 'We use plant-based, biodegradable, non-toxic products that are safe for children, pets, asthma sufferers and Corio Bay\'s catchment. Our products are tough on grease and grime but gentle on the period timber, natural stone and bay-area finishes common throughout Geelong and the Bellarine.',
      },
      {
        q: 'Do you offer weekend or same-week cleaning in Geelong?',
        a: 'We can usually book a first Geelong clean within 2–5 business days, and same-week availability is often possible for smaller jobs. For regular weekly or fortnightly cleans, we work with your schedule — school runs, V/Line commutes and weekend trips down the Surf Coast included.',
      },
      {
        q: 'What is included in a standard house clean in Geelong?',
        a: 'A standard Geelong clean covers all living areas (dusting, vacuuming, mopping), kitchen (benchtops, stovetop, splashback, sink), bathrooms (toilet, basin, shower, bath), and bedrooms. We bring all products and equipment. Extras like inside-oven cleaning, inside-fridge, window washing and linen changes can be added when you get your instant price online.',
      },
    ],
  },

  {
    slug: 'house-cleaning-torquay',
    name: 'Torquay',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Surf Coast',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Torquay VIC — Surf Coast',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Torquay'],
      tagline: 'Trusted, Trained and Thorough — across the Surf Coast',
    },
    intro: {
      kicker: 'House cleaning in Torquay',
      h2: 'Best house cleaning in Torquay & the Surf Coast',
      paragraphs: [
        'Torquay is the gateway to the Great Ocean Road — a vibrant surf town of beach houses, holiday lets and permanent family homes that take on salt air, sand and summer crowds. NATURO GROUP\'s local Torquay cleaners use eco-friendly, non-toxic products that protect timber decking, natural stone and the coastal finishes that Surf Coast homes are known for.',
        'From the Torquay CBD and Zeally Bay to Jan Juc, Bells Beach and the surrounding Surf Coast Shire, our trained, police-checked team services owner-occupied homes, short-stay properties and end-of-lease rentals — with the reliability and discretion that Surf Coast living demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Torquay & the Surf Coast',
      paragraphs: [
        'Torquay is home to around 20,000 residents and a year-round visitor economy built around Bells Beach, the Rip Curl Pro and the Great Ocean Road. Holiday homes and Airbnb properties need consistent, high-quality turnovers between guests — and permanent residents deserve the same standard.',
        'Our team also services Jan Juc, Anglesea, Aireys Inlet and Lorne — with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every Torquay clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Torquay cleaners', body: 'Police-checked, trained and familiar with the Surf Coast — from Zeally Bay family homes to Bells Beach holiday lets.' },
        { icon: 'clock', title: 'Holiday-let turnovers, done right', body: 'Same-day Airbnb and short-stay turnovers, weekly or fortnightly maintenance cleans — book and reschedule online in seconds.' },
        { icon: 'sparkle', title: 'Ocean-safe, salt-air friendly', body: 'Plant-based, biodegradable products safe for the ocean, kids, pets and the timber and stone finishes in coastal homes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Torquay homes and holiday properties, backed by a nursing background that drives our attention to detail and care.',
      'We support local NDIS participants, Veterans Affairs recipients and aged care clients across the Surf Coast with tailored cleaning that prioritises comfort and independence.',
      'Our commitment to quality and reliability ensures every Torquay client feels valued in their own home.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Torquay?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling — book your first Torquay clean in under 60 seconds.',
      trust: 'Trusted by Torquay families, surfers and holiday-let owners.',
    },
    seo: {
      title: 'House Cleaning Torquay | Eco-Friendly Surf Coast Cleaners VIC',
      description: 'Eco-friendly house cleaning in Torquay & the Surf Coast. Holiday-let turnovers, regular cleans, end-of-lease. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Jan Juc', 'Bells Beach', 'Anglesea', 'Aireys Inlet', 'Lorne', 'Ocean Grove', 'Barwon Heads', 'Geelong', 'Belmont', 'Highton'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Torquay?',
        a: 'House cleaning in Torquay starts from $153 for a regular clean and $371 for a deep clean. End-of-lease bond cleans start from $478. Get a transparent instant price online in under 60 seconds — no phone call needed.',
      },
      {
        q: 'Do you clean holiday rentals and Airbnb properties in Torquay?',
        a: 'Yes — short-stay and Airbnb turnovers are one of our most requested services in Torquay. We coordinate check-out and check-in windows, handle linen changeovers and provide condition reports for property managers. We service properties across Torquay, Jan Juc, Bells Beach and the Surf Coast Shire.',
      },
      {
        q: 'Do you service Jan Juc, Anglesea and surrounding Surf Coast towns?',
        a: 'Yes. Our team services Torquay, Jan Juc, Anglesea, Aireys Inlet and Lorne. For further towns along the Great Ocean Road, call 1300 876 472 and we will confirm coverage and availability.',
      },
      {
        q: 'Can you do end-of-lease cleaning in Torquay?',
        a: 'Yes — we offer full bond cleans in Torquay that cover everything on the standard rental inspection checklist: oven, bathrooms, windows, walls and skirting boards. We provide a receipt and include a bond-back re-clean guarantee if your property manager raises any issue.',
      },
      {
        q: 'Are your Torquay cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner in Torquay is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We bring all eco-friendly products and equipment — you do not need to supply anything.',
      },
    ],
  },

  {
    slug: 'house-cleaning-ocean-grove',
    name: 'Ocean Grove',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Bellarine Peninsula',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Ocean Grove VIC — Bellarine Peninsula',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Ocean Grove'],
      tagline: 'Trusted, Trained and Thorough — across the Bellarine Peninsula',
    },
    intro: {
      kicker: 'House cleaning in Ocean Grove',
      h2: 'Best house cleaning in Ocean Grove & the Bellarine',
      paragraphs: [
        'Ocean Grove is one of the Bellarine Peninsula\'s most popular seaside towns — a relaxed community of beach houses, new family estates and holiday properties that sit between the ocean and the Barwon River. NATURO GROUP\'s local cleaners use eco-friendly products that suit the natural materials and coastal lifestyle of Ocean Grove homes.',
        'From the Ocean Grove township and The Bluff to Wallington and Collendina, our trained, police-checked team services family homes, short-stay rentals and end-of-lease properties — with the consistency and care that Bellarine living deserves.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Ocean Grove & the Bellarine',
      paragraphs: [
        'Ocean Grove is home to around 16,000 residents and a thriving short-stay market driven by its surf beach and proximity to Geelong and Melbourne. Whether you\'re a permanent local, a holiday homeowner or an investor with a rental, we provide cleaning that works around your schedule.',
        'Our team also services Barwon Heads, Drysdale, Leopold, Queenscliff and the surrounding Bellarine — with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Ocean Grove cleaners', body: 'Police-checked, trained and familiar with the Bellarine — from Bluff Road beach houses to family homes near Ocean Grove Primary.' },
        { icon: 'clock', title: 'Flexible around Bellarine life', body: 'Weekly, fortnightly or one-off cleans. Short-stay turnovers available. Reschedule online in seconds.' },
        { icon: 'sparkle', title: 'Eco-friendly, ocean-safe', body: 'Biodegradable, non-toxic products kind to the Barwon River catchment and safe for kids, pets and allergy sufferers.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Ocean Grove homes and holiday properties, backed by a nursing background that drives our attention to detail.',
      'We support NDIS participants, aged care recipients and DVA cardholders across the Bellarine with tailored cleaning that prioritises comfort and independence.',
      'Our commitment to reliability and quality ensures every Ocean Grove client feels genuinely cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Ocean Grove?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling — book your first Ocean Grove clean in under 60 seconds.',
      trust: 'Trusted by Ocean Grove families and Bellarine holiday homeowners.',
    },
    seo: {
      title: 'House Cleaning Ocean Grove | Eco-Friendly Bellarine Cleaners VIC',
      description: 'Eco-friendly house cleaning in Ocean Grove & the Bellarine Peninsula. Police-checked, fully insured. Regular cleans, end-of-lease & holiday-let turnovers.',
    },
    nearbySuburbs: ['Barwon Heads', 'Drysdale', 'Leopold', 'Queenscliff', 'Point Lonsdale', 'Wallington', 'Collendina', 'Geelong', 'Torquay', 'Jan Juc'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Ocean Grove?',
        a: 'House cleaning in Ocean Grove starts from $153 for a regular clean and $371 for a deep clean. End-of-lease bond cleans start from $478. Get a transparent instant price online in under 60 seconds.',
      },
      {
        q: 'Do you clean holiday rentals and Airbnb properties in Ocean Grove?',
        a: 'Yes — we offer short-stay and holiday rental turnovers across Ocean Grove, Barwon Heads and the Bellarine Peninsula. We coordinate between check-out and check-in, handle linen changeovers and can provide condition reports for property managers and owners.',
      },
      {
        q: 'Do you service Barwon Heads and Drysdale as well?',
        a: 'Yes — our team covers Ocean Grove, Barwon Heads, Drysdale, Leopold, Queenscliff and Point Lonsdale. Call 1300 876 472 to confirm availability in your specific area.',
      },
      {
        q: 'Can you do end-of-lease cleaning in Ocean Grove?',
        a: 'Yes — we provide full bond cleans in Ocean Grove covering everything on the standard rental inspection checklist. We issue a receipt and include a bond-back re-clean guarantee if any issue is raised by your property manager.',
      },
      {
        q: 'Are your Ocean Grove cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner in Ocean Grove is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We supply all eco-friendly products and equipment.',
      },
    ],
  },

  {
    slug: 'house-cleaning-barwon-heads',
    name: 'Barwon Heads',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Bellarine Peninsula',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Barwon Heads VIC — Bellarine Peninsula',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Barwon Heads'],
      tagline: 'Trusted, Trained and Thorough — across the Bellarine Peninsula',
    },
    intro: {
      kicker: 'House cleaning in Barwon Heads',
      h2: 'Best house cleaning in Barwon Heads & surrounds',
      paragraphs: [
        'Barwon Heads is one of Victoria\'s most charming coastal villages — a tight-knit community of beach cottages, holiday homes and permanent residences at the mouth of the Barwon River. NATURO GROUP\'s local cleaners bring eco-friendly, non-toxic products that respect the natural environment and the character of Barwon Heads homes.',
        'From the village centre and Thirteenth Beach to Bridge Road and the surrounding estuary, our trained, police-checked team services family homes, holiday lets and short-stay properties with care and consistency.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Barwon Heads & the Bellarine',
      paragraphs: [
        'Barwon Heads has a permanent population of around 3,500 and a significant holiday and short-stay market — made famous by the TV series SeaChange and beloved by Melburnians seeking a quiet coastal escape. Consistency and discretion matter here.',
        'Our team also services Ocean Grove, Drysdale, Leopold and Queenscliff — with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local, discrete cleaners', body: 'Police-checked, trained and respectful of the village lifestyle — whether it\'s a beachside cottage or a riverside holiday home.' },
        { icon: 'clock', title: 'Holiday-let turnovers available', body: 'Same-day turnovers between guests, weekly maintenance cleans or one-off deep cleans — book and manage online.' },
        { icon: 'sparkle', title: 'Estuary-safe products', body: 'Plant-based, biodegradable products that protect the Barwon River estuary and are safe for kids, pets and sensitive environments.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning to Barwon Heads homes and holiday properties, guided by a nursing background that sets our standard of care.',
      'We support NDIS participants and aged care clients across the Bellarine with reliable, compassionate in-home cleaning.',
      'Every Barwon Heads client receives the same quality and reliability we would expect in our own home.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Barwon Heads?',
      sub: 'Eco-friendly products, police-checked cleaners and flexible bookings — get an instant price in under 60 seconds.',
      trust: 'Trusted by Barwon Heads locals and Bellarine holiday homeowners.',
    },
    seo: {
      title: 'House Cleaning Barwon Heads | Eco-Friendly Bellarine Cleaners VIC',
      description: 'Eco-friendly house cleaning in Barwon Heads & the Bellarine Peninsula. Holiday-let turnovers, regular cleans, end-of-lease. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Ocean Grove', 'Drysdale', 'Leopold', 'Queenscliff', 'Point Lonsdale', 'Wallington', 'Geelong', 'Torquay'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Barwon Heads?',
        a: 'House cleaning in Barwon Heads starts from $153 for a regular clean and $371 for a deep clean. Get a transparent instant price online in under 60 seconds — no phone call needed.',
      },
      {
        q: 'Do you clean holiday homes and Airbnb properties in Barwon Heads?',
        a: 'Yes — we provide short-stay turnovers and holiday rental cleans across Barwon Heads, Ocean Grove and the Bellarine Peninsula. We can coordinate check-out/check-in timing and provide condition reports for property managers and remote owners.',
      },
      {
        q: 'Do you service Ocean Grove and Drysdale from Barwon Heads?',
        a: 'Yes — our team covers Barwon Heads, Ocean Grove, Drysdale, Leopold, Queenscliff and Point Lonsdale. Call 1300 876 472 to confirm availability at your address.',
      },
      {
        q: 'Are your Barwon Heads cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner in Barwon Heads is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We supply all eco-friendly products — nothing is required from you.',
      },
    ],
  },

  {
    slug: 'house-cleaning-drysdale',
    name: 'Drysdale',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Bellarine Peninsula',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Drysdale VIC — Bellarine Peninsula',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Drysdale'],
      tagline: 'Trusted, Trained and Thorough — across the Bellarine Peninsula',
    },
    intro: {
      kicker: 'House cleaning in Drysdale',
      h2: 'Best house cleaning in Drysdale & the Bellarine',
      paragraphs: [
        'Drysdale is the commercial and community hub of the Bellarine Peninsula — a growing town of established family homes, new estates and properties that attract both long-term residents and retirees relocating from Melbourne and Geelong. NATURO GROUP\'s cleaners use eco-friendly products suited to the mix of older period homes and modern builds across Drysdale and Clifton Springs.',
        'Our trained, police-checked team services homes across Drysdale, Clifton Springs, Portarlington and surrounding Bellarine townships — with flexible scheduling and a consistent team you can trust.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Drysdale & the Bellarine',
      paragraphs: [
        'Drysdale and Clifton Springs together house around 10,000 residents and continue to grow as families and retirees move to the Bellarine for its lifestyle and value. A reliable, trusted cleaning service matters here.',
        'Our team covers Drysdale, Clifton Springs, Portarlington, Leopold, Ocean Grove and Barwon Heads — with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Reliable Bellarine cleaners', body: 'Police-checked, fully trained and consistent — from Drysdale family homes to Clifton Springs retirement properties.' },
        { icon: 'clock', title: 'Flexible scheduling', body: 'Weekly, fortnightly or one-off cleans. Book and manage your schedule online in seconds.' },
        { icon: 'sparkle', title: 'Eco-friendly products', body: 'Non-toxic, plant-based products safe for kids, pets, asthma sufferers and the Bellarine\'s coastal environment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver reliable, caring cleaning services to Drysdale and Bellarine homes — guided by nursing-grade standards and a genuine commitment to every client.',
      'We support NDIS participants, aged care recipients and DVA cardholders across the Bellarine with tailored in-home cleaning.',
      'Every Drysdale client receives the same quality, reliability and care we would bring to our own home.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Drysdale?',
      sub: 'Eco-friendly products, police-checked cleaners and flexible scheduling — get an instant price in under 60 seconds.',
      trust: 'Trusted by Drysdale families and Bellarine homeowners.',
    },
    seo: {
      title: 'House Cleaning Drysdale | Eco-Friendly Bellarine Cleaners VIC',
      description: 'Eco-friendly house cleaning in Drysdale, Clifton Springs & the Bellarine Peninsula. Police-checked, fully insured. Regular cleans, deep cleans & end-of-lease.',
    },
    nearbySuburbs: ['Clifton Springs', 'Portarlington', 'Leopold', 'Ocean Grove', 'Barwon Heads', 'Queenscliff', 'Point Lonsdale', 'Geelong', 'Lara'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Drysdale?',
        a: 'House cleaning in Drysdale starts from $153 for a regular clean and $371 for a deep clean. End-of-lease bond cleans start from $478. Get a transparent instant price online in under 60 seconds.',
      },
      {
        q: 'Do you also service Clifton Springs and Portarlington?',
        a: 'Yes — our team covers Drysdale, Clifton Springs, Portarlington, Leopold, Ocean Grove, Barwon Heads and surrounding Bellarine townships. Call 1300 876 472 to confirm coverage at your address.',
      },
      {
        q: 'Do you offer NDIS and aged care cleaning in Drysdale?',
        a: 'Yes. We support NDIS participants and aged care recipients across the Bellarine Peninsula, working with plan managers, support coordinators and Home Care Package providers. Call 1300 876 472 to discuss your needs.',
      },
      {
        q: 'Are your Drysdale cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner in Drysdale is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We supply all eco-friendly products and equipment.',
      },
    ],
  },

  {
    slug: 'house-cleaning-leopold',
    name: 'Leopold',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Bellarine Peninsula',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Leopold VIC — Bellarine Peninsula',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Leopold'],
      tagline: 'Trusted, Trained and Thorough — across Leopold & the Bellarine',
    },
    intro: {
      kicker: 'House cleaning in Leopold',
      h2: 'Best house cleaning in Leopold & surrounds',
      paragraphs: [
        'Leopold sits at the gateway to the Bellarine Peninsula — a fast-growing suburb of modern family homes, established streets and new estates that connect Geelong to Ocean Grove, Barwon Heads and Drysdale. NATURO GROUP\'s cleaners use eco-friendly, non-toxic products suited to the modern homes and family lifestyle that Leopold is known for.',
        'Our trained, police-checked team services homes across Leopold, Wallington and the surrounding Bellarine — with flexible weekly, fortnightly or one-off cleaning schedules that fit around busy family routines.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Leopold & the Bellarine',
      paragraphs: [
        'Leopold is one of the Bellarine\'s fastest-growing communities — home to young families, tradies and professionals who commute to Geelong and Melbourne. A reliable, trusted cleaner is one less thing to think about.',
        'Our team covers Leopold, Wallington, Ocean Grove, Barwon Heads and Geelong — with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Reliable Leopold cleaners', body: 'Police-checked, trained and consistent — servicing Leopold\'s modern family homes with care and professionalism.' },
        { icon: 'clock', title: 'Scheduling that works for families', body: 'Weekly, fortnightly or one-off cleans. Book and reschedule online in seconds around school runs and busy weeks.' },
        { icon: 'sparkle', title: 'Safe for kids and pets', body: 'Non-toxic, plant-based products safe for children, pets and anyone with asthma or allergies in the home.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver reliable, caring cleaning services to Leopold and Bellarine homes — guided by nursing-grade standards and a genuine commitment to every client.',
      'We support NDIS participants and aged care recipients across the Bellarine with consistent, compassionate in-home cleaning.',
      'Every Leopold client receives the same quality and care we would bring to our own home.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Leopold?',
      sub: 'Eco-friendly products, police-checked cleaners and flexible scheduling — get an instant price in under 60 seconds.',
      trust: 'Trusted by Leopold families and Bellarine homeowners.',
    },
    seo: {
      title: 'House Cleaning Leopold | Eco-Friendly Bellarine Cleaners VIC',
      description: 'Eco-friendly house cleaning in Leopold, Wallington & the Bellarine Peninsula. Police-checked, fully insured. Regular cleans, deep cleans & end-of-lease.',
    },
    nearbySuburbs: ['Wallington', 'Ocean Grove', 'Barwon Heads', 'Drysdale', 'Clifton Springs', 'Geelong', 'Belmont', 'Highton', 'Lara'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Leopold?',
        a: 'House cleaning in Leopold starts from $153 for a regular clean and $371 for a deep clean. End-of-lease bond cleans start from $478. Get a transparent instant price online in under 60 seconds.',
      },
      {
        q: 'Which areas near Leopold do you service?',
        a: 'We service Leopold, Wallington, Ocean Grove, Barwon Heads, Drysdale, Clifton Springs and Geelong. Call 1300 876 472 to confirm availability at your address.',
      },
      {
        q: 'Do you offer NDIS cleaning in Leopold?',
        a: 'Yes — we support NDIS participants and aged care recipients across Leopold and the Bellarine, working with local plan managers and Home Care Package providers. Call 1300 876 472 to discuss your support needs.',
      },
      {
        q: 'Are your Leopold cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner in Leopold is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We supply all eco-friendly products and equipment.',
      },
    ],
  },

  {
    slug: 'house-cleaning-jan-juc',
    name: 'Jan Juc',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Surf Coast',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Jan Juc VIC — Surf Coast',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Jan Juc'],
      tagline: 'Trusted, Trained and Thorough — across the Surf Coast',
    },
    intro: {
      kicker: 'House cleaning in Jan Juc',
      h2: 'Best house cleaning in Jan Juc & the Surf Coast',
      paragraphs: [
        'Jan Juc is a laid-back surf suburb tucked between Torquay and Bells Beach — a relaxed community of beach houses, family homes and holiday properties that attract surfers, families and weekenders from Melbourne. NATURO GROUP\'s local cleaners use eco-friendly products that suit the coastal lifestyle and the natural materials common in Jan Juc homes.',
        'Our trained, police-checked team services homes across Jan Juc and the broader Surf Coast — with consistent, reliable cleaning that fits the way you live.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Jan Juc & the Surf Coast',
      paragraphs: [
        'Jan Juc sits right alongside Torquay at the top of the Great Ocean Road — a small community with a strong surf culture and a mix of permanent residents and holiday homeowners. We provide the same high-quality service whether you\'re booking a weekly clean or a one-off end-of-lease.',
        'Our team also services Torquay, Anglesea, Bells Beach and surrounds — with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Surf Coast cleaners', body: 'Police-checked, trained and familiar with Jan Juc — from beachside family homes to Surf Coast holiday lets.' },
        { icon: 'clock', title: 'Flexible around surf life', body: 'Weekly, fortnightly or one-off cleans. Holiday-let turnovers available. Book and manage online in seconds.' },
        { icon: 'sparkle', title: 'Ocean-safe products', body: 'Biodegradable, non-toxic products safe for the ocean, kids, pets and sensitive coastal environments.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver reliable, caring cleaning services to Jan Juc and Surf Coast homes — guided by nursing-grade standards and a commitment to eco-friendly products.',
      'We support NDIS participants and aged care clients across the Surf Coast with tailored in-home cleaning.',
      'Every Jan Juc client receives the same quality, care and reliability we would bring to our own home.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Jan Juc?',
      sub: 'Eco-friendly products, police-checked cleaners and flexible bookings — get an instant price in under 60 seconds.',
      trust: 'Trusted by Jan Juc locals and Surf Coast holiday homeowners.',
    },
    seo: {
      title: 'House Cleaning Jan Juc | Eco-Friendly Surf Coast Cleaners VIC',
      description: 'Eco-friendly house cleaning in Jan Juc & Torquay on the Surf Coast VIC. Police-checked, fully insured. Regular cleans, end-of-lease & holiday-let turnovers.',
    },
    nearbySuburbs: ['Torquay', 'Bells Beach', 'Anglesea', 'Aireys Inlet', 'Ocean Grove', 'Barwon Heads', 'Geelong'],
    localFaqs: [
      {
        q: 'How much does house cleaning cost in Jan Juc?',
        a: 'House cleaning in Jan Juc starts from $153 for a regular clean and $371 for a deep clean. Get a transparent instant price online in under 60 seconds — no phone call needed.',
      },
      {
        q: 'Do you service Jan Juc and Torquay together?',
        a: 'Yes — our team covers both Jan Juc and Torquay as part of our Surf Coast service area, along with Anglesea and Bells Beach. Call 1300 876 472 to confirm availability at your address.',
      },
      {
        q: 'Do you clean holiday homes in Jan Juc?',
        a: 'Yes — we offer short-stay and holiday rental turnovers across Jan Juc and the Surf Coast. We coordinate check-out/check-in timing and can provide condition reports for property managers.',
      },
      {
        q: 'Are your Jan Juc cleaners police-checked and insured?',
        a: 'Every NATURO GROUP cleaner in Jan Juc is police-checked, fully insured for $20m public liability and trained to our nursing-grade standards. We supply all eco-friendly products and equipment.',
      },
    ],
  },

  // ── Greater Geelong inner & outer suburbs ──────────────────────────────

  {
    slug: 'house-cleaning-newtown-geelong',
    name: 'Newtown',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Newtown Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Newtown Geelong'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Newtown Geelong',
      h2: 'Professional house cleaning in Newtown & Greater Geelong',
      paragraphs: [
        'Newtown is one of Geelong\'s most prestigious inner suburbs — a leafy enclave of Victorian and Edwardian homes, wide streets and proximity to the Geelong Botanic Gardens and the waterfront. With its heritage architecture, established families and high standards of living, Newtown residents expect cleaning that matches the quality of their homes. NATURO GROUP delivers exactly that.',
        'From Newtown\'s heritage homes and brick-veneer classics to modern renovations, our police-checked team provides regular, deep clean and end-of-lease cleaning — using eco-friendly, plant-based products that are safe for children, pets and historic joinery.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners in Newtown & across Greater Geelong',
      paragraphs: [
        'Newtown\'s mix of Geelong Grammar families, professionals and long-term residents creates a community that values reliability and discretion in home services. Our vetted, insured team meets that expectation — quietly thorough, always on time.',
        'We service Newtown, Manifold Heights, Geelong West, South Geelong, East Geelong, Highton and the broader Geelong region, giving the inner city its own trusted cleaning team.',
      ],
      points: [
        { icon: 'shield', title: 'Heritage-home specialists', body: 'Police-checked cleaners experienced with Edwardian and Victorian properties — gentle on original joinery and heritage surfaces.' },
        { icon: 'clock', title: 'Reliable, discreet scheduling', body: 'Regular fortnightly or weekly cleans scheduled to fit around school, work and the Newtown lifestyle.' },
        { icon: 'sparkle', title: 'Eco products for heritage homes', body: 'Plant-based, non-toxic formulas safe for lead-free painted surfaces, polished timber and period finishes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we understand the care that Newtown\'s heritage homes demand — and we bring that same care to every room we clean.',
      'We support NDIS participants, aged care recipients and local families across inner Geelong with professional, compassionate in-home cleaning.',
      'Our satisfaction guarantee applies to every Newtown clean — your heritage home is in the best possible hands.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner, healthier home',
      h2Post: 'in Newtown Geelong?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Newtown clean in under 60 seconds.',
      trust: 'Trusted by Newtown families, heritage homeowners and Geelong professionals.',
    },
    seo: {
      title: 'House Cleaning Newtown Geelong | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Newtown Geelong VIC. Heritage-home specialists, police-checked & insured. Regular, deep clean & end-of-lease.',
    },
    nearbySuburbs: ['Geelong', 'Manifold Heights', 'Geelong West', 'South Geelong', 'East Geelong', 'Highton', 'Belmont', 'Herne Hill'],
  },

  {
    slug: 'house-cleaning-east-geelong',
    name: 'East Geelong',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in East Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'East Geelong'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in East Geelong',
      h2: 'Professional house cleaning in East Geelong & surrounds',
      paragraphs: [
        'East Geelong is a charming inner suburb with direct waterfront access, heritage cottages and a strong sense of community. Situated between Geelong\'s CBD and the Eastern Park and Botanic Gardens, it\'s a suburb that combines heritage character with modern convenience. NATURO GROUP brings eco-friendly, professional cleaning to every East Geelong home.',
        'From East Geelong\'s character weatherboard homes and Victorian cottages to modern renovated residences, our police-checked team provides regular, deep clean and end-of-lease services — with plant-based products and flexible scheduling.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across East Geelong & Greater Geelong',
      paragraphs: [
        'East Geelong\'s proximity to the waterfront and Eastern Beach makes it a lifestyle destination for families and professionals alike. Our team knows the character homes in this area and how to clean them without damaging period finishes or heritage surfaces.',
        'We service East Geelong, Newtown, South Geelong, Belmont, Highton and the broader Geelong waterfront — one reliable team for the eastern corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Heritage-aware cleaners', body: 'Police-checked, insured cleaners with experience in heritage homes, weatherboard cottages and period residences.' },
        { icon: 'clock', title: 'Reliable weekly or fortnightly', body: 'Consistent cleaning schedules that keep East Geelong homes looking their best year-round.' },
        { icon: 'sparkle', title: 'Eco-friendly & pet-safe', body: 'Plant-based, non-toxic products safe for children, dogs and the families who call East Geelong home.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, East Geelong\'s blend of heritage character and community pride aligns perfectly with our eco-friendly, caring approach to cleaning.',
      'We support NDIS participants, aged care clients and local families across inner Geelong with reliable, compassionate in-home cleaning.',
      'Our satisfaction guarantee covers every East Geelong clean — your home will be spotless or we make it right.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in East Geelong?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your East Geelong clean in 60 seconds.',
      trust: 'Trusted by East Geelong families, heritage homeowners and waterfront residents.',
    },
    seo: {
      title: 'House Cleaning East Geelong | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in East Geelong VIC. Heritage-aware, police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Geelong', 'Newtown', 'South Geelong', 'Belmont', 'Highton', 'Wandana Heights', 'Manifold Heights'],
  },

  {
    slug: 'house-cleaning-south-geelong',
    name: 'South Geelong',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in South Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'South Geelong'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in South Geelong',
      h2: 'Professional house cleaning in South Geelong & surrounds',
      paragraphs: [
        'South Geelong sits at the edge of Geelong\'s CBD, offering convenient access to the waterfront, Corio Bay and the Barwon River. With a mix of heritage workers\' cottages, renovated terrace homes and modern apartment builds, it\'s a suburb undergoing a quiet renaissance. NATURO GROUP supports that renewal with eco-friendly, professional cleaning.',
        'From South Geelong\'s heritage cottages and renovated terraces to newer apartment buildings, our police-checked team provides regular, deep clean and end-of-lease services — using plant-based products and scheduling that suits busy city-edge living.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across South Geelong & Greater Geelong',
      paragraphs: [
        'South Geelong\'s gentrification has brought a new wave of younger residents, professionals and families who demand quality services. Our trained, insured team delivers that quality consistently — no matter the property size or style.',
        'We service South Geelong, East Geelong, Newtown, Geelong West, Manifold Heights and all of inner Geelong — one trusted team for the city\'s southern fringe.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Vetted, fully insured cleaners ready for South Geelong apartments, terraces and heritage cottages.' },
        { icon: 'clock', title: 'City-edge convenience', body: 'Flexible booking for professionals and young families — morning, afternoon and weekend slots available.' },
        { icon: 'sparkle', title: 'Eco-friendly for all home types', body: 'Non-toxic, plant-based formulas that work equally well on heritage plaster, modern tiles and timber floors.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we embrace South Geelong\'s evolving character and are proud to serve its diverse community with eco-friendly, professional cleaning.',
      'We support NDIS participants, aged care clients and inner-city renters and homeowners across South Geelong with caring, thorough in-home cleaning.',
      'Our satisfaction guarantee covers every clean — book with confidence.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in South Geelong?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your South Geelong clean in 60 seconds.',
      trust: 'Trusted by South Geelong families, young professionals and heritage homeowners.',
    },
    seo: {
      title: 'House Cleaning South Geelong | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in South Geelong VIC. Police-checked & insured. Regular, deep clean, apartments, cottages & end-of-lease.',
    },
    nearbySuburbs: ['Geelong', 'East Geelong', 'Newtown', 'Manifold Heights', 'Geelong West', 'Belmont', 'Herne Hill'],
  },

  {
    slug: 'house-cleaning-geelong-west',
    name: 'Geelong West',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Geelong West VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Geelong West'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Geelong West',
      h2: 'Professional house cleaning in Geelong West & surrounds',
      paragraphs: [
        'Geelong West is one of Geelong\'s most vibrant inner suburbs — home to the beloved Pakington Street strip, with its cafes, boutiques, yoga studios and artisan food stores. It\'s a suburb with genuine personality: heritage homes, tree-lined streets and a community that takes as much pride in their homes as their local strip. NATURO GROUP is the eco-friendly cleaning partner this community deserves.',
        'From Geelong West\'s character cottages and renovated Federation homes to modern townhouses, our police-checked team provides regular, deep clean and end-of-lease services — using plant-based products that align with the suburb\'s progressive values.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Geelong West & Greater Geelong',
      paragraphs: [
        'Geelong West\'s creative, community-minded residents tend to choose service providers whose values align with their own. Our eco-conscious approach — plant-based products, minimal waste, zero harsh chemicals — resonates with this community perfectly.',
        'We service Geelong West, Manifold Heights, Herne Hill, Newtown, South Geelong and the rest of inner Geelong — the trusted eco-friendly cleaning team for the Pakington Street precinct.',
      ],
      points: [
        { icon: 'shield', title: 'Trusted by the Pakington community', body: 'Police-checked, insured cleaners recommended by Geelong West\'s discerning residents.' },
        { icon: 'clock', title: 'Flexible for inner-city living', body: 'Morning, evening and weekend bookings — around café runs, yoga classes and the Geelong West lifestyle.' },
        { icon: 'sparkle', title: 'Genuinely eco-friendly', body: 'Plant-based, biodegradable, cruelty-free products — for a community that chooses its products carefully.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, Geelong West\'s progressive, eco-conscious values feel very much like home. We share them — and we bring that shared ethos to every clean.',
      'We support NDIS participants, aged care clients and local families across Geelong West with caring, compassionate and eco-friendly in-home cleaning.',
      'Our satisfaction guarantee is our promise to the Geelong West community — a spotless, healthy home every time.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier, greener home',
      h2Post: 'in Geelong West?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Geelong West clean in 60 seconds.',
      trust: 'Trusted by Geelong West families, heritage homeowners and the Pakington Street community.',
    },
    seo: {
      title: 'House Cleaning Geelong West | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Geelong West VIC. Plant-based products, police-checked & insured. Regular, deep clean & end-of-lease.',
    },
    nearbySuburbs: ['Geelong', 'Manifold Heights', 'Herne Hill', 'Newtown', 'South Geelong', 'Hamlyn Heights', 'Bell Park'],
  },

  {
    slug: 'house-cleaning-belmont-geelong',
    name: 'Belmont',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Belmont Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Belmont Geelong'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Belmont Geelong',
      h2: 'Professional house cleaning in Belmont & Greater Geelong',
      paragraphs: [
        'Belmont is one of Geelong\'s largest and most popular family suburbs — a sprawling residential area anchored by High Street shopping, good schools and easy access to the Barwon River and Highton. With its wide demographic mix of young families, established homeowners and retirees, Belmont is the heartland of Greater Geelong — and NATURO GROUP is its trusted eco-friendly cleaning partner.',
        'From Belmont\'s brick-veneer classics and 1970s family homes to modern renovations, our police-checked team provides regular, deep clean and end-of-lease services — using non-toxic, biodegradable products and flexible scheduling around school drops, soccer and family life.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Belmont & Greater Geelong',
      paragraphs: [
        'Belmont\'s size and diversity means our team cleans everything from compact three-bedroom homes to large family residences with multiple living areas. We\'re experienced, efficient and consistently thorough — the qualities that matter most to busy Belmont families.',
        'We service Belmont, Highton, East Geelong, Wandana Heights, Grovedale, Waurn Ponds and the southern Geelong corridor, giving the whole area one trusted cleaning team.',
      ],
      points: [
        { icon: 'shield', title: 'Family-trusted cleaners', body: 'Police-checked, insured cleaners trusted by hundreds of Belmont families for regular home cleaning.' },
        { icon: 'clock', title: 'Family-schedule friendly', body: 'Flexible fortnightly or weekly cleans scheduled around school drops, after-school activities and weekends.' },
        { icon: 'sparkle', title: 'Child-safe & pet-safe products', body: 'Non-toxic, plant-based formulas that are completely safe for kids, dogs and the whole family.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, Belmont\'s family-focused community is the backbone of our Geelong service area. We are proud to support so many Belmont households with reliable, eco-friendly cleaning.',
      'We support NDIS participants, aged care clients and local families across Belmont with compassionate, professional in-home cleaning.',
      'Our satisfaction guarantee means your Belmont home is always cleaned to the standard your family deserves.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner family home',
      h2Post: 'in Belmont?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Belmont clean in under 60 seconds.',
      trust: 'Trusted by hundreds of Belmont families, retirees and homeowners across Greater Geelong.',
    },
    seo: {
      title: 'House Cleaning Belmont Geelong | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Belmont Geelong VIC. Family-friendly, police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Geelong', 'Highton', 'East Geelong', 'Wandana Heights', 'Grovedale', 'Waurn Ponds', 'South Geelong'],
  },

  {
    slug: 'house-cleaning-highton',
    name: 'Highton',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Highton Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Highton'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Highton',
      h2: 'Professional house cleaning in Highton & surrounds',
      paragraphs: [
        'Highton is Geelong\'s premier upmarket residential suburb — an elevated, leafy enclave bordering Barwon River bushland reserves and home to Geelong Grammar\'s town campus. With its larger homes, manicured gardens and affluent family community, Highton residents expect a cleaning service that matches the standard of their suburb. NATURO GROUP delivers exactly that.',
        'From Highton\'s large family homes and executive residences to character properties near the Barwon, our police-checked team provides regular, deep clean and end-of-lease services — using eco-friendly products that are safe for children, pets and beautiful timber and stone finishes.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Highton & Greater Geelong',
      paragraphs: [
        'Highton\'s professional families and Geelong Grammar community expect discretion, reliability and thoroughness from their service providers. Our vetted, trained team delivers all three — consistently, on time and to the highest standard.',
        'We service Highton, Belmont, Wandana Heights, East Geelong, Waurn Ponds and the upper Barwon corridor, giving the whole of south Geelong access to the same premium eco-friendly cleaning.',
      ],
      points: [
        { icon: 'shield', title: 'Premium home specialists', body: 'Police-checked cleaners experienced with large family homes, executive residences and Highton\'s quality finishes.' },
        { icon: 'clock', title: 'Discreet, reliable scheduling', body: 'Regular weekly or fortnightly cleans coordinated around school, work and Highton family life.' },
        { icon: 'sparkle', title: 'Premium eco-friendly products', body: 'Plant-based, non-toxic formulas that deliver a luxury-level clean — safe for stone benchtops, timber and premium finishes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, Highton\'s premium homes deserve premium care — and that\'s exactly what our eco-friendly, nursing-trained cleaning standard delivers.',
      'We support NDIS participants, aged care clients and affluent families across Highton with professional, caring and thorough in-home cleaning.',
      'Our satisfaction guarantee is our promise to the Highton community — every clean will meet the standard your home deserves.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'premium clean',
      h2Post: 'in Highton?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Highton clean in under 60 seconds.',
      trust: 'Trusted by Highton families, Geelong Grammar professionals and Greater Geelong homeowners.',
    },
    seo: {
      title: 'House Cleaning Highton | Eco-Friendly Cleaners Geelong VIC',
      description: 'Eco-friendly house cleaning in Highton Geelong VIC. Premium-home specialists, police-checked & insured. Regular, deep clean & end-of-lease.',
    },
    nearbySuburbs: ['Geelong', 'Belmont', 'Wandana Heights', 'East Geelong', 'Waurn Ponds', 'Grovedale', 'Newtown'],
  },

  {
    slug: 'house-cleaning-wandana-heights',
    name: 'Wandana Heights',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Wandana Heights Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Wandana Heights'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Wandana Heights',
      h2: 'Professional house cleaning in Wandana Heights & Geelong',
      paragraphs: [
        'Wandana Heights is an elevated, established residential suburb in Geelong\'s south-east, known for its sweeping bay views, quiet streets and quality family homes. Neighbouring Highton and Belmont, it offers an upmarket lifestyle with a strong community feel. NATURO GROUP brings eco-friendly, professional cleaning to every Wandana Heights home.',
        'From Wandana Heights\' elevated family homes and modern renovations to established brick residences, our police-checked team provides regular, deep clean and end-of-lease services — using plant-based products and flexible scheduling.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Wandana Heights & Greater Geelong',
      paragraphs: [
        'Wandana Heights\' quiet, family-oriented community values reliability and professionalism in home services. Our team delivers both — consistently thorough, insured and on time for every visit.',
        'We service Wandana Heights, Highton, Belmont, East Geelong and the southern Geelong corridor — one trusted eco-friendly team for the whole area.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Vetted, fully insured cleaners ready for Wandana Heights family homes and elevated residences.' },
        { icon: 'clock', title: 'Reliable regular cleans', body: 'Consistent weekly or fortnightly scheduling that keeps your Wandana Heights home at its best.' },
        { icon: 'sparkle', title: 'View-friendly eco products', body: 'Non-toxic, plant-based formulas that won\'t cloud glass or streak windows — ideal for bay-view homes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we are proud to service the elevated streets of Wandana Heights with the professional, eco-friendly cleaning standard this community deserves.',
      'We support NDIS participants, aged care clients and local families with caring, reliable in-home cleaning.',
      'Our satisfaction guarantee covers every clean — your Wandana Heights home will be spotless.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner, healthier home',
      h2Post: 'in Wandana Heights?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Wandana Heights clean in 60 seconds.',
      trust: 'Trusted by Wandana Heights families and homeowners across Greater Geelong.',
    },
    seo: {
      title: 'House Cleaning Wandana Heights | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Wandana Heights Geelong VIC. Police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Highton', 'Belmont', 'East Geelong', 'Waurn Ponds', 'Grovedale', 'Geelong', 'Newtown'],
  },

  {
    slug: 'house-cleaning-manifold-heights',
    name: 'Manifold Heights',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Manifold Heights Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Manifold Heights'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Manifold Heights',
      h2: 'Professional house cleaning in Manifold Heights & inner Geelong',
      paragraphs: [
        'Manifold Heights is a characterful inner suburb of Geelong, nestled between Newtown and Geelong West. With its elevated position, heritage streetscapes and proximity to Kardinia Park, it\'s a suburb that blends Geelong\'s historic charm with a vibrant modern community. NATURO GROUP is proud to bring eco-friendly, professional cleaning to Manifold Heights homes.',
        'From Manifold Heights\' period homes and renovated cottages to modern townhouses, our police-checked team provides regular, deep clean and end-of-lease services — using plant-based products gentle on heritage surfaces and safe for the whole family.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Manifold Heights & inner Geelong',
      paragraphs: [
        'Manifold Heights\' inner-city position and community feel attract professionals, young families and heritage enthusiasts who appreciate quality in their home services. Our eco-friendly, heritage-aware approach fits perfectly.',
        'We service Manifold Heights, Newtown, Geelong West, Herne Hill, South Geelong and all of inner Geelong — one trusted team for the western inner-city corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Heritage-aware cleaning', body: 'Police-checked cleaners trained for period homes, original joinery and heritage plasterwork.' },
        { icon: 'clock', title: 'Inner-city scheduling', body: 'Flexible bookings for professionals, young families and the busy Manifold Heights lifestyle.' },
        { icon: 'sparkle', title: 'Eco-friendly products', body: 'Plant-based, non-toxic formulas that protect period surfaces and are safe for children and pets.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, Manifold Heights\' heritage character aligns perfectly with our eco-friendly, caring approach to cleaning.',
      'We support NDIS participants, aged care clients and inner-Geelong families with professional, compassionate in-home cleaning.',
      'Our satisfaction guarantee means your Manifold Heights home will always be cleaned to the high standard it deserves.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Manifold Heights?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Manifold Heights clean in 60 seconds.',
      trust: 'Trusted by Manifold Heights families, professionals and heritage homeowners in inner Geelong.',
    },
    seo: {
      title: 'House Cleaning Manifold Heights | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Manifold Heights Geelong VIC. Heritage-home specialists, police-checked & insured. Regular, deep clean & more.',
    },
    nearbySuburbs: ['Newtown', 'Geelong West', 'Herne Hill', 'South Geelong', 'Geelong', 'Hamlyn Heights', 'Bell Park'],
  },

  {
    slug: 'house-cleaning-herne-hill',
    name: 'Herne Hill',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Herne Hill Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Herne Hill'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Herne Hill',
      h2: 'Professional house cleaning in Herne Hill & Geelong',
      paragraphs: [
        'Herne Hill is a central western suburb of Geelong, positioned between Geelong West and Hamlyn Heights. With its mix of established family homes, 1960s brick residences and newer renovations, it\'s a comfortable, community-oriented suburb where residents value reliable local services. NATURO GROUP is proud to serve Herne Hill households with eco-friendly, professional cleaning.',
        'From Herne Hill\'s established brick homes and family residences to smaller units and townhouses, our police-checked team provides regular, deep clean and end-of-lease services — using non-toxic products and flexible scheduling.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Herne Hill & Greater Geelong',
      paragraphs: [
        'Herne Hill\'s community of families, retirees and working professionals need a cleaning service that is reliable, affordable and genuinely thorough. Our team delivers all three — on time, every time.',
        'We service Herne Hill, Geelong West, Manifold Heights, Hamlyn Heights, Bell Park and the western Geelong corridor, providing one trusted cleaning team for the whole area.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every NATURO GROUP cleaner is vetted and insured — reliable and trustworthy for Herne Hill homes.' },
        { icon: 'clock', title: 'Consistent scheduling', body: 'Regular fortnightly or weekly cleans that keep Herne Hill homes consistently fresh and clean.' },
        { icon: 'sparkle', title: 'Eco-friendly for all homes', body: 'Plant-based, non-toxic products that work on every surface type found in Herne Hill\'s varied housing stock.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, Herne Hill\'s community spirit and family values align well with our approach to cleaning — respectful, thorough and eco-conscious.',
      'We support NDIS participants, aged care clients and local families across Herne Hill with caring, reliable in-home cleaning.',
      'Our satisfaction guarantee covers every Herne Hill clean — your home will be spotless.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Herne Hill?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Herne Hill clean in 60 seconds.',
      trust: 'Trusted by Herne Hill families, retirees and homeowners across Greater Geelong.',
    },
    seo: {
      title: 'House Cleaning Herne Hill | Eco-Friendly Cleaners Geelong VIC',
      description: 'Eco-friendly house cleaning in Herne Hill Geelong VIC. Police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Geelong West', 'Manifold Heights', 'Hamlyn Heights', 'Bell Park', 'Geelong', 'Newtown', 'Bell Post Hill'],
  },

  {
    slug: 'house-cleaning-hamlyn-heights',
    name: 'Hamlyn Heights',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Hamlyn Heights Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Hamlyn Heights'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Hamlyn Heights',
      h2: 'Professional house cleaning in Hamlyn Heights & Geelong',
      paragraphs: [
        'Hamlyn Heights is a well-established northern Geelong suburb, known for its quiet streets, affordable family homes and convenient location between the city and the Geelong Ring Road. With a diverse mix of families, retirees and long-term residents, it\'s a community that values practical, reliable services. NATURO GROUP delivers exactly that with eco-friendly, professional cleaning.',
        'From Hamlyn Heights\' established family homes and brick veneers to units and townhouses, our police-checked team provides regular, deep clean and end-of-lease services — using non-toxic products and scheduling around the demands of family life.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Hamlyn Heights & Greater Geelong',
      paragraphs: [
        'Hamlyn Heights\' community is working-family Geelong at its most genuine — people who appreciate value, reliability and a job done properly. That\'s exactly the standard we hold ourselves to on every clean.',
        'We service Hamlyn Heights, Herne Hill, Geelong West, Bell Park, Bell Post Hill, Norlane and the northern Geelong corridor — one reliable team for the whole area.',
      ],
      points: [
        { icon: 'shield', title: 'Reliable & insured', body: 'Police-checked cleaners who show up on time and do a thorough job — every visit to your Hamlyn Heights home.' },
        { icon: 'clock', title: 'Family-schedule friendly', body: 'Flexible booking for busy families — fortnightly cleans, one-off deep cleans and school-holiday specials available.' },
        { icon: 'sparkle', title: 'Eco-safe for families', body: 'Plant-based, non-toxic products safe for children, pets and the whole Hamlyn Heights household.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, Hamlyn Heights represents the kind of community we love to serve — honest, hardworking families who deserve a reliable, quality cleaning service.',
      'We support NDIS participants, aged care clients and local families across northern Geelong with caring, professional in-home cleaning.',
      'Our satisfaction guarantee is our commitment to the Hamlyn Heights community — your home will be clean, fresh and healthy after every visit.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless family home',
      h2Post: 'in Hamlyn Heights?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Hamlyn Heights clean in 60 seconds.',
      trust: 'Trusted by Hamlyn Heights families, retirees and homeowners across northern Geelong.',
    },
    seo: {
      title: 'House Cleaning Hamlyn Heights | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Hamlyn Heights Geelong VIC. Police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Herne Hill', 'Geelong West', 'Bell Park', 'Bell Post Hill', 'Norlane', 'Geelong', 'Manifold Heights'],
  },

  {
    slug: 'house-cleaning-bell-park',
    name: 'Bell Park',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Bell Park Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Bell Park'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Bell Park',
      h2: 'Professional house cleaning in Bell Park & northern Geelong',
      paragraphs: [
        'Bell Park is an established northern suburb of Geelong, known for its quiet streets, fibro and weatherboard homes and tight-knit community. Bordered by Hamlyn Heights and Norlane, it\'s a suburb with genuine character and a strong sense of local pride. NATURO GROUP is proud to serve Bell Park homes with eco-friendly, professional cleaning.',
        'From Bell Park\'s older fibro homes and established family residences to renovated properties, our police-checked team provides regular, deep clean and end-of-lease services — using plant-based products and flexible scheduling.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Bell Park & northern Geelong',
      paragraphs: [
        'Bell Park\'s community of established families and long-term residents appreciate service providers who respect their homes and community. Our team brings that respect with every clean — thorough, insured and on time.',
        'We service Bell Park, Hamlyn Heights, Norlane, Geelong West, Herne Hill, Bell Post Hill and the broader northern Geelong corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Vetted, fully insured cleaners who respect Bell Park homes and take care of every surface.' },
        { icon: 'clock', title: 'Consistent scheduling', body: 'Regular fortnightly or weekly cleans that keep Bell Park homes fresh and tidy year-round.' },
        { icon: 'sparkle', title: 'Eco-friendly products', body: 'Non-toxic, plant-based formulas safe for children, pets and Bell Park households of all ages.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we respect the character and community pride of suburbs like Bell Park, and we bring that same care to every home we clean.',
      'We support NDIS participants, aged care clients and local families across northern Geelong with reliable, compassionate in-home cleaning.',
      'Our satisfaction guarantee means your Bell Park home will always be cleaned to the standard you deserve.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Bell Park?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Bell Park clean in under 60 seconds.',
      trust: 'Trusted by Bell Park families, retirees and homeowners across northern Geelong.',
    },
    seo: {
      title: 'House Cleaning Bell Park | Eco-Friendly Cleaners Geelong VIC',
      description: 'Eco-friendly house cleaning in Bell Park Geelong VIC. Police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Hamlyn Heights', 'Norlane', 'Geelong West', 'Herne Hill', 'Bell Post Hill', 'Corio', 'Geelong'],
  },

  {
    slug: 'house-cleaning-bell-post-hill',
    name: 'Bell Post Hill',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Bell Post Hill Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Bell Post Hill'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Bell Post Hill',
      h2: 'Professional house cleaning in Bell Post Hill & Geelong',
      paragraphs: [
        'Bell Post Hill is an outer western suburb of Geelong, popular with families seeking more space and quieter streets without straying too far from the city. With its larger residential blocks, newer estates and established family homes, it\'s a growing community that values quality local services. NATURO GROUP is proud to serve Bell Post Hill with eco-friendly, professional cleaning.',
        'From Bell Post Hill\'s modern family homes and larger residential blocks to established brick residences, our police-checked team provides regular, deep clean and end-of-lease services — using plant-based products and flexible scheduling.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Bell Post Hill & western Geelong',
      paragraphs: [
        'Bell Post Hill\'s growing family community needs a cleaning service that is reliable, thorough and understands the demands of larger homes. Our trained, insured team delivers exactly that.',
        'We service Bell Post Hill, Hamlyn Heights, Herne Hill, Bell Park, North Shore and the western Geelong corridor — one reliable team for the whole area.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every NATURO GROUP cleaner is vetted and insured — ready for Bell Post Hill family homes of all sizes.' },
        { icon: 'clock', title: 'Flexible for family life', body: 'Regular fortnightly or weekly cleans scheduled around school, sport and the Bell Post Hill family routine.' },
        { icon: 'sparkle', title: 'Eco-safe for families', body: 'Plant-based, non-toxic formulas safe for children, pets and everyone in the household.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we\'re proud to support Bell Post Hill\'s growing family community with eco-friendly, reliable and professional cleaning.',
      'We support NDIS participants, aged care clients and families with caring, thorough in-home cleaning.',
      'Our satisfaction guarantee applies to every Bell Post Hill clean — your home will be spotless.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner family home',
      h2Post: 'in Bell Post Hill?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Bell Post Hill clean in 60 seconds.',
      trust: 'Trusted by Bell Post Hill families and homeowners across western Geelong.',
    },
    seo: {
      title: 'House Cleaning Bell Post Hill | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Bell Post Hill Geelong VIC. Police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Hamlyn Heights', 'Herne Hill', 'Bell Park', 'North Shore', 'Corio', 'Geelong West', 'Geelong'],
  },

  {
    slug: 'house-cleaning-norlane',
    name: 'Norlane',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Norlane Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Norlane'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Norlane',
      h2: 'Professional house cleaning in Norlane & northern Geelong',
      paragraphs: [
        'Norlane is a large northern Geelong suburb undergoing exciting urban renewal, with community investment transforming its streets, parks and housing stock. Close to Corio Bay and just north of the city, it\'s home to a diverse community of families, workers and long-term residents. NATURO GROUP is proud to be part of Norlane\'s future with eco-friendly, professional cleaning.',
        'From Norlane\'s diverse housing — from older fibro homes and commission estates to newer renovations — our police-checked team provides regular, deep clean and end-of-lease services using safe, eco-friendly products and affordable pricing.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Norlane & northern Geelong',
      paragraphs: [
        'Norlane\'s community is resilient and community-focused — and our team respects that resilience with professional, reliable service that makes a real difference in people\'s homes and daily lives.',
        'We service Norlane, Corio, North Shore, Bell Park, Hamlyn Heights and the northern Geelong corridor — one trusted cleaning team for the whole area.',
      ],
      points: [
        { icon: 'shield', title: 'Caring, professional cleaners', body: 'Police-checked, insured cleaners who treat every Norlane home with the same care and respect.' },
        { icon: 'clock', title: 'Affordable, flexible scheduling', body: 'Regular and one-off cleans that fit around busy Norlane family schedules and budgets.' },
        { icon: 'sparkle', title: 'Eco-friendly & family-safe', body: 'Non-toxic, plant-based products that are safe for children and pets — important for family homes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we believe every Geelong suburb deserves access to professional, eco-friendly cleaning — including Norlane\'s diverse, hardworking community.',
      'We support NDIS participants, aged care clients and local families in Norlane with compassionate, professional in-home cleaning that makes a real difference.',
      'Our satisfaction guarantee covers every Norlane clean — your home will be fresh, clean and healthy after every visit.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner home',
      h2Post: 'in Norlane?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Norlane clean in under 60 seconds.',
      trust: 'Trusted by Norlane families and homeowners across northern Geelong.',
    },
    seo: {
      title: 'House Cleaning Norlane | Eco-Friendly Cleaners Geelong VIC',
      description: 'Eco-friendly house cleaning in Norlane Geelong VIC. Police-checked & insured. Affordable regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Corio', 'North Shore', 'Bell Park', 'Hamlyn Heights', 'Geelong West', 'Bell Post Hill', 'Geelong'],
  },

  {
    slug: 'house-cleaning-north-shore-geelong',
    name: 'North Shore',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in North Shore Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'North Shore Geelong'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in North Shore Geelong',
      h2: 'Professional house cleaning in North Shore & Geelong',
      paragraphs: [
        'North Shore is a northern Geelong suburb situated between Norlane and Avalon, near Corio Bay. With its mix of established homes and industrial heritage, it\'s a community with genuine character and a proud working-class history. NATURO GROUP brings eco-friendly, professional cleaning to North Shore homes.',
        'From North Shore\'s established family homes to newer renovations and units, our police-checked team provides regular, deep clean and end-of-lease services — with eco-friendly products and flexible scheduling that suits the North Shore community.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across North Shore & northern Geelong',
      paragraphs: [
        'North Shore\'s community values straightforward, reliable services from people who show up when they say they will and do a thorough job. That\'s exactly what NATURO GROUP delivers — every time.',
        'We service North Shore, Norlane, Corio, Bell Park, Hamlyn Heights and the northern Geelong corridor — one trusted team for the whole area.',
      ],
      points: [
        { icon: 'shield', title: 'Reliable & insured', body: 'Police-checked cleaners who show up on time and clean thoroughly — every visit to your North Shore home.' },
        { icon: 'clock', title: 'No-fuss scheduling', body: 'Straightforward booking, clear pricing and flexible appointment times for North Shore families.' },
        { icon: 'sparkle', title: 'Eco-friendly products', body: 'Plant-based, non-toxic formulas that deliver a genuine deep clean safely for your family and pets.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we respect North Shore\'s hardworking community and are proud to support its households with professional, eco-friendly cleaning.',
      'We support NDIS participants, aged care clients and local families with reliable, caring in-home cleaning.',
      'Our satisfaction guarantee covers every North Shore clean — your home will be spotless or we make it right.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in North Shore?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your North Shore Geelong clean in 60 seconds.',
      trust: 'Trusted by North Shore families and homeowners across northern Geelong.',
    },
    seo: {
      title: 'House Cleaning North Shore Geelong | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in North Shore Geelong VIC. Police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Norlane', 'Corio', 'Bell Park', 'Hamlyn Heights', 'Bell Post Hill', 'Lara', 'Geelong'],
  },

  {
    slug: 'house-cleaning-corio',
    name: 'Corio',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Corio Geelong VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Corio'],
      tagline: 'Trusted, Trained and Thorough — across Greater Geelong',
    },
    intro: {
      kicker: 'House cleaning in Corio',
      h2: 'Professional house cleaning in Corio & northern Geelong',
      paragraphs: [
        'Corio is one of northern Geelong\'s largest suburbs — a diverse, community-focused area that has undergone significant renewal since the closure of Ford\'s Australian manufacturing. New estates are emerging alongside established streets, bringing fresh energy to a community with deep local roots. NATURO GROUP is proud to serve Corio\'s evolving households with eco-friendly, professional cleaning.',
        'From Corio\'s older established homes and commission housing to newer estates and renovated properties, our police-checked team provides regular, deep clean and end-of-lease services — with plant-based products and affordable, flexible scheduling.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Corio & northern Geelong',
      paragraphs: [
        'Corio\'s community is one of Geelong\'s most diverse — young families, retirees, NDIS participants and workers who need a reliable cleaning service that respects their home and their budget. NATURO GROUP delivers all of that.',
        'We service Corio, Norlane, North Shore, Bell Park, Hamlyn Heights, Lara and the entire northern Geelong corridor — one reliable team for the area.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & caring', body: 'Vetted, insured cleaners who take care of every Corio home with genuine professionalism and respect.' },
        { icon: 'clock', title: 'Affordable, flexible scheduling', body: 'Regular and one-off cleans at prices and times that work for Corio\'s diverse households.' },
        { icon: 'sparkle', title: 'Eco-safe for all families', body: 'Non-toxic, plant-based products that are safe for children, elderly residents and pets.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, Corio represents the kind of diverse, resilient community we are proud to support with professional, eco-friendly cleaning that makes a real difference.',
      'We support NDIS participants, aged care clients, DVA recipients and local families across Corio with caring, professional in-home cleaning.',
      'Our satisfaction guarantee covers every Corio clean — your home will be clean, fresh and healthy every time.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner, healthier home',
      h2Post: 'in Corio?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Corio clean in under 60 seconds.',
      trust: 'Trusted by Corio families, NDIS participants and homeowners across northern Geelong.',
    },
    seo: {
      title: 'House Cleaning Corio | Eco-Friendly Cleaners Geelong VIC',
      description: 'Eco-friendly house cleaning in Corio Geelong VIC. Police-checked & insured. Affordable regular, deep clean, NDIS & end-of-lease services.',
    },
    nearbySuburbs: ['Norlane', 'North Shore', 'Bell Park', 'Hamlyn Heights', 'Lara', 'Bell Post Hill', 'Geelong'],
  },

  {
    slug: 'house-cleaning-lara',
    name: 'Lara',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Geelong',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Lara VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Lara'],
      tagline: 'Trusted, Trained and Thorough — between Geelong and Melbourne',
    },
    intro: {
      kicker: 'House cleaning in Lara',
      h2: 'Professional house cleaning in Lara & Greater Geelong',
      paragraphs: [
        'Lara is one of Victoria\'s fastest-growing suburbs — a bustling commuter town between Geelong and Melbourne that has exploded in population over the past decade. With its large modern estates, dual-income families and new-build homes, Lara is the definition of contemporary suburban Victoria. NATURO GROUP is the eco-friendly cleaning partner this dynamic community needs.',
        'From Lara\'s new housing estates and modern family homes to established properties near the Lara Town Centre, our police-checked team provides regular, deep clean and end-of-lease services — with child-safe, eco-friendly products and flexible scheduling around commuter and school routines.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Lara & the Geelong-Melbourne corridor',
      paragraphs: [
        'Lara\'s dual-income families and busy commuters often don\'t have time to clean thoroughly — and that\'s exactly where NATURO GROUP comes in. We provide the reliable, high-quality clean that busy Lara households need, on a schedule that works around the commute.',
        'We service Lara, Corio, North Shore, Ocean Grove, Geelong and the Geelong-Melbourne freeway corridor, making us the ideal cleaning partner for the whole outer Greater Geelong region.',
      ],
      points: [
        { icon: 'shield', title: 'Trusted by Lara families', body: 'Police-checked, insured cleaners trusted by hundreds of Lara households for regular home cleaning.' },
        { icon: 'clock', title: 'Commuter-schedule friendly', body: 'Flexible fortnightly or weekly cleans scheduled around Melbourne commutes, school drops and Lara family life.' },
        { icon: 'sparkle', title: 'Child-safe & eco-friendly', body: 'Plant-based, non-toxic formulas safe for babies, toddlers, pets and new-build home finishes.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, Lara\'s growth and energy inspire us — we are proud to support one of Victoria\'s most dynamic communities with professional, eco-friendly cleaning.',
      'We support NDIS participants, aged care clients and busy families across Lara with reliable, caring in-home cleaning that makes a real difference.',
      'Our satisfaction guarantee covers every Lara clean — book with confidence.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'cleaner family home',
      h2Post: 'in Lara?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Lara clean in under 60 seconds.',
      trust: 'Trusted by Lara families, commuters and homeowners between Geelong and Melbourne.',
    },
    seo: {
      title: 'House Cleaning Lara VIC | Eco-Friendly Cleaners Geelong',
      description: 'Eco-friendly house cleaning in Lara VIC. Police-checked & insured. Regular, deep clean & end-of-lease for Lara\'s growing community.',
    },
    nearbySuburbs: ['Geelong', 'Corio', 'North Shore', 'Norlane', 'Ocean Grove', 'Werribee', 'Little River'],
  },

  {
    slug: 'house-cleaning-curlewis',
    name: 'Curlewis',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Bellarine Peninsula',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Curlewis VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Curlewis'],
      tagline: 'Trusted, Trained and Thorough — on the Bellarine Peninsula',
    },
    intro: {
      kicker: 'House cleaning in Curlewis',
      h2: 'Professional house cleaning in Curlewis & the Bellarine',
      paragraphs: [
        'Curlewis is a fast-growing community on the Bellarine Peninsula, situated between Drysdale and Clifton Springs. With its new housing estates, rural lifestyle blocks and stunning bay views, it\'s attracting young families and sea-changers from Melbourne and Geelong alike. NATURO GROUP brings professional, eco-friendly cleaning to this emerging Bellarine community.',
        'From Curlewis\'s new estate homes and rural residential blocks to established properties, our police-checked team provides regular, deep clean and end-of-lease services — using eco-friendly products and flexible scheduling that suits the Bellarine lifestyle.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Curlewis & the Bellarine Peninsula',
      paragraphs: [
        'Curlewis\'s growing community of new-home owners, young families and Bellarine lifestyle seekers needs a reliable, quality cleaning service they can trust from day one. NATURO GROUP is that service.',
        'We service Curlewis, Drysdale, Clifton Springs, Ocean Grove, Barwon Heads, Leopold and the whole Bellarine Peninsula — one trusted eco-friendly team for the entire region.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Vetted, fully insured cleaners ready for Curlewis new-builds, estate homes and rural residential properties.' },
        { icon: 'clock', title: 'Flexible for new-home owners', body: 'Regular fortnightly cleans, post-renovation deep cleans and end-of-lease services — all scheduled around your routine.' },
        { icon: 'sparkle', title: 'Bay-safe eco products', body: 'Biodegradable, non-toxic formulas that protect Corio Bay and Port Phillip Bay\'s marine environment.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we love being part of Curlewis\'s growth story — bringing eco-friendly, professional cleaning to a community that is building its future on the Bellarine.',
      'We support NDIS participants, aged care clients and new-home owners across Curlewis with reliable, caring in-home cleaning.',
      'Our satisfaction guarantee covers every Curlewis clean — your home will be spotless from the very first visit.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Curlewis?',
      sub: 'Eco-friendly products, police-checked cleaners and easy online booking — book your Curlewis clean in 60 seconds.',
      trust: 'Trusted by Curlewis families, new-home owners and Bellarine Peninsula residents.',
    },
    seo: {
      title: 'House Cleaning Curlewis | Eco-Friendly Cleaners Bellarine VIC',
      description: 'Eco-friendly house cleaning in Curlewis on the Bellarine Peninsula VIC. Police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Drysdale', 'Clifton Springs', 'Portarlington', 'Ocean Grove', 'Barwon Heads', 'Leopold', 'Geelong'],
  },

  {
    slug: 'house-cleaning-armstrong-creek',
    name: 'Armstrong Creek',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Geelong & Bellarine',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Armstrong Creek VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Armstrong Creek'],
      tagline: 'Trusted, Trained and Thorough — Geelong\'s fastest-growing suburb',
    },
    intro: {
      kicker: 'House cleaning in Armstrong Creek',
      h2: 'Professional house cleaning in Armstrong Creek & surrounds',
      paragraphs: [
        'Armstrong Creek is Geelong\'s fastest-growing suburb — a modern urban community of new estates, townhouses and family homes spreading south of the Ring Road. NATURO GROUP\'s eco-friendly cleaners are a natural fit for the community\'s health-conscious, family-first values.',
        'From the Warralily and OakLeigh estates to Mount Duneed and Grovedale, our police-checked team services regular cleans, deep cleans and end-of-lease cleans — using non-toxic, biodegradable products and flexible scheduling built around Armstrong Creek family life.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Armstrong Creek & south Geelong',
      paragraphs: [
        'Armstrong Creek\'s young families, dual-income households and new-home owners need a reliable cleaning service from day one. NATURO GROUP delivers consistent, thorough cleans — same cleaner, same standard, every visit.',
        'We service Armstrong Creek, Grovedale, Waurn Ponds, Mount Duneed and the wider south Geelong corridor — police-checked cleaners, eco-friendly products, satisfaction guaranteed.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every cleaner is vetted and fully insured — essential for new estates where trust matters from the first visit.' },
        { icon: 'clock', title: 'Built around family life', body: 'Weekly or fortnightly cleans scheduled around school drop-offs, sports rosters and the Surf Coast commute.' },
        { icon: 'sparkle', title: 'Safe for new homes', body: 'Non-toxic, biodegradable products safe for children, pets and the pristine finishes in Armstrong Creek\'s new builds.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we are proud to serve Armstrong Creek — one of Australia\'s fastest-growing communities and a suburb that perfectly reflects our values of health, family and sustainability.',
      'We support NDIS participants, aged care clients and working families across Armstrong Creek with reliable, caring in-home cleaning backed by our nursing-standard approach.',
      'Every Armstrong Creek clean is covered by our satisfaction guarantee — your home will be spotless from the first visit.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Armstrong Creek?',
      sub: 'Eco-friendly products, police-checked cleaners and instant online booking — sorted in 60 seconds.',
      trust: 'Trusted by Armstrong Creek families, new-home owners and the Geelong south corridor.',
    },
    seo: {
      title: 'House Cleaning Armstrong Creek | Eco-Friendly Geelong Cleaners',
      description: 'Eco-friendly house cleaning in Armstrong Creek VIC. Police-checked & insured. Regular, deep clean & end-of-lease for Geelong\'s fastest-growing suburb.',
    },
    nearbySuburbs: ['Grovedale', 'Waurn Ponds', 'Mount Duneed', 'Highton', 'Belmont', 'Ocean Grove', 'Geelong'],
  },

  {
    slug: 'house-cleaning-grovedale',
    name: 'Grovedale',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Geelong & Bellarine',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Grovedale VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Grovedale'],
      tagline: 'Trusted, Trained and Thorough — south Geelong',
    },
    intro: {
      kicker: 'House cleaning in Grovedale',
      h2: 'Professional house cleaning in Grovedale & south Geelong',
      paragraphs: [
        'Grovedale is a well-established family suburb in south Geelong, bordering Highton and Waurn Ponds along the Surf Coast corridor. Its mix of 1980s–2000s brick homes, young families and retirees makes it one of the region\'s most consistent markets for regular domestic cleaning.',
        'NATURO GROUP\'s Grovedale cleaners bring eco-friendly, police-checked service to family homes, units and rental properties across the suburb — with the same thoroughness we apply everywhere in the Geelong region.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners in Grovedale & the south Geelong corridor',
      paragraphs: [
        'From Grovedale\'s family streets to the Waurn Ponds shopping corridor, our police-checked team is a reliable, consistent presence — same cleaner, same standard, every fortnight.',
        'We also service Waurn Ponds, Highton, Belmont, Armstrong Creek and Mount Duneed — one trusted team for the whole south Geelong area.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every cleaner is vetted and covered for $20m public liability — trusted in Grovedale homes for years.' },
        { icon: 'clock', title: 'Consistent scheduling', body: 'Weekly or fortnightly cleans that fit around Grovedale school timetables, work rosters and the Surf Coast lifestyle.' },
        { icon: 'sparkle', title: 'Eco-friendly products', body: 'Non-toxic, biodegradable formulas safe for children, pets and Grovedale\'s established gardens.' },
      ],
    },
    founderBody: [
      'NATURO GROUP has been cleaning Grovedale homes to nursing-grade standards since our founding — thorough, consistent and always eco-friendly.',
      'We support NDIS participants, aged care recipients and busy Grovedale families with reliable, caring in-home cleaning.',
      'Our satisfaction guarantee covers every Grovedale clean — no shortcuts, no compromises.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Grovedale?',
      sub: 'Eco-friendly products, police-checked cleaners and instant online booking — done in 60 seconds.',
      trust: 'Trusted by Grovedale families, retirees and south Geelong homeowners.',
    },
    seo: {
      title: 'House Cleaning Grovedale VIC | Eco-Friendly South Geelong Cleaners',
      description: 'Eco-friendly house cleaning in Grovedale VIC. Police-checked & insured. Regular, deep clean & end-of-lease services for south Geelong families.',
    },
    nearbySuburbs: ['Waurn Ponds', 'Highton', 'Belmont', 'Armstrong Creek', 'Mount Duneed', 'Geelong', 'Torquay'],
  },

  {
    slug: 'house-cleaning-waurn-ponds',
    name: 'Waurn Ponds',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Geelong & Bellarine',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Waurn Ponds VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Waurn Ponds'],
      tagline: 'Trusted, Trained and Thorough — Deakin University corridor',
    },
    intro: {
      kicker: 'House cleaning in Waurn Ponds',
      h2: 'Professional house cleaning in Waurn Ponds & surrounds',
      paragraphs: [
        'Waurn Ponds is home to Deakin University\'s Geelong Waurn Ponds campus, a major shopping centre and a growing mix of student accommodation, family homes and newer estates. NATURO GROUP provides reliable eco-friendly cleaning to this diverse south-west Geelong community.',
        'From the university precinct and the Ring Road corridor to established family streets, our police-checked team delivers regular, deep clean and end-of-lease services — using non-toxic products and flexible scheduling that suits students, families and professionals alike.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners in Waurn Ponds & south-west Geelong',
      paragraphs: [
        'Whether you\'re a Deakin student, a working family or a retiree in Waurn Ponds, NATURO GROUP delivers the same professional, eco-friendly clean every time.',
        'We cover Waurn Ponds, Grovedale, Highton, Armstrong Creek, Mount Duneed and the surrounding south Geelong suburbs — one trusted team for the whole corridor.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every cleaner is police-checked and fully insured — trusted in Waurn Ponds homes and student rentals.' },
        { icon: 'clock', title: 'Flexible for uni & family life', body: 'Cleans that work around university semesters, family timetables and the Surf Coast commute.' },
        { icon: 'sparkle', title: 'Non-toxic products', body: 'Biodegradable, plant-based formulas safe for students, families, pets and Waurn Ponds\' natural surrounds.' },
      ],
    },
    founderBody: [
      'NATURO GROUP brings the same nursing-standard cleaning to Waurn Ponds that we deliver across the entire Geelong region — thorough, reliable and always eco-friendly.',
      'We support NDIS participants, aged care clients and busy households across Waurn Ponds with tailored, caring in-home cleaning.',
      'Every Waurn Ponds clean is backed by our satisfaction guarantee — spotless from the first visit.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Waurn Ponds?',
      sub: 'Eco-friendly products, police-checked cleaners and instant online booking — sorted in 60 seconds.',
      trust: 'Trusted by Waurn Ponds families, students and south Geelong homeowners.',
    },
    seo: {
      title: 'House Cleaning Waurn Ponds VIC | Eco-Friendly Geelong Cleaners',
      description: 'Eco-friendly house cleaning in Waurn Ponds VIC near Deakin University. Police-checked & insured. Regular, deep clean & end-of-lease services.',
    },
    nearbySuburbs: ['Grovedale', 'Highton', 'Armstrong Creek', 'Mount Duneed', 'Belmont', 'Geelong', 'Torquay'],
  },

  {
    slug: 'house-cleaning-mount-duneed',
    name: 'Mount Duneed',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Geelong & Bellarine',
    heroImage: '/images/suburbs/house-cleaning-geelong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Mount Duneed VIC',
    ogImage: '/images/suburbs/house-cleaning-geelong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Mount Duneed'],
      tagline: 'Trusted, Trained and Thorough — Geelong\'s southern growth corridor',
    },
    intro: {
      kicker: 'House cleaning in Mount Duneed',
      h2: 'Professional house cleaning in Mount Duneed & south Geelong',
      paragraphs: [
        'Mount Duneed is a rapidly developing suburb on the southern edge of Geelong, adjacent to the Surf Coast Highway and close to Torquay. Its growing collection of new estates, modern family homes and semi-rural properties makes it one of the most exciting communities in the Geelong region.',
        'NATURO GROUP\'s eco-friendly cleaners service Mount Duneed\'s new-build homes, acreage properties and estate residences — with police-checked staff, non-toxic products and flexible scheduling built around the southern Geelong lifestyle.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners in Mount Duneed & the Surf Coast gateway',
      paragraphs: [
        'Mount Duneed sits at the gateway to the Surf Coast, making it a popular choice for families who want easy access to both Geelong and Torquay. NATURO GROUP serves this growing community with professional, eco-friendly cleaning.',
        'We cover Mount Duneed, Armstrong Creek, Grovedale, Waurn Ponds and the Surf Coast corridor — one trusted team, consistent results.',
      ],
      points: [
        { icon: 'shield', title: 'Police-checked & insured', body: 'Every cleaner is vetted and insured — trusted for new-build estates and rural residential properties in Mount Duneed.' },
        { icon: 'clock', title: 'Built for the Surf Coast lifestyle', body: 'Flexible cleans scheduled around beach weekends, Torquay commutes and Geelong school timetables.' },
        { icon: 'sparkle', title: 'Eco-friendly for new homes', body: 'Non-toxic, biodegradable products safe for children, pets and the pristine finishes in Mount Duneed\'s new builds.' },
      ],
    },
    founderBody: [
      'NATURO GROUP is proud to serve Mount Duneed as part of our commitment to the entire Geelong south corridor — from Armstrong Creek to the Surf Coast.',
      'We support NDIS participants, aged care clients and new-home owners across Mount Duneed with reliable, caring in-home cleaning.',
      'Our satisfaction guarantee covers every Mount Duneed clean — your home will be spotless from the very first visit.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'spotless home',
      h2Post: 'in Mount Duneed?',
      sub: 'Eco-friendly products, police-checked cleaners and instant online booking — sorted in 60 seconds.',
      trust: 'Trusted by Mount Duneed families, new-home owners and the southern Geelong corridor.',
    },
    seo: {
      title: 'House Cleaning Mount Duneed VIC | Eco-Friendly Geelong Cleaners',
      description: 'Eco-friendly house cleaning in Mount Duneed VIC near Torquay. Police-checked & insured. Regular, deep clean & end-of-lease for Geelong\'s south.',
    },
    nearbySuburbs: ['Armstrong Creek', 'Grovedale', 'Waurn Ponds', 'Highton', 'Torquay', 'Jan Juc', 'Geelong'],
  },

  {
    slug: 'cleaners-ballarat',
    name: 'Ballarat',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Central Highlands',
    heroImage: '/images/suburbs/cleaners-ballarat.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Ballarat VIC',
    ogImage: '/images/suburbs/cleaners-ballarat.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Ballarat'],
      tagline: 'Trusted, Trained and Thorough — across the Central Highlands',
    },
    intro: {
      kicker: 'House cleaning in Ballarat',
      h2: 'Best house cleaning in Ballarat & the Central Highlands',
      paragraphs: [
        'Ballarat is one of Victoria\u2019s great regional cities \u2014 a gold-rush town turned thriving regional centre, with heritage Victorian homes, restored cottages around Lake Wendouree and modern family suburbs in Alfredton, Lucas and Sebastopol. NATURO GROUP\u2019s Ballarat cleaners use eco-friendly products that protect period joinery and suit the cooler highland climate.',
        'From central Ballarat and Lake Wendouree to Alfredton, Lucas, Sebastopol, Mount Pleasant and Wendouree, our trained, police-checked team services heritage homes, family houses and rentals \u2014 with the reliability locals expect.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Ballarat & the Central Highlands',
      paragraphs: [
        'Ballarat is home to around 115,000 residents \u2014 a regional centre anchored by Federation University, Sovereign Hill, the Begonia Festival and a growing health and education sector. The household mix spans heritage homes, established family suburbs and new estates in growth corridors.',
        'Our team also services Lake Wendouree, Alfredton, Lucas, Sebastopol, Mount Pleasant, Buninyong and Wendouree \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Ballarat cleaners', body: 'A trained, police-checked team that knows Ballarat \u2014 from Lake Wendouree heritage homes to Lucas family houses.' },
        { icon: 'clock', title: 'Bookings that suit Ballarat life', body: 'Weekly, fortnightly or one-off cleans scheduled around the V/Line, school runs and weekend trips to Melbourne.' },
        { icon: 'sparkle', title: 'Heritage- and asthma-friendly', body: 'Plant-based, low-fume products that protect Federation joinery and are kind to sensitive lungs in the cool climate.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Ballarat homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Central Highlands with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Ballarat client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Ballarat?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Ballarat clean in under 60 seconds.',
      trust: 'Trusted by Ballarat families, retirees and heritage homeowners.',
    },
    seo: {
      title: 'House Cleaning Ballarat | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Ballarat, Lake Wendouree, Alfredton, Lucas & Sebastopol. Heritage-home friendly. Police-checked, fully insured.',
    },
    nearbySuburbs: ['Ballarat Central', 'Ballarat East', 'Ballarat North', 'Lake Wendouree', 'Wendouree', 'Soldiers Hill', 'Black Hill', 'Nerrina', 'Brown Hill', 'Mount Pleasant', 'Mount Clear', 'Mount Helen', 'Sebastopol', 'Delacombe', 'Alfredton', 'Lucas', 'Buninyong', 'Cardigan', 'Smythes Creek', 'Miners Rest', 'Invermay', 'Warrenheip'],
  },

  {
    slug: 'cleaners-dandenong',
    name: 'Dandenong',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Greater Dandenong',
    heroImage: '/images/suburbs/cleaners-dandenong.jpg',
    heroImageAlt: 'Eco-friendly house cleaning in Dandenong VIC',
    ogImage: '/images/suburbs/cleaners-dandenong.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Dandenong'],
      tagline: 'Trusted, Trained and Thorough — across Greater Dandenong',
    },
    intro: {
      kicker: 'House cleaning in Dandenong',
      h2: 'Best house cleaning in Dandenong & the South-East',
      paragraphs: [
        'Dandenong is the multicultural heart of Melbourne\u2019s south-east \u2014 a fast-growing city of weatherboard family homes, brick veneer suburban houses and modern townhouses on the doorstep of the Dandenong Ranges. NATURO GROUP\u2019s Dandenong cleaners use eco-friendly products that suit busy multigenerational households and the family pets that come with them.',
        'From Dandenong CBD and Dandenong North to Noble Park, Springvale, Keysborough and Endeavour Hills, our trained, police-checked team services family homes, rentals and aged-care residences \u2014 with the consistency locals expect.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Dandenong & the South-East',
      paragraphs: [
        'Greater Dandenong is home to around 165,000 residents \u2014 one of the most culturally diverse local government areas in Australia, with strong manufacturing, healthcare and retail sectors. We work with multigenerational families, NDIS participants and aged-care recipients across the region.',
        'Our team also services Noble Park, Springvale, Keysborough, Endeavour Hills, Hallam, Doveton and Dandenong North \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Dandenong cleaners', body: 'A trained, police-checked team that knows the south-east \u2014 from Springvale townhouses to Endeavour Hills family homes.' },
        { icon: 'clock', title: 'Bookings that fit family life', body: 'Weekly, fortnightly or one-off cleans scheduled around shift work, school runs and family commitments.' },
        { icon: 'sparkle', title: 'Eco-friendly, kid- and pet-safe', body: 'Plant-based products that are gentle on hardwood floors, asthma-prone kids and the family dog.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Dandenong homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across Greater Dandenong with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Dandenong client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Dandenong?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Dandenong clean in under 60 seconds.',
      trust: 'Trusted by Dandenong families, multigenerational households and NDIS participants.',
    },
    seo: {
      title: 'House Cleaning Dandenong | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Dandenong, Noble Park, Springvale, Keysborough & Endeavour Hills. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Dandenong North', 'Dandenong South', 'Springvale', 'Springvale South', 'Noble Park', 'Noble Park North', 'Keysborough', 'Bangholme', 'Endeavour Hills', 'Hallam', 'Lyndhurst', 'Doveton', 'Lynbrook', 'Eumemmerring', 'Berwick', 'Narre Warren', 'Hampton Park', 'Cranbourne'],
  },

  {
    slug: 'cleaners-mornington',
    name: 'Mornington',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Mornington Peninsula',
    heroImage: '/images/suburbs/cleaners-mornington.jpg',
    heroImageAlt: 'Eco-friendly house cleaning on the Mornington Peninsula VIC',
    ogImage: '/images/suburbs/cleaners-mornington.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Mornington'],
      tagline: 'Trusted, Trained and Thorough — across the Mornington Peninsula',
    },
    intro: {
      kicker: 'House cleaning in Mornington',
      h2: 'Best house cleaning in Mornington & the Peninsula',
      paragraphs: [
        'Mornington sits on the bay-side of the Mornington Peninsula \u2014 a community of beachside cottages, modern family homes and weekenders overlooking Port Phillip Bay. NATURO GROUP\u2019s Mornington cleaners use eco-friendly products that suit coastal finishes and the bay catchment.',
        'From Mornington and Mount Martha to Mount Eliza, Frankston South, Safety Beach, Dromana and Rosebud, our trained, police-checked team services family homes, weekenders and holiday lets \u2014 with the consistency Peninsula life demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Mornington & the Peninsula',
      paragraphs: [
        'Mornington anchors the bay side of the Mornington Peninsula \u2014 a region of around 170,000 residents and one of Melbourne\u2019s favourite weekend escapes. The household mix spans long-term locals, retirees, weekender owners and short-stay hosts.',
        'Our team also services Mount Martha, Mount Eliza, Frankston South, Safety Beach, Dromana, Rosebud and Sorrento \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Peninsula cleaners', body: 'A trained, police-checked team that knows the Peninsula \u2014 from Mount Martha beach houses to Mount Eliza family homes.' },
        { icon: 'clock', title: 'Bookings that suit weekender life', body: 'Friday turnovers, Sunday resets, weekly maintenance \u2014 schedule around school holidays and visiting family.' },
        { icon: 'sparkle', title: 'Bay- and ocean-friendly', body: 'Plant-based, biodegradable products that protect Port Phillip Bay and the Peninsula\u2019s beaches.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Mornington Peninsula homes and weekenders, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Peninsula with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Mornington client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'on the Peninsula?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Mornington clean in under 60 seconds.',
      trust: 'Trusted by Mornington locals, weekenders and holiday-let owners.',
    },
    seo: {
      title: 'House Cleaning Mornington | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Mornington, Mount Martha, Mount Eliza, Safety Beach & Dromana. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Mount Eliza', 'Mount Martha', 'Moorooduc', 'Tuerong', 'Somerville', 'Tyabb', 'Hastings', 'Bittern', 'Crib Point', 'Balnarring', 'Merricks', 'Red Hill', 'Red Hill South', 'Main Ridge', 'Arthurs Seat', 'Dromana', 'Safety Beach', 'Rosebud', 'McCrae', 'Capel Sound', 'Rye', 'Sorrento', 'Portsea', 'Blairgowrie'],
  },

  {
    slug: 'cleaners-narre-warren',
    name: 'Narre Warren',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'City of Casey',
    heroImage: '/images/suburbs/cleaners-narre-warren.png',
    heroImageAlt: 'NATURO Group eco-friendly house cleaning in Narre Warren VIC',
    ogImage: '/images/suburbs/cleaners-narre-warren.png',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Narre Warren'],
      tagline: 'Trusted, Trained and Thorough — across the City of Casey',
    },
    intro: {
      kicker: 'House cleaning in Narre Warren',
      h2: 'Best house cleaning in Narre Warren & the City of Casey',
      paragraphs: [
        'Narre Warren is the heart of Melbourne\u2019s south-east growth corridor \u2014 a fast-growing community of family homes, modern townhouses and brand-new estates around Westfield Fountain Gate. NATURO GROUP\u2019s Narre Warren cleaners use eco-friendly products that suit busy multigenerational households and the family pets that come with them.',
        'From Narre Warren and Narre Warren South to Berwick, Cranbourne, Hampton Park and Hallam, our trained, police-checked team services family homes, rentals and end-of-lease properties \u2014 with the reliability growth-corridor life demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Narre Warren & the City of Casey',
      paragraphs: [
        'The City of Casey is one of Australia\u2019s largest local government areas by population \u2014 around 365,000 residents across Narre Warren, Berwick, Cranbourne and the surrounding growth suburbs. The household mix spans young families, multigenerational households and growing aged-care communities.',
        'Our team also services Berwick, Cranbourne, Hampton Park, Hallam, Pakenham, Beaconsfield and Officer \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Casey cleaners', body: 'A trained, police-checked team that knows the south-east \u2014 from Narre Warren family homes to Berwick estate townhouses.' },
        { icon: 'clock', title: 'Bookings that fit family life', body: 'Weekly, fortnightly or one-off cleans scheduled around school runs, shift work and weekend plans.' },
        { icon: 'sparkle', title: 'Eco-friendly, kid- and pet-safe', body: 'Plant-based products that are gentle on hardwood floors, asthma-prone kids and the family dog.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Narre Warren homes and businesses, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the City of Casey with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Narre Warren client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Narre Warren?',
      sub: 'Eco-friendly products, police-checked local cleaners and flexible scheduling \u2014 book your first Narre Warren clean in under 60 seconds.',
      trust: 'Trusted by Narre Warren families, growth-corridor homeowners and renters.',
    },
    seo: {
      title: 'House Cleaning Narre Warren | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Narre Warren, Berwick, Cranbourne, Hampton Park & Pakenham. Police-checked, fully insured. Get an instant price.',
    },
    nearbySuburbs: ['Narre Warren North', 'Narre Warren South', 'Berwick', 'Beaconsfield', 'Beaconsfield Upper', 'Officer', 'Cranbourne', 'Cranbourne North', 'Cranbourne West', 'Cranbourne East', 'Hampton Park', 'Lynbrook', 'Lyndhurst', 'Lysterfield', 'Lysterfield South', 'Hallam', 'Endeavour Hills', 'Doveton', 'Pakenham'],
  },

  {
    slug: 'cleaners-toorak',
    name: 'Toorak',
    state: 'Victoria',
    stateCode: 'VIC',
    region: 'Inner South-East Melbourne',
    heroImage: '/images/suburbs/cleaners-toorak.jpg',
    heroImageAlt: 'NATURO Group eco-friendly cleaning in Toorak VIC',
    ogImage: '/images/suburbs/cleaners-toorak.jpg',
    hero: {
      h1Lines: ['Eco-friendly', 'House Cleaning in', 'Toorak'],
      tagline: 'Trusted, Trained and Thorough — across Inner South-East Melbourne',
    },
    intro: {
      kicker: 'House cleaning in Toorak',
      h2: 'Best house cleaning in Toorak & the Inner South-East',
      paragraphs: [
        'Toorak is Melbourne\u2019s most prestigious address \u2014 a leafy suburb of grand period homes, restored Edwardian and Victorian villas and contemporary architectural builds along Toorak Road and Domain Park. NATURO GROUP\u2019s Toorak cleaners use eco-friendly products that protect natural stone, marble, premium joinery and the gardens they sit in.',
        'From Toorak village and Toorak Road to South Yarra, Armadale, Malvern and Hawksburn, our trained, police-checked team services premium homes, period villas and apartments \u2014 with the discretion and consistency the postcode demands.',
      ],
    },
    trust: {
      h2: 'Trusted cleaners across Toorak & the Inner South-East',
      paragraphs: [
        'Toorak is home to around 13,000 residents in one of Melbourne\u2019s most tightly held postcodes \u2014 a leafy community of grand homes, premium retail along Toorak Road and easy access to the CBD. We work with established families, busy professionals and downsizers across the suburb.',
        'Our team also services South Yarra, Armadale, Malvern, Hawksburn, Prahran and Windsor \u2014 with eco-friendly products, police-checked cleaners and a satisfaction guarantee on every clean.',
      ],
      points: [
        { icon: 'shield', title: 'Local Toorak cleaners', body: 'A trained, police-checked team comfortable in premium period homes \u2014 with the discretion the suburb expects.' },
        { icon: 'clock', title: 'Bookings that fit your week', body: 'Weekly, fortnightly or one-off cleans scheduled around school runs, work travel and weekend visitors.' },
        { icon: 'sparkle', title: 'Stone- and heritage-friendly', body: 'pH-neutral, plant-based products that are safe for marble, natural stone, period joinery and original detail.' },
      ],
    },
    founderBody: [
      'At NATURO GROUP, we deliver exceptional cleaning services to Toorak homes, backed by a unique nursing background that drives our compassionate care.',
      'We take pride in supporting local NDIS participants, Veterans Affairs, Workers Compensation, Insurance and Aged Care recipients across the Inner South-East with tailored services that prioritise comfort and independence.',
      'Our commitment to quality, reliability and personalised care ensures every Toorak client feels valued in their own home. At NATURO GROUP, we don\u2019t just clean \u2014 we create spaces where people feel truly cared for.',
    ],
    finalCta: {
      h2Pre: 'Ready for a',
      h2Highlight: 'healthier home',
      h2Post: 'in Toorak?',
      sub: 'Eco-friendly products, police-checked local cleaners and discreet, flexible scheduling \u2014 book your first Toorak clean in under 60 seconds.',
      trust: 'Trusted by Toorak families, downsizers and period homeowners.',
    },
    seo: {
      title: 'House Cleaning Toorak | Eco-Friendly Cleaners Melbourne',
      description: 'Eco-friendly house cleaning in Toorak, South Yarra, Armadale & Malvern. Premium period homes, gentle on stone & marble. Police-checked, fully insured.',
    },
    nearbySuburbs: ['South Yarra', 'Armadale', 'Malvern', 'Malvern East', 'Prahran', 'Windsor', 'Hawthorn', 'Hawthorn East', 'Camberwell', 'Caulfield', 'Caulfield North', 'Caulfield South', 'Caulfield East', 'Glen Iris', 'St Kilda East', 'Elsternwick', 'Kooyong', 'Burnley', 'Cremorne', 'Richmond'],
  },
];

export const suburbBySlug = (slug: string): Suburb | undefined =>
  suburbs.find((s) => s.slug === slug);
