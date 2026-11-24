import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Theme Colors
    BG_DARK = RGBColor(11, 19, 43)        # #0B132B
    CARD_BG = RGBColor(26, 38, 57)        # #1A2639
    CARD_BORDER = RGBColor(40, 56, 84)    # #283854
    ACCENT_SKY = RGBColor(56, 189, 248)   # #38BDF8
    ACCENT_GREEN = RGBColor(52, 211, 153) # #34D399
    ACCENT_ROSE = RGBColor(244, 63, 94)   # #F43F5E
    ACCENT_AMBER = RGBColor(251, 191, 36) # #FBBF24
    TEXT_WHITE = RGBColor(255, 255, 255)
    TEXT_MUTED = RGBColor(148, 163, 184)  # #94A3B8
    TEXT_BODY = RGBColor(226, 232, 240)   # #E2E8F0

    def add_bg(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_DARK
        bg.line.fill.background()
        return bg

    def add_header(slide, tag, title, subtitle=""):
        # Tag / Section badge
        tag_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.45), Inches(11.7), Inches(0.35))
        tf_tag = tag_box.text_frame
        tf_tag.word_wrap = True
        tf_tag.margin_left = tf_tag.margin_top = tf_tag.margin_bottom = tf_tag.margin_right = 0
        p_tag = tf_tag.paragraphs[0]
        p_tag.text = tag.upper()
        p_tag.font.size = Pt(11)
        p_tag.font.bold = True
        p_tag.font.color.rgb = ACCENT_SKY

        # Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.8), Inches(11.7), Inches(0.65))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_bottom = tf_title.margin_right = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_WHITE

        # Subtitle (optional)
        if subtitle:
            sub_box = slide.shapes.add_textbox(Inches(0.8), Inches(1.45), Inches(11.7), Inches(0.35))
            tf_sub = sub_box.text_frame
            tf_sub.word_wrap = True
            tf_sub.margin_left = tf_sub.margin_top = tf_sub.margin_bottom = tf_sub.margin_right = 0
            p_sub = tf_sub.paragraphs[0]
            p_sub.text = subtitle
            p_sub.font.size = Pt(12)
            p_sub.font.color.rgb = TEXT_MUTED

    def add_card(slide, left, top, width, height, title, items, badge="", badge_color=ACCENT_SKY):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = CARD_BG
        card.line.color.rgb = CARD_BORDER
        card.line.width = Pt(1.2)

        # Header accent line
        line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left + Inches(0.2), top + Inches(0.2), width - Inches(0.4), Pt(3))
        line.fill.solid()
        line.fill.fore_color.rgb = badge_color
        line.line.fill.background()

        tb = slide.shapes.add_textbox(left + Inches(0.25), top + Inches(0.35), width - Inches(0.5), height - Inches(0.45))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_bottom = tf.margin_right = 0

        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(15)
        p0.font.bold = True
        p0.font.color.rgb = TEXT_WHITE

        if badge:
            p_badge = tf.add_paragraph()
            p_badge.text = f"[{badge}]"
            p_badge.font.size = Pt(10)
            p_badge.font.bold = True
            p_badge.font.color.rgb = badge_color
            p_badge.space_after = Pt(6)

        for item in items:
            p = tf.add_paragraph()
            p.text = "• " + item
            p.font.size = Pt(11)
            p.font.color.rgb = TEXT_BODY
            p.space_after = Pt(4)

    def set_notes(slide, text):
        notes = slide.notes_slide.notes_text_frame
        notes.text = text

    # =========================================================================
    # SLIDE 1: TITLE SLIDE
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    add_bg(s1)

    # Decorative glow bar
    bar = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(0.15), Inches(3.2))
    bar.fill.solid()
    bar.fill.fore_color.rgb = ACCENT_SKY
    bar.line.fill.background()

    tb1 = s1.shapes.add_textbox(Inches(1.2), Inches(1.8), Inches(11.2), Inches(3.5))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "POWERPULSE"
    p.font.size = Pt(42)
    p.font.bold = True
    p.font.color.rgb = ACCENT_SKY

    p = tf1.add_paragraph()
    p.text = "Smart Electricity Outage Intelligence & Grid Management Platform"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.space_after = Pt(14)

    p = tf1.add_paragraph()
    p.text = "Bridging the Last-Mile Blind Spot through Real-Time Spatio-Temporal Crowdsourcing, IoT Simulation & Automated Dispatch"
    p.font.size = Pt(13)
    p.font.color.rgb = TEXT_MUTED
    p.space_after = Pt(28)

    p = tf1.add_paragraph()
    p.text = "Presenters: Md. Tarikul Islam & Sujoy Devnath\nStack: React 19 • Node.js/Express • Aiven Cloud MySQL 8.0 • Vercel • Render"
    p.font.size = Pt(12)
    p.font.color.rgb = ACCENT_GREEN

    set_notes(s1, "Good morning respected evaluators. Today we present PowerPulse—an enterprise-grade utility intelligence platform that solves the last-mile electricity grid blind spot using crowdsourced signals, mathematical confidence scoring, and automated field dispatch.")

    # =========================================================================
    # SLIDE 2: PROBLEM STATEMENT
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    add_bg(s2)
    add_header(s2, "Context & Motivation", "The 'Last-Mile Grid Blind Spot' Problem", "Why standard grid monitoring fails at the neighborhood consumer distribution level")

    add_card(s2, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "1. Central SCADA Limitations",
             ["Sensors only exist at 33kV/11kV substations and primary feeders.",
              "Substations stay online while local branches collapse.",
              "90% of outages happen on local LT fuses, phase drops, and street transformers.",
              "Central operators have zero visibility into neighborhood-level cutoffs."],
             "THE INVISIBLE FAULT", ACCENT_ROSE)

    add_card(s2, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "2. The Call-Center Chaos",
             ["Citizens overwhelm telephone call centers during blackouts.",
              "Duplicate, unstructured, and angry complaints flood lines.",
              "Operators cannot distinguish 1 burnt house fuse from a 500-home feeder blackout.",
              "Mean Time to Detect (MTTD) takes hours instead of seconds."],
             "BOTTLENECK", ACCENT_AMBER)

    add_card(s2, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "3. The PowerPulse Remedy",
             ["Turns every citizen's smartphone into a virtual grid sensor.",
              "Combines crowdsourced alerts with IoT smart meter heartbeats.",
              "Mathematical confidence scoring validates genuine outages in seconds.",
              "Zero multimillion-dollar sensor installation required."],
             "CIVIC-TECH INNOVATION", ACCENT_GREEN)

    set_notes(s2, "বিদ্যুৎ গ্রিডের সাবস্টেশনে সেন্সর থাকে কিন্তু গলির লোকাল ড্রপ ফিউজ বা তার ছিঁড়ে গেলে সেন্ট্রাল গ্রিড তা জানতে পারে না। কল সেন্টারে হাজার হাজার ফোন এসে জ্যাম হয়ে যায়। PowerPulse নাগরিকদের ফোনকে ভার্চুয়াল সেন্সর বানিয়ে এই সমস্যা সমাধান করে।")

    # =========================================================================
    # SLIDE 3: SYSTEM ARCHITECTURE
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    add_bg(s3)
    add_header(s3, "System Overview", "End-to-End Distributed Architecture", "3-Tier Cloud Native Pipeline: Presentation, Application Engine & Relational Storage")

    add_card(s3, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Tier 1: Presentation (Vercel CDN)",
             ["Consumer Portal: 1-Tap Outage Report & Map.",
              "Field Tech Portal: GPS Work Order Dispatch.",
              "Admin Command Center: City-wide Triage & Broadcasts.",
              "React 19 Single Page App + Tailwind CSS 3.4.",
              "Offline-First localStorage signal queue."],
             "CLIENT LAYER", ACCENT_SKY)

    add_card(s3, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Tier 2: Application (Render PaaS)",
             ["Node.js & Express 4.21 REST API Gateway.",
              "Dual-Token JWT & RBAC Role Guards.",
              "Confidence Scoring Engine (Spatio-Temporal).",
              "Automated Technician Dispatch State Machine.",
              "Helmet, CORS Whitelist & Rate Limiting."],
             "LOGIC LAYER", ACCENT_AMBER)

    add_card(s3, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Tier 3: Database (Aiven Cloud)",
             ["Managed MySQL 8.0 with Permanent SSL.",
              "14 Normalized Relational Tables.",
              "Connection pooling via mysql2/promise.",
              "Complete foreign keys, indexes & audit logs.",
              "Zero data loss across container reboots."],
             "PERSISTENCE LAYER", ACCENT_GREEN)

    set_notes(s3, "Here is our 3-tier architecture: Vercel serves the high-performance React 19 frontend, Render runs our Node/Express REST API with confidence algorithms, and Aiven Cloud hosts the resilient MySQL 8.0 database.")

    # =========================================================================
    # SLIDE 4: PART I - FRONTEND STACK
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    add_bg(s4)
    add_header(s4, "Part I: Frontend Architecture", "Modern Client-Side Tech Stack & Structure", "Engineered for speed, strict security boundaries, and responsive mobile field usability")

    add_card(s4, Inches(0.8), Inches(1.9), Inches(5.6), Inches(5.0),
             "Core Technologies & Tooling",
             ["React 19 SPA: Latest hooks, zero-latency rendering, transition states.",
              "Vite 6: Instant Hot Module Replacement and production chunk minification.",
              "Tailwind CSS 3.4: Enterprise dark/light color palette, custom responsive drawers.",
              "React Router v7: Declarative nested layouts with ProtectedRoute guards.",
              "Lucide React: Clean, intuitive iconography across all portals.",
              "Axios Interceptors: Automatic JWT Bearer attachment & 401 token refresh."],
             "FRAMEWORK & TOOLS", ACCENT_SKY)

    add_card(s4, Inches(6.8), Inches(1.9), Inches(5.6), Inches(5.0),
             "Architectural Best Practices",
             ["Role-Based Route Isolation: Prevents unauthorized cross-role view access.",
              "Responsive Layouts: Mobile slide-over drawer sidebar for Admins & Techs.",
              "Clean Modular Structure: Feature-driven components and layout abstraction.",
              "Geospatial Mapping: Leaflet & React-Leaflet with dynamic boundary auto-fit.",
              "Offline-Aware Connectivity: Online/Offline event listener triggering sync alerts.",
              "Zero Third-Party UI Bloat: Pure Tailwind utility classes for minimal bundle size."],
             "DESIGN PRINCIPLES", ACCENT_GREEN)

    set_notes(s4, "ফ্রন্টএন্ডে React 19 ও Vite ব্যবহার করা হয়েছে। প্রতিটি রোলের জন্য আলাদা লেআউট ও প্রটেক্টেড রাউট রয়েছে। মোবাইল এবং ফিল্ডে কাজের সুবিধার জন্য ড্রয়ার মেনু ও রেসপনসিভ গ্রিড যোগ করা হয়েছে।")

    # =========================================================================
    # SLIDE 5: FRONTEND - CONSUMER PORTAL
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    add_bg(s5)
    add_header(s5, "Frontend Portals", "Consumer Portal: Citizen Engagement & Outage Reporting", "Empowering consumers with 1-tap reporting, live visual status, and transparent alerts")

    add_card(s5, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "1-Tap Reporting & State Banner",
             ["Adaptive Outage Banner: Dynamically toggles between Rose-Red (OFF) and Emerald-Green (ONLINE).",
              "Instant Signal Feedback: Visual badge confirming signal logged to grid.",
              "Single-tap 'Report Electricity BACK' to record prompt restoration signals.",
              "Eliminates call center friction completely."],
             "REAL-TIME UX", ACCENT_ROSE)

    add_card(s5, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Interactive Outage Map & Alerts",
             ["Neighborhood Map: Pinpoints active outages within user's municipal zone.",
              "Feeder Status: Shows whether neighboring feeder lines are active.",
              "Real-Time Notification Bell: Alerts for upcoming planned load-shedding.",
              "Full Outage History: Complete chronological record of past blackouts."],
             "GEOSPATIAL INSIGHTS", ACCENT_SKY)

    add_card(s5, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Billing, Complaints & Trust",
             ["Citizen Reliability Badge: Shows personal score (e.g. 0.86), discouraging false alerts.",
              "Smart Meter Simulation: Real-time consumption charts and mock bKash/Nagad bills.",
              "Digital Complaint Desk: File specific hardware, wire, or billing tickets.",
              "Profile Management: Update residential address and grid sector."],
             "VALUE-ADDED SERVICES", ACCENT_AMBER)

    set_notes(s5, "Consumer Portal provides 1-tap reporting. The main banner turns red when power is reported off and green when restored. It includes an interactive map, simulated billing, and personal reliability scoring.")

    # =========================================================================
    # SLIDE 6: FRONTEND - FIELD TECHNICIAN PORTAL
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    add_bg(s6)
    add_header(s6, "Frontend Portals", "Field Technician Portal: Rapid Incident Dispatch", "Streamlined mobile-first dispatch interface for on-site grid maintenance crews")

    add_card(s6, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Mobile Work Order Queue",
             ["Real-time job queue sorted by severity and priority.",
              "Shows exact affected zone (e.g., Mirpur-10, Gulshan-2).",
              "Displays number of affected citizen reports and confidence level.",
              "One-touch job acceptance directly from mobile browser."],
             "WORK ORDER DISPATCH", ACCENT_AMBER)

    add_card(s6, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "GPS Navigation & Details",
             ["1-Tap Google Maps Launch: Deep-link routes crew to exact transformer/pole.",
              "Component Metadata: Indicates transformer rating, sub-feeder, and phase.",
              "Direct Phone Links: Contact reporting consumers if gate/building is locked.",
              "Time-elapsed counter tracking Mean Time to Repair (MTTR)."],
             "FIELD TELEMETRY", ACCENT_SKY)

    add_card(s6, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "4-Stage Job State Machine",
             ["1. ASSIGNED: Job received and acknowledged.",
              "2. IN PROGRESS: Crew arrived on site; diagnosis underway.",
              "3. WORK DONE: Physical repairs and fuse replaced.",
              "4. RESOLVED: Power verified restored; closes incident automatically.",
              "Escalation Button: Calls municipal reinforcements if transformer is blown."],
             "LIFECYCLE MANAGEMENT", ACCENT_GREEN)

    set_notes(s6, "Technician portal is optimized for field smartphones. It shows incoming work orders, launches GPS navigation to the faulty transformer with one click, and steps through a 4-stage repair lifecycle.")

    # =========================================================================
    # SLIDE 7: FRONTEND - ADMIN COMMAND CENTER
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    add_bg(s7)
    add_header(s7, "Frontend Portals", "Admin Command Center: City-Wide Triage & Governance", "Comprehensive oversight, automated dispatch control, and public utility management")

    add_card(s7, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Live Incident Triage",
             ["Real-time feed of all active, pending, and resolved incidents.",
              "Algorithmic Confidence Gauge: Displays live 0-100% confidence rating.",
              "Single-click manual crew dispatch or automated assignment.",
              "Filter incidents by municipal sector, status, or date range."],
             "TRIAGE & DISPATCH", ACCENT_SKY)

    add_card(s7, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Load-Shedding & Grid Zones",
             ["Planned Outage Scheduler: Schedule maintenance shutdowns by zone.",
              "Automated Citizen Broadcast: Sends pre-outage alerts to affected consumers.",
              "Zone & Feeder Management: Add/edit municipal boundaries and coordinates.",
              "Technician Management: Monitor active workloads and performance."],
             "GRID GOVERNANCE", ACCENT_AMBER)

    add_card(s7, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Audit Logs & Analytics",
             ["Complete Security Audit Trail: Logs every dispatch, login, and status edit.",
              "Complaints Desk Oversight: Triage citizen service complaints.",
              "Analytics & Trends: Outage frequency per zone and average resolution times.",
              "Dual View Switching: Switch to Consumer View in 1 click for testing."],
             "COMPLIANCE & AUDIT", ACCENT_GREEN)

    set_notes(s7, "Admin portal provides city-wide triage. Admins monitor live confidence scores, dispatch technicians, schedule planned load-shedding maintenance, and inspect immutable security audit logs.")

    # =========================================================================
    # SLIDE 8: FRONTEND STATE & OFFLINE UX
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    add_bg(s8)
    add_header(s8, "Frontend Engineering", "Client State, Offline Queue & Resiliency", "How PowerPulse guarantees reliable operation even during total blackout network drops")

    add_card(s8, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Centralized AuthContext",
             ["Manages user session, JWT storage, and automatic refresh in localStorage.",
              "Provides role guards across protected routes.",
              "Maintains live user reliability score and area coordinates.",
              "Seamless multi-tab session synchronization."],
             "STATE MANAGEMENT", ACCENT_SKY)

    add_card(s8, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Offline-First Outage Queue",
             ["Network-Drop Detection: window.addEventListener('offline'/'online').",
              "Persistent Local Queue: Caches outage signals in browser localStorage.",
              "Zero Signal Loss: Displays 'Saved Offline - Will Sync Automatically'.",
              "Auto-Flush: Automatically pushes queued signals to API upon reconnection."],
             "RESILIENCY PATTERN", ACCENT_ROSE)

    add_card(s8, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Real-Time UX & Navigation",
             ["Mobile Drawer Navigation: Hamburger toggle auto-closing on route navigation.",
              "Horizontal Tab Bar: Smooth scrollable tabs on small mobile screens.",
              "Polling Notification Sync: Background checks every 15s for new work orders.",
              "Leaflet Safeguards: Defensive coordinate parsing preventing map crashes."],
             "RESPONSIVE DESIGN", ACCENT_GREEN)

    set_notes(s8, "Blackouts often cause cellular network congestion. Our offlineQueue caches outage reports in browser localStorage when offline, and automatically syncs them to the server as soon as connectivity resumes.")

    # =========================================================================
    # SLIDE 9: PART II - BACKEND STACK
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    add_bg(s9)
    add_header(s9, "Part II: Backend Architecture", "High-Throughput Node.js / Express Micro-Engine", "Scalable REST API adhering to Clean Separation of Concerns and Modular Architecture")

    add_card(s9, Inches(0.8), Inches(1.9), Inches(5.6), Inches(5.0),
             "Core Backend Technologies",
             ["Node.js (v18+ LTS): Event-driven, asynchronous I/O execution engine.",
              "Express 4.21: Fast, unopinionated minimalist web framework.",
              "mysql2/promise: High-performance MySQL connection pool with SSL.",
              "bcryptjs: Salted cryptographic password hashing (10 salt rounds).",
              "jsonwebtoken: Dual-token signing and stateless verification.",
              "dotenv: Environment isolation for secure production secrets."],
             "RUNTIME & LIBRARIES", ACCENT_AMBER)

    add_card(s9, Inches(6.8), Inches(1.9), Inches(5.6), Inches(5.0),
             "Modular Clean Architecture",
             ["Controllers Layer: 16 dedicated controllers handling request validation.",
              "Services Layer: Pure business logic (Confidence engine, Outage lifecycle).",
              "Config Layer: Centralized MySQL connection pool with query helpers.",
              "Routes Layer: Grouped REST endpoints (/auth, /reports, /incidents, /tech).",
              "Middleware Pipeline: Sequential execution of auth, role, and rate guards.",
              "Health Checks: Dedicated /api/health endpoint for 99.9% PaaS monitoring."],
             "ARCHITECTURE PATTERNS", ACCENT_GREEN)

    set_notes(s9, "ব্যাকএন্ডে Node.js ও Express ব্যবহার করা হয়েছে। কোডকে কন্ট্রোলার, সার্ভিস, রাউট এবং কনফিগ লেয়ারে ভাগ করে ক্লিন আর্কিটেকচার বজায় রাখা হয়েছে যাতে সহজেই স্কেল করা যায়।")

    # =========================================================================
    # SLIDE 10: BACKEND SECURITY & RBAC
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    add_bg(s10)
    add_header(s10, "Backend Security", "Enterprise Defense, Authentication & RBAC", "Comprehensive multi-layered protection against attacks, tampering, and unauthorized privilege escalation")

    add_card(s10, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Dual-Token JWT & RBAC",
             ["Short-Lived Access Token (24h) for stateless API authentication.",
              "Refresh Tokens stored in MySQL for session rotation & revocation.",
              "Token Blacklisting: Immediate invalidation upon user logout.",
              "Role-Based Guards: Strict authorization for admin, technician, consumer."],
             "AUTH PIPELINE", ACCENT_SKY)

    add_card(s10, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Cryptographic Protection",
             ["Passwords hashed using bcryptjs with 10 salt rounds.",
              "No plaintext passwords ever stored or logged.",
              "Parameterized SQL Queries: 100% immunity against SQL Injection attacks.",
              "Enforced SSL/TLS encryption on all database client-server communication."],
             "DATA PROTECTION", ACCENT_GREEN)

    add_card(s10, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "API Hardening & Firewalls",
             ["Helmet Middleware: Protects headers against XSS, clickjacking, MIME-sniffing.",
              "Strict CORS Whitelist: Rejects all requests outside authorized domains.",
              "Rate Limiting: express-rate-limit prevents brute-force login attacks.",
              "Payload Sanitization: Strips malformed inputs before database insertion."],
             "NETWORK DEFENSE", ACCENT_ROSE)

    set_notes(s10, "Security features: Dual-token JWT with database revocation, role-based access control, bcrypt hashing, parameterized queries preventing SQL injection, and strict CORS whitelisting.")

    # =========================================================================
    # SLIDE 11: CONFIDENCE SCORING ALGORITHM
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    add_bg(s11)
    add_header(s11, "Algorithmic Engine", "The Mathematical Confidence Scoring Algorithm", "How PowerPulse converts noisy crowdsourced citizen clicks into verified grid incidents")

    add_card(s11, Inches(0.8), Inches(1.9), Inches(5.6), Inches(5.0),
             "Mathematical Formulation",
             ["Formula: Confidence = Density + SmartMeter + Spatial + Temporal + Trust - Contradiction",
              "Report Density (Up to 50%): 1 report = 10%, 2-4 = 25%, 5-9 = 40%, 10+ = 50%.",
              "Smart Meter Heartbeat (+30%): >= 2 offline meters detected in same feeder zone.",
              "Spatial Proximity (+10%): Cluster of reports concentrated within 500m radius.",
              "Temporal Velocity (+10%): >= 3 reports submitted within a 10-minute window.",
              "Citizen Trust Factor: Scaled multiplier based on average user reliability.",
              "Contradictory Penalty (-20%): Triggered if neighbors report 'Power Back'."],
             "ALGORITHM WEIGHTS", ACCENT_SKY)

    add_card(s11, Inches(6.8), Inches(1.9), Inches(5.6), Inches(5.0),
             "Decision Thresholds & Filtering",
             ["Score >= 70%: AUTO-PROMOTES to ACTIVE INCIDENT; triggers instant technician dispatch alert.",
              "Score 40% - 69%: PENDING VERIFICATION on Admin triage board; awaits corroboration.",
              "Score < 40%: Logged as isolated report (personal house fuse trip or noise).",
              "Anti-Spam Capping: Prevents single malicious users from inflating confidence.",
              "Bayesian Reliability Scoring: Automatically downgrades score of false reporters.",
              "Simulated in simulate.js: Stress-tested under multi-zone blackout scenarios."],
             "DECISION THRESHOLDS", ACCENT_GREEN)

    set_notes(s11, "The confidence algorithm combines report density (50%), smart meter heartbeats (30%), spatial proximity (10%), and temporal velocity (10%). Over 70% automatically triggers technician dispatch; under 40% is filtered as noise.")

    # =========================================================================
    # SLIDE 12: INCIDENT LIFECYCLE & AUDIT LOGS
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    add_bg(s12)
    add_header(s12, "Backend Engine", "Automated Incident Lifecycle & Audit Logging", "End-to-end incident state machine ensuring seamless coordination and governmental compliance")

    add_card(s12, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "1. Ingestion & Clustering",
             ["Citizen reports arrive via POST /api/reports.",
              "Engine groups reports by location_id and timestamp.",
              "Confidence score calculated immediately.",
              "Auto-promotes to incident if score >= 70%."],
             "SIGNAL INGESTION", ACCENT_SKY)

    add_card(s12, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "2. Dispatch & Repair",
             ["Admin or automated logic assigns nearest technician.",
              "Technician status toggles to BUSY; receives push alert.",
              "Technician moves job: ASSIGNED -> IN PROGRESS -> WORK DONE.",
              "All affected consumers receive notification of dispatch."],
             "COORDINATION", ACCENT_AMBER)

    add_card(s12, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "3. Resolution & Audit",
             ["Technician marks job RESOLVED upon power restoration.",
              "Incident status changes to RESOLVED in database.",
              "Citizens notified power is back; asked to confirm.",
              "Audit Log: Immutable record written to audit_logs table."],
             "VERIFICATION & AUDIT", ACCENT_GREEN)

    set_notes(s12, "ইনসিডেন্ট লাইফসাইকেল: রিপোর্ট আসা থেকে শুরু করে কনফিডেন্স ক্যালকুলেশন, টেকনিশিয়ান অ্যাসাইনমেন্ট, ফিল্ডে কাজ সম্পন্ন এবং রেজোলিউশন—প্রতিটি পদক্ষেপ স্বয়ংক্রিয়ভাবে অডিট লগে রেকর্ড থাকে।")

    # =========================================================================
    # SLIDE 13: PART III - DATABASE (MYSQL)
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    add_bg(s13)
    add_header(s13, "Part III: Database Architecture", "Managed Cloud MySQL 8.0 & Data Modeling", "Production-grade relational schema guaranteeing ACID compliance, foreign keys & performance")

    add_card(s13, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "14 Relational Tables",
             ["locations: Municipal zones, districts, coordinates.",
              "users: Credentials, roles, reliability scores.",
              "technicians: Specialization, active status, zone.",
              "incidents: Outage lifecycle, confidence score.",
              "reports: Citizen signals (OFF / BACK).",
              "assignments: Technician-to-incident link.",
              "complaints: Citizen hardware/billing tickets."],
             "CORE ENTITIES", ACCENT_SKY)

    add_card(s13, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Supporting Subsystems",
             ["smart_meter_bills: Simulated bills & payments.",
              "meter_readings: Simulated voltage/kWh telemetry.",
              "planned_outages: Scheduled maintenance windows.",
              "notifications: Bi-directional user alert feeds.",
              "audit_logs: Immutable compliance action log.",
              "refresh_tokens & blacklisted_tokens: JWT auth."],
             "UTILITY SERVICES", ACCENT_AMBER)

    add_card(s13, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Cloud Database Highlights",
             ["Aiven Cloud MySQL 8.0: High availability & automated backups.",
              "SSL Connection Pool: 10 concurrent connections with SSL certs.",
              "Normalized Design: 3NF compliance with cascading foreign keys.",
              "Decimal Safeguards: Exact decimal parsing for GPS coordinates.",
              "Zero Data Loss: Data permanently persists across server reboots."],
             "DATABASE RELIABILITY", ACCENT_GREEN)

    set_notes(s13, "Our database runs on Aiven Cloud MySQL 8.0 across 14 normalized tables. It features SSL connection pooling, strict foreign key constraints, and permanent data persistence.")

    # =========================================================================
    # SLIDE 14: CLOUD DEVOPS PIPELINE
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    add_bg(s14)
    add_header(s14, "Cloud DevOps & CI/CD", "Production Deployment Pipeline", "Continuous Integration and Deployment architecture across Vercel, Render and Aiven")

    add_card(s14, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Frontend on Vercel CDN",
             ["Automated build pipeline triggered on git push to main.",
              "Worldwide Edge CDN ensures sub-second page loads.",
              "Zero cold-start latency with instant client hydration.",
              "Custom domain routing with automatic SSL renewal.",
              "URL: power-pulse-app.vercel.app"],
             "GLOBAL EDGE", ACCENT_SKY)

    add_card(s14, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Backend API on Render",
             ["Containerized Node.js runtime environment.",
              "Continuous Deployment from GitHub repository.",
              "CORS configured for authorized frontend clients.",
              "Automated restart and health check monitoring.",
              "URL: powerpulse-api-j8oc.onrender.com/api"],
             "APPLICATION PAAS", ACCENT_AMBER)

    add_card(s14, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Database & Git Sync",
             ["Aiven Cloud MySQL cluster with automatic SSL.",
              "Dual GitHub Repository Sync across collaborators.",
              "Exported SQL Dump (database_dump.sql) for local offline testing.",
              "Zero manual deployment steps required."],
             "STORAGE & VERSIONING", ACCENT_GREEN)

    set_notes(s14, "Continuous deployment workflow: Pushing to GitHub main automatically triggers a Vite build on Vercel and container deployment on Render, connected securely to Aiven Cloud MySQL.")

    # =========================================================================
    # SLIDE 15: VIVA DEFENSE CHEAT-SHEET
    # =========================================================================
    s15 = prs.slides.add_slide(blank_layout)
    add_bg(s15)
    add_header(s15, "Defense Q&A", "Key Examiner Questions & Architectural Answers", "Prepared technical arguments addressing the most critical defense evaluations")

    add_card(s15, Inches(0.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Q1: Why user input if grids have sensors?",
             ["Answer: SCADA sensors only monitor high-voltage substations.",
              "Blown LT drop fuses, transformer phase dropouts, and cut cables are completely blind to central operators.",
              "PowerPulse bridges this multi-million dollar sensor gap cost-effectively."],
             "DOMAIN JUSTIFICATION", ACCENT_ROSE)

    add_card(s15, Inches(4.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Q2: How do you prevent fake reports?",
             ["Answer: Bayesian Reliability Scoring tracks user accuracy.",
              "Single clicks never trigger an incident; spatio-temporal clustering requires multi-user corroboration.",
              "Smart meter heartbeats validate genuine feeder cuts.",
              "False reporters suffer score downgrades."],
             "FRAUD PREVENTION", ACCENT_AMBER)

    add_card(s15, Inches(8.8), Inches(1.9), Inches(3.6), Inches(5.0),
             "Q3: How do users report if internet drops?",
             ["Answer: Frontend includes Offline-First Caching via localStorage.",
              "Reports queue locally on the device during connectivity drops.",
              "As soon as cell connectivity returns, background auto-flush syncs the signals.",
              "Zero signal loss even during blackouts."],
             "OFFLINE RESILIENCY", ACCENT_GREEN)

    set_notes(s15, "ভাইভায় শিক্ষকরা এই ৩টি প্রশ্ন করতে পারেন: ১. গ্রিড সেন্সর থাকতে ইউজার রিপোর্ট কেন? ২. ফেক রিপোর্ট ঠেকাবেন কীভাবে? ৩. বিদ্যুৎ না থাকলে ইউজার ইন্টারনেট পাবে কীভাবে? স্লাইডে এর নিখুঁত টেকনিক্যাল উত্তর দেওয়া আছে।")

    # =========================================================================
    # SLIDE 16: CONCLUSION & FUTURE SCOPE
    # =========================================================================
    s16 = prs.slides.add_slide(blank_layout)
    add_bg(s16)
    add_header(s16, "Conclusion", "PowerPulse: Key Deliverables & Future Roadmap", "Transforming public utility governance into an intelligent, transparent civic ecosystem")

    add_card(s16, Inches(0.8), Inches(1.9), Inches(5.6), Inches(5.0),
             "Project Accomplishments",
             ["✅ 3 Fully functional role-based portals (Consumer, Field Tech, Admin).",
              "✅ Mathematical confidence scoring engine with spatio-temporal clustering.",
              "✅ Fully migrated to Aiven Cloud MySQL 8.0 with SSL connection pool.",
              "✅ 100% Mobile-first responsive layouts with drawer navigation.",
              "✅ Offline-first outage queueing ensuring zero signal loss.",
              "✅ Live cloud deployment on Vercel CDN and Render API Gateway."],
             "DELIVERABLES COMPLETED", ACCENT_SKY)

    add_card(s16, Inches(6.8), Inches(1.9), Inches(5.6), Inches(5.0),
             "Future Scope & Enhancements",
             ["• Real NB-IoT / LoRaWAN smart meter hardware gateway integration.",
              "• AI-driven predictive outage forecasting based on weather telemetry.",
              "• Automated IVR / SMS telephony gateway for non-smartphone users.",
              "• Predictive transformer health degradation alerts before physical failure.",
              "• Integration with National Grid Load Dispatch Centers (NLDC)."],
             "FUTURE ROADMAP", ACCENT_GREEN)

    set_notes(s16, "In summary, PowerPulse delivers a production-grade utility platform. In the future, we plan to integrate hardware LoRaWAN smart meters and weather-based AI outage prediction. Thank you! We welcome your questions.")

    # Save presentation
    output_path = os.path.abspath("PowerPulse_Presentation.pptx")
    prs.save(output_path)
    print(f"Presentation saved to: {output_path}")

    # Also save to conversation artifacts directory
    artifact_dir = r"C:\Users\SUJOY\.gemini\antigravity\brain\3cb16b42-cba1-4fef-9c87-8a4ce32a6006"
    if os.path.exists(artifact_dir):
        artifact_path = os.path.join(artifact_dir, "PowerPulse_Presentation.pptx")
        prs.save(artifact_path)
        print(f"Artifact presentation saved to: {artifact_path}")

if __name__ == "__main__":
    create_presentation()
