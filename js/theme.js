/**
 * KhelGaon - Theme Management Module (Light & Dark Mode)
 * File: js/theme.js
 *
 * Purpose:
 * Provides an accessible Light / Dark mode toggle and saves the user's
 * preference in localStorage. Updates button text in English or Hindi.
 */

/**
 * Reads saved theme from localStorage or falls back to system preference.
 */
function getInitialTheme() {
  const savedTheme = localStorage.getItem("khelgaon_theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

/**
 * Updates the theme toggle button label and accessible aria-label.
 */
function updateThemeButtonUI() {
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (!themeBtn) return;

  const isDark = document.documentElement.classList.contains("dark");
  const isHindi = (typeof currentLang !== "undefined" && currentLang === "hi");

  if (isDark) {
    themeBtn.textContent = isHindi ? "☀️ लाइट" : "☀️ Light";
    themeBtn.setAttribute("aria-label", isHindi ? "लाइट मोड चालू करें" : "Switch to light mode");
  } else {
    themeBtn.textContent = isHindi ? "🌙 डार्क" : "🌙 Dark";
    themeBtn.setAttribute("aria-label", isHindi ? "डार्क मोड चालू करें" : "Switch to dark mode");
  }
}

/**
 * Applies the selected theme ("light" or "dark") to the document root.
 */
function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("khelgaon_theme", theme);
  updateThemeButtonUI();
}

/**
 * Switches between light and dark themes when the toggle button is clicked.
 */
function toggleTheme() {
  const isCurrentlyDark = document.documentElement.classList.contains("dark");
  applyTheme(isCurrentlyDark ? "light" : "dark");
}

// Apply initial theme immediately to avoid flash of wrong colors
applyTheme(getInitialTheme());

// Attach click handler and update button label when DOM loads or language changes
document.addEventListener("DOMContentLoaded", () => {
  updateThemeButtonUI();
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }
});

window.addEventListener("languageChanged", updateThemeButtonUI);
