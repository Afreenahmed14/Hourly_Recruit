// ── Datastore.js ─────────────────────────────────────────────────────────────
// Single source of truth for all editable site content.
// Persisted to localStorage so admin edits survive page refreshes.

export const DEFAULT_DATA = {
  home: {
    hero: {
      badge: "Hire Developers On Hourly Basis",
      heading1: "Hire Skilled",
      heading2: "Developers on",
      accent: "Hourly Basis",
      subtext: "Scale your projects faster with experienced developers available on flexible hourly engagement models. No long-term contracts, no risk.",
      checks: ["Flexible Hiring", "No Long-Term Contracts", "Quick Onboarding", "Pay Only for Productive Hours"],
      cardStats: [
        { value: "500+", label: "Developers" },
        { value: "48h",  label: "Avg. Hire Time" },
        { value: "98%",  label: "Satisfaction" },
      ],
    },
    testimonials: [
      { initials: "RM", name: "Rahul Mehta", role: "Founder, SaaSFlow", color: "linear-gradient(135deg,#1a56db,#3b82f6)", quote: "HourlyRecruit helped us hire experienced developers within days. Their flexible engagement model allowed us to scale quickly without long-term commitments." },
      { initials: "PS", name: "Priya Sharma", role: "CTO, FinEdge", color: "linear-gradient(135deg,#ec4899,#f43f5e)", quote: "We successfully launched our platform faster with HourlyRecruit's dedicated engineering team. Communication and delivery quality were outstanding." },
      { initials: "AK", name: "Aman Kapoor", role: "Product Lead, LogiTrack", color: "linear-gradient(135deg,#8b5cf6,#7c3aed)", quote: "The quality of developers we hired was exceptional. They integrated into our team immediately and delivered results from day one." },
    ],
  },
  developers: [
    { initials: "AK", name: "Arjun Kumar",    role: "Senior React Developer",     exp: "6 yrs", rate: "$35/hr", rating: "4.9", projects: 42, color: "linear-gradient(135deg,#1a56db,#3b82f6)", skills: ["React.js","TypeScript","Next.js","Node.js"], category: "Frontend" },
    { initials: "PS", name: "Priya Singh",     role: "Full Stack Developer",        exp: "5 yrs", rate: "$38/hr", rating: "5.0", projects: 31, color: "linear-gradient(135deg,#ec4899,#f43f5e)", skills: ["React.js","Node.js","MongoDB","AWS"],           category: "Full Stack" },
    { initials: "RV", name: "Rahul Verma",     role: "Backend Engineer",            exp: "7 yrs", rate: "$40/hr", rating: "4.8", projects: 58, color: "linear-gradient(135deg,#06b6d4,#0891b2)", skills: ["Python","Django","PostgreSQL","Redis"],          category: "Backend" },
    { initials: "SM", name: "Sneha Mehta",     role: "Flutter Developer",           exp: "4 yrs", rate: "$32/hr", rating: "4.9", projects: 27, color: "linear-gradient(135deg,#8b5cf6,#7c3aed)", skills: ["Flutter","Dart","Firebase","iOS/Android"],       category: "Mobile" },
    { initials: "KP", name: "Kiran Patel",     role: "DevOps Engineer",             exp: "6 yrs", rate: "$42/hr", rating: "4.8", projects: 45, color: "linear-gradient(135deg,#f59e0b,#d97706)", skills: ["AWS","Docker","Kubernetes","Terraform"],          category: "DevOps" },
    { initials: "DG", name: "Divya Gupta",     role: "UI/UX Designer",              exp: "5 yrs", rate: "$30/hr", rating: "5.0", projects: 38, color: "linear-gradient(135deg,#22c55e,#16a34a)", skills: ["Figma","Adobe XD","Framer","Prototyping"],       category: "Design" },
    { initials: "AS", name: "Amit Sharma",     role: "Node.js Developer",           exp: "5 yrs", rate: "$36/hr", rating: "4.7", projects: 33, color: "linear-gradient(135deg,#0ea5e9,#0284c7)", skills: ["Node.js","Express","GraphQL","MongoDB"],         category: "Backend" },
    { initials: "NR", name: "Neha Rao",        role: "React Native Developer",      exp: "4 yrs", rate: "$33/hr", rating: "4.9", projects: 22, color: "linear-gradient(135deg,#f43f5e,#e11d48)", skills: ["React Native","Redux","Firebase","REST APIs"],   category: "Mobile" },
    { initials: "VK", name: "Vikram Krishnan", role: "Java Backend Developer",      exp: "8 yrs", rate: "$44/hr", rating: "4.8", projects: 67, color: "linear-gradient(135deg,#d97706,#b45309)", skills: ["Java","Spring Boot","Microservices","AWS"],      category: "Backend" },
  ],
  pricing: [
    { name: "Hourly",     amount: "$25",   period: "/hr",  subtext: "Pay as you go · No minimum commitment",              popular: false, features: ["Access to vetted developers","Pay for actual hours logged","Weekly billing & timesheets","Start & pause anytime","Basic account support"] },
    { name: "Dedicated",  amount: "$2,800",period: "/mo",  subtext: "Full-time dedicated developer · Timezone aligned",   popular: true,  features: ["Everything in Hourly","Exclusive to your project","Full timezone alignment","Daily standups & reporting","Dedicated account manager","7-day replacement guarantee"] },
    { name: "Team",       amount: "Custom",period: "",     subtext: "Full project team · Milestone-based billing",        popular: false, features: ["Everything in Dedicated","2–12 member teams","Project manager included","Milestone-based billing","Fixed scope delivery","Priority support 24/7"] },
  ],
  about: {
    hero: {
      heading: "We Connect Great Companies With World-Class Developers",
      subtext: "HourlyRecruit was founded with a mission to bridge the talent gap — making it easy for startups and enterprises to access exceptional technical talent on flexible terms.",
    },
    content: {
      mission: "To make world-class technical talent accessible to every company, regardless of size, budget, or location — through transparent, flexible, and human-first hiring.",
      founded: "2021",
      developers: "500+",
      clients: "200+",
      countries: "30+",
    },
    stats: [
      { value: "500+", label: "Vetted Developers" },
      { value: "200+", label: "Happy Clients" },
      { value: "30+",  label: "Countries Served" },
      { value: "48h",  label: "Average Hire Time" },
    ],
    team: [
      { initials: "RK", name: "Rohit Kumar",   role: "CEO & Co-Founder",    color: "linear-gradient(135deg,#1a56db,#3b82f6)" },
      { initials: "AN", name: "Ananya Nair",   role: "CTO & Co-Founder",    color: "linear-gradient(135deg,#ec4899,#f43f5e)" },
      { initials: "SK", name: "Suresh Khanna", role: "Head of Operations",  color: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
      { initials: "MP", name: "Meena Patel",   role: "Head of Talent",      color: "linear-gradient(135deg,#22c55e,#16a34a)" },
    ],
  },
  contact: {
    heading: "Have a Project in Mind?",
    subtext: "Let's discuss how we can help you build and scale your product with the right tech talent.",
    phone: "+91 888 444 6677",
    email: "hr@hourlyrecruit.com",
    location: "Bangalore, India",
    website: "www.hourlyrecruit.com",
  },
  howItWorks: {
    faqs: [
      { q: "How quickly can I hire a developer?",                  a: "In most cases, you can have a developer ready to start within 48 hours of sharing your requirements." },
      { q: "What if the developer doesn't meet my expectations?",  a: "We offer a 7-day guarantee. If you're not satisfied in the first week, we'll find you a replacement at no additional cost." },
      { q: "Do I need to sign a long-term contract?",              a: "No. Our Hourly model has zero minimum commitment. Our Dedicated model runs month-to-month with a 7-day cancellation notice." },
      { q: "How do you vet your developers?",                      a: "Every developer passes a multi-stage process: initial technical screen, live coding assessment, system design interview, communication evaluation, and reference checks." },
      { q: "What time zones do your developers work in?",          a: "Our developers are spread across IST, EET, and LATAM time zones. We match you with developers who overlap at least 4 hours with your working day." },
      { q: "How does billing work?",                               a: "Hourly model: billed weekly based on timesheets. Dedicated model: fixed monthly billing. Project model: milestone-based payments. All invoices are NET-15." },
      { q: "Can developers join our existing team processes?",     a: "Absolutely. Our developers integrate into your Slack, Jira, GitHub, standups, and sprint cycles from day one." },
    ],
  },
  footer: {
    desc: "Hire skilled developers on hourly basis and scale your projects faster without long-term commitments.",
    copyright: "© 2024 HourlyRecruit. All Rights Reserved.",
  },
};

const KEY = "hr_site_data_v2";

export function getData() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_DATA);
    return JSON.parse(raw);
  } catch {
    return structuredClone(DEFAULT_DATA);
  }
}

export function setData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
  // Dispatch a custom event so all open consumers can re-render
  window.dispatchEvent(new CustomEvent("hr_data_updated", { detail: data }));
}

export function resetData() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent("hr_data_updated", { detail: structuredClone(DEFAULT_DATA) }));
}

// Hook: components call this to stay in sync with admin edits
export function useDataStore() {
  const [data, setDataState] = window.__React
    ? window.__React.useState(getData)
    : [getData(), () => {}];

  return data;
}