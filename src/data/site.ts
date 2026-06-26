export interface Stat {
  value: string;
  label: string;
}

export interface FacilityFeature {
  icon: string;
  title: string;
  description: string;
}

export const stats: Stat[] = [
  { value: "150+", label: "Athletes Trained Weekly" },
  { value: "10,500", label: "sqft Climate-Controlled" },
  { value: "40+", label: "Homeschool Athletes" },
  { value: "12", label: "Professional Coaches" },
];

export const facilityFeatures: FacilityFeature[] = [
  {
    icon: "target",
    title: "HitTrax System",
    description: "Real-time hitting analytics and simulation technology for the most precise player development data available.",
  },
  {
    icon: "radar",
    title: "Rapsodo",
    description: "Pro-level pitch and hitting tracking that measures velocity, spin rate, exit velo, and launch angle.",
  },
  {
    icon: "snowflake",
    title: "25 Tons of A/C",
    description: "Full climate control across the entire facility. Train comfortably year-round regardless of Florida weather.",
  },
  {
    icon: "dumbbell",
    title: "Full Gym",
    description: "Complete strength and conditioning setup designed specifically for baseball and softball athletes.",
  },
  {
    icon: "layers",
    title: "Turf & Cages",
    description: "Premium turf playing surface and 5 indoor batting cages with Hack Attack pitching machines.",
  },
  {
    icon: "ruler",
    title: "10,500 sqft",
    description: "Massive indoor training space. Everything — hitting, pitching, defense, and strength — in specialized facilities.",
  },
];

export const siteConfig = {
  name: "Ballplex",
  tagline: "Learn. Develop. Perform.",
  description:
    "Elite Baseball & Softball Player Development in Viera, Florida. Private Lessons, Homeschool Program, Strength & Conditioning and Cage Rentals.",
  phone: "(321) 321-5558",
  email: "manager@theballplex.com",
  addresses: [
    {
      label: "Rentals",
      address: "7285 Waelti Dr., Viera, FL 32940, US.",
    },
    {
      label: "Player Development",
      address: "7255 Waelti Dr., Viera, FL 32940, US.",
    },
  ],
  bookNowUrl: "https://book.runswiftapp.com/facilities/ballplex",
  socials: {
    instagram: "https://www.instagram.com/ballplex/",
    facebook: "https://www.facebook.com/ballplex/",
  },
};

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/programs",
    children: [
      { label: "Private Lessons", href: "/programs#lessons" },
      { label: "Memberships", href: "/programs#memberships" },
      { label: "Strength & Conditioning", href: "/programs#strength" },
      { label: "Homeschool", href: "/homeschool" },
      { label: "Cage Rentals", href: "/programs#rentals" },
      { label: "Camps & Events", href: "/programs#camps" },
    ],
  },
  { label: "Coaches", href: "/programs#coaches" },
  { label: "Events", href: "/events" },
  { label: "Store", href: "/store" },
  { label: "Contact", href: "/contact" },
];
