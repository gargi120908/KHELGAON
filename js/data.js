/**
 * KhelGaon - Data Loading, Caching & Safe Text Module
 * File: js/data.js
 *
 * Purpose:
 * Loads opportunities from data/opportunities.json using fetch(),
 * merges teacher/coach submissions saved in localStorage, and caches
 * the full list in localStorage so it works offline after the first visit.
 */

// Global in-memory list of all loaded opportunities
let allOpportunities = [];

/**
 * Escapes special HTML characters so user-entered text from localStorage
 * cannot inject unwanted HTML or scripts into cards or detail views.
 */
function escapeHTML(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Reads coach/teacher submitted opportunities from localStorage safely.
 */
function getCustomOpportunities() {
  const savedCustom = localStorage.getItem("khelgaon_custom_opportunities");
  if (!savedCustom) return [];
  try {
    const parsed = JSON.parse(savedCustom);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading custom opportunities:", err);
    return [];
  }
}

/**
 * Fetches official opportunities from JSON and merges localStorage submissions.
 * Falls back to cached data if the user is currently offline.
 */
async function loadOpportunities() {
  try {
    const response = await fetch("data/opportunities.json");
    if (!response.ok) {
      throw new Error("HTTP error " + response.status);
    }
    const officialData = await response.json();
    const customList = getCustomOpportunities();

    // Put teacher/coach submissions at the start alongside official entries
    allOpportunities = [...customList, ...officialData];

    // Save backup copy in localStorage for offline access
    try {
      localStorage.setItem("khelgaon_cached_opportunities", JSON.stringify(allOpportunities));
    } catch (e) {
      // Ignore storage quota errors on very low-storage devices
    }

    return allOpportunities;
  } catch (error) {
    console.warn("Could not fetch opportunities.json (using offline cache):", error);

    const cachedData = localStorage.getItem("khelgaon_cached_opportunities");
    if (cachedData) {
      try {
        allOpportunities = JSON.parse(cachedData);
        return allOpportunities;
      } catch (err) {
        console.error("Failed to parse cached opportunities:", err);
      }
    }

    return getCustomOpportunities();
  }
}

/**
 * Finds and returns a single opportunity object by its ID.
 */
function getOpportunityById(id) {
  if (!allOpportunities || allOpportunities.length === 0) {
    const cached = localStorage.getItem("khelgaon_cached_opportunities");
    if (cached) {
      try {
        allOpportunities = JSON.parse(cached);
      } catch (e) {
        allOpportunities = [];
      }
    }
  }
  return allOpportunities.find((item) => item.id === id) || null;
}

/**
 * Validates that a URL uses a safe http:// or https:// protocol.
 */
function getSafeOfficialLink(url) {
  if (!url) return "https://sportsauthorityofindia.nic.in";
  const trimmed = String(url).trim();
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  return "https://sportsauthorityofindia.nic.in";
}

/**
 * Saves a teacher/coach submitted opportunity to localStorage and updates
 * the cached list right away so it shows up immediately.
 */
function saveCustomOpportunity(newOpp) {
  const customList = getCustomOpportunities();
  customList.unshift(newOpp);
  localStorage.setItem("khelgaon_custom_opportunities", JSON.stringify(customList));

  // Update in-memory list and offline cache immediately
  allOpportunities = [newOpp, ...allOpportunities];
  try {
    localStorage.setItem("khelgaon_cached_opportunities", JSON.stringify(allOpportunities));
  } catch (e) {
    // Ignore storage quota errors
  }
}
