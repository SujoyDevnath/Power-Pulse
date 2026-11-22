# ⚡ PowerPulse: The Beginner & Non-Coder Bedtime Story Architecture Guide
> *"How a Smart City Protects its Electricity Grid — Explained so simply that even a child can understand it overnight while sleeping."*

---

## 📖 Chapter 1: The Tale of the Dark City & The Four Heroes

Imagine a bustling mega-city named **Dhaka**. At night, millions of lights, refrigerators, fans, and computers hum happily. 

Suddenly... **SNAP!** A transformer on Road 4 sparks and shuts down! Half a neighborhood goes pitch dark.

In the old days, people had to dial a busy telephone call-center for hours, screaming: *"Where is my electricity?!"* Nobody knew if it was just one burnt fuse in one house or a giant blackout affecting 50,000 people.

**PowerPulse** was created to change this forever. It turns the entire city into an intelligent team of **Four Heroes**:

```
                       👑 ADMIN (The Mission Commander)
                                      ▲
                                      │ (Dispatches Work Orders)
                                      ▼
🧑‍🤝‍🧑 CITIZENS   ────►   🧠 DETECTIVE ROBOT   ────►   🔧 TECHNICIANS
(The Spotters)        (Confidence Scoring AI)           (The Fixers)
      ▲
      │
      └────── 📟 SMART METERS (The Quiet IoT Whistleblowers)
```

1. **The Spotters (Citizens / Consumers):** When lights go out, they tap one big red button on their phone.
2. **The Detective Robot (Confidence Algorithm):** It double-checks every report. Did 5 neighbors report it at once? Did the Smart Meter also go dead? If yes, it sounds the alarm!
3. **The Fixers (Field Technicians):** Their phone rings with a GPS map: *"Go to Road 4, Transformer #12!"*
4. **The Mission Commander (Admin):** Sitting in the command center watching live charts, scheduled maintenance, and city-wide power health.

---

## 🗺️ Chapter 2: The Map of the Kingdom (Project Directory Structure)

Everything in the project is organized into neat, independent compartments. You never have to hunt through a maze!

```
PowerPulse-main/
│
├── 🧠 backend/                     # The Brain (Node.js + Express API)
│   ├── server.js                  # The Main Switchboard (starts the server)
│   ├── src/
│   │   ├── config/db.js           # The Memory Vault (SQLite Database)
│   │   ├── services/
│   │   │   ├── confidence.js      # 🧠 The Detective Robot Algorithm
│   │   │   └── outageService.js   # ⚡ The Outage Lifecycle & Rules Engine
│   │   ├── controllers/           # The Doers (Processes requests)
│   │   │   ├── authController.js  # Checks passwords & IDs
│   │   │   ├── reportController.js# Receives citizen OFF/BACK signals
│   │   │   ├── complaintController# Manages repair tickets
│   │   │   └── technicianController# Assigns electricians
│   │   ├── routes/                # The Doors / URLs (/api/reports, /api/auth)
│   │   └── scripts/
│   │       ├── seed.js            # Fills database with sample Dhaka data
│   │       └── simulate.js        # Automated algorithm test playground
│
└── 💻 web/                         # The Face (React 19 + Vite Frontend)
    └── src/
        ├── App.jsx                # The Traffic Cop (Routes to correct pages)
        ├── context/AuthContext.jsx# Remembers who is currently logged in
        ├── components/            # Shared building blocks (Navbar, Badges, Modals)
        ├── features/consumer/     # 🧩 Modular Consumer Widgets
        │   └── components/
        │       ├── OutageReportingCard.jsx  # Red/Green status & Big buttons
        │       ├── ComplaintFilingCard.jsx  # Form for sparks, loose wires
        │       ├── PlannedOutagesCard.jsx   # Load-shedding schedule
        │       ├── ComplaintHistoryCard.jsx # Tracking repair tickets
        │       ├── SmartMeterCard.jsx       # Energy usage counter (kWh)
        │       └── BillPaymentModal.jsx     # bKash/Nagad mock payment
        └── pages/                 # Full Page Views (Admin, Tech, Consumer)
```

---

## 🧩 Chapter 3: Feature-by-Feature Deep Dive

Let's look at each of the 6 core features one by one:

---

### Feature 1: 🔐 The Gatekeeper (Authentication & User Roles)
* **What is it?** Ensures that only verified citizens, technicians, and admins can enter their respective rooms.
* **Child Analogy:** Like a school badge. A student badge opens the classroom, a teacher badge opens the staff room, and the principal's master key opens every door!
* **Key Files:**
  - Backend: `backend/src/controllers/authController.js`
  - Backend Guard: `backend/src/middleware/role.js`
  - Frontend: `web/src/context/AuthContext.jsx` & `web/src/components/ProtectedRoute.jsx`
* **How it Works:**
  1. User enters Email & Password on `/login`.
  2. The server compares passwords using **Bcrypt salt-hashing** (so nobody can steal passwords even if they peek at the database).
  3. If correct, it issues a digital VIP wristband called a **JWT Token**.

---

### Feature 2: ⚡ The City Radar (Citizen One-Tap Outage Reporting)
* **What is it?** Citizens can report electricity loss (`OFF`) or electricity return (`BACK`) with a single click.
* **Child Analogy:** Like shouting *"Goal!"* in a soccer stadium. One person shouting might be a mistake, but when 20 people shout together, everyone knows a goal was scored!
* **Key Files:**
  - Frontend Widget: `web/src/features/consumer/components/OutageReportingCard.jsx`
  - Backend Controller: `backend/src/controllers/reportController.js`
  - Backend Storage: `reports` table in SQLite
* **How it Works:**
  1. Citizen clicks **"Report Electricity OFF"**.
  2. The system checks:
     - Has this person submitted 5 times in the last 60 seconds? &rarr; **FLAGGED AS SPAM!**
     - Did they report 2 minutes ago? &rarr; **FLAGGED AS DUPLICATE!**
  3. If valid, the signal is immediately handed over to the **Confidence Detective Robot**.

---

### Feature 3: 🧠 The Detective Robot (Confidence Scoring Algorithm)
* **What is it?** A smart mathematical formula that calculates a score from **0% to 100%** to separate real power failures from fake pranks.
* **Child Analogy:** A detective looking for clues at a crime scene:
  - *Clue 1 (Number of reports):* Are there many reports? (+3 points each, max 30).
  - *Clue 2 (Different people):* Are they different neighbors, or just one kid spamming the button? (+8 points each unique neighbor, max 40).
  - *Clue 3 (Time burst):* Did all reports happen within 10 minutes of each other? (+20 points).
  - *Clue 4 (Reputation):* Has this citizen given truthful reports in the past? (+10 points).
  - *Penalties:* Spammers lose 10 points!
* **The Golden Rules:**
  $$\text{Confidence Score} = \text{ReportFactor} + \text{UniqueUserFactor} + \text{TimeClusterFactor} + \text{ReliabilityFactor} - \text{Penalty}$$
  - **Score $\ge 40\%$ AND $\ge 2$ different citizens:** Automatic **INCIDENT CREATED**!
  - **Only 1 person reported:** **REJECTED** as an unconfirmed single report (no false alarm dispatched!).
* **Key Files:**
  - Algorithm Code: `backend/src/services/confidence.js`
  - Incident Engine: `backend/src/services/outageService.js`
  - Automated Verification: `backend/src/scripts/simulate.js`

---

### Feature 4: 🚨 The Auto-Healing Trigger (Power Restored / BACK Reports)
* **What is it?** How does the system know when the lights are back on?
* **Child Analogy:** When the power returns, fans start spinning and lights glow. Neighbors tap **"Report Electricity BACK"**.
* **Key Files:**
  - `backend/src/services/outageService.js` (`processBackReport` method)
* **How it Works:**
  1. When at least **2 distinct neighbors** report `BACK` within 15 minutes:
  2. The incident is automatically marked as **RESTORED**.
  3. The system calculates the exact outage duration (e.g., *"Power was out for 42 minutes"*).
  4. The good citizens who helped report get a **+0.02 Trust Reward** added to their reliability score!

---

### Feature 5: 🔧 The Electricians on Wheels (Field Technician Portal)
* **What is it?** A mobile-friendly dashboard for electricians out in the city.
* **Child Analogy:** Like an ambulance or fire truck dispatcher. When a transformer breaks, the nearest technician gets a work ticket with the exact address and phone number of the citizen.
* **Key Files:**
  - Frontend View: `web/src/pages/TechnicianDashboard.jsx` & `TechnicianTaskDetail.jsx`
  - Backend: `backend/src/controllers/technicianController.js`
* **Lifecycle of a Work Ticket:**
  $$\text{Assigned} \longrightarrow \text{In Progress} \longrightarrow \text{Work Done} \longrightarrow \text{Resolved}$$

---

### Feature 6: 📟 The Magic Meter & Pocket Money (Smart Meter IoT & Billing)
* **What is it?** Real-time electricity usage tracker and simulated bKash/Nagad bill payment.
* **Child Analogy:** Think of the Smart Meter as an electric piggy bank. It measures how much electricity your TV and AC drink, calculates your bill, and lets you pay with toy money (bKash/Nagad mock) so your balance stays clean!
* **Key Files:**
  - Frontend Widgets: `web/src/features/consumer/components/SmartMeterCard.jsx` & `BillPaymentModal.jsx`
  - Backend: `backend/src/controllers/meterController.js` & `backend/src/routes/billRoutes.js`

---

## 🚀 Chapter 4: How a Single Click Travels (End-to-End Journey)

Here is what happens in less than **100 milliseconds** when a user clicks **"Report Electricity OFF"**:

```
[ Citizen's Finger ]
        │
        ▼ (Taps "Report OFF" button)
[ OutageReportingCard.jsx ]
        │
        ▼ (Sends HTTP POST /api/reports with location_id & user token)
[ reportController.js ]
        │
        ├─► Is this user spamming? No!
        ├─► Is this a duplicate? No!
        ▼
[ Database (reports table) ] ── (Saves the report record)
        │
        ▼ (Hands over to OutageService.processReport)
[ confidence.js ]
        │
        ├─► Evaluates: 4 neighbors reported in Dhanmondi within 6 minutes.
        ├─► Score = 12 (reports) + 32 (users) + 20 (time cluster) + 8 (trust) = 72%
        ▼
[ outageService.js ]
        │
        ├─► Score 72% >= 40% & unique users (4) >= 2? YES!
        ▼
[ Database (incidents table) ] ── (Creates Incident #4: Status = OPEN, Class = PROBABLE)
        │
        ▼
[ Admin Dashboard & Technicians ] ── (Receive instant alert of new live incident!)
```

---

## 📚 Technical Dictionary (In Plain English)

| Fancy Term | Plain English Meaning |
| :--- | :--- |
| **Modular Code** | Like LEGO bricks. Instead of building a house out of one giant unbendable rock, you build it with neat little bricks that can be easily replaced or understood on their own. |
| **Component** | A small reusable piece of UI (e.g., a Button, a Card, a Modal). |
| **Controller** | The chef in a restaurant kitchen. It takes the customer's order, prepares the data, and returns the cooked dish. |
| **Route** | The street address on the web (like `/api/reports`). |
| **Confidence Score** | A detective score from 0 to 100 representing how certain the computer is that an outage is really happening. |
| **SQLite** | A fast, lightweight database stored directly in a single local file (`powerpulse.db`). |
| **JWT Token** | A secure digital passport stored in your browser so you don't have to retype your password on every single click. |

---

*Authored for PROG 212 AWAD evaluation & project defense.*  
*All rights reserved — PowerPulse Team.*
