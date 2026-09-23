# SchemeMatch AI (SIH26092)

> **AI-Driven Government Scheme Matching & Eligibility Explanation Platform for Marginalized and Aspiring Entrepreneurs**  
> *Developed for Smart India Hackathon (SIH)*

---

## 📌 Project Overview

**SchemeMatch AI** is a comprehensive, intelligent platform designed to bridge the awareness and accessibility gap between government welfare/entrepreneurship schemes and prospective beneficiaries. 

Many aspiring entrepreneurs, small business owners, women entrepreneurs, rural artisans, and marginalized communities struggle to navigate complex bureaucratic criteria and find relevant financial assistance programs. **SchemeMatch AI** simplifies this process through:

- **AI-Powered Match Engine**: Evaluates applicant profiles (age, gender, caste/social category, location, business domain, turnover, funding needs) to compute accurate eligibility scores and provide human-friendly explanations.
- **Multilingual Support**: Breaks linguistic barriers with support for multiple Indian regional languages.
- **Document Readiness Checker**: Analyzes required documents, identifies missing files, and guides users on how to acquire them.
- **Step-by-Step Application Roadmap**: Visual, milestone-driven pathway guiding users from scheme discovery and document preparation to application submission and loan/subsidy disbursal.
- **Physical Support & Help Centers**: Geolocation and directory of nearby Common Service Centres (CSCs), MSME Development Institutes, and facilitation centers.
- **Dedicated Admin Portal**: Executive governance console for policy officials to monitor impact analytics, marginalized inclusion metrics, and dynamically manage scheme parameters.

---

## 💡 Core Value Proposition

> *“We don’t just help users **FIND** government schemes. We help them **UNDERSTAND** eligibility, **CHECK** financial suitability, **KNOW** what documents they need, **FIND** where to apply, and **TAKE ACTION**.”*

---

## ✨ Key Features

- 🎯 **Intelligent Recommendations**: Personalized scheme matching with transparency on eligibility criteria.
- 🔍 **Scheme Finder & Explorer**: Search and filter through diverse central and state government schemes (e.g., PMEGP, Mudra Yojana, Stand-Up India, PM-SVANidhi, PM Vishwakarma).
- 📋 **Document Preparation Checklist**: Real-time readiness scoring and validation guidelines for official documents.
- 🗺️ **Interactive Application Roadmap**: Clear timeline and milestones from submission to sanctioning.
- 🏢 **Help Centers & Support**: Offline center finder, interactive FAQs, and guidance.
- 🌐 **Localization & Multilingual UI**: Accessible interface tailored for diverse users across India with voice support.
- 🏛️ **Government Official Console**: Administrative dashboard with 3 macro impact graphs and live scheme CRUD management.

---

## 🏆 Strengths of the Project

1. **Explainable AI & Transparent Scoring (Zero Black-Box)**:
   - Eliminates arbitrary AI decisions by using a deterministic rule graph and multi-factor weighted scoring matrix (Sector, Income, Location, Demographics, Capital).
   - Generates plain-language explanations of why an applicant qualifies or what specific criteria they miss.
2. **Comprehensive 14-Step End-to-End Decision Pipeline**:
   - Covers every stage from multi-lingual voice/text input to knowledge retrieval (RAG), status classification, OCR document readiness checks, financial EMI feasibility, and official portal linking (JanSamarth, KVIC, Udyam).
3. **Multilingual & Voice Accessibility**:
   - Features real-time voice synthesis and support for regional Indian languages (Hindi, Tamil, Kannada, Malayalam, Telugu, English) to empower semi-literate and rural beneficiaries.
4. **Targeted Social Inclusion & Equity Focus**:
   - Prioritizes affirmative policies for Women entrepreneurs, SC/ST categories, OBCs, and rural micro-enterprises with automated margin-money and capital subsidy calculations (up to 35%).
5. **Dual-Portal Architecture (Entrepreneur & Government Admin)**:
   - Completely separates beneficiary self-service from policymaker administration. Admins can track demographic trends, monitor Lead Bank sanctions, and update scheme parameters without code deployments.

---

## ⚠️ Weaknesses & Mitigation Roadmap

| Current Limitation / Weakness | Impact | Mitigation Strategy / Planned Solution |
| :--- | :--- | :--- |
| **1. Third-Party Portal Integration Dependency** | Requires live production API keys and MOU clearance with ministry portals (JanSamarth, KVIC, Udyam). | Built with modular REST endpoints and fallback mock data schemas ready for immediate live webhook and API gateway linkage. |
| **2. Physical & Vernacular Document OCR Variability** | Handwritten certificates or damaged local stamp-paper certificates may result in lower OCR confidence. | Implement a hybrid verification model combining high-accuracy OCR extraction with Common Service Centre (CSC) facilitator attestation. |
| **3. Offline / Low-Bandwidth Rural Connectivity** | Remote village artisans in low-connectivity areas may experience latency during voice processing. | Adopt Progressive Web App (PWA) offline caching, local rule-engine evaluation, and SMS/IVR conversational fallback channels. |
| **4. Real-time Credit Bureau (CIBIL) & Banking Data Linkage** | Currently relies on user-declared income and turnover without direct credit score pulls. | Integrate with the RBI-regulated Account Aggregator (AA) framework for consent-driven instant bank statement and credit checks. |

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Build Tool / Bundler**: Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Routing**: React Router DOM (v7)
- **Icons & Visuals**: Lucide React, Canvas Confetti
- **Language & Environment**: JavaScript (ES Modules), Node.js

---

## 🚀 Getting Started & Run Commands

Follow these steps to set up and run the project locally on your machine.

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended) and `npm`.

Verify installation:
```bash
node -v
npm -v
```

### 2. Installation
Clone the repository and install dependencies:

```bash
# Clone the repository (if applicable)
git clone <repository-url>
cd sih26092

# Install dependencies
npm install
```

### 3. Running the Development Server
Start the Vite local development server:

```bash
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:5173/
```

---

## 🔑 Login Credentials

| Role | User ID / Email | Password | Access Route |
| :--- | :--- | :--- | :--- |
| **Government Admin** | `admin@123` | `admin123` | `/admin` |
| **Demo Entrepreneur** | *1-Click Demo Personas* (or `demo@schemematch.ai`) | `demo123` | `/dashboard` |

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server with Hot Module Replacement (HMR). Default port: `5173`. |
| `npm run build` | Bundles and optimizes the application for production inside the `dist/` directory. |
| `npm run preview` | Locally preview the production build after running `npm run build`. |

---

## 📁 Project Structure

```text
sih26092/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and design assets
│   ├── components/         # Reusable UI components
│   │   ├── common/         # Architecture pipeline modal, badges, toast notifications
│   │   ├── layout/         # Navbar, Sidebar, Footer, Layout wrapper
│   │   └── schemes/        # Scheme cards, filters, and comparisons
│   ├── context/            # Global React Context (AppContext, Scheme CRUD, State management)
│   ├── data/               # Mock schemes, profiles, documents, FAQs, translations
│   ├── pages/              # Main application pages
│   │   ├── Admin.jsx       # Standalone Government Admin Console
│   │   ├── Dashboard.jsx   # Entrepreneur Dashboard
│   │   ├── SchemeFinder.jsx
│   │   ├── Recommendations.jsx
│   │   ├── SchemeDetails.jsx
│   │   ├── DocumentCheck.jsx
│   │   ├── ApplicationRoadmap.jsx
│   │   ├── Support.jsx
│   │   ├── Profile.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── utils/              # Voice synthesis & calculation logic
│   ├── App.jsx             # Route definitions and layout assembly
│   ├── main.jsx            # React root entrypoint
│   └── index.css           # Tailwind CSS directives & global styling
├── index.html              # HTML template
├── package.json            # Project dependencies and npm scripts
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite build configuration
```

---

## 👥 Hackathon Submission

- **Problem Statement Code**: SIH26092
- **Platform**: SchemeMatch AI
- **Ministry / Department**: Ministry of MSME & Department of Financial Services

---

## 📹 Smart India Hackathon (SIH) Video Demonstration Guide & Scripts

> **Target Video Duration**: 3 - 5 Minutes  
> **Target Audience**: SIH Evaluators, Ministry Officials, Jury Members, & Incubators  
> **Core Theme**: Explainable AI Government Scheme Matching, Multilingual Voice Accessibility, Document Readiness, & End-to-End Application Roadmap.

---

### ⚡ Quick Start: How to Open & Run the Web Application

Follow these steps before starting your screen recording:

1. **Open Terminal / Command Prompt** inside the project directory:
   ```bash
   cd sih26092
   ```
2. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```
3. **Start the local server**:
   ```bash
   npm run dev
   ```
4. **Open in your Browser**:
   Navigate to:
   ```text
   http://localhost:5173/
   ```

> [!TIP]
> **Recommended Setup**: Use Google Chrome or Microsoft Edge in full-screen (`F11`) with 100% zoom. Ensure system audio recording is turned on in OBS / Loom so the AI voice synthesis sounds crisp in the video.

---

### 🌐 How Language Changing & Multilingual Voice Works (Step-by-Step)

| Step | Action on Screen | System Reaction |
| :--- | :--- | :--- |
| **1. Open Language Selector** | Click the **Globe Icon (🌐)** located on the top right Navbar next to the Search bar. | Opens a dropdown listing all 6 supported Indian languages with native scripts: **English, हिंदी (Hindi), தமிழ் (Tamil), ಕನ್ನಡ (Kannada), മലയാളം (Malayalam), తెలుగు (Telugu)**. |
| **2. Switch Language** | Click on any language (e.g., **हिंदी** or **தமிழ்**). | **Instant Zero-Reload Translation**: The entire UI (navigation links, hero greeting, scheme cards, tags, subsidy rates, and roadmap steps) translates instantly. |
| **3. AI Voice Scheme Advisor (TTS)** | Click the **"AI Voice Scheme Advisor"** button or the **Speaker Icon (🔊)** on any scheme card. | The platform uses Web Speech synthesis configured with the respective Indian accent (e.g., `hi-IN`, `ta-IN`) to speak the scheme criteria and subsidy details aloud. |
| **4. Regional Voice Search** | Click the **Microphone Icon (🎙️)** inside the search bar and speak. | Real-time speech-to-text transcribes regional phrases (e.g., *"महिला लोन"* or *"मुद्रा योजना"*) and triggers filtered recommendations. |

---

## 📽️ PART 1: Interface & Screen Recording Script (What to Show & Click)

Use this guide while recording your screen. Follow each action sequentially:

```text
====================================================================================================
SCENE 1 [0:00 - 0:35] : LOGIN / LANDING & PROBLEM STATEMENT
====================================================================================================
1. Screen: Open http://localhost:5173/ (Login Page).
2. Action: Hover over the SIH header banner ("SchemeMatch AI · SIH26092").
3. Action: Hover over the "1-Click Demo Personas" (Priya Sharma, Rajesh Kumar, Suresh Patel).
4. Action: Click on "Priya Sharma (Female Urban Baker)" to log in instantly.

====================================================================================================
SCENE 2 [0:35 - 1:10] : ENTREPRENEUR DASHBOARD & DYNAMIC RE-CALCULATION
====================================================================================================
1. Screen: Land on Dashboard (/dashboard).
2. Action: Hover over the dynamic match banner: "We identified 3 matching schemes with capital subsidies up to 35%".
3. Action: Point cursor to the Profile Score badge ("88% Profile Readiness · Verified").
4. Action: Scroll down to the Scheme Cards (e.g., PMEGP with 96% match, Mudra with 89% match).
5. Action: Click the "Switch Demo Persona" dropdown in the top navbar and choose "Rajesh Kumar (SC Rural Artisan)".
6. Visual Cue: Show how the matching score, margin money calculation, and prioritized schemes dynamically re-calculate in real time.

====================================================================================================
SCENE 3 [1:10 - 1:50] : MULTILINGUAL TRANSLATION & AI VOICE SYNTHESIS
====================================================================================================
1. Screen: Top navigation bar on Dashboard.
2. Action: Click the Globe Icon (🌐).
3. Action: Select "हिंदी (Hindi)".
4. Visual Cue: Show the hero banner, sidebar navigation, buttons, and scheme cards instantly change to Hindi.
5. Action: Click the "AI Voice Scheme Advisor" button (or the 🔊 Speaker icon on the PMEGP card).
6. Audio Cue: Let the browser speak 3-4 seconds of Hindi voice synthesis.
7. Action: Click the Globe Icon again and select "தமிழ் (Tamil)" or "తెలుగు (Telugu)" to show multi-state regional capability.
8. Action: Switch back to "English" for the remainder of the demo.

====================================================================================================
SCENE 4 [1:50 - 2:30] : EXPLAINABLE AI & SCHEME FINDER (ZERO BLACK-BOX)
====================================================================================================
1. Screen: Click "AI Scheme Finder" in the sidebar navigation.
2. Action: Click the "Why Matched?" button on the highest-ranking scheme card (PMEGP).
3. Visual Cue: The Explainable AI Modal opens, showcasing the exact scoring breakdown:
   - Sector Alignment (Food/Manufacturing)
   - Demographic Affirmative Weightage (Women / SC-ST / OBC)
   - Project Capital & Margin Money Subsidy calculation
4. Action: Click on "14-Step Architecture Pipeline" button to display the end-to-end deterministic RAG decision workflow modal.
5. Action: Close the modal.

====================================================================================================
SCENE 5 [2:30 - 3:05] : DOCUMENT READINESS CHECKER & MISSING DOC GUIDANCE
====================================================================================================
1. Screen: Click "Documents" in the sidebar navigation (/document-check).
2. Action: Show the Overall Readiness Gauge (e.g., 78% Ready).
3. Action: Point to verified documents with green badges (Aadhaar, PAN).
4. Action: Click on a pending/missing document card (e.g., Detailed Project Report - DPR or Caste Certificate).
5. Visual Cue: Expand the step-by-step resolution guide explaining how to create a DPR or get the certificate.
6. Action: Click "Find Nearest CSC Center" to show the Common Service Centre locator modal with address & distance.

====================================================================================================
SCENE 6 [3:05 - 3:40] : INTERACTIVE APPLICATION ROADMAP & OFFICIAL PORTAL INTEGRATION
====================================================================================================
1. Screen: Click "Application Roadmap" in the sidebar navigation (/application-roadmap).
2. Action: Walk through the 5 visual milestones:
   - Milestone 1: Eligibility & Profile Verification (Completed)
   - Milestone 2: Document Compilation (In Progress)
   - Milestone 3: Official JanSamarth / KVIC Portal Submission
   - Milestone 4: Lead Bank Credit Appraisal & Sanction
   - Milestone 5: Capital Subsidy Disbursal
3. Action: Hover over the external portal integration buttons ("Apply on JanSamarth", "Udyam Portal", "KVIC Online").

====================================================================================================
SCENE 7 [3:40 - 4:15] : GOVERNMENT OFFICIAL CONSOLE & CONCLUSION
====================================================================================================
1. Screen: Log out or navigate directly to /admin (Login: admin@123 / admin123).
2. Action: Show the Government Official Administrative Console.
3. Visual Cue: Highlight the 3 macro analytics cards:
   - Marginalized Group Inclusion Ratio (Women %, SC/ST %, Rural %)
   - Sanction Rate & Subsidy Disbursal Heatmap
   - Scheme Application Trends
4. Action: Scroll to the Live Scheme CRUD Manager (show how admins can update subsidy % or income limits without writing code).
5. Screen: Return to main landing slide/hero banner for closing remarks.
```

---

## 🎙️ PART 2: Spoken Voiceover Script (Exact Words to Speak)

Read this script aloud while matching the screen actions from Part 1.

```text
====================================================================================================
[0:00 - 0:35] INTRODUCTION & PROBLEM STATEMENT
====================================================================================================
"Respected judges, evaluators, and jury members, welcome to our presentation for Problem Statement 
SIH26092.

In India today, the central and state governments offer hundreds of impactful MSME and welfare schemes. 
Yet, over 70% of aspiring entrepreneurs—especially women, rural artisans, and marginalized 
communities—struggle to benefit due to three fundamental barriers: complex bureaucratic eligibility 
criteria, linguistic exclusion, and incomplete document readiness.

To solve this, we built SchemeMatch AI—an intelligent, 100% explainable, and multilingual government 
scheme matching engine that guides beneficiaries from initial discovery to final subsidy disbursal."


====================================================================================================
[0:35 - 1:10] PERSONA EVALUATION & DYNAMIC RE-CALCULATION
====================================================================================================
"Let's see how the platform works. Instead of filling out lengthy, confusing forms, users can log in 
or select tailored demographic personas.

Here, we log in as Priya Sharma, an aspiring woman entrepreneur running an urban bakery. SchemeMatch AI 
instantly processes her business domain, capital requirements, and location against the national scheme 
database.

Notice the hero banner: it highlights that Priya is eligible for up to a 35% capital subsidy under 
PMEGP, with an overall 96% match score. 

If we switch personas to Rajesh Kumar, a rural artisan from an SC category, our deterministic rule engine 
instantly re-evaluates the criteria in real time without reloading the page—recalculating higher rural 
subsidies and affirmative weightage."


====================================================================================================
[1:10 - 1:50] MULTILINGUAL CAPABILITY & AI VOICE SYNTHESIS
====================================================================================================
"Language should never be a barrier to financial empowerment. With SchemeMatch AI, users can change 
the language at any moment using our top navigation switcher.

With a single click on 'Hindi', the entire platform—from navigation and dashboard cards to subsidy rules 
and application steps—translates instantly without page reloads. We support 6 major Indian languages: 
English, Hindi, Tamil, Kannada, Malayalam, and Telugu.

Even better, for semi-literate or rural entrepreneurs, our integrated AI Voice Scheme Advisor reads out 
eligibility rules and margin money breakdowns using natural Indian voice synthesis. [Play 2-3 sec of audio]. 
Users can also search schemes simply by speaking into the microphone."


====================================================================================================
[1:50 - 2:30] EXPLAINABLE AI & ZERO BLACK-BOX MATCHING
====================================================================================================
"A critical innovation in SchemeMatch AI is complete explainability. Most AI platforms give arbitrary 
black-box scores. When our user clicks 'Why Matched?', our platform provides a crystal-clear, transparent 
breakdown.

It shows the applicant exactly how their sector, gender, caste category, and capital needs contributed 
to their score, and explains why they qualify for specific margin money subsidies.

Furthermore, our transparent 14-Step Decision Pipeline maps the entire data flow—from multi-lingual 
input and RAG document retrieval to status classification and Lead Bank validation."


====================================================================================================
[2:30 - 3:05] DOCUMENT READINESS & CSC FACILITATION
====================================================================================================
"Application rejections often happen at the bank level due to missing documentation. Under our 
'Documents' module, SchemeMatch AI provides an automated Document Readiness Score.

While basic IDs like Aadhaar and PAN are verified, the system identifies missing critical items, such as 
a Detailed Project Report or Caste Certificate. For every missing document, it provides actionable steps 
on how to acquire it, and links users to the nearest physical Common Service Centre with geolocation 
and contact details for offline assistance."


====================================================================================================
[3:05 - 3:40] STEP-BY-STEP APPLICATION ROADMAP & PORTAL LINKAGE
====================================================================================================
"Once ready, SchemeMatch AI takes the user through an interactive, milestone-driven Application Roadmap. 

It breaks down the complex journey into 5 clear stages: from eligibility check and document preparation 
to one-click direct application on national portals like JanSamarth, KVIC, or Udyam, followed by Lead Bank 
credit appraisal and subsidy disbursement. This eliminates agent middlemen and confusion."


====================================================================================================
[3:40 - 4:15] GOVERNMENT ADMIN CONSOLE & CONCLUSION
====================================================================================================
"Finally, for ministry officials and policymakers, our platform provides a dedicated Government Admin 
Console. Administrators can track macro analytics in real time—monitoring female entrepreneur participation, 
SC/ST affirmative inclusion rates, and district-level fund disbursals. 

Admins can also dynamically update scheme parameters and subsidy caps with zero code deployments.

SchemeMatch AI bridges policy with people—making government welfare transparent, accessible, and 
actionable for every Indian entrepreneur. Thank you!"
```

---

### 📋 Video Recording Checklist for SIH Submission

- [ ] Local server running at `http://localhost:5173/`
- [ ] Screen recorder set to 1080p, 60fps (OBS / Loom / Windows Game Bar)
- [ ] Microphone tested and background noise suppression enabled
- [ ] System audio enabled in recorder (so AI Voice Advisor sound is audible)
- [ ] F11 Full-Screen mode enabled in browser
- [ ] Demo personas tested (Priya Sharma, Rajesh Kumar)
- [ ] Language switch to Hindi/Tamil tested with voice synthesis


