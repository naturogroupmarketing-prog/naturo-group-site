// Blog posts for /resource — long-form, SEO-optimised guides.
// Each post is rendered by /src/pages/resource/[slug].astro via /src/components/BlogBody.astro.

export type BlogSection =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; title: string; body: string }
  | { type: 'cta'; heading: string; body: string; href: string; label: string }
  | { type: 'faq'; items: { q: string; a: string }[] };

export interface BlogPost {
  slug: string;
  category: string;
  title: string;          // <h1> + page title
  excerpt: string;        // card description + meta description fallback
  metaTitle: string;      // <60 chars
  metaDescription: string;// 150–160 chars
  keywords: string[];     // primary + LSI keywords
  publishedDate: string;  // ISO
  updatedDate?: string;
  readMinutes: number;
  heroImage: string;      // /images/...
  intro: string;          // first paragraph after H1
  toc?: { id: string; label: string }[];
  sections: BlogSection[];
  related: string[];      // other slugs
}

export const posts: BlogPost[] = [
  // 1. Kitchen — oven grease
  {
    slug: 'how-to-clean-oven-grease-naturally',
    category: 'Kitchen',
    title: 'How to Clean Baked-On Oven Grease Naturally (Without Harsh Chemicals)',
    excerpt:
      'A step-by-step DIY method using bicarb, vinegar and a lemon — safe for the family and the planet.',
    metaTitle: 'How to Clean Oven Grease Naturally | Naturo Group',
    metaDescription:
      'Cut through baked-on oven grease without harsh chemicals. A safe, eco-friendly bicarb-and-vinegar method from professional Australian cleaners.',
    keywords: [
      'how to clean oven naturally',
      'remove baked on grease',
      'natural oven cleaner',
      'bicarb soda oven cleaning',
      'eco friendly oven cleaning Australia',
    ],
    publishedDate: '2026-04-27',
    readMinutes: 6,
    heroImage: '/images/hero-kitchen.jpg',
    intro:
      'Commercial oven cleaners work, but they’re harsh — fume-heavy, toxic to skin, and absolutely not the kind of thing you want lingering on the surfaces your food touches. The good news: a $5 trio of bicarb soda, white vinegar and a lemon will lift months of baked-on grease just as effectively, and it’s safe to use with kids, pets and food-prep surfaces nearby.',
    sections: [
      { type: 'h2', text: 'What you’ll need' },
      {
        type: 'ul',
        items: [
          '1 cup bicarbonate of soda (baking soda)',
          '½ cup white vinegar in a spray bottle',
          '1 lemon, halved',
          'Warm water',
          'A spatula or old plastic card (avoid metal — it scratches enamel)',
          'Microfibre cloths',
          'Rubber gloves',
        ],
      },
      { type: 'h2', text: 'Step 1 — Empty the oven and remove the racks' },
      {
        type: 'p',
        text: 'Pull the racks out and set them aside in the laundry sink or bath. Sweep loose crumbs out of the oven cavity with a dry cloth or handheld vacuum. The cleaner you start, the less paste you’ll need.',
      },
      { type: 'h2', text: 'Step 2 — Make a thick bicarb paste' },
      {
        type: 'p',
        text: 'In a small bowl, mix bicarbonate of soda with a few tablespoons of warm water until you get a spreadable paste — roughly the consistency of toothpaste. Add water slowly; too thin and it runs off the oven walls.',
      },
      { type: 'h2', text: 'Step 3 — Coat the inside of the oven' },
      {
        type: 'p',
        text: 'Wearing gloves, smear the paste across the entire interior — base, walls, roof and the inside of the door glass. Avoid the heating elements, the fan and the door seal. Be generous on grease build-up; the paste should look almost white over the worst spots.',
      },
      {
        type: 'callout',
        title: 'Pro tip',
        body:
          'Lay a damp tea towel along the bottom of the oven before you spread paste on the door. It catches drips and stops the door hinges from gunking up.',
      },
      { type: 'h2', text: 'Step 4 — Wait (this is where the magic happens)' },
      {
        type: 'p',
        text: 'Leave the paste to work for at least 8 hours — overnight is ideal. Bicarb is mildly alkaline, and given time it slowly breaks down the grease into a softer film you can simply wipe away.',
      },
      { type: 'h2', text: 'Step 5 — Scrub the oven racks separately' },
      {
        type: 'p',
        text: 'While the paste is working, soak the racks in hot water with a generous shake of bicarb and a glug of dish soap. After a few hours, scrub with a non-scratch pad and rinse. For racks that haven’t been cleaned in years, half a dishwasher tablet dropped into the soak speeds things along.',
      },
      { type: 'h2', text: 'Step 6 — Wipe out the paste' },
      {
        type: 'p',
        text: 'Use a damp microfibre cloth and a spatula to lift the paste away. Most of the grease comes off with it. For stubborn patches, spray the area with white vinegar — you’ll see it foam as it reacts with the leftover bicarb. Wipe again, and the spot should be clean.',
      },
      { type: 'h2', text: 'Step 7 — Finish with a lemon polish' },
      {
        type: 'p',
        text: 'Squeeze half a lemon onto a damp cloth and wipe down the inside of the door glass and the trim. Lemon cuts any greasy film left behind and leaves the cavity smelling fresh — much better than the chemical haze that lingers after store-bought cleaner.',
      },
      { type: 'h2', text: 'How often should you do this?' },
      {
        type: 'p',
        text: 'For most Australian households, a deep oven clean every 3 months keeps grease from baking on hard. If you roast often or do a lot of high-temp cooking, monthly is better. A 5-minute wipe-down with a damp bicarb cloth after each big cook will stretch the gap between deep cleans.',
      },
      { type: 'h2', text: 'When to call a professional' },
      {
        type: 'p',
        text: 'If your oven hasn’t been cleaned in years, the door has a sealed double-glazed glass panel that needs disassembly, or you’re preparing a property for an end-of-lease inspection, a professional clean is faster and protects your bond. Our deep-clean and end-of-lease teams use the same eco-friendly, non-caustic methods — just at a much larger scale.',
      },
      {
        type: 'cta',
        heading: 'Want a sparkling oven without lifting a finger?',
        body: 'Book a Naturo Group deep clean — police-checked, fully insured, eco-friendly products only.',
        href: '/services/deep-clean',
        label: 'See deep cleaning options',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'Will bicarb soda damage my oven?',
            a: 'No. Bicarb is a mild abrasive and very gentle on enamel and stainless steel. Just keep it off the heating elements, the fan and any rubber seals.',
          },
          {
            q: 'Can I clean a self-cleaning oven this way?',
            a: 'Yes — and many appliance manufacturers actually recommend a manual bicarb clean over the high-heat self-clean cycle, which can damage seals and internal components over time.',
          },
          {
            q: 'My oven still smells after cleaning. What should I do?',
            a: 'Run the oven empty at 200°C for 15 minutes with a heatproof bowl of water and lemon slices inside. The steam lifts any residual grease and the lemon neutralises odours.',
          },
          {
            q: 'Is this method safe around food?',
            a: 'Completely. Bicarb, vinegar and lemon are all food-safe. Once you’ve wiped the cavity dry, you can use the oven straight away — no waiting for fumes to clear.',
          },
        ],
      },
    ],
    related: ['shower-screen-soap-scum-removal', 'non-toxic-cleaning-products-australia'],
  },

  // 2. Bathroom — shower screens
  {
    slug: 'shower-screen-soap-scum-removal',
    category: 'Bathroom',
    title: 'How to Remove Soap Scum from Glass Shower Screens (and Keep Them Clear)',
    excerpt:
      'Soap scum, hard-water spots and a 2-minute weekly habit that keeps your shower screen looking new.',
    metaTitle: 'Remove Soap Scum from Shower Screens | Naturo Group',
    metaDescription:
      'Lift soap scum and hard-water marks off glass shower screens with a safe, two-step method — plus the 2-minute weekly habit that prevents it coming back.',
    keywords: [
      'remove soap scum glass shower',
      'how to clean glass shower screen',
      'hard water marks shower glass',
      'prevent soap scum',
      'natural shower cleaner Australia',
    ],
    publishedDate: '2026-04-27',
    readMinutes: 5,
    heroImage: '/images/hero-bathroom.jpg',
    intro:
      'Soap scum is what happens when soap residue meets the minerals in tap water. It clings to glass, etches over time, and once it’s built up it shrugs off most spray-on cleaners. The fix is a two-stage approach: a one-off deep restoration to lift years of build-up, then a 2-minute weekly habit that keeps the glass clear with almost no effort.',
    sections: [
      { type: 'h2', text: 'Why soap scum sticks to glass' },
      {
        type: 'p',
        text: 'When the calcium and magnesium in hard water react with the fatty acids in bar soap, body wash and shampoo, they form an insoluble film. That film bonds to the microscopic pits in glass — which is why a quick wipe with a sponge never gets it all off. To remove it properly you need to dissolve the mineral side and break down the soap side at the same time.',
      },
      { type: 'h2', text: 'The deep-clean method (do this once)' },
      { type: 'h3', text: 'You’ll need' },
      {
        type: 'ul',
        items: [
          '1 cup white vinegar, warmed',
          '1 cup dishwashing liquid (the thicker the better)',
          'A spray bottle',
          'A non-scratch sponge or melamine pad',
          'Microfibre cloths',
          'A squeegee',
        ],
      },
      { type: 'h3', text: 'Method' },
      {
        type: 'ol',
        items: [
          'Warm the vinegar in the microwave for 30 seconds — it’s far more effective at dissolving mineral deposits when it’s warm.',
          'Mix the warm vinegar and dishwashing liquid 1:1 in a spray bottle and shake gently to combine.',
          'Spray the entire shower screen, top to bottom, until it’s coated.',
          'Leave for 15–20 minutes. The vinegar dissolves mineral spots while the dish soap cuts the soap film.',
          'Scrub in small circles with a non-scratch pad. You’ll see the film come away as a milky residue.',
          'Rinse thoroughly with warm water and squeegee dry. Always squeegee top to bottom.',
        ],
      },
      {
        type: 'callout',
        title: 'Avoid this mistake',
        body:
          'Never use a metal scourer or a knife to scrape glass. It scratches the surface, and scratched glass holds soap scum twice as fast next time.',
      },
      { type: 'h2', text: 'The 2-minute weekly habit that keeps it clear' },
      {
        type: 'p',
        text: 'Once you’ve restored the glass, the secret is preventing fresh build-up. Two minutes a week is all it takes:',
      },
      {
        type: 'ol',
        items: [
          'Keep a squeegee on a suction hook inside the shower.',
          'After your last shower of the day, squeegee the glass top to bottom — it takes about 30 seconds.',
          'Once a week, mist the glass with a 50/50 vinegar-and-water spray and squeegee it off. Done.',
        ],
      },
      { type: 'h2', text: 'For seriously stubborn hard-water marks' },
      {
        type: 'p',
        text: 'If your screen has white, etched-looking spots that survive the deep clean, you’re dealing with hard-water mineral bonding. A bicarb-soda paste applied for 10 minutes and then scrubbed with a non-scratch pad usually lifts them. If they’ve etched into the glass itself, a glass restoration polish (sold at hardware stores) can buff them out. Worst case, replacing the screen is sometimes cheaper than chasing severely etched glass.',
      },
      { type: 'h2', text: 'What about chrome and grout?' },
      {
        type: 'p',
        text: 'The same vinegar-and-dish-soap mix works on chrome fixtures and grout lines. For mouldy grout, swap the vinegar for hydrogen peroxide — it’s gentler on the silicone seals around the screen and tackles the mould at the source. Always rinse thoroughly afterwards; vinegar left on chrome can dull the finish over time.',
      },
      { type: 'h2', text: 'Eco notes' },
      {
        type: 'p',
        text: 'Both ingredients in this method are biodegradable, septic-safe and non-toxic. There’s no chemical residue left behind, which matters in a small space like a bathroom where the family is breathing the air every morning. If you have asthma or scent sensitivities, this method is dramatically better than commercial shower sprays.',
      },
      {
        type: 'cta',
        heading: 'Time-poor? Let us handle the bathrooms.',
        body: 'Naturo Group’s regular and deep-clean services include shower screens, grout and tile restoration — booked in 60 seconds.',
        href: '/services/house-cleaning',
        label: 'Get an instant price',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'Can I use this method on shower tiles too?',
            a: 'Yes — but spot-test first on a hidden tile. Vinegar can dull natural-stone tiles like marble or travertine. For natural stone, use a pH-neutral cleaner or warm water with a touch of dish soap.',
          },
          {
            q: 'How long does the squeegee habit really take?',
            a: 'About 30 seconds for a standard 90 cm screen. Once it’s a routine, you do it without thinking — like wiping down the kitchen bench.',
          },
          {
            q: 'Will this method work on frosted or textured glass?',
            a: 'Yes, but you’ll need to scrub the textured side a little harder. Use a soft-bristled brush instead of a sponge to get into the texture.',
          },
        ],
      },
    ],
    related: ['how-to-clean-oven-grease-naturally', 'non-toxic-cleaning-products-australia'],
  },

  // 3. Eco — non-toxic products
  {
    slug: 'non-toxic-cleaning-products-australia',
    category: 'Eco-friendly',
    title: 'The 5 Non-Toxic Cleaning Products Every Australian Home Should Own',
    excerpt:
      'A short list of multi-purpose, plant-based products that replace a cupboard full of chemicals.',
    metaTitle: '5 Non-Toxic Cleaning Products for Aussie Homes',
    metaDescription:
      'A simple, eco-friendly cleaning kit for Australian homes. Five plant-based products that replace ten chemical cleaners — safer for kids, pets and waterways.',
    keywords: [
      'non-toxic cleaning products Australia',
      'eco friendly cleaning products',
      'natural household cleaners',
      'plant based cleaners',
      'safe cleaning products kids pets',
    ],
    publishedDate: '2026-04-27',
    readMinutes: 7,
    heroImage: '/images/resources/resource-1.webp',
    intro:
      'Walk down the cleaning aisle of any Australian supermarket and you’ll see dozens of brightly coloured sprays, each promising to solve one specific problem. Most homes end up with a cupboard full of half-used bottles — and a daily intake of fragrances, surfactants and disinfectants the family doesn’t need. After cleaning thousands of homes across NSW, Queensland and Victoria, our team has settled on a five-product kit that does almost everything, more safely.',
    sections: [
      { type: 'h2', text: 'Why a smaller kit is a smarter kit' },
      {
        type: 'p',
        text: 'Multi-purpose, plant-based products are cheaper per use, kinder to indoor air quality, and far less likely to trigger asthma or skin irritation. They’re also better for septic systems and waterways — important in regional and coastal Australia where treatment infrastructure varies. Fewer products also means fewer accidental mixes (and fewer trips to the chemist after someone has combined bleach with an ammonia-based spray).',
      },

      { type: 'h2', text: '1. White vinegar — the universal cleaner' },
      {
        type: 'p',
        text: 'Plain white vinegar is the most underrated cleaner in any home. Diluted 1:1 with water, it tackles hard-water marks, glass, chrome, kettle scale, microwave grease, fridge interiors, kitchen benches and bathroom fittings. It’s acidic, which means it dissolves the mineral deposits and soap scum that other sprays just smear around. Buy it by the four-litre bottle from any supermarket.',
      },
      {
        type: 'callout',
        title: 'Don’t use vinegar on:',
        body:
          'Natural stone (marble, travertine, granite), waxed timber floors, cast-iron pans, or rubber seals on dishwashers and washing machines. The acid can etch or perish these surfaces over time.',
      },

      { type: 'h2', text: '2. Bicarbonate of soda — the gentle scrub' },
      {
        type: 'p',
        text: 'Bicarb is a mildly alkaline powder that doubles as a soft abrasive. Sprinkle it on a damp sponge for sinks, shower bases and oven trays. Mix it with a few drops of water for a paste that lifts baked-on grease (see our oven-cleaning guide). Add a cup to your laundry to brighten whites without bleach. Half a cup down the kitchen drain followed by hot water keeps grease build-up in check.',
      },

      { type: 'h2', text: '3. Castile soap (concentrated plant-based liquid soap)' },
      {
        type: 'p',
        text: 'Castile soap is the workhorse for jobs that need actual surfactant — floors, walls, tiles, dishes, toys, even hand-wash. Brands like Dr Bronner’s are widely available in Australian supermarkets and health stores. A single 500 ml bottle, diluted properly, lasts months. Pick the unscented version if you have asthma or babies in the house.',
      },
      { type: 'h3', text: 'Quick dilutions' },
      {
        type: 'ul',
        items: [
          'Floor mop water: 2 tablespoons per 4 L bucket',
          'All-purpose spray: 1 tablespoon per 500 ml spray bottle',
          'Hand wash refill: 1 part castile to 3 parts water',
        ],
      },

      { type: 'h2', text: '4. Hydrogen peroxide (3%) — the disinfectant' },
      {
        type: 'p',
        text: 'For surfaces that genuinely need disinfecting — toilet seats, chopping boards after raw chicken, bathroom floors during flu season — 3% hydrogen peroxide is the safer alternative to bleach. Spray, leave for two minutes, wipe. It breaks down into water and oxygen, leaving no residue. Buy it from any chemist; store it in the original brown bottle (sunlight degrades it).',
      },
      {
        type: 'callout',
        title: 'Important',
        body:
          'Never mix hydrogen peroxide and vinegar in the same bottle — combined they create peracetic acid, which is corrosive. Use them on the same surface in sequence (peroxide first, wipe, then vinegar) if you want both effects.',
      },

      { type: 'h2', text: '5. Lemon and essential oils — for finish and fragrance' },
      {
        type: 'p',
        text: 'Half a lemon rubbed across a chopping board lifts onion smell instantly. A few drops of lemon, eucalyptus or tea-tree oil added to a vinegar spray cuts the smell of vinegar and adds gentle antimicrobial properties. Eucalyptus is a particularly good Australian choice — it’s effective on sticky residues like chewing gum, sticker glue and pen marks.',
      },

      { type: 'h2', text: 'What you can throw out' },
      {
        type: 'p',
        text: 'With those five products on the shelf, you can confidently retire single-purpose sprays for glass, ovens, bathrooms, multi-surface, anti-bacterial benches, fridge cleaner, microwave cleaner and hard-water spray. That’s seven to ten bottles gone — and several hundred dollars a year back in the budget.',
      },

      { type: 'h2', text: 'A note on “natural” marketing' },
      {
        type: 'p',
        text: '“Natural,” “eco” and “green” are not regulated terms in Australia. A bottle can carry all three and still contain synthetic fragrances, optical brighteners or surfactants derived from petroleum. If you do buy ready-made products, look for full ingredient disclosure (not just “contains less than 5% non-ionic surfactants”), GECA certification, or Choice recommendations.',
      },

      {
        type: 'cta',
        heading: 'Want professional results without the chemicals?',
        body: 'Naturo Group cleans every home with plant-based, non-toxic products as standard — never anything you wouldn’t want around your kids.',
        href: '/services/house-cleaning',
        label: 'Book a clean',
      },

      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'Are non-toxic cleaners actually as effective?',
            a: 'For 95% of household tasks, yes — and we use them in 10,000+ Australian homes to prove it. The exceptions are blood-borne pathogens (medical settings need proper disinfectants) and serious mould infestations behind walls (specialist remediation).',
          },
          {
            q: 'Is vinegar safe on kitchen benchtops?',
            a: 'Safe on laminate, stainless steel, sealed concrete and engineered stone. Not safe on marble, travertine, granite or other natural stones — use a pH-neutral cleaner instead.',
          },
          {
            q: 'Will this kit kill germs?',
            a: 'Vinegar reduces bacteria but doesn’t meet hospital-grade disinfectant standards. For high-risk surfaces (toilet seats, chopping boards after raw meat), use the hydrogen peroxide instead. Most home cleaning is about removing dirt, not sterilising.',
          },
          {
            q: 'Are essential oils safe around pets?',
            a: 'Use them sparingly. Tea tree, eucalyptus and citrus oils can be toxic to cats in concentrated form. Always dilute heavily, never apply directly to pets, and ventilate the room.',
          },
        ],
      },
    ],
    related: ['how-to-clean-oven-grease-naturally', 'pet-safe-carpet-stain-removal'],
  },

  // 4. NDIS routine
  {
    slug: 'ndis-cleaning-routine-supports-independence',
    category: 'NDIS & Aged Care',
    title: 'Setting Up an NDIS Cleaning Routine That Supports Independence',
    excerpt:
      'Practical advice for participants, families and care coordinators on building a sustainable in-home cleaning routine.',
    metaTitle: 'NDIS Cleaning Routine for Independence | Naturo Group',
    metaDescription:
      'How to build a sustainable in-home cleaning routine under an NDIS plan. A practical guide for participants, families and support coordinators across Australia.',
    keywords: [
      'NDIS cleaning support',
      'NDIS in home cleaning',
      'cleaning routine NDIS plan',
      'aged care cleaning Australia',
      'support coordinator cleaning',
    ],
    publishedDate: '2026-04-27',
    readMinutes: 8,
    heroImage: '/images/phone-woman.jpg',
    intro:
      'A clean, ordered home is one of the strongest predictors of someone staying independent — yet for many NDIS participants and older Australians, household tasks become a barrier long before any other support need does. The right cleaning routine, funded through your plan and delivered by a trained provider, doesn’t just keep the place tidy. It frees up energy for the parts of life that matter, lowers fall risk, and makes the home feel like home again. Here’s how to set one up.',
    sections: [
      { type: 'h2', text: 'What NDIS funding can cover' },
      {
        type: 'p',
        text: 'Cleaning is funded under Core Supports (Assistance with Daily Life — Domestic Assistance) for most participants. It typically covers regular cleaning of the participant’s primary residence — bathrooms, kitchens, bedrooms, living areas, laundry, light tidying and rubbish removal. It does not normally cover commercial-grade tasks like steam-cleaning carpets unless these are specifically written into the plan.',
      },
      {
        type: 'callout',
        title: 'Talk to your support coordinator',
        body:
          'If your goal is independence at home, ask your coordinator to flag domestic assistance hours specifically — the more concrete the goal, the easier the funding sits.',
      },
      { type: 'h2', text: 'Choose a provider that does NDIS cleaning specifically' },
      {
        type: 'p',
        text: 'Cleaning a home for an NDIS participant is not the same as cleaning a holiday rental. Good providers train staff in disability awareness, communication adjustments, sensory considerations, and the difference between “tidy enough” and “the participant prefers things in this exact order.” They also handle the paperwork — invoicing the plan manager directly, keeping rostering consistent, and reporting back to your support coordinator.',
      },
      { type: 'h3', text: 'A few questions to ask any provider' },
      {
        type: 'ul',
        items: [
          'Are you a registered NDIS provider?',
          'Do your cleaners hold NDIS Worker Screening clearances?',
          'How do you handle invoicing — agency-managed, plan-managed or self-managed plans?',
          'Will the same cleaner attend each visit where possible?',
          'How do you handle changes in the participant’s preferences over time?',
        ],
      },
      { type: 'h2', text: 'Build the routine around the person, not the rooms' },
      {
        type: 'p',
        text: 'A good NDIS cleaning routine starts with a conversation, not a checklist. The participant — or, where appropriate, their family or coordinator — should walk the home and identify the spaces that matter most to them. For some participants, the kitchen is the heart of the home and gets weekly attention. For others, the bathroom is the highest-risk room and gets a deeper clean each visit. Build the routine around those priorities, not a generic 12-point list.',
      },
      { type: 'h2', text: 'A typical fortnightly routine' },
      {
        type: 'ol',
        items: [
          'Bathrooms: full clean (toilet, basin, shower screen, floor, mirror).',
          'Kitchen: bench wipe-down, stovetop, sink, microwave, floor mop.',
          'Bedrooms: bed-making, surface dust, vacuum.',
          'Living areas: vacuum, surface dust, cushion straighten.',
          'Laundry: surface wipe, floor mop, lint check.',
          'Rubbish: empty bins, replace liners.',
          '15-minute spot-task chosen by the participant — windows, fridge, oven, wardrobe, etc.',
        ],
      },
      { type: 'h2', text: 'Why consistency matters more than perfection' },
      {
        type: 'p',
        text: 'For many participants — particularly those with cognitive disability, autism or anxiety — knowing what will happen, when, and ideally with whom, matters as much as the cleaning itself. Where possible, ask your provider to keep the same team across visits. If the same person isn’t available, a clear handover sheet between cleaners reduces the disruption of unfamiliar faces in the home.',
      },
      { type: 'h2', text: 'Sensory and communication considerations' },
      {
        type: 'ul',
        items: [
          'Use unscented or lightly scented eco-friendly products to avoid sensory overload.',
          'Keep vacuum noise predictable — start in the same room each visit.',
          'Use visual checklists if helpful — a printed list the participant can tick off builds agency.',
          'Confirm preferences each visit (“Would you like the curtains opened today?”) rather than assuming.',
          'Allow more time for visits than a standard residential clean — rushing is the enemy of trust.',
        ],
      },
      { type: 'h2', text: 'When to revisit the routine' },
      {
        type: 'p',
        text: 'Plans and people change. Set a quiet check-in every six months — usually a 10-minute conversation between participant, support coordinator and the provider — to review what’s working and what isn’t. Common adjustments include extending visit length as mobility decreases, swapping fortnightly for weekly during recovery from surgery, or adding seasonal deep cleans (windows in spring, oven before Christmas).',
      },
      { type: 'h2', text: 'Aged care: similar principles, different funding' },
      {
        type: 'p',
        text: 'For older Australians, domestic assistance is funded under My Aged Care via Home Care Packages or the Commonwealth Home Support Programme. The principles are identical — consistency, dignity, sensory awareness — but the paperwork sits with the aged-care provider rather than a plan manager. Naturo Group works with NDIS plan managers, support coordinators and aged-care providers every week, so the same team can support clients whose needs span both systems.',
      },
      {
        type: 'cta',
        heading: 'Looking for an NDIS-friendly cleaning team?',
        body: 'Naturo Group works with plan-managed and self-managed NDIS participants and aged-care clients across NSW, Queensland and Victoria. Friendly, trained, police-checked teams.',
        href: '/services/ndis-cleaning',
        label: 'See NDIS cleaning services',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'How many cleaning hours does NDIS typically fund?',
            a: 'It varies widely — 2 to 4 hours a fortnight is common, but it depends on the participant’s functional capacity and goals. Your support coordinator can help calculate a realistic estimate.',
          },
          {
            q: 'Can family members be paid to clean instead?',
            a: 'NDIS generally funds external providers rather than family members. The exception is self-managed plans, where rules are more flexible — but check the latest NDIS guidelines or speak to your plan manager.',
          },
          {
            q: 'What if the participant has bad days?',
            a: 'A good provider will reschedule without fuss. Look for a provider that offers no-fee cancellations within a reasonable window (we offer 24-hour notice).',
          },
          {
            q: 'Are your cleaners trained in working with people with disabilities?',
            a: 'Yes. Every Naturo Group team member assigned to NDIS or My Aged Care work completes disability-awareness training and holds current NDIS Worker Screening clearance.',
          },
        ],
      },
    ],
    related: ['end-of-lease-cleaning-checklist-australia', 'pet-safe-carpet-stain-removal'],
  },

  // 5. End of lease checklist
  {
    slug: 'end-of-lease-cleaning-checklist-australia',
    category: 'End of Lease',
    title: 'End of Lease Cleaning Checklist (the One Property Managers Use)',
    excerpt:
      'A printable checklist covering every item property managers inspect — tick them off and get your bond back.',
    metaTitle: 'End of Lease Cleaning Checklist | Bond-Back Guide',
    metaDescription:
      'The complete end of lease cleaning checklist Australian property managers actually use. Tick every item and protect your bond — written by professional cleaners.',
    keywords: [
      'end of lease cleaning checklist',
      'bond back cleaning checklist',
      'real estate exit cleaning Australia',
      'vacate cleaning list',
      'rental exit clean',
    ],
    publishedDate: '2026-04-27',
    readMinutes: 9,
    heroImage: '/images/banner-staff.jpg',
    intro:
      'The single biggest reason tenants lose part of their bond is missing the small things — the dust on the air-conditioner vents, the grease behind the stove, the scuff on the skirting board next to the front door. Property managers inspect against a fixed list. If you know what’s on it, you can clean to it. This is the checklist our end-of-lease teams work from across NSW, Queensland and Victoria — the same one your real-estate agent likely uses.',
    sections: [
      { type: 'h2', text: 'Before you start' },
      {
        type: 'ul',
        items: [
          'Get the keys handover date in writing — that’s your deadline.',
          'Take photos of the property before you start cleaning. They protect you if anything’s disputed.',
          'Find the entry condition report. Compare each room as you go.',
          'Order any specialist services (carpet steam clean, pest control) for after your DIY clean — not before.',
        ],
      },
      { type: 'h2', text: 'Living areas, hallways and bedrooms' },
      {
        type: 'ul',
        items: [
          'Dust and wipe all skirting boards, architraves and door frames.',
          'Wipe doors, door handles and light switches.',
          'Clean inside and outside of windows. Clean window tracks and sills.',
          'Wipe down blinds (slat by slat) or wash curtains.',
          'Dust ceiling fans and light fittings. Replace any blown bulbs.',
          'Clean air-conditioner vents and remove/wash filters.',
          'Wipe inside built-in wardrobes — shelves, rails and floor.',
          'Spot-clean walls (look for hand marks near switches and doorways).',
          'Vacuum carpets, including under beds and inside wardrobes.',
          'Mop hard floors after vacuuming.',
        ],
      },
      { type: 'h2', text: 'Kitchen' },
      {
        type: 'ul',
        items: [
          'Empty all cupboards and drawers. Wipe inside and out.',
          'Clean rangehood, including filters (soak in hot soapy water).',
          'Degrease splashback and walls behind the stove.',
          'Clean stovetop, knobs and surrounds.',
          'Deep-clean the oven — racks, trays, glass door, seals.',
          'Pull out the fridge (if it’s yours, defrost and clean inside; if it stays with the property, clean inside, behind and underneath).',
          'Clean the dishwasher — filter, door seal, exterior.',
          'Sink, taps and drain — descale and polish.',
          'Wipe benches, splashbacks and the underside of overhead cupboards.',
          'Empty and clean the bin.',
          'Mop the floor last.',
        ],
      },
      {
        type: 'callout',
        title: 'The behind-the-stove rule',
        body:
          'Property managers will pull the stove out. Grease that’s built up on the floor and back wall behind the appliance is one of the most common reasons cleans get rejected. Don’t skip it.',
      },
      { type: 'h2', text: 'Bathrooms and toilets' },
      {
        type: 'ul',
        items: [
          'Descale shower screen, taps and showerhead.',
          'Scrub tiles and grout. Re-grout small mouldy patches with white grout pen if needed.',
          'Clean shower base — corners and silicone seals especially.',
          'Wipe vanity, basin, taps and mirror (no streaks).',
          'Empty vanity drawers and cupboards. Wipe inside.',
          'Clean toilet — bowl, seat, base, behind the bowl, cistern lid.',
          'Wipe exhaust fan cover.',
          'Clean window and tracks.',
          'Mop the floor — including behind the toilet and under the vanity overhang.',
        ],
      },
      { type: 'h2', text: 'Laundry' },
      {
        type: 'ul',
        items: [
          'Wipe inside and outside of the washing machine — including the rubber seal and detergent drawer.',
          'Clean dryer lint filter and exterior.',
          'Wipe tub, taps and surrounds.',
          'Wipe inside cupboards.',
          'Clean floor drain — remove any hair and lint.',
          'Mop floor.',
        ],
      },
      { type: 'h2', text: 'Outside spaces' },
      {
        type: 'ul',
        items: [
          'Sweep all balconies, patios and entrance steps.',
          'Wipe railings and outdoor light fittings.',
          'Mow lawns and edge if applicable.',
          'Weed garden beds.',
          'Sweep and hose down driveway and paths.',
          'Empty and rinse outdoor bins.',
          'Remove any cobwebs from eaves and door frames.',
          'Clean garage floor — sweep, then mop oil spots if any.',
        ],
      },
      { type: 'h2', text: 'Carpets and upholstery' },
      {
        type: 'p',
        text: 'Most leases require professional carpet steam cleaning at the end of the tenancy and ask for a receipt. Get it done after your main clean, the day before handover, so the carpets are clean for inspection. Keep the receipt — agents will ask. If you have pets noted on your lease, expect to also need a flea treatment.',
      },
      { type: 'h2', text: 'The 30-minute final walk-through' },
      {
        type: 'p',
        text: 'Before you hand back the keys, walk every room one more time. Open every cupboard. Check the back of every door. Look at the property like a stranger would. The five most-missed spots: tops of door frames, inside the dishwasher, inside the rangehood, behind the toilet, and the strip of floor visible under the front door.',
      },
      { type: 'h2', text: 'When DIY isn’t worth it' },
      {
        type: 'p',
        text: 'A two-bedroom apartment takes a single person 12–16 hours of focused work to clean to inspection standard. If you’re also packing, working and managing a move, hiring professionals usually costs less than what you’d lose from your bond. Naturo Group offers a bond-back guarantee on every end-of-lease clean — if your agent flags anything, we come back at no cost until it passes.',
      },
      {
        type: 'cta',
        heading: 'Want a guaranteed bond back?',
        body: 'Naturo Group end-of-lease cleans are bond-back guaranteed and use eco-friendly products only. Quotes in 60 seconds.',
        href: '/services/end-of-lease',
        label: 'Get an end-of-lease quote',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'How much does end-of-lease cleaning cost in Australia?',
            a: 'Typical pricing starts around $250 for a 1-bedroom apartment and rises with bedrooms, bathrooms and add-ons (carpets, windows, garage). Naturo Group quotes start from $371 — see our pricing page for current rates.',
          },
          {
            q: 'What happens if my agent isn’t happy with the clean?',
            a: 'A bond-back guarantee means the cleaning company returns to address anything the agent flags, at no extra cost. Always confirm the guarantee terms in writing before you book.',
          },
          {
            q: 'Do I need to be there during the clean?',
            a: 'No — most providers can collect and return keys, or work with the agent directly. Just confirm the access arrangement when you book.',
          },
          {
            q: 'How far in advance should I book?',
            a: '1–2 weeks before your handover date is ideal. Peak periods (end of month, end of financial year, university semester transitions) book out fastest.',
          },
        ],
      },
    ],
    related: ['how-to-clean-oven-grease-naturally', 'shower-screen-soap-scum-removal'],
  },

  // 6. Carpet stains
  {
    slug: 'pet-safe-carpet-stain-removal',
    category: 'Pet & kid friendly',
    title: 'Carpet Stain Removal That’s Safe Around Kids and Pets',
    excerpt:
      'Six common spills (juice, mud, vomit, pet accidents) and the gentle methods that lift them.',
    metaTitle: 'Pet & Kid Safe Carpet Stain Removal | Naturo Group',
    metaDescription:
      'Lift juice, mud, vomit and pet stains from carpet using safe, non-toxic methods. A practical guide for Australian households with small humans and animals.',
    keywords: [
      'pet safe carpet stain removal',
      'natural carpet stain remover',
      'remove pet urine carpet',
      'kid safe cleaner carpet',
      'how to clean carpet naturally',
    ],
    publishedDate: '2026-04-27',
    readMinutes: 6,
    heroImage: '/images/resources/resource-3.webp',
    intro:
      'Carpets in Australian family homes take a hammering. Juice cups tip, muddy paws skid, toddlers and toddler-shaped pets do toddler things. Most off-the-shelf stain removers either don’t work, or work and leave a chemical residue that little hands and licking tongues will find. Here are the six spills we deal with most often, and the safe methods that actually lift them.',
    sections: [
      { type: 'h2', text: 'Three rules for any carpet spill' },
      {
        type: 'ol',
        items: [
          'Blot, never rub. Rubbing pushes the stain deeper into the fibres and into the underlay.',
          'Work from the outside in. This stops the stain spreading sideways.',
          'Test in a hidden spot first. Even safe cleaners can lift dye on older or natural-fibre carpets.',
        ],
      },
      { type: 'h2', text: '1. Juice, cordial and red drinks' },
      {
        type: 'p',
        text: 'These are dye stains — the longer they sit, the harder they bond. Act fast.',
      },
      {
        type: 'ol',
        items: [
          'Blot up as much liquid as possible with a clean white cloth.',
          'Mix 1 tbsp dish soap, 1 tbsp white vinegar and 2 cups warm water.',
          'Sponge the mix onto the stain. Blot, don’t rub.',
          'Rinse with cold water on a clean cloth and blot dry.',
          'For stubborn red stains, dab on 3% hydrogen peroxide and leave for 10 minutes before blotting again.',
        ],
      },

      { type: 'h2', text: '2. Mud and dirt' },
      {
        type: 'p',
        text: 'The big mistake here is reaching for water immediately. Wait until the mud is bone dry — usually 30 minutes — then vacuum thoroughly. Most of the stain comes up as dry dust. Treat any colour left behind with the dish-soap-and-vinegar mix above.',
      },

      { type: 'h2', text: '3. Vomit (theirs or anyone’s)' },
      {
        type: 'p',
        text: 'Vomit is acidic and bonds to carpet fibres quickly. Speed and bicarb are your friends.',
      },
      {
        type: 'ol',
        items: [
          'Pick up the solid material with paper towel and a flat plastic edge (an old loyalty card works well).',
          'Generously sprinkle bicarb soda over the area — it absorbs liquid and neutralises odour.',
          'Leave for 15 minutes, then vacuum.',
          'Sponge the area with the dish-soap-and-vinegar mix.',
          'Rinse with cold water and blot dry. Place a thick towel weighted with a heavy book on top to draw out moisture.',
        ],
      },

      { type: 'h2', text: '4. Pet urine' },
      {
        type: 'p',
        text: 'Urine is the trickiest stain in the house. The visible mark is the easy part — what you can’t see are the proteins and bacteria sitting in the underlay, which is why pets often re-mark the same spot. Standard cleaners mask the smell briefly but don’t break down the proteins.',
      },
      {
        type: 'ol',
        items: [
          'Blot up as much liquid as you can — stand on a folded towel to draw out anything below the surface.',
          'Mix 1 cup white vinegar with 1 cup water and saturate the stain. The vinegar neutralises the alkaline salts in dried urine.',
          'Blot, then sprinkle bicarb soda over the damp area. Leave overnight.',
          'Vacuum thoroughly the next morning.',
          'For repeat offenders, an enzymatic cleaner (sold at any vet or pet store) breaks down the proteins so the pet stops re-marking.',
        ],
      },
      {
        type: 'callout',
        title: 'Avoid ammonia-based cleaners on pet stains',
        body:
          'Ammonia smells like urine to a dog, which means using a regular ammonia spray actually encourages re-marking on the same spot. Stick to vinegar and enzymatic cleaners.',
      },

      { type: 'h2', text: '5. Chocolate, sauces and oily food' },
      {
        type: 'p',
        text: 'Scrape up the solid material first. Sprinkle bicarb on the greasy mark and leave for 15 minutes — it pulls the oil out of the fibres. Vacuum, then treat any remaining colour with the dish-soap-and-vinegar mix. For dark sauces, finish with hydrogen peroxide as for juice stains.',
      },

      { type: 'h2', text: '6. Crayon, marker and paint' },
      {
        type: 'p',
        text: 'For wax crayon, harden the wax with an ice cube, then scrape off as much as possible with a plastic edge. For permanent marker, dab — never rub — with a small amount of rubbing alcohol on a cotton bud. For washable kids paint, blot with cold water immediately; once dry, paint is much harder to remove.',
      },

      { type: 'h2', text: 'When to bring in a professional' },
      {
        type: 'p',
        text: 'If the carpet covers an entire room and is generally tired, professional steam cleaning lifts grime and allergens that DIY can’t reach. For embedded pet odours that have been building up for years, a hot-water extraction with an enzymatic pre-treatment is usually the only thing that fully removes them. Both are worth doing once a year if you have pets and small kids.',
      },

      {
        type: 'cta',
        heading: 'Want carpets that look new again?',
        body: 'Naturo Group offers professional carpet care as part of our deep cleans, end-of-lease cleans, and ongoing residential plans. Eco-friendly, kid-safe, pet-safe.',
        href: '/services/deep-clean',
        label: 'Book a deep clean',
      },

      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'Are these methods safe for wool carpets?',
            a: 'Yes — but always spot-test first. Wool can be sensitive to alkaline cleaners. If the spot test shows any colour change, swap the dish soap for plain warm water and skip the bicarb step.',
          },
          {
            q: 'How long should I wait before letting kids and pets back on the carpet?',
            a: 'Until it’s dry to the touch — usually 1–2 hours. The cleaners themselves are non-toxic, but wet carpet picks up new dirt faster.',
          },
          {
            q: 'My pet keeps re-marking the same spot. What now?',
            a: 'You almost certainly haven’t neutralised the proteins below the surface. An enzymatic cleaner saturated into the spot (not just sprayed) and left to dry naturally is the most reliable fix.',
          },
          {
            q: 'Will hydrogen peroxide bleach my carpet?',
            a: '3% hydrogen peroxide is gentle and safe on most modern carpets, but it can lighten older or naturally dyed fibres. Always spot-test first and rinse thoroughly.',
          },
        ],
      },
    ],
    related: ['non-toxic-cleaning-products-australia', 'ndis-cleaning-routine-supports-independence'],
  },

  // 7. Geelong — end of lease checklist
  {
    slug: 'end-of-lease-cleaning-geelong-checklist',
    category: 'End of Lease',
    title: 'End of Lease Cleaning Geelong: The Complete Checklist [2026]',
    excerpt:
      'Everything Geelong property managers check at final inspection — room by room, with tips to get your full bond back.',
    metaTitle: 'End of Lease Cleaning Geelong Checklist 2026 | Naturo Group',
    metaDescription:
      'The exact room-by-room checklist Geelong property managers use at final inspection. Avoid bond deductions — and find out what a professional bond clean costs in Geelong.',
    keywords: [
      'end of lease cleaning geelong',
      'bond cleaning geelong checklist',
      'bond cleaning geelong',
      'vacate cleaning geelong',
      'end of tenancy cleaning geelong',
      'geelong bond back guarantee',
    ],
    publishedDate: '2026-05-06',
    readMinutes: 9,
    heroImage: '/images/hero-bathroom.jpg',
    intro:
      'Losing part of your bond over a missed oven clean or a dusty skirting board is one of the most frustrating things about moving out — especially when the fix would have taken 20 minutes. This checklist covers every area Geelong property managers inspect at final handover, so you can either clean it yourself or hand it to a professional with exactly the right brief.',
    toc: [
      { id: 'why-geelong-bond-cleans-fail', label: 'Why bond cleans fail in Geelong' },
      { id: 'kitchen-checklist', label: 'Kitchen checklist' },
      { id: 'bathroom-checklist', label: 'Bathrooms & laundry' },
      { id: 'bedrooms-living', label: 'Bedrooms & living areas' },
      { id: 'outdoor-garage', label: 'Outdoor areas & garage' },
      { id: 'geelong-bond-clean-cost', label: 'How much does it cost in Geelong?' },
      { id: 'diy-vs-professional', label: 'DIY vs professional' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      { type: 'h2', text: 'Why bond cleans fail in Geelong' },
      {
        type: 'p',
        text: 'Geelong property managers consistently flag the same issues at final inspection: baked-on grease in the oven and rangehood, soap scum on shower glass, grout discolouration, dusty skirting boards and dirty window tracks. These are the spots tenants clean last — or skip entirely. They\'re also the spots most likely to result in a bond deduction.',
      },
      {
        type: 'callout',
        title: 'Geelong bond clean tip',
        body: 'Don\'t clean in the order rooms are used — clean in the order a property manager inspects. They typically start at the front door and work room-by-room, finishing with the oven. If you clean the oven first and then dust the kitchen cupboards, you\'ll cover it in crumbs again.',
      },
      { type: 'h2', text: 'Kitchen checklist' },
      {
        type: 'ul',
        items: [
          'Oven interior — walls, base, racks and door glass (inside and out)',
          'Rangehood — filters removed, degreased and replaced; canopy wiped',
          'Stovetop — burners or induction surface, drip trays if applicable',
          'Splashback — grease film removed, grout scrubbed',
          'All benchtops — cleared and wiped including back edge against wall',
          'Inside all cupboards and drawers — wiped, no crumbs or staining',
          'Dishwasher — door seals, filter basket and interior wipe-down',
          'Sink and taps — limescale removed, chrome polished',
          'Microwave — interior and exterior',
          'Refrigerator interior if left in property',
          'Floors — swept, mopped and dry',
        ],
      },
      { type: 'h2', text: 'Bathrooms & laundry checklist' },
      {
        type: 'ul',
        items: [
          'Shower screen — soap scum and water marks fully removed',
          'Shower recess — tiles, grout and floor drain',
          'Bath — if present, ring marks and taps',
          'Toilet — bowl, seat, hinge area, cistern and behind base',
          'Basin and taps — limescale and toothpaste residue',
          'Mirrors — streak-free',
          'Exhaust fan — cover removed and dusted',
          'Towel rails and toilet roll holders',
          'Floor — grout lines scrubbed, floor mopped',
          'Laundry tub and taps',
          'Washing machine lint filter and drum wipe-down',
          'Laundry floor and behind appliances',
        ],
      },
      { type: 'h2', text: 'Bedrooms & living areas checklist' },
      {
        type: 'ul',
        items: [
          'All floors — vacuumed and mopped (including under furniture if accessible)',
          'Skirting boards — wiped, not just dusted',
          'Light switches and power points — fingerprint marks removed',
          'Ceiling fans — blades and motor housing dusted',
          'Light fittings — dead insects removed, glass cleaned',
          'Window sills, tracks and frames — inside faces',
          'Blinds — venetians wiped slat-by-slat, roller blinds wiped down',
          'Built-in wardrobes — shelves, hanging rod and floor',
          'Walls — mark and scuff removal (not a full repaint — just obvious marks)',
          'Doors, handles and door frames',
        ],
      },
      { type: 'h2', text: 'Outdoor areas & garage' },
      {
        type: 'p',
        text: 'Outdoor areas are often forgotten but increasingly included in Geelong tenancy agreements. Check your lease before assuming you\'re off the hook.',
      },
      {
        type: 'ul',
        items: [
          'Garage floor — sweep and hose (oil stains may require degreaser)',
          'Garage walls — cobwebs removed',
          'Outdoor entertaining area — swept and hosed',
          'BBQ — if included in inventory',
          'Bins — emptied and hosed out',
          'Garden — mowing and edging may be required depending on your lease',
        ],
      },
      {
        type: 'h2',
        text: 'How much does end of lease cleaning cost in Geelong?',
      },
      {
        type: 'p',
        text: 'Geelong bond clean prices vary by property size, condition and whether add-ons like carpet steam cleaning are included. As a rough guide for 2026:',
      },
      {
        type: 'ul',
        items: [
          '1-bedroom unit: $478–$560',
          '2-bedroom unit: $560–$640',
          '3-bedroom house: $680–$800',
          '4-bedroom house: $820–$980',
          'Carpet steam cleaning (per room): $60–$90 add-on',
          'External windows: $80–$160 add-on depending on storey access',
        ],
      },
      {
        type: 'callout',
        title: 'What affects the price?',
        body: 'Condition is the main driver. A property that has been regularly cleaned throughout the tenancy will take 30–40% less time than one that hasn\'t been touched in a year. Other factors: number of bathrooms, whether the oven is heavily soiled, and access for carpet cleaners.',
      },
      { type: 'h2', text: 'DIY vs professional — which is right for you?' },
      {
        type: 'p',
        text: 'A DIY bond clean is achievable for a small, well-maintained property where you have 2–3 days to dedicate to the job. For most Geelong tenants, a professional clean is faster, less stressful and more likely to satisfy a property manager\'s inspection — particularly for ovens, shower screens and carpets.',
      },
      {
        type: 'p',
        text: 'The key question: does the professional clean cost less than the bond deduction risk? In most cases, yes — especially when you factor in your time and the cost of re-cleaning if the first attempt fails inspection.',
      },
      {
        type: 'cta',
        heading: 'Get a Geelong bond clean quote in 60 seconds',
        body: 'Police-checked team, 72-hour bond-back guarantee, eco-friendly products. Serving Greater Geelong and the Bellarine Peninsula.',
        href: '/end-of-lease-cleaning-geelong',
        label: 'See end of lease cleaning prices',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'Do Geelong property managers require a professional receipt?',
            a: 'Most don\'t legally require a professional receipt for a general bond clean, but many Real Estate Institute of Victoria (REIV) leases do require professional carpet cleaning if the property had carpets when you moved in. Check your entry condition report.',
          },
          {
            q: 'How long does a bond clean take in Geelong?',
            a: 'A 2-bedroom unit takes 6–8 hours for a professional team. A 4-bedroom house can take 10–14 hours. DIY will typically take 1.5–2× longer without specialist products and equipment.',
          },
          {
            q: 'Do I need to be present for the bond clean?',
            a: 'No. Most Geelong clients provide a key or lockbox code. We photograph every room before and after and send you a summary you can share with your property manager.',
          },
          {
            q: 'What if the property manager isn\'t satisfied?',
            a: 'Naturo Group offers a 72-hour bond-back guarantee — if your property manager identifies an issue with our clean, we return and re-clean the affected area at no extra cost.',
          },
        ],
      },
    ],
    related: ['end-of-lease-cleaning-checklist-australia', 'house-cleaning-cost-geelong'],
  },

  // 8. Geelong — pricing guide
  {
    slug: 'house-cleaning-cost-geelong',
    category: 'Pricing',
    title: 'How Much Does House Cleaning Cost in Geelong? [2026 Pricing Guide]',
    excerpt:
      'Honest 2026 pricing for regular, deep and end-of-lease cleaning across Geelong — what\'s included, what affects the price and how to compare quotes.',
    metaTitle: 'House Cleaning Cost Geelong 2026 | Prices & Guide | Naturo Group',
    metaDescription:
      'How much does house cleaning cost in Geelong in 2026? Honest prices for regular, deep and bond cleans — what\'s included, what affects cost, and how to compare quotes.',
    keywords: [
      'house cleaning cost geelong',
      'how much does house cleaning cost geelong',
      'cleaning prices geelong',
      'bond cleaning price geelong',
      'deep clean cost geelong',
      'geelong house cleaner price',
    ],
    publishedDate: '2026-05-06',
    readMinutes: 7,
    heroImage: '/images/hero-kitchen.jpg',
    intro:
      'Geelong house cleaning prices vary widely — from $38/hr for a basic regular clean to $1,200+ for a full bond clean on a large family home. This guide breaks down what you\'ll actually pay in 2026, what\'s included at each price point, and the factors that push costs up or down.',
    toc: [
      { id: 'regular-clean-prices', label: 'Regular clean prices' },
      { id: 'deep-clean-prices', label: 'Deep clean prices' },
      { id: 'end-of-lease-prices', label: 'End of lease prices' },
      { id: 'what-affects-price', label: 'What affects the price?' },
      { id: 'hourly-vs-flat-rate', label: 'Hourly vs flat rate' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      { type: 'h2', text: 'Regular house cleaning prices in Geelong (2026)' },
      {
        type: 'p',
        text: 'A regular weekly or fortnightly clean is the most common service in Geelong. Prices depend on whether you choose hourly or flat-rate billing, and the size of your home.',
      },
      {
        type: 'ul',
        items: [
          'Hourly rate: $38–$75/hr depending on provider and level of service',
          '2-bedroom apartment (hourly): $114–$150 per visit',
          '3-bedroom house (flat rate): $153–$220 per visit',
          '4-bedroom house (flat rate): $220–$310 per visit',
          'Fortnightly cleans: typically 10–15% more per visit than weekly',
        ],
      },
      {
        type: 'callout',
        title: 'Weekly vs fortnightly cost in Geelong',
        body: 'A weekly clean at $153 costs $7,956/yr. A fortnightly clean at $175 (typical uplift) costs $4,550/yr. Weekly cleaning is better value per visit and keeps your home in consistently better condition — fortnightly is the most common choice for busy Geelong families.',
      },
      { type: 'h2', text: 'Deep clean prices in Geelong (2026)' },
      {
        type: 'p',
        text: 'A deep clean is a once-off thorough clean for homes that haven\'t been professionally cleaned recently, seasonal spring cleans, or pre-sale preparation. It covers everything in a regular clean plus inside cupboards, windows, ovens and behind appliances.',
      },
      {
        type: 'ul',
        items: [
          '2-bedroom unit: $371–$460',
          '3-bedroom house: $460–$580',
          '4-bedroom house: $580–$720',
          'Add oven clean: $60–$90',
          'Add carpet steam cleaning per room: $60–$90',
        ],
      },
      { type: 'h2', text: 'End of lease (bond) cleaning prices in Geelong (2026)' },
      {
        type: 'p',
        text: 'Bond cleaning is the most thorough — and most expensive — type of residential clean. It\'s priced for condition as much as size, and includes everything a property manager will check at final inspection.',
      },
      {
        type: 'ul',
        items: [
          '1-bedroom unit: $478–$560',
          '2-bedroom unit: $560–$640',
          '3-bedroom house: $680–$800',
          '4-bedroom house: $820–$980',
          '5-bedroom house: $980–$1,280',
          'Carpet steam cleaning add-on: $60–$90 per room',
        ],
      },
      { type: 'h2', text: 'What affects house cleaning prices in Geelong?' },
      {
        type: 'p',
        text: 'The five biggest factors that affect what you\'ll pay:',
      },
      {
        type: 'ul',
        items: [
          'Home size — more rooms and bathrooms = more time',
          'Condition — a home not cleaned in 6+ months takes significantly longer',
          'Service type — regular < deep clean < bond clean in terms of scope',
          'Add-ons — oven, fridge, carpets, windows and outdoor areas all add cost',
          'Frequency — weekly cleans cost less per visit than one-off cleans',
        ],
      },
      { type: 'h2', text: 'Hourly vs flat rate — which is better for Geelong homes?' },
      {
        type: 'p',
        text: 'Hourly billing means you pay for the exact time spent. It\'s better for small or well-maintained homes where the scope is limited. Flat-rate billing gives you a fixed price regardless of time — better for larger homes or when you need certainty for budgeting or rental purposes. Most Geelong families prefer flat-rate for regular cleans.',
      },
      {
        type: 'cta',
        heading: 'Get an instant price for your Geelong home',
        body: 'Answer 3 questions and see your price in 60 seconds. No phone call, no waiting. Police-checked, eco-friendly Geelong team.',
        href: '/house-cleaning-geelong',
        label: 'Get an instant Geelong price',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'Are Geelong house cleaning prices higher than Melbourne?',
            a: 'Generally slightly lower — Geelong has a lower cost of living and less travel time between jobs for cleaners. You can expect to pay 5–15% less than Melbourne inner-suburb rates for equivalent service.',
          },
          {
            q: 'Should I tip my Geelong cleaner?',
            a: 'Tipping is not expected in Australia, but it is always appreciated for exceptional work. A kind note or a Google review is equally valued by small cleaning businesses.',
          },
          {
            q: 'How do I compare quotes from different Geelong cleaners?',
            a: 'Compare the scope, not just the price. Ask: is GST included? Are products and equipment supplied? Is there a satisfaction guarantee? Is the team police-checked and insured? A $100 clean with no insurance and borrowed equipment is not the same service as a $153 clean from a fully insured, police-checked team.',
          },
          {
            q: 'Does Naturo Group include cleaning products in the price?',
            a: 'Yes. We supply all eco-friendly, non-toxic cleaning products and all equipment for every job. You don\'t need to provide anything.',
          },
        ],
      },
    ],
    related: ['end-of-lease-cleaning-geelong-checklist', 'how-to-clean-oven-grease-naturally'],
  },

  // 9. Geelong — NDIS cleaning guide
  {
    slug: 'ndis-cleaning-geelong-guide',
    category: 'NDIS & Aged Care',
    title: 'NDIS Cleaning in Geelong: What Support Participants Need to Know',
    excerpt:
      'How NDIS cleaning funding works in Geelong, what\'s covered, how to claim it and what to look for in a provider.',
    metaTitle: 'NDIS Cleaning Geelong Guide 2026 | Naturo Group',
    metaDescription:
      'How NDIS cleaning works in Geelong — funding types, what\'s covered, line item codes and how to choose a provider. Guide for Geelong NDIS participants and support coordinators.',
    keywords: [
      'ndis cleaning geelong',
      'ndis cleaners geelong',
      'ndis home cleaning geelong',
      'ndis support coordinator geelong cleaning',
      'ndis daily living cleaning geelong',
    ],
    publishedDate: '2026-05-06',
    readMinutes: 8,
    heroImage: '/images/hero-bathroom.jpg',
    intro:
      'NDIS cleaning is one of the most misunderstood supports in the scheme. Many Geelong participants don\'t realise they can use their Core budget to pay for professional home cleaning — or they\'re unsure which line item to use, how to claim it, or what to look for in a provider. This guide covers all of it.',
    toc: [
      { id: 'is-cleaning-covered', label: 'Is cleaning covered by NDIS?' },
      { id: 'funding-types', label: 'Plan-managed, self-managed & agency-managed' },
      { id: 'what-to-expect', label: 'What a Geelong NDIS clean looks like' },
      { id: 'choosing-provider', label: 'Choosing a provider in Geelong' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      { type: 'h2', text: 'Is home cleaning covered by the NDIS?' },
      {
        type: 'p',
        text: 'Yes — in most cases. Home cleaning falls under Core Supports, specifically Assistance with Daily Life. The relevant line item is 01_011_0120_1_1 (Assistance with Daily Life — standard). The key eligibility requirement is that the disability or condition makes it difficult or impossible for the participant to perform household tasks independently.',
      },
      {
        type: 'callout',
        title: 'Important',
        body: 'NDIS funding for cleaning must be included in your plan. If it\'s not currently funded, speak with your Local Area Coordinator (LAC) or Support Coordinator about including household tasks in your next plan review.',
      },
      { type: 'h2', text: 'How funding works for Geelong participants' },
      {
        type: 'p',
        text: 'There are three plan management types, and each works slightly differently for paying for cleaning:',
      },
      {
        type: 'ul',
        items: [
          'Plan-managed: Your plan manager pays the provider directly from your NDIS funds. You engage the cleaner, they invoice your plan manager — you don\'t handle the money.',
          'Self-managed: You pay the cleaner directly (e.g. by bank transfer) and claim the cost back from the NDIS portal using your myplace account. Keep all receipts.',
          'Agency-managed (NDIA-managed): The NDIA pays registered providers directly. You must use a registered NDIS provider. Check your provider\'s registration status.',
        ],
      },
      { type: 'h2', text: 'What a Geelong NDIS home clean looks like' },
      {
        type: 'p',
        text: 'A good NDIS clean in Geelong is tailored to the participant\'s specific needs — not a one-size-fits-all service. The cleaner will typically:',
      },
      {
        type: 'ul',
        items: [
          'Complete an initial consultation to understand the participant\'s priorities and sensitivities',
          'Follow a personalised task list agreed with the participant or their support coordinator',
          'Use fragrance-conscious, non-toxic products appropriate for participants with sensory sensitivities, respiratory conditions or compromised immune systems',
          'Arrive at a consistent time to support routine and predictability',
          'Provide invoices and reports in the format required by the plan manager',
        ],
      },
      { type: 'h2', text: 'How to choose an NDIS cleaning provider in Geelong' },
      {
        type: 'p',
        text: 'Not all cleaning companies in Geelong are equipped to work with NDIS participants. Here\'s what to check before engaging a provider:',
      },
      {
        type: 'ul',
        items: [
          'Police checks — all staff should be police-checked and identity-verified',
          'Training in disability and dignity of care — not just general cleaning',
          'Experience with NDIS invoicing and plan manager communication',
          'Non-toxic, fragrance-conscious products — critical for participants with health sensitivities',
          'Consistent cleaners — not rotating casual staff from a roster',
          'Public liability insurance — minimum $10M, ideally $20M',
        ],
      },
      {
        type: 'cta',
        heading: 'Naturo Group — NDIS cleaning across Greater Geelong',
        body: 'Nurse-led, police-checked team. Plan manager invoicing. Eco-friendly, fragrance-conscious products. Serving Geelong, Newtown, Highton, Belmont, Lara, Leopold and the Bellarine Peninsula.',
        href: '/ndis-cleaning-geelong',
        label: 'Learn about our NDIS cleaning service',
      },
      { type: 'h2', text: 'Frequently asked questions' },
      {
        type: 'faq',
        items: [
          {
            q: 'What NDIS line item is used for home cleaning in Geelong?',
            a: 'Home cleaning is typically funded under Core Supports — Assistance with Daily Life, line item 01_011_0120_1_1. Your support coordinator or plan manager can confirm the correct line item for your specific plan.',
          },
          {
            q: 'Does Naturo Group need to be a registered NDIS provider?',
            a: 'For plan-managed and self-managed participants, you can use any provider — registration is not required. For agency-managed (NDIA-managed) participants, you must use a registered provider. Contact us to discuss your funding type.',
          },
          {
            q: 'How often can I use NDIS funding for cleaning in Geelong?',
            a: 'The frequency depends on what is funded in your plan. Most participants receive weekly or fortnightly cleaning. Your plan sets the support budget — your plan manager or LAC can advise on what frequency your current funding supports.',
          },
          {
            q: 'Can my support coordinator organise NDIS cleaning for me in Geelong?',
            a: 'Yes. Many Geelong support coordinators refer participants to us directly. We provide a service agreement, invoicing details and any reports your support coordinator needs to manage the funding.',
          },
        ],
      },
    ],
    related: ['ndis-cleaning-routine-supports-independence', 'house-cleaning-cost-geelong'],
  },

  // 10. Geelong — eco-friendly cleaning
  {
    slug: 'eco-friendly-cleaning-geelong',
    category: 'Eco-Friendly',
    title: 'Eco-Friendly House Cleaning in Geelong: Why It Matters Near Corio Bay',
    excerpt:
      'Why eco-friendly cleaning products matter in Geelong homes — for your family, your pets and the Corio Bay and Bellarine waterways.',
    metaTitle: 'Eco-Friendly Cleaning Geelong | Safe for Corio Bay | Naturo Group',
    metaDescription:
      'Why eco-friendly house cleaning matters in Geelong — for families, pets and the Corio Bay catchment. What to look for in a green cleaning service and why we choose non-toxic products.',
    keywords: [
      'eco friendly cleaning geelong',
      'green cleaning service geelong',
      'non toxic cleaning geelong',
      'natural cleaning products geelong',
      'eco house cleaning geelong',
      'corio bay safe cleaning',
    ],
    publishedDate: '2026-05-06',
    readMinutes: 6,
    heroImage: '/images/hero-bathroom.jpg',
    intro:
      'Geelong sits on the shores of Corio Bay — a waterway that connects directly to Port Phillip Bay and Bass Strait. What goes down Geelong drains eventually reaches those waters. For families with young children, pets or anyone sensitive to chemical exposure, the products used inside your home matter far more than most cleaning companies will tell you.',
    sections: [
      { type: 'h2', text: 'The problem with conventional cleaning products' },
      {
        type: 'p',
        text: 'Most conventional cleaning products contain petrochemicals, synthetic fragrances, phosphates and bleach derivatives. When washed down Geelong drains, these compounds enter the stormwater and sewage systems that feed into Corio Bay. The environmental impact is real — phosphates in particular cause algal blooms that deplete oxygen and harm aquatic life.',
      },
      {
        type: 'p',
        text: 'Inside the home, the story is equally concerning. Conventional multi-surface sprays, bathroom cleaners and floor products off-gas volatile organic compounds (VOCs) that linger in the air for hours. For children, pets, asthma sufferers and people with compromised immune systems — which includes many NDIS participants and aged care recipients — this is a genuine health consideration.',
      },
      { type: 'h2', text: 'What makes a cleaning product genuinely eco-friendly?' },
      {
        type: 'ul',
        items: [
          'Plant-based surfactants (not petroleum-derived)',
          'Readily biodegradable — breaks down in water within 28 days',
          'Phosphate-free — no contribution to waterway eutrophication',
          'Fragrance-free or naturally fragranced (not synthetic parfum)',
          'Not tested on animals',
          'Concentrated formula — less packaging waste per clean',
          'No chlorine bleach, ammonia or formaldehyde',
        ],
      },
      {
        type: 'callout',
        title: 'What to check on the label',
        body: 'Look for GECA (Good Environmental Choice Australia) certification, Australian-made plant-based formulas, or the EU Ecolabel for imported products. Avoid anything listing "parfum", "sodium hypochlorite" (bleach) or "alkylphenol ethoxylates" as ingredients.',
      },
      { type: 'h2', text: 'Eco-friendly cleaning in practice: what Naturo Group uses' },
      {
        type: 'p',
        text: 'Every Naturo Group clean in Geelong uses plant-based, non-toxic, biodegradable cleaning products. Our formulas are free of phosphates, chlorine bleach, synthetic fragrances and petrochemicals. We use concentrated products to minimise packaging, and microfibre cloths that clean effectively with less product overall.',
      },
      {
        type: 'p',
        text: 'For NDIS participants, aged care recipients and families with sensory sensitivities or respiratory conditions, we use fragrance-free formulas by default. We never substitute conventional products — not to cut costs, not to clean faster, not for any reason.',
      },
      { type: 'h2', text: 'Is eco-friendly cleaning as effective as conventional cleaning?' },
      {
        type: 'p',
        text: 'Yes — with the right products and technique. Plant-based surfactants break down grease and grime just as effectively as petroleum-based ones; they just work through chemistry rather than brute chemical force. The difference is what happens afterwards: biodegradable products break down harmlessly in water; conventional chemicals persist.',
      },
      {
        type: 'p',
        text: 'For heavily soiled surfaces — baked-on oven grease, mildewed grout, hard-water scale — we use targeted application, dwell time and mechanical action rather than stronger chemicals. It takes more skill, but produces the same result without the environmental and health trade-offs.',
      },
      {
        type: 'cta',
        heading: 'Book an eco-friendly clean for your Geelong home',
        body: 'Plant-based products, police-checked team, 100% satisfaction guaranteed. Serving Greater Geelong and the Bellarine Peninsula.',
        href: '/house-cleaning-geelong',
        label: 'Book a Geelong house clean',
      },
    ],
    related: ['non-toxic-cleaning-products-australia', 'house-cleaning-cost-geelong'],
  },

  // ── PORT MACQUARIE MARKET ────────────────────────────────────────────────

  // PM-1. End of lease checklist
  {
    slug: 'end-of-lease-cleaning-port-macquarie-checklist',
    category: 'End of Lease',
    title: 'End of Lease Cleaning Port Macquarie: The Complete Checklist [2026]',
    excerpt:
      'The exact room-by-room checklist Port Macquarie property managers use at final inspection — so you get your full bond back.',
    metaTitle: 'End of Lease Cleaning Port Macquarie Checklist 2026 | Naturo Group',
    metaDescription:
      'Room-by-room bond clean checklist for Port Macquarie tenants. Covers kitchen, bathroom, outdoor and what property managers inspect. Pricing from $560.',
    keywords: [
      'end of lease cleaning port macquarie',
      'bond cleaning port macquarie',
      'vacate cleaning port macquarie',
      'bond back guarantee port macquarie',
      'end of tenancy cleaning port macquarie',
      'port macquarie bond clean checklist',
    ],
    publishedDate: '2026-05-07',
    readMinutes: 9,
    heroImage: '/images/hero-bathroom-wide.jpg',
    intro:
      "Moving out of a Port Macquarie rental is stressful enough without the added anxiety of a bond dispute. Property managers here are thorough — the coastal lifestyle that makes Port Macquarie a desirable rental market also means properties see significant sand, salt air and sun exposure that requires extra attention at final inspection. This checklist covers every area your property manager will inspect so you leave nothing to chance.",
    toc: [
      { id: 'why-bond-cleans-fail-pm', label: 'Why bond cleans fail in Port Macquarie' },
      { id: 'kitchen-checklist', label: 'Kitchen checklist' },
      { id: 'bathroom-checklist', label: 'Bathrooms & laundry' },
      { id: 'bedrooms-living', label: 'Bedrooms & living areas' },
      { id: 'outdoor-garage', label: 'Outdoor areas & garage' },
      { id: 'pm-bond-clean-cost', label: 'How much does it cost in Port Macquarie?' },
      { id: 'diy-vs-professional', label: 'DIY vs professional' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      { type: 'h2', text: 'Why bond cleans fail in Port Macquarie' },
      {
        type: 'p',
        text: "Port Macquarie property managers consistently flag the same failure points: baked-on grease in the oven, soap scum on shower glass and shower screens, salt and sand tracked into carpets and floor tracks, discoloured grout and dirty window sills. Coastal rentals near the Hastings River foreshore or Town Beach are particularly prone to salt-air residue on windows, fly screens and outdoor surfaces — areas that are easy to overlook when you're focused on getting keys handed over.",
      },
      {
        type: 'callout',
        title: 'Port Macquarie bond clean tip',
        body: "Salt-air residue is invisible until it dries into a white film. Before your property manager arrives, wipe all windows and fly screens with a damp microfibre cloth — it takes 10 minutes and is one of the most common deduction triggers in coastal Port Macquarie properties.",
      },
      { type: 'h2', text: 'Kitchen checklist' },
      {
        type: 'ul',
        items: [
          'Oven interior — walls, base, racks and door glass (inside and out)',
          'Rangehood — filters removed, degreased and replaced; canopy wiped',
          'Stovetop — burners or induction surface, drip trays if applicable',
          'Splashback — grease film removed, grout scrubbed',
          'All benchtops — cleared and wiped including back edge against wall',
          'Inside all cupboards and drawers — wiped, no crumbs or staining',
          'Dishwasher — door seals, filter basket and interior wipe-down',
          'Sink and taps — limescale removed, chrome polished',
          'Microwave — interior and exterior',
          'Refrigerator interior if left in property',
          'Floors — swept, mopped and dry',
        ],
      },
      { type: 'h2', text: 'Bathrooms & laundry checklist' },
      {
        type: 'ul',
        items: [
          'Shower screen — soap scum and water marks fully removed',
          'Shower recess — tiles, grout and floor drain',
          'Bath — if present, ring marks and taps',
          'Toilet — bowl, seat, hinge area, cistern and behind base',
          'Basin and taps — limescale and toothpaste residue',
          'Mirrors — streak-free',
          'Exhaust fan — cover removed and dusted',
          'Towel rails and toilet roll holders',
          'Floor — grout lines scrubbed, floor mopped',
          'Laundry tub and taps',
          'Washing machine lint filter and drum wipe-down',
          'Laundry floor and behind appliances',
        ],
      },
      { type: 'h2', text: 'Bedrooms & living areas checklist' },
      {
        type: 'ul',
        items: [
          'All floors vacuumed and mopped (hard floors and carpet)',
          'Skirting boards — wiped on top and front face',
          'Light switches and power points — clean of finger marks',
          'Window sills, frames and tracks — sand and debris removed',
          'Fly screens — rinsed or wiped (critical in coastal Port Macquarie)',
          'Blinds — dusted or wiped including venetians',
          'Ceiling fans and light fittings — dusted',
          'Inside all wardrobes — shelves wiped, tracks vacuumed',
          'Walls — spot-clean any marks, scuffs or crayon',
        ],
      },
      { type: 'h2', text: 'Outdoor areas & garage' },
      {
        type: 'ul',
        items: [
          'Outdoor tiles or deck — swept and hosed',
          'BBQ — cleaned if supplied with property',
          'Outdoor furniture — wiped down if supplied',
          'Cobwebs removed from eaves, patio ceiling and corners',
          'Garage — swept, rubbish removed, oil stains treated',
          'Gardens — weeds removed from garden beds if lease required it',
          'Gutters — checked if lease specified maintenance obligation',
        ],
      },
      { type: 'h2', text: 'How much does end of lease cleaning cost in Port Macquarie?' },
      {
        type: 'p',
        text: 'Professional bond cleaning in Port Macquarie typically costs $560–$1,280 depending on property size. A 1-bedroom unit or apartment starts at $560, a 2-bedroom house around $640, a 3-bedroom home around $800. Add-ons like carpet steam cleaning, external windows and outdoor areas are priced separately. Get an exact price in 60 seconds at naturogroup.com.au/end-of-lease-cleaning-port-macquarie.',
      },
      {
        type: 'callout',
        title: 'Cheapest is not always cheapest',
        body: "A $280 quote from an independent cleaner who skips the oven, skirting boards and fly screens will still cost you — when the property manager invoices you for a re-clean, you'll have paid twice. A professional with a bond-back guarantee protects the full amount of your deposit.",
      },
      { type: 'h2', text: 'DIY vs professional bond clean' },
      {
        type: 'p',
        text: "DIY bond cleans work best for properties in excellent condition that only need a thorough top-to-bottom sweep. Properties with built-up oven grease, grout discolouration, heavy soap scum or salt-air window film typically need professional-grade degreasers and techniques to meet the standard expected at final inspection. The key question is not 'can I clean it?' but 'will it pass inspection?'",
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How long does a bond clean take in Port Macquarie?',
            a: "A 2-bedroom Port Macquarie property typically takes 3–5 hours for a professional team. Larger properties, properties with heavy build-up, or those with outdoor areas and garages can take longer. We send a team of the right size for your property so the job is done in a single visit.",
          },
          {
            q: 'Do I need to be home during the clean?',
            a: "No. Most Port Macquarie clients use a key handover or lockbox. We photograph every room on completion and send you a summary you can share directly with your property manager.",
          },
          {
            q: 'Does the clean cover the oven and shower screen?',
            a: "Yes. Oven interior (racks, walls, door glass), rangehood, stovetop and all bathrooms including shower screens are included as standard. These are the most inspected items in any Port Macquarie final inspection.",
          },
          {
            q: 'What is your bond-back guarantee?',
            a: "If your Port Macquarie property manager raises any issue with our clean, we return within 72 hours and re-clean the affected areas at no charge. No disputes, no arguments — just your bond, back.",
          },
        ],
      },
      {
        type: 'cta',
        heading: 'Ready to book your Port Macquarie bond clean?',
        body: 'Get an instant price in 60 seconds — no phone call required. Police-checked team, 72-hour bond-back guarantee.',
        href: '/end-of-lease-cleaning-port-macquarie',
        label: 'Get an instant price',
      },
    ],
    related: ['end-of-lease-cleaning-checklist-australia', 'house-cleaning-cost-port-macquarie'],
  },

  // PM-2. House cleaning cost Port Macquarie
  {
    slug: 'house-cleaning-cost-port-macquarie',
    category: 'House Cleaning',
    title: 'How Much Does House Cleaning Cost in Port Macquarie? [2026 Prices]',
    excerpt:
      '2026 pricing guide for professional house cleaning in Port Macquarie — what drives the cost and how to avoid overpaying.',
    metaTitle: 'House Cleaning Cost Port Macquarie 2026 | Naturo Group',
    metaDescription:
      'Current house cleaning prices in Port Macquarie for 2026. Hourly rates vs fixed-price packages, what affects cost, and what a professional team actually includes.',
    keywords: [
      'house cleaning cost port macquarie',
      'house cleaning port macquarie price',
      'cleaners port macquarie',
      'how much does house cleaning cost port macquarie',
      'domestic cleaning port macquarie',
      'port macquarie cleaning services',
    ],
    publishedDate: '2026-05-07',
    readMinutes: 7,
    heroImage: '/images/hero-kitchen.jpg',
    intro:
      "Port Macquarie's residential cleaning market ranges from budget hourly contractors to full-service teams with insurance, eco-products and a satisfaction guarantee. The price you pay depends heavily on which you choose — and what's actually included. This guide breaks down real 2026 pricing so you know what to expect and what questions to ask.",
    toc: [
      { id: 'pm-cleaning-rates', label: 'Port Macquarie cleaning rates' },
      { id: 'what-affects-price', label: 'What affects the price?' },
      { id: 'hourly-vs-fixed', label: 'Hourly vs fixed-price' },
      { id: 'what-is-included', label: "What's included?" },
      { id: 'ndis-aged-care', label: 'NDIS and aged care cleaning' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      { type: 'h2', text: 'Port Macquarie house cleaning rates in 2026' },
      {
        type: 'p',
        text: 'Professional house cleaning in Port Macquarie generally falls between $35 and $55 per hour for a single cleaner, or between $180 and $380 for a fixed-price clean of a standard 3-bedroom home. The lower end of the range is typically an individual independent contractor; the upper end includes an insured, vetted team with eco-friendly products, all equipment supplied and a satisfaction guarantee.',
      },
      {
        type: 'ul',
        items: [
          '1-bedroom apartment — $120–$180 per regular clean',
          '2-bedroom house — $180–$240 per regular clean',
          '3-bedroom house — $220–$300 per regular clean',
          '4-bedroom house — $280–$380 per regular clean',
          'Deep clean (first clean) — 40–60% more than a regular clean',
          'End of lease / bond clean — from $560 (see separate guide)',
        ],
      },
      { type: 'h2', text: 'What affects house cleaning prices in Port Macquarie?' },
      {
        type: 'p',
        text: "Several factors push the price up or down compared to the averages above:",
      },
      {
        type: 'ul',
        items: [
          'Current condition — a home that hasn\'t been professionally cleaned in 6+ months will take longer',
          'Number of bathrooms — each bathroom adds significant time; Port Macquarie coastal homes often have an outdoor shower too',
          'Pets — hair and dander require extra vacuuming time and specialist products',
          'Frequency — weekly and fortnightly cleans are typically cheaper per visit than monthly or one-off',
          'Add-ons — oven cleaning, internal windows, fridge, balcony and outdoor furniture cleaning',
          'Products — companies using eco-certified products typically price slightly higher but are safer for kids, pets and marine environments near the Hastings River',
        ],
      },
      { type: 'h2', text: 'Hourly rate vs fixed-price: which is better?' },
      {
        type: 'p',
        text: "Hourly rates feel cheaper upfront but can escalate if the clean takes longer than expected — and you have little certainty about the outcome. Fixed-price packages give you a known cost and typically include a defined list of tasks. For regular cleans, fixed-price is almost always better value because the team learns your home and becomes more efficient over time.",
      },
      {
        type: 'callout',
        title: 'Ask this before you book',
        body: 'Does the price include all equipment and products? Are the cleaners insured? What happens if something is missed or damaged? A professional company answers all three confidently. An independent contractor may not.',
      },
      { type: 'h2', text: "What's included in a standard Port Macquarie house clean?" },
      {
        type: 'ul',
        items: [
          'Kitchen — benchtops, stovetop exterior, sink, inside microwave, wipe appliance exteriors',
          'Bathrooms — toilet, basin, shower, mirror, floor mopped',
          'All rooms — vacuumed, hard floors mopped, surfaces dusted',
          'Skirting boards, light switches and door handles wiped',
          'Rubbish bins emptied',
          'Not typically included: oven interior, internal windows, fridge inside, laundry walls, outdoor areas',
        ],
      },
      {
        type: 'p',
        text: 'The difference between a budget clean and a professional clean is usually found in the details: skirting boards, ceiling fan blades, light switch plates, window sills and behind appliances. Naturo Group\'s Port Macquarie team uses a 50-point checklist so nothing is skipped.',
      },
      { type: 'h2', text: 'NDIS and aged care cleaning in Port Macquarie' },
      {
        type: 'p',
        text: 'Naturo Group is a registered NDIS cleaning provider in Port Macquarie. We work with self-managed, plan-managed and agency-managed participants. NDIS cleaning is funded under Assistance with Daily Life (SIL) or Assistance with Daily Activities support categories. We handle all documentation and invoicing to your NDIS plan directly.',
      },
      {
        type: 'faq',
        items: [
          {
            q: 'How do I know if a Port Macquarie cleaning company is legitimate?',
            a: 'Check for: ABN, public liability insurance, police-checked staff, real Google reviews with responses, and a local phone number. Legitimate companies are transparent about what is and isn\'t included.',
          },
          {
            q: 'How often should I have my Port Macquarie home professionally cleaned?',
            a: 'Most Port Macquarie households benefit from a fortnightly clean. Coastal homes near the beach or foreshore often need more frequent attention due to sand, salt and humidity.',
          },
          {
            q: 'Do you clean in Wauchope, Lake Cathie and surrounding areas?',
            a: 'Yes. Naturo Group serves Port Macquarie, Wauchope, Lake Cathie, Laurieton, North Haven, Bonny Hills, Settlement Point and surrounding suburbs. Get an instant price online for your specific area.',
          },
        ],
      },
      {
        type: 'cta',
        heading: 'Book a house clean in Port Macquarie',
        body: 'Police-checked team, all products and equipment supplied, eco-conscious plant-based products. Get an instant price in 60 seconds.',
        href: '/cleaners-port-macquarie',
        label: 'Get an instant price',
      },
    ],
    related: ['end-of-lease-cleaning-port-macquarie-checklist', 'ndis-cleaning-port-macquarie-guide'],
  },

  // PM-3. NDIS cleaning Port Macquarie guide
  {
    slug: 'ndis-cleaning-port-macquarie-guide',
    category: 'NDIS',
    title: 'NDIS Cleaning in Port Macquarie: What Is Covered and How to Access It [2026]',
    excerpt:
      'A plain-English guide to NDIS-funded cleaning in Port Macquarie — what is covered, what to say to your coordinator, and how to switch providers.',
    metaTitle: 'NDIS Cleaning Port Macquarie 2026 — What Is Covered | Naturo Group',
    metaDescription:
      'NDIS cleaning in Port Macquarie explained. What support categories cover cleaning, how to access it, and what a registered NDIS cleaning provider actually does.',
    keywords: [
      'ndis cleaning port macquarie',
      'ndis cleaning provider port macquarie',
      'ndis house cleaning port macquarie',
      'ndis domestic cleaning port macquarie',
      'ndis support worker port macquarie cleaning',
      'port macquarie ndis registered cleaner',
    ],
    publishedDate: '2026-05-07',
    readMinutes: 8,
    heroImage: '/images/hero-bathroom.jpg',
    intro:
      "If you are an NDIS participant in Port Macquarie — or a family member, support coordinator or plan manager looking for a registered cleaning provider — this guide explains exactly what NDIS cleaning covers, how to access it, and what to look for in a provider. Port Macquarie has a growing NDIS participant community, and cleaning support is one of the most consistently requested services in the area.",
    toc: [
      { id: 'what-ndis-covers', label: 'What NDIS covers for cleaning' },
      { id: 'support-categories', label: 'Support categories' },
      { id: 'self-managed-plan-managed', label: 'Self-managed vs plan-managed' },
      { id: 'choosing-provider-pm', label: 'Choosing a Port Macquarie provider' },
      { id: 'switching-providers', label: 'How to switch providers' },
      { id: 'faq', label: 'FAQs' },
    ],
    sections: [
      { type: 'h2', text: 'What does NDIS cover for cleaning in Port Macquarie?' },
      {
        type: 'p',
        text: 'NDIS funding can cover domestic cleaning tasks when they are connected to a participant\'s disability and help them live independently. Cleaning is typically funded under the Assistance with Daily Life (ADL) support category — formally called Assistance with Daily Activities. This covers tasks like vacuuming, mopping, bathroom cleaning, kitchen wiping, bin emptying and laundry where the participant\'s disability prevents them from completing those tasks safely or independently.',
      },
      {
        type: 'callout',
        title: 'Important',
        body: 'NDIS does not automatically fund cleaning for every participant. The support must be linked to your disability and your goals. Your support coordinator or Local Area Coordinator (LAC) can help you confirm whether cleaning is included in your plan.',
      },
      { type: 'h2', text: 'Which NDIS support categories cover cleaning?' },
      {
        type: 'p',
        text: 'In most Port Macquarie NDIS plans, cleaning is funded under one of the following:',
      },
      {
        type: 'ul',
        items: [
          'Assistance with Daily Life (01_002) — the most common category; covers domestic assistance including cleaning',
          'Supported Independent Living (SIL) — if you live in shared accommodation and cleaning is part of your support package',
          'Community Nursing Care — if a registered nurse is involved in assessing or overseeing your household routine',
        ],
      },
      { type: 'h2', text: 'Self-managed, plan-managed and agency-managed: what changes?' },
      {
        type: 'ul',
        items: [
          'Agency-managed: NDIS pays your provider directly; you must use NDIS-registered providers only',
          'Plan-managed: your plan manager pays invoices; you can use both registered and unregistered providers',
          'Self-managed: you pay providers and claim reimbursement; you can use any provider but keep all receipts and invoices',
        ],
      },
      {
        type: 'p',
        text: 'Naturo Group is a registered NDIS cleaning provider in Port Macquarie, which means we can work with participants under all three management types. We handle documentation, service agreements and invoicing according to NDIS requirements.',
      },
      { type: 'h2', text: 'What does Naturo Group\'s NDIS cleaning include in Port Macquarie?' },
      {
        type: 'ul',
        items: [
          'Kitchen — benchtops, stovetop, sink, microwave exterior, floor',
          'Bathrooms — toilet, shower, basin, mirror, floor mopped and disinfected',
          'All rooms — vacuum, mop, surfaces dusted, rubbish emptied',
          'Laundry — tub, floor, appliance exteriors',
          'Regular, reliable scheduling — same team where possible',
          'Progress notes and service records supplied to coordinators on request',
        ],
      },
      { type: 'h2', text: 'How to choose an NDIS cleaning provider in Port Macquarie' },
      {
        type: 'p',
        text: 'When comparing providers, ask:',
      },
      {
        type: 'ol',
        items: [
          'Are you NDIS-registered? (Required for agency-managed participants)',
          'Are your staff police-checked and NDIS Worker Screening cleared?',
          'Do you provide a service agreement and NDIS-compliant invoices?',
          'Can you provide progress notes for my support coordinator?',
          'What eco-friendly products do you use? (Important for participants with chemical sensitivities)',
          'Do you serve Port Macquarie, Wauchope, Lake Cathie and surrounding areas?',
        ],
      },
      { type: 'h2', text: 'How to switch NDIS cleaning providers in Port Macquarie' },
      {
        type: 'p',
        text: 'Switching is simpler than many participants realise. You are entitled to change providers at any time — there is no obligation to stay. Steps:',
      },
      {
        type: 'ol',
        items: [
          'Check your service agreement for any notice period (typically 2 weeks)',
          'Contact your current provider in writing to end the agreement',
          'Contact your new provider and complete a new service agreement',
          'Notify your plan manager or support coordinator of the change so payments are directed correctly',
        ],
      },
      {
        type: 'faq',
        items: [
          {
            q: 'Can I use my NDIS funding for a one-off deep clean in Port Macquarie?',
            a: 'It depends on your plan. Some participants have funding for a deep clean or end-of-lease clean if it is connected to a disability-related goal (e.g. moving to supported accommodation). Speak to your support coordinator to confirm before booking.',
          },
          {
            q: 'Do you service Wauchope, Laurieton and Lake Cathie for NDIS cleaning?',
            a: 'Yes. Naturo Group provides NDIS cleaning services across Port Macquarie, Wauchope, Laurieton, Lake Cathie, North Haven, Bonny Hills and surrounding areas. Contact us to confirm availability in your specific location.',
          },
          {
            q: 'How do I get started with NDIS cleaning in Port Macquarie?',
            a: 'Call us on 1300 876 472 or get a price online. We will prepare a service agreement, confirm your NDIS plan details with your plan manager if required, and schedule your first clean at a time that suits you.',
          },
          {
            q: 'What makes Naturo Group different from other Port Macquarie cleaning providers?',
            a: 'Our team is led by a registered nurse — which means our standard is clinical-grade thorough. All cleaners are police-checked, NDIS Worker Screening cleared and trained on our 50-point checklist. We use only eco-friendly, non-toxic products that are safe for participants with respiratory conditions, chemical sensitivities or allergies.',
          },
        ],
      },
      {
        type: 'cta',
        heading: 'Book NDIS cleaning in Port Macquarie',
        body: 'Registered NDIS provider. Police-checked, eco-friendly team. All management types welcome.',
        href: '/ndis-cleaning-port-macquarie',
        label: 'Learn more & book',
      },
    ],
    related: ['ndis-cleaning-routine-supports-independence', 'house-cleaning-cost-port-macquarie'],
  },
];

export const postsBySlug: Record<string, BlogPost> = Object.fromEntries(
  posts.map((p) => [p.slug, p]),
);

/** Card-sized summary for the resource hub. */
export const postCards = posts.map((p) => ({
  slug: p.slug,
  category: p.category,
  title: p.title,
  excerpt: p.excerpt,
  readMinutes: p.readMinutes,
  href: `/resource/${p.slug}`,
}));
