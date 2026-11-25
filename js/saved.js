/**
 * KhelGaon - Saved / Bookmarked Opportunities Module
 * File: js/saved.js
 *
 * Purpose:
 * Allows students, parents, and coaches to save ("bookmark") opportunities
 * into browser localStorage so they stay available after page refresh and offline.
 */

const SAVED_STORAGE_KEY = "khelgaon_saved_trials";

/**
 * Reads the array of saved opportunity IDs from localStorage.
 */
function getSavedOpportunityIds() {
  const raw = localStorage.getItem(SAVED_STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading saved items:", err);
    return [];
  }
}

/**
 * Returns true if the given opportunity ID is currently saved.
 */
function isOpportunitySaved(id) {
  const savedIds = getSavedOpportunityIds();
  return savedIds.includes(id);
}

/**
 * Updates the count badge shown on the "Saved Items" tab if present.
 */
function updateSavedTabCount() {
  const badge = document.getElementById("saved-count-badge");
  if (!badge) return;
  const savedIds = getSavedOpportunityIds();
  badge.textContent = String(savedIds.length);
}

/**
 * Adds or removes an opportunity ID in localStorage.
 * Returns true if the item is now saved, or false if removed.
 */
function toggleSaveOpportunity(id) {
  let savedIds = getSavedOpportunityIds();
  let isNowSaved = false;

  if (savedIds.includes(id)) {
    savedIds = savedIds.filter((itemId) => itemId !== id);
    isNowSaved = false;
  } else {
    savedIds.push(id);
    isNowSaved = true;
  }

  localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(savedIds));
  updateSavedTabCount();

  window.dispatchEvent(new CustomEvent("savedOpportunitiesChanged", {
    detail: { id: id, isSaved: isNowSaved }
  }));

  return isNowSaved;
}

/**
 * Filters the full opportunities list down to only saved items.
 */
function getSavedOpportunitiesList(allList) {
  const savedIds = getSavedOpportunityIds();
  return allList.filter((item) => savedIds.includes(item.id));
}

// Keep the Saved tab count badge accurate on page load
document.addEventListener("DOMContentLoaded", updateSavedTabCount);
