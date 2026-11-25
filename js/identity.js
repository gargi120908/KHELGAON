/**
 * KhelGaon - Student Identity Component
 * File: js/identity.js
 * Author: GARGI SANJAY PUSNAKE
 * Scholar Number: 26U020109
 * Course: FoCP (CSE-1003)
 *
 * Purpose:
 * Renders the mandatory academic identity component at the top of every page
 * using a single shared function, visible immediately without scrolling or login.
 * Also renders an expanded student project card prominently on the Home page.
 */

/**
 * Renders the mandatory top student identity bar on every page,
 * and updates the prominent Home page spotlight card if present.
 */
function renderIdentityHeader() {
  const isHindi = (typeof currentLang !== "undefined" && currentLang === "hi");

  // 1. Top mandatory banner present on ALL pages (without scrolling or login)
  let existingBanner = document.getElementById("mandatory-identity-banner");

  if (!existingBanner) {
    existingBanner = document.createElement("div");
    existingBanner.id = "mandatory-identity-banner";
    existingBanner.className = "identity-banner";
    existingBanner.setAttribute("role", "region");
    existingBanner.setAttribute("aria-label", "Course Project Student Identity");

    // Exact mandatory line required by the course project rule
    const identityText = "Name: GARGI SANJAY PUSNAKE | Scholar Number: 26U020109 | FoCP (CSE-1003)";

    existingBanner.innerHTML = `
      <div class="identity-banner-content">
        <span class="identity-main">
          <span class="identity-icon" aria-hidden="true">🎓</span>
          <span class="identity-text">${identityText}</span>
        </span>
        <span class="identity-tag" id="identity-course-tag">${isHindi ? "कोर्स प्रोजेक्ट" : "Course Project"}</span>
      </div>
    `;

    // Insert as the very first child of <body> so it is visible at the top immediately
    if (document.body.firstChild) {
      document.body.insertBefore(existingBanner, document.body.firstChild);
    } else {
      document.body.appendChild(existingBanner);
    }
  } else {
    const tagEl = document.getElementById("identity-course-tag");
    if (tagEl) {
      tagEl.textContent = isHindi ? "कोर्स प्रोजेक्ट" : "Course Project";
    }
  }

  // 2. Prominent Home page spotlight card (when #home-identity-container exists)
  const homeSpotlight = document.getElementById("home-identity-container");
  if (homeSpotlight) {
    homeSpotlight.innerHTML = `
      <section class="academic-spotlight-card" aria-label="Student Project Details">
        <div class="spotlight-header">
          <span class="spotlight-badge">${isHindi ? "कोर्स प्रोजेक्ट परिचय" : "Course Project Showcase"}</span>
          <span class="spotlight-term">${isHindi ? "बी.टेक सीएसई — प्रथम सेमेस्टर" : "B.Tech CSE — 1st Semester"}</span>
        </div>
        <p class="spotlight-mandatory-line">
          Name: GARGI SANJAY PUSNAKE | Scholar Number: 26U020109 | FoCP (CSE-1003)
        </p>
        <div class="spotlight-body">
          <div class="spotlight-row">
            <span class="spotlight-label">${isHindi ? "विद्यार्थी का नाम:" : "Student Name:"}</span>
            <strong class="spotlight-value">GARGI SANJAY PUSNAKE</strong>
          </div>
          <div class="spotlight-row">
            <span class="spotlight-label">${isHindi ? "स्कॉलर नंबर:" : "Scholar Number:"}</span>
            <strong class="spotlight-value">26U020109</strong>
          </div>
          <div class="spotlight-row">
            <span class="spotlight-label">${isHindi ? "विषय एवं कोड:" : "Subject & Code:"}</span>
            <span class="spotlight-value">Fundamentals of Computer Programming (FoCP) | CSE-1003</span>
          </div>
          <div class="spotlight-row">
            <span class="spotlight-label">${isHindi ? "लक्ष्य:" : "Mission:"}</span>
            <span class="spotlight-value">${isHindi ? "खेलगांव — ग्रामीण भारतीय छात्रों के लिए मुफ्त खेल अवसर पोर्टल" : "KhelGaon — Grassroots Sports Opportunities for Rural Indian Youth"}</span>
          </div>
        </div>
      </section>
    `;
  }
}

// Run when the DOM is ready, and update labels if language is toggled
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderIdentityHeader);
} else {
  renderIdentityHeader();
}

window.addEventListener("languageChanged", renderIdentityHeader);
