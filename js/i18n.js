/**
 * KhelGaon - Internationalization (i18n) Module
 * File: js/i18n.js
 *
 * Purpose:
 * Stores all English and Hindi UI strings in one translations object.
 * Updates text, placeholders, and dynamic labels across every page,
 * and remembers the user's chosen language in localStorage.
 */

// Single master dictionary for English ("en") and Hindi ("hi")
const translations = {
  en: {
    // Navigation & Accessibility
    "nav.skip": "Skip to main content",
    "nav.brand": "KhelGaon",
    "nav.tagline": "Rural Sports Portal",
    "nav.home": "Home",
    "nav.opportunities": "Find Opportunities",
    "nav.eligibility": "Am I Eligible?",
    "nav.resources": "Free Resources",
    "nav.submit": "Share an Opportunity",
    "nav.about": "About Project",

    // Shared UI labels
    "app.loading": "Loading sports opportunities...",
    "app.verified": "Verify on the official site before applying",
    "app.years": "Years",
    "app.save": "Save this opportunity",
    "app.remove": "Remove from saved",
    "app.viewDetails": "View Full Details & Steps",
    "app.shareWhatsApp": "Share on WhatsApp",
    "app.copyLink": "Copy Link",
    "app.linkCopied": "Link copied to clipboard!",

    // Sports names
    "sport.Cricket": "Cricket",
    "sport.Kabaddi": "Kabaddi",
    "sport.Athletics": "Athletics",
    "sport.Football": "Football",
    "sport.Hockey": "Hockey",
    "sport.Wrestling": "Wrestling",
    "sport.Archery": "Archery",
    "sport.Kho-Kho": "Kho-Kho",

    // Opportunity metadata values
    "meta.Trial": "Trial",
    "meta.Scholarship": "Scholarship",
    "meta.Camp": "Camp",
    "meta.Scheme": "Scheme",
    "meta.All": "Boys & Girls",
    "meta.Boys": "Boys",
    "meta.Girls": "Girls",
    "meta.All India": "All India",
    "meta.deadlineOfficial": "Check official website for current dates",
    "meta.closingSoon": "Closing Soon",

    // Home Page
    "home.mission": "Connecting Rural Indian Students to Sports Trials, Camps, Scholarships & Schemes",
    "home.submission": "Talent has no postal code. We gather real programmes for students aged 10-19 so no athlete in any village is left behind.",
    "home.searchPlaceholder": "Search by sport, scheme name, or district (e.g. Athletics, Kabaddi, Haryana)...",
    "home.searchButton": "Search Trials",
    "home.quickSportsTitle": "Select Your Sport to Begin:",
    "home.howItWorksTitle": "How KhelGaon Works",
    "home.howStep1Title": "1. Search Your Sport",
    "home.howStep1Desc": "Choose your sport and state to find selection trials, training camps, and government sports schemes.",
    "home.howStep2Title": "2. Check Documents",
    "home.howStep2Desc": "Read age rules, eligibility criteria, and documents needed (Aadhaar, birth certificate, school bonafide).",
    "home.howStep3Title": "3. Show Up & Perform",
    "home.howStep3Desc": "Verify dates on the official portal and report directly to the trial ground with zero middlemen or fees.",
    "home.whyMattersTitle": "Why This Matters",
    "home.whyMattersP1": "In rural India, millions of gifted runners, wrestlers, and kabaddi players train on village mud grounds without knowing when government selection trials happen.",
    "home.whyMattersP2": "Official notices are often hidden in PDFs across scattered portals and written in hard English. KhelGaon keeps everything simple, fast on slow phones, and free.",
    "home.sampleStoryTitle": "Inspiration Story (Sample story)",
    "home.sampleStoryQuote": "\"I used to run 5 km every morning on village canal roads. My school master saw a trial notice on KhelGaon and helped me reach the district stadium with my Aadhaar card. Today I have free hostel training and proper spikes.\"",
    "home.sampleStoryAuthor": "— Ramesh (Under-16 800m Runner, District Satara) [Sample story]",

    // Opportunities Page & Filters
    "opps.title": "Sports Opportunities & Trials Directory",
    "opps.subtitle": "Browse real government schemes, residential sports academies, talent hunts, and district trials.",
    "opps.allTab": "All Opportunities",
    "opps.savedTab": "Saved Items",
    "filter.searchLabel": "Search Keyword",
    "filter.searchPlaceholder": "Filter by trial name, sport, or keyword...",
    "filter.sportLabel": "Sport",
    "filter.sportAll": "All Sports",
    "filter.stateLabel": "State / Region",
    "filter.stateAll": "All States (All India)",
    "filter.stateAllIndia": "All India Schemes",
    "filter.genderLabel": "Gender",
    "filter.genderAll": "All Genders",
    "filter.genderBoys": "Boys Only",
    "filter.genderGirls": "Girls Only",
    "filter.typeLabel": "Opportunity Type",
    "filter.typeAll": "All Types",
    "filter.typeTrial": "Trials",
    "filter.typeScholarship": "Scholarships",
    "filter.typeCamp": "Training Camps",
    "filter.typeScheme": "Government Schemes",
    "filter.ageLabel": "Age Group / Your Age",
    "filter.ageAll": "Any Age (All Groups)",
    "filter.ageU14": "Under-14 (10-13 Years)",
    "filter.ageU17": "Under-17 (14-16 Years)",
    "filter.ageU19": "Under-19 (17-19 Years)",
    "filter.districtLabel": "District / Village Area",
    "filter.districtPlaceholder": "Enter district (e.g. Rohtak, Pune)...",
    "filter.districtHint": "Type your district or nearby town name (works without GPS)",
    "filter.sortLabel": "Sort By",
    "filter.sortDefault": "Default Listing",
    "filter.sortClosing": "Closing Soon First ⚡",
    "filter.sortAge": "Age: Youngest First",
    "filter.resetBtn": "Reset All Filters",
    "empty.title": "No opportunities found matching your filters",
    "empty.desc": "Try clearing some filters or switching to 'All Sports' and 'All States'.",
    "empty.savedTitle": "No saved opportunities yet",
    "empty.savedDesc": "Tap the heart button on any trial card to save it here for offline viewing.",
    "empty.resetBtn": "Clear All Filters",

    // Detail Page
    "detail.back": "← Back to Opportunities",
    "detail.stateDistrict": "State & District",
    "detail.ageRange": "Eligible Age Range",
    "detail.gender": "Gender Eligibility",
    "detail.dates": "Dates / Deadline",
    "detail.benefitsTitle": "What Selected Athletes Get (Benefits)",
    "detail.eligibilityTitle": "Who Can Apply (Eligibility Criteria)",
    "detail.docsTitle": "Documents You Must Bring to Trials",
    "detail.applyTitle": "Step-by-Step: How to Apply",
    "detail.noticePrefix": "Verification Note:",
    "detail.openPortal": "Open Official Portal",
    "detail.notSelectedTitle": "No Opportunity Selected",
    "detail.notSelectedDesc": "Please pick a sports trial or scheme from the opportunities directory.",
    "detail.notFoundTitle": "Opportunity Not Found",
    "detail.notFoundDesc": "This opportunity could not be found. It may have been cleared from local storage.",
    "detail.browseBtn": "Browse All Opportunities",

    // Eligibility Page
    "el.title": "Am I Eligible? (Quick 4-Question Finder)",
    "el.subtitle": "Answer 4 simple questions to find trials and schemes that match your profile.",
    "el.qAge": "1. What is your age?",
    "el.qAgePlaceholder": "Select your current age in years...",
    "el.ageHint": "Most grassroots sports schemes cover students aged 10 to 19.",
    "el.qGender": "2. What is your gender?",
    "el.qGenderAny": "Any / Both Boys & Girls",
    "el.qState": "3. Which state do you live in?",
    "el.qStateAny": "All India / Any State",
    "el.qSport": "4. Which sport do you play?",
    "el.qSportAny": "Show Any Sport",
    "el.checkBtn": "Find Matching Trials Now",
    "el.resetBtn": "Start Over",
    "el.ageError": "Please select your age before checking eligibility.",
    "el.noMatchTitle": "No exact matches found",
    "el.noMatchDesc": "Try selecting 'Show Any Sport' or 'All India / Any State' to see broader national programmes.",
    "el.noMatchBtn": "Browse All Opportunities",

    // Resources Page
    "res.title": "Free Training Guides & Resources",
    "res.subtitle": "Zero-equipment home workouts, low-cost rural nutrition, and a printable documents checklist.",
    "res.section1Title": "1. Zero-Equipment Home Fitness Routine",
    "res.section1Desc": "Build athletic speed, grip, and stamina using body weight and village open grounds.",
    "res.thExercise": "Exercise / Drill",
    "res.thSports": "Target Sports",
    "res.thSets": "Sets & Repetitions",
    "res.thBenefit": "Why It Helps",
    "res.r1Ex": "Hill / Canal Sprints (30m - 50m max effort)",
    "res.r1Sp": "Athletics, Football, Kabaddi",
    "res.r1Set": "6 to 8 sprints with 90s walk rest",
    "res.r1Ben": "Builds explosive acceleration and running stride.",
    "res.r2Ex": "Surya Namaskar & Push-ups (Dand)",
    "res.r2Sp": "Wrestling, Archery, Hockey",
    "res.r2Set": "4 sets of 15 to 20 reps",
    "res.r2Ben": "Improves shoulder stability, upper-body power, and flexibility.",
    "res.r3Ex": "Deep Frog Jumps (Baithak)",
    "res.r3Sp": "Kabaddi, Cricket, Kho-Kho",
    "res.r3Set": "4 sets of 25 reps",
    "res.r3Ben": "Develops strong legs for tackling, diving, and fast bowling.",
    "res.r4Ex": "Plank & Leg Raises (Core Hold)",
    "res.r4Sp": "All Sports",
    "res.r4Set": "3 rounds of 60 seconds",
    "res.r4Ben": "Protects the lower back and improves running posture.",
    "res.r5Ex": "Farmer's Walk with Water Buckets",
    "res.r5Sp": "Wrestling, Archery, Cricket",
    "res.r5Set": "3 walks of 50 meters",
    "res.r5Ben": "Builds strong grip and forearm endurance without any gym.",

    "res.section2Title": "2. Low-Cost Indian Athletic Nutrition",
    "res.section2Desc": "Eat well for sports trials without costly supplements, using local village foods.",
    "res.n1Label": "Power Breakfast",
    "res.n1Title": "Soaked Kala Chana + Gur (Jaggery)",
    "res.n1Desc": "Overnight soaked black chickpeas give steady energy and iron; jaggery supports stamina and prevents cramps.",
    "res.n2Label": "Post-Workout Drink",
    "res.n2Title": "Chana Sattu Sharbat",
    "res.n2Desc": "Mix 3 spoons of roasted chana sattu in buttermilk or water with roasted cumin for affordable plant protein.",
    "res.n3Label": "Daily Protein",
    "res.n3Title": "Boiled Eggs, Dal & Homemade Curd",
    "res.n3Desc": "Two boiled eggs or a fresh bowl of curd with dal-roti support muscle recovery after evening ground practice.",
    "res.n4Label": "Hydration & Electrolytes",
    "res.n4Title": "Nimbu Pani with Black Salt",
    "res.n4Desc": "Fresh lemon water with a pinch of kala namak and sugar replaces salts lost through heavy sweating.",

    "res.section3Title": "3. Essential Sports Document Checklist",
    "res.section3Desc": "Keep these 5 documents in one waterproof folder so you are always ready on trial morning.",
    "res.printBtn": "Print Checklist (PDF)",
    "res.d1": "1. Aadhaar Card (Original + 3 photocopies): Check that full Date of Birth matches your school records.",
    "res.d2": "2. Official Birth Certificate: Issued by Municipal Board, Hospital Registrar, or Gram Panchayat.",
    "res.d3": "3. School Bonafide or Transfer Certificate: Signed and stamped by your Principal showing current class.",
    "res.d4": "4. Medical Fitness Certificate: Signed by a Government Medical Officer or Civil Hospital doctor.",
    "res.d5": "5. Passport Size Photographs (6 copies): Recent clear color photos on a light background.",

    // Share Opportunity (Submit) Page
    "sub.title": "Share a Trial (For PE Teachers & Coaches)",
    "sub.subtitle": "Know a district trial, school competition, or sports camp? Add it here so local students can find it.",
    "sub.formTitle": "Trial Submission Form",
    "sub.fieldTitle": "Opportunity / Trial Title *",
    "sub.phTitle": "e.g. District Under-17 Kabaddi Selection Rally",
    "sub.fieldOrg": "Organizing Authority or School *",
    "sub.phOrg": "e.g. District Sports Office (DSO)",
    "sub.fieldSport": "Sport *",
    "sub.fieldType": "Type *",
    "sub.fieldState": "State *",
    "sub.fieldDistrict": "District / Venue Location *",
    "sub.phDistrict": "e.g. Kolhapur District Stadium",
    "sub.fieldAgeMin": "Min Age (Years) *",
    "sub.fieldAgeMax": "Max Age (Years) *",
    "sub.fieldGender": "Gender *",
    "sub.fieldBenefits": "Key Benefits Provided (hostel, kit, diet, certificate) *",
    "sub.phBenefits": "e.g. Free residential coaching, sports kit, tournament entry...",
    "sub.fieldDocs": "Key Documents Required *",
    "sub.phDocs": "Put each document on a new line:\nAadhaar Card\nSchool Bonafide Certificate\nMedical Certificate",
    "sub.fieldLink": "Official Website Link (optional)",
    "sub.phLink": "https://...",
    "sub.fieldContact": "Your Name & Role (optional)",
    "sub.phContact": "e.g. Rajesh Patil, PE Teacher, ZP High School",
    "sub.submitBtn": "Submit Opportunity",
    "sub.successTitle": "Thank You for Helping Rural Athletes!",
    "sub.successDesc": "Your trial has been saved to this browser's localStorage and is now live in the opportunities list.",
    "sub.viewNewBtn": "View on Opportunities Page →",
    "sub.submitAnotherBtn": "Share Another Opportunity",

    // About Page
    "about.title": "About Project KhelGaon",
    "about.subtitle": "Why this portal exists, how it helps rural students, and our honest limitations.",
    "about.cardBadge": "Academic Project Submission",
    "about.cardTerm": "CSE-1003 | First Semester",
    "about.cardNameLabel": "Student Name:",
    "about.cardScholarLabel": "Scholar Number:",
    "about.cardCourseLabel": "Course:",
    "about.cardTechLabel": "Tech Stack:",
    "about.problemTitle": "The Problem We Are Solving",
    "about.problemIntro": "Rural India has immense sporting talent, yet talented students aged 14-19 often miss selection trials because of four daily barriers:",
    "about.p1": "Scattered Notices: Trial announcements are spread across 28 state portals and long PDF circulars.",
    "about.p2": "English-Only Language: Official forms and rules use difficult administrative English.",
    "about.p3": "Low-End Phones & Slow Internet: Heavy portals fail to load on budget Android phones over 2G/3G.",
    "about.p4": "Middleman Fraud: Unaware families sometimes pay agents for trials that are officially free.",
    "about.solutionTitle": "How KhelGaon Helps",
    "about.s1Title": "One Simple Directory",
    "about.s1Desc": "Brings major SAI, Khelo India, Army Boys, and state authority programmes into one fast page.",
    "about.s2Title": "Works Offline",
    "about.s2Desc": "Service Worker and localStorage save the opportunities list after your very first visit.",
    "about.s3Title": "English & Hindi Toggle",
    "about.s3Desc": "One tap translates navigation, filters, and guides into simple Hindi.",
    "about.s4Title": "Under 300 KB & Zero Login",
    "about.s4Desc": "No ads, no sign-up, no trackers, and large 44px+ buttons built for 360px screens.",
    "about.limitationsTitle": "Our Limitations & Honesty Policy",
    "about.limIntro": "To keep students safe and avoid misinformation, KhelGaon follows strict academic honesty rules:",
    "about.l1": "Student Course Project: Built for B.Tech CSE 1st Semester FoCP (CSE-1003), not an official government portal.",
    "about.l2": "No Invented Dates or Phone Numbers: Every listing clearly states 'Check official website for current dates'.",
    "about.l3": "Official Verification Required: Every card instructs students and coaches to verify on the official site before traveling.",
    "about.l4": "Local Submissions Only: Forms on the Share page save locally in the browser (no backend database).",

    // Footer
    "footer.desc": "A free academic web portal helping rural Indian students and PE teachers discover genuine sports opportunities.",
    "footer.quickLinks": "Quick Links",
    "footer.tech": "Plain HTML5, CSS3 & Vanilla JS | Offline PWA"
  },

  hi: {
    // नेविगेशन एवं एक्सेसिबिलिटी
    "nav.skip": "मुख्य सामग्री पर जाएं",
    "nav.brand": "खेलगांव",
    "nav.tagline": "ग्रामीण खेल पोर्टल",
    "nav.home": "होम",
    "nav.opportunities": "अवसर खोजें",
    "nav.eligibility": "क्या मैं योग्य हूँ?",
    "nav.resources": "मुफ्त संसाधन",
    "nav.submit": "अवसर साझा करें",
    "nav.about": "प्रोजेक्ट परिचय",

    // साझा लेबल
    "app.loading": "खेल अवसर लोड हो रहे हैं...",
    "app.verified": "आवेदन करने से पहले आधिकारिक साइट पर अवश्य जांचें",
    "app.years": "वर्ष",
    "app.save": "यह अवसर सेव करें",
    "app.remove": "सेव की गई सूची से हटाएं",
    "app.viewDetails": "पूरी जानकारी एवं आवेदन प्रक्रिया",
    "app.shareWhatsApp": "व्हाट्सएप पर शेयर करें",
    "app.copyLink": "लिंक कॉपी करें",
    "app.linkCopied": "लिंक कॉपी हो गया!",

    // खेलों के नाम
    "sport.Cricket": "क्रिकेट",
    "sport.Kabaddi": "कबड्डी",
    "sport.Athletics": "एथलेटिक्स",
    "sport.Football": "फुटबॉल",
    "sport.Hockey": "हॉकी",
    "sport.Wrestling": "कुश्ती",
    "sport.Archery": "तीरंदाजी",
    "sport.Kho-Kho": "खो-खो",

    // अवसर मेटाडेटा मान
    "meta.Trial": "ट्रायल",
    "meta.Scholarship": "छात्रवृत्ति",
    "meta.Camp": "कैंप",
    "meta.Scheme": "योजना",
    "meta.All": "लड़के एवं लड़कियां",
    "meta.Boys": "लड़के",
    "meta.Girls": "लड़कियां",
    "meta.All India": "अखिल भारतीय",
    "meta.deadlineOfficial": "वर्तमान तारीखों के लिए आधिकारिक वेबसाइट देखें",
    "meta.closingSoon": "जल्द समाप्त",

    // होम पेज
    "home.mission": "ग्रामीण भारतीय छात्रों को खेल ट्रायल्स, कैंप, छात्रवृत्ति और सरकारी योजनाओं से जोड़ना",
    "home.submission": "प्रतिभा किसी पते की मोहताज नहीं होती। हम 10 से 19 वर्ष के विद्यार्थियों के लिए वास्तविक खेल कार्यक्रम एक जगह लाते हैं।",
    "home.searchPlaceholder": "खेल, योजना का नाम या जिला खोजें (जैसे: एथलेटिक्स, कबड्डी, हरियाणा)...",
    "home.searchButton": "ट्रायल्स खोजें",
    "home.quickSportsTitle": "शुरू करने के लिए अपना खेल चुनें:",
    "home.howItWorksTitle": "खेलगांव कैसे काम करता है",
    "home.howStep1Title": "1. अपना खेल खोजें",
    "home.howStep1Desc": "चयन ट्रायल्स, प्रशिक्षण शिविर और सरकारी खेल योजनाएं खोजने के लिए अपना खेल और राज्य चुनें।",
    "home.howStep2Title": "2. जरूरी दस्तावेज जांचें",
    "home.howStep2Desc": "आयु सीमा, पात्रता और आवश्यक कागजात (आधार कार्ड, जन्म प्रमाण पत्र, स्कूल प्रमाण पत्र) पढ़ें।",
    "home.howStep3Title": "3. मैदान पर जाएं और खेलें",
    "home.howStep3Desc": "आधिकारिक साइट पर तारीख पक्की करें और बिना किसी दलाल या शुल्क के सीधे ट्रायल मैदान पहुंचें।",
    "home.whyMattersTitle": "यह क्यों महत्वपूर्ण है?",
    "home.whyMattersP1": "भारत के गांवों में लाखों प्रतिभाशाली धावक, पहलवान और कबड्डी खिलाड़ी कच्चे मैदानों पर अभ्यास करते हैं, लेकिन उन्हें सरकारी ट्रायल्स की सही समय पर जानकारी नहीं मिल पाती।",
    "home.whyMattersP2": "सरकारी सूचनाएं अक्सर अलग-अलग पोर्टल पर कठिन अंग्रेजी पीडीएफ में होती हैं। खेलगांव सब कुछ सरल, धीमे फोन पर तेज और बिल्कुल मुफ्त रखता है।",
    "home.sampleStoryTitle": "प्रेरणा कहानी (सैंपल स्टोरी)",
    "home.sampleStoryQuote": "\"मैं रोज सुबह गांव की नहर की पटरी पर 5 किमी दौड़ता था। हमारे पीटीआई सर ने खेलगांव पर ट्रायल सूचना देखी और मुझे आधार कार्ड के साथ जिला स्टेडियम ले गए। आज मुझे मुफ्त हॉस्टल और रनिंग शूज मिल रहे हैं।\"",
    "home.sampleStoryAuthor": "— रमेश (अंडर-16 800मी धावक, जिला सतारा) [सैंपल स्टोरी]",

    // अवसर पेज एवं फ़िल्टर
    "opps.title": "खेल अवसर एवं ट्रायल्स डायरेक्टरी",
    "opps.subtitle": "वास्तविक सरकारी योजनाएं, आवासीय खेल अकादमियां, प्रतिभा खोज और जिला ट्रायल्स खोजें।",
    "opps.allTab": "सभी अवसर",
    "opps.savedTab": "सेव किए गए अवसर",
    "filter.searchLabel": "शब्द खोजें",
    "filter.searchPlaceholder": "ट्रायल का नाम, खेल या शब्द लिखें...",
    "filter.sportLabel": "खेल",
    "filter.sportAll": "सभी खेल",
    "filter.stateLabel": "राज्य / क्षेत्र",
    "filter.stateAll": "सभी राज्य (अखिल भारतीय)",
    "filter.stateAllIndia": "अखिल भारतीय योजनाएं",
    "filter.genderLabel": "लिंग",
    "filter.genderAll": "सभी",
    "filter.genderBoys": "केवल लड़के",
    "filter.genderGirls": "केवल लड़कियां",
    "filter.typeLabel": "अवसर का प्रकार",
    "filter.typeAll": "सभी प्रकार",
    "filter.typeTrial": "ट्रायल्स",
    "filter.typeScholarship": "छात्रवृत्ति",
    "filter.typeCamp": "प्रशिक्षण शिविर (कैंप)",
    "filter.typeScheme": "सरकारी योजनाएं",
    "filter.ageLabel": "आयु वर्ग / आपकी आयु",
    "filter.ageAll": "कोई भी आयु (सभी वर्ग)",
    "filter.ageU14": "अंडर-14 (10-13 वर्ष)",
    "filter.ageU17": "अंडर-17 (14-16 वर्ष)",
    "filter.ageU19": "अंडर-19 (17-19 वर्ष)",
    "filter.districtLabel": "जिला / गांव क्षेत्र",
    "filter.districtPlaceholder": "जिला लिखें (जैसे: रोहतक, पुणे)...",
    "filter.districtHint": "अपने जिले या नजदीकी शहर का नाम लिखें (जीपीएस की जरूरत नहीं)",
    "filter.sortLabel": "क्रमबद्ध करें (सॉर्ट)",
    "filter.sortDefault": "सामान्य क्रम",
    "filter.sortClosing": "जल्द समाप्त होने वाले पहले ⚡",
    "filter.sortAge": "आयु: सबसे कम उम्र पहले",
    "filter.resetBtn": "सभी फ़िल्टर रीसेट करें",
    "empty.title": "आपके फ़िल्टर से मेल खाने वाला कोई अवसर नहीं मिला",
    "empty.desc": "कृपया कुछ फ़िल्टर हटाएं या 'सभी खेल' व 'सभी राज्य' चुनकर खोजें।",
    "empty.savedTitle": "अभी कोई अवसर सेव नहीं किया गया है",
    "empty.savedDesc": "ऑफलाइन देखने के लिए किसी भी अवसर कार्ड पर दिल (❤️) बटन दबाएं।",
    "empty.resetBtn": "सभी फ़िल्टर साफ़ करें",

    // विवरण पेज
    "detail.back": "← अवसरों की सूची पर वापस जाएं",
    "detail.stateDistrict": "राज्य एवं जिला",
    "detail.ageRange": "पात्र आयु सीमा",
    "detail.gender": "लिंग पात्रता",
    "detail.dates": "तारीख सूचना",
    "detail.benefitsTitle": "चयनित खिलाड़ियों को मिलने वाली सुविधाएं (लाभ)",
    "detail.eligibilityTitle": "कौन आवेदन कर सकता है (पात्रता)",
    "detail.docsTitle": "ट्रायल में साथ लाने वाले आवश्यक दस्तावेज",
    "detail.applyTitle": "आवेदन कैसे करें (कदम-दर-कदम)",
    "detail.noticePrefix": "पुष्टि सूचना:",
    "detail.openPortal": "आधिकारिक पोर्टल खोलें",
    "detail.notSelectedTitle": "कोई अवसर चुना नहीं गया",
    "detail.notSelectedDesc": "कृपया अवसर सूची में से किसी एक खेल ट्रायल या योजना को चुनें।",
    "detail.notFoundTitle": "अवसर नहीं मिला",
    "detail.notFoundDesc": "यह अवसर लोड नहीं हो सका। हो सकता है यह स्थानीय मेमोरी से हटा दिया गया हो।",
    "detail.browseBtn": "सभी अवसर देखें",

    // पात्रता जांच पेज
    "el.title": "क्या मैं योग्य हूँ? (4 सवालों की तुरंत जांच)",
    "el.subtitle": "4 आसान सवालों के जवाब दें और तुरंत देखें कि आप किन ट्रायल्स के योग्य हैं।",
    "el.qAge": "1. आपकी आयु क्या है?",
    "el.qAgePlaceholder": "वर्षों में अपनी आयु चुनें...",
    "el.ageHint": "अधिकांश ग्रामीण खेल योजनाएं 10 से 19 वर्ष के छात्रों के लिए होती हैं।",
    "el.qGender": "2. आपका लिंग क्या है?",
    "el.qGenderAny": "कोई भी (लड़के एवं लड़कियां)",
    "el.qState": "3. आप किस राज्य में रहते हैं?",
    "el.qStateAny": "अखिल भारतीय / कोई भी राज्य",
    "el.qSport": "4. आप कौन सा खेल खेलते हैं?",
    "el.qSportAny": "कोई भी खेल दिखाएं",
    "el.checkBtn": "मेरे लिए उपयुक्त ट्रायल्स खोजें",
    "el.resetBtn": "दोबारा शुरू करें",
    "el.ageError": "कृपया पात्रता जांचने से पहले अपनी आयु चुनें।",
    "el.noMatchTitle": "कोई सटीक मेल नहीं मिला",
    "el.noMatchDesc": "अधिक राष्ट्रीय योजनाएं देखने के लिए 'कोई भी खेल' या 'अखिल भारतीय' चुनें।",
    "el.noMatchBtn": "सभी अवसर देखें",

    // संसाधन पेज
    "res.title": "मुफ्त प्रशिक्षण गाइड एवं संसाधन",
    "res.subtitle": "बिना उपकरण के घरेलू अभ्यास, सस्ता देसी पोषण और प्रिंट करने योग्य दस्तावेज चेकलिस्ट।",
    "res.section1Title": "1. बिना उपकरण के घरेलू फिटनेस अभ्यास",
    "res.section1Desc": "अपने शरीर के वजन और गांव के खुले मैदान से गति, पकड़ और स्टैमिना बढ़ाएं।",
    "res.thExercise": "अभ्यास / ड्रिल",
    "res.thSports": "उपयोगी खेल",
    "res.thSets": "सेट और दोहराव",
    "res.thBenefit": "यह कैसे मदद करता है",
    "res.r1Ex": "ढलान / नहर पटरी स्प्रिंट (30मी - 50मी तेज दौड़)",
    "res.r1Sp": "एथलेटिक्स, फुटबॉल, कबड्डी",
    "res.r1Set": "90 सेकंड पैदल आराम के साथ 6 से 8 दौड़",
    "res.r1Ben": "तेज शुरुआत और दौड़ने की रफ्तार बढ़ाता है।",
    "res.r2Ex": "सूर्य नमस्कार एवं दंड (पुश-अप्स)",
    "res.r2Sp": "कुश्ती, तीरंदाजी, हॉकी",
    "res.r2Set": "15 से 20 दोहराव के 4 सेट",
    "res.r2Ben": "कंधों की मजबूती, छाती की ताकत और लचीलापन बढ़ाता है।",
    "res.r3Ex": "गहरी बैठक / मेंढक कूद",
    "res.r3Sp": "कबड्डी, क्रिकेट, खो-खो",
    "res.r3Set": "25 बार के 4 सेट",
    "res.r3Ben": "टैकल, डाइव और तेज गेंदबाजी के लिए पैरों की ताकत बढ़ाता है।",
    "res.r4Ex": "प्लैंक और लेग रेज (कोर अभ्यास)",
    "res.r4Sp": "सभी खेल",
    "res.r4Set": "60 सेकंड के 3 राउंड",
    "res.r4Ben": "पीठ के निचले हिस्से को चोट से बचाता है और संतुलन सुधारता है।",
    "res.r5Ex": "पानी की बाल्टी उठाकर चलना (फार्मर्स वॉक)",
    "res.r5Sp": "कुश्ती, तीरंदाजी, क्रिकेट",
    "res.r5Set": "50 मीटर की 3 चाल",
    "res.r5Ben": "बिना जिम के हाथों की पकड़ और कलाई को मजबूत बनाता है।",

    "res.section2Title": "2. सस्ता और पौष्टिक भारतीय खेल आहार",
    "res.section2Desc": "महंगे सप्लीमेंट के बिना, गांव में उपलब्ध देसी चीजों से मजबूत बनें।",
    "res.n1Label": "ऊर्जा भरा नाश्ता",
    "res.n1Title": "भीगा काला चना + गुड़",
    "res.n1Desc": "रात भर भीगे काले चने लगातार ऊर्जा और आयरन देते हैं; गुड़ स्टैमिना बढ़ाता है और थकान रोकता है।",
    "res.n2Label": "अभ्यास के बाद पेय",
    "res.n2Title": "चना सत्तू शरबत",
    "res.n2Desc": "छाछ या पानी में 3 चम्मच भुना सत्तू और जीरा मिलाकर पिएं; यह मांसपेशियों की मरम्मत के लिए सस्ता प्रोटीन है।",
    "res.n3Label": "दैनिक प्रोटीन",
    "res.n3Title": "उबले अंडे, दाल और घर का दही",
    "res.n3Desc": "उबले अंडे या दाल-रोटी के साथ ताजा दही शाम के अभ्यास के बाद शरीर को ताकत देते हैं।",
    "res.n4Label": "हाइड्रेशन और नमक संतुलन",
    "res.n4Title": "काला नमक वाला नींबू पानी",
    "res.n4Desc": "नींबू पानी में चुटकी भर काला नमक और चीनी पसीने में निकले जरूरी खनिज वापस लाती है।",

    "res.section3Title": "3. जरूरी खेल दस्तावेज चेकलिस्ट",
    "res.section3Desc": "इन 5 जरूरी कागजों को एक वाटरप्रूफ फाइल में हमेशा तैयार रखें ताकि कोई ट्रायल न छूटे।",
    "res.printBtn": "चेकलिस्ट प्रिंट करें (PDF)",
    "res.d1": "1. आधार कार्ड (मूल + 3 फोटोकॉपी): जांचें कि जन्म तिथि आपके स्कूल रिकॉर्ड से मेल खाती हो।",
    "res.d2": "2. आधिकारिक जन्म प्रमाण पत्र: नगर पालिका, अस्पताल या ग्राम पंचायत द्वारा जारी।",
    "res.d3": "3. स्कूल बोनाफाइड या टीसी: प्रधानाचार्य द्वारा हस्ताक्षरित एवं मुहर लगा कक्षा प्रमाण पत्र।",
    "res.d4": "4. मेडिकल फिटनेस प्रमाण पत्र: सरकारी डॉक्टर या सिविल अस्पताल से हस्ताक्षरित।",
    "res.d5": "5. पासपोर्ट साइज फोटो (6 प्रतियां): हल्के बैकग्राउंड में हाल की साफ रंगीन फोटो।",

    // अवसर साझा करें (Submit) पेज
    "sub.title": "ट्रायल साझा करें (पीटीआई शिक्षकों एवं कोचों के लिए)",
    "sub.subtitle": "क्या आप किसी जिला ट्रायल, स्कूल प्रतियोगिता या खेल कैंप के बारे में जानते हैं? छात्रों की मदद के लिए यहां जोड़ें।",
    "sub.formTitle": "खेल अवसर सबमिशन फॉर्म",
    "sub.fieldTitle": "अवसर / ट्रायल का नाम *",
    "sub.phTitle": "जैसे: जिला अंडर-17 कबड्डी चयन ट्रायल",
    "sub.fieldOrg": "आयोजक संस्था या विद्यालय *",
    "sub.phOrg": "जैसे: जिला खेल कार्यालय (DSO)",
    "sub.fieldSport": "खेल *",
    "sub.fieldType": "प्रकार *",
    "sub.fieldState": "राज्य *",
    "sub.fieldDistrict": "जिला / मैदान का पता *",
    "sub.phDistrict": "जैसे: कोल्हापुर जिला स्टेडियम",
    "sub.fieldAgeMin": "न्यूनतम आयु (वर्ष) *",
    "sub.fieldAgeMax": "अधिकतम आयु (वर्ष) *",
    "sub.fieldGender": "लिंग पात्रता *",
    "sub.fieldBenefits": "मुख्य सुविधाएं (हॉस्टल, किट, डाइट, प्रमाण पत्र) *",
    "sub.phBenefits": "जैसे: मुफ्त आवासीय प्रशिक्षण, खेल किट, टूर्नामेंट प्रवेश...",
    "sub.fieldDocs": "जरूरी दस्तावेज *",
    "sub.phDocs": "हर दस्तावेज नई लाइन में लिखें:\nआधार कार्ड\nस्कूल बोनाफाइड प्रमाण पत्र\nमेडिकल प्रमाण पत्र",
    "sub.fieldLink": "आधिकारिक वेबसाइट लिंक (वैकल्पिक)",
    "sub.phLink": "https://...",
    "sub.fieldContact": "आपका नाम एवं पद (वैकल्पिक)",
    "sub.phContact": "जैसे: राजेश पाटिल, पीटीआई शिक्षक, जिला परिषद हाई स्कूल",
    "sub.submitBtn": "अवसर सबमिट करें",
    "sub.successTitle": "ग्रामीण खिलाड़ियों की मदद के लिए धन्यवाद!",
    "sub.successDesc": "आपका ट्रायल इस ब्राउज़र के localStorage में सेव हो गया है और अब अवसर सूची में दिखाई देगा।",
    "sub.viewNewBtn": "अवसर सूची में देखें →",
    "sub.submitAnotherBtn": "एक और अवसर साझा करें",

    // परिचय (About) पेज
    "about.title": "प्रोजेक्ट खेलगांव के बारे में",
    "about.subtitle": "यह पोर्टल क्यों बनाया गया, यह छात्रों की कैसे मदद करता है, और हमारी ईमानदार सीमाएं।",
    "about.cardBadge": "शैक्षणिक प्रोजेक्ट प्रस्तुति",
    "about.cardTerm": "CSE-1003 | प्रथम सेमेस्टर",
    "about.cardNameLabel": "विद्यार्थी का नाम:",
    "about.cardScholarLabel": "स्कॉलर नंबर:",
    "about.cardCourseLabel": "विषय:",
    "about.cardTechLabel": "तकनीक:",
    "about.problemTitle": "वह समस्या जिसका हम समाधान कर रहे हैं",
    "about.problemIntro": "ग्रामीण भारत में अपार खेल प्रतिभा है, फिर भी 14-19 वर्ष के छात्र चार मुख्य बाधाओं के कारण ट्रायल्स से वंचित रह जाते हैं:",
    "about.p1": "बिखरी हुई सूचनाएं: ट्रायल की घोषणाएं 28 राज्य पोर्टलों और लंबे पीडीएफ में छिपी रहती हैं।",
    "about.p2": "केवल अंग्रेजी भाषा: सरकारी फॉर्म और नियम कठिन प्रशासनिक अंग्रेजी में होते हैं।",
    "about.p3": "सस्ते फोन और धीमा इंटरनेट: भारी वेबसाइटें कम क्षमता वाले फोन और 2G/3G पर नहीं खुलतीं।",
    "about.p4": "दलालों से धोखा: जानकारी के अभाव में परिवार कभी-कभी मुफ्त ट्रायल्स के लिए एजेंटों को पैसे दे देते हैं।",
    "about.solutionTitle": "खेलगांव कैसे मदद करता है",
    "about.s1Title": "एक सरल डायरेक्टरी",
    "about.s1Desc": "SAI, खेलो इंडिया, आर्मी बॉयज और राज्य खेल प्राधिकरण की प्रमुख योजनाएं एक तेज पेज पर लाता है।",
    "about.s2Title": "ऑफलाइन काम करता है",
    "about.s2Desc": "Service Worker और localStorage पहली विजिट के बाद अवसरों की सूची ऑफलाइन सुरक्षित रखते हैं।",
    "about.s3Title": "हिंदी और अंग्रेजी विकल्प",
    "about.s3Desc": "एक क्लिक में पूरा नेविगेशन, फ़िल्टर और संसाधन सरल हिंदी में बदल जाते हैं।",
    "about.s4Title": "300 KB से कम व बिना लॉगिन",
    "about.s4Desc": "कोई विज्ञापन नहीं, कोई लॉगिन नहीं, और 360px स्क्रीन के लिए 44px+ बड़े बटन।",
    "about.limitationsTitle": "हमारी सीमाएं एवं ईमानदारी नीति",
    "about.limIntro": "छात्रों को सुरक्षित रखने और गलत जानकारी से बचने के लिए खेलगांव सख्त नियमों का पालन करता है:",
    "about.l1": "छात्र कोर्स प्रोजेक्ट: यह बी.टेक सीएसई प्रथम सेमेस्टर FoCP (CSE-1003) के लिए बनाया गया है, यह कोई सरकारी पोर्टल नहीं है।",
    "about.l2": "कोई नकली तारीख या फोन नंबर नहीं: हर सूची में स्पष्ट लिखा है — 'वर्तमान तारीखों के लिए आधिकारिक वेबसाइट देखें'।",
    "about.l3": "आधिकारिक पुष्टि अनिवार्य: हर कार्ड पर यात्रा करने से पहले आधिकारिक साइट जांचने की सलाह दी गई है।",
    "about.l4": "केवल स्थानीय सेविंग: फॉर्म से जोड़े गए अवसर केवल इसी ब्राउज़र में (बिना किसी सर्वर के) सेव होते हैं।",

    // फुटर
    "footer.desc": "ग्रामीण भारतीय छात्रों और पीटीआई शिक्षकों को असली खेल अवसर खोजने में मदद करने वाला मुफ्त शैक्षणिक पोर्टल।",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.tech": "साधारण HTML5, CSS3 और Vanilla JS | ऑफलाइन PWA"
  }
};

// Active language remembered across pages
let currentLang = localStorage.getItem("khelgaon_lang") || "en";

/**
 * Returns the translated string for a dictionary key in the current language.
 */
function t(key) {
  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  if (translations.en && translations.en[key]) {
    return translations.en[key];
  }
  return key;
}

/**
 * Translates dynamic opportunity metadata values (sport, type, gender, state, deadline)
 * using the translations object when Hindi is active.
 */
function translateDynamicValue(prefix, rawValue) {
  if (!rawValue) return "";
  const key = prefix + "." + rawValue;
  if (translations[currentLang] && translations[currentLang][key]) {
    return translations[currentLang][key];
  }
  return rawValue;
}

/**
 * Applies translations to all elements marked with data-i18n or data-i18n-placeholder,
 * saves the choice, and dispatches languageChanged for dynamic views.
 */
function applyTranslations(lang) {
  if (lang === "en" || lang === "hi") {
    currentLang = lang;
    localStorage.setItem("khelgaon_lang", currentLang);
  }

  document.documentElement.lang = currentLang;

  const textElements = document.querySelectorAll("[data-i18n]");
  textElements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translated = t(key);
    if (translated) {
      el.textContent = translated;
    }
  });

  const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]");
  placeholderElements.forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    const translated = t(key);
    if (translated) {
      el.placeholder = translated;
    }
  });

  const toggleBtn = document.getElementById("lang-toggle-btn");
  if (toggleBtn) {
    toggleBtn.textContent = currentLang === "en" ? "हिंदी" : "English";
    toggleBtn.setAttribute(
      "aria-label",
      currentLang === "en" ? "Switch language to Hindi" : "भाषा अंग्रेजी में बदलें"
    );
  }

  window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: currentLang } }));
}

/**
 * Switches between English and Hindi when the language button is clicked.
 */
function toggleLanguage() {
  const nextLang = currentLang === "en" ? "hi" : "en";
  applyTranslations(nextLang);
}

// Apply saved language as soon as the page DOM loads
document.addEventListener("DOMContentLoaded", () => {
  applyTranslations(currentLang);
  const toggleBtn = document.getElementById("lang-toggle-btn");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleLanguage);
  }
});
