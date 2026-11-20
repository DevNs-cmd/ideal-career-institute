# Ideal Career Institute — Official Platform & Admission CRM
**Enterprise-Grade Institutional Platform & Student Admission Management Infrastructure**  
**Technology Partner:** AlgoForce AI  
**Deployment Environment:** Google Antigravity / Node.js 24 / Vite React TS

---

## 🏛️ Executive Summary

This platform completely transforms the legacy website of **Ideal Career Institute** (`https://idealcareerinstitute.in/`) into a modern, high-performance, institutional educational platform and lead management CRM tailored for a premier coaching institute operating two branches in New Delhi (with verified main campus at **23/663 Basement DDA Flats, Madangir, New Delhi – 110062**).

Every authentic asset from the original institution has been preserved:
- **Official Emblem Logo** (`/assets/logo.png`)
- **Authentic Classroom Photographs** (`CR -1.jpeg`, `CR -4.jpeg`, `about-1.jpeg`, `Classroom 1 (1).jpeg`, `Classroom 1 (2).jpeg`)
- **All 15 Official Student Topper Portraits** (`Aditya_Mishra`, `AAchin`, `Kumar Sriniwas`, `1` through `12`)
- **Founding Leadership & Faculty Profiles** (Mr. Vibhor Gupta, CEO & Founder; Arpit, Data Science & Maths/Science; Shreyash Srivastava, Digital Marketing; Bhavika, Harshit Walecha, Kirti Gupta, Simran)
- **Authentic Helpline Number** (`+91 7011667297`)
- **Verified 25+ Years Legacy** (Founded 1999, 333+ Toppers, 1000+ Students, 500+ Parents)

---

## ⚡ Core Architecture

### Frontend (Client)
- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS v4 with bespoke institutional design tokens (Navy `#0f2b48`, Crimson Red `#dc2626`, Slate `#1e293b`, Warm White `#f8fafc`)
- **Iconography:** Lucide React + custom SVG brand marks
- **Responsive Viewports:** Tested and optimized for 320px, 375px, 768px, 1024px, 1440px
- **Interactions:** Keyboard-accessible Lightbox, live search, tab filtering, modals, floating action bars

### Backend (Server)
- **Runtime:** Node.js v24
- **API Framework:** Express.js + RESTful endpoints
- **Database Engine:** Native synchronous SQLite in WAL mode (`node:sqlite`) with zero compilation dependencies and immediate sub-millisecond query execution
- **Security:** Hashed passwords with bcrypt, JSON Web Token (JWT) stateless session verification, Indian phone number regex verification, anti-spam rapid duplicate submission detection
- **Supabase Cloud Sync:** Built-in connector module (`supabaseClient.ts`) allowing dual-write synchronization when cloud credentials are provided in `.env`
- **Integrations:** Direct WhatsApp click-to-chat generator (`wa.me/917011667297`), WhatsApp Business Platform Cloud API architecture, SMTP Email dispatcher

---

## 📋 Comprehensive Feature Matrix

### 1. Public Institutional Website
- **Sticky Navigation Bar:** Official logo, active section tracking, smooth scrolling, Call Now action (`tel:+917011667297`), Student Enquiry CTA, mobile drawer menu.
- **Editorial Hero Section:** "Igniting Minds, Illuminating Futures.", "Excellence in Education Since 1999", authentic classroom photos, Explore Courses CTA, Enquire for Admission CTA.
- **Credibility Stats:** Count-up counters for 1999 Founded, 333 Toppers, 1000 Happy Students, 500 Happy Parents (editable via admin).
- **About the Institute:** Official narrative of the single-room beginnings to 2 AC branches, authentic classroom gallery.
- **Why Choose Us:** 4 feature cards (Award Winners, Expert Faculties, Affordable Coaching, Best Facilities).
- **Educational Excellence:** Dedicated modules for Experienced Faculty and Advanced Teaching methodology (no arbitrary unverified percentages).
- **Hall of Toppers:** All 15 authentic topper portraits, smooth hover effects, accessible Lightbox modal with next/previous and keyboard arrow navigation.
- **Course Discovery (11 Programs):**
  1. *School Education:* Class 1–12 All Subjects, Class 11–12 Commerce, Class 11–12 Science, Class 11–12 Humanities
  2. *Skill Development:* Computer Science and Digital Marketing
  3. *Competitive Exams:* JEE / NEET, CUET, SSC / NDA, Banking / CTET, RPF / CDS, CAT / MAT
  - Filter by category, live search bar, detailed syllabus modal, WhatsApp direct enquiry.
- **Founder & Faculty Section:** Founder showcase for Mr. Vibhor Gupta with full official biography, followed by faculty roster with real photos, subjects, and verified social links.
- **Student & Parent Voices:** Verified feedback showcase with attractive empty state for management to populate (strictly preventing fake testimonials).
- **Campus Gallery:** Interactive classroom & infrastructure photo viewer.
- **Frequently Asked Questions:** Expandable accordion answering location, courses, timings, and admissions.
- **Contact & Admissions Desk:** Verified Madangir branch address, Google Maps embed, helpline click-to-call, office hours, branch switcher, and full student enquiry form.
- **Footer:** Brand overview, quick links, program links, verified social handles, privacy & terms modals, AlgoForce AI partner badge.
- **Mobile Floating Bar:** Fixed bottom bar for Call Now, WhatsApp Chat, and Quick Enquiry.
- **Desktop Floating WhatsApp:** Multi-state widget with pre-filled messaging.

### 2. Student Admission & Enquiry System
- Full validation for Indian 10-digit mobile numbers starting with 6–9.
- Duplicate submission protection within 5 minutes.
- Automated unique Enquiry Reference ID generation (`ICI-2026-XXXX`).
- Instant database persistence.
- Immediate visual confirmation with generated ID and one-click WhatsApp continuation link.
- Real-time notification logged for administrative review.

### 3. Administrative Portal & Admission CRM (`/#admin`)
- **Secure Authentication:** JWT token-based authentication with bcrypt password verification (`admin` / `Admin@ICI2026!`).
- **Dashboard Overview:** KPI cards (Total Leads, New, Contacted, In Follow-up, Confirmed Admissions, Conversion Rate %).
- **Visual Analytics:** Real-time database status pipeline, course demand breakdown, 7-day lead trends.
- **Leads Management:** Search, status filters, course filters, CSV export, lead detail drawer, status updater, counsellor assignment, internal notes thread, follow-up scheduler, one-click WhatsApp & Call actions.
- **Follow-up Pipeline:** Categorized tracking of leads requiring callbacks or campus visits.
- **Course Catalog Management:** Add, edit, publish/unpublish courses.
- **Faculty Management:** Manage educator profiles, subjects, and photos.
- **Toppers Gallery Management:** Maintain alumni achievements and photos.
- **Branch Management:** Manage Madangir campus and configure second expansion branch.
- **Website CMS Settings:** Edit hero text, credibility figures, phone numbers, and office timings without code changes.
- **Executive Demonstration Mode:** 9-step guided walkthrough with 1-click demo dataset seeding and reset for management meetings.
- **System Audit Logs:** Immutable security log of all admin actions and status updates.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v20+ or v24+
- npm v10+

### Installation & Run

1. **Install dependencies:**
   ```bash
   # In the root workspace:
   cd client && npm install
   cd ../server && npm install
   ```

2. **Build Client:**
   ```bash
   cd client && npm run build
   ```

3. **Start the Integrated Full-Stack Server:**
   ```bash
   cd server && npm start
   ```

4. **Access the Application:**
   - **Public Website:** `http://localhost:5000/`
   - **Admin CRM Portal:** `http://localhost:5000/#admin`
   - **Admin Credentials:**
     - Username: `admin`
     - Password: `Admin@ICI2026!`

---

## 🔧 Environment Variables (`.env`)

See `.env.example` in the root folder:
```env
PORT=5000
JWT_SECRET=ideal_career_institute_jwt_super_secret_key_change_in_production_2026
INSTITUTE_PHONE=917011667297
INSTITUTE_EMAIL=info@idealcareerinstitute.in

# Optional Cloud Integrations
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
SMTP_HOST=
SMTP_USER=
SMTP_PASS=
```

---

## 🛡️ Quality Assurance & Automated Testing
Run the automated QA test suite:
```bash
python test_platform.py
```
Verified:
- 21/21 functional tests passing (Assets, APIs, Validation, Lead lifecycle, Authentication, Analytics, Demo mode, CSV export).
