# 🚀 PERSON 1: CORE BACKEND & SCHEME MATCHING ENGINE GUIDE

> **Project:** SchemeMatch AI (SIH26092)  
> **Role:** Person 1 (Database, Scheme Algorithm, XAI & Core REST APIs)  
> **Server Status:** Running on `http://localhost:5000`

---

## 🏗️ Architecture & Component Overview

Person 1's backend subsystem provides the foundational database models, mathematical multi-parameter scoring engine, Explainable AI (XAI) justifications, user profile management, 7-stage application roadmap tracker, and geolocation support center APIs.

```
backend/
├── server.js                        # Express server entry point (Port 5000)
├── package.json                     # Dependencies: express, cors, dotenv, morgan
└── src/
    ├── config/
    │   └── db.js                    # In-Memory datastore with seed data & CRUD methods
    ├── data/
    │   ├── profiles.js              # 4 Pre-loaded demo profiles (Ravi, Priya, Arun, Meena)
    │   ├── schemes.js               # 8 Master Central & State schemes
    │   ├── centers.js               # Nearby MSME Banks & CSC service centers
    │   └── faqs.js                  # Scheme guidelines & FAQs
    ├── services/
    │   ├── matchingEngine.js        # 5-factor weighted algorithm (0-100% score)
    │   └── xaiExplainer.js          # XAI Factor scores & human-readable rationale
    ├── controllers/
    │   ├── authController.js        # Login & Register
    │   ├── profileController.js     # User profile CRUD & Persona switching
    │   ├── schemeController.js      # Schemes list, Matching, & Why-Matched
    │   ├── roadmapController.js     # 7-Stage Application progress tracking
    │   └── centerController.js      # Bank & CSC locator
    └── routes/
        ├── authRoutes.js
        ├── profileRoutes.js
        ├── schemeRoutes.js
        ├── roadmapRoutes.js
        └── centerRoutes.js
```

---

## 📡 REST API Reference & Endpoints

### 1. Health Check
* **`GET /api/health`**
* **Response:**
```json
{
  "status": "healthy",
  "project": "SIH26092 - SchemeMatch AI Backend API",
  "uptime": 12.4
}
```

---

### 2. User & Authentication APIs
* **`POST /api/auth/login`**
  * Body: `{ "email": "ravi@annapoorna.in", "personaId": "ravi" }`
  * Returns user token, profile details, and completion percentages.
* **`POST /api/auth/register`**
  * Body: `{ "name": "Deepak", "email": "deepak@farm.in", "socialCategory": "OBC", "sector": "Food Processing & Agro", "fundingRequired": "₹6.00 Lakh" }`
* **`GET /api/profile`** — Returns all demo profiles.
* **`GET /api/profile/:id`** — Returns profile by ID (`ravi`, `priya`, `arun`, `meena`).
* **`PUT /api/profile/:id`** — Update profile attributes.

---

### 3. Government Scheme & AI Matching APIs
* **`GET /api/schemes`** — Get all 8 government schemes.
* **`POST /api/schemes/match`** (or `GET /api/schemes/match?profileId=ravi`)
  * Runs the **5-Factor Algorithm**:
    1. Sector compatibility (30%)
    2. Social & Gender Affirmative Quotas (25%)
    3. Funding range ceiling check (20%)
    4. Rural/Urban location multiplier (15%)
    5. Enterprise stage & age limits (10%)
  * Returns list of schemes sorted from highest match (`97%`) to lowest.
* **`GET /api/schemes/:id/why-matched?profileId=ravi`**
  * Returns Explainable AI breakdown:
```json
{
  "success": true,
  "data": {
    "schemeId": "pmegp",
    "schemeName": "Prime Minister’s Employment Generation Programme (PMEGP)",
    "factorScores": {
      "sectorMatch": 98,
      "locationMatch": 95,
      "incomeMatch": 92,
      "fundingMatch": 96,
      "stageMatch": 95,
      "categoryMatch": 96
    },
    "whyMatchedReasons": [
      "Target sector (Food Processing & Agro) is directly prioritized under PMEGP.",
      "Rural enterprise location qualifies for the highest capital subsidy band of 35% margin money.",
      "Requested capital (₹5.00 Lakh) falls comfortably within the scheme ceiling.",
      "Affirmative action category (OBC / Rural Youth) entitles you to lowest margin money contribution (5%)."
    ]
  }
}
```

---

### 4. 7-Stage Application Roadmap APIs
* **`GET /api/roadmap/user/:userId`** — Fetch active applications for a user.
* **`POST /api/roadmap`** — Initiate a new scheme application (`{ "userId": "ravi", "schemeId": "pmegp" }`).
* **`PUT /api/roadmap/:id/step`** — Update step progress (`{ "stepNumber": 3, "status": "completed" }`).

---

### 5. Bank & CSC Center Locator APIs
* **`GET /api/centers`** — Get all nearby banks & CSC centers.
* **`GET /api/centers/banks`** — Get lead MSME bank branches.
* **`GET /api/centers/csc`** — Get authorized CSC & E-Sevai Mayyam locations.

---

## 🧪 How to Test with cURL

```bash
# 1. Test Health
curl http://localhost:5000/api/health

# 2. Test Scheme Matching for Ravi
curl -X POST http://localhost:5000/api/schemes/match -H "Content-Type: application/json" -d "{\"sector\":\"Food Processing & Agro\",\"socialCategory\":\"OBC / Rural Youth\",\"locationType\":\"Rural\",\"fundingRequiredNum\":500000}"

# 3. Test XAI Why Matched
curl http://localhost:5000/api/schemes/pmegp/why-matched?profileId=ravi

# 4. Test Nearby Banks
curl http://localhost:5000/api/centers/banks
```
