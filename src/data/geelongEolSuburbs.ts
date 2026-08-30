/**
 * The ten Geelong suburbs previously served by /end-of-lease-cleaning/geelong/<suburb>/.
 *
 * Those ten pages averaged 1,917 words at 79% mean pairwise similarity — roughly
 * 1,500 shared words each with the suburb name swapped, which is the doorway-page
 * pattern Google's scaled-content policy targets. They were consolidated into
 * /end-of-lease-cleaning-geelong/ on 30 Aug 2026 and 301'd there.
 *
 * What survived the merge is exactly what was NOT boilerplate: each suburb's own
 * rental-market description, housing stock and neighbouring areas. That content is
 * genuinely local, so it now sits on the hub page instead of being thrown away.
 *
 * Adding a suburb here adds a section to the hub. Do not turn these back into
 * standalone pages unless each one gets several hundred words that are true of
 * that suburb and no other.
 */
export interface GeelongEolSuburb {
  slug: string;
  name: string;
  stateCode: string;
  postcode: string;
  /** This suburb's own rental market — not shared with any other entry. */
  blurb: string;
  /** Typical housing stock here. */
  propertyTypes: string;
  /** Neighbouring areas covered from here. */
  nearbyText: string;
}

export const geelongEolSuburbs: GeelongEolSuburb[] = [
  {
    slug: 'ocean-grove',
    name: 'Ocean Grove',
    stateCode: 'VIC',
    postcode: '3226',
    blurb: "Ocean Grove's coastal rental market moves fast — landlords expect properties returned in immaculate condition, and property managers in the Bellarine routinely use professional bond cleans as their inspection benchmark. With holiday lets, long-term rentals and seasonal turnovers all common here, a thorough clean to the REIV standard is essential.",
    propertyTypes: 'beachside units, holiday lets, weatherboard houses and newer coastal estates',
    nearbyText: 'Barwon Heads, Queenscliff and the wider Bellarine Peninsula',
  },
  {
    slug: 'torquay',
    name: 'Torquay',
    stateCode: 'VIC',
    postcode: '3228',
    blurb: "Torquay's surf-lifestyle rental market is one of the most competitive on the Surf Coast, with properties regularly inspected to showroom standard. Whether you're vacating a townhouse near Surf City Plaza or a beachside unit steps from Jan Juc, our team cleans to the exact checklist your property manager will use at final inspection.",
    propertyTypes: 'surf-side units, townhouses, holiday lets and newer estate homes',
    nearbyText: 'Jan Juc, Bells Beach and the Surf Coast corridor',
  },
  {
    slug: 'newtown',
    name: 'Newtown',
    stateCode: 'VIC',
    postcode: '3220',
    blurb: "Newtown is one of Geelong's most tightly held rental suburbs, with period homes, double-fronted bungalows and modern apartments all in high demand. Property managers here have high expectations — especially for heritage finishes like timber floors, ornate ceilings and original leadlight windows that need specialist care.",
    propertyTypes: 'period homes, double-fronted bungalows, renovated terraces and inner-ring apartments',
    nearbyText: 'Geelong CBD, Chilwell and South Geelong',
  },
  {
    slug: 'lara',
    name: 'Lara',
    stateCode: 'VIC',
    postcode: '3212',
    blurb: "Lara is one of Geelong's fastest-growing suburbs, with a large volume of new estate and established homes turning over regularly as families upsize or relocate toward the city. Real estate agents in Lara are diligent at final inspection — a professional bond clean is the most reliable way to protect your full deposit.",
    propertyTypes: 'new estate homes, established brick houses and family townhouses',
    nearbyText: 'Corio, Little River and the You Yangs corridor',
  },
  {
    slug: 'leopold',
    name: 'Leopold',
    stateCode: 'VIC',
    postcode: '3224',
    blurb: "Leopold sits between Geelong and the Bellarine Peninsula, making it a popular family rental suburb with consistent turnover throughout the year. With a mix of established homes and newer estates, our end-of-lease team covers every property type — from small brick-veneer houses to spacious four-bedroom family homes.",
    propertyTypes: 'established family homes, newer estates and brick-veneer houses',
    nearbyText: 'Clifton Springs, Drysdale and the Bellarine Peninsula',
  },
  {
    slug: 'belmont',
    name: 'Belmont',
    stateCode: 'VIC',
    postcode: '3216',
    blurb: "Belmont is one of Geelong's most active rental markets, with strong demand from families, professionals and university-linked renters due to its proximity to Deakin University's Waurn Ponds campus. High inspection standards from local agents mean a comprehensive bond clean is not optional — it's expected.",
    propertyTypes: 'brick-veneer family homes, dual-occupancy properties, townhouses and units',
    nearbyText: 'Highton, Waurn Ponds and South Geelong',
  },
  {
    slug: 'highton',
    name: 'Highton',
    stateCode: 'VIC',
    postcode: '3216',
    blurb: "Highton is a premium Geelong suburb with a strong owner-occupier and high-quality rental market. Properties here — many of them architect-designed or extensively renovated — command high bonds and attract thorough final inspections. Our cleaning standard means we match what high-end property managers look for.",
    propertyTypes: 'architect-designed homes, large family residences and quality townhouses',
    nearbyText: 'Belmont, Wandana Heights and the Barwon River corridor',
  },
  {
    slug: 'geelong-west',
    name: 'Geelong West',
    stateCode: 'VIC',
    postcode: '3218',
    blurb: "Geelong West's character cottages, Federation homes and inner-city lifestyle have made it one of the most sought-after rental suburbs in greater Geelong. Tenants leaving character-era properties face particularly high expectations around skirting boards, original fixtures, tile grouting and period finishes that standard cleaners often miss.",
    propertyTypes: 'Federation cottages, renovated character homes, period terraces and inner-city units',
    nearbyText: 'Manifold Heights, Herne Hill and the Geelong CBD',
  },
  {
    slug: 'barwon-heads',
    name: 'Barwon Heads',
    stateCode: 'VIC',
    postcode: '3227',
    blurb: "Barwon Heads is a premium coastal village with a concentrated and highly competitive rental and holiday-let market. Landlords in Barwon Heads and Thirteenth Beach expect immaculate turnovers — our team photographs every room before and after so you have documented proof for any bond dispute.",
    propertyTypes: 'coastal cottages, luxury holiday lets, beach houses and Bellarine estates',
    nearbyText: 'Ocean Grove, Connewarre and the Barwon River mouth',
  },
  {
    slug: 'grovedale',
    name: 'Grovedale',
    stateCode: 'VIC',
    postcode: '3216',
    blurb: "Grovedale is a well-established family suburb in south Geelong with consistent rental activity across its 1980s–2000s housing stock. Its proximity to Deakin University, Waurn Ponds Shopping Centre and local schools means strong demand from families and students — and regular bond clean requirements at the end of every tenancy.",
    propertyTypes: 'brick-veneer family homes, townhouses, units and student-oriented rentals',
    nearbyText: 'Waurn Ponds, Highton and Mount Duneed',
  },
];
