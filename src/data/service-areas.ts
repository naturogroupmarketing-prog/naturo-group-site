/**
 * Where NATURO GROUP has cleaners today.
 *
 * Every city page on the site used to read as if a local team worked there.
 * For most of them none does: a Toowoomba family asked for a fortnightly
 * clean in Rangeville because the page named Rangeville, and had to be turned
 * away (owner, 22 Nov 2026: "Say not in your area yet"). Pages listed here as
 * NOT served keep their address, say plainly that we are not there yet and
 * invite people to register their interest. Since 22 Nov 2026 (later the
 * same day) they are also noindex, out of the sitemap and out of the
 * site-wide Locations links: they were half the site's Google impressions
 * for searches we cannot serve, and the November 2026 core update marked the
 * whole site down. Owner's decision, reversing "keep the ranking".
 *
 * To open an area, delete its slug from NOT_YET_SERVED. Nothing else changes.
 */
export const NOT_YET_SERVED = new Set<string>([
  // New South Wales
  'cleaners-lismore', 'cleaners-newcastle', 'cleaners-sydney', 'cleaners-wollongong',
  'cleaners-bondi', 'cleaners-manly', 'cleaners-mosman', 'cleaners-hunters-hill', 'cleaners-vaucluse',
  'house-cleaning-sutherland', 'house-cleaning-tweed-heads', 'house-cleaning-parramatta',
  'house-cleaning-in-northern-beaches', 'house-cleaning-in-eastern-beaches',
  // Queensland
  'cleaners-brisbane', 'cleaners-gold-coast', 'cleaners-sunshine-coast', 'cleaners-toowoomba',
  'cleaners-townsville', 'house-cleaning-ipswich',
  // Victoria (Melbourne and the south-east)
  'cleaners-melbourne', 'cleaners-dandenong', 'cleaners-mornington', 'cleaners-narre-warren',
  'cleaners-toorak', 'cleaners-carlton', 'cleaners-carlton-north', 'cleaners-fitzroy',
  'cleaners-fitzroy-north', 'cleaners-collingwood', 'cleaners-richmond', 'cleaners-cremorne',
  'cleaners-south-yarra', 'cleaners-prahran', 'cleaners-windsor', 'cleaners-st-kilda',
  'cleaners-albert-park', 'cleaners-port-melbourne', 'cleaners-south-melbourne', 'cleaners-southbank',
  'cleaners-docklands', 'cleaners-north-melbourne', 'cleaners-west-melbourne', 'cleaners-parkville',
  'cleaners-east-melbourne', 'cleaners-hawthorn', 'cleaners-brunswick',
]);

/** The areas we do clean, named on every "not yet" page so a visitor nearby knows where to look. */
export const SERVED_AREAS = [
  { name: 'Geelong & the Bellarine', href: '/house-cleaning-geelong/' },
  { name: 'Port Macquarie & the Hastings', href: '/house-cleaners-port-macquarie/' },
];

export const isNotYetServed = (slug: string) => NOT_YET_SERVED.has(slug);
