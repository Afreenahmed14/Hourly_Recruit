// ── api/api.js ────────────────────────────────────────────────────────────────
// Central API service layer for HourlyRecruit.
// All calls go through here. Falls back gracefully when backend isn't reachable.
// Base URL is read from the env var VITE_API_URL (defaults to localhost:8080).

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// ── Token helpers ─────────────────────────────────────────────────────────────

export function getAccessToken() {
  return sessionStorage.getItem("hr_access_token");
}

export function setTokens(accessToken, refreshToken) {
  sessionStorage.setItem("hr_access_token", accessToken);
  if (refreshToken) sessionStorage.setItem("hr_refresh_token", refreshToken);
}

export function clearTokens() {
  sessionStorage.removeItem("hr_access_token");
  sessionStorage.removeItem("hr_refresh_token");
  sessionStorage.removeItem("hr_admin_auth");
}

function authHeaders() {
  const token = getAccessToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

// ── Core fetch wrapper ────────────────────────────────────────────────────────

async function request(method, path, body, useAuth = false) {
  const headers = useAuth ? authHeaders() : { "Content-Type": "application/json" };
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  // 204 No Content
  if (res.status === 204) return null;
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────────────────────

/**
 * Login with email + password (used by AdminLogin).
 * Returns { accessToken, refreshToken, message }.
 */
export async function login(email, password) {
  const data = await request("POST", "/auth/login", { email, password });
  setTokens(data.accessToken, data.refreshToken);
  sessionStorage.setItem("hr_admin_auth", "1");
  return data;
}

/**
 * Register a new HR admin account.
 */
export async function registerHR(email, password) {
  const data = await request("POST", "/auth/register/hr", { email, password });
  setTokens(data.accessToken, data.refreshToken);
  sessionStorage.setItem("hr_admin_auth", "1");
  return data;
}

/**
 * Refresh the access token using the stored refresh token.
 */
export async function refreshAccessToken() {
  const refreshToken = sessionStorage.getItem("hr_refresh_token");
  if (!refreshToken) throw new Error("No refresh token");
  const data = await request("POST", "/auth/refresh", { refreshToken });
  setTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

/**
 * Send OTP to email for passwordless login.
 */
export async function sendOtp(email) {
  return request("POST", "/auth/send-otp", { email });
}

/**
 * Verify OTP and get tokens.
 */
export async function verifyOtp(email, otp) {
  const data = await request("POST", "/auth/verify-otp", { email, otp });
  setTokens(data.accessToken, data.refreshToken);
  sessionStorage.setItem("hr_admin_auth", "1");
  return data;
}

// ── Public: Site Settings ─────────────────────────────────────────────────────

/**
 * Fetch public site settings (company name, logo, favicon).
 * Returns null on failure so callers can fall back to defaults.
 */
export async function fetchSiteSettings() {
  try {
    return await request("GET", "/public/site-settings");
  } catch {
    return null;
  }
}

// ── Admin: Site Settings ──────────────────────────────────────────────────────

export async function adminGetSiteSettings() {
  return request("GET", "/admin/site-settings", null, true);
}

export async function adminCreateSiteSettings(payload) {
  return request("POST", "/admin/site-settings", payload, true);
}

export async function adminUpdateSiteSettings(id, payload) {
  return request("PUT", `/admin/site-settings/${id}`, payload, true);
}

export async function adminDeleteSiteSettings(id) {
  return request("DELETE", `/admin/site-settings/${id}`, null, true);
}

// ── Contact Form (public submit) ──────────────────────────────────────────────
// The ContactMessage entity maps to a /public/contact endpoint.
// If the backend controller isn't live yet, this throws and the caller can
// show a local success message (the current behaviour).

export async function submitContactMessage(form) {
  // Map frontend form fields → backend ContactMessage fields
  const payload = {
    fullName: form.name,
    email: form.email,
    phoneNumber: form.phone,
    companyName: form.company,
    lookingFor: mapLookingFor(form.role),
    budgetRange: mapBudgetRange(form.budget),
    projectDescription: form.message,
  };
  return request("POST", "/public/contact", payload);
}

function mapLookingFor(role) {
  const map = {
    "Frontend Developer": "FRONTEND",
    "Backend Developer": "BACKEND",
    "Full Stack Developer": "FULLSTACK",
    "Mobile Developer": "MOBILE",
    "DevOps Engineer": "DEVOPS",
    "UI/UX Designer": "UI_UX",
    "QA Engineer": "QA",
    "Complete Project Team": "COMPLETE_PROJECT_TEAM",
  };
  return map[role] || null;
}

function mapBudgetRange(budget) {
  if (!budget) return null;
  if (budget.includes("Under")) return "BELOW_1000";
  if (budget.includes("1,000 –")) return "BETWEEN_1000_5000";
  if (budget.includes("3,000 –")) return "BETWEEN_1000_5000";
  if (budget.includes("6,000 –")) return "BETWEEN_5000_10000";
  if (budget.includes("12,000+")) return "ABOVE_10000";
  return null;
}

// ── Developers (public listing) ───────────────────────────────────────────────
// These endpoints will exist once a DeveloperController is added.
// Returns null on failure so the caller falls back to Datastore defaults.

export async function fetchDevelopers(category) {
  try {
    const path = category && category !== "All"
      ? `/public/developers?category=${category.toUpperCase()}`
      : "/public/developers";
    return await request("GET", path);
  } catch {
    return null;
  }
}

// ── Admin: Developers ─────────────────────────────────────────────────────────

export async function adminGetDevelopers() {
  return request("GET", "/admin/developers", null, true);
}

export async function adminCreateDeveloper(payload) {
  return request("POST", "/admin/developers", payload, true);
}

export async function adminUpdateDeveloper(id, payload) {
  return request("PUT", `/admin/developers/${id}`, payload, true);
}

export async function adminDeleteDeveloper(id) {
  return request("DELETE", `/admin/developers/${id}`, null, true);
}

export async function adminHireDeveloper(id) {
  return request("PUT", `/admin/developers/${id}/hire`, null, true);
}

// ── Admin: Testimonials ───────────────────────────────────────────────────────

export async function adminGetTestimonials() {
  return request("GET", "/admin/testimonials", null, true);
}

export async function adminCreateTestimonial(payload) {
  return request("POST", "/admin/testimonials", payload, true);
}

export async function adminUpdateTestimonial(id, payload) {
  return request("PUT", `/admin/testimonials/${id}`, payload, true);
}

export async function adminDeleteTestimonial(id) {
  return request("DELETE", `/admin/testimonials/${id}`, null, true);
}

// ── Admin: FAQs ───────────────────────────────────────────────────────────────

export async function adminGetFAQs() {
  return request("GET", "/admin/faqs", null, true);
}

export async function adminCreateFAQ(payload) {
  return request("POST", "/admin/faqs", payload, true);
}

export async function adminUpdateFAQ(id, payload) {
  return request("PUT", `/admin/faqs/${id}`, payload, true);
}

export async function adminDeleteFAQ(id) {
  return request("DELETE", `/admin/faqs/${id}`, null, true);
}

// ── Admin: Pricing ────────────────────────────────────────────────────────────

export async function adminGetPricing(sectionId) {
  return request("GET", `/admin/pricing/${sectionId}`, null, true);
}

export async function adminUpdatePricingPlan(id, payload) {
  return request("PUT", `/admin/pricing/plans/${id}`, payload, true);
}

// ── Admin: Footer ─────────────────────────────────────────────────────────────

export async function adminGetFooter() {
  return request("GET", "/admin/footer", null, true);
}

export async function adminUpdateFooter(id, payload) {
  return request("PUT", `/admin/footer/${id}`, payload, true);
}

// ── Admin: Contact Info ───────────────────────────────────────────────────────

export async function adminGetContactInfo() {
  return request("GET", "/admin/contact-info", null, true);
}

export async function adminUpdateContactInfo(id, payload) {
  return request("PUT", `/admin/contact-info/${id}`, payload, true);
}

// ── Admin: Hero Section ───────────────────────────────────────────────────────

export async function adminGetHeroSection() {
  return request("GET", "/admin/about/hero", null, true);
}

export async function adminUpdateHeroSection(id, payload) {
  return request("PUT", `/admin/about/hero/${id}`, payload, true);
}

// ── Token refresh interceptor ─────────────────────────────────────────────────
// Wrap any admin call so if 401 is returned, we auto-refresh and retry once.

export async function withTokenRefresh(apiCall) {
  try {
    return await apiCall();
  } catch (err) {
    if (err.message && err.message.includes("401")) {
      try {
        await refreshAccessToken();
        return await apiCall();
      } catch {
        clearTokens();
        throw new Error("Session expired. Please log in again.");
      }
    }
    throw err;
  }
}