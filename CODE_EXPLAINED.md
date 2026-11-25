# KhelGaon Code Explained (Viva & Presentation Guide)

This guide explains **every JavaScript file and the Service Worker** in plain, beginner-friendly English so you can explain how any line works during your FoCP (CSE-1003) course evaluation.

---

## Script Loading Order in Every HTML Page

At the bottom of each HTML page, scripts load in this exact order:

```html
<script src="js/identity.js"></script>
<script src="js/theme.js"></script>
<script src="js/i18n.js"></script>
<script src="js/data.js"></script>
<script src="js/saved.js"></script>
<script src="js/filters.js"></script>
<script src="js/main.js"></script>
```

Why does order matter? Because later scripts call functions defined in earlier scripts. For example, `filters.js` calls `escapeHTML()` from `data.js`, `isOpportunitySaved()` from `saved.js`, and `t()` from `i18n.js`.

---

## 1. `js/identity.js` — Mandatory Student Identity Component

**Goal:** Show `Name: GARGI SANJAY PUSNAKE | Scholar Number: 26U020109 | FoCP (CSE-1003)` at the top of every page without scrolling or logging in.

- **`renderIdentityHeader()`:**
  1. Checks if `<div id="mandatory-identity-banner">` already exists. If not, it creates a `<div>` with `document.createElement("div")`, puts the exact mandatory text inside it, and inserts it as the very first element inside `<body>` using `document.body.insertBefore(...)`.
  2. Checks if `<div id="home-identity-container">` exists (this element only exists on `index.html`). If found, it renders the larger **Course Project Showcase** card right at the top of the Home page.
- **Event Listeners:** Runs on `DOMContentLoaded`, and runs again on `"languageChanged"` so the spotlight card labels switch between English and Hindi while keeping the mandatory identity line unchanged.

---

## 2. `js/theme.js` — Light and Dark Mode

**Goal:** Let users switch between Light and Dark mode and remember their choice.

- **`getInitialTheme()`:** Checks `localStorage.getItem("khelgaon_theme")`. If nothing was saved yet, it checks the user's phone/OS setting via `window.matchMedia("(prefers-color-scheme: dark)")`.
- **`applyTheme(theme)`:** Adds or removes the `"dark"` CSS class on `<html>` (`document.documentElement`). In `css/style.css`, `html.dark { ... }` overrides color variables automatically. It also saves the choice to `localStorage`.
- **`updateThemeButtonUI()`:** Updates the header button text (`🌙 Dark` / `☀️ Light`, or Hindi `🌙 डार्क` / `☀️ लाइट`).
- **`toggleTheme()`:** Checks whether `html` currently has `"dark"` and switches to the opposite theme.

> **Viva tip:** Why do we call `applyTheme(getInitialTheme())` immediately outside `DOMContentLoaded`? So the `"dark"` class is added before the browser paints the page, avoiding a bright white flash!

---

## 3. `js/i18n.js` — English & Hindi Translations

**Goal:** Switch the entire website between English (`"en"`) and Hindi (`"hi"`) using a single `translations` object.

- **`translations` object:** Has two keys: `en` and `hi`. Both hold the exact same key names (like `"nav.home"`, `"home.mission"`, `"filter.sportLabel"`).
- **`currentLang`:** Loaded from `localStorage.getItem("khelgaon_lang")`, defaulting to `"en"`.
- **`t(key)`:** Looks up `translations[currentLang][key]`. If a key is missing in Hindi, it safely falls back to English.
- **`translateDynamicValue(prefix, rawValue)`:** Used for values coming from JSON (like `"Cricket"`, `"Trial"`, `"Boys"`, `"All India"`, or `"Check official website for current dates"`).
- **`applyTranslations(lang)`:**
  1. Saves `currentLang` to `localStorage` and updates `<html lang="...">`.
  2. Finds every element with `data-i18n="..."` and sets its `textContent = t(key)`.
  3. Finds every input/textarea with `data-i18n-placeholder="..."` and updates its `placeholder`.
  4. Fires a custom event `"languageChanged"` on `window` so dynamic parts (like opportunity cards or the detail view) redraw themselves in the new language.
- **`toggleLanguage()`:** Flips `"en"` <-> `"hi"` and calls `applyTranslations()`.

---

## 4. `js/data.js` — Fetching JSON, Caching & Safety

**Goal:** Load the 20 programmes from `data/opportunities.json`, merge any trials submitted by teachers, keep an offline copy, and prevent unsafe HTML injection.

- **`allOpportunities`:** A global array holding all currently available opportunities.
- **`escapeHTML(value)`:** Replaces `&`, `<`, `>`, `"`, and `'` with safe HTML entities (`&amp;`, `&lt;`, etc.). This prevents XSS (broken layout or unwanted scripts) if someone types `<` or `"` into the Share form.
- **`getCustomOpportunities()`:** Reads `"khelgaon_custom_opportunities"` from `localStorage` and parses the JSON array safely inside a `try / catch` block.
- **`loadOpportunities()`:**
  - Uses `async / await` and `fetch("data/opportunities.json")` to download the JSON list.
  - Combines `[...customList, ...officialData]` using the spread operator so coach submissions appear alongside official schemes.
  - Saves the combined array to `localStorage` under `"khelgaon_cached_opportunities"`.
  - If `fetch()` fails (for example, when offline), the `catch` block reads `"khelgaon_cached_opportunities"` from `localStorage`.
- **`getOpportunityById(id)`:** Searches `allOpportunities` using `.find(item => item.id === id)` for `detail.html`.
- **`getSafeOfficialLink(url)`:** Ensures external links only use `http://` or `https://` (blocking `javascript:` URLs).
- **`saveCustomOpportunity(newOpp)`:** Saves a newly submitted trial to `"khelgaon_custom_opportunities"`, puts it at the front of `allOpportunities`, and updates `"khelgaon_cached_opportunities"` right away.

---

## 5. `js/saved.js` — Saving / Bookmarking Trials

**Goal:** Remember which opportunities a student bookmarked using `localStorage`.

- **`SAVED_STORAGE_KEY`:** `"khelgaon_saved_trials"` stores an array of IDs, like `["opp-01", "opp-06"]`.
- **`getSavedOpportunityIds()`:** Parses the JSON array from `localStorage` (returns `[]` if empty).
- **`isOpportunitySaved(id)`:** Uses `.includes(id)` to return `true` or `false`.
- **`updateSavedTabCount()`:** Updates the `<span id="saved-count-badge">` number on the Saved Items tab.
- **`toggleSaveOpportunity(id)`:** If `id` is already saved, removes it with `.filter()`; otherwise adds it with `.push()`. Saves back to `localStorage` and updates the tab count.
- **`getSavedOpportunitiesList(allList)`:** Returns only the opportunity objects whose `id` is inside `getSavedOpportunityIds()`.

---

## 6. `js/filters.js` — Filtering, Sorting & Rendering Cards

**Goal:** Filter the opportunities list step-by-step when the user types or changes any dropdown, and turn each object into an HTML card.

- **`activeFilterState`:** An object storing the current value of all 8 controls (`keyword`, `sport`, `state`, `gender`, `type`, `age`, `district`, `sortBy`) plus `viewTab` (`"all"` or `"saved"`).
- **`matchesAgeFilter(item, ageValue)`:**
  - If an age group like `"10-13"` is chosen, it splits `"10-13"` into `groupMin = 10` and `groupMax = 13` and checks if the opportunity's `[minAge, maxAge]` range overlaps (`item.maxAge >= groupMin && item.minAge <= groupMax`).
  - If a single age like `"16"` is chosen, it checks `userAge >= item.minAge && userAge <= item.maxAge`.
- **`filterOpportunitiesList(sourceList, state)`:** Applies filters one after another using plain `.filter()` calls:
  1. Choose base list: full list or Saved items.
  2. Keyword filter (`title`, `titleHi`, `sport`, `organization`, `state`, `district`).
  3. Sport filter (exact sport match).
  4. State filter (matches the chosen state **or** `"All India"` schemes, since rural students in any state can join national schemes).
  5. Gender filter (`"All"` matches everyone; otherwise must match `"Boys"` or `"Girls"`).
  6. Type filter (`Trial`, `Scholarship`, `Camp`, `Scheme`).
  7. Age / Age Group filter via `matchesAgeFilter()`.
  8. District / Village text filter (searches `district`, `state`, `organization`).
  9. Sorting via `.sort()`: `"closing"` moves `closingSoon: true` cards to the top; `"age"` sorts lowest `minAge` first.
- **`createOpportunityCardHTML(opp)`:** Builds a single `<article class="opp-card">` string, escaping text with `escapeHTML()` and always showing the `"Verify on the official site before applying"` notice.
- **`renderOpportunityCards(list)`:** Updates `#results-count-display`. If `list.length === 0`, clears the grid and shows the friendly `#empty-state` box; otherwise renders every card.
- **`initFilterControls()`:** Connects `input` / `change` / `click` listeners to every filter, reads `?sport=...` or `?q=...` from `window.location.search`, and sets up the All vs Saved tabs.

---

## 7. `js/main.js` — Page Controller & Forms

**Goal:** Start the app on every page and run the right code for whichever HTML page is open.

- **`DOMContentLoaded` listener:**
  1. Calls `registerServiceWorker()` to register `sw.js`.
  2. Calls `setupMobileNav()` to open/close the mobile menu (`#site-nav`) and close it on `Escape`.
  3. Waits for `await loadOpportunities()`.
  4. Reads `document.body.getAttribute("data-page")` (`"home"`, `"opportunities"`, `"detail"`, `"eligibility"`, `"resources"`, `"submit"`, or `"about"`) and runs that page's `init...()` function.
- **`initHomePage()`:** Captures `#hero-search-form` submit and navigates to `opportunities.html?q=...`.
- **`initDetailPage()`:** Reads `?id=...` from the URL, finds the opportunity via `getOpportunityById(oppId)`, renders full eligibility/documents/steps/official link, wires the Save button, creates a `https://wa.me/?text=...` WhatsApp share link, and copies the page link with `navigator.clipboard.writeText()` (plus `fallbackCopyText()` for older browsers).
- **`initEligibilityPage()`:** Reads the 4 dropdown values (`el-age`, `el-gender`, `el-state`, `el-sport`), checks that age is selected, filters `allOpportunities`, and displays matching cards immediately below the form.
- **`initSubmitPage()`:** Validates every required field, checks `minAge <= maxAge` and valid `http://` or `https://` URLs, shows inline red errors via `setFieldError()` (no intrusive browser `alert()`), creates a new object with `id: "opp-custom-" + Date.now()`, saves it via `saveCustomOpportunity()`, and reveals the thank-you box.
- **`initResourcesPage()`:** Attaches `window.print()` to the `"Print Checklist (PDF)"` button.

---

## 8. `sw.js` — Offline Service Worker

**Goal:** Keep KhelGaon working even when a rural student loses internet connection on the field.

- **`install` event:** Opens `"khelgaon-cache-v2"` and downloads all 7 HTML pages, `css/style.css`, all 7 JS files, `manifest.json`, and `data/opportunities.json` using `cache.addAll(ASSETS_TO_CACHE)`.
- **`activate` event:** Deletes older cache names if the version changes.
- **`fetch` event:** Intercepts same-origin `GET` requests and calls `caches.match(event.request, { ignoreSearch: true })`.
  - **Why `{ ignoreSearch: true }`?** Because links like `opportunities.html?sport=Cricket` and `detail.html?id=opp-01` have query parameters (`?...`) after the filename. Passing `ignoreSearch: true` lets the cached HTML page open offline and read the query parameters in JavaScript!
  - If a cached response is found, it returns immediately (fast even on 2G) and silently refreshes the cache in the background when online.

---

## Common Viva Questions & Quick Answers

1. **Why use `localStorage` instead of a database?**  
   Because the project rule requires a 100% static site (no backend or paid server) so it hosts free on GitHub Pages and works offline. `localStorage` saves data as strings inside the user's browser across refreshes.
2. **Why do we use `JSON.stringify()` and `JSON.parse()` with `localStorage`?**  
   `localStorage` can only store text strings. `JSON.stringify()` converts a JavaScript array/object into a JSON string before saving, and `JSON.parse()` converts it back into a usable array/object when reading.
3. **Why does `fetch("data/opportunities.json")` need a local HTTP server instead of double-clicking `index.html`?**  
   Browsers block `fetch()` and Service Workers on `file://` URLs for security (CORS policy). Running `python -m http.server` or deploying to GitHub Pages serves files over `http://` or `https://`, where `fetch()` and `sw.js` work properly.
4. **Why is `data-page` on `<body>` better than checking `window.location.pathname`?**  
   When deployed to GitHub Pages under a repository subpath (like `/khelgaon/`), checking `pathname` can break if a repo name contains words like `"about"` or `"opportunities"`. Reading `data-page` from `<body>` always identifies the exact page reliably.
5. **How does the app stay under 300 KB?**  
   Zero external CSS/JS frameworks, zero stock images, system fonts (`system-ui`), and clean emoji/text icons keep the entire site payload well under 150 KB per page load.
