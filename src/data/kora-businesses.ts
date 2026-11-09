export type KoraEngineType =
  | "kora-stay"
  | "kora-architecture"
  | "kora-clinical"
  | "kora-expedition"
  | "kora-export";

export type KoraPaletteKey =
  | "lakeside-travertine"
  | "malla-terracotta"
  | "bhaktapur-crimson"
  | "concrete-monograph"
  | "smoked-oak-brass"
  | "botanical-ivory"
  | "champagne-silk"
  | "alpine-glacier"
  | "mustang-ochre"
  | "ilam-forest";

export interface KoraStayRoom {
  id: string;
  name: string;
  subtitle: string;
  sizeSqm: number;
  maxGuests: string;
  bedConfig: string;
  rateUsd: number;
  rateNpr: number;
  otaRateUsd: number;
  features: string[];
  badge?: string;
}

export interface KoraStayAddon {
  id: string;
  name: string;
  priceUsd: number;
  priceNpr: number;
  note: string;
}

export interface KoraArchTier {
  id: string;
  name: string;
  ratePerSqftNpr: number;
  timelineWeeks: string;
  summary: string;
  deliverables: string[];
  popular?: boolean;
}

export interface KoraArchProject {
  title: string;
  location: string;
  category: string;
  areaSqft: string;
  year: string;
  brief: string;
}

export interface KoraClinicalProcedure {
  id: string;
  name: string;
  category: "Hair Restoration" | "Regenerative & Laser" | "Injectables & Skin";
  priceNpr: number;
  priceUsd: number;
  sessionTime: string;
  downtime: string;
  clinicalNote: string;
  popular?: boolean;
}

export interface KoraExpeditionRoute {
  id: string;
  name: string;
  nameFr?: string;
  region: string;
  days: number;
  maxAltitudeM: number;
  grade: string;
  season: string;
  soloUsd: number;
  duoUsd: number;
  groupUsd: number;
  elevationWaypoints: { dayLabel: string; place: string; altitudeM: number }[];
  highlights: string[];
  badge?: string;
}

export interface KoraExportLot {
  id: string;
  lotCode: string;
  name: string;
  category: "Single-Estate Tea" | "Himalayan Botanicals & Honey" | "Specialty Arabica";
  originAltitude: string;
  harvestFlush: string;
  liquorHex: string;
  tastingNotes: string[];
  fobUsdPerKg: number;
  retailNpr250g: number;
  moqKg: number;
  steepSpec: string;
  description: string;
}

export interface KoraBusinessConfig {
  cohort: "kora";
  slug: string;
  engine: KoraEngineType;
  palette: KoraPaletteKey;
  name: string;
  shortName: string;
  monogram: string;
  sectorLabel: string;
  tagline: string;
  editorialIntro: string;
  heroEyebrow: string;
  city: "Kathmandu" | "Lalitpur" | "Bhaktapur" | "Pokhara";
  neighborhood: string;
  fullAddress: string;
  coordinates: string;
  landmark: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappDigits?: string;
  email: string;
  ccEmail?: string;
  hours: string;
  heroImage: string;
  established: string;
  principalOrFounder: string;
  principalTitle: string;
  credentialsBadge: string;
  stats: { label: string; value: string; detail: string }[];
  pillars: { code: string; title: string; body: string }[];
  teamMembers?: { name: string; role: string; credential: string }[];
  reviews: { author: string; origin: string; rating: number; quote: string }[];
  faqs: { q: string; a: string }[];

  // Vertical-specific rich datasets
  stayRooms?: KoraStayRoom[];
  stayAddons?: KoraStayAddon[];
  banquetHalls?: { name: string; capacity: string; useCase: string; startingNpr: number }[];

  archTiers?: KoraArchTier[];
  archProjects?: KoraArchProject[];
  archUnitLabel?: string;
  archDefaultSqft?: number;
  archMinSqft?: number;
  archMaxSqft?: number;

  clinicalProcedures?: KoraClinicalProcedure[];
  hasGraftCalculator?: boolean;
  graftRateNpr?: number;

  expeditionRoutes?: KoraExpeditionRoute[];
  bilingualFrench?: boolean;
  isMotorbikeSpecialist?: boolean;

  exportLots?: KoraExportLot[];
  boutiqueLocations?: { title: string; address: string; hours: string }[];

  // Outreach & CRM metadata
  currentWebsiteUrl: string;
  currentWebsiteFlaw: string;
  pitchPriceNpr: number;
  monthlyCareNpr: number;
}

export const KORA_BUSINESSES: KoraBusinessConfig[] = [
  // 1. POKHARA BOUTIQUE HOTEL
  {
    cohort: "kora",
    slug: "pokhara-boutique-hotel",
    engine: "kora-stay",
    palette: "lakeside-travertine",
    name: "Pokhara Boutique Hotel",
    shortName: "Pokhara Boutique",
    monogram: "PBH",
    sectorLabel: "Luxury Lakeside Hospitality",
    tagline: "Nepali Artisanal Timber, Infinity Waters & Unbroken Annapurna Horizons.",
    editorialIntro:
      "Set moments from the tranquil northern shore of Phewa Lake along 20th Street Khahare, Pokhara Boutique Hotel pairs hand-carved Nepali architectural woodwork with sun-drenched poolside serenity, organic valley dining, and private balcony views across the Annapurna massif.",
    heroEyebrow: "20th Street · Khahare Lakeside · Pokhara · Renovated 2024",
    city: "Pokhara",
    neighborhood: "20th Street, Khahare Lakeside",
    fullAddress: "20 Lakeside Road, Khahare, Pokhara 33700, Gandaki, Nepal",
    coordinates: "28.2186° N, 83.9554° E · 822m",
    landmark: "4-minute walk from Phewa Lake promenade · Steps from North Lakeside",
    phoneDisplay: "+977 980-2832597",
    phoneTel: "+9779802832597",
    whatsappDigits: "9779802832597",
    email: "pokharaboutiquehotel@gmail.com",
    hours: "24-Hour Front Desk & Concierge · Check-in 2:00 PM / Check-out 12:00 PM",
    heroImage: "/images/kora/pokhara-lakeside-resort.jpg",
    established: "Est. 2016 · Full Luxury Renovation 2024",
    principalOrFounder: "Reservations & Guest Experience Desk",
    principalTitle: "Pokhara Boutique Hospitality",
    credentialsBadge: "100% Guest Recommendation · 21 Artisanal Rooms & Pool Sanctuary",
    stats: [
      { label: "Bespoke Keys", value: "21", detail: "Private balconies & handcrafted woodwork" },
      { label: "Phewa Lake", value: "4 Min", detail: "Quiet Khahare North Lakeside enclave" },
      { label: "Direct Perk", value: "15% Off", detail: "Best rate vs OTA booking portals" },
      { label: "Guest Score", value: "100%", detail: "Recommended across verified reviews" },
    ],
    pillars: [
      {
        code: "01",
        title: "Nepali Craft & Modern Calm",
        body: "Individually appointed rooms blending traditional carved woodwork, crisp organic cotton linens, en-suite rain showers, and private valley-facing balconies.",
      },
      {
        code: "02",
        title: "Sun-Drenched Courtyard Pool",
        body: "Unwind after an Annapurna trek or Sarangkot flight beside crystal-clear waters with attentive poolside bar service and garden loungers.",
      },
      {
        code: "03",
        title: "Farm-Fresh Dining & Spa",
        body: "Morning Himalayan Arabica, organic valley produce, restorative post-trek spa rituals, and private Pokhara International Airport transfers.",
      },
    ],
    stayRooms: [
      {
        id: "deluxe-double",
        name: "Deluxe Himalayan Balcony Room",
        subtitle: "18 m² · Private Patio · Handcrafted Timber Accents",
        sizeSqm: 18,
        maxGuests: "2 Adults + 1 Child",
        bedConfig: "1 Plush King or Twin Beds",
        rateUsd: 68,
        rateNpr: 8900,
        otaRateUsd: 80,
        features: [
          "Private balcony with garden & valley breeze",
          "Artisanal breakfast for two included",
          "High-speed Wi-Fi, minibar & rain shower",
          "Complimentary welcome herbal tea",
        ],
        badge: "Most Booked",
      },
      {
        id: "garden-cottage",
        name: "Air-Conditioned Poolside Cottage",
        subtitle: "20 m² · Standalone Sanctuary · Pool & Garden Access",
        sizeSqm: 20,
        maxGuests: "2 Adults + 1 Child",
        bedConfig: "1 Queen Artisan Bed",
        rateUsd: 82,
        rateNpr: 10800,
        otaRateUsd: 96,
        features: [
          "Intimate bungalow layout steps from the pool",
          "Breakfast + 15% off onsite spa massage",
          "Climate control, tea/coffee station & LCD TV",
          "Late 1:30 PM check-out on direct bookings",
        ],
      },
      {
        id: "family-suite",
        name: "Panoramic Family Heritage Suite",
        subtitle: "25 m² · Spacious Multi-Bed Layout · 360° Terrace Access",
        sizeSqm: 25,
        maxGuests: "4 Adults + 1 Child",
        bedConfig: "1 King + 2 Twin Beds",
        rateUsd: 112,
        rateNpr: 14800,
        otaRateUsd: 132,
        features: [
          "Designed for families & small trekking groups",
          "Full hot breakfast for up to 4 guests",
          "Complimentary Pokhara Airport / Bus Park pickup",
          "Dedicated trek-gear storage & laundry priority",
        ],
        badge: "Complimentary Pickup",
      },
    ],
    stayAddons: [
      {
        id: "airport-shuttle",
        name: "Private Pokhara International Airport (PIA) Transfer",
        priceUsd: 15,
        priceNpr: 2000,
        note: "Private AC SUV meet-and-greet",
      },
      {
        id: "sarangkot-dawn",
        name: "Private Sarangkot Sunrise & Peace Pagoda Excursion",
        priceUsd: 35,
        priceNpr: 4600,
        note: "4:45 AM departure · Private vehicle",
      },
      {
        id: "ayurvedic-massage",
        name: "60-Min Post-Trek Deep Tissue Spa Ritual (Per Guest)",
        priceUsd: 28,
        priceNpr: 3700,
        note: "Onsite wellness sanctuary",
      },
    ],
    reviews: [
      {
        author: "claire_vandermolen",
        origin: "Amsterdam · Post-Annapurna Stay",
        rating: 5,
        quote:
          "After ten days on the trail, stepping into Pokhara Boutique's pool garden felt like pure heaven. Quiet Khahare location just a short stroll from Phewa Lake.",
      },
      {
        author: "Rohan & Meera Kapoor",
        origin: "New Delhi · Family Holiday",
        rating: 5,
        quote:
          "Beautiful blend of traditional Nepali woodcraft and crisp modern bathrooms after their 2024 renovation. Staff arranged our Sarangkot sunrise effortlessly.",
      },
      {
        author: "Thomas Lindqvist",
        origin: "Stockholm · Solo Traveler",
        rating: 5,
        quote:
          "Spotless balcony room, warm hospitality, and far more peaceful than the noisy bar strip while still four minutes from the lakefront.",
      },
    ],
    faqs: [
      {
        q: "Why book directly on our official website instead of Booking.com or Agoda?",
        a: "Direct guests automatically save ~15% off third-party OTA rates, receive complimentary welcome drinks, priority balcony room allocation, and flexible date adjustments.",
      },
      {
        q: "How far is Pokhara Boutique Hotel from Phewa Lake and Pokhara International Airport?",
        a: "We are a 4-minute walk from Phewa Lake in serene North Lakeside (20th Street, Khahare), about 1.4 km from Tal Barahi Temple, and 20 minutes by private car from Pokhara International Airport.",
      },
      {
        q: "Can you store our luggage while we trek Annapurna or Mardi Himal?",
        a: "Yes—complimentary secure luggage storage and permit/transport assistance are included for all staying guests before and after their trek.",
      },
    ],
    currentWebsiteUrl: "https://pokharaboutique.com/",
    currentWebsiteFlaw:
      "Every room on pokharaboutique.com currently displays '$0 per night', prints raw '## DISCOVER OUR ROOMS' markdown tags, and shows copy-pasted text from 'The Terraces at 2000m'.",
    pitchPriceNpr: 24999,
    monthlyCareNpr: 2500,
  },

  // 2. BOUTIQUE HERITAGE HOME (PATAN)
  {
    cohort: "kora",
    slug: "boutique-heritage-patan",
    engine: "kora-stay",
    palette: "malla-terracotta",
    name: "Boutique Heritage Home",
    shortName: "Boutique Heritage Home",
    monogram: "BHH",
    sectorLabel: "150-Year Newari Heritage Residence",
    tagline: "A 150-Year Restored Patan Courtyard Five Minutes from UNESCO Durbar Square.",
    editorialIntro:
      "Lovingly preserved across four storeys by the Pradhan family in quiet Saugal Tole, Boutique Heritage Home invites discerning travelers into authentic 19th-century Newari brick-and-timber living—paired with sunlit rooftop terraces, solar-heated modern baths, and uninterrupted calm.",
    heroEyebrow: "245 Saugal Tole · Patan Durbar Square UNESCO Zone · Lalitpur",
    city: "Lalitpur",
    neighborhood: "Saugal Tole, Patan",
    fullAddress: "245 Saugal Tole, Lalitpur-8, Patan 44700, Kathmandu Valley, Nepal",
    coordinates: "27.6722° N, 85.3253° E · 1,320m",
    landmark: "5-minute walk from Patan Durbar Square & Golden Temple (Hiranya Varna Mahavihar)",
    phoneDisplay: "+977 985-1075282",
    phoneTel: "+9779851075282",
    whatsappDigits: "9779851075282",
    email: "heritagehomenepal@gmail.com",
    hours: "24-Hour Family Concierge · Host: Naveen Pradhan (+977 01-5522831)",
    heroImage: "/images/kora/patan-heritage-courtyard.jpg",
    established: "150-Year Family Residence · 17 Restored Heritage Rooms",
    principalOrFounder: "Naveen Pradhan",
    principalTitle: "Proprietor & Heritage Host",
    credentialsBadge: "96% Guest Recommendation · 5.0/6 HolidayCheck · UNESCO Patan",
    stats: [
      { label: "Architectural Age", value: "150 Yrs", detail: "Authentic 4-storey Newari residence" },
      { label: "Heritage Suites", value: "17", detail: "Including top-floor terrace suites" },
      { label: "Durbar Square", value: "5 Min", detail: "Quiet car-free Saugal Tole lane" },
      { label: "All-Inclusive", value: "Tax + B&B", detail: "Breakfast, 10% SC & 13% VAT included" },
    ],
    pillars: [
      {
        code: "01",
        title: "Living Newa Architecture",
        body: "Hand-molded terracotta brick, low-slung seasoned sal-wood beams, and traditional lattice windows—thoughtfully retrofitted with modern en-suite bathrooms, 24h solar hot water, and backup power.",
      },
      {
        code: "02",
        title: "Hushed Saugal Tole Sanctuary",
        body: "Tucked away from Kathmandu traffic noise inside one of Patan's oldest bronze-casting and courtyard neighborhoods, yet steps from the Patan Museum.",
      },
      {
        code: "03",
        title: "Personal Stewardship",
        body: "Hosted personally by Naveen Pradhan and family—complete with fresh fruit baskets, homemade breakfast, bicycle rentals, and insider artisan workshop walks.",
      },
    ],
    stayRooms: [
      {
        id: "queen-heritage",
        name: "Heritage Queen Courtyard Room",
        subtitle: "Classic Timber Beams · Quiet Inner-Lane View",
        sizeSqm: 20,
        maxGuests: "1–2 Adults",
        bedConfig: "1 Handcrafted Queen Bed",
        rateUsd: 60,
        rateNpr: 7900,
        otaRateUsd: 72,
        features: [
          "Includes homemade breakfast, 10% service charge & 13% VAT",
          "Welcome fresh fruit basket & mineral water",
          "Modern en-suite bath with 24h solar hot water",
          "Uninterrupted backup power & high-speed Wi-Fi",
        ],
      },
      {
        id: "kings-suite",
        name: "King's Heritage Suite",
        subtitle: "Generous Sitting Alcove · Traditional Newa Woodwork",
        sizeSqm: 28,
        maxGuests: "2 Adults",
        bedConfig: "1 King Bed + Reading Lounge",
        rateUsd: 90,
        rateNpr: 11900,
        otaRateUsd: 106,
        features: [
          "Includes breakfast, 10% service charge & 13% VAT",
          "Spacious living corner ideal for multi-night cultural stays",
          "Complimentary housekeeping & curated Patan walking map",
          "Fruit basket, organic toiletries & solar rain shower",
        ],
        badge: "Cultural Favorite",
      },
      {
        id: "junior-terrace-suite",
        name: "Top-Floor Junior Suite with Private Terrace",
        subtitle: "4th Storey Crown · Private Rooftop Overlooking Patan Temples",
        sizeSqm: 34,
        maxGuests: "Up to 3 Adults",
        bedConfig: "King / Triple Heritage Configuration",
        rateUsd: 110,
        rateNpr: 14500,
        otaRateUsd: 130,
        features: [
          "Private sunlit terrace overlooking historic Patan rooftops",
          "Includes breakfast, 10% service charge & 13% VAT",
          "Also bookable as Studio or 1-Bedroom Long-Stay Apartment",
          "Priority TIA airport pickup coordination with Naveen",
        ],
        badge: "Signature Suite",
      },
    ],
    stayAddons: [
      {
        id: "tia-pickup",
        name: "Private Tribhuvan International Airport (TIA) Meet & Transfer",
        priceUsd: 20,
        priceNpr: 2650,
        note: "20-min drive straight to Saugal Tole",
      },
      {
        id: "artisan-walk",
        name: "Guided Patan Hidden Bahals & Lost-Wax Bronze Artisan Walk",
        priceUsd: 30,
        priceNpr: 3950,
        note: "Half-day private cultural historian",
      },
      {
        id: "bicycle-day",
        name: "Heritage Valley Bicycle Rental (Per Day)",
        priceUsd: 10,
        priceNpr: 1350,
        note: "Explore Patan, Bungamati & Khokana",
      },
    ],
    reviews: [
      {
        author: "Sabine & Markus H.",
        origin: "Munich · Verified HolidayCheck Review",
        rating: 5,
        quote:
          "An oasis of stillness five minutes from Patan Durbar Square. You sleep inside 150 years of authentic Nepali history without sacrificing hot showers or warm hospitality.",
      },
      {
        author: "Dr. Eleanor Vance",
        origin: "Oxford · Art History Fellow",
        rating: 5,
        quote:
          "The top-floor Junior Suite terrace at sunrise—watching temple bells wake up across Patan with homemade breakfast—beats every five-star chain hotel in Kathmandu.",
      },
      {
        author: "Jean-Luc Moreau",
        origin: "Lyon · 6-Night Cultural Stay",
        rating: 5,
        quote:
          "Naveen Pradhan and his team treat you like family. Quietest street in Lalitpur, spotless rooms, and incredible proximity to the Patan Museum.",
      },
    ],
    faqs: [
      {
        q: "Are taxes and breakfast already included in your listed room rates?",
        a: "Yes. Unlike city hotels that add 24.3% at checkout, all our listed rates ($40 Single to $120 King's Suite Deluxe) include daily breakfast, 10% service charge, and 13% VAT.",
      },
      {
        q: "Do you accommodate long-stay researchers, diplomats, and remote workers?",
        a: "Yes—our Studio Suite and 1-Bedroom Apartment are favorites for month-long stays in Patan, with backup power, fast fiber Wi-Fi, and full housekeeping every three days.",
      },
      {
        q: "How far is Boutique Heritage Home from Kathmandu Airport (TIA)?",
        a: "Saugal Tole in Patan is often faster to reach from Tribhuvan International Airport (approx. 5.5 km / 20 minutes via Ring Road) than Thamel.",
      },
    ],
    currentWebsiteUrl: "https://www.bhhnepal.com/",
    currentWebsiteFlaw:
      "bhhnepal.com runs on an unstyled 2012 static page (<title>bhhnepal</title>) with typos ('1 Bedeoom Apartmant'), 'upcoming.png' placeholder, broken Google Map API graphic, and no interactive booking calculator.",
    pitchPriceNpr: 22999,
    monthlyCareNpr: 2000,
  },

  // 3. HOTEL YECHU (BHAKTAPUR)
  {
    cohort: "kora",
    slug: "hotel-yechu-bhaktapur",
    engine: "kora-stay",
    palette: "bhaktapur-crimson",
    name: "Hotel Yechu",
    shortName: "Hotel Yechu",
    monogram: "HY",
    sectorLabel: "Newa Heritage Boutique Hotel & Celebrations",
    tagline: "Soulful Newa Woodcraft, Courtyard Pool & Celebrated Gatherings in Bhaktapur.",
    editorialIntro:
      "Positioned along the scenic Kamalbinayak–Nagarkot corridor moments from medieval Bhaktapur Durbar Square, Hotel Yechu unites intricate Malla-inspired woodcraft with 24+ luxury rooms, a tranquil swimming pool, authentic Newari gastronomy, and two grand celebration halls.",
    heroEyebrow: "Nagarkot Road 10 · Kamalbinayak · Bhaktapur 44800",
    city: "Bhaktapur",
    neighborhood: "Kamalbinayak – Nagarkot Road",
    fullAddress: "Nagarkot Rd 10, Kamalbinayak, Bhaktapur 44800, Nepal",
    coordinates: "27.6768° N, 85.4392° E · 1,401m",
    landmark: "Gateway between Bhaktapur Durbar Square & Nagarkot Sunrise Ridge",
    phoneDisplay: "+977 970-9105356",
    phoneTel: "+9779709105356",
    whatsappDigits: "9779709105356",
    email: "info@hotelyechu.com.np",
    hours: "24-Hour Front Office · Pool, Restaurant & Banquet Concierge",
    heroImage: "/images/kora/bhaktapur-heritage-hotel.jpg",
    established: "24+ Luxury Heritage Keys · 4.6★ Guest Rating",
    principalOrFounder: "General Manager & Reservations Desk",
    principalTitle: "Hotel Yechu Hospitality, Bhaktapur",
    credentialsBadge: "4.6★ Rated · Pool, Newari Restaurant + 2 Grand Banquet Halls",
    stats: [
      { label: "Luxury Rooms", value: "24+", detail: "Handcrafted Newa heritage interiors" },
      { label: "Guest Rating", value: "4.6★", detail: "Celebrated warmth & cleanliness" },
      { label: "Event Halls", value: "2 Halls", detail: "Changu Narayan & Nawa Durga Halls" },
      { label: "Signature", value: "Pool + Fire", detail: "Swimming pool, fire camp & Newa dress" },
    ],
    pillars: [
      {
        code: "01",
        title: "Intricate Newa Craftsmanship",
        body: "Carved timber columns, warm terracotta textures, and curated cultural corners—including an authentic Newari Dress Corner for memorable family portraits.",
      },
      {
        code: "02",
        title: "Resort Amenities in Bhaktapur",
        body: "Outdoor swimming pool, evening fire-camp lounge, dedicated children's play garden, and signature Newari culinary feasts featuring Juju Dhau.",
      },
      {
        code: "03",
        title: "Grand Halls for Weddings & Retreats",
        body: "Host corporate offsites, Bratabandhas, and heritage weddings inside our purpose-built Changu Narayan Hall and Nawa Durga Hall.",
      },
    ],
    stayRooms: [
      {
        id: "deluxe-twin",
        name: "Luxury Double / Twin Heritage Room",
        subtitle: "2 Twin Beds or Double · Artisanal Wood Detailing",
        sizeSqm: 24,
        maxGuests: "2 Adults",
        bedConfig: "2 Plush Twin Beds",
        rateUsd: 45,
        rateNpr: 5950,
        otaRateUsd: 54,
        features: [
          "Swimming pool access & morning breakfast included",
          "Handcrafted Newa wooden trim & sound-insulated comfort",
          "High-speed Wi-Fi, workspace & modern rain bathroom",
          "Easy access to Bhaktapur Durbar Square & Changu Narayan",
        ],
      },
      {
        id: "balcony-bliss",
        name: "Balcony Bliss Deluxe Room",
        subtitle: "Private Balcony · Courtyard & Nagarkot Hill Breeze",
        sizeSqm: 28,
        maxGuests: "2–3 Adults",
        bedConfig: "King Heritage Bed + Private Balcony",
        rateUsd: 50,
        rateNpr: 6600,
        otaRateUsd: 60,
        features: [
          "Sunlit private balcony overlooking tranquil greenery",
          "Complimentary breakfast + welcome Juju Dhau tasting",
          "Pool, evening fire-camp zone & Newari Dress Corner access",
          "15% direct-booking savings vs third-party travel portals",
        ],
        badge: "Signature Balcony",
      },
      {
        id: "spacious-harmony",
        name: "Spacious Harmony Deluxe Family Suite",
        subtitle: "1 Twin + 2 Full Beds · Ideal for Families & Retreats",
        sizeSqm: 36,
        maxGuests: "Up to 5 Guests",
        bedConfig: "1 Twin Bed & 2 Full Beds",
        rateUsd: 55,
        rateNpr: 7300,
        otaRateUsd: 68,
        features: [
          "Generous multi-bed suite crafted for families & groups",
          "Full access to swimming pool & kids' garden play zone",
          "Breakfast included + priority family dining table",
          "Optional Nagarkot sunrise car arrangement from reception",
        ],
        badge: "Best Family Value",
      },
    ],
    stayAddons: [
      {
        id: "newari-bhoj",
        name: "Royal Newari Samay Baji & Juju Dhau Evening Dinner (2 Guests)",
        priceUsd: 24,
        priceNpr: 3200,
        note: "Chef's curated Bhaktapur heritage menu",
      },
      {
        id: "nagarkot-sunrise",
        name: "Private Nagarkot Sunrise Tower Return Transfer",
        priceUsd: 28,
        priceNpr: 3700,
        note: "25-min scenic drive up Nagarkot Rd",
      },
      {
        id: "banquet-inquiry",
        name: "Request Changu Narayan / Nawa Durga Banquet Hall Proposal",
        priceUsd: 0,
        priceNpr: 0,
        note: "Custom corporate retreat or wedding menu quote",
      },
    ],
    banquetHalls: [
      {
        name: "Changu Narayan Hall",
        capacity: "Up to 220 Guests",
        useCase: "Heritage Weddings, Receptions & Gala Dinners",
        startingNpr: 1850,
      },
      {
        name: "Nawa Durga Hall",
        capacity: "Up to 90 Delegates",
        useCase: "Corporate Offsites, NGO Conferences & Family Ceremonies",
        startingNpr: 1600,
      },
    ],
    reviews: [
      {
        author: "Prashant & Shristi Shrestha",
        origin: "Kathmandu · Weekend Retreat & Banquet",
        rating: 5,
        quote:
          "A rare gem in Bhaktapur—carved Newa heritage charm combined with a clean swimming pool, great parking, and genuinely delicious Newari cuisine.",
      },
      {
        author: "Hannah Lindemann",
        origin: "Berlin · Cultural Traveler",
        rating: 5,
        quote:
          "Staying along Nagarkot Road meant peaceful nights away from city dust, easy trips to both Bhaktapur Durbar Square and Nagarkot sunrise, and wonderful staff.",
      },
      {
        author: "Niraj Karmacharya",
        origin: "Lalitpur · Corporate Residential Workshop",
        rating: 5,
        quote:
          "We hosted our two-day leadership retreat in Nawa Durga Hall with overnight rooms and an evening campfire. Seamless execution from start to finish.",
      },
    ],
    faqs: [
      {
        q: "Can we inquire for both guest rooms and Changu Narayan / Nawa Durga Banquet Halls online?",
        a: "Yes—select your dates above and toggle the Banquet Hall proposal option, or message our reservations desk directly on WhatsApp (+977 9709105356) for per-plate wedding and conference packages.",
      },
      {
        q: "How close is Hotel Yechu to Bhaktapur Durbar Square and Nagarkot?",
        a: "We are located on Nagarkot Road 10 in Kamalbinayak—just 7 minutes from Bhaktapur Durbar Square and 25–30 minutes below the Nagarkot Himalayan viewpoint.",
      },
      {
        q: "Is on-site parking available for private cars and event guests?",
        a: "Yes, complimentary secure on-site parking is available for both overnight hotel guests and banquet event attendees.",
      },
    ],
    currentWebsiteUrl: "https://hotelyechu.com.np/",
    currentWebsiteFlaw:
      "Homepage hero dumps raw exposed form validation messages ('Looks good! Field cannot be empty' repeated 6 times), duplicates the same 3 room cards 3x, and Halls/Gallery links point to dead '#'.",
    pitchPriceNpr: 24999,
    monthlyCareNpr: 2500,
  },

  // 4. GRIHA PRABESH DESIGN STUDIO (ARCHITECTURE & CIVIL ENGINEERING)
  {
    cohort: "kora",
    slug: "griha-prabesh-architects",
    engine: "kora-architecture",
    palette: "concrete-monograph",
    name: "Griha Prabesh Design Studio",
    shortName: "Griha Prabesh",
    monogram: "GP",
    sectorLabel: "Architecture, Structural Engineering & Turnkey Build",
    tagline: "Seismic-Engineered Residences, Municipality Naksa & Timeless Nepali Homes.",
    editorialIntro:
      "Founded in Lalitpur by Architect Manjil Bista and a multidisciplinary team of NEC & IOE-trained structural civil engineers, Griha Prabesh Design Studio unites expressive residential architecture with NBC-105 earthquake engineering, seamless municipality compliance, and transparent turnkey construction.",
    heroEyebrow: "Gwarko, Lalitpur · Est. 2018 · Architecture & Civil Engineering",
    city: "Lalitpur",
    neighborhood: "Gwarko, Lalitpur",
    fullAddress: "Gwarko Mini Bazar, Ring Road Corridor, Lalitpur, Kathmandu Valley",
    coordinates: "27.6665° N, 85.3338° E · NBC-105 Compliant",
    landmark: "Gwarko Chowk, Lalitpur · Serving Kathmandu, Lalitpur, Bhaktapur & NRN Clients",
    phoneDisplay: "+977 984-0061834",
    phoneTel: "+9779840061834",
    whatsappDigits: "9779840061834",
    email: "grihaprabesh.designs@gmail.com",
    ccEmail: "ar.artchxeel@gmail.com",
    hours: "Sun – Fri · 9:30 AM – 6:00 PM (Site Visits & NRN Video Consultations by Appointment)",
    heroImage: "/images/kora/nepal-modern-architecture.jpg",
    established: "Est. 2018 · Incorporated April 2019",
    principalOrFounder: "Ar. Manjil Bista",
    principalTitle: "Principal Architect (B.Arch, NEC) & Civil Engineering Partners",
    credentialsBadge: "NEC & IOE Structural Engineers · Municipality Naksa, 3D BIM & Turnkey",
    stats: [
      { label: "Core Principals", value: "4", detail: "1 Lead Architect + 3 Structural Engineers" },
      { label: "Seismic Code", value: "NBC-105", detail: "Ductile RCC, Lintel & Sill-Band precision" },
      { label: "Full Scope", value: "A–Z", detail: "Naksa Pass, 3D Walkthrough, Valuation & Build" },
      { label: "NRN Reporting", value: "Weekly", detail: "Drone & stage-wise milestone video logs" },
    ],
    pillars: [
      {
        code: "01",
        title: "Vastu-Aware Contemporary Architecture",
        body: "Sunlit courtyards, natural cross-ventilation, and crisp modern elevations tailored to Kathmandu & Lalitpur plot geometry, setback bylaws, and FAR norms.",
      },
      {
        code: "02",
        title: "In-House Structural & Seismic Rigor",
        body: "Unlike pure styling studios, three dedicated Civil & Structural Engineers verify soil bearing, column-beam ductility, lintel/sill bands, and earthquake resilience.",
      },
      {
        code: "03",
        title: "Precise BOQ Estimation & Bank Valuation",
        body: "Itemized Bill of Quantities down to cement bags and rebar tonnage—preventing contractor budget overruns before a single foundation trench is excavated.",
      },
    ],
    teamMembers: [
      {
        name: "Ar. Manjil Bista",
        role: "Principal Architect",
        credential: "B.E. Architecture, Nepal Engineering College · Master Planning, 3D BIM & Interiors",
      },
      {
        name: "Er. Shreeram Lamichhane",
        role: "Senior Structural & Site Engineer",
        credential: "B.E. Civil Engineering, IOE Western Regional Campus · Seismic Structural Analysis",
      },
      {
        name: "Er. Bibek Giri",
        role: "Civil & Structural Engineer",
        credential: "B.E. Civil Engineering, Nepal Engineering College · Site Supervision & Infrastructure",
      },
      {
        name: "Er. Sudip Ghimire",
        role: "Civil Engineer & Municipality Lead",
        credential: "B.E. Civil Engineering, Kurukshetra University · Bylaws, Naksa Pass & Valuation",
      },
    ],
    archUnitLabel: "Total Built-Up Plinth + Floors Area (Sq.Ft)",
    archDefaultSqft: 2600,
    archMinSqft: 1000,
    archMaxSqft: 7500,
    archTiers: [
      {
        id: "naksa-design",
        name: "Architectural Design, 3D BIM & Municipality Naksa",
        ratePerSqftNpr: 65,
        timelineWeeks: "3 – 5 Weeks",
        summary:
          "Complete architectural floor plans, seismic structural analysis, photorealistic 3D exterior renders, itemized BOQ, and full EBPS Municipality Naksa Pass documentation.",
        deliverables: [
          "2D Concept Plans + Vastu & Sunlight Optimization",
          "ETABS / SAP2000 NBC-105 Structural Drawings",
          "Photorealistic 3D Exterior Views & Walkthrough",
          "Electrical, Sanitary & Detailed Bank-Ready BOQ",
        ],
      },
      {
        id: "grey-structure",
        name: "Engineered Seismic RCC Grey Structure + Supervision",
        ratePerSqftNpr: 2350,
        timelineWeeks: "18 – 24 Weeks",
        summary:
          "Full structural construction from foundation tie-beams to brick masonry, lintel/sill bands, and slab casting with daily engineer quality audits.",
        deliverables: [
          "Grade-500 TMT Rebar & Tested OPC Cement Slabs",
          "Mandatory Lintel & Sill-Band Earthquake Detailing",
          "First-Class Brickwork, Plaster & Waterproofing",
          "Weekly Engineer Inspection Reports for Homeowners/NRNs",
        ],
        popular: true,
      },
      {
        id: "turnkey-residence",
        name: "Turnkey Griha Prabesh Ready-to-Move Residence",
        ratePerSqftNpr: 4150,
        timelineWeeks: "36 – 48 Weeks",
        summary:
          "From bare land in Lalitpur or Kathmandu to handing over the auspicious Griha Prabesh keys—architecture, structure, UPVC/teak joinery, modular kitchen, and premium interiors.",
        deliverables: [
          "Complete Architectural + Structural + Naksa Package Free",
          "Premium Flooring, Modular Kitchen & Custom Wardrobes",
          "Kohler/Jaquar Sanitaryware, Lighting & False Ceiling",
          "Fixed-Milestone Contract with Zero Hidden Escalations",
        ],
      },
    ],
    archProjects: [
      {
        title: "Tikabhairab Hillside Courtyard Residence",
        location: "Tikabhairab, Godawari-9, Lalitpur",
        category: "Residential Architecture",
        areaSqft: "3,150 sq.ft · 2.5 Storeys",
        year: "Completed",
        brief: "Climate-responsive family villa framing southern Godawari forest views with exposed brick accents and seismic-compliant cantilevered terraces.",
      },
      {
        title: "Lele-Shikharpa Modern Family Residence",
        location: "Godawari-6, Lele-Shikharpa, Lalitpur",
        category: "Architecture & Structural",
        areaSqft: "2,800 sq.ft · 3 Storeys",
        year: "Completed",
        brief: "Full municipality Naksa, NBC-105 ductile structural engineering, and sunlit double-height living core built for multi-generational comfort.",
      },
      {
        title: "Tinthana–Naikap Contemporary Villa",
        location: "Tinthana, Naikap, Kathmandu",
        category: "Turnkey Design & Build",
        areaSqft: "3,400 sq.ft · 3.5 Storeys",
        year: "Completed",
        brief: "Compact urban plot optimized for maximum southern daylight, dual-car parking, rental ground unit, and owner's duplex penthouse.",
      },
    ],
    reviews: [
      {
        author: "Rameshwar Maharjan",
        origin: "Godawari, Lalitpur · Residential Homeowner",
        rating: 5,
        quote:
          "Manjil sir and his civil engineering team handled our Godawari house from first sketch and municipality Naksa pass right through structural slab inspections.",
      },
      {
        author: "Sujata & Bikram KC",
        origin: "Sydney (NRN) · Building in Imadol, Lalitpur",
        rating: 5,
        quote:
          "Having both the architect and three civil engineers under one roof gave us total peace of mind from Australia. Their itemized BOQ saved us lakhs.",
      },
      {
        author: " Prakash Thapa",
        origin: "Naikap, Kathmandu · 3.5-Storey Residence",
        rating: 5,
        quote:
          "Clear municipality setback guidance, strong earthquake detailing with proper sill and lintel bands, and 3D renders that matched the finished house.",
      },
    ],
    faqs: [
      {
        q: "What municipality norms (setback, ROW & FAR) apply before building in Lalitpur or Kathmandu?",
        a: "Most residential zones require a minimum 1.5m setback on sides with windows, strict road Right-of-Way (ROW) clearance (typically 6m+ road width), and Floor Area Ratio compliance. We verify your Lalpurja and trace map in our very first consultation.",
      },
      {
        q: "Can Non-Resident Nepalis (NRNs) commission Griha Prabesh remotely?",
        a: "Yes. Many of our clients live in Australia, the US, UK, and Japan. We run Zoom 3D BIM reviews, handle Ward/Municipality EBPS Naksa filings with family POA, and send stage-by-stage structural video updates.",
      },
      {
        q: "Why are Lintel & Sill Bands non-negotiable in our structural drawings?",
        a: "Following the 2072 Gorkha earthquake, continuous RCC sill and lintel bands tie masonry walls into a unified box action—preventing out-of-plane wall collapse and corner cracking.",
      },
    ],
    currentWebsiteUrl: "https://grihaprabesh.com.np/",
    currentWebsiteFlaw:
      "grihaprabesh.com.np currently leaves template filler text ('Description of Our Amazing team.') below your engineers, shows a 'Test Notice 30 Jun 2020' (#), a broken Google Map token error, and lacks an interactive Naksa/BOQ estimator.",
    pitchPriceNpr: 21999,
    monthlyCareNpr: 2000,
  },

  // 5. NEPAL INTERIORS PVT. LTD
  {
    cohort: "kora",
    slug: "nepal-interiors-studio",
    engine: "kora-architecture",
    palette: "smoked-oak-brass",
    name: "Nepal Interiors Pvt. Ltd",
    shortName: "Nepal Interiors",
    monogram: "NI",
    sectorLabel: "Luxury Interior Architecture & Turnkey Fit-Out",
    tagline: "Concept to Lavish Finishing for Nepal's Finest Villas, Resorts & Hospitality.",
    editorialIntro:
      "With more than twelve years of design-and-build mastery across Nepal and India, Nepal Interiors Pvt. Ltd transforms bare concrete shells into richly tactile residences, boutique hotel suites, and signature commercial lounges—executed in-house from 3D visualization to bespoke joinery and waterproofing.",
    heroEyebrow: "Pepsicola, Kathmandu · 12+ Years Across Nepal & India",
    city: "Kathmandu",
    neighborhood: "Pepsicola, Kathmandu",
    fullAddress: "Pepsicola Town Planning Corridor, Kathmandu 44600, Nepal",
    coordinates: "27.6894° N, 85.3612° E · Concept to Key",
    landmark: "Serving Kathmandu, Bhaktapur, Lalitpur, Pokhara & Resort Destinations",
    phoneDisplay: "+977 985-1338892",
    phoneTel: "+9779851338892",
    whatsappDigits: "9779851338892",
    email: "nepalinteriors8848@gmail.com",
    hours: "Sun – Fri · 10:00 AM – 6:30 PM · On-Site Laser Measurement Available",
    heroImage: "/images/kora/luxury-interior-kathmandu.jpg",
    established: "12+ Years Experience (Nepal & India)",
    principalOrFounder: "Principal Design & Turnkey Execution Studio",
    principalTitle: "Nepal Interiors Pvt. Ltd",
    credentialsBadge: "12+ Yrs Nepal & India · Villas, Hotels, Resorts & Commercial Fit-Out",
    stats: [
      { label: "Track Record", value: "12+ Yrs", detail: "Executed across Nepal & India" },
      { label: "3D Realism", value: "100%", detail: "V-Ray / Corona walkthroughs pre-build" },
      { label: "Bespoke", value: "In-House", detail: "Custom joinery, marble, lighting & acoustic" },
      { label: "Warranty", value: "5-Year", detail: "Waterproofing, hardware & finish assurance" },
    ],
    pillars: [
      {
        code: "01",
        title: "Photorealistic 3D Spatial Visualization",
        body: "Walk through every veneer grain, brass shadow gap, cove light temperature, and marble book-match in 4K 3D before carpentry begins on site.",
      },
      {
        code: "02",
        title: "Villas, Boutique Hotels & Resort Suites",
        body: "Specialized hospitality and luxury residential execution—combining heavy-duty commercial durability with quiet five-star warmth.",
      },
      {
        code: "03",
        title: "Waterproofing to White-Glove Styling",
        body: "Unlike surface decorators, our technical civil crew handles terrace waterproofing, concealed HVAC/electrical, false ceilings, modular kitchens, and custom upholstery.",
      },
    ],
    archUnitLabel: "Interior Carpet Area to Fit Out (Sq.Ft)",
    archDefaultSqft: 1800,
    archMinSqft: 500,
    archMaxSqft: 6000,
    archTiers: [
      {
        id: "essential-bespoke",
        name: "Curated Contemporary Residence Fit-Out",
        ratePerSqftNpr: 1850,
        timelineWeeks: "6 – 9 Weeks",
        summary:
          "Complete 3D interior design, Hettich/Hafele modular kitchen, master wardrobes, gypsum cove false ceilings, warm architectural lighting, and Asian Paints Royale finish.",
        deliverables: [
          "Room-by-Room 3D Renders & Working Carpentry Drawings",
          "Marine-Ply Modular Kitchen + Floor-to-Ceiling Wardrobes",
          "Gypsum Cove Ceilings & Warm 3000K Architectural LEDs",
          "Dedicated Site Supervisor & Fixed Delivery Schedule",
        ],
      },
      {
        id: "signature-villa",
        name: "Signature Luxury Villa & Penthouse Finishing",
        ratePerSqftNpr: 3100,
        timelineWeeks: "10 – 14 Weeks",
        summary:
          "Smoked oak & teak veneers, quartz/Italian marble countertops, fluted glass partitions, custom upholstered sofas, bathroom waterproofing, and turnkey decor.",
        deliverables: [
          "Natural Seasoned Veneer, Fluted Panels & Brass Inlays",
          "Quartz / Italian Marble Countertops & Vanity Suites",
          "Bespoke Living/Dining Furniture & Acoustic Drapery",
          "Complete Damp-Proofing, Waterproofing & 5-Yr Hardware Warranty",
        ],
        popular: true,
      },
      {
        id: "hospitality-commercial",
        name: "Boutique Hotel, Resort & Fine-Dining Turnkey",
        ratePerSqftNpr: 3650,
        timelineWeeks: "12 – 18 Weeks",
        summary:
          "High-impact commercial & hospitality interiors engineered for guest awe, acoustic comfort, rapid room-turnover durability, and brand distinction.",
        deliverables: [
          "Lobby, Suite Mockup Room, Restaurant & Bar Millwork",
          "Acoustic Baffles, Commercial-Grade Fabrics & Stone",
          "Concealed MEP, Mood Dimming Scenes & Signage Craft",
          "Fast-Track Phased Handover for Early Opening Revenue",
        ],
      },
    ],
    archProjects: [
      {
        title: "Bhaktapur Private Residence — Full Finishing",
        location: "Bhaktapur, Kathmandu Valley",
        category: "Villa Turnkey & Waterproofing",
        areaSqft: "3,200 sq.ft · Full Villa",
        year: "Recent",
        brief: "Comprehensive structural waterproofing, custom teak woodwork, warm cove-lit living salon, and bespoke modular culinary kitchen.",
      },
      {
        title: "Budhanilkantha Contemporary Duplex Interior",
        location: "Budhanilkantha, Kathmandu",
        category: "Luxury Residential",
        areaSqft: "2,650 sq.ft · Duplex",
        year: "Completed",
        brief: "Double-height travertine media wall, smoked oak paneling, concealed bar cabinetry, and serene hotel-grade master suite.",
      },
      {
        title: "Lakeside Boutique Resort Guest Suites",
        location: "Pokhara / Resort Corridor",
        category: "Hospitality Fit-Out",
        areaSqft: "4,800 sq.ft · 12 Suites + Lounge",
        year: "Completed",
        brief: "Warm Nepali artisanal accents paired with durable hospitality joinery, ambient bedside lighting, and spa-inspired stone bathrooms.",
      },
    ],
    reviews: [
      {
        author: "Sanjeev & Pooja Agrawal",
        origin: "Kathmandu · Private Villa Interior",
        rating: 5,
        quote:
          "Their cross-border experience in India and Nepal really shows in the finishing details—zero rough edges on veneers, proper waterproofing first, and punctual delivery.",
      },
      {
        author: "Dipendra Shrestha",
        origin: "Bhaktapur · Residence Finishing Client",
        rating: 5,
        quote:
          "From 3D renders to waterproofing and final wardrobe hardware, Nepal Interiors handled every trade so we didn't have to chase five separate contractors.",
      },
      {
        author: "Aayushma Rana",
        origin: "Jhamsikhel · Boutique Lounge Concept",
        rating: 5,
        quote:
          "They immediately understood the warm, understated luxury look we wanted and engineered custom brass lighting and banquettes right on budget.",
      },
    ],
    faqs: [
      {
        q: "Do you handle only 3D interior design or complete turnkey site execution as well?",
        a: "Both—most clients commission us for complete Concept-to-Key execution (waterproofing, electrical/plumbing modifications, false ceiling, custom joinery, stone, painting, and furniture), though standalone 3D visualization packages are also available.",
      },
      {
        q: "How do you prevent dampness and peeling walls common in Kathmandu Valley homes?",
        a: "Before installing a single wooden panel, our technical crew conducts moisture-meter checks and applies multi-stage crystalline waterproofing on wet walls, bathrooms, and terraces.",
      },
      {
        q: "How does your payment schedule work on turnkey interior projects?",
        a: "Payments are strictly tied to physical site milestones: 10% 3D Design & BOQ sign-off, 30% raw material & marine-ply mobilization, 35% joinery & ceiling installation, and final 25% upon polish, lighting, and snag-free handover.",
      },
    ],
    currentWebsiteUrl: "https://nepalinteriors.com.np/",
    currentWebsiteFlaw:
      "nepalinteriors.com.np redirects to '?i=1' free hosting with a 'Site.pro Website builder' footer watermark, '<title>Home</title>', generic 'UI/UX graphic design' copy, and no portfolio gallery or sq.ft estimator.",
    pitchPriceNpr: 21999,
    monthlyCareNpr: 2000,
  },

  // 6. SHARVAAYA SKIN & HAIR CLINIC (LAZIMPAT)
  {
    cohort: "kora",
    slug: "sharvaaya-clinic",
    engine: "kora-clinical",
    palette: "botanical-ivory",
    name: "Sharvaaya Skin & Hair Clinic",
    shortName: "Sharvaaya",
    monogram: "SS",
    sectorLabel: "Dermatology, FUE Hair Transplant & Regenerative Aesthetics",
    tagline: "Where Beauty Returns Whole — Evidence-Led Skin & Hair Restoration in Lazimpat.",
    editorialIntro:
      "Led by Dermatologist & Hair Transplant Surgeon Dr. Saujan Subedi next to Hotel Ambassador in diplomatic Lazimpat, Sharvaaya unites international clinical dermatology with natural-hairline FUE transplantation, Exosome & GFC regenerative trichology, and medical-grade laser care.",
    heroEyebrow: "Lazimpat (Next to Hotel Ambassador) · Kathmandu · Dr. Saujan Subedi",
    city: "Kathmandu",
    neighborhood: "Lazimpat, Kathmandu",
    fullAddress: "Lazimpat Road (Adjacent to Hotel Ambassador), Kathmandu 44600, Nepal",
    coordinates: "27.7215° N, 85.3204° E · Sun–Fri 10 AM – 6 PM",
    landmark: "Next to Hotel Ambassador, Lazimpat · Private Patient Parking",
    phoneDisplay: "+977 981-1210298",
    phoneTel: "+9779811210298",
    whatsappDigits: "9779811210298",
    email: "sharvaayaskinhair@gmail.com",
    hours: "Sunday – Friday · 10:00 AM – 6:00 PM (01-4502711 / +977 9811210298)",
    heroImage: "/images/kora/aesthetic-hair-clinic.jpg",
    established: "Surgeon-Led Clinical Dermatology & Trichology",
    principalOrFounder: "Dr. Saujan Subedi",
    principalTitle: "Consultant Dermatologist & FUE Hair Transplant Surgeon",
    credentialsBadge: "Surgeon-Performed FUE · PRP, GFC & Exosomes · FDA-Grade Laser Suite",
    stats: [
      { label: "Core Specialties", value: "9+", detail: "OPD Derm, FUE, Exosomes, Laser & Botox" },
      { label: "Protocols", value: "100%", detail: "Evidence-backed medical dermatology" },
      { label: "Graft Design", value: "Micro-FUE", detail: "Natural single-follicle hairline artistry" },
      { label: "Location", value: "Lazimpat", detail: "Discreet clinical sanctuary next to Ambassador" },
    ],
    pillars: [
      {
        code: "01",
        title: "Surgeon-Led FUE Hair Restoration",
        body: "Every hairline design, extraction plan, and slit angulation is directed by Dr. Saujan Subedi—achieving dense, undetectable natural growth.",
      },
      {
        code: "02",
        title: "Next-Gen Exosome, GFC & PRP Trichology",
        body: "Non-surgical regenerative therapies utilizing concentrated growth factors and cellular exosomes to reverse early thinning and supercharge graft survival.",
      },
      {
        code: "03",
        title: "Clinical Melasma, Acne Scar & Laser Precision",
        body: "Tailored protocols for Himalayan UV melasma, microneedling collagen induction, Hydrafacial & Oxygeno medi-facials, Botox, and diagnostic skin biopsy.",
      },
    ],
    hasGraftCalculator: true,
    graftRateNpr: 45,
    clinicalProcedures: [
      {
        id: "fue-transplant",
        name: "Micro-Sapphire FUE Hair Transplantation",
        category: "Hair Restoration",
        priceNpr: 85000,
        priceUsd: 640,
        sessionTime: "1-Day Outpatient (5–7 hrs)",
        downtime: "3–5 Days Mild Recovery",
        clinicalNote: "Surgeon-crafted natural hairline + complimentary post-op PRP booster session.",
        popular: true,
      },
      {
        id: "gfc-exosome",
        name: "GFC / Cellular Exosome Hair Regeneration Protocol",
        category: "Hair Restoration",
        priceNpr: 14500,
        priceUsd: 110,
        sessionTime: "45 Minutes",
        downtime: "Zero Downtime",
        clinicalNote: "High-concentration autologous Growth Factor Concentrate or Exosome scalp infusion.",
        popular: true,
      },
      {
        id: "laser-hair-reduction",
        name: "Medical Diode Full-Face / Body Laser Hair Reduction",
        category: "Regenerative & Laser",
        priceNpr: 6500,
        priceUsd: 50,
        sessionTime: "30–45 Minutes",
        downtime: "Zero Downtime · Safe for Nepali Skin Phototypes",
        clinicalNote: "Sapphire-cooled painless laser technology calibrated for Fitzpatrick III–V skin.",
      },
      {
        id: "melasma-peel-microneedling",
        name: "Acne Scar Microneedling & Custom Melasma Peel",
        category: "Regenerative & Laser",
        priceNpr: 5800,
        priceUsd: 45,
        sessionTime: "45 Minutes",
        downtime: "24–48 Hours Mild Pinkness",
        clinicalNote: "Targeted collagen-induction and pigment modulation prescribed after dermoscopy.",
      },
      {
        id: "hydrafacial-oxygeno",
        name: "Clinical Medi-Facial — HydraFacial / OxyGeneo",
        category: "Injectables & Skin",
        priceNpr: 6000,
        priceUsd: 46,
        sessionTime: "50 Minutes",
        downtime: "Immediate Event-Ready Glow",
        clinicalNote: "Deep vortex extraction, medical exfoliation, oxygenation, and peptide hydration.",
      },
      {
        id: "botox-opd",
        name: "Specialist Dermatology OPD & Anti-Wrinkle Injectable Consult",
        category: "Injectables & Skin",
        priceNpr: 1000,
        priceUsd: 10,
        sessionTime: "30-Min 1-on-1 with Dr. Saujan Subedi",
        downtime: "Diagnostic Dermoscopy & Plan",
        clinicalNote: "Comprehensive diagnosis for chronic skin/hair conditions, Botox mapping, or biopsy.",
      },
    ],
    reviews: [
      {
        author: "Aashish Bhattarai",
        origin: "Baluwatar, Kathmandu · FUE + GFC Patient",
        rating: 5,
        quote:
          "Dr. Saujan Subedi explained every step honestly without pushing unnecessary grafts. Ten months post-FUE, even my barber cannot tell my hairline was restored.",
      },
      {
        author: "Shruti & Kabita Joshi",
        origin: "Lazimpat · Melasma & Medi-Facial Care",
        rating: 5,
        quote:
          "After years of harsh over-the-counter creams, Sharvaaya's evidence-based peel and sunscreen protocol cleared 80% of my stubborn pigmentation safely.",
      },
      {
        author: "Roshan Gurung",
        origin: "UK (NRN Visit) · Exosome Hair Therapy",
        rating: 5,
        quote:
          "World-class hygiene right next to Hotel Ambassador. Did my consultation and Exosome session smoothly during my two-week Kathmandu trip.",
      },
    ],
    faqs: [
      {
        q: "Can NRN patients visiting Kathmandu for 7–14 days complete an FUE Hair Transplant at Sharvaaya?",
        a: "Yes. Send scalp photos via WhatsApp (+977 9811210298) before your flight for a preliminary graft estimate with Dr. Saujan Subedi. Day 1 is bloodwork & hairline mapping, Day 2 is your FUE procedure, Day 5 is your clinical head-wash check, and you are cleared to fly home.",
      },
      {
        q: "What is the difference between PRP, GFC, and Exosome therapy for hair loss?",
        a: "PRP uses platelet plasma; GFC isolates pure acellular growth factors with minimal discomfort and higher potency; Exosomes deliver thousands of regenerative signaling molecules ideal for diffuse thinning.",
      },
      {
        q: "Are your lasers and chemical peels safe for South Asian / Nepali skin tones?",
        a: "Absolutely. Every laser wavelength and peel concentration at Sharvaaya is selected by a board-certified dermatologist specifically to prevent post-inflammatory hyperpigmentation in Fitzpatrick III–V skin.",
      },
    ],
    currentWebsiteUrl: "http://www.sharvaayaskinhair.com/",
    currentWebsiteFlaw:
      "Loads over insecure HTTP ('Not Secure' browser warning), broken hero image prints literal developer note 'Add hero.jpg', counters read '0+ Services / 0% Science-Backed', and the Maps link is broken ('about:invalid#zClosurez').",
    pitchPriceNpr: 21999,
    monthlyCareNpr: 2000,
  },

  // 7. AESTHETIC AURA SKIN & HAIR CLINIC (BANESHWOR / SANKHAMUL)
  {
    cohort: "kora",
    slug: "aesthetic-aura-clinic",
    engine: "kora-clinical",
    palette: "champagne-silk",
    name: "Aesthetic Aura Skin & Hair Clinic",
    shortName: "Aesthetic Aura",
    monogram: "AA",
    sectorLabel: "95–98% Graft-Survival Hair Transplant & Medical Dermatology",
    tagline: "Twelve Years of Clinical Dermatology, DHT Hair Restoration & Sculpted Confidence.",
    editorialIntro:
      "Led by Consultant Dermatologist Dr. Isha Poudel Koirala on Sankhamul Marg, Baneshwor, Aesthetic Aura has spent over twelve years welcoming patients from Kathmandu, Pokhara, Chitwan, Biratnagar, and overseas—offering FUE, DHT & FUT hair restoration with 95–98% graft survival alongside HIFU, Skin Boosters, Fillers, and medical dermatology.",
    heroEyebrow: "Sankhamul Marg, Baneshwor · 12+ Years · Dr. Isha Poudel Koirala",
    city: "Kathmandu",
    neighborhood: "Sankhamul Marg, Baneshwor",
    fullAddress: "2nd Floor, B & S Building, Sankhamul Marg, Baneshwor, Kathmandu",
    coordinates: "27.6862° N, 85.3341° E · Nationwide & Overseas Fly-In Hub",
    landmark: "2nd Floor, B & S Building, Sankhamul Marg · 12 mins from Kathmandu Airport",
    phoneDisplay: "+977 976-6453850",
    phoneTel: "+9779766453850",
    whatsappDigits: "9779766453850",
    email: "aestheticauranepal@gmail.com",
    hours: "Sun – Fri · 9:30 AM – 6:30 PM · Out-of-Valley & Overseas Priority Slots",
    heroImage: "/images/kora/clinical-dermatology.jpg",
    established: "12+ Years Clinical Excellence in Kathmandu",
    principalOrFounder: "Dr. Isha Poudel Koirala",
    principalTitle: "Lead Consultant Dermatologist & Aesthetic Specialist",
    credentialsBadge: "95–98% Graft Survival · DHT / FUE / FUT · Board-Certified Derm Team",
    stats: [
      { label: "Graft Survival", value: "95–98%", detail: "Direct Hair Transplant (DHT), FUE & FUT" },
      { label: "Clinical Legacy", value: "12+ Yrs", detail: "Trusted across Nepal & overseas NRNs" },
      { label: "Patient Rating", value: "5.0★", detail: "Thousands of verified skin & hair cases" },
      { label: "Techniques", value: "3 Modes", detail: "Matched to your scalp—never one-size-fits-all" },
    ],
    pillars: [
      {
        code: "01",
        title: "DHT, FUE & FUT — Matched to Your Follicles",
        body: "Because no two donor areas are identical, our surgical team performs all three gold-standard techniques—minimizing out-of-body graft time for 95–98% survival.",
      },
      {
        code: "02",
        title: "Dr. Isha Poudel Koirala's Listening-First Care",
        body: "Thorough clinical diagnosis before any aesthetic recommendation—spanning chronic acne and pigmentation to subtle, natural-looking injectables.",
      },
      {
        code: "03",
        title: "Non-Surgical Lifting & Skin Boosters",
        body: "High-Intensity Focused Ultrasound (HIFU), Hyaluronic Skin Boosters, Dermal Fillers, Botox, Chemical Peels, and IV Antioxidant protocols.",
      },
    ],
    hasGraftCalculator: true,
    graftRateNpr: 42,
    clinicalProcedures: [
      {
        id: "dht-hair-transplant",
        name: "Direct Hair Transplant (DHT / FUE) — 95–98% Survival",
        category: "Hair Restoration",
        priceNpr: 82000,
        priceUsd: 620,
        sessionTime: "Single-Day Procedure",
        downtime: "3–5 Days",
        clinicalNote: "Simultaneous extraction & implantation for maximum follicle viability.",
        popular: true,
      },
      {
        id: "gfc-hair-therapy",
        name: "Autologous GFC Hair Regrowth Therapy",
        category: "Hair Restoration",
        priceNpr: 13500,
        priceUsd: 102,
        sessionTime: "40 Minutes",
        downtime: "Zero Downtime",
        clinicalNote: "Clinically proven growth-factor protocol for male & female pattern thinning.",
      },
      {
        id: "hifu-nonsurgical-lift",
        name: "Full-Face & Jawline HIFU Ultrasound Lifting",
        category: "Regenerative & Laser",
        priceNpr: 18500,
        priceUsd: 140,
        sessionTime: "60 Minutes",
        downtime: "Zero Surgery · Zero Downtime",
        clinicalNote: "Deep SMAS-layer collagen tightening for sculpted jawline & lifted brow.",
        popular: true,
      },
      {
        id: "hyaluronic-skin-booster",
        name: "Micro-Droplet Hyaluronic Skin Booster",
        category: "Injectables & Skin",
        priceNpr: 16000,
        priceUsd: 120,
        sessionTime: "45 Minutes",
        downtime: "24 Hours",
        clinicalNote: "Deep dermal hydration restoring glass-skin luminosity and smoothing fine lines.",
      },
      {
        id: "botox-dermal-fillers",
        name: "Precision Botox & Facial Contour Dermal Fillers",
        category: "Injectables & Skin",
        priceNpr: 15000,
        priceUsd: 115,
        sessionTime: "30 Minutes",
        downtime: "Immediate Return to Work",
        clinicalNote: "Performed by Dr. Isha Poudel Koirala for balanced, never-overdone facial harmony.",
      },
      {
        id: "iv-glutathione-antioxidant",
        name: "Clinical Antioxidant & Peel Brightening Protocol",
        category: "Regenerative & Laser",
        priceNpr: 6500,
        priceUsd: 50,
        sessionTime: "45 Minutes",
        downtime: "Zero Downtime",
        clinicalNote: "Combats Kathmandu urban pollution, UV oxidative stress, and uneven tone.",
      },
    ],
    reviews: [
      {
        author: "Suman Adhikari",
        origin: "Pokhara Fly-In Patient · DHT Hair Transplant",
        rating: 5,
        quote:
          "Traveled from Pokhara specifically for Aesthetic Aura's DHT team. Virtually painless day procedure and remarkable hairline density by month eight.",
      },
      {
        author: "Nisha Karki",
        origin: "Baneshwor, Kathmandu · GFC & Skin Booster",
        rating: 5,
        quote:
          "Dr. Isha Poudel Koirala actually listens for twenty minutes before suggesting anything. My GFC hair sessions showed visible baby hair reduction in shedding within weeks.",
      },
      {
        author: "Bibek Shrestha",
        origin: "Melbourne (NRN) · Hairline Restoration",
        rating: 5,
        quote:
          "Saved over AUD $8,000 compared to Melbourne clinics while getting 12-year veteran surgeons in Kathmandu. Seamless pre-flight WhatsApp coordination.",
      },
    ],
    faqs: [
      {
        q: "How do you decide between FUE, DHT, and FUT for my hair transplant?",
        a: "During dermoscopic donor mapping, we assess follicular unit density, scalp laxity, and target coverage grade. DHT minimizes graft time outside the body for 95–98% survival, while FUT/combo approaches maximize lifetime grafts in advanced grades.",
      },
      {
        q: "We are traveling from Pokhara, Chitwan, Biratnagar, or abroad—how quick is scheduling?",
        a: "Out-of-valley and overseas patients receive priority coordinated scheduling: pre-arrival video assessment on WhatsApp (+977 976-6453850) followed by next-day treatment just 12 minutes from Tribhuvan International Airport.",
      },
      {
        q: "Who performs Botox, Fillers, and HIFU procedures at Aesthetic Aura?",
        a: "All injectable and medical dermatology plans are clinically supervised and performed by Lead Consultant Dermatologist Dr. Isha Poudel Koirala and board-certified specialists.",
      },
    ],
    currentWebsiteUrl: "https://aestheticauraclinic.com/",
    currentWebsiteFlaw:
      "Broken text-splitting CSS spaces out every heading ('T o p   S k i n   H o s p i t a l') and all 5 homepage trust counters display '0+ Expert Team Members / 0% Patient Satisfaction / 0+ Years / 0+ Surgeries'.",
    pitchPriceNpr: 22999,
    monthlyCareNpr: 2000,
  },

  // 8. NEPAL TREKKING & EXPEDITION PVT. LTD. (EST. 1993 · GUIDE DU ROUTARD)
  {
    cohort: "kora",
    slug: "nepal-trek-expeditions",
    engine: "kora-expedition",
    palette: "alpine-glacier",
    name: "Nepal Trekking & Expedition Pvt. Ltd.",
    shortName: "Nepal Trekking 1993",
    monogram: "NTE",
    sectorLabel: "Est. 1993 · Multilingual Himalayan Mountaineering & Treks",
    tagline: "Thirty-Three Years of High-Himalayan Mastery — Direct from Kwabahal, Thamel.",
    editorialIntro:
      "Established in 1993 (Gov. Reg. No. 160/049/50) and famously recommended by France's Guide du Routard, Nepal Trekking & Expedition crafts bespoke, safety-first alpine treks and 6,000m+ peak ascents across Nepal, Mustang, Tibet & Bhutan—led by multilingual guides fluent in English, French, German, and Japanese.",
    heroEyebrow: "Est. 1993 · Gov. Reg. 160/049/50 · Guide du Routard Recommended",
    city: "Kathmandu",
    neighborhood: "Kwabahal, Thamel",
    fullAddress: "Kwabahal, Thamel, Kathmandu, Nepal (GPO Certified Expedition House)",
    coordinates: "27.7114° N, 85.3102° E · TAAN · NMA · NTB",
    landmark: "Historic Kwabahal Courtyard District, South Thamel · Francophone & Global Desk",
    phoneDisplay: "+977 985-1023291",
    phoneTel: "+9779851023291",
    whatsappDigits: "9779851023291",
    email: "nepaltrekking@gmail.com",
    hours: "24/7 Expedition Dispatch · Office +977 01-5353562 · Airport Meet in EN / FR / DE / JP",
    heroImage: "/images/kora/himalayan-high-expedition.jpg",
    established: "Established 1993 · 33+ Years Himalayan Safety Record",
    principalOrFounder: "Senior Expedition Directorate",
    principalTitle: "Nepal Trekking & Expedition Pvt. Ltd. (TAAN / NMA)",
    credentialsBadge: "Recommandé par Le Guide du Routard · EN / FR / DE / JP Guides",
    bilingualFrench: true,
    stats: [
      { label: "Heritage", value: "1993", detail: "Gov. Reg. 160/049/50 · 33+ years in Thamel" },
      { label: "Endorsed By", value: "Routard", detail: "Recommended direct local operator" },
      { label: "Languages", value: "4 Langs", detail: "English, Français, Deutsch & Japanese" },
      { label: "High Summit", value: "6,476m", detail: "Mera Peak, Island Peak, EBC 3 Passes & Dolpo" },
    ],
    pillars: [
      {
        code: "01",
        title: "Deal Directly with a 1993 Kathmandu Institution",
        body: "Bypass 40% European/US agency markups while enjoying veteran NMA-certified climbing Sherpas, pulse-oximeter altitude protocols, and high-grade expedition tents.",
      },
      {
        code: "02",
        title: "Multilingual Cultural Fluency (EN · FR · DE · JP)",
        body: "From French-speaking airport reception at TIA ('Prise en charge dès l'aéroport avec un guide francophone') to remote Upper Mustang and Kanchenjunga monasteries.",
      },
      {
        code: "03",
        title: "Tailor-Made À La Carte Itineraries",
        body: "Every acclimatization day, teahouse upgrade, and contingency flight across Nepal, Bhutan, and Tibet is customized around your pace—never forced into rigid mass groups.",
      },
    ],
    expeditionRoutes: [
      {
        id: "ebc-three-passes",
        name: "Everest Three High Passes & Base Camp",
        nameFr: "Les Trois Hauts Cols de l'Everest (Renjo, Cho La, Kongma La)",
        region: "Khumbu / Everest",
        days: 19,
        maxAltitudeM: 5545,
        grade: "Strenuous Alpine Trek",
        season: "Mar–May · Sep–Nov",
        soloUsd: 1980,
        duoUsd: 1690,
        groupUsd: 1490,
        badge: "Signature Khumbu Traverse",
        elevationWaypoints: [
          { dayLabel: "D01", place: "Kathmandu", altitudeM: 1400 },
          { dayLabel: "D03", place: "Namche", altitudeM: 3440 },
          { dayLabel: "D08", place: "Kongma La", altitudeM: 5535 },
          { dayLabel: "D10", place: "Kala Patthar", altitudeM: 5545 },
          { dayLabel: "D13", place: "Cho La Pass", altitudeM: 5420 },
          { dayLabel: "D16", place: "Renjo La", altitudeM: 5360 },
          { dayLabel: "D19", place: "Lukla/KTM", altitudeM: 2860 },
        ],
        highlights: [
          "Complete circuit crossing Kongma La (5,535m), Cho La (5,420m) & Renjo La (5,360m)",
          "Sunrise panorama from Gokyo Ri & Kala Patthar (5,545m) directly facing Everest",
          "Lukla return flights, Sagarmatha permits, teahouse full-board & multilingual guide",
        ],
      },
      {
        id: "mera-peak-6476",
        name: "Mera Peak Climbing Expedition (6,476m)",
        nameFr: "Ascension du Mera Peak (6 476 m) — Vallée du Hinku",
        region: "Makalu Barun / Hinku",
        days: 18,
        maxAltitudeM: 6476,
        grade: " Alpine PD Peak Climb",
        season: "Apr–May · Oct–Nov",
        soloUsd: 2690,
        duoUsd: 2290,
        groupUsd: 1990,
        badge: "6,000m+ Summit",
        elevationWaypoints: [
          { dayLabel: "D01", place: "Kathmandu", altitudeM: 1400 },
          { dayLabel: "D05", place: "Zatrwa La", altitudeM: 4610 },
          { dayLabel: "D09", place: "Khare Base", altitudeM: 5045 },
          { dayLabel: "D12", place: "High Camp", altitudeM: 5780 },
          { dayLabel: "D13", place: "Mera Summit", altitudeM: 6476 },
          { dayLabel: "D17", place: "Lukla", altitudeM: 2860 },
        ],
        highlights: [
          "Nepal's highest trekking peak—commanding 5× 8,000m giants (Everest, Lhotse, Makalu, Cho Oyu, Kanchenjunga)",
          "NMA climbing permit, IFMGA/NMA summit Sherpa, glacier rope/tent gear & Khare ice training",
          "Progressive Hinku Valley acclimatization schedule engineered for high summit success",
        ],
      },
      {
        id: "upper-mustang-kingdom",
        name: "Forbidden Kingdom of Upper Mustang",
        nameFr: "Royaume Interdit du Haut-Mustang & Lo Manthang",
        region: "Trans-Himalayan Mustang",
        days: 17,
        maxAltitudeM: 3840,
        grade: "Moderate Cultural Alpine",
        season: "Mar–Nov (Monsoon Rain-Shadow!)",
        soloUsd: 2450,
        duoUsd: 2150,
        groupUsd: 1920,
        elevationWaypoints: [
          { dayLabel: "D01", place: "Pokhara", altitudeM: 822 },
          { dayLabel: "D03", place: "Kagbeni", altitudeM: 2810 },
          { dayLabel: "D06", place: "Tsarang", altitudeM: 3560 },
          { dayLabel: "D08", place: "Lo Manthang", altitudeM: 3840 },
          { dayLabel: "D12", place: "Ghami", altitudeM: 3520 },
          { dayLabel: "D15", place: "Jomsom", altitudeM: 2720 },
        ],
        highlights: [
          "Ideal even in July–August monsoon thanks to Mustang's arid Tibetan rain-shadow",
          "Includes USD $500 Restricted Area Permit (RAP) processing & ACAP documentation",
          "Explore walled Lo Manthang monasteries, sky caves & crimson Kali Gandaki cliffs",
        ],
      },
      {
        id: "kanchenjunga-wild",
        name: "Pristine Kanchenjunga Base Camp Wilderness",
        nameFr: "Expédition Sauvage au Camp de Base du Kangchenjunga",
        region: "Far-East Himalaya",
        days: 21,
        maxAltitudeM: 5143,
        grade: "Remote Strenuous",
        season: "Mar–May · Oct–Nov",
        soloUsd: 2550,
        duoUsd: 2180,
        groupUsd: 1940,
        elevationWaypoints: [
          { dayLabel: "D01", place: "Taplejung", altitudeM: 1820 },
          { dayLabel: "D06", place: "Ghunsa", altitudeM: 3595 },
          { dayLabel: "D09", place: "Lhonak", altitudeM: 4780 },
          { dayLabel: "D10", place: "Pangpema BC", altitudeM: 5143 },
          { dayLabel: "D14", place: "Selele Pass", altitudeM: 4480 },
          { dayLabel: "D20", place: "Bhadrapur", altitudeM: 100 },
        ],
        highlights: [
          "Untouched trails beneath the world's 3rd-highest mountain (8,586m)",
          "Restricted-area permits, veteran remote-logistics crew & satellite safety check-ins",
          "Authentic Limbu, Rai & Tibetan highland hospitality far from crowded trails",
        ],
      },
    ],
    reviews: [
      {
        author: "Laurent & Céline Dubois",
        origin: "Bordeaux, France · Guide du Routard Travelers",
        rating: 5,
        quote:
          "Trouvé dans le Guide du Routard et absolument irréprochable : accueil francophone dès l'aéroport de Katmandou, guide attentionné sur les Trois Cols et équipement parfait.",
      },
      {
        author: "Kenji Takahashi",
        origin: "Tokyo, Japan · Mera Peak 6,476m Summit",
        rating: 5,
        quote:
          "Thirty years of operational wisdom shows when weather shifts at 5,800m. Our climbing Sherpa made smart, calm calls and got all four of us safely to Mera's summit.",
      },
      {
        author: "Matthias Weber",
        origin: "Zurich, Switzerland · Upper Mustang",
        rating: 5,
        quote:
          "Dealing directly with this long-standing Kwabahal family agency saved us €1,100 per person while giving our local guides fairer pay and personalized care.",
      },
    ],
    faqs: [
      {
        q: "Can you provide French, German, or Japanese-speaking licensed trekking guides from airport arrival?",
        a: "Yes. Since 1993, multilingual hosting (Français, English, Deutsch, Japanese) has been our signature—including personal pickup at Tribhuvan International Airport.",
      },
      {
        q: "How do Restricted Area Permits (Upper Mustang, Manaslu, Kanchenjunga, Dolpo) work?",
        a: "Restricted permits require a minimum of 2 trekkers and must be issued through a Government-registered Nepali agency (Reg. No. 160/049/50). Send passport scans 7 days ahead and everything is ready upon landing.",
      },
      {
        q: "What altitude safety & rescue protocols are included?",
        a: "Every high-altitude departure carries medical kits, daily pulse-oximeter saturation logs, conservative acclimatization days, and 24/7 helicopter evacuation coordination with your insurer.",
      },
    ],
    currentWebsiteUrl: "https://www.nepal-trek.com/",
    currentWebsiteFlaw:
      "Legacy PHP site cuts off your Guide du Routard intro mid-word ('...French, German, Japanese, e'), displays '5543m m' typos and dead '#' association badges, and lacks a bilingual EN/FR altitude & group-price configurator.",
    pitchPriceNpr: 26999,
    monthlyCareNpr: 2500,
  },

  // 9. WELL NEPAL TREKS & TOURS (UPPER MUSTANG MOTORBIKE & HELI DMC)
  {
    cohort: "kora",
    slug: "well-nepal-treks",
    engine: "kora-expedition",
    palette: "mustang-ochre",
    name: "Well Nepal Treks & Tours Pvt. Ltd.",
    shortName: "Well Nepal DMC",
    monogram: "WNT",
    sectorLabel: "Upper Mustang Motorbike Overland, Heli-Yatra & Himalayan DMC",
    tagline: "Command the Forbidden Canyon Roads of Lo Manthang & High Himalaya.",
    editorialIntro:
      "Led from Bhagwan Bahal, Thamel by CEO Mr. Ramesh (Gov. Regd. 88263/068/069), Well Nepal Treks & Tours is Kathmandu's trusted Destination Management Company for 10-Day Upper Mustang Motorbike Expeditions, weather-agile Muktinath Helicopter & 4x4 Yatras, and bespoke Nepal–Tibet–Kailash journeys.",
    heroEyebrow: "Bhagwan Bahal, Thamel · Regd. 88263/068/069 · CEO Mr. Ramesh",
    city: "Kathmandu",
    neighborhood: "Bhagwan Bahal, Thamel",
    fullAddress: "Bhagwan Bahal, Thamel, Kathmandu 44600, Nepal",
    coordinates: "27.7172° N, 85.3134° E · 24/7 Overland & Heli Ops",
    landmark: "Bhagwan Bahal, North Thamel · 24-Hr Operations Desk (+977 985-1136944)",
    phoneDisplay: "+977 985-1136944",
    phoneTel: "+9779851136944",
    whatsappDigits: "9779851136944",
    email: "wellnepaltreks@gmail.com",
    ccEmail: "info@wellnepaltreks.com",
    hours: "24/7 Expedition, Motorbike & Flight Re-Routing Desk (WhatsApp / Viber)",
    heroImage: "/images/kora/mustang-motorbike-tour.jpg",
    established: "Gov. Regd. 88263/068/069 · Nepal, Tibet, Kailash & Bhutan DMC",
    principalOrFounder: "Mr. Ramesh",
    principalTitle: "Chief Executive Officer & Lead Expedition Planner",
    credentialsBadge: "5.0★ TripAdvisor Praise · Mustang Motorbike + 40-Pax Muktinath DMC",
    isMotorbikeSpecialist: true,
    stats: [
      { label: "Mustang Ride", value: "3,810m", detail: "10-Day Kathmandu → Lo Manthang Overland" },
      { label: "Group Mastery", value: "1–45+", detail: "Solo riders to 40+ member VIP Yatras" },
      { label: "Support Crew", value: "Mechanic", detail: "Road-captain guide + spare-parts 4x4 backup" },
      { label: "Ops Desk", value: "24/7", detail: "Real-time mountain flight & hotel agility" },
    ],
    pillars: [
      {
        code: "01",
        title: "Fixed-Departure Upper Mustang Motorbike Expeditions",
        body: "Ride Royal Enfield Himalayan 411/450 machines from Kathmandu & Pokhara across Kali Gandaki suspension bridges, Chuksang cliffs, Ghami, and walled Lo Manthang (3,810m).",
      },
      {
        code: "02",
        title: "Legendary Weather-Agile Muktinath & Kailash Logistics",
        body: "Praised across TripAdvisor for dynamically rescheduling 7+ mountain flights and 5-star hotels mid-storm so 40-member family & pilgrimage groups never miss Darshan.",
      },
      {
        code: "03",
        title: "Express Heli-Treks & Cross-Border Tibet/Bhutan DMC",
        body: "10-Day Express Everest Base Camp with helicopter return, Mardi Himal ridges, and full permit handling for Lhasa & Mount Kailash Mansarovar.",
      },
    ],
    expeditionRoutes: [
      {
        id: "mustang-motorbike-10d",
        name: "10-Day Upper Mustang Forbidden Kingdom Motorbike Tour",
        region: "Kathmandu · Pokhara · Lo Manthang · Muktinath",
        days: 10,
        maxAltitudeM: 3810,
        grade: "Moderate Off-Road Overland",
        season: "Mar–Nov (Fixed Departures)",
        soloUsd: 2190,
        duoUsd: 1850,
        groupUsd: 1620,
        badge: "Flagship Overland Ride",
        elevationWaypoints: [
          { dayLabel: "D01", place: "Kathmandu", altitudeM: 1400 },
          { dayLabel: "D02", place: "Pokhara", altitudeM: 822 },
          { dayLabel: "D04", place: "Chuksang", altitudeM: 2980 },
          { dayLabel: "D05", place: "Geling", altitudeM: 3570 },
          { dayLabel: "D06", place: "Lo Manthang", altitudeM: 3810 },
          { dayLabel: "D08", place: "Muktinath", altitudeM: 3760 },
          { dayLabel: "D10", place: "Kathmandu", altitudeM: 1400 },
        ],
        highlights: [
          "Royal Enfield adventure bike + fuel, road captain, mechanic & 4x4 support on 4+ riders",
          "Includes USD $500 Upper Mustang Restricted Permit + ACAP + Kathmandu & Pokhara hotels",
          "Ride Kali Gandaki's world-deepest gorge, Muktinath Temple (3,760m) & ancient sky caves",
        ],
      },
      {
        id: "muktinath-vip-yatra",
        name: "8-Day Luxury Kathmandu–Pokhara–Muktinath VIP Yatra (4x4 / Heli)",
        region: "Pashupatinath · Pokhara · Jomsom · Muktinath",
        days: 8,
        maxAltitudeM: 3760,
        grade: "Comfort All-Ages & Elders",
        season: "Year-Round (Weather-Agile)",
        soloUsd: 1290,
        duoUsd: 980,
        groupUsd: 790,
        badge: "NRI & Family Favorite",
        elevationWaypoints: [
          { dayLabel: "D01", place: "Pashupati", altitudeM: 1400 },
          { dayLabel: "D03", place: "Pokhara", altitudeM: 822 },
          { dayLabel: "D04", place: "Jomsom", altitudeM: 2720 },
          { dayLabel: "D05", place: "Muktinath", altitudeM: 3760 },
          { dayLabel: "D07", place: "Manakamana", altitudeM: 1302 },
          { dayLabel: "D08", place: "Departure", altitudeM: 1400 },
        ],
        highlights: [
          "4–5 Star hotels, pure vegetarian/custom meal options & private AC coaches/Scorpio 4x4s",
          "Optional Pokhara–Muktinath private Helicopter upgrade bypassing mountain flight delays",
          "Dedicated elder-care coordinator led personally by CEO Mr. Ramesh's team",
        ],
      },
      {
        id: "express-ebc-10d",
        name: "10-Day Express Everest Base Camp Trek",
        region: "Khumbu / Everest",
        days: 10,
        maxAltitudeM: 5364,
        grade: "Active High-Altitude",
        season: "Mar–May · Sep–Dec",
        soloUsd: 1490,
        duoUsd: 1290,
        groupUsd: 1150,
        elevationWaypoints: [
          { dayLabel: "D01", place: "Lukla", altitudeM: 2860 },
          { dayLabel: "D02", place: "Namche", altitudeM: 3440 },
          { dayLabel: "D05", place: "Dingboche", altitudeM: 4410 },
          { dayLabel: "D07", place: "Everest BC", altitudeM: 5364 },
          { dayLabel: "D08", place: "Pheriche", altitudeM: 4371 },
          { dayLabel: "D10", place: "Kathmandu", altitudeM: 1400 },
        ],
        highlights: [
          "Streamlined itinerary for time-conscious executives—optional Gorakshep–Lukla Heli return",
          "Experienced English-speaking Sherpa guide, permits & cozy Khumbu mountain lodges",
          "24/7 Kathmandu operations backup for Lukla weather contingencies",
        ],
      },
    ],
    reviews: [
      {
        author: "agldas (40+ Member Coimbatore Group)",
        origin: "Coimbatore, India · Verified 5★ TripAdvisor",
        rating: 5,
        quote:
          "We had 40+ members with elders and children when rain grounded all Jomsom flights. Mr. Ramesh rescheduled 7+ flights and 5-star hotels dynamically so every single member completed Muktinath Darshan blissfully!",
      },
      {
        author: "767milindk",
        origin: "Verified 5★ TripAdvisor · Manang & Mustang Tour",
        rating: 5,
        quote:
          "Best experience with Well Nepal and CEO Mr. Ramesh and his team on our Manang–Mustang overland adventure. Smooth vehicles, clean hotels, always connected.",
      },
      {
        author: "Poonam C",
        origin: "Verified 5★ TripAdvisor · Jomsom & Kagbeni",
        rating: 5,
        quote:
          "Even when sudden road or flight changes occurred in the mountains, everything was handled immediately with a smile. Laser-sharp execution.",
      },
    ],
    faqs: [
      {
        q: "Can pillion riders or non-riding family members join the 10-Day Upper Mustang Motorbike Tour in a backup 4x4?",
        a: "Yes! Many groups combine Royal Enfield riders with partners or friends riding comfortably in our accompanying 4x4 Land Cruiser / Scorpio support vehicle.",
      },
      {
        q: "Do you offer special INR / Nepali / SAARC packages for Muktinath & Kailash groups?",
        a: "Yes—switch the currency toggle above to INR or NPR, or message Mr. Ramesh directly on WhatsApp (+977 985-1136944) for custom SAARC/Nepali nationality permit rates.",
      },
      {
        q: "What happens if Jomsom or Lukla mountain flights are delayed by weather?",
        a: "Unlike rigid booking portals, our 24-hour Thamel operations desk immediately re-sequences Kathmandu/Pokhara sightseeing days, hotel nights, or arranges shared helicopter shuttles so your trip stays on track.",
      },
    ],
    currentWebsiteUrl: "https://wellnepaltreks.com/",
    currentWebsiteFlaw:
      "Homepage title spells 'Trekking Tour Pacakge Nepal', the Upper Mustang motorbike page spells 'Trek Difficukty', 'Itinerery', 'POkahra', renders raw '<br... read more />' HTML in TripAdvisor reviews, and has no live Rider/Group calculator.",
    pitchPriceNpr: 26999,
    monthlyCareNpr: 2500,
  },

  // 10. ALL NEPALESE TEA & COFFEE CENTER / TEALAYA (GLOBAL B2B EXPORT & TASTING SALONS)
  {
    cohort: "kora",
    slug: "tealaya-nepal-export",
    engine: "kora-export",
    palette: "ilam-forest",
    name: "All Nepalese Tea & Coffee Center · Tealaya",
    shortName: "ANTCC · Tealaya",
    monogram: "TL",
    sectorLabel: "Single-Estate Ilam Tea, Himalayan Botanicals & Global Export",
    tagline: "First-Flush Ilam Orthodox Tea, Wild Cliff Honey & Himalayan Harvests — Since 1999.",
    editorialIntro:
      "Established in 1999 by Managing Director Mr. Santosh Chandra Kunwar (President, Nepal-German Chamber of Commerce & Industries)—pioneer of private-sector Nepali Orthodox Tea bulk export to Germany and steward of Ilam Jaubari Organic Estate—ANTCC & Tealaya connect European, Japanese, and North American buyers directly with Nepal's high-elevation tea farmers.",
    heroEyebrow: "Est. 1999 · Kupondole HQ + Thamel & Jhamsikhel Boutiques · EU/DE Exporter",
    city: "Lalitpur",
    neighborhood: "Kupondole-10, Lalitpur",
    fullAddress: "Kupondole-10, Lalitpur (HQ) · Boutiques in Thamel & Jhamsikhel Road",
    coordinates: "1,100m – 1,800m Ilam Sakhejung & Jaubari Estates",
    landmark: "Kupondole Corporate Export Desk + Flagship Tasting Stores in Thamel & Jhamsikhel",
    phoneDisplay: "+977 01-5435457",
    phoneTel: "+97715435457",
    email: "allnepaltea@gmail.com",
    ccEmail: "info@allnepaltea.com",
    hours: "Export Desk Sun–Fri 9:30 AM – 5:30 PM (01-5435457 / 5448201) · Boutiques Daily",
    heroImage: "/images/kora/ilam-tea-atelier.jpg",
    established: "Incorporated Sept 28, 1999 · First Bulk Orthodox Exporter to Germany",
    principalOrFounder: "Mr. Santosh Chandra Kunwar",
    principalTitle: "Managing Director · President, Nepal-German Chamber of Commerce & Industries",
    credentialsBadge: "Organic Certified · Ilam Jaubari Estate · Germany & EU Bulk Export Pioneer",
    stats: [
      { label: "Export Heritage", value: "1999", detail: "First private bulk Orthodox exporter to Germany" },
      { label: "Elevation", value: "1,800m", detail: "Ilam Jaubari, Sakhejung & Gulmi/Palpa coffee" },
      { label: "Cultivars", value: "6+ Origins", detail: "Silver Tips, White, Orthodox, Honey & Cardamom" },
      { label: "Boutiques", value: "2 Stores", detail: "Thamel Kathmandu & Jhamsikhel Lalitpur" },
    ],
    pillars: [
      {
        code: "01",
        title: "Ilam Jaubari & Sakhejung Organic Micro-Lots",
        body: "Hand-plucked above 1,100–1,800m bordering Darjeeling, slow-grown in Himalayan mist for extraordinary muscatel aromatics, high EGCG antioxidants, and clean organic compliance.",
      },
      {
        code: "02",
        title: "Turnkey German, EU, US & Japan Export Compliance",
        body: "Led by NGCCI President Santosh Chandra Kunwar—providing EU Organic documentation, Phytosanitary Certificates, Certificate of Origin, lab residue reports, and air/sea FOB dispatch.",
      },
      {
        code: "03",
        title: "Rare Himalayan Agro-Botanicals & Bourbon Coffee",
        body: "Single-window export hub for Wild Cliff Apis Laboriosa Honey, five-variety Large Black Cardamom (Ramsey, Golsey, Sawney), Organic Ginger, and 1,600m Bourbon Arabica.",
      },
    ],
    exportLots: [
      {
        id: "sakhejung-silver-tips",
        lotCode: "ILM-ST-01",
        name: "Sakhejung Imperial Silver Tips (Organic White)",
        category: "Single-Estate Tea",
        originAltitude: "1,650m · Sakhejung, Ilam",
        harvestFlush: "Spring First Flush · Unopened Downy Buds",
        liquorHex: "#E6D29E",
        tastingNotes: ["Alpine White Peach", "Wild Orchid", "Raw Honeydew"],
        fobUsdPerKg: 145,
        retailNpr250g: 2850,
        moqKg: 5,
        steepSpec: "78°C · 3.5 Mins · Ultra-High EGCG",
        description:
          "Hand-plucked at dawn exclusively from silver-downed unopened terminal buds—prized by specialty tea houses in Hamburg, Munich, Paris, and Tokyo.",
      },
      {
        id: "jaubari-golden-tips",
        lotCode: "ILM-GT-02",
        name: "Jaubari Estate Golden Tips Reserve Black",
        category: "Single-Estate Tea",
        originAltitude: "1,520m · Jaubari Estate, Ilam",
        harvestFlush: "Second Flush Muscatel",
        liquorHex: "#B86B28",
        tastingNotes: ["Ripe Muscatel Grape", "Toasted Malt", "Himalayan Apricot"],
        fobUsdPerKg: 98,
        retailNpr250g: 2100,
        moqKg: 10,
        steepSpec: "90°C · 4 Mins · Whole Golden Tippy Leaf",
        description:
          "Rich amber-copper liquor crafted from golden-tipped whole orthodox leaves—our signature German & European connoisseur export lot since 1999.",
      },
      {
        id: "ilam-emerald-orthodox",
        lotCode: "ILM-OR-04",
        name: "High-Grown Organic Orthodox Leaf (FTGFOP1)",
        category: "Single-Estate Tea",
        originAltitude: "1,250–1,600m · Eastern Nepal",
        harvestFlush: "Spring & Autumn Harvests",
        liquorHex: "#C9893B",
        tastingNotes: ["Crisp Bergamot Blossom", "Sweet Chestnut", "Clean Mineral Finish"],
        fobUsdPerKg: 42,
        retailNpr250g: 950,
        moqKg: 25,
        steepSpec: "88°C · 3–4 Mins · Bulk Block & Private Label",
        description:
          "Consistent block-quantity certified organic orthodox tea engineered for European blenders, luxury hotels, and private-label retail tins.",
      },
      {
        id: "bourbon-arabica-1600",
        lotCode: "NP-COF-07",
        name: "Himalayan Terrace Bourbon Arabica (Green / Roasted)",
        category: "Specialty Arabica",
        originAltitude: "1,200–1,600m · Gulmi, Palpa, Syangja & Lalitpur",
        harvestFlush: "Winter Cherry Selective Pick",
        liquorHex: "#5C3824",
        tastingNotes: ["Dark Cacao", "Spiced Plum", "Brown Cane Sugar"],
        fobUsdPerKg: 24,
        retailNpr250g: 850,
        moqKg: 30,
        steepSpec: "Washed Smallholder Cooperative Lot",
        description:
          "Shade-grown on steep Himalayan terraces by smallholder cooperatives—available as export-grade unroasted green beans or freshly roasted whole bean.",
      },
      {
        id: "apis-laboriosa-honey",
        lotCode: "HIM-HNY-09",
        name: "Wild Cliff Apis Laboriosa Forest Honey",
        category: "Himalayan Botanicals & Honey",
        originAltitude: "2,200–3,200m · Remote Himalayan Cliffs",
        harvestFlush: "Spring Rhododendron & Wild Flora",
        liquorHex: "#A8561A",
        tastingNotes: ["Wild Rhododendron Nectar", "Warm Resin", "Alpine Herbs"],
        fobUsdPerKg: 68,
        retailNpr250g: 2400,
        moqKg: 10,
        steepSpec: "Raw Unpasteurized · Batch Lab-Tested",
        description:
          "Sustainably harvested from the world's largest honeybee (Apis laboriosa) along high cliff overhangs—accompanied by full export purity analysis.",
      },
      {
        id: "ramsey-black-cardamom",
        lotCode: "SP-CRD-11",
        name: "Queen-of-Spices Large Black Cardamom (Ramsey & Golsey)",
        category: "Himalayan Botanicals & Honey",
        originAltitude: "1,000–1,800m · Eastern Hill Districts",
        harvestFlush: "Autumn Whole-Pod Cured",
        liquorHex: "#4A3528",
        tastingNotes: ["Smoky Camphor", "EucalyptusMenthol", "Warm Clove"],
        fobUsdPerKg: 31,
        retailNpr250g: 780,
        moqKg: 50,
        steepSpec: "5 Native Cultivars: Ramsey, Golsey, Sawney, Chibesey, Dammersey",
        description:
          "Export-graded whole Amomum subulatum pods prized by European spice houses, chai blenders, and botanical extractors.",
      },
    ],
    boutiqueLocations: [
      {
        title: "ANTCC Corporate & Global Export HQ",
        address: "Kupondole-10, Lalitpur (GPO Bag 167 / 20421) · +977 01-5435457",
        hours: "Sun – Fri · 9:30 AM – 5:30 PM",
      },
      {
        title: "Tealaya Flagship Store #1 — Thamel",
        address: "Heart of Thamel, Kathmandu · Retail & Tourist Gift Curation",
        hours: "Daily · 10:00 AM – 7:30 PM",
      },
      {
        title: "Tealaya Tasting Boutique #2 — Jhamsikhel",
        address: "Jhamsikhel Road, Lalitpur · Cupping & Loose-Leaf Salon",
        hours: "Daily · 10:00 AM – 7:00 PM",
      },
    ],
    reviews: [
      {
        author: "Noelene Molloy",
        origin: "International Buyer · Verified Tealaya Guest",
        rating: 5,
        quote:
          "Outstanding tea and service! Love Nepal — Love Tealaya! Their Sakhejung Silver Tips and Golden Tips rival the finest single-estate harvests anywhere on earth.",
      },
      {
        author: "Ernestas Klevas",
        origin: "European Specialty Tea Connoisseur",
        rating: 5,
        quote:
          "The definitive place to experience authentic high-altitude Nepalese orthodox tea in Kathmandu—backed by real Ilam estate lineage and Sonam Lama's tea mastery.",
      },
      {
        author: "Sandra Gonzalez",
        origin: "Verified Tealaya Tasting Client",
        rating: 5,
        quote:
          "The best tea is Nepal Tealaya—unique, fragrant, and genuinely sourced directly from eastern Himalayan cooperative farmers.",
      },
    ],
    faqs: [
      {
        q: "Can international tea importers order a 6-lot Cupping Sample Flight before booking bulk air/sea cargo?",
        a: "Yes. Select 'Curated Importer Cupping Flight (6 × 250g Lots)' in our Export RFQ configurator above—dispatched via DHL/FedEx from Kathmandu within 72 hours with full lot harvest sheets.",
      },
      {
        q: "What export certifications accompany bulk shipments to Germany, the EU, USA, and Japan?",
        a: "ANTCC provides Organic Certificate documentation, Government Phytosanitary Certificate, Certificate of Origin (Chamber of Commerce), packing lists, and batch traceability from Ilam Jaubari & partner cooperatives.",
      },
      {
        q: "Can Kathmandu hotels, embassies, and specialty cafes visit your Thamel or Jhamsikhel stores for wholesale supply?",
        a: "Yes—our Thamel and Jhamsikhel Tealaya boutiques plus our Kupondole-10 corporate headquarters supply custom loose-leaf tea menus and Bourbon Arabica coffee across Nepal.",
      },
    ],
    currentWebsiteUrl: "https://allnepaltea.com/ & https://www.tealaya.com.np/",
    currentWebsiteFlaw:
      "allnepaltea.com mixes organic Silver Tips tea with chemical fertilizers on the hero, spells '1100 meter of sea label' & 'Espain', and tealaya.com.np shows a Jssor Slider watermark, dead Google+ link, and broken Google Maps API graphics.",
    pitchPriceNpr: 27999,
    monthlyCareNpr: 2500,
  },
];

export function getKoraBusinessBySlug(slug: string): KoraBusinessConfig | undefined {
  return KORA_BUSINESSES.find((b) => b.slug === slug);
}
