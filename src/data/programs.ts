export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  features?: string[];
  pricing?: string;
}

export const programs: Program[] = [
  {
    id: "lessons",
    title: "Private Lessons",
    description: "Personalized 1-on-1 or duo instruction in hitting, pitching, catching, and fielding. Every lesson uses Rapsodo and HitTrax technology to track progress from day one.",
    icon: "user",
    link: "/programs#lessons",
    pricing: "From $80/hr",
  },
  {
    id: "memberships",
    title: "Memberships",
    description: "Three tiers — Pro, All-Access, and Elite — designed for athletes who take their development seriously. Includes assessments, programming, open cage time, and exclusive discounts.",
    icon: "badge",
    link: "/programs#memberships",
    pricing: "From $95/month",
  },
  {
    id: "strength",
    title: "Strength & Conditioning",
    description: "Sport-specific training led by Coach Gianmarco Marcelletti. Semi-private sessions for ages 7+ with focus on injury prevention, speed, power, and agility.",
    icon: "dumbbell",
    link: "/programs#strength",
    pricing: "From $200/month",
  },
  {
    id: "homeschool",
    title: "Homeschool Program",
    description: "A complete academic and athletic program for competitive baseball and softball student-athletes. Daily training combined with a nationally recognized curriculum through TNXL Academy.",
    icon: "book",
    link: "/homeschool",
    pricing: "",
  },
  {
    id: "rentals",
    title: "Cage Rentals",
    description: "6,000 sqft of indoor cage space with 5 cages available for individual, duo, or team rentals. Pitching machines and equipment included options.",
    icon: "target",
    link: "/programs#rentals",
    pricing: "From $40/hr",
  },
  {
    id: "camps",
    title: "Camps & Events",
    description: "Seasonal baseball and softball camps designed to accelerate player development in a team environment. Special events hosted year-round.",
    icon: "calendar",
    link: "/programs#camps",
    pricing: "",
  },
];
