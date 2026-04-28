// Suburbs sourced from existing naturogroup.com.au location pages.
// Adding a new suburb here automatically generates a /cleaners/[slug] page.

export type Location = {
  slug: string;       // URL slug
  suburb: string;     // Display name
  region: string;     // Sydney / Northern Beaches / Ipswich / Tweed / Wollongong / etc.
  state: 'NSW' | 'QLD' | 'VIC';
  postcode?: string;
};

export const locations: Location[] = [
  // Sydney — Eastern Suburbs
  { slug: 'bondi', suburb: 'Bondi', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2026' },
  { slug: 'bellevue-hill', suburb: 'Bellevue Hill', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2023' },
  { slug: 'bronte', suburb: 'Bronte', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2024' },
  { slug: 'centennial-park', suburb: 'Centennial Park', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2021' },
  { slug: 'clovelly', suburb: 'Clovelly', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2031' },
  { slug: 'coogee', suburb: 'Coogee', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2034' },
  { slug: 'double-bay', suburb: 'Double Bay', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2028' },
  { slug: 'dover-heights', suburb: 'Dover Heights', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2030' },
  { slug: 'edgecliff', suburb: 'Edgecliff', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2027' },
  { slug: 'kensington', suburb: 'Kensington', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2033' },
  { slug: 'kingsford', suburb: 'Kingsford', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2032' },
  { slug: 'maroubra', suburb: 'Maroubra', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2035' },
  { slug: 'queens-park', suburb: 'Queens Park', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2022' },
  { slug: 'randwick', suburb: 'Randwick', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2031' },
  { slug: 'rose-bay', suburb: 'Rose Bay', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2029' },
  { slug: 'tamarama', suburb: 'Tamarama', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2026' },
  { slug: 'vaucluse', suburb: 'Vaucluse', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2030' },
  { slug: 'waverley', suburb: 'Waverley', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2024' },
  { slug: 'woollahra', suburb: 'Woollahra', region: 'Sydney Eastern Suburbs', state: 'NSW', postcode: '2025' },

  // Sydney — Northern Beaches
  { slug: 'allambie-heights', suburb: 'Allambie Heights', region: 'Northern Beaches', state: 'NSW', postcode: '2100' },
  { slug: 'avalon-beach', suburb: 'Avalon Beach', region: 'Northern Beaches', state: 'NSW', postcode: '2107' },
  { slug: 'belrose', suburb: 'Belrose', region: 'Northern Beaches', state: 'NSW', postcode: '2085' },
  { slug: 'brookvale', suburb: 'Brookvale', region: 'Northern Beaches', state: 'NSW', postcode: '2100' },
  { slug: 'collaroy', suburb: 'Collaroy', region: 'Northern Beaches', state: 'NSW', postcode: '2097' },
  { slug: 'collaroy-plateau', suburb: 'Collaroy Plateau', region: 'Northern Beaches', state: 'NSW', postcode: '2097' },
  { slug: 'dee-why', suburb: 'Dee Why', region: 'Northern Beaches', state: 'NSW', postcode: '2099' },
  { slug: 'fairlight', suburb: 'Fairlight', region: 'Northern Beaches', state: 'NSW', postcode: '2094' },
  { slug: 'forestville', suburb: 'Forestville', region: 'Northern Beaches', state: 'NSW', postcode: '2087' },
  { slug: 'frenchs-forest', suburb: 'Frenchs Forest', region: 'Northern Beaches', state: 'NSW', postcode: '2086' },
  { slug: 'freshwater', suburb: 'Freshwater', region: 'Northern Beaches', state: 'NSW', postcode: '2096' },
  { slug: 'killarney-heights', suburb: 'Killarney Heights', region: 'Northern Beaches', state: 'NSW', postcode: '2087' },
  { slug: 'manly', suburb: 'Manly', region: 'Northern Beaches', state: 'NSW', postcode: '2095' },
  { slug: 'mona-vale', suburb: 'Mona Vale', region: 'Northern Beaches', state: 'NSW', postcode: '2103' },
  { slug: 'narrabeen', suburb: 'Narrabeen', region: 'Northern Beaches', state: 'NSW', postcode: '2101' },
  { slug: 'narraweena', suburb: 'Narraweena', region: 'Northern Beaches', state: 'NSW', postcode: '2099' },
  { slug: 'palm-beach', suburb: 'Palm Beach', region: 'Northern Beaches', state: 'NSW', postcode: '2108' },
  { slug: 'queenscliff', suburb: 'Queenscliff', region: 'Northern Beaches', state: 'NSW', postcode: '2096' },
  { slug: 'terrey-hills', suburb: 'Terrey Hills', region: 'Northern Beaches', state: 'NSW', postcode: '2084' },
  { slug: 'whale-beach', suburb: 'Whale Beach', region: 'Northern Beaches', state: 'NSW', postcode: '2107' },

  // Wollongong
  { slug: 'avondale', suburb: 'Avondale', region: 'Wollongong', state: 'NSW' },
  { slug: 'bellambi', suburb: 'Bellambi', region: 'Wollongong', state: 'NSW', postcode: '2518' },
  { slug: 'berkeley', suburb: 'Berkeley', region: 'Wollongong', state: 'NSW', postcode: '2506' },
  { slug: 'bulli', suburb: 'Bulli', region: 'Wollongong', state: 'NSW', postcode: '2516' },
  { slug: 'coniston', suburb: 'Coniston', region: 'Wollongong', state: 'NSW', postcode: '2500' },
  { slug: 'cordeaux-heights', suburb: 'Cordeaux Heights', region: 'Wollongong', state: 'NSW', postcode: '2526' },
  { slug: 'cringila', suburb: 'Cringila', region: 'Wollongong', state: 'NSW', postcode: '2502' },
  { slug: 'farmborough-heights', suburb: 'Farmborough Heights', region: 'Wollongong', state: 'NSW', postcode: '2526' },
  { slug: 'keiraville', suburb: 'Keiraville', region: 'Wollongong', state: 'NSW', postcode: '2500' },

  // Tweed Heads / Northern Rivers
  { slug: 'banora-point', suburb: 'Banora Point', region: 'Tweed Heads', state: 'NSW', postcode: '2486' },
  { slug: 'bilambil', suburb: 'Bilambil', region: 'Tweed Heads', state: 'NSW', postcode: '2486' },
  { slug: 'bilambil-heights', suburb: 'Bilambil Heights', region: 'Tweed Heads', state: 'NSW', postcode: '2486' },
  { slug: 'bogangar', suburb: 'Bogangar', region: 'Tweed Heads', state: 'NSW', postcode: '2488' },
  { slug: 'bungalora', suburb: 'Bungalora', region: 'Tweed Heads', state: 'NSW', postcode: '2486' },
  { slug: 'cabarita-beach', suburb: 'Cabarita Beach', region: 'Tweed Heads', state: 'NSW', postcode: '2488' },
  { slug: 'casuarina', suburb: 'Casuarina', region: 'Tweed Heads', state: 'NSW', postcode: '2487' },
  { slug: 'crystal-creek', suburb: 'Crystal Creek', region: 'Tweed Heads', state: 'NSW', postcode: '2484' },
  { slug: 'cudgen', suburb: 'Cudgen', region: 'Tweed Heads', state: 'NSW', postcode: '2487' },
  { slug: 'duranbah', suburb: 'Duranbah', region: 'Tweed Heads', state: 'NSW', postcode: '2487' },
  { slug: 'fingal-head', suburb: 'Fingal Head', region: 'Tweed Heads', state: 'NSW', postcode: '2487' },
  { slug: 'hastings-point', suburb: 'Hastings Point', region: 'Tweed Heads', state: 'NSW', postcode: '2489' },
  { slug: 'kingscliff', suburb: 'Kingscliff', region: 'Tweed Heads', state: 'NSW', postcode: '2487' },
  { slug: 'pottsville', suburb: 'Pottsville', region: 'Tweed Heads', state: 'NSW', postcode: '2489' },
  { slug: 'terranora', suburb: 'Terranora', region: 'Tweed Heads', state: 'NSW', postcode: '2486' },
  { slug: 'tumbulgum', suburb: 'Tumbulgum', region: 'Tweed Heads', state: 'NSW', postcode: '2490' },
  { slug: 'tweed-heads-south', suburb: 'Tweed Heads South', region: 'Tweed Heads', state: 'NSW', postcode: '2486' },
  { slug: 'tweed-heads-west', suburb: 'Tweed Heads West', region: 'Tweed Heads', state: 'NSW', postcode: '2485' },

  // Ipswich (QLD)
  { slug: 'augustine-heights', suburb: 'Augustine Heights', region: 'Ipswich', state: 'QLD', postcode: '4300' },
  { slug: 'bellbird-park', suburb: 'Bellbird Park', region: 'Ipswich', state: 'QLD', postcode: '4300' },
  { slug: 'booval', suburb: 'Booval', region: 'Ipswich', state: 'QLD', postcode: '4304' },
  { slug: 'brassall', suburb: 'Brassall', region: 'Ipswich', state: 'QLD', postcode: '4305' },
  { slug: 'brookwater', suburb: 'Brookwater', region: 'Ipswich', state: 'QLD', postcode: '4300' },
  { slug: 'bundamba', suburb: 'Bundamba', region: 'Ipswich', state: 'QLD', postcode: '4304' },
  { slug: 'camira', suburb: 'Camira', region: 'Ipswich', state: 'QLD', postcode: '4300' },
  { slug: 'collingwood-park', suburb: 'Collingwood Park', region: 'Ipswich', state: 'QLD', postcode: '4301' },
  { slug: 'east-ipswich', suburb: 'East Ipswich', region: 'Ipswich', state: 'QLD', postcode: '4305' },
  { slug: 'eastern-heights', suburb: 'Eastern Heights', region: 'Ipswich', state: 'QLD', postcode: '4305' },
  { slug: 'flinders-view', suburb: 'Flinders View', region: 'Ipswich', state: 'QLD', postcode: '4305' },
  { slug: 'goodna', suburb: 'Goodna', region: 'Ipswich', state: 'QLD', postcode: '4300' },
  { slug: 'karalee', suburb: 'Karalee', region: 'Ipswich', state: 'QLD', postcode: '4306' },
  { slug: 'newtown', suburb: 'Newtown', region: 'Ipswich', state: 'QLD', postcode: '4305' },
  { slug: 'north-ipswich', suburb: 'North Ipswich', region: 'Ipswich', state: 'QLD', postcode: '4305' },
  { slug: 'raceview', suburb: 'Raceview', region: 'Ipswich', state: 'QLD', postcode: '4305' },
  { slug: 'redbank-plains', suburb: 'Redbank Plains', region: 'Ipswich', state: 'QLD', postcode: '4301' },
  { slug: 'springfield', suburb: 'Springfield', region: 'Ipswich', state: 'QLD', postcode: '4300' },
  { slug: 'springfield-lakes', suburb: 'Springfield Lakes', region: 'Ipswich', state: 'QLD', postcode: '4300' },
];

export const regions = Array.from(new Set(locations.map((l) => l.region)));
