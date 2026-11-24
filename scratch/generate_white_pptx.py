import os
import pptx
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def build_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # White / Light Theme Colors
    BG_WHITE = RGBColor(255, 255, 255)       # #FFFFFF
    BG_SLATE_50 = RGBColor(248, 250, 252)    # #F8FAFC
    CARD_BG = RGBColor(255, 255, 255)        # Pure White Card
    CARD_BORDER = RGBColor(226, 232, 240)    # Slate 200
    CODE_BG = RGBColor(15, 23, 42)           # #0F172A (IDE Dark Theme)
    CODE_BORDER = RGBColor(30, 41, 59)       # #1E293B

    # Brand Accent Colors
    PRIMARY_BLUE = RGBColor(2, 132, 199)     # Sky 600 (#0284C7)
    ACCENT_EMERALD = RGBColor(5, 150, 105)   # Emerald 600 (#059669)
    ACCENT_ROSE = RGBColor(225, 29, 72)      # Rose 600 (#E11D48)
    ACCENT_AMBER = RGBColor(217, 119, 6)     # Amber 600 (#D97706)
    ACCENT_PURPLE = RGBColor(124, 58, 237)   # Purple 600 (#7C3AED)
    ACCENT_CYAN = RGBColor(6, 182, 212)      # Cyan 500

    # Typography Colors
    TEXT_TITLE = RGBColor(15, 23, 42)        # Slate 900
    TEXT_BODY = RGBColor(51, 65, 85)         # Slate 700
    TEXT_MUTED = RGBColor(100, 116, 139)     # Slate 500
    TEXT_CODE = RGBColor(241, 245, 249)      # Slate 100
    CODE_KEYWORD = RGBColor(244, 63, 94)     # Rose
    CODE_STRING = RGBColor(52, 211, 153)     # Emerald
    CODE_VARIABLE = RGBColor(56, 189, 248)   # Sky
    CODE_COMMENT = RGBColor(148, 163, 184)   # Slate 400

    def apply_canvas(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_SLATE_50
        bg.line.fill.background()

        # Top subtle brand line
        top_line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, Inches(0.06))
        top_line.fill.solid()
        top_line.fill.fore_color.rgb = PRIMARY_BLUE
        top_line.line.fill.background()

        # Bottom footer bar
        ft_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.05), Inches(11.733), Inches(0.3))
        ft_tf = ft_box.text_frame
        ft_tf.word_wrap = True
        ft_tf.margin_left = ft_tf.margin_top = ft_tf.margin_bottom = ft_tf.margin_right = 0
        p = ft_tf.paragraphs[0]
        p.text = "PowerPulse: Smart Grid Outage Intelligence & Management • Enterprise Architecture Defense"
        p.font.size = Pt(9)
        p.font.color.rgb = TEXT_MUTED

    def add_slide_header(slide, tag, title, subtitle="", slide_num=""):
        # Pill Tag
        pill_width = Inches(len(tag) * 0.11 + 0.5)
        pill = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(0.35), pill_width, Inches(0.3))
        pill.fill.solid()
        pill.fill.fore_color.rgb = RGBColor(224, 242, 254)  # Sky 100
        pill.line.color.rgb = RGBColor(186, 230, 253)      # Sky 200

        tb_pill = slide.shapes.add_textbox(Inches(0.8), Inches(0.35), pill_width, Inches(0.3))
        tf_pill = tb_pill.text_frame
        tf_pill.word_wrap = True
        tf_pill.margin_left = tf_pill.margin_top = tf_pill.margin_bottom = tf_pill.margin_right = 0
        p_pill = tf_pill.paragraphs[0]
        p_pill.text = tag.upper()
        p_pill.alignment = PP_ALIGN.CENTER
        p_pill.font.size = Pt(9.5)
        p_pill.font.bold = True
        p_pill.font.color.rgb = PRIMARY_BLUE

        # Slide Number (Right Aligned)
        if slide_num:
            num_box = slide.shapes.add_textbox(Inches(10.5), Inches(0.35), Inches(2.0), Inches(0.3))
            tf_num = num_box.text_frame
            tf_num.margin_left = tf_num.margin_top = tf_num.margin_bottom = tf_num.margin_right = 0
            p_num = tf_num.paragraphs[0]
            p_num.text = slide_num
            p_num.alignment = PP_ALIGN.RIGHT
            p_num.font.size = Pt(10)
            p_num.font.bold = True
            p_num.font.color.rgb = TEXT_MUTED

        # Main Title
        tb_title = slide.shapes.add_textbox(Inches(0.8), Inches(0.72), Inches(11.733), Inches(0.5))
        tf_title = tb_title.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_bottom = tf_title.margin_right = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title
        p_title.font.size = Pt(19)
        p_title.font.bold = True
        p_title.font.color.rgb = TEXT_TITLE

        # Subtitle
        if subtitle:
            tb_sub = slide.shapes.add_textbox(Inches(0.8), Inches(1.22), Inches(11.733), Inches(0.35))
            tf_sub = tb_sub.text_frame
            tf_sub.word_wrap = True
            tf_sub.margin_left = tf_sub.margin_top = tf_sub.margin_bottom = tf_sub.margin_right = 0
            p_sub = tf_sub.paragraphs[0]
            p_sub.text = subtitle
            p_sub.font.size = Pt(11)
            p_sub.font.color.rgb = TEXT_MUTED

    def add_card(slide, left, top, width, height, title, items=[], accent=PRIMARY_BLUE, bg_color=CARD_BG):
        # Card Background
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = CARD_BORDER
        card.line.width = Pt(1)

        # Left Vertical Accent Stripe
        stripe = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, Inches(0.08), height)
        stripe.fill.solid()
        stripe.fill.fore_color.rgb = accent
        stripe.line.fill.background()

        tb = slide.shapes.add_textbox(left + Inches(0.22), top + Inches(0.18), width - Inches(0.35), height - Inches(0.3))
        tf = tb.text_frame
        tf.word_wrap = True
        tf.margin_left = tf.margin_top = tf.margin_bottom = tf.margin_right = 0

        p0 = tf.paragraphs[0]
        p0.text = title
        p0.font.size = Pt(13)
        p0.font.bold = True
        p0.font.color.rgb = TEXT_TITLE
        p0.space_after = Pt(8)

        for item in items:
            p = tf.add_paragraph()
            p.text = "• " + item
            p.font.size = Pt(10)
            p.font.color.rgb = TEXT_BODY
            p.space_after = Pt(4)

        return tb

    def add_code_block(slide, left, top, width, height, filename, code_lines, callout=""):
        # Dark Editor Container
        container = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        container.fill.solid()
        container.fill.fore_color.rgb = CODE_BG
        container.line.color.rgb = CODE_BORDER
        container.line.width = Pt(1.2)

        # Editor Header Bar
        hdr = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, Inches(0.35))
        hdr.fill.solid()
        hdr.fill.fore_color.rgb = RGBColor(30, 41, 59) # Slate 800
        hdr.line.fill.background()

        # Filename title in header
        tb_fn = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.05), width - Inches(0.4), Inches(0.25))
        tf_fn = tb_fn.text_frame
        tf_fn.margin_left = tf_fn.margin_top = tf_fn.margin_bottom = tf_fn.margin_right = 0
        p_fn = tf_fn.paragraphs[0]
        p_fn.text = f"💻 {filename}"
        p_fn.font.size = Pt(9.5)
        p_fn.font.bold = True
        p_fn.font.color.rgb = RGBColor(148, 163, 184)

        # Code Body
        tb_code = slide.shapes.add_textbox(left + Inches(0.2), top + Inches(0.45), width - Inches(0.4), height - Inches(0.55))
        tf_code = tb_code.text_frame
        tf_code.word_wrap = True
        tf_code.margin_left = tf_code.margin_top = tf_code.margin_bottom = tf_code.margin_right = 0

        first = True
        for line in code_lines:
            p = tf_code.paragraphs[0] if first else tf_code.add_paragraph()
            first = False
            p.text = line
            p.font.name = "Consolas"
            p.font.size = Pt(9)
            p.font.color.rgb = TEXT_CODE

        # Bottom Code Callout Box (if provided)
        if callout:
            c_top = top + height - Inches(0.7)
            callout_bg = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left + Inches(0.15), c_top, width - Inches(0.3), Inches(0.55))
            callout_bg.fill.solid()
            callout_bg.fill.fore_color.rgb = RGBColor(24, 34, 53)
            callout_bg.line.color.rgb = PRIMARY_BLUE

            tb_c = slide.shapes.add_textbox(left + Inches(0.25), c_top + Inches(0.06), width - Inches(0.5), Inches(0.45))
            tf_c = tb_c.text_frame
            tf_c.word_wrap = True
            tf_c.margin_left = tf_c.margin_top = tf_c.margin_bottom = tf_c.margin_right = 0
            p_c = tf_c.paragraphs[0]
            p_c.text = "💡 Execution Logic: " + callout
            p_c.font.size = Pt(8.5)
            p_c.font.color.rgb = RGBColor(186, 230, 253)

    def set_notes(slide, text):
        notes = slide.notes_slide.notes_text_frame
        notes.text = text

    # =========================================================================
    # SLIDE 1: TITLE HERO SLIDE (CLEAN WHITE)
    # =========================================================================
    s1 = prs.slides.add_slide(blank_layout)
    apply_canvas(s1)

    # Hero Banner Box
    hero = s1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.0), Inches(11.733), Inches(5.6))
    hero.fill.solid()
    hero.fill.fore_color.rgb = CARD_BG
    hero.line.color.rgb = CARD_BORDER
    hero.line.width = Pt(1.5)

    # Hero Content
    tb_h = s1.shapes.add_textbox(Inches(1.3), Inches(1.4), Inches(10.7), Inches(4.8))
    tf_h = tb_h.text_frame
    tf_h.word_wrap = True

    p = tf_h.paragraphs[0]
    p.text = "POWERPULSE"
    p.font.size = Pt(40)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    p = tf_h.add_paragraph()
    p.text = "Smart Electricity Outage Intelligence & Municipal Grid Management Platform"
    p.font.size = Pt(20)
    p.font.bold = True
    p.font.color.rgb = TEXT_TITLE
    p.space_after = Pt(12)

    p = tf_h.add_paragraph()
    p.text = "A full-stack, distributed utility intelligence system engineered to eliminate the Last-Mile Grid Blind Spot through real-time citizen crowdsourcing, smart-meter IoT simulation, and automated technician dispatch."
    p.font.size = Pt(12.5)
    p.font.color.rgb = TEXT_BODY
    p.space_after = Pt(24)

    p = tf_h.add_paragraph()
    p.text = "AUTHORS & RESEARCHERS: Md. Tarikul Islam & Sujoy Devnath\nCORE TECH STACK: React 19 • Node.js/Express • Aiven Cloud MySQL 8.0 • Vercel • Render\nLIVE ACCESS: https://power-pulse-app.vercel.app  |  API: https://powerpulse-api-j8oc.onrender.com/api"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = PRIMARY_BLUE

    set_notes(s1, "Good morning respected evaluators. Today we present PowerPulse—a full-stack, distributed utility intelligence platform designed to bridge the visibility gap between municipal power grids and citizen consumers.")

    # =========================================================================
    # SLIDE 2: THE PROBLEM STATEMENT & CIVIC MOTIVATION
    # =========================================================================
    s2 = prs.slides.add_slide(blank_layout)
    apply_canvas(s2)
    add_slide_header(s2, "Domain Problem", "The 'Last-Mile Grid Blind Spot' Dilemma", "Why central utility SCADA fails at local neighborhood distribution levels", "Slide 02 / 19")

    add_card(s2, Inches(0.8), Inches(1.7), Inches(3.64), Inches(5.1),
             "1. SCADA Substation Limitation",
             ["Utility sensors monitor 33kV/11kV substations, not street transformers.",
              "Substations remain fully powered while local street poles fail.",
              "90% of urban outages are caused by blown LT drop fuses, phase drops, and tree branches.",
              "Central grid operators remain completely blind to local outages."],
             ACCENT_ROSE)

    add_card(s2, Inches(4.84), Inches(1.7), Inches(3.64), Inches(5.1),
             "2. The Call-Center Bottleneck",
             ["Blackouts trigger thousands of simultaneous panicky phone calls.",
              "Phone lines freeze; citizens cannot report emergencies.",
              "Operators cannot differentiate 1 home fuse trip from a 500-home feeder collapse.",
              "Mean Time to Detect (MTTD) stretches to hours instead of seconds."],
             ACCENT_AMBER)

    add_card(s2, Inches(8.88), Inches(1.7), Inches(3.64), Inches(5.1),
             "3. The Crowdsourced Solution",
             ["Converts citizen smartphones into zero-cost virtual grid sensors.",
              "Aggregates signals with simulated smart-meter IoT telemetry.",
              "Mathematically detects, verifies, and clusters outages in seconds.",
              "Saves millions of dollars in physical sensor deployment."],
             ACCENT_EMERALD)

    set_notes(s2, "গ্রিডের সাবস্টেশনে সেন্সর থাকে কিন্তু গলির ট্রান্সফরমারের ড্রপ-আউট ফিউজ বা ফেজ কাটা পড়লে সেন্ট্রাল গ্রিড তা জানতে পারে না। PowerPulse কোনো কোটি টাকার হার্ডওয়্যার খরচ ছাড়াই নাগরিকদের ক্রাউডসোর্সড সিগন্যাল দিয়ে এই ব্লাইন্ড-স্পট সমাধান করে।")

    # =========================================================================
    # SLIDE 3: GLOBAL SYSTEM ARCHITECTURE
    # =========================================================================
    s3 = prs.slides.add_slide(blank_layout)
    apply_canvas(s3)
    add_slide_header(s3, "System Overview", "3-Tier Distributed Cloud Architecture", "Seamless end-to-end telemetry pipeline from citizen devices to cloud database", "Slide 03 / 19")

    add_card(s3, Inches(0.8), Inches(1.7), Inches(3.64), Inches(5.1),
             "Tier 1: Client Layer (Vercel Edge)",
             ["Consumer Portal: 1-Tap Outage Report, Area Map & Billing.",
              "Technician Portal: Mobile-first GPS Dispatch & Work Orders.",
              "Admin Command Center: City-wide Triage & Scheduled Load-Shedding.",
              "React 19 SPA + Vite 6 + Tailwind CSS 3.4.",
              "Offline-First Caching via browser localStorage queue."],
             PRIMARY_BLUE)

    add_card(s3, Inches(4.84), Inches(1.7), Inches(3.64), Inches(5.1),
             "Tier 2: Logic Layer (Render PaaS)",
             ["Node.js + Express 4.21 RESTful API Gateway.",
              "Dual-Token JWT & Role-Based Access Control (RBAC).",
              "Spatio-Temporal Confidence Scoring Algorithm.",
              "Automated Technician Dispatch State Machine.",
              "Security Hardening: Helmet, CORS Whitelist, Rate Limiting."],
             ACCENT_AMBER)

    add_card(s3, Inches(8.88), Inches(1.7), Inches(3.64), Inches(5.1),
             "Tier 3: Data Layer (Aiven Cloud)",
             ["Aiven Managed MySQL 8.0 with Permanent SSL.",
              "14 Normalized Relational Tables (ACID Compliant).",
              "Connection pooling via mysql2/promise.",
              "Automatic snapshot backups & zero data loss.",
              "Guarantees permanent persistence across cloud deployments."],
             ACCENT_EMERALD)

    set_notes(s3, "Our 3-tier architecture: Vercel delivers the React 19 frontend worldwide with edge caching, Render powers the Node.js REST API with confidence algorithms, and Aiven Cloud hosts the resilient MySQL database.")

    # =========================================================================
    # SLIDE 4: PART I - FRONTEND ARCHITECTURE OVERVIEW
    # =========================================================================
    s4 = prs.slides.add_slide(blank_layout)
    apply_canvas(s4)
    add_slide_header(s4, "Part I: Frontend", "Frontend Architecture & Design Principles", "Modern React 19 Single Page Application built for performance, security, and responsive field UX", "Slide 04 / 19")

    add_card(s4, Inches(0.8), Inches(1.7), Inches(5.66), Inches(5.1),
             "Core Technologies & Tooling",
             ["React 19 (SPA): Leveraging latest concurrent rendering, optimized hooks, and responsive lifecycle states.",
              "Vite 6: Sub-millisecond Hot Module Replacement (HMR) and optimized Rollup tree-shaking for minimal production bundles.",
              "Tailwind CSS 3.4: Utility-first design system with customized dark/light palettes, slide-over drawers, and adaptive headers.",
              "React Router v7: Declarative routing with strict ProtectedRoute guards isolating Consumer, Technician, and Admin views.",
              "Axios Interceptors: Automatic JWT Bearer authorization injection and seamless 401 token refresh redirection.",
              "Leaflet & React-Leaflet: Interactive geospatial mapping with dynamic auto-fitting Dhaka zone boundaries."],
             PRIMARY_BLUE)

    add_card(s4, Inches(6.86), Inches(1.7), Inches(5.66), Inches(5.1),
             "Architectural Best Practices",
             ["Role-Based Route Isolation: Prevents unauthorized cross-portal URL traversal.",
              "Mobile-First Responsive Layouts: Slide-over drawer navigation on Admin & Tech views ensures field usability on smartphones.",
              "Feature-Driven Structure: Components grouped cleanly into features/consumer, components/OutageMap, etc.",
              "Offline-Aware Connectivity: Global event listeners toggle real-time offline alerts when network drops during blackouts.",
              "Defensive Coordinate Parsing: Safeguards against NaN or string coordinate crashes using explicit parseFloat checks.",
              "Universal Profiles: Seamless switching between Consumer, Tech, and Admin views for privileged evaluation."],
             ACCENT_EMERALD)

    set_notes(s4, "ফ্রন্টএন্ডে React 19 এবং Vite ব্যবহার করা হয়েছে। প্রতিটি রোলের জন্য আলাদা লেআউট ও প্রটেক্টেড রাউট রয়েছে। মোবাইল এবং ফিল্ডে ব্যবহারের সুবিধার্থে স্লাইড-ওভার ড্রয়ার মেনু ও রেসপনসিভ গ্রিড যোগ করা হয়েছে।")

    # =========================================================================
    # SLIDE 5: COMPONENT 1 - Login.jsx & AuthContext.jsx
    # =========================================================================
    s5 = prs.slides.add_slide(blank_layout)
    apply_canvas(s5)
    add_slide_header(s5, "Frontend Component", "Component 1: Login.jsx & AuthContext.jsx", "Dual-mode authentication pipeline with automated role redirection and state sync", "Slide 05 / 19")

    add_card(s5, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Component Architecture & Role",
             ["Location: web/src/pages/Login.jsx & web/src/context/AuthContext.jsx",
              "Dual-Mode Switcher: Seamless tab switching between 'Sign In' and 'Create Account' without page reloads.",
              "Municipal Zone Dropdown: Automatically fetches live zones (/api/locations) during consumer registration.",
              "Role-Based Navigation: Evaluates decoded JWT payload and navigates immediately to /admin, /tech, or /consumer.",
              "Persistent Session: Stores JWT token and user profile in browser localStorage for multi-tab synchronization.",
              "Security Footers: Enterprise-grade branding removing all demo testing shortcuts for production readiness."],
             PRIMARY_BLUE)

    add_code_block(s5, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "web/src/pages/Login.jsx",
                   ["const handleLoginSubmit = async (e) => {",
                    "  e.preventDefault(); setError(''); setLoading(true);",
                    "  try {",
                    "    const user = await login(loginEmail, loginPassword);",
                    "    // Role-based automated redirection",
                    "    if (user.role === 'admin') {",
                    "      navigate('/admin');",
                    "    } else if (user.role === 'technician') {",
                    "      navigate('/tech');",
                    "    } else {",
                    "      navigate('/consumer');",
                    "    }",
                    "  } catch (err) {",
                    "    setError(err.response?.data?.error || 'Invalid credentials');",
                    "  } finally { setLoading(false); }",
                    "};"],
                   "Authenticates via AuthContext, evaluates role claim in JWT, and dispatches the user to their designated dashboard.")

    set_notes(s5, "লগইন পেজটি ডুয়াল-মোড (Sign In ও Create Account)। লগইন সফল হলে ইউজারের রোল অনুযায়ী স্বয়ংক্রিয়ভাবে সঠিক ড্যাশবোর্ডে রিডাইরেক্ট করে দেয়।")

    # =========================================================================
    # SLIDE 6: COMPONENT 2 - OutageReportingCard.jsx
    # =========================================================================
    s6 = prs.slides.add_slide(blank_layout)
    apply_canvas(s6)
    add_slide_header(s6, "Frontend Component", "Component 2: OutageReportingCard.jsx", "Adaptive 1-tap reporting card with real-time reactive color state switching", "Slide 06 / 19")

    add_card(s6, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Component Architecture & Role",
             ["Location: web/src/features/consumer/components/OutageReportingCard.jsx",
              "Adaptive Visual State: Switches instantly to Rose-Red (bg-rose-50/80) when user reports 'OFF', and returns to Emerald-Green (bg-emerald-50) when online.",
              "Two Big Touch Targets: 'Electricity OFF' and 'Report Electricity BACK' designed for stressed users during dark blackouts.",
              "Confidence Score Gauge: Embeds ConfidenceBadge showing verified cluster certainty when an incident is active.",
              "Spam Prevention State: Temporarily disables button after clicking to prevent accidental double-taps.",
              "Offline Queue Binding: Submits via offlineQueue service if internet connectivity drops."],
             ACCENT_ROSE)

    add_code_block(s6, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "web/src/features/consumer/components/OutageReportingCard.jsx",
                   ["// Dynamic state styling based on active outage or user report",
                    "const isOutageConfirmed = Boolean(activeOutage);",
                    "const isPersonalOutageReported = !isOutageConfirmed && lastReportType === 'OFF';",
                    "",
                    "<div className={`rounded-2xl p-6 border transition ${",
                    "  isOutageConfirmed",
                    "    ? 'bg-red-50/70 border-red-200'         // Confirmed Outage",
                    "    : isPersonalOutageReported",
                    "    ? 'bg-rose-50/80 border-rose-300'       // User Reported OFF",
                    "    : 'bg-emerald-50/70 border-emerald-200' // Grid Active & Online",
                    "}`}>",
                    "  <button onClick={() => onReport('OFF')} disabled={isRedDisabled}>",
                    "    Report Electricity OFF",
                    "  </button>",
                    "</div>"],
                   "Real-time reactive CSS bindings visually confirm the citizen's outage signal instantly before server aggregation completes.")

    set_notes(s6, "আউটেজ রিপোর্টিং কার্ডটি ইউজারের ক্লিকে সাথে সাথে রিঅ্যাক্ট করে। কারেন্ট চলে গেলে ইউজার 'OFF' চাপলেই ব্যানারটি লাল হয়ে সিগন্যাল নিশ্চিত করে, আর বিদ্যুৎ আসলে 'BACK' চাপলে পুনরায় সবুজ হয়ে যায়।")

    # =========================================================================
    # SLIDE 7: COMPONENT 3 - OutageMap.jsx
    # =========================================================================
    s7 = prs.slides.add_slide(blank_layout)
    apply_canvas(s7)
    add_slide_header(s7, "Frontend Component", "Component 3: OutageMap.jsx", "Geospatial mapping engine visualizing Dhaka grid zones, feeders, and incident severity", "Slide 07 / 19")

    add_card(s7, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Component Architecture & Role",
             ["Location: web/src/components/OutageMap.jsx",
              "Leaflet Integration: Renders OpenStreetMap tiles with custom SVG electrical transformer marker icons.",
              "3-Tier Severity Indicators: Green (Normal/Powered), Yellow/Amber (Pending Verification), Red (Active High-Confidence Blackout).",
              "AutoFitBounds Helper: Dynamically recalculates map bounding box to zoom automatically onto active incident clusters.",
              "Floating Legend: Visual indicator explaining severity thresholds and pin statuses to citizens.",
              "Defensive Coordinate Sanitizer: Uses parseFloat() to eliminate Leaflet .toFixed string crash bugs from MySQL decimals."],
             PRIMARY_BLUE)

    add_code_block(s7, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "web/src/components/OutageMap.jsx",
                   ["// Safe coordinate parsing preventing string decimal crash",
                    "const lat = parseFloat(loc.latitude);",
                    "const lng = parseFloat(loc.longitude);",
                    "if (isNaN(lat) || isNaN(lng)) return null;",
                    "",
                    "// 3-Tier Dynamic Status Pin Evaluation",
                    "const status = loc.active_incident",
                    "  ? (loc.confidence >= 70 ? 'CRITICAL_OUTAGE' : 'PENDING_VERIFY')",
                    "  : 'GRID_ONLINE';",
                    "",
                    "<Marker position={[lat, lng]} icon={createGridIcon(status)}>",
                    "  <Popup><b>{loc.area} ({loc.zone})</b>: {status}</Popup>",
                    "</Marker>"],
                   "Parses GPS points defensively, assigns custom color-coded map pins, and binds interactive popups for zone telemetry.")

    set_notes(s7, "আউটেজ ম্যাপে Leaflet ব্যবহার করে ঢাকার বিভিন্ন জোন (মিরপুর, গুলশান ইত্যাদি) ৩টি রঙে (সবুজ, হলুদ, লাল) দেখানো হয়। এতে ক্লিক করলে এরিয়া ও ফিডার স্ট্যাটাস দেখা যায়।")

    # =========================================================================
    # SLIDE 8: COMPONENT 4 - TechnicianDashboard.jsx & TaskDetail
    # =========================================================================
    s8 = prs.slides.add_slide(blank_layout)
    apply_canvas(s8)
    add_slide_header(s8, "Frontend Component", "Component 4: Technician Portals", "Mobile-first work order queue, 1-tap GPS routing, and 4-stage repair lifecycle", "Slide 08 / 19")

    add_card(s8, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Component Architecture & Role",
             ["Location: web/src/pages/TechnicianDashboard.jsx & TechnicianTaskDetail.jsx",
              "Real-Time Job Queue: Displays prioritized emergency work orders assigned to the logged-in field technician.",
              "1-Tap GPS Trigger: Opens Google Maps navigation pre-loaded with exact latitude/longitude of the damaged transformer pole.",
              "4-Stage State Machine: Step-by-step lifecycle tracking (Assigned -> In Progress -> Work Done -> Resolved).",
              "Incident Escalation: Field technician can flag 'Escalated' if replacement transformers or additional crews are required.",
              "Direct Citizen Dialing: tel: links to call reporting building caretakers directly from mobile."],
             ACCENT_AMBER)

    add_code_block(s8, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "web/src/pages/TechnicianTaskDetail.jsx",
                   ["// 4-Stage Work Order State Machine Transitions",
                    "const handleUpdateStatus = async (nextStatus) => {",
                    "  await api.patch(`/technicians/assignments/${id}/status`, {",
                    "    status: nextStatus, notes: technicianNotes",
                    "  });",
                    "  // If resolved, incident closes and consumers notified",
                    "  if (nextStatus === 'RESOLVED') {",
                    "    showToast('Work Order Completed! Power verified restored.');",
                    "    navigate('/tech');",
                    "  }",
                    "};",
                    "// GPS Navigation Link",
                    "<a href={`https://maps.google.com/?q=${lat},${lng}`} target='_blank'>",
                    "  📍 Open in Google Maps Navigation",
                    "</a>"],
                   "Governs field repair lifecycle, synchronizes with central admin dispatch, and deep-links to turn-by-turn GPS navigation.")

    set_notes(s8, "টেকনিশিয়ান পোর্টালটি ফিল্ড ওয়ার্কারদের স্মার্টফোনের উপযোগী করে তৈরি। ১ ক্লিকে গুগল ম্যাপে ট্রান্সফরমারের লোকেশনে চলে যাওয়া যায় এবং ৪ ধাপে কাজের অগ্রগতি আপডেট করা যায়।")

    # =========================================================================
    # SLIDE 9: COMPONENT 5 - AdminDashboard.jsx & AdminLayout.jsx
    # =========================================================================
    s9 = prs.slides.add_slide(blank_layout)
    apply_canvas(s9)
    add_slide_header(s9, "Frontend Component", "Component 5: Admin Command Center", "City-wide incident triage, mobile slide-over drawer, and load-shedding governance", "Slide 09 / 19")

    add_card(s9, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Component Architecture & Role",
             ["Location: web/src/pages/AdminDashboard.jsx & web/src/components/AdminLayout.jsx",
              "City-Wide Incident Triage: Live aggregated feed of all Dhaka zone blackouts with algorithmic confidence badges.",
              "Mobile Slide-Over Drawer: Responsive sidebar drawer with hamburger toggle (Menu/X) auto-closing on route navigation.",
              "Technician Crew Dispatch: Filter technicians by availability and dispatch nearest crew in 1 click.",
              "Planned Load-Shedding: Schedule feeder maintenance shutdowns with start/end windows and citizen broadcast.",
              "Security Audit Logs: Read-only chronological stream of all system actions for municipal compliance."],
             PRIMARY_BLUE)

    add_code_block(s9, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "web/src/components/AdminLayout.jsx",
                   ["// Responsive Slide-Over Drawer Sidebar for Mobile Devices",
                    "{mobileMenuOpen && (",
                    "  <div className='fixed inset-0 z-50 lg:hidden'>",
                    "    <div className='fixed inset-0 bg-slate-950/80 backdrop-blur-xs'",
                    "         onClick={() => setMobileMenuOpen(false)} />",
                    "    <aside className='fixed inset-y-0 left-0 w-72 bg-slate-900 p-4'>",
                    "      <button onClick={() => setMobileMenuOpen(false)}><X /></button>",
                    "      {renderNavLinks()}       {/* Triage, Zones, Load-Shedding */}",
                    "      {renderSidebarFooter()}  {/* User Profile & Switch View */}",
                    "    </aside>",
                    "  </div>",
                    ")}"],
                   "Provides full desktop sidebar on wide monitors and converts cleanly into a touch-friendly slide-over drawer on mobile viewports.")

    set_notes(s9, "অ্যাডমিন ড্যাশবোর্ডে পুরো শহরের আউটেজ ট্রায়াজ করা যায়, টেকনিশিয়ান ডিসপ্যাচ করা যায় এবং লোডশেডিং শিডিউল পাবলিশ করা যায়। মোবাইলের জন্য স্লাইড-ওভার ড্রয়ার মেনু তৈরি করা হয়েছে।")

    # =========================================================================
    # SLIDE 10: COMPONENT 6 - offlineQueue.js & OfflineBanner.jsx
    # =========================================================================
    s10 = prs.slides.add_slide(blank_layout)
    apply_canvas(s10)
    add_slide_header(s10, "Frontend Component", "Component 6: offlineQueue.js & OfflineBanner.jsx", "Offline-first resilience ensuring zero signal loss during blackout network drops", "Slide 10 / 19")

    add_card(s10, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Component Architecture & Role",
             ["Location: web/src/services/offlineQueue.js & web/src/components/OfflineBanner.jsx",
              "The Blackout Conundrum: Severe storm blackouts frequently disrupt local cellular internet towers.",
              "LocalStorage Signal Stash: Outage signals ('OFF' / 'BACK') are assigned client UUIDs and saved in localStorage.",
              "Real-Time Connectivity Listener: Listens for window 'online' & 'offline' events to display ambient warning banners.",
              "Automated Background Flush: When connectivity restores, autoFlushQueue() syncs all reports to /api/reports/sync.",
              "Guarantees Zero Signal Loss: Timestamps are preserved so confidence scoring accurately measures time-burst velocity."],
             ACCENT_EMERALD)

    add_code_block(s10, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "web/src/services/offlineQueue.js",
                   ["export const queueOfflineReport = (reportData) => {",
                    "  const reports = getOfflineReports();",
                    "  const queuedItem = {",
                    "    ...reportData,",
                    "    client_uuid: generateUUID(),",
                    "    queued_at: new Date().toISOString()",
                    "  };",
                    "  reports.push(queuedItem);",
                    "  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(reports));",
                    "  return queuedItem;",
                    "};",
                    "// Auto-flush when browser regains internet",
                    "window.addEventListener('online', () => autoFlushQueue());"],
                   "Caches reports in localStorage with UUIDs during network cuts, then automatically flushes them to the API upon reconnection.")

    set_notes(s10, "ব্ল্যাকআউটের সময় মোবাইল নেটওয়ার্ক ডাউন হলেও কোনো সিগন্যাল হারায় না। offlineQueue ব্রাউজারের লোকালস্টোরেজে রিপোর্ট জমিয়ে রাখে এবং নেট পেলেই স্বয়ংক্রিয়ভাবে ব্যাকএন্ডে সিঙ্ক করে দেয়।")

    # =========================================================================
    # SLIDE 11: PART II - BACKEND ARCHITECTURE OVERVIEW
    # =========================================================================
    s11 = prs.slides.add_slide(blank_layout)
    apply_canvas(s11)
    add_slide_header(s11, "Part II: Backend", "Backend Architecture & Clean Layering", "High-throughput asynchronous Node.js / Express engine with strict separation of concerns", "Slide 11 / 19")

    add_card(s11, Inches(0.8), Inches(1.7), Inches(5.66), Inches(5.1),
             "Core Backend Stack & Libraries",
             ["Node.js (v18+ LTS): Asynchronous, event-driven execution runtime capable of handling thousands of concurrent signals.",
              "Express 4.21: Minimalist, high-performance web routing framework.",
              "mysql2/promise: Async/await connection pool with native SSL encryption and decimal parsing.",
              "bcryptjs: Cryptographic password hashing using 10 salt rounds.",
              "jsonwebtoken: Dual-token signing for stateless REST authentication.",
              "helmet: HTTP security header suite mitigating XSS, sniffing, and clickjacking.",
              "express-rate-limit: IP-level request throttling preventing denial of service."],
             ACCENT_AMBER)

    add_card(s11, Inches(6.86), Inches(1.7), Inches(5.66), Inches(5.1),
             "Clean Modular Directory Architecture",
             ["server.js: Entrypoint configuring global middleware pipeline and route mounting.",
              "src/config/db.js: Connection pool manager connecting to Aiven Cloud MySQL with SQL dialect normalizer.",
              "src/controllers/: 16 dedicated controllers validating payloads and returning standard JSON responses.",
              "src/services/: Isolated business logic (confidence scoring engine, outage lifecycle manager, notification sync).",
              "src/middleware/: JWT verification, role-based access guards (RBAC), and error handlers.",
              "src/scripts/: Database migration, table initialization, and confidence simulation scripts."],
             PRIMARY_BLUE)

    set_notes(s11, "ব্যাকএন্ডে Node.js ও Express ব্যবহার করা হয়েছে। কোডকে কন্ট্রোলার, সার্ভিস, রাউট এবং কনফিগ লেয়ারে ভাগ করে ক্লিন আর্কিটেকচার বজায় রাখা হয়েছে যাতে সহজেই মেইনটেইন ও স্কেল করা যায়।")

    # =========================================================================
    # SLIDE 12: BACKEND SERVICE 1 - server.js
    # =========================================================================
    s12 = prs.slides.add_slide(blank_layout)
    apply_canvas(s12)
    add_slide_header(s12, "Backend Component", "Service 1: server.js — Security Gateway & Middleware", "Global request pipeline, rate limiting, and domain-restricted CORS firewall", "Slide 12 / 19")

    add_card(s12, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Service Architecture & Role",
             ["Location: backend/server.js",
              "Express API Entrypoint: Bootstraps HTTP server on PORT 5000 with keep-alive connections.",
              "Strict CORS Whitelist: Restricts API access exclusively to authorized frontend domains (power-pulse-app.vercel.app & localhost).",
              "Helmet Security Headers: Injects strict Content-Security-Policy, HSTS, and frameguard protections.",
              "Rate Limiting Guards: Throttles authentication routes (/api/auth) to 5 attempts per 15 mins to prevent brute-forcing.",
              "Global Error Interceptor: Catches unhandled promise rejections and formats standard 500 JSON errors."],
             PRIMARY_BLUE)

    add_code_block(s12, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "backend/server.js",
                   ["const allowedOrigins = [",
                    "  'https://power-pulse-app.vercel.app',",
                    "  'http://localhost:5173', 'http://localhost:3000'",
                    "];",
                    "app.use(cors({",
                    "  origin: (origin, cb) => {",
                    "    if (!origin || allowedOrigins.includes(origin)) cb(null, true);",
                    "    else cb(new Error('Blocked by CORS policy'));",
                    "  },",
                    "  credentials: true",
                    "}));",
                    "app.use(helmet());",
                    "app.use('/api/auth', authRateLimiter);"],
                   "Hardens the API perimeter, rejects unauthorized origins, and shields endpoints from automated brute-force attacks.")

    set_notes(s12, "server.js হলো API-এর প্রধান গেটওয়ে। এতে Helmet দিয়ে সিকিউরিটি হেডার, CORS দিয়ে অনুমোদিত ডোমেইন লক, এবং Rate Limiter দিয়ে অতিরিক্ত স্প্যাম রিকোয়েস্ট ব্লক করা হয়েছে।")

    # =========================================================================
    # SLIDE 13: BACKEND SERVICE 2 - auth.js & authController.js
    # =========================================================================
    s13 = prs.slides.add_slide(blank_layout)
    apply_canvas(s13)
    add_slide_header(s13, "Backend Component", "Service 2: auth.js — Dual-Token JWT & RBAC Guard", "Stateless authentication, database token revocation, and role-based access control", "Slide 13 / 19")

    add_card(s13, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Service Architecture & Role",
             ["Location: backend/src/middleware/auth.js & backend/src/controllers/authController.js",
              "Dual-Token JWT Pipeline: Short-lived access token (15m) paired with long-lived refresh token (7d).",
              "Database Token Blacklisting: Tokens are blacklisted in blacklisted_tokens table upon logout, preventing replay attacks.",
              "Role-Based Access Guard: requireRole(['admin']) ensures technicians or citizens cannot access admin endpoints.",
              "Bcrypt Hashing: Salted password hashing with 10 salt rounds ensures no plaintext passwords exist in database.",
              "Live User Hydration: Middleware extracts decoded user ID and loads live reliability score directly into req.user."],
             ACCENT_PURPLE)

    add_code_block(s13, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "backend/src/middleware/auth.js",
                   ["async function authenticateToken(req, res, next) {",
                    "  const token = req.headers['authorization']?.split(' ')[1];",
                    "  if (!token) return res.status(401).json({ error: 'TokenRequired' });",
                    "",
                    "  // 1. Check blacklist in MySQL to prevent logout replay",
                    "  const revoked = await db.prepare('SELECT id FROM blacklisted_tokens WHERE token = ?').get(token);",
                    "  if (revoked) return res.status(401).json({ error: 'TokenRevoked' });",
                    "",
                    "  // 2. Verify JWT signature & load user role",
                    "  jwt.verify(token, JWT_ACCESS_SECRET, async (err, decoded) => {",
                    "    if (err) return res.status(401).json({ error: 'InvalidToken' });",
                    "    req.user = await db.prepare('SELECT * FROM users WHERE user_id = ?').get(decoded.id);",
                    "    next();",
                    "  });",
                    "}"],
                   "Validates JWT signatures, checks database blacklist for immediate session revocation, and populates req.user securely.")

    set_notes(s13, "অথেন্টিকেশন সিস্টেমে ডুয়াল-টোকেন JWT ব্যবহার করা হয়েছে। লগআউট করলে টোকেন ডাটাবেসে ব্ল্যাকলিস্ট হয়ে যায় যাতে কেউ পুরানো টোকেন দিয়ে পুনরায় ঢুকতে না পারে।")

    # =========================================================================
    # SLIDE 14: CORE ENGINE 3 - confidence.js (ALGORITHM CODE)
    # =========================================================================
    s14 = prs.slides.add_slide(blank_layout)
    apply_canvas(s14)
    add_slide_header(s14, "Algorithmic Engine", "Service 3: confidence.js — Mathematical Scoring Engine", "Spatio-temporal clustering, IoT heartbeat weighting, and Byzantine anti-spam capping", "Slide 14 / 19")

    add_card(s14, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Mathematical Engine Logic",
             ["Formula: Score (0-100) = ReportFactor + UniqueUserFactor + TimeClusterFactor + ReliabilityFactor - Penalty",
              "Volume Factor (Max 30): Math.min(validReports.length * 3, 30).",
              "Unique Neighbor Factor (Max 40): Math.min(uniqueUsers * 8, 40) ensures diverse neighborhood consensus.",
              "Time Burst Factor (Max 20): <=10 mins = 20 pts; <=30 mins = 10 pts.",
              "Reliability Factor (Max 10): Scaled average of citizen reliability scores.",
              "Byzantine Anti-Spam Capping: Prevents 1 malicious neighbor from muting an entire blackout using spam penalties (capped at 12 pts).",
              "Threshold: Score >= 70% automatically promotes incident to ACTIVE."],
             PRIMARY_BLUE)

    add_code_block(s14, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "backend/src/services/confidence.js",
                   ["function calculateConfidenceScore(reports = [], penalties = {}) {",
                    "  const validReports = reports.filter(r => r.type === 'OFF' && !r.is_spam);",
                    "  const reportFactor = Math.min(validReports.length * 3, 30);",
                    "  const uniqueUsers = new Set(validReports.map(r => r.user_id)).size;",
                    "  const uniqueUserFactor = Math.min(uniqueUsers * 8, 40);",
                    "",
                    "  // Time Burst Clustering (Burst within 10 minutes)",
                    "  const spanMins = (maxTime - minTime) / (1000 * 60);",
                    "  const timeClusterFactor = spanMins <= 10 ? 20 : (spanMins <= 30 ? 10 : 0);",
                    "",
                    "  // Byzantine Fault-Tolerant Spam Capping",
                    "  const maxPenalty = uniqueUsers >= 3 ? 12 : (uniqueUsers >= 2 ? 18 : 25);",
                    "  const totalPenalty = Math.min(rawPenalty, maxPenalty);",
                    "",
                    "  return Math.max(0, Math.min(100, Math.round(",
                    "    reportFactor + uniqueUserFactor + timeClusterFactor + relFactor - totalPenalty",
                    "  )));",
                    "}"],
                   "Executes spatio-temporal clustering and Byzantine anti-spam capping to output an accurate 0-100% confidence rating.")

    set_notes(s14, "এটি প্রজেক্টের সবচেয়ে গুরুত্বপূর্ণ গাণিতিক অ্যালগরিদম। রিপোর্ট সংখ্যা (৩০), ইউনিক ইউজার (৪০), টাইম ক্লাস্টার (২০) এবং রিলায়েবিলিটি (১০) যোগ করে স্কোর বের করা হয়। ৭০-এর বেশি হলেই ইনসিডেন্ট চালু হয়।")

    # =========================================================================
    # SLIDE 15: CORE ENGINE 4 - outageService.js & incidentController
    # =========================================================================
    s15 = prs.slides.add_slide(blank_layout)
    apply_canvas(s15)
    add_slide_header(s15, "Backend Component", "Service 4: outageService.js — Incident State Machine", "Automated incident escalation, nearest technician matching, and notification triggers", "Slide 15 / 19")

    add_card(s15, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Service Architecture & Role",
             ["Location: backend/src/services/outageService.js & backend/src/controllers/incidentController.js",
              "Signal Ingestion & Grouping: Groups incoming citizen reports by location_id and active time window.",
              "Automated Escalation: When confidence score reaches >= 70%, automatically creates an ACTIVE incident in MySQL.",
              "Intelligent Technician Dispatch: Matches nearest available technician in the same zone whose availability_status is 'AVAILABLE'.",
              "Real-Time Consumer Alerting: Pushes notification to all citizens in that zone that crew has been dispatched.",
              "Incident Resolution Lifecycle: Auto-resolves incident when technician marks job complete."],
             ACCENT_EMERALD)

    add_code_block(s15, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "backend/src/services/outageService.js",
                   ["async function evaluateOutageCluster(locationId) {",
                    "  const reports = await getRecentReportsForLocation(locationId);",
                    "  const { score, classification } = calculateConfidenceScore(reports);",
                    "",
                    "  if (score >= 70) {",
                    "    // Auto-promote to active incident in database",
                    "    const incident = await db.prepare(`",
                    "      INSERT INTO incidents (location_id, confidence_score, status)",
                    "      VALUES (?, ?, 'ACTIVE')",
                    "    `).run(locationId, score);",
                    "",
                    "    // Auto-dispatch nearest available technician",
                    "    await autoDispatchTechnician(incident.lastInsertRowid, locationId);",
                    "    await notifyZoneResidents(locationId, 'Technician Dispatched');",
                    "  }",
                    "}"],
                   "Monitors location clusters, triggers automatic incident creation upon 70% confidence, and dispatches field technicians.")

    set_notes(s15, "আউটেজ সার্ভিস ইনসিডেন্টের পুরো লাইফসাইকেল নিয়ন্ত্রণ করে। স্কোর ৭০% হলেই এটি ডাটাবেসে একটি ইনসিডেন্ট খোলে, টেকনিশিয়ানকে পুশ অ্যালার্ট পাঠায় এবং ওই এলাকার সব মানুষকে মেসেজ পাঠিয়ে দেয়।")

    # =========================================================================
    # SLIDE 16: DATABASE SERVICE 5 - db.js & Aiven MySQL Pool
    # =========================================================================
    s16 = prs.slides.add_slide(blank_layout)
    apply_canvas(s16)
    add_slide_header(s16, "Database Service", "Service 5: db.js — Aiven Cloud MySQL SSL Pool", "Universal async database interface with connection pooling, SSL encryption, and SQL normalizer", "Slide 16 / 19")

    add_card(s16, Inches(0.8), Inches(1.7), Inches(5.0), Inches(5.1),
             "Service Architecture & Role",
             ["Location: backend/src/config/db.js",
              "Managed Cloud Connection Pool: Leverages mysql2/promise with 15 concurrent pooled connections to Aiven Cloud MySQL.",
              "Enforced SSL Encryption: Encrypts all database network traffic in transit using TLS.",
              "Dialect Normalizer (normalizeSql): Translates SQLite-style datetime('now') functions to standard MySQL NOW() & DATE_SUB().",
              "Universal Wrapper: Exposes async db.prepare(...).get(), .all(), and .run() wrappers matching standard async query conventions.",
              "Decimal Precision Mode: decimalNumbers: true ensures GPS coordinates return as numeric floats, avoiding frontend crashes."],
             PRIMARY_BLUE)

    add_code_block(s16, Inches(6.1), Inches(1.7), Inches(6.4), Inches(5.1),
                   "backend/src/config/db.js",
                   ["const pool = mysql.createPool({",
                    "  host: process.env.DB_HOST,           // Aiven Cloud MySQL Host",
                    "  port: Number(process.env.DB_PORT),     // 24932",
                    "  user: process.env.DB_USER,             // avnadmin",
                    "  password: process.env.DB_PASSWORD,",
                    "  database: process.env.DB_NAME,         // defaultdb",
                    "  waitForConnections: true,",
                    "  connectionLimit: 15,",
                    "  decimalNumbers: true,                  // Float coordinate parsing",
                    "  ssl: { rejectUnauthorized: false }     // Enforced TLS",
                    "});",
                    "// SQLite-to-MySQL Dialect Normalizer",
                    "function normalizeSql(sql) {",
                    "  return sql.replace(/datetime\\('now'\\)/gi, 'NOW()');",
                    "}"],
                   "Maintains a resilient SSL connection pool to Aiven Cloud MySQL, normalizing SQL queries and guaranteeing zero data loss.")

    set_notes(s16, "ডাটাবেস কানেকশনের জন্য db.js-এ Aiven Cloud MySQL-এর SSL কানেকশন পুল তৈরি করা হয়েছে। এতে ১৫টি পুুল কানেকশন এবং অটোমেটিক SQL নরমালাইজার রয়েছে।")

    # =========================================================================
    # SLIDE 17: PART III - DATABASE RELATIONAL SCHEMA
    # =========================================================================
    s17 = prs.slides.add_slide(blank_layout)
    apply_canvas(s17)
    add_slide_header(s17, "Part III: Database", "Relational Database Schema (MySQL 8.0)", "14 normalized tables modeled for ACID compliance, referential integrity & high query performance", "Slide 17 / 19")

    add_card(s17, Inches(0.8), Inches(1.7), Inches(3.64), Inches(5.1),
             "Primary Core Tables",
             ["locations: location_id (PK), district, area, zone, latitude, longitude.",
              "users: user_id (PK), name, email (UK), phone, password_hash, role, reliability_score.",
              "technicians: technician_id (PK), user_id (FK), specialization, availability_status, active_zone.",
              "incidents: incident_id (PK), location_id (FK), status, confidence_score, started_at."],
             PRIMARY_BLUE)

    add_card(s17, Inches(4.84), Inches(1.7), Inches(3.64), Inches(5.1),
             "Operations & Reporting Tables",
             ["reports: report_id (PK), user_id (FK), location_id (FK), report_type (OFF/BACK), is_spam.",
              "assignments: assignment_id (PK), incident_id (FK), technician_id (FK), status (ASSIGNED/RESOLVED).",
              "complaints: complaint_id (PK), user_id (FK), category, description, status.",
              "planned_outages: outage_id (PK), location_id (FK), start_time, end_time, reason."],
             ACCENT_AMBER)

    add_card(s17, Inches(8.88), Inches(1.7), Inches(3.64), Inches(5.1),
             "Security & Telemetry Tables",
             ["notifications: notif_id (PK), user_id (FK), message, is_read, created_at.",
              "audit_logs: log_id (PK), user_id (FK), action, details, timestamp (Immutable audit trail).",
              "smart_meter_bills & meter_readings: Simulated IoT telemetry and billing history.",
              "refresh_tokens & blacklisted_tokens: Stateless JWT rotation and revocation logs."],
             ACCENT_EMERALD)

    set_notes(s17, "ডাটাবেসে ১৪টি রিলেশনাল টেবিল রয়েছে। লোকেশন, ইউজার, ইনসিডেন্ট, টেকনিশিয়ান এবং অডিট লগ একে অপরের সাথে ফরেন কি দিয়ে যুক্ত, যা সম্পূর্ণ ACID কমপ্লায়েন্ট।")

    # =========================================================================
    # SLIDE 18: VIVA DEFENSE MASTER CHEAT-SHEET
    # =========================================================================
    s18 = prs.slides.add_slide(blank_layout)
    apply_canvas(s18)
    add_slide_header(s18, "Defense Q&A", "Faculty Viva Master Cheat-Sheet", "Bulletproof technical arguments answering the 4 most challenging examiner questions", "Slide 18 / 19")

    add_card(s18, Inches(0.8), Inches(1.7), Inches(5.66), Inches(2.45),
             "Q1: Grids already have sensors. Why user input?",
             ["Examiner Argument: SCADA systems detect grid power status automatically.",
              "Technical Defense: SCADA is restricted to high-voltage substations (33kV/11kV). 90% of outages occur on local LT lines, drop-out fuses, and pole transformers. PowerPulse bridges this multi-million dollar sensor blind spot using crowdsourced telemetry."],
             ACCENT_ROSE)

    add_card(s18, Inches(6.86), Inches(1.7), Inches(5.66), Inches(2.45),
             "Q2: How do you prevent malicious fake reports?",
             ["Examiner Argument: Pranksters can click 'OFF' to create fake blackout alerts.",
              "Technical Defense: Bayesian Reliability Scoring tracks user credibility over time. Isolated single reports never exceed 40% confidence. Byzantine anti-spam capping ensures consensus without false alarms."],
             ACCENT_AMBER)

    add_card(s18, Inches(0.8), Inches(4.35), Inches(5.66), Inches(2.45),
             "Q3: How do users report if internet drops?",
             ["Examiner Argument: Outages cause local cell phone towers to lose power.",
              "Technical Defense: Frontend uses an Offline-First Caching queue (localStorage). Signals are preserved with client UUIDs and exact timestamps, and auto-flush to the server the moment connectivity returns."],
             ACCENT_EMERALD)

    add_card(s18, Inches(6.86), Inches(4.35), Inches(5.66), Inches(2.45),
             "Q4: Why MySQL over NoSQL/MongoDB?",
             ["Examiner Argument: Why relational MySQL instead of flexible MongoDB?",
              "Technical Defense: Power utility data is deeply relational and requires ACID consistency (e.g. matching assignments to technicians without double-dispatch). Foreign keys prevent orphan tickets and corrupt states."],
             PRIMARY_BLUE)

    set_notes(s18, "ভাইভায় শিক্ষকরা এই ৪টি প্রশ্ন সবচেয়ে বেশি করেন। ১. সেন্সর থাকতে ইউজার রিপোর্ট কেন? ২. ফেক রিপোর্ট রোধ ৩. অফলাইনে ইন্টারনেট না থাকলে কী হবে ৪. নোএসকিউএল বাদ দিয়ে কেন রিলেশনাল মাইএসকিউএল নেওয়া হলো।")

    # =========================================================================
    # SLIDE 19: CONCLUSION & DELIVERABLES
    # =========================================================================
    s19 = prs.slides.add_slide(blank_layout)
    apply_canvas(s19)
    add_slide_header(s19, "Conclusion", "Project Deliverables & Future Enhancements", "Transforming municipal power utility management into an intelligent, transparent ecosystem", "Slide 19 / 19")

    add_card(s19, Inches(0.8), Inches(1.7), Inches(5.66), Inches(5.1),
             "Core Deliverables Completed",
             ["✅ 3 Fully functional role-based portals (Consumer, Field Tech, Admin).",
              "✅ Mathematical confidence scoring engine with spatio-temporal clustering.",
              "✅ Fully migrated to Aiven Cloud MySQL 8.0 with SSL connection pool.",
              "✅ 100% Mobile-first responsive layouts with drawer navigation.",
              "✅ Offline-first outage queueing ensuring zero signal loss.",
              "✅ Live cloud deployment on Vercel CDN and Render API Gateway.",
              "✅ Defensible, production-ready civic-tech architecture."],
             ACCENT_EMERALD)

    add_card(s19, Inches(6.86), Inches(1.7), Inches(5.66), Inches(5.1),
             "Future Scope & Industry Roadmap",
             ["• Real Hardware Gateway: Direct integration with NB-IoT / LoRaWAN smart meter hardware APIs.",
              "• Predictive Outage AI: Machine learning models forecasting storm damage using live weather telemetry.",
              "• IVR Telephony Gateway: Voice-recognition call system for elderly or non-smartphone consumers.",
              "• National Grid Linkage: Direct dispatch integration with National Load Dispatch Centers (NLDC).",
              "• Transformer Predictive Maintenance: Thermal acoustic analysis alerting before physical fuse explosion."],
             PRIMARY_BLUE)

    set_notes(s19, "In summary, PowerPulse delivers an end-to-end, production-grade utility platform. In the future, we plan to connect hardware LoRaWAN meters and predictive AI outage forecasting. Thank you! We welcome your questions.")

    # Save to workspace root
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
    build_presentation()
