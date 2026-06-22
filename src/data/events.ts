export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  category: string;
  description: string;
  image: string;
  price: string;
  featured: boolean;
  ageGroup: string;
  spots: string;
  duration: string;
  highlights?: string[];
}

export interface EventCategory {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const eventCategories: EventCategory[] = [
  {
    id: "camps",
    label: "Camps",
    description: "Multi-day intensive training camps designed to accelerate player development.",
    icon: "flame",
  },
  {
    id: "tournaments",
    label: "Tournaments",
    description: "Competitive tournaments for travel teams and local organizations.",
    icon: "trophy",
  },
  {
    id: "clinics",
    label: "Clinics",
    description: "Focused single-day clinics on specific skills like hitting, pitching, and defense.",
    icon: "target",
  },
  {
    id: "showcases",
    label: "Showcases",
    description: "Showcase events for athletes looking to get recruited by college programs.",
    icon: "star",
  },
  {
    id: "community",
    label: "Community",
    description: "Family-friendly events, fundraisers, and open-house celebrations.",
    icon: "users",
  },
];

export const events: Event[] = [
  {
    id: "summer-elite-camp-2026",
    title: "Summer Elite Prospect Camp",
    date: "July 14 — 17, 2026",
    time: "9:00 AM — 3:00 PM",
    category: "camps",
    description:
      "Four-day elite camp for serious baseball and softball athletes ages 12-18. Includes Rapsodo and HitTrax assessments, position-specific drills, simulated games, and a recruiting seminar led by former D1 coaches.",
    image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=800&q=80",
    price: "$349",
    featured: true,
    ageGroup: "12 — 18",
    spots: "8 of 40 remaining",
    duration: "4 days",
    highlights: [
      "Rapsodo & HitTrax data reports",
      "Position-specific training",
      "College recruiting seminar",
      "Camp t-shirt included",
    ],
  },
  {
    id: "sunday-showcase-july",
    title: "Sunday Showcase Series",
    date: "July 27, 2026",
    time: "10:00 AM — 4:00 PM",
    category: "showcases",
    description:
      "A premier showcase event where athletes run the 60, take BP, and throw bullpens in front of college scouts. Every athlete receives verified metrics, video, and a player profile to send to college programs.",
    image: "https://images.unsplash.com/photo-1577221084712-45b0445d2b00?w=800&q=80",
    price: "$199",
    featured: true,
    ageGroup: "14 — 18",
    spots: "12 of 30 remaining",
    duration: "1 day",
    highlights: [
      "Verified 60-yard dash time",
      "Exit velo & throwing velo",
      "Professional video package",
      "Player profile sent to colleges",
    ],
  },
  {
    id: "fall-ball-tournament",
    title: "Ballplex Fall Classic Tournament",
    date: "September 12 — 14, 2026",
    time: "8:00 AM — 8:00 PM",
    category: "tournaments",
    description:
      "Three-day tournament at Ballplex and surrounding fields. 8U through 18U divisions. Pool play into single elimination. Champions receive team trophy, rings, and a free month of Ballplex membership.",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&q=80",
    price: "$495/team",
    featured: true,
    ageGroup: "8U — 18U",
    spots: "4 spots left per division",
    duration: "3 days",
    highlights: [
      "8U to 18U divisions",
      "Pool play + elimination",
      "Championship rings",
      "Live-streamed finals",
    ],
  },
  {
    id: "hitting-clinic-august",
    title: "Hitting Masterclass Clinic",
    date: "August 9, 2026",
    time: "9:00 AM — 1:00 PM",
    category: "clinics",
    description:
      "Half-day hitting intensive covering swing mechanics, approach, and mental game. Athletes will work through stations using HitTrax, tee work, front toss, and live at-bats with instant video feedback.",
    image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=800&q=80",
    price: "$89",
    featured: false,
    ageGroup: "9 — 16",
    spots: "18 spots available",
    duration: "4 hours",
    highlights: [
      "HitTrax batting simulation",
      "Video swing analysis",
      "Mental approach session",
      "Take-home drill packet",
    ],
  },
  {
    id: "pitching-clinic-august",
    title: "Pitching & Arm Care Clinic",
    date: "August 16, 2026",
    time: "9:00 AM — 1:00 PM",
    category: "clinics",
    description:
      "Comprehensive pitching clinic focused on mechanics, velocity development, arm care routines, and pitch design. Uses Rapsodo technology for real-time data on spin rate, velocity, and movement.",
    image: "https://images.unsplash.com/photo-1596783182474-7ba48e66add4?w=800&q=80",
    price: "$89",
    featured: true,
    ageGroup: "10 — 18",
    spots: "14 spots available",
    duration: "4 hours",
    highlights: [
      "Rapsodo pitch tracking",
      "Arm care & recovery",
      "Pitch design session",
      "Bullpen with feedback",
    ],
  },
  {
    id: "friday-night-lights",
    title: "Friday Night Lights: Open Play",
    date: "Every Friday",
    time: "6:00 PM — 9:00 PM",
    category: "community",
    description:
      "Every Friday night we open the facility for supervised open play. Cages, HitTrax, and turf area available. Music, snacks, and a relaxed environment. Members free, drop-ins welcome.",
    image: "https://images.unsplash.com/photo-1629553147937-f2f58110f8c6?w=800&q=80",
    price: "$15 drop-in",
    featured: false,
    ageGroup: "All ages",
    spots: "No limit",
    duration: "3 hours",
    highlights: [
      "All cages open",
      "HitTrax challenges",
      "Music & snacks",
      "Members free",
    ],
  },
  {
    id: "homeschool-showcase",
    title: "Homeschool All-Star Showcase",
    date: "August 23, 2026",
    time: "10:00 AM — 3:00 PM",
    category: "showcases",
    description:
      "Showcase event exclusively for homeschool athletes. Verified metrics, scouting reports, and a Q&A panel with coaches who have experience placing homeschool athletes in college programs.",
    image: "https://images.unsplash.com/photo-1631194758628-71ec7c35137e?w=800&q=80",
    price: "$149",
    featured: true,
    ageGroup: "13 — 18",
    spots: "20 spots available",
    duration: "1 day",
    highlights: [
      "Homeschool-specific recruiting",
      "Verified metrics",
      "Coach Q&A panel",
      "NCAA eligibility guidance",
    ],
  },
  {
    id: "youth-camp-august",
    title: "Youth Fundamentals Camp",
    date: "August 2 — 3, 2026",
    time: "9:00 AM — 12:00 PM",
    category: "camps",
    description:
      "Two-day camp for young athletes learning the game. Covers throwing, catching, hitting, and base running fundamentals in a fun, encouraging environment. Games and competitions each day.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    price: "$129",
    featured: false,
    ageGroup: "6 — 10",
    spots: "10 spots available",
    duration: "2 days",
    highlights: [
      "Fun games & competitions",
      "Fundamentals focus",
      "Camp t-shirt included",
      "Parent resources packet",
    ],
  },
  {
    id: "coaches-clinic-sept",
    title: "Coaches Development Seminar",
    date: "September 6, 2026",
    time: "9:00 AM — 4:00 PM",
    category: "clinics",
    description:
      "Full-day seminar for youth, travel, and high school coaches. Sessions on practice planning, using tech (Rapsodo/HitTrax), player development strategies, drills library, and building a program culture.",
    image: "https://images.unsplash.com/photo-1594394489098-74ac04c0fc2e?w=800&q=80",
    price: "$99",
    featured: false,
    ageGroup: "Coaches",
    spots: "25 spots available",
    duration: "1 day",
    highlights: [
      "Tech integration training",
      "Practice plan templates",
      "Drill library access",
      "CEU certificate",
    ],
  },
  {
    id: "family-night-august",
    title: "Ballplex Family Night & BBQ",
    date: "August 30, 2026",
    time: "5:00 PM — 9:00 PM",
    category: "community",
    description:
      "End-of-summer celebration for all Ballplex families. Free BBQ, wiffle ball tournament, HitTrax home run derby, face painting for kids, and facility tours for new families. Open to the public.",
    image: "https://images.unsplash.com/photo-1529693662659-6861a90e00fa?w=800&q=80",
    price: "Free",
    featured: false,
    ageGroup: "All ages",
    spots: "No limit",
    duration: "4 hours",
    highlights: [
      "Free BBQ & drinks",
      "Wiffle ball tournament",
      "Home run derby",
      "Facility tours",
    ],
  },
];

export function getFeaturedEvents(): Event[] {
  return events.filter((e) => e.featured);
}

export function getEventsByCategory(categoryId: string): Event[] {
  return events.filter((e) => e.category === categoryId);
}

export function getUpcomingEvents(): Event[] {
  return events.filter((e) => !e.date.startsWith("Every"));
}
