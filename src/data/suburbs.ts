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
      title: 'House Cleaning Geelong | Eco-Friendly Cleaners VIC',
      description: 'Eco-friendly house cleaning in Geelong, Newtown, Highton, Belmont, Ocean Grove & Torquay. Police-checked, fully insured. Get an instant price.',
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
    ],
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
