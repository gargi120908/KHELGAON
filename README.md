# KhelGaon (खेलगांव) — Rural Indian Sports Portal

> **Course Project Identity:** `Name: GARGI SANJAY PUSNAKE | Scholar Number: 26U020109 | FoCP (CSE-1003)`  
> **Course:** Fundamentals of Computer Programming (B.Tech CSE, 1st Semester)

KhelGaon is a lightweight, bilingual (English / Hindi), offline-capable static web portal built with **plain HTML, CSS, and Vanilla JavaScript**. It helps rural Indian students aged 14–19 (and 10–19 overall) as well as their PE teachers and coaches discover sports selection trials, training camps, scholarships, and government schemes on budget Android phones and slow connections.

---

## Key Features

- **Mandatory Academic Identity Bar (`js/identity.js`):** A single shared JavaScript function (`renderIdentityHeader()`) displays the student identity line at the top of every page without scrolling or login, plus a prominent project card on the Home page.
- **7 Complete Pages:**
  1. **Home (`index.html`):** Mission banner, instant keyword search bar, 8 sport quick-buttons (Cricket, Kabaddi, Athletics, Football, Hockey, Wrestling, Archery, Kho-Kho), "How KhelGaon Works" 3-step guide, and "Why This Matters" with a clearly labeled Sample story.
  2. **Opportunities Directory (`opportunities.html`):** 20 curated entries loaded from `data/opportunities.json`, filters for Sport, State, Age Group / Age, Gender, and Type, instant keyword search, District/Village text filter (no GPS needed), "Closing Soon" sort, Saved Items tab with count badge, and a friendly empty state.
  3. **Opportunity Detail (`detail.html`):** Eligibility rules, benefits, documents checklist, step-by-step application instructions, official homepage link, "Share on WhatsApp" (`wa.me`) button, and "Copy Link".
  4. **Am I Eligible? (`eligibility.html`):** 4-question instant matcher (age, gender, state, sport).
  5. **Free Resources (`resources.html`):** Zero-equipment home fitness routine, low-cost Indian athletic nutrition ideas, and a printable documents checklist (`window.print()`).
  6. **Share an Opportunity (`submit.html`):** Form for PE teachers and coaches with inline validation and a thank-you confirmation. Submissions save to `localStorage` and appear immediately in the directory.
  7. **About (`about.html`):** Problem overview, how the portal helps, and project limitations / honesty rules.
- **Bilingual English & Hindi (`js/i18n.js`):** One-tap switch driven by a single `translations` object, remembered in `localStorage`.
- **Light & Dark Mode (`js/theme.js`):** Accessible high-contrast theme toggle persisted in `localStorage`.
- **Offline PWA (`manifest.json`, `sw.js`):** Installable web app; caches pages, styles, scripts, and JSON so the directory works offline after the first visit.
- **Mobile-First & Lightweight:** Tested at `360px` width and desktop width with `44px+` tap targets, semantic HTML, keyboard focus outlines, system fonts, and total page weight well under 300 KB.

---

## Project Structure

```text
khelgaon/
├── index.html               # Home page
├── opportunities.html       # Directory, filters, and Saved tab
├── detail.html              # Single opportunity details + WhatsApp/copy share
├── eligibility.html         # 4-question eligibility matcher
├── resources.html           # Home workouts, nutrition, printable checklist
├── submit.html              # Teacher/coach submission form
├── about.html               # Problem, solution, and honesty limitations
├── manifest.json            # PWA install manifest
├── sw.js                    # Service Worker for offline caching
├── README.md                # Project overview and GitHub Pages deploy guide
├── CODE_EXPLAINED.md        # Beginner-friendly JS explanation for viva prep
├── css/
│   └── style.css            # Mobile-first CSS with light/dark theme variables
├── data/
│   └── opportunities.json   # 20 real-programme-based entries (no fake dates/phones)
└── js/
    ├── identity.js          # Shared top student identity component
    ├── theme.js             # Light/dark theme controller
    ├── i18n.js              # English/Hindi translations dictionary & switcher
    ├── data.js              # fetch() loader, localStorage cache, HTML escaping
    ├── saved.js             # Bookmark toggle & Saved count in localStorage
    ├── filters.js           # Plain Array.filter() pipeline & card renderer
    └── main.js              # Page router & page-specific event handlers
```

---

## Data Honesty Policy

- All 20 entries in `data/opportunities.json` are based on real, well-known Indian programmes (such as Khelo India, SAI NSTC/SAG, Army Boys Sports Company, SGFI, RFYS, BCCI District trials, Hockey India camps, and State Sports Authorities) described generically.
- No trial dates, phone numbers, or deep links are invented. Every entry states `"Check official website for current dates"`, links only to official homepages, and shows `"Verify on the official site before applying"` on every card.
- The motivational story on the Home page is explicitly marked as `"Sample story"`.

---

## Running Locally

Because browsers block `fetch()` and Service Workers on `file://` URLs, serve the folder over a local HTTP server:

```bash
cd khelgaon
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

---

## Free Deployment to GitHub Pages (Step-by-Step)

All paths in KhelGaon are relative (e.g., `css/style.css`, `data/opportunities.json`), so it works out of the box on GitHub Pages without any build step.

1. **Create a free GitHub account** at [github.com](https://github.com) if you do not already have one.
2. **Create a new repository:**
   - Click the **+** icon at the top right -> **New repository**.
   - Name it `khelgaon` (or any name you like), set visibility to **Public**, and click **Create repository**.
3. **Upload the project files:**
   - Option A (Browser upload — easiest): Click **uploading an existing file**, drag all files and folders inside `khelgaon/` (`index.html`, `css/`, `data/`, `js/`, `sw.js`, `manifest.json`, etc.) into the upload box so `index.html` sits at the root of the repository, and click **Commit changes**.
   - Option B (Git CLI):
     ```bash
     cd khelgaon
     git init
     git add .
     git commit -m "Initial commit: KhelGaon FoCP project"
     git branch -M main
     git remote add origin https://github.com/<your-username>/khelgaon.git
     git push -u origin main
     ```
4. **Enable GitHub Pages:**
   - Open your repository on GitHub and click **Settings**.
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment -> Source**, select **Deploy from a branch**.
   - Under **Branch**, choose **main** and folder **/ (root)**, then click **Save**.
5. **Visit your live site:**
   - Wait 1–2 minutes and refresh the Pages settings screen.
   - GitHub will display your live HTTPS link: `https://<your-username>.github.io/khelgaon/`.
   - Because GitHub Pages serves over HTTPS, the PWA Service Worker and offline mode work automatically!
