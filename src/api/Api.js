/**
 * ─────────────────────────────────────────────────────────────────────────────
 * API.js — Centralized API communication layer
 * Handles all HTTP requests, token management, and error handling
 * ─────────────────────────────────────────────────────────────────────────────
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const API_TIMEOUT = 30000; // 30 seconds

// Token management
export function getToken() {
  return localStorage.getItem("hr_auth_token");
}

export function setToken(token) {
  localStorage.setItem("hr_auth_token", token);
}

export function clearToken() {
  localStorage.removeItem("hr_auth_token");
}

// Default headers builder
function getHeaders(includeAuth = true, isFormData = false) {
  const headers = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

// Generic fetch wrapper with timeout, error handling, and auto-refresh
async function apiCall(endpoint, options = {}) {
  const {
    method = "GET",
    body = null,
    includeAuth = true,
    isFormData = false,
    timeout = API_TIMEOUT,
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;
  const headers = getHeaders(includeAuth, isFormData);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const config = {
      method,
      headers,
      signal: controller.signal,
    };

    if (body) {
      if (isFormData) {
        config.body = body; // FormData is already encoded
        delete config.headers["Content-Type"]; // Let browser set it
      } else {
        config.body = JSON.stringify(body);
      }
    }

    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    // Handle 401 Unauthorized — token might be expired
    if (response.status === 401) {
      clearToken();
      window.dispatchEvent(new CustomEvent("auth_expired"));
      throw new Error("Session expired. Please login again.");
    }

    // Parse response
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || data?.error || `HTTP ${response.status}`,
        data,
      };
    }

    return data;
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle abort (timeout)
    if (error.name === "AbortError") {
      throw new Error("Request timeout. Please try again.");
    }

    throw error;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTHENTICATION API
// ─────────────────────────────────────────────────────────────────────────────

export const authAPI = {
  login: (username, password) =>
    apiCall("/auth/login", {
      method: "POST",
      body: { username, password },
      includeAuth: false,
    }),

  logout: () =>
    apiCall("/auth/logout", { method: "POST", includeAuth: true }),

  verifyToken: () =>
    apiCall("/auth/verify", { method: "GET", includeAuth: true }),
};

// ─────────────────────────────────────────────────────────────────────────────
// SITE DATA API — CMS Content (Mapped to your backend endpoints)
// ─────────────────────────────────────────────────────────────────────────────
// Backend routes used here:
//  - GET  /public/about/*
//  - GET  /public/site-settings
//  - Admin writes are split across /admin/about/* and /admin/site-settings/*
//
// Note: Your current UI/local data model expects a single "getAll" object.
// This wrapper fetches the relevant public endpoints and combines them.

export const siteDataAPI = {
  // Combined fetch for the landing page
  getAll: async () => {
    const [
      heroRes,
      companiesRes,
      whatWeOfferRes,
      industriesRes,
      techRes,
      startupRes,
      whyChooseRes,
      testimonialsRes,
      getStartedRes,
      settingsRes,
    ] = await Promise.all([
      apiCall("/public/about/hero", { method: "GET", includeAuth: false }),
      apiCall("/public/about/companies", { method: "GET", includeAuth: false }),
      apiCall("/public/about/what-we-offer", { method: "GET", includeAuth: false }),
      apiCall("/public/about/industries", { method: "GET", includeAuth: false }),
      apiCall("/public/about/technologies", { method: "GET", includeAuth: false }),
      apiCall("/public/about/startup", { method: "GET", includeAuth: false }),
      apiCall("/public/about/why-choose-us", { method: "GET", includeAuth: false }),
      apiCall("/public/about/testimonials", { method: "GET", includeAuth: false }),
      apiCall("/public/about/get-started", { method: "GET", includeAuth: false }),
      apiCall("/public/site-settings", { method: "GET", includeAuth: false }),
    ]);

    return {
      // home-ish
      hero: heroRes?.heroSection ?? null,
      dashboardCard: heroRes?.dashboardCard ?? null,
      totalDevelopers: heroRes?.totalDevelopers ?? null,

      companies: companiesRes ?? [],
      whatWeOffer: whatWeOfferRes ?? null,
      industries: industriesRes ?? null,

      technologies: techRes ?? null,
      startup: startupRes ?? null,
      whyChoose: whyChooseRes ?? null,
      testimonials: testimonialsRes ?? null,
      getStarted: getStartedRes ?? null,

      // settings
      siteSettings: settingsRes ?? null,

      // keep compatibility for your existing Datastore deepMerge usage
      _raw: {
        heroRes,
        companiesRes,
        whatWeOfferRes,
        industriesRes,
        techRes,
        startupRes,
        whyChooseRes,
        testimonialsRes,
        getStartedRes,
        settingsRes,
      },
    };
  },

  // Simple section fetch (optional). For now, we route known sections.
  getSection: (section) => {
    switch (section) {
      case "hero":
        return apiCall("/public/about/hero", { method: "GET", includeAuth: false });
      case "companies":
        return apiCall("/public/about/companies", { method: "GET", includeAuth: false });
      case "what-we-offer":
      case "offer":
        return apiCall("/public/about/what-we-offer", { method: "GET", includeAuth: false });
      case "industries":
        return apiCall("/public/about/industries", { method: "GET", includeAuth: false });
      case "technologies":
        return apiCall("/public/about/technologies", { method: "GET", includeAuth: false });
      case "startup":
        return apiCall("/public/about/startup", { method: "GET", includeAuth: false });
      case "why-choose-us":
      case "why":
        return apiCall("/public/about/why-choose-us", { method: "GET", includeAuth: false });
      case "testimonials":
        return apiCall("/public/about/testimonials", { method: "GET", includeAuth: false });
      case "get-started":
        return apiCall("/public/about/get-started", { method: "GET", includeAuth: false });
      case "site-settings":
        return apiCall("/public/site-settings", { method: "GET", includeAuth: false });
      default:
        // fallback to combined fetch
        return siteDataAPI.getAll();
    }
  },

  // Admin writes are not a single endpoint in your backend.
  // Keep these as explicit errors so we don't silently call wrong routes.
  updateAll: async () => {
    throw new Error(
      "updateAll is not supported by backend as a single endpoint. Update individual resources via /admin/about/* and /admin/site-settings/*."
    );
  },

  updateSection: async () => {
    throw new Error(
      "updateSection is not supported by backend as a generic endpoint. Update specific resources via the admin controllers."
    );
  },

  reset: async () => {
    throw new Error("reset is not available (no /site-data/reset endpoint in backend).");
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// DEVELOPERS API
// ─────────────────────────────────────────────────────────────────────────────

export const developersAPI = {
  // Get all developers with optional filtering
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.search) params.append("search", filters.search);
    const query = params.toString();
    return apiCall(`/developers${query ? "?" + query : ""}`, {
      method: "GET",
      includeAuth: false,
    });
  },

  // Get single developer by ID
  getById: (id) =>
    apiCall(`/developers/${id}`, { method: "GET", includeAuth: false }),

  // Create new developer (admin only)
  create: (data) =>
    apiCall("/developers", { method: "POST", body: data, includeAuth: true }),

  // Update developer (admin only)
  update: (id, data) =>
    apiCall(`/developers/${id}`, {
      method: "PUT",
      body: data,
      includeAuth: true,
    }),

  // Delete developer (admin only)
  delete: (id) =>
    apiCall(`/developers/${id}`, { method: "DELETE", includeAuth: true }),

  // Bulk update developers
  bulkUpdate: (data) =>
    apiCall("/developers/bulk", {
      method: "PUT",
      body: data,
      includeAuth: true,
    }),
};

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT FORM API
// ─────────────────────────────────────────────────────────────────────────────

export const contactAPI = {
  // Submit contact form
  submit: (data) =>
    apiCall("/contact", { method: "POST", body: data, includeAuth: false }),

  // Get all submissions (admin only)
  getAll: (page = 1, limit = 20) =>
    apiCall(`/contact?page=${page}&limit=${limit}`, {
      method: "GET",
      includeAuth: true,
    }),

  // Get single submission
  getById: (id) =>
    apiCall(`/contact/${id}`, { method: "GET", includeAuth: true }),

  // Mark as read
  markAsRead: (id) =>
    apiCall(`/contact/${id}/read`, {
      method: "PATCH",
      includeAuth: true,
    }),

  // Delete submission
  delete: (id) =>
    apiCall(`/contact/${id}`, { method: "DELETE", includeAuth: true }),
};

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS API
// ─────────────────────────────────────────────────────────────────────────────

export const testimonialsAPI = {
  // Get all testimonials
  getAll: () =>
    apiCall("/testimonials", { method: "GET", includeAuth: false }),

  // Get by ID
  getById: (id) =>
    apiCall(`/testimonials/${id}`, { method: "GET", includeAuth: false }),

  // Create testimonial (admin only)
  create: (data) =>
    apiCall("/testimonials", { method: "POST", body: data, includeAuth: true }),

  // Update testimonial (admin only)
  update: (id, data) =>
    apiCall(`/testimonials/${id}`, {
      method: "PUT",
      body: data,
      includeAuth: true,
    }),

  // Delete testimonial (admin only)
  delete: (id) =>
    apiCall(`/testimonials/${id}`, { method: "DELETE", includeAuth: true }),
};

// ─────────────────────────────────────────────────────────────────────────────
// PRICING API
// ─────────────────────────────────────────────────────────────────────────────

export const pricingAPI = {
  // Get all pricing plans
  getAll: () =>
    apiCall("/pricing", { method: "GET", includeAuth: false }),

  // Create plan (admin only)
  create: (data) =>
    apiCall("/pricing", { method: "POST", body: data, includeAuth: true }),

  // Update plan (admin only)
  update: (id, data) =>
    apiCall(`/pricing/${id}`, {
      method: "PUT",
      body: data,
      includeAuth: true,
    }),

  // Delete plan (admin only)
  delete: (id) =>
    apiCall(`/pricing/${id}`, { method: "DELETE", includeAuth: true }),
};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN STATS API
// ─────────────────────────────────────────────────────────────────────────────

export const adminStatsAPI = {
  // Get dashboard stats
  getStats: () =>
    apiCall("/admin/stats", { method: "GET", includeAuth: true }),

  // Get analytics
  getAnalytics: (period = "month") =>
    apiCall(`/admin/analytics?period=${period}`, {
      method: "GET",
      includeAuth: true,
    }),
};

// ─────────────────────────────────────────────────────────────────────────────
// FILE UPLOAD API
// ─────────────────────────────────────────────────────────────────────────────

export const uploadAPI = {
  // Upload image or file
  uploadFile: (file, folder = "general") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    return apiCall("/upload", {
      method: "POST",
      body: formData,
      includeAuth: true,
      isFormData: true,
    });
  },

  // Delete uploaded file
  deleteFile: (fileId) =>
    apiCall(`/upload/${fileId}`, { method: "DELETE", includeAuth: true }),
};

export default {
  authAPI,
  siteDataAPI,
  developersAPI,
  contactAPI,
  testimonialsAPI,
  pricingAPI,
  adminStatsAPI,
  uploadAPI,
  getToken,
  setToken,
  clearToken,
};