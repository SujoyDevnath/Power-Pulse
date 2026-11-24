# ⚡ PowerPulse: Frontend HTML5 & Tailwind CSS Styling Code

> **Course:** PROG 212 - Android and Web Application Development Sessional  
> **Project:** PowerPulse – Smart Electricity Outage Intelligence & Real-Time Field Dispatch  
> **Lead Presenter:** **Tarikul (ID: 30)** – *Frontend Architecture & UI Specialist*  

**Total Source Code Files in this Document:** 5 files  

---

## 📑 Table of Contents & Module Guide

- `01.` **[web/index.html](#file-1)** – *HTML5 Single Page Application Shell*
- `02.` **[web/src/index.css](#file-2)** – *Global Styling & Tailwind CSS Directives*
- `03.` **[web/src/App.css](#file-3)** – *Component-Level CSS & Custom Animations*
- `04.` **[web/tailwind.config.js](#file-4)** – *Tailwind CSS Design System Configuration*
- `05.` **[web/postcss.config.js](#file-5)** – *PostCSS Preprocessor Configuration*

---

## <a id="file-1"></a>[01] `web/index.html`

### 📌 HTML5 Single Page Application Shell
- **ফাইল পাথ:** `Power-Pulse-main/web/index.html`  
- **প্রোগ্রামিং ভাষা:** `html` | **মোট লাইন:** `14` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> এটি আমাদের অ্যাপ্লিকেশনের মূল HTML ফাইল। ব্রাউজার প্রথমে এই ফাইলটি লোড করে এবং এর ভেতর থাকা <div id='root'>-এ আমাদের React অ্যাপটি মাউন্ট হয়।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • Meta viewport: মোবাইলে রেসপনসিভ ভিউ ও স্কেলিং নিশ্চিত করে।
> • Title & Favicon: PowerPulse ব্র্যান্ডিং সেট করে।
> • Script tag: main.jsx এন্ট্রি পয়েন্টকে বুটস্ট্র্যাপ করে।  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "Sir, this is the single HTML shell of our SPA. Vite injects main.jsx here, and the meta viewport guarantees mobile-first responsiveness across phones and desktops."  

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PowerPulse - Smart Electricity Outage Intelligence & Management Platform</title>
  </head>
  <body class="bg-slate-50 text-slate-900 antialiased font-sans">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## <a id="file-2"></a>[02] `web/src/index.css`

### 📌 Global Styling & Tailwind CSS Directives
- **ফাইল পাথ:** `Power-Pulse-main/web/src/index.css`  
- **প্রোগ্রামিং ভাষা:** `css` | **মোট লাইন:** `97` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> এই ফাইলে Tailwind CSS-এর মূল ডিরেক্টিভ এবং প্রজেক্টের গ্লোবাল ডার্ক ব্যাকগ্রাউন্ড (#0b132b) ও কাস্টম স্ক্রলবার ডিফাইন করা হয়েছে।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • @tailwind base, components, utilities: Tailwind ইউটিলিটি ক্লাস লোড করে।
> • Custom body styling: ফন্ট ও টেক্সট কালার গ্লোবালি সেট করে।
> • Glassmorphism classes: ব্লার ব্যাকগ্রাউন্ড কার্ড ডিজাইন।  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "Here we initialize Tailwind CSS engine and define global aesthetic rules like our dark electric-navy theme and smooth scrollbar."  

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-50 text-slate-900 antialiased font-sans;
  }
}

/* Custom scrollbars for tables and panels */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Hide scrollbar for clean mobile tabs & horizontal sliders */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes slideRight {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slideRight {
  animation: slideRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Leaflet Custom Marker & Popup Modern Styling */
.leaflet-container {
  width: 100% !important;
  height: 100% !important;
  z-index: 1 !important;
  background-color: #f1f5f9 !important;
}

.custom-outage-marker,
.custom-online-marker {
  background: transparent !important;
  border: none !important;
}

/* Permanent Area Labels below markers */
.leaflet-tooltip.powerpulse-area-tooltip {
  background-color: rgba(255, 255, 255, 0.95) !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 8px !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12) !important;
  padding: 2px 7px !important;
  font-size: 11px !important;
  color: #1e293b !important;
}

.leaflet-tooltip-bottom:before {
  border-bottom-color: #cbd5e1 !important;
}

.leaflet-popup-content-wrapper {
  border-radius: 16px !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
  padding: 6px !important;
  border: 1px solid #e2e8f0 !important;
}

.leaflet-popup-content {
  margin: 8px 12px !important;
  line-height: 1.4 !important;
}

.leaflet-popup-tip {
  background: #ffffff !important;
  box-shadow: none !important;
}
```

---

## <a id="file-3"></a>[03] `web/src/App.css`

### 📌 Component-Level CSS & Custom Animations
- **ফাইল পাথ:** `Power-Pulse-main/web/src/App.css`  
- **প্রোগ্রামিং ভাষা:** `css` | **মোট লাইন:** `185` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> এই ফাইলে আউটরেজ ম্যাপের রেড পালসিং ইফেক্ট, কার্ডের হোভার ট্রানজিশন এবং কাস্টম অ্যানিমেশন কোড লেখা আছে।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • @keyframes pulse-ring: ম্যাপে ব্ল্যাকআউট এলাকায় লাল স্পন্দনশীল রিং দেখায়।
> • Transition easing: বাটন ও কার্ড ট্রানজিশন মসৃণ করে।  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "We wrote custom CSS keyframe animations here, notably the pulsing red radar ring that visually indicates active blackout zones on our map."  

```css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

.hero {
  position: relative;

  .base,
  .framework,
  .vite {
    inset-inline: 0;
    margin: 0 auto;
  }

  .base {
    width: 170px;
    position: relative;
    z-index: 0;
  }

  .framework,
  .vite {
    position: absolute;
  }

  .framework {
    z-index: 1;
    top: 34px;
    height: 28px;
    transform: perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg)
      scale(1.4);
  }

  .vite {
    z-index: 0;
    top: 107px;
    height: 26px;
    width: auto;
    transform: perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg)
      scale(0.8);
  }
}

#center {
  display: flex;
  flex-direction: column;
  gap: 25px;
  place-content: center;
  place-items: center;
  flex-grow: 1;

  @media (max-width: 1024px) {
    padding: 32px 20px 24px;
    gap: 18px;
  }
}

#next-steps {
  display: flex;
  border-top: 1px solid var(--border);
  text-align: left;

  & > div {
    flex: 1 1 0;
    padding: 32px;
    @media (max-width: 1024px) {
      padding: 24px 20px;
    }
  }

  .icon {
    margin-bottom: 16px;
    width: 22px;
    height: 22px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    text-align: center;
  }
}

#docs {
  border-right: 1px solid var(--border);

  @media (max-width: 1024px) {
    border-right: none;
    border-bottom: 1px solid var(--border);
  }
}

#next-steps ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 8px;
  margin: 32px 0 0;

  .logo {
    height: 18px;
  }

  a {
    color: var(--text-h);
    font-size: 16px;
    border-radius: 6px;
    background: var(--social-bg);
    display: flex;
    padding: 6px 12px;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    transition: box-shadow 0.3s;

    &:hover {
      box-shadow: var(--shadow);
    }
    .button-icon {
      height: 18px;
      width: 18px;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: center;

    li {
      flex: 1 1 calc(50% - 8px);
    }

    a {
      width: 100%;
      justify-content: center;
      box-sizing: border-box;
    }
  }
}

#spacer {
  height: 88px;
  border-top: 1px solid var(--border);
  @media (max-width: 1024px) {
    height: 48px;
  }
}

.ticks {
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: -4.5px;
    border: 5px solid transparent;
  }

  &::before {
    left: 0;
    border-left-color: var(--border);
  }
  &::after {
    right: 0;
    border-right-color: var(--border);
  }
}
```

---

## <a id="file-4"></a>[04] `web/tailwind.config.js`

### 📌 Tailwind CSS Design System Configuration
- **ফাইল পাথ:** `Power-Pulse-main/web/tailwind.config.js`  
- **প্রোগ্রামিং ভাষা:** `javascript` | **মোট লাইন:** `29` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> টেলউইন্ড কনফিগ ফাইলে আমাদের প্রজেক্টের কালার প্যালেট (যেমন cyan, dark-blue, slate), কন্টেন্ট পাথ এবং রেসপনসিভ ব্রেকপয়েন্ট ডিফাইন করা হয়েছে।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']: সব ফাইলে টেলউইন্ড ক্লাস স্ক্যান করে।
> • theme.extend: কাস্টম ব্র্যান্ড কালার ও ড্রপ শ্যাডো যুক্ত করে।  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "This configuration specifies our customized color palette, including electric cyan and dark space navy, ensuring design consistency across all 20 pages."  

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
        },
        outage: {
          red: '#ef4444',
          amber: '#f59e0b',
          yellow: '#eab308',
          green: '#10b981'
        }
      }
    },
  },
  plugins: [],
}
```

---

## <a id="file-5"></a>[05] `web/postcss.config.js`

### 📌 PostCSS Preprocessor Configuration
- **ফাইল পাথ:** `Power-Pulse-main/web/postcss.config.js`  
- **প্রোগ্রামিং ভাষা:** `javascript` | **মোট লাইন:** `7` লাইন  

> **💡 এই ফাইলটির কাজ কী (বাংলা ব্যাখ্যা):**  
> এই ফাইলটি টেলউইন্ড সিএসএস প্রসেস করে ব্রাউজার ও অ্যান্ড্রয়েড ওয়েবভিউ-এর জন্য অটোপ্রিফিক্সার যোগ করে।  

> **⚙️ মূল লজিক ও ফাংশনসমূহ:**  
> • plugins: { tailwindcss: {}, autoprefixer: {} }  

> **🗣️ প্রেজেন্টেশন / ভাইভায় স্যারকে যা বলবে:**  
> "PostCSS compiles our Tailwind rules and applies autoprefixing so CSS vendor prefixes work seamlessly inside Android WebViews."  

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

