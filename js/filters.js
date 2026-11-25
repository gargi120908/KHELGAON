/**
 * KhelGaon - Filters, Search & Card Rendering Module
 * File: js/filters.js
 *
 * Purpose:
 * Filters and sorts sports opportunities using simple, easy-to-explain
 * Array.filter() and Array.sort() steps, and builds accessible HTML cards.
 */

// Holds the currently selected filter values on the Opportunities page
const activeFilterState = {
  keyword: "",
  sport: "all",
  state: "all",
  gender: "all",
  type: "all",
  age: "all",
  district: "",
  sortBy: "default",
  viewTab: "all" // "all" or "saved"
};

/**
 * Checks whether an opportunity matches either an age group ("10-13")
 * or a single exact age ("15").
 */
function matchesAgeFilter(item, ageValue) {
  if (!ageValue || ageValue === "all") return true;

  if (ageValue.includes("-")) {
    const parts = ageValue.split("-");
    const groupMin = parseInt(parts[0], 10);
    const groupMax = parseInt(parts[1], 10);
    // Ranges overlap if the trial's maxAge reaches groupMin and minAge starts by groupMax
    return item.maxAge >= groupMin && item.minAge <= groupMax;
  }

  const userAge = parseInt(ageValue, 10);
  if (isNaN(userAge)) return true;
  return userAge >= item.minAge && userAge <= item.maxAge;
}

/**
 * Builds the HTML string for a single opportunity card.
 */
function createOpportunityCardHTML(opp) {
  const isSaved = isOpportunitySaved(opp.id);
  const isHindi = (typeof currentLang !== "undefined" && currentLang === "hi");

  const displayTitle = escapeHTML((isHindi && opp.titleHi) ? opp.titleHi : opp.title);
  const displayOrg = escapeHTML(opp.organization);
  const displaySport = escapeHTML(translateDynamicValue("sport", opp.sport));
  const displayType = escapeHTML(translateDynamicValue("meta", opp.type));
  const displayState = escapeHTML(translateDynamicValue("meta", opp.state));
  const displayDistrict = escapeHTML(opp.district);
  const displayGender = escapeHTML(translateDynamicValue("meta", opp.gender));
  const displayBenefits = escapeHTML(opp.benefits);
  const displayDeadline = escapeHTML(
    opp.deadline === "Check official website for current dates"
      ? translateDynamicValue("meta", "deadlineOfficial")
      : opp.deadline
  );

  const yearsWord = t("app.years");
  const ageString = `${opp.minAge} - ${opp.maxAge} ${yearsWord}`;
  const closingLabel = escapeHTML(translateDynamicValue("meta", "closingSoon"));

  const closingBadge = opp.closingSoon
    ? `<span class="badge badge-urgent">⚡ ${closingLabel}</span>`
    : "";

  const saveAria = escapeHTML(isSaved ? t("app.remove") : t("app.save"));

  return `
    <article class="opp-card" data-id="${escapeHTML(opp.id)}" role="listitem">
      <div class="card-top-row">
        <div class="badges-group">
          <span class="badge badge-sport">${displaySport}</span>
          <span class="badge badge-type">${displayType}</span>
          ${closingBadge}
        </div>
        <button
          type="button"
          class="save-btn ${isSaved ? "saved" : ""}"
          onclick="handleCardSaveToggle('${escapeHTML(opp.id)}', this)"
          aria-pressed="${isSaved ? "true" : "false"}"
          aria-label="${saveAria}"
          title="${saveAria}">
          ${isSaved ? "❤️" : "🤍"}
        </button>
      </div>

      <h3 class="card-title">${displayTitle}</h3>
      <p class="card-org">${displayOrg}</p>

      <ul class="card-meta-list">
        <li class="card-meta-item">
          <span class="meta-icon" aria-hidden="true">📍</span>
          <span><strong>${isHindi ? "स्थान:" : "Location:"}</strong> ${displayState} (${displayDistrict})</span>
        </li>
        <li class="card-meta-item">
          <span class="meta-icon" aria-hidden="true">👤</span>
          <span><strong>${isHindi ? "आयु एवं लिंग:" : "Age & Gender:"}</strong> ${ageString} | ${displayGender}</span>
        </li>
        <li class="card-meta-item">
          <span class="meta-icon" aria-hidden="true">📅</span>
          <span><strong>${isHindi ? "तारीख:" : "Dates:"}</strong> ${displayDeadline}</span>
        </li>
      </ul>

      <div class="card-benefits">
        <strong>${isHindi ? "सुविधाएं:" : "Benefits:"}</strong> ${displayBenefits}
      </div>

      <div class="card-footer">
        <div class="card-notice">
          <span aria-hidden="true">⚠️</span>
          <span>${escapeHTML(t("app.verified"))}</span>
        </div>
        <a href="detail.html?id=${encodeURIComponent(opp.id)}" class="btn btn-primary btn-sm" style="width: 100%;">
          ${escapeHTML(t("app.viewDetails"))} →
        </a>
      </div>
    </article>
  `;
}

/**
 * Toggles saved state when the user clicks the heart button on any card.
 */
function handleCardSaveToggle(oppId, buttonElement) {
  const isNowSaved = toggleSaveOpportunity(oppId);
  buttonElement.classList.toggle("saved", isNowSaved);
  buttonElement.textContent = isNowSaved ? "❤️" : "🤍";
  buttonElement.setAttribute("aria-pressed", isNowSaved ? "true" : "false");

  const label = isNowSaved ? t("app.remove") : t("app.save");
  buttonElement.setAttribute("aria-label", label);
  buttonElement.setAttribute("title", label);

  // If viewing the Saved tab, re-run filters so unsaved items disappear immediately
  if (activeFilterState.viewTab === "saved") {
    applyAllFilters();
  }
}

/**
 * Pure filtering and sorting function used by the Opportunities page.
 * Evaluates every active filter step-by-step in combination.
 */
function filterOpportunitiesList(sourceList, state) {
  let resultList = state.viewTab === "saved"
    ? getSavedOpportunitiesList(sourceList)
    : [...sourceList];

  // 1. Keyword search across title, Hindi title, sport, organization, state, district
  if (state.keyword.trim() !== "") {
    const query = state.keyword.toLowerCase().trim();
    resultList = resultList.filter((item) => {
      const fields = [
        item.title,
        item.titleHi,
        item.sport,
        item.organization,
        item.state,
        item.district
      ];
      return fields.some((field) => field && field.toLowerCase().includes(query));
    });
  }

  // 2. Sport dropdown filter
  if (state.sport !== "all") {
    const targetSport = state.sport.toLowerCase();
    resultList = resultList.filter((item) => item.sport.toLowerCase() === targetSport);
  }

  // 3. State dropdown filter (students in any state can also apply to "All India" schemes)
  if (state.state !== "all") {
    const targetState = state.state.toLowerCase();
    resultList = resultList.filter((item) => {
      const itemState = item.state.toLowerCase();
      return itemState === targetState || itemState === "all india";
    });
  }

  // 4. Gender dropdown filter ("All" means open to both Boys and Girls)
  if (state.gender !== "all") {
    const targetGender = state.gender.toLowerCase();
    resultList = resultList.filter((item) => {
      const itemGender = item.gender.toLowerCase();
      return itemGender === "all" || itemGender === targetGender;
    });
  }

  // 5. Opportunity type dropdown filter (Trial, Scholarship, Camp, Scheme)
  if (state.type !== "all") {
    const targetType = state.type.toLowerCase();
    resultList = resultList.filter((item) => item.type.toLowerCase() === targetType);
  }

  // 6. Age group / exact age filter
  if (state.age !== "all") {
    resultList = resultList.filter((item) => matchesAgeFilter(item, state.age));
  }

  // 7. District / village text filter (replaces GPS for slow phones)
  if (state.district.trim() !== "") {
    const distQuery = state.district.toLowerCase().trim();
    resultList = resultList.filter((item) => {
      const inDistrict = item.district && item.district.toLowerCase().includes(distQuery);
      const inState = item.state && item.state.toLowerCase().includes(distQuery);
      const inOrg = item.organization && item.organization.toLowerCase().includes(distQuery);
      return inDistrict || inState || inOrg;
    });
  }

  // 8. Sort order (closingSoon first or youngest eligible age first)
  if (state.sortBy === "closing") {
    resultList.sort((a, b) => {
      if (Boolean(a.closingSoon) === Boolean(b.closingSoon)) return 0;
      return a.closingSoon ? -1 : 1;
    });
  } else if (state.sortBy === "age") {
    resultList.sort((a, b) => a.minAge - b.minAge);
  }

  return resultList;
}

/**
 * Applies all filters to allOpportunities and renders the matching cards.
 */
function applyAllFilters() {
  if (!allOpportunities) return;
  const resultList = filterOpportunitiesList(allOpportunities, activeFilterState);
  renderOpportunityCards(resultList);
}

/**
 * Renders the filtered cards into the grid or shows a friendly empty state.
 */
function renderOpportunityCards(list) {
  const container = document.getElementById("opportunities-grid");
  const countDisplay = document.getElementById("results-count-display");
  const emptyState = document.getElementById("empty-state");
  const emptyTitle = document.getElementById("empty-title");
  const emptyDesc = document.getElementById("empty-desc");

  if (!container) return;

  const isHindi = (typeof currentLang !== "undefined" && currentLang === "hi");

  if (countDisplay) {
    countDisplay.textContent = isHindi
      ? `दिखाए जा रहे हैं: ${list.length} अवसर`
      : `Showing ${list.length} matching opportunities`;
  }

  if (list.length === 0) {
    container.innerHTML = "";
    if (emptyState) {
      emptyState.style.display = "block";
      if (emptyTitle && emptyDesc) {
        if (activeFilterState.viewTab === "saved" && getSavedOpportunityIds().length === 0) {
          emptyTitle.textContent = t("empty.savedTitle");
          emptyDesc.textContent = t("empty.savedDesc");
        } else {
          emptyTitle.textContent = t("empty.title");
          emptyDesc.textContent = t("empty.desc");
        }
      }
    }
    return;
  }

  if (emptyState) {
    emptyState.style.display = "none";
  }

  container.innerHTML = list.map((item) => createOpportunityCardHTML(item)).join("");
}

/**
 * Resets every filter input and shows all opportunities again.
 */
function resetAllFilters() {
  activeFilterState.keyword = "";
  activeFilterState.sport = "all";
  activeFilterState.state = "all";
  activeFilterState.gender = "all";
  activeFilterState.type = "all";
  activeFilterState.age = "all";
  activeFilterState.district = "";
  activeFilterState.sortBy = "default";

  const fieldMap = {
    "filter-keyword": "",
    "filter-sport": "all",
    "filter-state": "all",
    "filter-gender": "all",
    "filter-type": "all",
    "filter-age": "all",
    "filter-district": "",
    "filter-sort": "default"
  };

  Object.keys(fieldMap).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = fieldMap[id];
  });

  applyAllFilters();
}

/**
 * Wires up all filter controls, tabs, and URL parameters on the Opportunities page.
 */
function initFilterControls() {
  const searchInput = document.getElementById("filter-keyword");
  const sportSelect = document.getElementById("filter-sport");
  const stateSelect = document.getElementById("filter-state");
  const genderSelect = document.getElementById("filter-gender");
  const typeSelect = document.getElementById("filter-type");
  const ageSelect = document.getElementById("filter-age");
  const districtInput = document.getElementById("filter-district");
  const sortSelect = document.getElementById("filter-sort");
  const resetBtn = document.getElementById("filter-reset-btn");
  const emptyResetBtn = document.getElementById("empty-reset-btn");
  const tabAll = document.getElementById("tab-all");
  const tabSaved = document.getElementById("tab-saved");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeFilterState.keyword = e.target.value;
      applyAllFilters();
    });
  }

  if (sportSelect) {
    sportSelect.addEventListener("change", (e) => {
      activeFilterState.sport = e.target.value;
      applyAllFilters();
    });
  }

  if (stateSelect) {
    stateSelect.addEventListener("change", (e) => {
      activeFilterState.state = e.target.value;
      applyAllFilters();
    });
  }

  if (genderSelect) {
    genderSelect.addEventListener("change", (e) => {
      activeFilterState.gender = e.target.value;
      applyAllFilters();
    });
  }

  if (typeSelect) {
    typeSelect.addEventListener("change", (e) => {
      activeFilterState.type = e.target.value;
      applyAllFilters();
    });
  }

  if (ageSelect) {
    ageSelect.addEventListener("change", (e) => {
      activeFilterState.age = e.target.value;
      applyAllFilters();
    });
  }

  if (districtInput) {
    districtInput.addEventListener("input", (e) => {
      activeFilterState.district = e.target.value;
      applyAllFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeFilterState.sortBy = e.target.value;
      applyAllFilters();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetAllFilters);
  }

  if (emptyResetBtn) {
    emptyResetBtn.addEventListener("click", () => {
      if (activeFilterState.viewTab === "saved" && tabAll) {
        tabAll.click();
      }
      resetAllFilters();
    });
  }

  if (tabAll && tabSaved) {
    tabAll.addEventListener("click", () => {
      tabAll.classList.add("active");
      tabSaved.classList.remove("active");
      tabAll.setAttribute("aria-selected", "true");
      tabSaved.setAttribute("aria-selected", "false");
      activeFilterState.viewTab = "all";
      applyAllFilters();
    });

    tabSaved.addEventListener("click", () => {
      tabSaved.classList.add("active");
      tabAll.classList.remove("active");
      tabSaved.setAttribute("aria-selected", "true");
      tabAll.setAttribute("aria-selected", "false");
      activeFilterState.viewTab = "saved";
      applyAllFilters();
    });
  }

  // Read optional query parameters from Home page links (?sport=Cricket or ?q=Haryana)
  const urlParams = new URLSearchParams(window.location.search);
  const sportParam = urlParams.get("sport");
  const queryParam = urlParams.get("q");

  if (sportParam && sportSelect) {
    const matchedOption = Array.from(sportSelect.options).find(
      (opt) => opt.value.toLowerCase() === sportParam.toLowerCase()
    );
    if (matchedOption) {
      sportSelect.value = matchedOption.value;
      activeFilterState.sport = matchedOption.value;
    }
  }

  if (queryParam && searchInput) {
    searchInput.value = queryParam;
    activeFilterState.keyword = queryParam;
  }

  updateSavedTabCount();
}
