/**
 * KhelGaon - Main Application Controller
 * File: js/main.js
 *
 * Purpose:
 * Registers the Service Worker, controls mobile navigation, routes to the
 * current page initializer using body[data-page], and handles Detail view,
 * Eligibility Quiz, Coach Submission Form, and Printable Checklist.
 */

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Register Service Worker so pages and data work offline after one visit
  registerServiceWorker();

  // 2. Setup mobile hamburger menu toggle
  setupMobileNav();

  // 3. Load opportunities from data/opportunities.json + localStorage
  await loadOpportunities();

  // 4. Identify current page cleanly via data-page attribute on <body>
  const currentPage = document.body.getAttribute("data-page") || "home";

  if (currentPage === "opportunities") {
    initOpportunitiesPage();
  } else if (currentPage === "detail") {
    initDetailPage();
  } else if (currentPage === "eligibility") {
    initEligibilityPage();
  } else if (currentPage === "submit") {
    initSubmitPage();
  } else if (currentPage === "resources") {
    initResourcesPage();
  } else if (currentPage === "home") {
    initHomePage();
  }

  // 5. Refresh dynamic sections whenever user switches between English and Hindi
  window.addEventListener("languageChanged", () => {
    if (currentPage === "opportunities" && typeof applyAllFilters === "function") {
      applyAllFilters();
    } else if (currentPage === "detail") {
      initDetailPage();
    } else if (currentPage === "eligibility") {
      const resultsBox = document.getElementById("eligibility-results");
      if (resultsBox && resultsBox.style.display !== "none" && typeof window.runEligibilityCheck === "function") {
        window.runEligibilityCheck(false);
      }
    }
  });
});

/**
 * Registers sw.js for offline PWA support.
 */
function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
      .catch((err) => {
        console.warn("Service Worker registration skipped:", err);
      });
  }
}

/**
 * Controls the mobile navigation menu toggle and Escape key closing.
 */
function setupMobileNav() {
  const toggleBtn = document.getElementById("nav-toggle-btn");
  const navMenu = document.getElementById("site-nav");
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener("click", () => {
    const isCollapsed = navMenu.classList.contains("collapsed");
    navMenu.classList.toggle("collapsed", !isCollapsed);
    toggleBtn.setAttribute("aria-expanded", isCollapsed ? "true" : "false");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !navMenu.classList.contains("collapsed")) {
      navMenu.classList.add("collapsed");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

/**
 * Home Page: Handles hero search submission by forwarding to opportunities.html?q=...
 */
function initHomePage() {
  const heroForm = document.getElementById("hero-search-form");
  const heroInput = document.getElementById("hero-search-input");

  if (heroForm && heroInput) {
    heroForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = heroInput.value.trim();
      if (query) {
        window.location.href = `opportunities.html?q=${encodeURIComponent(query)}`;
      } else {
        window.location.href = "opportunities.html";
      }
    });
  }
}

/**
 * Opportunities Page: Wires filters and renders all matching cards.
 */
function initOpportunitiesPage() {
  initFilterControls();
  applyAllFilters();
}

/**
 * Detail Page: Reads ?id= from URL and renders eligibility, documents,
 * how-to-apply, official portal link, WhatsApp share, and Copy Link.
 */
function initDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const oppId = urlParams.get("id");
  const container = document.getElementById("detail-content-area");
  if (!container) return;

  if (!oppId) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon" aria-hidden="true">⚠️</div>
        <h1 class="empty-title">${escapeHTML(t("detail.notSelectedTitle"))}</h1>
        <p class="empty-desc">${escapeHTML(t("detail.notSelectedDesc"))}</p>
        <a href="opportunities.html" class="btn btn-primary">${escapeHTML(t("detail.browseBtn"))}</a>
      </div>
    `;
    return;
  }

  const opp = getOpportunityById(oppId);
  if (!opp) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon" aria-hidden="true">🔍</div>
        <h1 class="empty-title">${escapeHTML(t("detail.notFoundTitle"))}</h1>
        <p class="empty-desc">${escapeHTML(t("detail.notFoundDesc"))}</p>
        <a href="opportunities.html" class="btn btn-primary">${escapeHTML(t("detail.browseBtn"))}</a>
      </div>
    `;
    return;
  }

  const isHindi = (typeof currentLang !== "undefined" && currentLang === "hi");
  const displayTitle = escapeHTML((isHindi && opp.titleHi) ? opp.titleHi : opp.title);
  const displayOrg = escapeHTML(opp.organization);
  const displaySport = escapeHTML(translateDynamicValue("sport", opp.sport));
  const displayType = escapeHTML(translateDynamicValue("meta", opp.type));
  const displayState = escapeHTML(translateDynamicValue("meta", opp.state));
  const displayDistrict = escapeHTML(opp.district);
  const displayGender = escapeHTML(translateDynamicValue("meta", opp.gender));
  const displayDeadline = escapeHTML(
    opp.deadline === "Check official website for current dates"
      ? translateDynamicValue("meta", "deadlineOfficial")
      : opp.deadline
  );
  const closingLabel = escapeHTML(translateDynamicValue("meta", "closingSoon"));
  const safeUrl = getSafeOfficialLink(opp.officialLink);
  const isSaved = isOpportunitySaved(opp.id);

  const docsListHTML = (opp.documents && Array.isArray(opp.documents))
    ? opp.documents.map((doc) => `<li><span aria-hidden="true">📄</span> <span>${escapeHTML(doc)}</span></li>`).join("")
    : `<li><span aria-hidden="true">📄</span> <span>Aadhaar Card &amp; School Bonafide Certificate</span></li>`;

  const shareMessage = `${(isHindi && opp.titleHi) ? opp.titleHi : opp.title} (${opp.sport} - ${opp.state}) on KhelGaon: ${window.location.href}`;
  const whatsAppUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;

  container.innerHTML = `
    <article class="detail-card">
      <div class="detail-header-block">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 12px;">
          <div class="badges-group">
            <span class="badge badge-sport">${displaySport}</span>
            <span class="badge badge-type">${displayType}</span>
            ${opp.closingSoon ? `<span class="badge badge-urgent">⚡ ${closingLabel}</span>` : ""}
          </div>
          <button
            type="button"
            id="detail-save-btn"
            class="save-btn ${isSaved ? "saved" : ""}"
            aria-pressed="${isSaved ? "true" : "false"}"
            aria-label="${escapeHTML(isSaved ? t("app.remove") : t("app.save"))}">
            ${isSaved ? "❤️" : "🤍"}
          </button>
        </div>

        <h1 class="page-title" style="margin-bottom: 6px;">${displayTitle}</h1>
        <p class="card-org" style="font-size: 1rem;">${displayOrg}</p>
      </div>

      <div class="detail-specs-grid">
        <div class="spec-box">
          <div class="spec-box-label">${escapeHTML(t("detail.stateDistrict"))}</div>
          <div class="spec-box-val">${displayState} (${displayDistrict})</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-label">${escapeHTML(t("detail.ageRange"))}</div>
          <div class="spec-box-val">${opp.minAge} - ${opp.maxAge} ${escapeHTML(t("app.years"))}</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-label">${escapeHTML(t("detail.gender"))}</div>
          <div class="spec-box-val">${displayGender}</div>
        </div>
        <div class="spec-box">
          <div class="spec-box-label">${escapeHTML(t("detail.dates"))}</div>
          <div class="spec-box-val">${displayDeadline}</div>
        </div>
      </div>

      <section class="detail-section">
        <h2 class="detail-section-title">
          <span aria-hidden="true">🎁</span>
          <span>${escapeHTML(t("detail.benefitsTitle"))}</span>
        </h2>
        <div class="card-benefits" style="font-size: 0.95rem; padding: 12px;">
          ${escapeHTML(opp.benefits)}
        </div>
      </section>

      <section class="detail-section">
        <h2 class="detail-section-title">
          <span aria-hidden="true">🎯</span>
          <span>${escapeHTML(t("detail.eligibilityTitle"))}</span>
        </h2>
        <p style="font-size: 0.95rem; line-height: 1.6;">${escapeHTML(opp.eligibility)}</p>
      </section>

      <section class="detail-section">
        <h2 class="detail-section-title">
          <span aria-hidden="true">📋</span>
          <span>${escapeHTML(t("detail.docsTitle"))}</span>
        </h2>
        <ul class="docs-checklist">
          ${docsListHTML}
        </ul>
      </section>

      <section class="detail-section">
        <h2 class="detail-section-title">
          <span aria-hidden="true">📝</span>
          <span>${escapeHTML(t("detail.applyTitle"))}</span>
        </h2>
        <p style="font-size: 0.95rem; line-height: 1.6; margin-bottom: 12px;">${escapeHTML(opp.howToApply)}</p>

        <div class="spec-box" style="border-left-color: var(--accent-saffron-solid); margin-bottom: 16px;">
          <strong>⚠️ ${escapeHTML(t("detail.noticePrefix"))}</strong> ${escapeHTML(opp.verificationNote)}
        </div>

        <a href="${escapeHTML(safeUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span aria-hidden="true">🌐</span> ${escapeHTML(t("detail.openPortal"))} ↗
        </a>
      </section>

      <div class="share-bar">
        <a href="${escapeHTML(whatsAppUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
          <span aria-hidden="true">💬</span> ${escapeHTML(t("app.shareWhatsApp"))}
        </a>
        <button type="button" id="copy-link-btn" class="btn btn-outline">
          <span aria-hidden="true">🔗</span> ${escapeHTML(t("app.copyLink"))}
        </button>
        <span id="copy-feedback" role="status" aria-live="polite" style="display: none; align-items: center; color: var(--primary-green); font-weight: 700; font-size: 0.92rem;">
          ✓ ${escapeHTML(t("app.linkCopied"))}
        </span>
      </div>
    </article>
  `;

  const detailSaveBtn = document.getElementById("detail-save-btn");
  if (detailSaveBtn) {
    detailSaveBtn.addEventListener("click", () => {
      const nowSaved = toggleSaveOpportunity(opp.id);
      detailSaveBtn.textContent = nowSaved ? "❤️" : "🤍";
      detailSaveBtn.classList.toggle("saved", nowSaved);
      detailSaveBtn.setAttribute("aria-pressed", nowSaved ? "true" : "false");
      detailSaveBtn.setAttribute("aria-label", nowSaved ? t("app.remove") : t("app.save"));
    });
  }

  const copyBtn = document.getElementById("copy-link-btn");
  const copyFeedback = document.getElementById("copy-feedback");
  if (copyBtn && copyFeedback) {
    copyBtn.addEventListener("click", () => {
      const showCopied = () => {
        copyFeedback.style.display = "inline-flex";
        setTimeout(() => {
          copyFeedback.style.display = "none";
        }, 3000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(showCopied).catch(() => {
          fallbackCopyText(window.location.href);
          showCopied();
        });
      } else {
        fallbackCopyText(window.location.href);
        showCopied();
      }
    });
  }
}

/**
 * Fallback copy helper for older Android browsers without navigator.clipboard.
 */
function fallbackCopyText(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  try {
    document.execCommand("copy");
  } catch (e) {
    // Ignore copy error if browser blocks command
  }
  document.body.removeChild(tempInput);
}

/**
 * "Am I Eligible?" Page: Evaluates 4 questions and shows matching cards instantly.
 */
function initEligibilityPage() {
  const form = document.getElementById("eligibility-quiz-form");
  const resultsContainer = document.getElementById("eligibility-results");
  const resetBtn = document.getElementById("eligibility-reset-btn");
  const errorBox = document.getElementById("eligibility-error");
  if (!form || !resultsContainer) return;

  function runCheck(shouldScroll) {
    const ageVal = parseInt(document.getElementById("el-age").value, 10);
    const genderVal = document.getElementById("el-gender").value;
    const stateVal = document.getElementById("el-state").value;
    const sportVal = document.getElementById("el-sport").value;

    if (isNaN(ageVal)) {
      if (errorBox) {
        errorBox.textContent = t("el.ageError");
        errorBox.style.display = "block";
      }
      return;
    }

    if (errorBox) {
      errorBox.style.display = "none";
    }

    const matches = allOpportunities.filter((item) => {
      const ageOk = ageVal >= item.minAge && ageVal <= item.maxAge;
      const genderOk = (genderVal === "any") || (item.gender.toLowerCase() === "all") || (item.gender.toLowerCase() === genderVal.toLowerCase());
      const stateOk = (stateVal === "any") || (item.state.toLowerCase() === "all india") || (item.state.toLowerCase() === stateVal.toLowerCase());
      const sportOk = (sportVal === "any") || (item.sport.toLowerCase() === sportVal.toLowerCase());
      return ageOk && genderOk && stateOk && sportOk;
    });

    resultsContainer.style.display = "block";
    const isHindi = (typeof currentLang !== "undefined" && currentLang === "hi");

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon" aria-hidden="true">🎯</div>
          <h2 class="empty-title">${escapeHTML(t("el.noMatchTitle"))}</h2>
          <p class="empty-desc">${escapeHTML(t("el.noMatchDesc"))}</p>
          <a href="opportunities.html" class="btn btn-primary">${escapeHTML(t("el.noMatchBtn"))}</a>
        </div>
      `;
    } else {
      const cardsHTML = matches.map((item) => createOpportunityCardHTML(item)).join("");
      const headingText = isHindi
        ? `आपके लिए मिले ${matches.length} खेल अवसर:`
        : `Found ${matches.length} Matching Opportunities For You:`;

      resultsContainer.innerHTML = `
        <h2 class="section-heading">${headingText}</h2>
        <div class="cards-grid" role="list">${cardsHTML}</div>
      `;
    }

    if (shouldScroll) {
      resultsContainer.scrollIntoView({ behavior: "smooth" });
    }
  }

  window.runEligibilityCheck = runCheck;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    runCheck(true);
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      if (errorBox) errorBox.style.display = "none";
      resultsContainer.style.display = "none";
      resultsContainer.innerHTML = "";
    });
  }
}

/**
 * Helper to show or clear inline error state on form inputs.
 */
function setFieldError(inputEl, message) {
  if (!inputEl) return;
  const existingMsg = inputEl.parentElement.querySelector(".field-error-msg");
  if (message) {
    inputEl.classList.add("input-error");
    inputEl.setAttribute("aria-invalid", "true");
    if (existingMsg) {
      existingMsg.textContent = message;
    } else {
      const errDiv = document.createElement("div");
      errDiv.className = "field-error-msg";
      errDiv.textContent = message;
      inputEl.parentElement.appendChild(errDiv);
    }
  } else {
    inputEl.classList.remove("input-error");
    inputEl.removeAttribute("aria-invalid");
    if (existingMsg) existingMsg.remove();
  }
}

/**
 * Share an Opportunity Page: Validates teacher/coach form inline,
 * saves new entry to localStorage, and displays a thank-you message.
 */
function initSubmitPage() {
  const form = document.getElementById("submit-opportunity-form");
  const formCard = document.getElementById("submit-form-card");
  const successBox = document.getElementById("submit-success-box");
  const errorSummary = document.getElementById("submit-error-summary");
  const submitAnotherBtn = document.getElementById("submit-another-btn");
  if (!form || !successBox) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isHindi = (typeof currentLang !== "undefined" && currentLang === "hi");

    const titleEl = document.getElementById("sub-title");
    const orgEl = document.getElementById("sub-org");
    const sportEl = document.getElementById("sub-sport");
    const typeEl = document.getElementById("sub-type");
    const stateEl = document.getElementById("sub-state");
    const districtEl = document.getElementById("sub-district");
    const minAgeEl = document.getElementById("sub-min-age");
    const maxAgeEl = document.getElementById("sub-max-age");
    const genderEl = document.getElementById("sub-gender");
    const benefitsEl = document.getElementById("sub-benefits");
    const docsEl = document.getElementById("sub-docs");
    const linkEl = document.getElementById("sub-link");
    const submitterEl = document.getElementById("sub-submitter");

    // Clear old error messages
    [titleEl, orgEl, districtEl, minAgeEl, maxAgeEl, benefitsEl, docsEl, linkEl].forEach((el) => {
      setFieldError(el, "");
    });
    if (errorSummary) {
      errorSummary.style.display = "none";
      errorSummary.textContent = "";
    }

    let hasErrors = false;
    const reqMsg = isHindi ? "यह जानकारी भरना आवश्यक है।" : "This field is required.";

    if (!titleEl.value.trim()) {
      setFieldError(titleEl, reqMsg);
      hasErrors = true;
    }
    if (!orgEl.value.trim()) {
      setFieldError(orgEl, reqMsg);
      hasErrors = true;
    }
    if (!districtEl.value.trim()) {
      setFieldError(districtEl, reqMsg);
      hasErrors = true;
    }
    if (!benefitsEl.value.trim()) {
      setFieldError(benefitsEl, reqMsg);
      hasErrors = true;
    }

    const docsList = docsEl.value.trim().split("\n").map((d) => d.trim()).filter((d) => d.length > 0);
    if (docsList.length === 0) {
      setFieldError(docsEl, reqMsg);
      hasErrors = true;
    }

    const minAge = parseInt(minAgeEl.value, 10);
    const maxAge = parseInt(maxAgeEl.value, 10);
    if (isNaN(minAge) || minAge < 8 || minAge > 25) {
      setFieldError(minAgeEl, isHindi ? "आयु 8 से 25 वर्ष के बीच होनी चाहिए।" : "Enter a valid age between 8 and 25.");
      hasErrors = true;
    }
    if (isNaN(maxAge) || maxAge < 8 || maxAge > 25) {
      setFieldError(maxAgeEl, isHindi ? "आयु 8 से 25 वर्ष के बीच होनी चाहिए।" : "Enter a valid age between 8 and 25.");
      hasErrors = true;
    } else if (!isNaN(minAge) && minAge > maxAge) {
      setFieldError(maxAgeEl, isHindi ? "अधिकतम आयु न्यूनतम आयु से कम नहीं हो सकती।" : "Maximum age cannot be less than minimum age.");
      hasErrors = true;
    }

    const rawLink = linkEl.value.trim();
    if (rawLink && !rawLink.startsWith("https://") && !rawLink.startsWith("http://")) {
      setFieldError(linkEl, isHindi ? "लिंक https:// या http:// से शुरू होना चाहिए।" : "Link must start with https:// or http://.");
      hasErrors = true;
    }

    if (hasErrors) {
      if (errorSummary) {
        errorSummary.textContent = isHindi
          ? "कृपया लाल रंग में दिखाए गए आवश्यक फ़ील्ड सही से भरें।"
          : "Please fix the highlighted fields before submitting.";
        errorSummary.style.display = "block";
        errorSummary.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const submitter = submitterEl.value.trim();
    const newOpportunity = {
      id: "opp-custom-" + Date.now(),
      title: titleEl.value.trim(),
      titleHi: titleEl.value.trim(),
      organization: orgEl.value.trim() + (submitter ? ` (Shared by ${submitter})` : ""),
      sport: sportEl.value,
      type: typeEl.value,
      state: stateEl.value,
      district: districtEl.value.trim(),
      minAge: minAge,
      maxAge: maxAge,
      gender: genderEl.value,
      deadline: "Check official website for current dates",
      closingSoon: false,
      benefits: benefitsEl.value.trim(),
      eligibility: `Open to ${genderEl.value} aged ${minAge}-${maxAge} in ${districtEl.value.trim()}, ${stateEl.value}.`,
      documents: docsList,
      howToApply: "Verify details with the organizing school or sports office and report with required documents.",
      officialLink: rawLink || "https://sportsauthorityofindia.nic.in",
      verificationNote: "Verify on the official site before applying. Community-submitted entry saved locally."
    };

    saveCustomOpportunity(newOpportunity);

    form.reset();
    if (formCard) {
      formCard.style.display = "none";
    } else {
      form.style.display = "none";
    }
    successBox.style.display = "block";
    successBox.scrollIntoView({ behavior: "smooth" });
  });

  if (submitAnotherBtn) {
    submitAnotherBtn.addEventListener("click", () => {
      successBox.style.display = "none";
      if (formCard) {
        formCard.style.display = "block";
      } else {
        form.style.display = "block";
      }
    });
  }
}

/**
 * Resources Page: Triggers browser print dialog for the document checklist.
 */
function initResourcesPage() {
  const printBtn = document.getElementById("print-checklist-btn");
  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}
