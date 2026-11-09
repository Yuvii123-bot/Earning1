export type BusinessTemplateType =
  | "bistro"
  | "dental-ortho"
  | "dental-prostho"
  | "paragliding"
  | "spa-emerald"
  | "spa-luxury"
  | "spa-heritage"
  | "dermatology";

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  priceNpr: number;
  priceUsd?: number;
  durationOrNote: string;
  description: string;
  popular?: boolean;
}

export interface ReviewItem {
  author: string;
  roleOrSource: string;
  rating: number;
  text: string;
}

export interface BusinessConfig {
  slug: string;
  template: BusinessTemplateType;
  name: string;
  shortName: string;
  tagline: string;
  heroBadge: string;
  city: "Kathmandu" | "Pokhara";
  neighborhood: string;
  fullAddress: string;
  landmark: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsappDigits?: string;
  email: string;
  hours: string;
  heroImage: string;
  established?: string;
  leadDoctorOrFounder?: string;
  socialProofStat: string;
  stats: { label: string; value: string }[];
  services: ServiceItem[];
  highlights: { title: string; description: string }[];
  reviews: ReviewItem[];
  faqs: { q: string; a: string }[];
  currentWebsiteStatus: string;
  auditSummary: string;
  pitchPriceNpr: number;
  monthlyCareNpr: number;
  emailSubject: string;
}

export const BUSINESSES: BusinessConfig[] = [
  {
    slug: "evoke-jhamsikhel",
    template: "bistro",
    name: "EVOKE Cafe & Bistro",
    shortName: "EVOKE",
    tagline: "Artisanal Wood-Fired Dining, Specialty Coffee & Courtyard Evenings in Jhamsikhel.",
    heroBadge: "Jhamsikhel's Iconic Courtyard Bistro · 774+ Guest Reviews",
    city: "Kathmandu",
    neighborhood: "Jhamsikhel, Lalitpur",
    fullAddress: "Jhamsikhel Marg, Lalitpur (Kathmandu Valley), Nepal",
    landmark: "Heart of Jhamsikhel Restaurant District · Ample Courtyard & Indoor Lounge Seating",
    phoneDisplay: "+977 01-5432021",
    phoneTel: "+97715432021",
    email: "evoke.cafebistro@gmail.com",
    hours: "Daily · 9:30 AM – 10:30 PM (Brunch, Coffee & Late Evening Cocktails)",
    heroImage: "/images/evoke-hero.jpg",
    socialProofStat: "90% Recommended across 774+ Verified Reviews",
    stats: [
      { label: "Guest Reviews", value: "774+" },
      { label: "Recommendation", value: "90%" },
      { label: "Seating Zones", value: "Garden & Lounge" },
      { label: "Private Events", value: "Up to 80 Guests" },
    ],
    services: [
      {
        id: "truffle-burrata-pizza",
        name: "Wood-Fired Burrata & Wild Mushroom Sourdough Pizza",
        category: "Wood-Fired Kitchen",
        priceNpr: 1180,
        durationOrNote: "Hand-stretched 48h fermented dough",
        description: "Roasted Himalayan wild mushrooms, creamy burrata, confit garlic, fresh basil & extra-virgin olive oil.",
        popular: true,
      },
      {
        id: "smoked-chicken-pizza",
        name: "Smoked Chicken, Sun-Dried Tomato & Chili Honey Pizza",
        category: "Wood-Fired Kitchen",
        priceNpr: 1090,
        durationOrNote: "Wood-oven signature",
        description: "House-smoked chicken breast, caramelized red onions, mozzarella & warm Mustang chili-infused wildflower honey.",
      },
      {
        id: "jhamsikhel-brunch",
        name: "The EVOKE Courtyard Shakshuka & Artisanal Sourdough",
        category: "Brunch & Plates",
        priceNpr: 820,
        durationOrNote: "Served 9:30 AM – 3:00 PM",
        description: "Slow-simmered spiced tomato & bell pepper ragout, two poached farm eggs, whipped feta & grilled sourdough.",
        popular: true,
      },
      {
        id: "crispy-calamari-tapas",
        name: "Togarashi Crispy Calamari & Kaffir Lime Aioli",
        category: "Brunch & Plates",
        priceNpr: 940,
        durationOrNote: "Sharing plate",
        description: "Flash-fried tender squid rings dusted with house seven-spice, charred lemon & aromatic kaffir lime dip.",
      },
      {
        id: "himalayan-pourover",
        name: "Single-Estate Nuwakot Arabica Pour-Over (V60 / Iced)",
        category: "Coffee & Roastery",
        priceNpr: 380,
        durationOrNote: "1,650m washed process",
        description: "Bright stone-fruit and dark cacao notes brewed to order from freshly roasted Nepali specialty beans.",
      },
      {
        id: "hazelnut-cortado",
        name: "Roasted Hazelnut & Brown Butter Iced Latte",
        category: "Coffee & Roastery",
        priceNpr: 440,
        durationOrNote: "Barista favorite",
        description: "Double-risretto shot layered over chilled organic milk and house-made toasted hazelnut reduction.",
        popular: true,
      },
      {
        id: "courtyard-passion-sour",
        name: "Jhamsikhel Golden Hour Passionfruit & Timur Sour",
        category: "Craft Cocktails",
        priceNpr: 980,
        durationOrNote: "Signature evening cocktail",
        description: "Small-batch gin, fresh passionfruit pulp, Nepali timur peppercorn tincture, citrus & silky botanical foam.",
        popular: true,
      },
      {
        id: "smoked-rosemary-negroni",
        name: "Smoked Rosemary & Blood Orange Boulevardier",
        category: "Craft Cocktails",
        priceNpr: 1050,
        durationOrNote: "Torch-smoked tableside",
        description: "Bourbon, Italian bitter aperitif, sweet vermouth & charred garden rosemary.",
      },
    ],
    highlights: [
      {
        title: "Sunlit Courtyard by Day, String-Lit Sanctuary by Night",
        description: "Work remotely over specialty Nepali pour-overs in the afternoon or gather under warm brick-and-banyan lights for dinner.",
      },
      {
        title: "Instant Courtyard, Lounge & Group Table Reservations",
        description: "Reserve your preferred garden table, Friday night group booth, or private celebration deck in under 30 seconds.",
      },
      {
        title: "Curated Acoustic Sessions & Private Celebrations",
        description: "Custom grazing menus, craft cocktail bars, and dedicated courtyard sections for birthdays, corporate mixers & launches.",
      },
    ],
    reviews: [
      {
        author: "Aayushma Pradhan",
        roleOrSource: "Jhamsikhel Regular · Google Review",
        rating: 5,
        text: "Still the best courtyard ambiance in Jhamel. Warm lighting, effortless service, great music volume so you can actually talk, and phenomenal wood-fired pizzas.",
      },
      {
        author: "Daniel K.",
        roleOrSource: "Expat Community · Lalitpur",
        rating: 5,
        text: "My go-to spot in Kathmandu Valley for afternoon specialty coffee meetings that turn into evening cocktails. Outdoor garden seating is unmatched.",
      },
      {
        author: "Shristi Maharjan",
        roleOrSource: "Private Birthday Host",
        rating: 5,
        text: "Hosted 25 friends on the outdoor terrace—the team handled custom platters and drinks seamlessly. Every guest asked where we booked.",
      },
    ],
    faqs: [
      {
        q: "Do I need a reservation for Friday evening or weekend brunch?",
        a: "Walk-ins are always welcome, though our outdoor garden tables fill up quickly after 5:30 PM on Thursdays, Fridays, and Saturdays. Reserving online guarantees your preferred seating zone.",
      },
      {
        q: "Can we host private birthdays, acoustic nights, or office gatherings?",
        a: "Yes! Use our interactive Group & Event Reservation tab above to pick your guest count and preferred courtyard/indoor zone, or call +977 01-5432021 directly.",
      },
      {
        q: "Is parking available at EVOKE Jhamsikhel?",
        a: "Yes, dedicated bike and car parking is available right beside our Jhamsikhel entrance.",
      },
    ],
    currentWebsiteStatus: "evokenepal.com is completely offline",
    auditSummary: "Listed website evokenepal.com fails to load (offline), leaving 774+ review audience with no digital menu or online table reservation.",
    pitchPriceNpr: 14999,
    monthlyCareNpr: 1999,
    emailSubject: "evokenepal.com is currently offline — built a live replacement preview for EVOKE Jhamsikhel",
  },
  {
    slug: "apple-dental",
    template: "dental-ortho",
    name: "Apple Dental Clinic & Orthodontic Centre",
    shortName: "Apple Dental",
    tagline: "Specialist Braces, Clear Aligners & Gentle Family Dentistry in Lazimpat.",
    heroBadge: "Led by Orthodontist Dr. Gaurav Acharya · Trusted by 6,000+ on Instagram",
    city: "Kathmandu",
    neighborhood: "Panipokhari, Lazimpat",
    fullAddress: "Panipokhari, Lazimpat (Opposite Japanese Embassy & Khanepani Office), Kathmandu",
    landmark: "Directly Opposite the Embassy of Japan, Panipokhari Main Road",
    phoneDisplay: "9843196672 / 01-4529216",
    phoneTel: "+9779843196672",
    whatsappDigits: "9779843196672",
    email: "appledentalnepal@gmail.com",
    hours: "Sun – Fri: 9:30 AM – 6:30 PM · Saturday Appointments on Request",
    heroImage: "/images/dental-ortho.jpg",
    leadDoctorOrFounder: "Dr. Gaurav Acharya — Specialist Orthodontist (Braces & Clear Aligners)",
    socialProofStat: "6,000+ Instagram Community · Specialist-Led Orthodontics",
    stats: [
      { label: "Instagram Trust", value: "6,000+" },
      { label: "Lead Specialist", value: "Dr. Gaurav Acharya" },
      { label: "Installment Plans", value: "0% Stress EMI" },
      { label: "Location", value: "Opp. Japan Embassy" },
    ],
    services: [
      {
        id: "metal-braces",
        name: "Precision Metal Braces (Complete Arch)",
        category: "Orthodontics",
        priceNpr: 45000,
        durationOrNote: "12–18 months · Flexible monthly installments",
        description: "Low-profile, high-precision orthodontic brackets supervised directly by Orthodontist Dr. Gaurav Acharya.",
        popular: true,
      },
      {
        id: "ceramic-braces",
        name: "Tooth-Colored Aesthetic Ceramic Braces",
        category: "Orthodontics",
        priceNpr: 65000,
        durationOrNote: "12–18 months · Virtually invisible in photos",
        description: "Translucent stain-resistant ceramic brackets blending naturally with your enamel—ideal for working professionals & students.",
        popular: true,
      },
      {
        id: "self-ligating",
        name: "Self-Ligating Comfort Braces (Fewer Clinic Visits)",
        category: "Orthodontics",
        priceNpr: 85000,
        durationOrNote: "Faster movement · Gentler pressure",
        description: "Friction-free clip technology requiring fewer tightening visits and delivering broader, natural arch smiles.",
      },
      {
        id: "clear-aligners",
        name: "Custom Clear Aligners (Removable Invisible Trays)",
        category: "Clear Aligners",
        priceNpr: 135000,
        durationOrNote: "3D Digital Smile Plan · Eat & brush freely",
        description: "Removable, crystal-clear aligner trays custom-mapped in 3D so you can straighten teeth with zero wires.",
        popular: true,
      },
      {
        id: "laser-whitening",
        name: "In-Office Enamel-Safe Teeth Whitening",
        category: "Cosmetic & General",
        priceNpr: 12000,
        durationOrNote: "Single 45-minute visit",
        description: "Brighten coffee and tea staining by up to 6 shades in a single comfortable Lazimpat appointment.",
      },
      {
        id: "painless-rct",
        name: "Single-Sitting Rotary Root Canal Treatment (RCT)",
        category: "Cosmetic & General",
        priceNpr: 8500,
        durationOrNote: "Digital X-Ray + Apex Locator precision",
        description: "Gentle, modern anesthesia and rotary endodontics to save aching teeth without discomfort.",
      },
    ],
    highlights: [
      {
        title: "Direct Care by Specialist Orthodontist Dr. Gaurav Acharya",
        description: "Every braces and clear aligner case is diagnosed, planned, and adjusted by an experienced orthodontic specialist—never rushed.",
      },
      {
        title: "Transparent NPR Pricing & Flexible Monthly Installments",
        description: "Start your smile journey with an affordable initial down-payment and comfortable monthly follow-up installments.",
      },
      {
        title: "Prime Panipokhari Location (Opposite Japanese Embassy)",
        description: "Easy access from Lazimpat, Maharajgunj, Baluwatar, and Samakhushi with 1-tap WhatsApp slot confirmation.",
      },
    ],
    reviews: [
      {
        author: "kritika_shrestha",
        roleOrSource: "Ceramic Braces Patient · Kathmandu",
        rating: 5,
        text: "Dr. Gaurav explained my crowding and bite options so clearly on day one. 10 months into ceramic braces and my confidence in photos has completely changed!",
      },
      {
        author: "Rohan Thapa",
        roleOrSource: "Clear Aligner Patient · Lazimpat",
        rating: 5,
        text: "Super hygienic clinic right opposite the Japanese Embassy. Clear aligners meant zero awkwardness in client meetings, and booking via WhatsApp is effortless.",
      },
      {
        author: "Sujata Karki",
        roleOrSource: "Routine Dental & RCT",
        rating: 5,
        text: "I used to dread dental chairs, but my root canal at Apple Dental was genuinely painless. Transparent costs and warm staff.",
      },
    ],
    faqs: [
      {
        q: "Can I pay for braces or clear aligners in monthly installments?",
        a: "Yes! Most orthodontic patients start with a modest initial setup amount and pay the remainder comfortably across their monthly adjustment visits.",
      },
      {
        q: "Where exactly is Apple Dental Clinic located?",
        a: "We are at Panipokhari, Lazimpat—directly opposite the Japanese Embassy and the Khanepani Office on the main road.",
      },
      {
        q: "How do I book a quick consultation with Dr. Gaurav Acharya?",
        a: "Use our 30-second WhatsApp Appointment Picker on this page or call 9843196672 / 01-4529216 to lock in your preferred time.",
      },
    ],
    currentWebsiteStatus: "https://appledentalnepal.com.np fails SSL/HTTPS",
    auditSummary: "appledentalnepal.com.np fails secure HTTPS loading, blocking patients clicking from your 6K+ Instagram profile.",
    pitchPriceNpr: 11999,
    monthlyCareNpr: 1500,
    emailSubject: "Quick heads-up on appledentalnepal.com.np SSL + built a fast Braces/Aligner booking preview for Apple Dental",
  },
  {
    slug: "smile-signature",
    template: "dental-prostho",
    name: "Smile Signature Nepal",
    shortName: "Smile Signature",
    tagline: "Your Smile, Our Signature — Superspeciality Implants, E-Max Aesthetics & Prosthodontics.",
    heroBadge: "Blue Note Building, Lazimpat · 94% Patient Recommendation",
    city: "Kathmandu",
    neighborhood: "Lazimpat, Kathmandu",
    fullAddress: "Blue Note Building, Lazimpat Main Road, Kathmandu, Nepal",
    landmark: "Blue Note Building, Lazimpat · Diplomatic & Hotel District",
    phoneDisplay: "+977 01-4515678",
    phoneTel: "+97714515678",
    email: "drbhusal80@gmail.com",
    hours: "Sun – Fri: 9:30 AM – 6:30 PM · Advance Appointments Available",
    heroImage: "/images/smile-prostho.jpg",
    leadDoctorOrFounder: "Dr. Bhusal & Superspeciality Prosthodontic / Implant Team",
    socialProofStat: "94% Recommended · Advanced Prosthodontic & Implant Rehab",
    stats: [
      { label: "Patient Rating", value: "94% Recommend" },
      { label: "Specialty", value: "Implants & E-Max" },
      { label: "Precision", value: "Wax-Mockup Design" },
      { label: "Location", value: "Blue Note, Lazimpat" },
    ],
    services: [
      {
        id: "dental-implant",
        name: "Tissue-Level & Guided Titanium Dental Implant",
        category: "Implants & Surgery",
        priceNpr: 75000,
        durationOrNote: "Papilla-preserving aesthetic protocol",
        description: "Biocompatible titanium implant placement with precision impression posts and natural gum-contour preservation.",
        popular: true,
      },
      {
        id: "emax-veneers",
        name: "Metal-Free E-Max Porcelain Veneers & Crowns (Per Tooth)",
        category: "Aesthetic Prosthodontics",
        priceNpr: 24000,
        durationOrNote: "Diagnostic wax-mockup preview first",
        description: "Ultra-translucent lithium disilicate restorations that mimic natural tooth enamel light reflection with zero dark gum lines.",
        popular: true,
      },
      {
        id: "full-mouth-rehab",
        name: "Full-Mouth Rehabilitation (E-Max / Complete Prosthesis)",
        category: "Aesthetic Prosthodontics",
        priceNpr: 185000,
        durationOrNote: "Comprehensive bite & smile restoration",
        description: "Customized vertical-dimension, bite, and aesthetic smile reconstruction planned via clinical wax trial mockups.",
        popular: true,
      },
      {
        id: "anterior-bridge",
        name: "Anterior Metal-Free Aesthetic Bridge",
        category: "Aesthetic Prosthodontics",
        priceNpr: 52000,
        durationOrNote: "Seamless front-tooth replacement",
        description: "Custom shade-matched zirconia/E-Max anterior bridge crafted using Dr. Bhusal's precision gingival retraction technique.",
      },
      {
        id: "maxillofacial-prosthesis",
        name: "Custom Ocular & Maxillofacial Prosthetic Rehabilitation",
        category: "Specialized Prosthodontics",
        priceNpr: 45000,
        durationOrNote: "Bespoke artistic & anatomical precision",
        description: "Rare superspeciality prosthetic artistry including custom wax-trial ocular and facial prostheses.",
      },
      {
        id: "preventive-checkup",
        name: "6-Month Comprehensive Oral Diagnostic & Ultrasonic Scaling",
        category: "Preventive Care",
        priceNpr: 3500,
        durationOrNote: "40-minute complete checkup",
        description: "Detailed clinical exam, gum health charting, stain removal, and personalized preventive plan.",
      },
    ],
    highlights: [
      {
        title: "Preview Your New Smile Before Final Placement",
        description: "Using diagnostic wax mockups and provisional trials, you approve the exact shape and harmony of your restorations first.",
      },
      {
        title: "Superspeciality Implant & Gingival Aesthetics",
        description: "Advanced bone-grafting, papilla-preservation flaps, and Dr. Bhusal's signature impression protocols for lifelike outcomes.",
      },
      {
        title: "Discreet, Calm Clinical Suite in Lazimpat",
        description: "Conveniently situated in the Blue Note Building, trusted by diplomats, NRNs visiting Kathmandu, and local families.",
      },
    ],
    reviews: [
      {
        author: "Prakash Adhikari",
        roleOrSource: "Anterior E-Max Restoration · Kathmandu",
        rating: 5,
        text: "Had two front crowns redone with metal-free E-Max at Smile Signature. Nobody can tell which teeth are crowns—the gum line and color match are flawless.",
      },
      {
        author: "Meना Gurung (NRN UK)",
        roleOrSource: "Implant & Smile Rehab Patient",
        rating: 5,
        text: "Completed my implant restoration during my Nepal trip at Blue Note Building, Lazimpat. World-class prosthodontic precision at a fraction of London prices.",
      },
      {
        author: "Sandeep Joshi",
        roleOrSource: "Family Dental Care",
        rating: 5,
        text: "Warm, ethical specialists who never over-prescribe. Seeing the wax mockup before committing to veneers gave me complete confidence.",
      },
    ],
    faqs: [
      {
        q: "Can travelling NRNs or international guests fit implant or E-Max work into a short Nepal trip?",
        a: "Yes! Share your travel dates in our Smile Planner above so our team can schedule diagnostic impressions, wax mockups, and lab delivery tightly around your itinerary.",
      },
      {
        q: "What makes E-Max metal-free crowns superior for front teeth?",
        a: "Unlike older metal-ceramic crowns that leave a grey shadow near the gums, E-Max all-ceramic restorations transmit light just like natural tooth enamel.",
      },
      {
        q: "Where is Smile Signature Nepal located?",
        a: "Inside the Blue Note Building on Lazimpat Main Road, Kathmandu (+977 01-4515678).",
      },
    ],
    currentWebsiteStatus: "smilesignaturenepal.com has broken {{{service_button_url}}} link",
    auditSummary: "Homepage 'Read More' button links to raw broken template code ({{{service_button_url}}}), lazy images render blank placeholders, and there is no mobile treatment planner.",
    pitchPriceNpr: 12999,
    monthlyCareNpr: 1500,
    emailSubject: "Spotted a broken {{{service_button_url}}} button on smilesignaturenepal.com + built a clean mobile upgrade preview",
  },
  {
    slug: "advance-paragliding",
    template: "paragliding",
    name: "Advance Paragliding Pvt. Ltd",
    shortName: "Advance Paragliding",
    tagline: "We Fly, We Care — Soar from Sarangkot (1,592m) Over Phewa Lake Beneath Machhapuchhre.",
    heroBadge: "CAAN-Certified Tandem Pilots · Lakeside Street No. 7, Pokhara",
    city: "Pokhara",
    neighborhood: "Street No. 7, Lakeside",
    fullAddress: "Lakeside Street No. 7, Baidam, Pokhara 33700, Nepal",
    landmark: "Street No. 7 Lakeside · Free Jeep Pickup From Any Lakeside Hotel",
    phoneDisplay: "+977 985-6036262",
    phoneTel: "+9779856036262",
    whatsappDigits: "9779856036262",
    email: "advance.parabooking@gmail.com",
    hours: "Daily Flights: 9:00 AM, 11:30 AM & 2:00 PM · Booking Desk: 6:30 AM – 9:00 PM",
    heroImage: "/images/pokhara-paragliding.jpg",
    socialProofStat: "100% Recommended · Official CAAN Certified Tandem Team",
    stats: [
      { label: "Takeoff Altitude", value: "1,592m Sarangkot" },
      { label: "Safety Record", value: "CAAN Certified" },
      { label: "GoPro Media", value: "HD Video Included" },
      { label: "Hotel Transfer", value: "Free Pickup" },
    ],
    services: [
      {
        id: "cloud-buster-tandem",
        name: "Cloud Buster Classic Tandem Flight (25–30 Mins)",
        category: "Tandem Flights",
        priceNpr: 9500,
        priceUsd: 75,
        durationOrNote: "Includes GoPro HD Video/Photos + Hotel Pickup + Insurance",
        description: "Launch from Sarangkot viewpoint with snow-capped Annapurna & Fishtail panoramas and land gently beside Phewa Lake.",
        popular: true,
      },
      {
        id: "cross-country-thermal",
        name: "Cross-Country Himalayan Thermal Flight (45–60 Mins)",
        category: "Tandem Flights",
        priceNpr: 14500,
        priceUsd: 115,
        durationOrNote: "Ride high mountain thermals + Full 4K GoPro Media + Pickup",
        description: "Catch midday rising thermals high above Sarangkot ridge, glide alongside eagles toward Phewa valley, and enjoy extended airtime.",
        popular: true,
      },
      {
        id: "sunrise-golden-flight",
        name: "First-Slot Golden Himalayan Sunrise Tandem (9:00 AM Slot)",
        category: "Tandem Flights",
        priceNpr: 10500,
        priceUsd: 85,
        durationOrNote: "Calmest air · Crystal-clear Machhapuchhre views",
        description: "Ideal for first-time flyers and photographers seeking glassy morning air and unobstructed Himalayan peaks before midday clouds.",
        popular: true,
      },
      {
        id: "acro-thrill-upgrade",
        name: "Optional Wingover & Spiral Adrenaline Finish",
        category: "Add-Ons",
        priceNpr: 2000,
        priceUsd: 15,
        durationOrNote: "Over Phewa Lake prior to landing (on request)",
        description: "Want high-G thrills before landing? Ask your pilot for thrilling wingovers and spirals safely above the lake.",
      },
    ],
    highlights: [
      {
        title: "'We Fly, We Care' — Safety First Since Day One",
        description: "Every flight uses inspected EN-certified gliders, reserve parachutes, full passenger flight insurance, and veteran CAAN-licensed tandem pilots.",
      },
      {
        title: "All-Inclusive Transparent Fare (Zero Hidden Fees at Takeoff)",
        description: "Your booking covers 4x4 hotel pickup from Lakeside to Sarangkot, CAAN takeoff permits, flight insurance, and instant GoPro photos & video transfer to your phone.",
      },
      {
        title: "60-Second WhatsApp Slot Lock (NPR & USD Accepted)",
        description: "Peak-season morning slots sell out fast. Pick your flight date, flyer count, and time window above to confirm instantly on WhatsApp.",
      },
    ],
    reviews: [
      {
        author: "Liam & Chloe M.",
        roleOrSource: "Travellers from Melbourne, Australia",
        rating: 5,
        text: "Hands down the highlight of our Nepal trip! Picked up right from our Street 7 hotel, felt 100% safe at takeoff, and seeing Fishtail peak from the air was surreal.",
      },
      {
        author: "Ankit Sharma",
        roleOrSource: "Solo Flyer · Delhi",
        rating: 5,
        text: "Super professional pilots who truly live up to 'We Fly We Care'. Got all my GoPro videos transferred directly to my phone right after landing by Phewa Lake!",
      },
      {
        author: "Suman Gurung",
        roleOrSource: "Group of 4 Flyers · Kathmandu",
        rating: 5,
        text: "Booked the 9:30 AM slot for 4 friends—zero hassle, smooth takeoff, and unforgettable views over Pokhara valley.",
      },
    ],
    faqs: [
      {
        q: "Do I need any prior experience to fly tandem?",
        a: "Zero experience needed! After a 5-minute safety briefing at Sarangkot, you simply take a few gentle steps forward with your certified pilot and float into the sky.",
      },
      {
        q: "What is the weight limit and what should I wear?",
        a: "Passengers between 30 kg and 100 kg can fly comfortably. Wear closed-toe shoes (sneakers/hiking shoes), sunglasses, and a light windproof jacket.",
      },
      {
        q: "What happens if weather cancels or delays our slot?",
        a: "Safety always comes first—if wind or visibility isn't ideal, we reschedule you to the next clear window free of charge or refund 100% of any deposit.",
      },
    ],
    currentWebsiteStatus: "No standalone website (Facebook only)",
    auditSummary: "Currently has no website—international tourists searching Google for Pokhara tandem paragliding cannot view USD/NPR packages or book WhatsApp slots.",
    pitchPriceNpr: 14999,
    monthlyCareNpr: 1999,
    emailSubject: "Built a live Sarangkot Tandem Booking Website (with USD/NPR calculator + WhatsApp) for Advance Paragliding",
  },
  {
    slug: "green-spa-pokhara",
    template: "spa-emerald",
    name: "Green Spa Pokhara Lakeside",
    shortName: "Green Spa",
    tagline: "Refresh Your Senses — Post-Trek Muscle Recovery & Botanical Wellness on Street No. 14.",
    heroBadge: "98% Guest Recommendation · Street No. 14, Lakeside Pokhara",
    city: "Pokhara",
    neighborhood: "Street No. 14, Lakeside",
    fullAddress: "Street No. 14, Lakeside, Baidam, Pokhara, Nepal (Green Spa Pvt. Ltd.)",
    landmark: "Peaceful Courtyard Setting on Street No. 14, Central Lakeside",
    phoneDisplay: "9846167167 / 9814121478",
    phoneTel: "+9779846167167",
    whatsappDigits: "9779846167167",
    email: "greenspa94@gmail.com",
    hours: "Open Daily · 8:00 AM – 10:30 PM (Late Post-Trek Sessions Welcome)",
    heroImage: "/images/himalayan-spa.jpg",
    socialProofStat: "98% Recommended · 1,680+ Followers in Lakeside Pokhara",
    stats: [
      { label: "Guest Rating", value: "98% Recommend" },
      { label: "Specialty", value: "Trekker Recovery" },
      { label: "Location", value: "Lakeside St. 14" },
      { label: "Booking", value: "Instant WhatsApp" },
    ],
    services: [
      {
        id: "trekker-recovery-90",
        name: "Annapurna Trekker Deep Muscle Recovery Massage",
        category: "Trekker Recovery",
        priceNpr: 3200,
        priceUsd: 25,
        durationOrNote: "90 Mins · Warm Himalayan herbal balm + calf/shoulder release",
        description: "Designed specifically for hikers returning from ABC, Poon Hill, or Mardi Himal—targets sore calves, quads, lower back & pack-strained shoulders.",
        popular: true,
      },
      {
        id: "ayurvedic-warm-oil",
        name: "Traditional Warm Ayurvedic Herbal Oil Full-Body Therapy",
        category: "Signature Therapies",
        priceNpr: 2800,
        priceUsd: 22,
        durationOrNote: "60 Mins · Pure botanical oil infusion + herbal tea",
        description: "Long, rhythmic meridian strokes with warm medicated sesame and Himalayan herb oil to calm the nervous system and restore deep sleep.",
        popular: true,
      },
      {
        id: "himalayan-hot-stone",
        name: "Volcanic Hot Stone & Aromatherapy Serenity Ritual",
        category: "Signature Therapies",
        priceNpr: 3600,
        priceUsd: 28,
        durationOrNote: "90 Mins · Heated river stones + pure essential oils",
        description: "Smooth heated basalt stones melt away deep-seated mountain chill and muscle knots while lavender-lemongrass oils refresh your senses.",
      },
      {
        id: "thai-stretching",
        name: "Traditional Dry Thai Yoga Stretching Massage",
        category: "Trekker Recovery",
        priceNpr: 2900,
        priceUsd: 23,
        durationOrNote: "60 Mins · Acupressure + assisted joint mobility",
        description: "Oil-free mat therapy combining rhythmic thumb pressure and assisted yoga stretches to unlock stiff hips and hamstrings.",
      },
      {
        id: "couple-sanctuary-120",
        name: "Couple's 'Refresh Your Senses' Private Spa Package (For 2)",
        category: "Couple Packages",
        priceNpr: 6800,
        priceUsd: 52,
        durationOrNote: "90 Mins for 2 Guests · Aroma Massage + Foot Scrub + Herbal Tea",
        description: "Unwind side-by-side in a peaceful private suite with full-body aromatherapy massage, warm floral foot ritual, and organic Himalayan infusion.",
        popular: true,
      },
      {
        id: "foot-reflexology",
        name: "Tired Hiker Foot Soak & Reflexology Revival",
        category: "Express Relief",
        priceNpr: 1600,
        priceUsd: 13,
        durationOrNote: "45 Mins · Warm sea-salt soak + pressure point therapy",
        description: "Pure heaven after days in trekking boots—targeted arch, heel, and calf reflexology.",
      },
    ],
    highlights: [
      {
        title: "Peaceful Ambience Steps from Lakeside's Cafes",
        description: "Step off Street No. 14 into quiet treatment rooms scented with lemongrass, fresh linens, soothing warmth, and calming acoustic melodies.",
      },
      {
        title: "Skilled, Certified Therapists Who Listen to Your Body",
        description: "Choose gentle, medium, or firm pressure tailored to your exact tension zones—from gentle relaxation to deep sports recovery.",
      },
      {
        title: "Instant WhatsApp Reservation (Same-Hour Slots Available)",
        description: "Just got back from your trek? Pick your treatment and preferred time above to confirm directly on WhatsApp (+977 9846167167).",
      },
    ],
    reviews: [
      {
        author: "Hannah W.",
        roleOrSource: "Post-Mardi Himal Trek · UK",
        rating: 5,
        text: "Walked in barely able to bend my knees after 5 days on Mardi Himal and walked out floating! Cleanest rooms on Street 14 and genuinely skilled therapists.",
      },
      {
        author: "Marc & Elena",
        roleOrSource: "Couple Ritual Guests · Spain",
        rating: 5,
        text: "98% recommendation is well deserved. Peaceful ambience, hot herbal tea afterwards, and zero rush. We came back twice in 4 days in Pokhara.",
      },
      {
        author: "Bikash Gurung",
        roleOrSource: "Pokhara Local Guest",
        rating: 5,
        text: "Green Spa Pvt. Ltd. maintains five-star hygiene and warm hospitality at very fair prices. Best hot stone massage in Lakeside.",
      },
    ],
    faqs: [
      {
        q: "Can I book a same-day session right after returning from a trek?",
        a: "Yes! We are open until 10:30 PM daily. Tap the WhatsApp Booking button above and we will hold a clean, warm room ready for your arrival on Street No. 14.",
      },
      {
        q: "Are fresh towels, robes, and shower facilities provided?",
        a: "Absolutely—every therapy includes fresh sanitised linens, disposable essentials, warm shower access, and complimentary organic herbal tea.",
      },
      {
        q: "Do you offer private rooms for couples?",
        a: "Yes, our private couple suites allow two guests to enjoy synchronized massages and foot rituals together.",
      },
    ],
    currentWebsiteStatus: "No standalone website (Facebook only)",
    auditSummary: "Has 1,683 followers and a 98% rating on Facebook, yet zero standalone website for Google Maps / international tourist searches on Street No. 14.",
    pitchPriceNpr: 9999,
    monthlyCareNpr: 1500,
    emailSubject: "Built a live Street 14 Spa Menu + Instant WhatsApp Booking site for Green Spa Pokhara",
  },
  {
    slug: "le-spa-pokhara",
    template: "spa-luxury",
    name: "Le Spa by Donaldji",
    shortName: "Le Spa",
    tagline: "Your Pokhara Lakeside Indulgence to an Immaculate Holistic Spa Experience.",
    heroBadge: "Level 3, Fewa Times Square · Hallanchowk Lakeside, Pokhara",
    city: "Pokhara",
    neighborhood: "Hallanchowk, Lakeside",
    fullAddress: "Level 3, Fewa Times Square Building, Hallanchowk Lakeside, Baidam Road, Pokhara",
    landmark: "Level 3 inside Fewa Times Square Building, Hallanchowk",
    phoneDisplay: "+977 980-8887408",
    phoneTel: "+9779808887408",
    whatsappDigits: "9779808887408",
    email: "info.lespabydonaldji@gmail.com",
    hours: "Open Daily · 9:30 AM – 10:00 PM · Private Suite Reservations",
    heroImage: "/images/himalayan-spa.jpg",
    socialProofStat: "Elevated Level-3 Sanctuary · Hallanchowk Lakeside",
    stats: [
      { label: "Sanctuary", value: "Level 3 Private Suites" },
      { label: "Location", value: "Fewa Times Square" },
      { label: "Experience", value: "Holistic Luxury" },
      { label: "Reservations", value: "VIP WhatsApp" },
    ],
    services: [
      {
        id: "donaldji-signature-90",
        name: "The Donaldji Immaculate Holistic Signature Ritual",
        category: "Signature Indulgence",
        priceNpr: 4200,
        priceUsd: 33,
        durationOrNote: "90 Mins · Bespoke aromatherapy + warm compress + scalp calm",
        description: "Our flagship head-to-toe holistic indulgence blending flowing Swedish-Balinese strokes, warm herbal compresses, and cranial tension release.",
        popular: true,
      },
      {
        id: "himalayan-salt-glow",
        name: "Pink Himalayan Salt Polish & Deep Nourishing Oil Massage",
        category: "Body Rituals",
        priceNpr: 4800,
        priceUsd: 38,
        durationOrNote: "105 Mins · Full-body exfoliation + 60m massage",
        description: "Mineral-rich Himalayan crystal scrub buffs away travel fatigue, followed by a deeply hydrating warm botanical oil massage.",
        popular: true,
      },
      {
        id: "alpine-deep-tissue",
        name: "High-Altitude Deep Tissue & Myofascial Release",
        category: "Therapeutic",
        priceNpr: 3600,
        priceUsd: 28,
        durationOrNote: "75 Mins · Firm targeted recovery",
        description: "Slow, deliberate deep-muscle bodywork designed for trekkers, runners, and travellers carrying neck, back, and leg tension.",
      },
      {
        id: "couple-hallanchowk-suite",
        name: "Hallanchowk Royal Couple's Retreat (For 2 Guests)",
        category: "Couple Suites",
        priceNpr: 8200,
        priceUsd: 64,
        durationOrNote: "90 Mins · Private Suite + Foot Ritual + Artisanal Tea",
        description: "Escape above bustling Baidam Road into a quiet Level 3 couple sanctuary with synchronized holistic massages and floral foot bath.",
        popular: true,
      },
      {
        id: "radiance-facial",
        name: "Hydra-Botanical Himalayan Glow Facial",
        category: "Skin & Facial",
        priceNpr: 3200,
        priceUsd: 25,
        durationOrNote: "60 Mins · Restores sun & wind-exposed skin",
        description: "Replenishes moisture lost to mountain sun and crisp alpine winds with lymphatic facial massage and botanical masks.",
      },
    ],
    highlights: [
      {
        title: "Elevated Above the Street Noise at Fewa Times Square (Level 3)",
        description: "Enjoy true quietude high above Hallanchowk & Baidam Road in climate-controlled, sound-insulated luxury suites.",
      },
      {
        title: "Curated Aromatherapy Oils & Immaculate Linen Standards",
        description: "Every guest selects their signature essential-oil blend prior to treatment, paired with hotel-grade plush robes and hygiene.",
      },
      {
        title: "Effortless Direct Suite Booking via WhatsApp",
        description: "Select your ritual duration and preferred suite time above to connect immediately with our reception desk (+977 980-8887408).",
      },
    ],
    reviews: [
      {
        author: " Claire Beaumont",
        roleOrSource: "Lakeside Boutique Traveller · France",
        rating: 5,
        text: "True boutique hotel spa standard right at Hallanchowk. Being on Level 3 of Fewa Times Square makes it completely silent and serene.",
      },
      {
        author: "Siddharth Rana",
        roleOrSource: "Weekend Retreat · Kathmandu",
        rating: 5,
        text: "Immaculate interiors, refined essential oils, and therapists who actually understand anatomy. Easily the classiest wellness spot on Baidam Road.",
      },
      {
        author: "Nadia & Tom",
        roleOrSource: "Annapurna Circuit Finishers",
        rating: 5,
        text: "Booked the 90-minute Couple Retreat after two weeks on trail—worth every rupee. Felt completely renewed.",
      },
    ],
    faqs: [
      {
        q: "How do I find Le Spa by Donaldji in Lakeside?",
        a: "We are located at Hallanchowk on Baidam Road—take the elevator/stairs to Level 3 of the Fewa Times Square Building.",
      },
      {
        q: "Should we reserve Couple Suites in advance?",
        a: "Afternoon and evening couple sessions (4:00 PM – 9:00 PM) book quickly—sending a quick WhatsApp request via our builder guarantees zero wait time.",
      },
      {
        q: "Can we customize oil scent and massage pressure?",
        a: "Yes, every session begins with a brief consultation to tailor oil blend, room warmth, and exact focus areas.",
      },
    ],
    currentWebsiteStatus: "lespabydonaldji.com.np is completely offline",
    auditSummary: "Domain lespabydonaldji.com.np listed on your Facebook page fails to connect, causing Hallanchowk guests clicking your link to hit an error screen.",
    pitchPriceNpr: 12999,
    monthlyCareNpr: 1500,
    emailSubject: "lespabydonaldji.com.np is currently unreachable — built a live luxury spa preview for Le Spa by Donaldji",
  },
  {
    slug: "rosemary-spa",
    template: "spa-heritage",
    name: "Rosemary Spa & Beauty Home",
    shortName: "Rosemary Spa",
    tagline: "Pokhara's First Wellness Sanctuary Since 2004 — 22 Years of Authentic Healing.",
    heroBadge: "Est. 2004 · 1st Spa in Pokhara · Street 16 Centerpoint, Lakeside",
    city: "Pokhara",
    neighborhood: "Street No. 16, Centerpoint Lakeside",
    fullAddress: "Street No. 16 (Entrance 1st Building), Centerpoint Lakeside, Pokhara, Nepal",
    landmark: "1st Building at Entrance of Street No. 16, Centerpoint Lakeside",
    phoneDisplay: "+977 981-8392945",
    phoneTel: "+9779818392945",
    whatsappDigits: "9779818392945",
    email: "rosemaryspa.pkr@gmail.com",
    hours: "Open Daily · 8:30 AM – 10:00 PM · Air-Conditioned Private Suites",
    heroImage: "/images/himalayan-spa.jpg",
    established: "2004",
    socialProofStat: "Est. 2004 (Pokhara's 1st Spa) · 92% Recommended",
    stats: [
      { label: "Heritage", value: "Since 2004" },
      { label: "Signature Therapies", value: "18+ Treatments" },
      { label: "Comfort", value: "AC Private Rooms" },
      { label: "Guest Rating", value: "92% Recommend" },
    ],
    services: [
      {
        id: "rosemary-trekkers-therapy",
        name: "Signature Rosemary Trekkers Recovery Therapy",
        category: "Heritage Therapies",
        priceNpr: 3000,
        priceUsd: 24,
        durationOrNote: "75 Mins · Perfected over 22 years in Pokhara",
        description: "Our legendary post-trek restorative bodywork combining warm herbal oils, deep calf/hamstring decompression, and back mobilization.",
        popular: true,
      },
      {
        id: "ayurvedic-shirodhara",
        name: "Authentic Ayurvedic Massage & Warm Herbal Oil Ritual",
        category: "Heritage Therapies",
        priceNpr: 3400,
        priceUsd: 27,
        durationOrNote: "90 Mins · Detoxifying warm medicated herbal oils",
        description: "Ancient healing traditions performed by seasoned therapists to restore dosha balance, circulation, and deep mental calm.",
        popular: true,
      },
      {
        id: "thai-stretching-acu",
        name: "Thai Stretching Therapy & Acupressure",
        category: "Therapeutic & Acupuncture",
        priceNpr: 2800,
        priceUsd: 22,
        durationOrNote: "60 Mins · Boosts flexibility & energy flow",
        description: "Guided passive yoga stretches and meridian pressure points that leave stiff joints lighter and deeply energized.",
        popular: true,
      },
      {
        id: "herbal-scalp-steam",
        name: "Herbal Head, Scalp & Steam Hair Rejuvenation",
        category: "Beauty & Parlour",
        priceNpr: 2200,
        priceUsd: 18,
        durationOrNote: "50 Mins · Herbal oil blend + steam + neck/shoulder release",
        description: "Nourishes dry scalp, prevents dandruff, and melts away headache and neck tension.",
      },
      {
        id: "beauty-home-package",
        name: "Complete Beauty Parlour & Glow Package",
        category: "Beauty & Parlour",
        priceNpr: 3800,
        priceUsd: 30,
        durationOrNote: "Facial + Hair Spa + Manicure/Pedicure options",
        description: "Full-service parlour care including precision cuts, blow-dry styling, highlights, keratin smoothing, and herbal facials.",
      },
      {
        id: "therapeutic-training",
        name: "Professional Spa & Massage Therapy Certification Inquiry",
        category: "Training Academy",
        priceNpr: 15000,
        priceUsd: 115,
        durationOrNote: "Hands-on vocational training · Pokhara's pioneer institute",
        description: "Learn authentic Ayurvedic, Thai, and modern spa protocols directly from Pokhara's longest-running spa institution.",
      },
    ],
    highlights: [
      {
        title: "Pokhara's Pioneer Spa Since 2004 (22+ Years of Trust)",
        description: "Founded in 2004 at Lakeside Centerpoint, Rosemary Spa has welcomed tens of thousands of trekkers, travellers, and Pokhara families.",
      },
      {
        title: "Cozy Air-Conditioned Suites + Full Beauty Home Under One Roof",
        description: "Combine authentic Ayurvedic massage, acupuncture, or Thai stretching with complete salon and beauty care.",
      },
      {
        title: "Instant Working Online & WhatsApp Booking",
        description: "Pick your treatment and time slot above to message our Street 16 reception directly on WhatsApp (+977 981-8392945).",
      },
    ],
    reviews: [
      {
        author: "Samyog Dhakal",
        roleOrSource: "Verified Rosemary Spa Guest",
        rating: 5,
        text: "My experience at Rosemary Spa was truly rejuvenating. The therapists were attentive to my needs, and the Ayurvedic Massage left me feeling both relaxed and invigorated.",
      },
      {
        author: "Sristita Poudel",
        roleOrSource: "Thai Stretching Guest",
        rating: 5,
        text: "The Thai Stretching Therapy at Rosemary Spa worked wonders for my sore muscles. I left feeling lighter and more flexible.",
      },
      {
        author: "David Kyle",
        roleOrSource: "International Traveller",
        rating: 5,
        text: "I have visited many spas, but Rosemary Spa stands out. The Aroma Therapy was a sensory delight and true relaxation is achieved.",
      },
    ],
    faqs: [
      {
        q: "Where exactly on Lakeside is Rosemary Spa & Beauty Home?",
        a: "Right at Lakeside Centerpoint—the 1st building at the entrance of Street No. 16, Pokhara.",
      },
      {
        q: "Are the massage rooms air-conditioned / heated?",
        a: "Yes! All treatment rooms are climate-controlled so you stay cozy in winter and cool in summer.",
      },
      {
        q: "Do you also offer professional spa therapy training?",
        a: "Yes—as Pokhara's first spa (est. 2004), we run practical certification courses in Ayurvedic, Thai, and modern spa therapies.",
      },
    ],
    currentWebsiteStatus: "rosemaryspa.com.np has dead '#' Book Now links & '0+' counters",
    auditSummary: "On rosemaryspa.com.np, the 'Book Now' buttons link to '#' (do nothing when tapped) and homepage counters read '0+ Treatments / 0+ Therapists' despite your 2004 heritage.",
    pitchPriceNpr: 10999,
    monthlyCareNpr: 1500,
    emailSubject: "Noticed 'Book Now' & '0+ Treatments' bug on rosemaryspa.com.np — built a working booking upgrade for Rosemary Spa",
  },
  {
    slug: "meditouch-pokhara",
    template: "dermatology",
    name: "MediTouch Skin & Hair Clinic",
    shortName: "MediTouch Clinic",
    tagline: "Board-Certified Dermatology, Hair Restoration & Medical Aesthetics in Pokhara.",
    heroBadge: "5+ Years of Clinical Excellence in Pokhara · Holistic Skin & Hair Care",
    city: "Pokhara",
    neighborhood: "Pokhara Metro",
    fullAddress: "Pokhara Metropolitan City, Kaski, Nepal",
    landmark: "Central Pokhara · Specialist Dermatology, Venereology & Cosmetic Surgery",
    phoneDisplay: "061-590664",
    phoneTel: "+97761590664",
    email: "clinic.meditouch@gmail.com",
    hours: "Sun – Fri: 9:30 AM – 6:00 PM · Saturday Specialist OPD Slots",
    heroImage: "/images/skin-clinic.jpg",
    leadDoctorOrFounder: "Gautam Sunar (Founder) & Board-Certified Dermatology / Cosmetic Surgery Team",
    socialProofStat: "5+ Years in Pokhara · Specialist Dermatologists & Cosmetic Surgeons",
    stats: [
      { label: "Experience", value: "5+ Years" },
      { label: "Specialists", value: "MD Derm & Plastic" },
      { label: "Care Scope", value: "Skin · Hair · Nail" },
      { label: "Direct Desk", value: "061-590664" },
    ],
    services: [
      {
        id: "acne-scar-protocol",
        name: "Clinical Acne, Post-Acne Marks & Scar Clearance Protocol",
        category: "Medical Dermatology",
        priceNpr: 1000,
        durationOrNote: "Specialist OPD Consultation + Custom Regimen",
        description: "Root-cause dermatological diagnosis for active acne, stubborn pigmentation, dandruff, eczema, and nail conditions with full patient education.",
        popular: true,
      },
      {
        id: "chemical-peel-melasma",
        name: "Medical-Grade Chemical Peel & Melasma Brightening",
        category: "Aesthetic Procedures",
        priceNpr: 4500,
        durationOrNote: "45 Mins · Pre- & post-peel clinical supervision",
        description: "Targeted cellular renewal for sun damage, melasma, uneven tone, and post-acne hyperpigmentation.",
        popular: true,
      },
      {
        id: "hair-fall-prp",
        name: "Hair Fall Diagnosis, GFC / PRP & Hair Transplant Evaluation",
        category: "Hair Restoration",
        priceNpr: 6500,
        durationOrNote: "Trichoscopy scalp scan + Growth-factor therapy",
        description: "Comprehensive hair-loss workup, platelet/growth-factor scalp rejuvenation, and board-certified hair transplant planning.",
        popular: true,
      },
      {
        id: "hydrafacial-laser",
        name: "Advanced Hydra-Rejuvenation & Laser Skin Therapy",
        category: "Aesthetic Procedures",
        priceNpr: 5500,
        durationOrNote: "60 Mins · Zero downtime radiance",
        description: "Deep pore vortex cleansing, antioxidant infusion, laser hair/scar refinement, and anti-aging revitalization.",
      },
      {
        id: "cosmetic-surgery-consult",
        name: "Board-Certified Cosmetic & Dermatosurgery Consultation",
        category: "Cosmetic Surgery",
        priceNpr: 1500,
        durationOrNote: "Private 1-on-1 surgical & aesthetic planning",
        description: "Mole/cyst excision, scar revision, and tailored cosmetic surgery consultations with board-certified specialists.",
      },
    ],
    highlights: [
      {
        title: "Patient-First Explanations — Never Rushed Consultations",
        description: "Our dermatologists take time to explain the exact cause, treatment timeline, precautions, and realistic outcomes clearly.",
      },
      {
        title: "Dermatology, Hair Restoration & Cosmetic Surgery Under One Roof",
        description: "Bridging Pokhara's specialist healthcare gap with evidence-based medical dermatology and safe aesthetic technology.",
      },
      {
        title: "3-Step Online Concern Matcher & Appointment Booking",
        description: "Select your skin, hair, or aesthetic concern above to request your preferred OPD slot directly.",
      },
    ],
    reviews: [
      {
        author: "Rushma Tamrakar",
        roleOrSource: "Acne & Dandruff Patient · Pokhara",
        rating: 5,
        text: "I went to MediTouch Clinic for acne with marks and dandruff problem—now it is cured completely. Strongly recommend them for all types of skin and hair issues!",
      },
      {
        author: "Rajani Shrestha",
        roleOrSource: "Verified Dermatology Patient",
        rating: 5,
        text: "Extremely easy to talk to, spends adequate time, precise treatment and explains very patiently about the disease course, prognosis, and precautions.",
      },
      {
        author: "Bhawana Sapkota",
        roleOrSource: "Hair Fall Treatment · Pokhara",
        rating: 5,
        text: "The doctors have a very good approach towards their patients. Treated my hair fall problem really well and I see clear positive results.",
      },
      {
        author: "Manish Malla Thakuri",
        roleOrSource: "Verified Clinic Guest",
        rating: 5,
        text: "Peaceful, calming ambience and heart-warming hospitality. The doctors explained everything clearly and professionally.",
      },
    ],
    faqs: [
      {
        q: "What skin and hair conditions do your specialists treat?",
        a: "We treat medical dermatology conditions (acne, melasma, eczema, fungal/nail issues, dandruff, venereology) alongside PRP hair restoration, hair transplant, chemical peels, and cosmetic surgery.",
      },
      {
        q: "Do you have board-certified dermatologists and cosmetic surgeons?",
        a: "Yes—all consultations and procedures at MediTouch Skin & Hair Clinic are led by qualified, board-certified dermatologists and cosmetic surgeons.",
      },
      {
        q: "How do I schedule an appointment?",
        a: "Use our quick online appointment form on this page or call our Pokhara reception directly at 061-590664.",
      },
    ],
    currentWebsiteStatus: "meditouch.com.np displays 'aaaaaaaa' service bug & raw '\\n'",
    auditSummary: "Homepage featured service card currently reads 'aaaaaaaa', About text prints literal '\\n' characters, and article links point to '#'.",
    pitchPriceNpr: 11999,
    monthlyCareNpr: 1500,
    emailSubject: "Heads up: 'aaaaaaaa' text bug on meditouch.com.np homepage + built a clean clinic upgrade preview",
  },
];

export function getBusinessBySlug(slug: string): BusinessConfig | undefined {
  return BUSINESSES.find((b) => b.slug === slug);
}
