/**
 * ─────────────────────────────────────────────────────────────────────────────
 * Datastore.js — Updated for Backend Integration
 * Manages site data with API fallback to localStorage/defaults
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { siteDataAPI } from "./Api";

// Default data (fallback for when API is unavailable)
export const DEFAULT_DATA = {
  home: {
    hero: {
      badge: "Hire Developers On Hourly Basis",
      heading1: "Hire Skilled Developers on",
      heading2: "Hourly Basis",
      subtext:
        "Scale your projects faster with experienced developers available on flexible hourly engagement models. No long-term contracts, no risk.",
      checks: [
        "Flexible Hiring",
        "No Long-Term Contracts",
        "Quick Onboarding",
        "Pay Only for Productive Hours",
      ],
      cardStats: [
        { value: "98%", label: "Success Rate" },
        { value: "4.9★", label: "Avg Rating" },
        { value: "24h", label: "Onboarding" },
      ],
      floatStats: [
        { value: "500+", label: "Developers Ready to hire" },
        { value: "200+", label: "Projects Delivered on time" },
      ],
    },
    trust: {
      label: "Trusted by Startups, Agencies & Businesses Worldwide",
      logos: ["Google", "Microsoft", "airbnb", "Uber", "PayPal", "shopify"],
    },
    offer: {
      label: "What We Offer",
      heading: "Hire Developers On Demand",
      sub: "Choose from a wide range of skilled developers and tech specialists.",
      items: [
        "Frontend Developers",
        "Backend Developers",
        "Full Stack Developers",
        "Mobile App Developers",
        "UI/UX Designers",
        "DevOps Engineers",
        "QA / Test Engineers",
        "AI & Automation Developers",
        "Python Developers",
        "Node.js Developers",
      ],
    },
    engagement: {
      label: "Engagement Models",
      heading: "Flexible Hiring Models for Every Need",
      sub: "Choose the engagement model that best fits your project requirements and budget.",
      models: [
        {
          title: "Hourly Hiring",
          desc: "Hire developers based on the exact number of hours you need. Perfect for short-term projects.",
          perks: [
            "Startup MVPs",
            "Bug Fixes",
            "Feature Development",
            "Ongoing Support",
            "Technical Consultation",
          ],
          featured: false,
        },
        {
          title: "Dedicated Developers",
          desc: "Get full-time dedicated resources working exclusively on your project with full transparency.",
          perks: [
            "Faster delivery",
            "Better collaboration",
            "Flexible scaling",
            "Transparent communication",
          ],
          featured: true,
        },
        {
          title: "Project-Based Teams",
          desc: "Build complete teams for web, mobile, SaaS, or enterprise applications end-to-end.",
          perks: [
            "Developers",
            "UI/UX Designers",
            "QA Engineers",
            "Project Coordinators",
          ],
          featured: false,
        },
      ],
    },
    startup: {
      tag: "For Startups",
      heading: "Build Your MVP Faster",
      desc: "We help startups go from idea to product with the right tech talent. Agile, affordable, and reliable.",
      checks: [
        "Build MVPs",
        "Develop SaaS products",
        "Create mobile apps",
        "Maintain existing products",
        "Add new features faster",
      ],
      card: {
        heading: "Launch Ready",
        desc: "From concept to deployment in weeks, not months.",
        stats: [
          { value: "3x", label: "Faster Launch" },
          { value: "60%", label: "Cost Savings" },
          { value: "50+", label: "MVPs Built" },
          { value: "100%", label: "On-Time Rate" },
        ],
      },
    },
    how: {
      label: "How It Works",
      heading: "Simple Process. Powerful Results.",
      sub: "Get started with your development team in just four easy steps.",
      steps: [
        {
          n: "1",
          title: "Share Your Requirement",
          desc: "Tell us your project needs, tech stack, and hiring preferences.",
        },
        {
          n: "2",
          title: "Select Developers",
          desc: "Choose from pre-screened developers that match your requirements.",
        },
        {
          n: "3",
          title: "Start Development",
          desc: "Begin work immediately with flexible engagement and full transparency.",
        },
        {
          n: "4",
          title: "Scale Anytime",
          desc: "Increase or reduce your team size based on your project demands.",
        },
      ],
    },
    why: {
      label: "Why Choose HourlyRecruit",
      heading: "Build Faster. Smarter. Better.",
      cards: [
        { title: "Flexible Hiring", desc: "Hire only when you need and optimize costs. No commitments." },
        {
          title: "Faster Execution",
          desc: "Quick onboarding with ready-to-work experts from day one.",
        },
        {
          title: "Scalable Teams",
          desc: "Scale up or down based on your project needs instantly.",
        },
        {
          title: "Startup Friendly",
          desc: "Affordable solutions designed for early-stage startups.",
        },
        {
          title: "Transparent Comms",
          desc: "Regular updates and clear communication throughout.",
        },
      ],
    },
    cta: {
      label: "Get Started Today",
      heading: "Let's Build Something Great Together",
      sub: "Hire skilled developers on hourly basis and bring your ideas to life. No long-term contracts, no risk.",
    },
    testimonials: [
      {
        initials: "AT",
        name: "Alex Thompson",
        role: "CTO, InnovateX",
        color: "linear-gradient(135deg,#1a56db,#3b82f6)",
        quote:
          "HourlyRecruit helped us quickly onboard frontend and backend developers for our SaaS product. The process was smooth, flexible and highly professional.",
      },
    ],
  },
  about: {
    hero: {
      heading: "Bridging the Gap Between Talent and Opportunity",
      subtext:
        "HourlyRecruit was built to solve the complexity of tech hiring. We connect businesses with pre-vetted developers across every major technology stack.",
    },
    stats: [
      { value: "500+", label: "Expert Developers" },
      { value: "200+", label: "Projects Delivered" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "48h", label: "Average Onboarding" },
    ],
    content: {
      mission:
        "Our mission is to make world-class technical talent accessible to every business — from seed-stage startups to enterprise companies.",
    },
  },
  technologies: {
    hero: {
      heading: "Modern Technologies. Expert Developers.",
      subtext:
        "Our developers bring deep expertise across the full technology spectrum — from modern frontend frameworks to cloud infrastructure and AI.",
    },
  },
  howItWorks: {
    hero: {
      heading: "From Brief to Build in 5 Simple Steps",
      subtext:
        "A streamlined hiring process designed to get your project moving in days, not months. Transparent, efficient, and stress-free.",
    },
    faqs: [
      {
        q: "How quickly can I hire a developer?",
        a: "In most cases, you can have a developer ready to start within 48 hours of sharing your requirements.",
      },
    ],
  },
  contact: {
    heading: "Have a Project in Mind?",
    subtext:
      "Let's discuss how we can help you build and scale your product with the right tech talent.",
    phone: "+91 888 444 6677",
    email: "hr@hourlyrecruit.com",
    location: "Bangalore, India",
    website: "www.hourlyrecruit.com",
  },
  developers: [],
  pricing: [],
  footer: {
    desc: "Hire skilled developers on hourly basis and scale your projects faster without long-term commitments.",
    copyright: "© 2024 HourlyRecruit. All Rights Reserved.",
  },
};

const STORAGE_KEY = "hr_site_data_v2";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache
let cache = null;
let cacheTime = 0;

/**
 * Deep merge utility - merges saved data against defaults
 * Ensures all required keys exist (prevents crashes from schema changes)
 */
function deepMerge(target, source) {
  const result = { ...target };

  Object.keys(source).forEach((key) => {
    if (source[key] !== null && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = result[key] !== undefined ? result[key] : source[key];
    }
  });

  return result;
}

/**
 * Get data with fallback chain:
 * 1. API (fresh from backend)
 * 2. Cache (if within TTL)
 * 3. localStorage (stale data)
 * 4. Defaults (hardcoded fallback)
 */
export async function getData() {
  const now = Date.now();

  // Return cache if valid
  if (cache && now - cacheTime < CACHE_TTL) {
    return cache;
  }

  try {
    // Try fetching from API
    const apiData = await siteDataAPI.getAll();
    if (apiData) {
      // Merge with defaults to ensure all keys exist
      const merged = deepMerge(apiData, DEFAULT_DATA);
      cache = merged;
      cacheTime = now;
      
      // Also save to localStorage as backup
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      } catch (e) {
        console.warn("localStorage save failed:", e);
      }
      
      return merged;
    }
  } catch (error) {
    console.warn("API fetch failed, falling back to localStorage:", error);
  }

  // Fall back to localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      const merged = deepMerge(parsed, DEFAULT_DATA);
      cache = merged;
      cacheTime = now;
      return merged;
    }
  } catch (error) {
    console.warn("localStorage read failed:", error);
  }

  // Final fallback to defaults
  cache = JSON.parse(JSON.stringify(DEFAULT_DATA));
  cacheTime = now;
  return cache;
}

/**
 * Set data - updates both API and localStorage
 */
export async function setData(data) {
  try {
    // Update via API
    await siteDataAPI.updateAll(data);
    
    // Clear cache to force refresh
    cache = null;
    cacheTime = 0;
    
    // Also save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    
    // Dispatch event for UI updates
    window.dispatchEvent(
      new CustomEvent("hr_data_updated", { detail: data })
    );
  } catch (error) {
    console.error("Failed to save data:", error);
    
    // Fallback: save to localStorage only if API fails
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(
        new CustomEvent("hr_data_updated", { detail: data })
      );
    } catch (storageError) {
      console.error("All save methods failed:", storageError);
      throw error;
    }
  }
}

/**
 * Reset to defaults
 */
export async function resetData() {
  try {
    // Reset via API
    await siteDataAPI.reset();
    cache = null;
    cacheTime = 0;
  } catch (error) {
    console.warn("API reset failed, using local reset:", error);
  }

  // Local reset
  localStorage.removeItem(STORAGE_KEY);
  const defaultsCopy = JSON.parse(JSON.stringify(DEFAULT_DATA));
  window.dispatchEvent(
    new CustomEvent("hr_data_updated", { detail: defaultsCopy })
  );
  return defaultsCopy;
}

/**
 * Clear cache to force fresh API fetch
 */
export function invalidateCache() {
  cache = null;
  cacheTime = 0;
}

export default {
  getData,
  setData,
  resetData,
  invalidateCache,
  DEFAULT_DATA,
};