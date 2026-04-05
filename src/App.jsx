import { useState } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --green-deep: #1a3a1f;
    --green-mid: #2d6a35;
    --green-bright: #4caf50;
    --gold: #e8c44a;
    --cream: #f5f0e8;
    --earth: #8b6914;
    --white: #ffffff;
    --dark: #0f1f12;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--dark);
    color: var(--cream);
    overflow-x: hidden;
  }

  /* NAV - two rows on mobile */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(15, 31, 18, 0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(76, 175, 80, 0.15);
    position: fixed;
  }
  .nav-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.6rem 0.9rem;
  }
  .nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; font-weight: 900;
    color: var(--gold); letter-spacing: -0.5px;
  }
  .nav-logo span { color: var(--green-bright); }
  .nav-cta {
    background: rgba(76,175,80,0.15); color: var(--green-bright);
    padding: 0.25rem 0.65rem; border-radius: 2rem;
    font-weight: 500; font-size: 0.7rem; cursor: pointer;
    border: 1px solid rgba(76,175,80,0.4); transition: all 0.2s;
    white-space: nowrap; flex-shrink: 0;
  }
  .nav-cta:hover { background: rgba(76,175,80,0.25); }
  .nav-links-row {
    display: flex; align-items: center;
    border-top: 1px solid rgba(76,175,80,0.08);
    padding: 0 0.5rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    gap: 0;
  }
  .nav-links-row::-webkit-scrollbar { display: none; }
  .nav-links-row a {
    color: rgba(245,240,232,0.5); text-decoration: none;
    font-size: 0.72rem; font-weight: 500;
    padding: 0.5rem 0.65rem;
    white-space: nowrap; flex-shrink: 0;
    border-bottom: 2px solid transparent;
    transition: all 0.2s;
  }
  .nav-links-row a:hover { color: var(--gold); }
  .nav-links-row a.active-link { color: var(--green-bright); border-bottom-color: var(--green-bright); }
  .nav-links-row button { flex-shrink: 0; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center;
    padding: 6rem 2rem 4rem;
    position: relative;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 40%, rgba(44,106,53,0.25) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 80% 80%, rgba(232,196,74,0.08) 0%, transparent 60%);
  }
  .hero-grain {
    position: absolute; inset: 0; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(76,175,80,0.12); border: 1px solid rgba(76,175,80,0.3);
    color: var(--green-bright); padding: 0.4rem 1rem;
    border-radius: 2rem; font-size: 0.8rem; font-weight: 500;
    margin-bottom: 2rem; position: relative;
  }
  .badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--green-bright);
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.4); }
  }
  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(3rem, 8vw, 6.5rem);
    font-weight: 900; line-height: 1.05;
    position: relative; margin-bottom: 1.5rem;
  }
  .hero h1 .highlight { color: var(--gold); }
  .hero h1 .green { color: var(--green-bright); }
  .hero-sub {
    font-size: clamp(1rem, 2vw, 1.25rem);
    color: rgba(245,240,232,0.65); font-weight: 300;
    max-width: 600px; line-height: 1.7;
    margin-bottom: 3rem; position: relative;
  }
  .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; position: relative; }
  .btn-primary {
    background: var(--green-bright); color: var(--dark);
    padding: 0.9rem 2.2rem; border-radius: 3rem;
    font-weight: 500; font-size: 1rem; cursor: pointer;
    border: none; transition: all 0.2s;
    display: flex; align-items: center; gap: 0.5rem;
  }
  .btn-primary:hover { background: var(--gold); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(76,175,80,0.3); }
  .btn-secondary {
    background: transparent; color: var(--cream);
    padding: 0.9rem 2.2rem; border-radius: 3rem;
    font-weight: 400; font-size: 1rem; cursor: pointer;
    border: 1px solid rgba(245,240,232,0.2); transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }

  /* STATS */
  .stats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    padding: 1.5rem 1.2rem;
    border-top: 1px solid rgba(76,175,80,0.1);
    border-bottom: 1px solid rgba(76,175,80,0.1);
  }
  .stat {
    text-align: center;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(76,175,80,0.1);
    border-radius: 0.9rem;
    padding: 1rem 0.5rem;
  }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem; font-weight: 700;
    color: var(--gold);
  }
  .stat-label { font-size: 0.72rem; color: rgba(245,240,232,0.5); margin-top: 0.3rem; line-height: 1.4; }

  /* FEATURES */
  .features {
    padding: 6rem 3rem;
    max-width: 1100px; margin: 0 auto;
  }
  .section-label {
    font-size: 0.75rem; font-weight: 500; letter-spacing: 0.15em;
    color: var(--green-bright); text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem); font-weight: 700;
    margin-bottom: 3.5rem; line-height: 1.2;
  }
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .feature-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(76,175,80,0.12);
    border-radius: 1.2rem; padding: 2rem;
    transition: all 0.3s;
    cursor: default;
  }
  .feature-card:hover {
    background: rgba(76,175,80,0.06);
    border-color: rgba(76,175,80,0.3);
    transform: translateY(-4px);
  }
  .feature-icon {
    font-size: 2rem; margin-bottom: 1rem;
    width: 52px; height: 52px;
    background: rgba(76,175,80,0.1);
    border-radius: 0.75rem;
    display: flex; align-items: center; justify-content: center;
  }
  .feature-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem; font-weight: 700;
    margin-bottom: 0.6rem; color: var(--white);
  }
  .feature-desc { font-size: 0.9rem; color: rgba(245,240,232,0.55); line-height: 1.6; }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); opacity: 0.4; }
    50% { transform: translateY(-5px); opacity: 1; }
  }

  /* CHAT DEMO */
  .demo-section {
    padding: 4rem 3rem 6rem;
    max-width: 900px; margin: 0 auto;
  }
  .chat-window {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(76,175,80,0.15);
    border-radius: 1.5rem; overflow: hidden;
  }
  .chat-header {
    background: rgba(76,175,80,0.1);
    padding: 1rem 1.5rem;
    display: flex; align-items: center; gap: 0.75rem;
    border-bottom: 1px solid rgba(76,175,80,0.1);
  }
  .chat-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    background: var(--green-bright);
    display: flex; align-items: center; justify-content: center;
    font-size: 1rem;
  }
  .chat-name { font-weight: 500; font-size: 0.95rem; }
  .chat-status { font-size: 0.75rem; color: var(--green-bright); }
  .chat-body { padding: 1.5rem; display: flex; flex-direction: column; gap: 1rem; min-height: 280px; }
  .msg { max-width: 75%; padding: 0.75rem 1rem; border-radius: 1rem; font-size: 0.9rem; line-height: 1.5; }
  .msg-user {
    background: var(--green-mid); color: white;
    align-self: flex-end; border-bottom-right-radius: 0.25rem;
  }
  .msg-bot {
    background: rgba(255,255,255,0.06); color: var(--cream);
    align-self: flex-start; border-bottom-left-radius: 0.25rem;
    border: 1px solid rgba(76,175,80,0.15);
  }
  .chat-input-row {
    display: flex; gap: 0.75rem; padding: 1rem 1.5rem;
    border-top: 1px solid rgba(76,175,80,0.1);
  }
  .chat-input {
    flex: 1; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(76,175,80,0.2);
    border-radius: 2rem; padding: 0.65rem 1.2rem;
    color: var(--cream); font-size: 0.9rem; font-family: 'DM Sans', sans-serif;
    outline: none;
  }
  .chat-input:focus { border-color: var(--green-bright); }
  .chat-send {
    background: var(--green-bright); border: none;
    border-radius: 50%; width: 40px; height: 40px;
    cursor: pointer; font-size: 1rem;
    transition: background 0.2s; flex-shrink: 0;
  }
  .chat-send:hover { background: var(--gold); }

  /* HOW IT WORKS */
  .how-section {
    padding: 6rem 3rem;
    max-width: 1100px; margin: 0 auto;
  }
  .steps { display: flex; flex-direction: column; gap: 0; margin-top: 3rem; }
  .step {
    display: flex; gap: 2rem; align-items: flex-start;
    padding: 2rem 0;
    border-bottom: 1px solid rgba(76,175,80,0.08);
  }
  .step:last-child { border-bottom: none; }
  .step-num {
    font-family: 'Playfair Display', serif;
    font-size: 3rem; font-weight: 900;
    color: rgba(76,175,80,0.2); min-width: 60px; line-height: 1;
  }
  .step-content h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--white);
  }
  .step-content p { font-size: 0.9rem; color: rgba(245,240,232,0.55); line-height: 1.6; }

  /* FOOTER */
  .footer {
    border-top: 1px solid rgba(76,175,80,0.1);
    padding: 3rem; text-align: center;
  }
  .footer-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem; font-weight: 900; color: var(--gold);
    margin-bottom: 0.5rem;
  }
  .footer-logo span { color: var(--green-bright); }
  .footer-tag { font-size: 0.85rem; color: rgba(245,240,232,0.35); }

  /* DASHBOARD TAB */
  .tab-bar {
    display: flex;
    background: rgba(255,255,255,0.03);
    border-bottom: 1px solid rgba(76,175,80,0.1);
    padding: 0 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .tab-bar::-webkit-scrollbar { display: none; }
  .tab {
    padding: 0.85rem 1.1rem; cursor: pointer;
    font-size: 0.82rem; color: rgba(245,240,232,0.5);
    border-bottom: 2px solid transparent;
    transition: all 0.2s; white-space: nowrap; flex-shrink: 0;
  }
  .tab.active { color: var(--green-bright); border-bottom-color: var(--green-bright); }
  .dashboard { padding: 1.2rem 1rem; max-width: 1100px; margin: 0 auto; }
  .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1.5rem; }
  .dash-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(76,175,80,0.12);
    border-radius: 0.9rem; padding: 1rem;
  }
  .dash-card-label { font-size: 0.72rem; color: rgba(245,240,232,0.45); margin-bottom: 0.4rem; }
  .dash-card-value {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem; font-weight: 700; color: var(--gold);
  }
  .dash-card-change { font-size: 0.72rem; color: var(--green-bright); margin-top: 0.25rem; }
  .activity-list { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.75rem; }
  .activity-item {
    display: flex; align-items: center; gap: 0.75rem;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(76,175,80,0.08);
    border-radius: 0.7rem; padding: 0.75rem 0.9rem;
  }
  .activity-emoji { font-size: 1rem; flex-shrink: 0; }
  .activity-text { font-size: 0.78rem; color: rgba(245,240,232,0.7); flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .activity-time { font-size: 0.68rem; color: rgba(245,240,232,0.3); margin-left: auto; flex-shrink: 0; }
`;

const FEATURES = [
  { icon: "🌿", title: "Crop Disease Diagnosis", desc: "Farmers describe symptoms in Swahili or English and get instant AI-powered diagnosis with treatment advice." },
  { icon: "💰", title: "Live Market Prices", desc: "Real-time prices for maize, beans, tomatoes, and more from major Kenya markets like Wakulima." },
  { icon: "🌦️", title: "Weather Alerts", desc: "Hyper-local rain and drought alerts sent automatically based on the farmer's region." },
  { icon: "🗓️", title: "Planting Calendar", desc: "Ask when to plant any crop in your county, and agu.ai will tell you the best season for every region in Kenya." },
  { icon: "🇰🇪", title: "Kiswahili Support", desc: "Fully bilingual. Farmers can chat in Swahili, Sheng, or English and get responses in their language." },
  { icon: "📊", title: "Admin Dashboard", desc: "Monitor conversations, active farmers, top queries, and regional usage from a clean web dashboard." },
];

const DEMO_MESSAGES = [
  { role: "user", text: "Mahindi yangu yana madoa ya manjano. Nifanye nini?" },
  { role: "bot", text: "Habari! 🌽 Madoa ya manjano kwenye mahindi yanaweza kuwa dalili ya:\n\n1. Ugonjwa wa Northern Corn Leaf Blight (NCLB)\n2. Upungufu wa Nitrogen\n\nNinakushauri: Tumia dawa ya fungicide kama Mancozeb. Pia angalia kama mbolea ya Urea inahitajika. Je, madoa yako yako juu au chini ya mmea?" },
  { role: "user", text: "Bei ya mahindi Nairobi leo ni ngapi?" },
  { role: "bot", text: "📊 Bei za soko leo (Wakulima Market, Nairobi):\n\n• Mahindi (gunia 90kg): KSh 3,200 – 3,500\n• Mahindi (kilo): KSh 36 – 40\n\nBei zimepanda 8% wiki hii. Wakati mzuri wa kuuza! 💹" },
];

const STEPS = [
  { title: "Farmer texts agu.ai on WhatsApp", desc: "Any Kenyan farmer with WhatsApp can start a conversation with agu.ai, with no app download needed." },
  { title: "Message arrives at Node.js backend", desc: "Twilio forwards the WhatsApp message to our Node.js webhook which processes and routes the request." },
  { title: "Python + Agunextech AI generates a response", desc: "Our Python service calls the Agunextech API with farming context, language detection, and live data." },
  { title: "Farmer gets a smart answer in seconds", desc: "The response is sent back via WhatsApp, in Swahili or English, with market prices, advice, or alerts." },
];

export default function AguAI() {
  const [activeTab, setActiveTab] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const ADMIN_EMAIL = "admin@agu.ai";
  const ADMIN_PASSWORD = "agunextech2024";
  const [lang, setLang] = useState("en");
  const t = {
    en: {
      // NAV
      home: "Home", dashboard: "Dashboard", docs: "Docs", about: "About", pricing: "Pricing", contact: "Contact", register: "Register", start: "🌱 Start",
      // HERO
      heroBadge: "Live in Kenya, Powered by Agunextech",
      heroTitle1: "AI farming advice", heroTitle2: "on WhatsApp,", heroTitle3: "for every mkulima",
      heroSub: "agu.ai connects Kenyan farmers to real-time crop advice, market prices, and weather alerts, right in their WhatsApp inbox. In Swahili or English.",
      heroBtn1: "🌱 Start on WhatsApp", heroBtn2: "View Dashboard →",
      // STATS
      stat1: "Kenyan smallholder farmers", stat2: "Agriculture share of Kenya GDP", stat3: "Average AI response time", stat4: "Languages supported",
      // FEATURES
      featuresLabel: "What agu.ai can do",
      featuresTitle: "Everything a farmer needs, right in their pocket",
      // DEMO
      demoLabel: "Live Demo", demoTitle: "See agu.ai in action", demoPlaceholder: "Ask about crops, prices, weather...",
      // HOW
      howLabel: "Architecture", howTitle: "How it works",
      // FOOTER
      footerTag: "Built for Kenya's farmers, Powered by Agunextech. React, Node.js and Python",
      // ABOUT
      aboutLabel: "Our Story", aboutTitle: "Built for the mkulima, by Agunextech",
      aboutSub: "Agunextech was founded with one belief: that every Kenyan farmer, whether in Nakuru or Kilifi, deserves access to the same quality of agricultural knowledge as the biggest farms in the world.",
      missionTitle: "Our Mission", visionTitle: "Our Vision",
      // PRICING
      pricingLabel: "Simple Pricing", pricingTitle: "Plans for every mkulima", pricingSub: "Start free. Upgrade as you grow. No hidden charges.",
      // CONTACT
      contactLabel: "Get In Touch", contactTitle: "Talk to Agunextech",
      contactSub: "Have a question, partnership idea, or want to bring agu.ai to your cooperative? We would love to hear from you.",
      sendBtn: "Send Message", sentBtn: "✓ Message Sent! We will be in touch soon.",
      // REGISTER
      registerTitle: "Welcome to agu.ai", registerSub: "Let us set up your farmer profile. It only takes 2 minutes.",
      step1: "Profile", step2: "Location", step3: "Crops", step4: "Plan",
      continueBtn: "Continue", backBtn: "Back", completeBtn: "Complete Registration",
      successTitle: "You are registered on agu.ai. Save our WhatsApp number and send us your first question.",
      startWhatsapp: "🌱 Start on WhatsApp",
    },
    sw: {
      // NAV
      home: "Nyumbani", dashboard: "Dashibodi", docs: "Nyaraka", about: "Kuhusu", pricing: "Bei", contact: "Wasiliana", register: "Jiandikishe", start: "🌱 Anza",
      // HERO
      heroBadge: "Tunaishi Kenya, Inaendeshwa na Agunextech",
      heroTitle1: "Ushauri wa kilimo wa AI", heroTitle2: "kwenye WhatsApp,", heroTitle3: "kwa kila mkulima",
      heroSub: "agu.ai inaunganisha wakulima wa Kenya na ushauri wa mazao, bei za soko, na arifa za hali ya hewa, moja kwa moja kwenye WhatsApp yao. Kwa Kiswahili au Kiingereza.",
      heroBtn1: "🌱 Anza kwenye WhatsApp", heroBtn2: "Angalia Dashibodi →",
      // STATS
      stat1: "Wakulima wadogo wa Kenya", stat2: "Mchango wa kilimo kwa uchumi wa Kenya", stat3: "Muda wa wastani wa AI kujibu", stat4: "Lugha zinazoungwa mkono",
      // FEATURES
      featuresLabel: "Agu.ai inaweza kufanya nini",
      featuresTitle: "Kila kitu ambacho mkulima anahitaji, mfukoni mwao",
      // DEMO
      demoLabel: "Maonyesho ya Moja kwa Moja", demoTitle: "Tazama agu.ai ikifanya kazi", demoPlaceholder: "Uliza kuhusu mazao, bei, hali ya hewa...",
      // HOW
      howLabel: "Muundo", howTitle: "Jinsi inavyofanya kazi",
      // FOOTER
      footerTag: "Imejengwa kwa wakulima wa Kenya, Inaendeshwa na Agunextech. React, Node.js na Python",
      // ABOUT
      aboutLabel: "Hadithi Yetu", aboutTitle: "Imejengwa kwa mkulima, na Agunextech",
      aboutSub: "Agunextech ilianzishwa kwa imani moja: kwamba kila mkulima wa Kenya, iwe Nakuru au Kilifi, anastahili kupata ubora wa maarifa ya kilimo kama mashamba makubwa duniani.",
      missionTitle: "Dhamira Yetu", visionTitle: "Maono Yetu",
      // PRICING
      pricingLabel: "Bei Rahisi", pricingTitle: "Mipango kwa kila mkulima", pricingSub: "Anza bure. Panda daraja unavyokua. Hakuna malipo ya siri.",
      // CONTACT
      contactLabel: "Wasiliana Nasi", contactTitle: "Zungumza na Agunextech",
      contactSub: "Una swali, wazo la ushirikiano, au unataka kuleta agu.ai kwa ushirika wako? Tungependa kusikia kutoka kwako.",
      sendBtn: "Tuma Ujumbe", sentBtn: "✓ Ujumbe Umetumwa! Tutawasiliana nawe hivi karibuni.",
      // REGISTER
      registerTitle: "Karibu kwenye agu.ai", registerSub: "Hebu tuanzishe wasifu wako wa mkulima. Inachukua dakika 2 tu.",
      step1: "Wasifu", step2: "Mahali", step3: "Mazao", step4: "Mpango",
      continueBtn: "Endelea", backBtn: "Rudi", completeBtn: "Kamilisha Usajili",
      successTitle: "Umesajiliwa kwenye agu.ai. Hifadhi nambari yetu ya WhatsApp na utume swali lako la kwanza.",
      startWhatsapp: "🌱 Anza kwenye WhatsApp",
    }
  }[lang];
  const [dashTab, setDashTab] = useState("Overview");
  const [chatMessages, setChatMessages] = useState(DEMO_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contactForm, setContactForm] = useState({ firstName: "", lastName: "", email: "", type: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [pricesLoading, setPricesLoading] = useState(false);
  const [pricesData, setPricesData] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState("Wakulima");
  const [priceSearch, setPriceSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [notifPerm, setNotifPerm] = useState("default");
  const [watchlist, setWatchlist] = useState([]);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [notifTab, setNotifTab] = useState("alerts");
  const [diseaseSearch, setDiseaseSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [openDisease, setOpenDisease] = useState(null);
  const [weatherCounty, setWeatherCounty] = useState("Nairobi");
  const [agroCounty, setAgroCounty] = useState("Nairobi");
  const [calcTab, setCalcTab] = useState("yield");
  const [soilCounty, setSoilCounty] = useState("Nairobi");
  const [livestock, setLivestock] = useState([
    { id: 1, name: "Bossy", type: "Cow", breed: "Friesian", age: "3 years", weight: "420kg", status: "Healthy", lastVaccine: "2024-10-15", nextVaccine: "2025-04-15", milkYield: "18L/day", notes: "Top producer", color: "#4caf50" },
    { id: 2, name: "Ngombe 2", type: "Cow", breed: "Ayrshire", age: "5 years", weight: "380kg", status: "Sick", lastVaccine: "2024-08-20", nextVaccine: "2025-02-20", milkYield: "12L/day", notes: "Reduced appetite since Monday", color: "#e53935" },
    { id: 3, name: "Billy", type: "Goat", breed: "Boer", age: "2 years", weight: "45kg", status: "Healthy", lastVaccine: "2024-11-01", nextVaccine: "2025-05-01", milkYield: "N/A", notes: "Good condition", color: "#4caf50" },
    { id: 4, name: "Hen Flock A", type: "Chicken", breed: "Kuroiler", age: "8 months", weight: "2.1kg avg", status: "Vaccinated", lastVaccine: "2024-12-01", nextVaccine: "2025-03-01", milkYield: "42 eggs/day", notes: "Newcastle vaccine due soon", color: "#e8c44a" },
  ]);
  const [liveTab, setLiveTab] = useState("herd");
  const [calCounty, setCalCounty] = useState("Nakuru");
  const [newsCategory, setNewsCategory] = useState("All");
  const [openNews, setOpenNews] = useState(null);
  const [newsLoading, setNewsLoading] = useState(false);
  const [aiNews, setAiNews] = useState(null);
  const [calCrop, setCalCrop] = useState("All");
  const [calSeason, setCalSeason] = useState("Long Rains");
  const [openAnimal, setOpenAnimal] = useState(null);
  const [showAddAnimal, setShowAddAnimal] = useState(false);
  const [newAnimal, setNewAnimal] = useState({ name: "", type: "Cow", breed: "", age: "", weight: "", status: "Healthy", lastVaccine: "", nextVaccine: "", notes: "" });
  const [liveAILoading, setLiveAILoading] = useState(false);
  const [liveAIResult, setLiveAIResult] = useState(null);
  const [symptoms, setSymptoms] = useState([]);
  const [symAnimalType, setSymAnimalType] = useState("Cow");
  const [soilCrop, setSoilCrop] = useState("Maize");
  const [soilColor, setSoilColor] = useState("");
  const [soilTexture, setSoilTexture] = useState("");
  const [soilDrainage, setSoilDrainage] = useState("");
  const [soilPH, setSoilPH] = useState("");
  const [soilProblems, setSoilProblems] = useState([]);
  const [soilResult, setSoilResult] = useState(null);
  const [soilLoading, setSoilLoading] = useState(false);
  const [calcCrop, setCalcCrop] = useState("Maize");
  const [calcAcres, setCalcAcres] = useState(1);
  const [calcSeedRate, setCalcSeedRate] = useState("");
  const [calcFertCost, setCalcFertCost] = useState("");
  const [calcPesticideCost, setCalcPesticideCost] = useState("");
  const [calcLabourCost, setCalcLabourCost] = useState("");
  const [calcSellingPrice, setCalcSellingPrice] = useState("");
  const [calcResult, setCalcResult] = useState(null);
  const [calcBudgetItems, setCalcBudgetItems] = useState([{ name: "", cost: "" }]);
  const [agroCategory, setAgroCategory] = useState("All");
  const [agroSearch, setAgroSearch] = useState("");
  const [agroSelected, setAgroSelected] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherAI, setWeatherAI] = useState(null);
  const [profileTab, setProfileTab] = useState("overview");
  const [profileEdit, setProfileEdit] = useState(false);
  const [profileData, setProfileData] = useState({ name: "John Kamau", phone: "+254 712 345 678", county: "Nakuru", crops: ["Maize", "Beans", "Potatoes"], language: "English", plan: "Mkulima Pro", joined: "March 2024", messages: 147, alerts: 23, forumPosts: 8 });
  const [forumCategory, setForumCategory] = useState("All");
  const [forumPosts, setForumPosts] = useState([
    { id: 1, author: "Kamau wa Nakuru", avatar: "👨🏾‍🌾", county: "Nakuru", category: "Disease", title: "My maize leaves are turning yellow at the tips, what could it be?", body: "I have noticed the tips of my maize leaves turning yellow over the past week. I have been using DAP fertilizer. Could this be a disease or a nutrient issue?", likes: 12, replies: [{ author: "Wanjiku M.", avatar: "👩🏾‍🌾", text: "This sounds like nitrogen deficiency. Try top dressing with CAN fertilizer. I had the same issue last season in Nyeri.", time: "2h ago" }, { author: "agu.ai 🤖", avatar: "🌱", text: "Yellow tips on maize leaves can indicate nitrogen deficiency, potassium deficiency, or early signs of Northern Corn Leaf Blight. Check if the yellowing starts from the older lower leaves (nitrogen) or if there are lesions (disease).", time: "1h ago" }], time: "3h ago", solved: false },
    { id: 2, author: "Akinyi wa Kisumu", avatar: "👩🏾‍🌾", county: "Kisumu", category: "Prices", title: "Bei ya samaki Kisumu imepanda sana wiki hii!", body: "Ndugu wakulima, bei ya tilapia imepanda hadi KSh 380 kwa kilo wiki hii. Hii ni fursa nzuri kuuza. Mnajua sababu ya kupanda hii?", likes: 28, replies: [{ author: "Otieno K.", avatar: "👨🏾‍💻", text: "Nadhani ni kwa sababu ya msimu wa mvua. Wavuvi hawapati samaki mingi wakati mvua inanyesha.", time: "30m ago" }], time: "5h ago", solved: false },
    { id: 3, author: "Peter wa Eldoret", avatar: "👨🏾‍🌾", county: "Uasin Gishu", category: "Tips", title: "Best time to plant wheat in Uasin Gishu for maximum yield", body: "After 10 years of wheat farming, I have found that planting between March 15 and April 5 gives the best results in our area. The rains are consistent and temperatures are ideal. Happy to share more tips.", likes: 45, replies: [{ author: "Grace N.", avatar: "👩🏾‍🌾", text: "Thank you Peter! I have been struggling with my wheat yield. Will try your timing this season.", time: "1h ago" }, { author: "Kiplangat M.", avatar: "👨🏾‍🌾", text: "Agree with Peter. Also make sure to use certified seed from KEPHIS approved suppliers for best germination.", time: "45m ago" }], time: "1d ago", solved: true },
    { id: 4, author: "Fatuma wa Mombasa", avatar: "👩🏾‍🌾", county: "Mombasa", category: "Market", title: "Kongowea market update: Coconut prices dropping", body: "Habari za Kongowea. Bei ya nazi imeshuka hadi KSh 25 kwa nazi moja. Wasambazaji wengi wamekuja kutoka Kilifi. Je, mna mkakati wa kukabiliana na hali hii?", likes: 19, replies: [{ author: "Hassan A.", avatar: "👨🏾‍🌾", text: "Try selling directly to hotels and restaurants in Mombasa. They pay better than the market middlemen.", time: "3h ago" }], time: "1d ago", solved: false },
    { id: 5, author: "Mwangi wa Nyeri", avatar: "👨🏾‍🌾", county: "Nyeri", category: "Tips", title: "How I doubled my coffee yield using shade trees", body: "I planted Grevillea trees as shade for my coffee bushes 3 years ago. This season my yield doubled compared to full sun coffee. The shade reduces water stress and the trees also provide firewood. Highly recommend!", likes: 67, replies: [{ author: "Wambua J.", avatar: "👨🏾‍🌾", text: "This is exactly what I needed. Which spacing do you use for the Grevillea trees?", time: "2h ago" }, { author: "Mwangi wa Nyeri", avatar: "👨🏾‍🌾", text: "I use 8m x 8m spacing for the shade trees. Good luck!", time: "1h ago" }], time: "2d ago", solved: true },
  ]);
  const [newPost, setNewPost] = useState({ title: "", body: "", category: "Tips" });
  const [showNewPost, setShowNewPost] = useState(false);
  const [openPost, setOpenPost] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [forumSearch, setForumSearch] = useState("");
  const [onboardStep, setOnboardStep] = useState(1);
  const [onboardDone, setOnboardDone] = useState(false);
  const [farmer, setFarmer] = useState({ name: "", phone: "", county: "", crops: [], language: "", plan: "" });
  const [customCrop, setCustomCrop] = useState("");

  const sendMessage = async () => {
    if (!inputVal.trim() || isLoading) return;
    const userText = inputVal;
    setInputVal("");
    setChatMessages(prev => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      const history = chatMessages.map(m => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.text
      }));
      history.push({ role: "user", content: userText });

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are agu.ai, an AI farming assistant for Kenyan farmers built by Agunextech. 
You help farmers with:
- Crop disease diagnosis and treatment advice
- Live market prices for crops in Kenya (maize, beans, tomatoes, etc.)
- Weather and planting season guidance for Kenyan regions (Nakuru, Kisumu, Nairobi, Eldoret, Mombasa, etc.)
- General farming best practices for East Africa

Always respond in the same language the farmer uses. If they write in Swahili, respond in Swahili. If English, respond in English.
Be friendly, practical, and concise. Use emojis sparingly to feel warm and approachable.
When giving market prices, mention they are estimates and advise checking local markets.
Sign off responses as agu.ai by Agunextech.`,
          messages: history
        })
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "Samahani, kuna hitilafu. Tafadhali jaribu tena.";
      setChatMessages(prev => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setChatMessages(prev => [...prev, { role: "bot", text: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setLoginError("Please enter your email and password.");
      return;
    }
    setLoginLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
      setLoginForm({ email: "", password: "" });
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
    setLoginLoading(false);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-top">
          <div className="nav-logo">agu<span>.ai</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <button onClick={() => setLang(l => l === "en" ? "sw" : "en")} style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "2rem", padding: "0.28rem 0.75rem", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {lang === "en" ? "🇰🇪 SW" : "🇬🇧 EN"}
            </button>
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotifPanel(p => !p)} style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "1rem", position: "relative" }}>
                🔔
                {notifications.length > 0 && (
                  <span style={{ position: "absolute", top: -4, right: -4, background: "#e53935", color: "white", borderRadius: "50%", width: 16, height: 16, fontSize: "0.6rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{notifications.length > 9 ? "9+" : notifications.length}</span>
                )}
              </button>
              {showNotifPanel && (
                <div style={{ position: "absolute", right: 0, top: 38, width: 300, background: "rgba(15,31,18,0.98)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "1rem", zIndex: 200, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                  <div style={{ display: "flex", borderBottom: "1px solid rgba(76,175,80,0.1)" }}>
                    {["alerts","watchlist","settings"].map(tab => (
                      <button key={tab} onClick={() => setNotifTab(tab)} style={{ flex: 1, padding: "0.65rem 0.4rem", background: notifTab === tab ? "rgba(76,175,80,0.1)" : "transparent", border: "none", color: notifTab === tab ? "var(--green-bright)" : "rgba(245,240,232,0.4)", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize", fontFamily: "'DM Sans', sans-serif" }}>{tab}</button>
                    ))}
                  </div>

                  {notifTab === "alerts" && (
                    <div style={{ maxHeight: 280, overflowY: "auto" }}>
                      {notifications.length === 0 ? (
                        <div style={{ padding: "1.5rem", textAlign: "center", color: "rgba(245,240,232,0.35)", fontSize: "0.8rem" }}>
                          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔕</div>
                          No alerts yet. Add crops to your watchlist to get notified.
                        </div>
                      ) : notifications.map((n, i) => (
                        <div key={i} style={{ padding: "0.85rem 1rem", borderBottom: "1px solid rgba(76,175,80,0.06)", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                          <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>{n.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "0.82rem", color: "var(--white)", fontWeight: 500, marginBottom: "0.2rem" }}>{n.title}</div>
                            <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)" }}>{n.body}</div>
                            <div style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.25)", marginTop: "0.2rem" }}>{n.time}</div>
                          </div>
                          <button onClick={() => setNotifications(prev => prev.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.3)", cursor: "pointer", fontSize: "0.8rem", flexShrink: 0 }}>✕</button>
                        </div>
                      ))}
                      {notifications.length > 0 && (
                        <button onClick={() => setNotifications([])} style={{ width: "100%", padding: "0.65rem", background: "none", border: "none", borderTop: "1px solid rgba(76,175,80,0.08)", color: "rgba(245,240,232,0.35)", fontSize: "0.75rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Clear all alerts</button>
                      )}
                    </div>
                  )}

                  {notifTab === "watchlist" && (
                    <div style={{ maxHeight: 280, overflowY: "auto" }}>
                      {watchlist.length === 0 ? (
                        <div style={{ padding: "1.5rem", textAlign: "center", color: "rgba(245,240,232,0.35)", fontSize: "0.8rem" }}>
                          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>👀</div>
                          No crops watched yet. Go to Prices and tap the bell icon on any crop.
                        </div>
                      ) : watchlist.map((w, i) => (
                        <div key={i} style={{ padding: "0.75rem 1rem", borderBottom: "1px solid rgba(76,175,80,0.06)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span style={{ fontSize: "1.1rem" }}>{w.emoji}</span>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: "0.82rem", color: "var(--white)", fontWeight: 500 }}>{w.crop}</div>
                            <div style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>{w.market} · Alert at KSh {w.alertPrice.toLocaleString()}</div>
                          </div>
                          <button onClick={() => setWatchlist(prev => prev.filter((_, j) => j !== i))} style={{ background: "rgba(229,57,53,0.1)", border: "1px solid rgba(229,57,53,0.2)", borderRadius: "0.4rem", color: "#e57373", cursor: "pointer", fontSize: "0.7rem", padding: "0.2rem 0.5rem", fontFamily: "'DM Sans', sans-serif" }}>Remove</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {notifTab === "settings" && (
                    <div style={{ padding: "1rem" }}>
                      <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.75rem" }}>Notification Preferences</div>
                      {[
                        { label: "Price drops above 5%", key: "drops" },
                        { label: "Price rises above 5%", key: "rises" },
                        { label: "Weekly market summary", key: "weekly" },
                        { label: "New market data available", key: "newdata" },
                      ].map((s, i) => (
                        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.6rem 0", borderBottom: i < 3 ? "1px solid rgba(76,175,80,0.06)" : "none" }}>
                          <span style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)" }}>{s.label}</span>
                          <div onClick={() => {
                            const triggered = { emoji: "🔔", title: `${s.label} alert enabled`, body: `You will now receive alerts for: ${s.label}`, time: "Just now" };
                            setNotifications(prev => [triggered, ...prev]);
                          }} style={{ width: 36, height: 20, borderRadius: "1rem", background: "rgba(76,175,80,0.3)", border: "1px solid rgba(76,175,80,0.4)", cursor: "pointer", position: "relative", display: "flex", alignItems: "center", padding: "0 3px" }}>
                            <div style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--green-bright)", marginLeft: "auto" }} />
                          </div>
                        </div>
                      ))}
                      <button onClick={() => {
                        const demo = [
                          { emoji: "📈", title: "Tomatoes up 12.4% in Wakulima", body: "Price rose from KSh 1,600 to KSh 1,800 per crate. Good time to sell!", time: "2 min ago" },
                          { emoji: "📉", title: "Beans down 2.1% in Wakulima", body: "Price dropped from KSh 9,400 to KSh 9,200 per 90kg bag.", time: "15 min ago" },
                          { emoji: "🥑", title: "Avocado surging 15.6% in Wakulima", body: "Avocado prices hit KSh 120 per kg. Consider selling now!", time: "1 hr ago" },
                        ];
                        setNotifications(demo);
                        setNotifTab("alerts");
                      }} style={{ width: "100%", marginTop: "0.75rem", padding: "0.65rem", borderRadius: "0.6rem", border: "none", background: "rgba(76,175,80,0.15)", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}>
                        Test with Demo Alerts
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            {isLoggedIn ? (
              <button className="nav-cta" onClick={() => { setIsLoggedIn(false); setActiveTab("home"); }} style={{ background: "rgba(229,57,53,0.1)", borderColor: "rgba(229,57,53,0.3)", color: "#e57373" }}>🔓 Logout</button>
            ) : (
              <button className="nav-cta" onClick={() => setShowAdminLogin(true)}>🔐 Admin</button>
            )}
          </div>
        </div>
        {/* PRIMARY LINKS */}
        <div className="nav-links-row">
          <a href="#" onClick={() => { setActiveTab("home"); setMenuOpen(false); }} className={activeTab === "home" ? "active-link" : ""}>{t.home}</a>
          <a href="#" onClick={() => { if (isLoggedIn) { setActiveTab("dashboard"); } else { setShowAdminLogin(true); } setMenuOpen(false); }} className={activeTab === "dashboard" ? "active-link" : ""}>{t.dashboard}</a>
          <a href="#" onClick={() => { setActiveTab("prices"); setMenuOpen(false); }} className={activeTab === "prices" ? "active-link" : ""}>Prices</a>
          <a href="#" onClick={() => { setActiveTab("weather"); setMenuOpen(false); }} className={activeTab === "weather" ? "active-link" : ""}>Weather</a>
          <a href="#" onClick={() => { setActiveTab("calendar"); setMenuOpen(false); }} className={activeTab === "calendar" ? "active-link" : ""}>Calendar</a>
          <a href="#" onClick={() => { setActiveTab("news"); setMenuOpen(false); }} className={activeTab === "news" ? "active-link" : ""}>News</a>
          <a href="#" onClick={() => { setActiveTab("forum"); setMenuOpen(false); }} className={activeTab === "forum" ? "active-link" : ""}>Forum</a>
          <a href="#" onClick={() => { setActiveTab("diseases"); setMenuOpen(false); }} className={activeTab === "diseases" ? "active-link" : ""}>Diseases</a>
          <a href="#" onClick={() => { setActiveTab("profile"); setMenuOpen(false); }} className={activeTab === "profile" ? "active-link" : ""}>Profile</a>
          <button onClick={() => setMenuOpen(m => !m)} style={{ background: menuOpen ? "rgba(76,175,80,0.15)" : "none", border: "none", color: menuOpen ? "var(--green-bright)" : "rgba(245,240,232,0.5)", fontSize: "1.1rem", cursor: "pointer", padding: "0.3rem 0.5rem", flexShrink: 0, borderRadius: "0.4rem" }}>☰</button>
        </div>

        {/* DROPDOWN MENU */}
        {menuOpen && (
          <div style={{ position: "absolute", top: "100%", right: 0, left: 0, background: "rgba(15,31,18,0.98)", borderBottom: "1px solid rgba(76,175,80,0.15)", zIndex: 200, display: "flex", flexWrap: "wrap", padding: "0.75rem 1rem", gap: "0.5rem" }}>
            {[
              { label: t.about, tab: "about" },
              { label: t.pricing, tab: "pricing" },
              { label: t.contact, tab: "contact" },
              { label: t.docs, tab: "docs" },
              { label: t.register, tab: "register" },
              { label: "🏪 Agro-Vets", tab: "agrovets" },
              { label: "🧮 Calculator", tab: "calculator" },
              { label: "🌍 Soil Checker", tab: "soil" },
              { label: "🐄 Livestock", tab: "livestock" },
            ].map((item, i) => (
              <a key={i} href="#" onClick={() => { setActiveTab(item.tab); if (item.tab === "register") { setOnboardStep(1); setOnboardDone(false); } setMenuOpen(false); }} style={{ padding: "0.4rem 0.9rem", borderRadius: "2rem", background: activeTab === item.tab ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${activeTab === item.tab ? "rgba(76,175,80,0.3)" : "rgba(255,255,255,0.08)"}`, color: activeTab === item.tab ? "var(--green-bright)" : "rgba(245,240,232,0.6)", fontSize: "0.8rem", textDecoration: "none", fontWeight: 500, whiteSpace: "nowrap" }}>{item.label}</a>
            ))}
          </div>
        )}
      </nav>

      {activeTab === "home" && (
        <>
          {/* HERO */}
          <section className="hero">
            <div className="hero-bg" />
            <div className="hero-grain" />
            <div className="hero-badge">
              <span className="badge-dot" />
              {t.heroBadge}
            </div>
            <h1>
              AI farming advice<br />
              <span className="highlight">on WhatsApp</span>,<br />
              <span className="green">{t.heroTitle3}</span>
            </h1>
            <p className="hero-sub">
              agu.ai connects Kenyan farmers to real-time crop advice, market prices,
              and weather alerts, right in their WhatsApp inbox. In Swahili or English.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">{t.heroBtn1}</button>
              <button className="btn-secondary" onClick={() => setActiveTab("dashboard")}>{t.heroBtn2}</button>
            </div>
          </section>

          {/* STATS */}
          <div className="stats">
            {[
              { num: "4.7M", label: "Kenyan smallholder farmers" },
              { num: "33%", label: "Agriculture share of Kenya GDP" },
              { num: "< 3s", label: "Average AI response time" },
              { num: "2", label: "Languages supported" },
            ].map(s => (
              <div className="stat" key={s.label}>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* FEATURES */}
          <section className="features">
            <div className="section-label">What agu.ai can do</div>
            <h2 className="section-title">Everything a farmer needs,<br />right in their pocket</h2>
            <div className="features-grid">
              {FEATURES.map(f => (
                <div className="feature-card" key={f.title}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CHAT DEMO */}
          <section className="demo-section">
            <div className="section-label">Live Demo</div>
            <h2 className="section-title" style={{ marginBottom: "2rem" }}>See agu.ai in action</h2>
            <div className="chat-window">
              <div className="chat-header">
                <div className="chat-avatar">🌱</div>
                <div>
                  <div className="chat-name">agu.ai</div>
                  <div className="chat-status">● Online</div>
                </div>
              </div>
              <div className="chat-body" style={{ overflowY: "auto", maxHeight: "320px" }}>
                {chatMessages.map((m, i) => (
                  <div key={i} className={`msg msg-${m.role}`} style={{ whiteSpace: "pre-line" }}>
                    {m.text}
                  </div>
                ))}
                {isLoading && (
                  <div className="msg msg-bot" style={{ display: "flex", gap: "4px", alignItems: "center", padding: "0.75rem 1rem" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block", animation: "bounce 1s infinite 0s" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block", animation: "bounce 1s infinite 0.2s" }} />
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block", animation: "bounce 1s infinite 0.4s" }} />
                  </div>
                )}
              </div>
              <div className="chat-input-row">
                <input
                  className="chat-input"
                  placeholder={t.demoPlaceholder}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  disabled={isLoading}
                />
                <button className="chat-send" onClick={sendMessage} disabled={isLoading} style={{ opacity: isLoading ? 0.5 : 1 }}>➤</button>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="how-section">
            <div className="section-label">Architecture</div>
            <h2 className="section-title">How it works</h2>
            <div className="steps">
              {STEPS.map((s, i) => (
                <div className="step" key={i}>
                  <div className="step-num">0{i + 1}</div>
                  <div className="step-content">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">
            <div className="footer-logo">agu<span>.ai</span></div>
            <p className="footer-tag">{t.footerTag}</p>
          </footer>
        </>
      )}

      {activeTab === "dashboard" && (
        <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
          {/* DASH TAB BAR */}
          <div className="tab-bar">
            {["Overview", "Conversations", "Regions", "Settings"].map(t => (
              <div key={t} className={`tab ${dashTab === t ? "active" : ""}`} onClick={() => setDashTab(t)}>{t}</div>
            ))}
          </div>

          <div className="dashboard">

            {/* OVERVIEW TAB */}
            {dashTab === "Overview" && (() => {
              const msgData = [
                { day: "Mon", messages: 2100 }, { day: "Tue", messages: 2800 },
                { day: "Wed", messages: 2400 }, { day: "Thu", messages: 3100 },
                { day: "Fri", messages: 3491 }, { day: "Sat", messages: 1900 },
                { day: "Sun", messages: 1400 },
              ];
              const farmerData = [
                { month: "Oct", farmers: 620 }, { month: "Nov", farmers: 850 },
                { month: "Dec", farmers: 980 }, { month: "Jan", farmers: 1100 },
                { month: "Feb", farmers: 1210 }, { month: "Mar", farmers: 1284 },
              ];
              const queryData = [
                { name: "Prices", value: 42, color: "#e8c44a" },
                { name: "Disease", value: 28, color: "#4caf50" },
                { name: "Weather", value: 18, color: "#2d6a35" },
                { name: "Planting", value: 12, color: "#8b6914" },
              ];
              const CustomTooltip = ({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div style={{ background: "rgba(15,31,18,0.97)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "0.5rem", padding: "0.5rem 0.8rem", fontSize: "0.75rem", color: "var(--cream)" }}>
                      <div style={{ color: "rgba(245,240,232,0.5)", marginBottom: "0.2rem" }}>{label}</div>
                      <div style={{ color: "var(--gold)", fontWeight: 600 }}>{payload[0].value.toLocaleString()}</div>
                    </div>
                  );
                }
                return null;
              };
              return (
                <>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "1rem", color: "var(--white)" }}>Good morning 👋, agu.ai Dashboard</h2>

                  {/* STAT CARDS */}
                  <div className="dash-grid">
                    {[
                      { label: "Total Farmers", value: "1,284", change: "↑ 12% this week" },
                      { label: "Messages Today", value: "3,491", change: "↑ 8% vs yesterday" },
                      { label: "Avg Response", value: "2.1s", change: "✓ Within target" },
                      { label: "Top Query", value: "Prices", change: "42% of all queries" },
                    ].map(c => (
                      <div className="dash-card" key={c.label}>
                        <div className="dash-card-label">{c.label}</div>
                        <div className="dash-card-value">{c.value}</div>
                        <div className="dash-card-change">{c.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* MESSAGES CHART */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1rem", padding: "1rem", marginBottom: "0.75rem" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Messages This Week</div>
                    <ResponsiveContainer width="100%" height={140}>
                      <BarChart data={msgData} barSize={20}>
                        <XAxis dataKey="day" tick={{ fill: "rgba(245,240,232,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(76,175,80,0.05)" }} />
                        <Bar dataKey="messages" fill="#4caf50" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* FARMER GROWTH + QUERY PIE */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>

                    {/* LINE CHART */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1rem", padding: "1rem" }}>
                      <div style={{ fontSize: "0.65rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Farmer Growth</div>
                      <ResponsiveContainer width="100%" height={110}>
                        <LineChart data={farmerData}>
                          <XAxis dataKey="month" tick={{ fill: "rgba(245,240,232,0.4)", fontSize: 9 }} axisLine={false} tickLine={false} />
                          <YAxis hide />
                          <Tooltip content={<CustomTooltip />} />
                          <Line type="monotone" dataKey="farmers" stroke="#e8c44a" strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* PIE CHART */}
                    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1rem", padding: "1rem" }}>
                      <div style={{ fontSize: "0.65rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Query Types</div>
                      <ResponsiveContainer width="100%" height={80}>
                        <PieChart>
                          <Pie data={queryData} cx="50%" cy="50%" outerRadius={38} dataKey="value">
                            {queryData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                          </Pie>
                          <Tooltip formatter={(v, n) => [`${v}%`, n]} contentStyle={{ background: "rgba(15,31,18,0.97)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "0.5rem", fontSize: "0.72rem" }} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.4rem" }}>
                        {queryData.map((q, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: q.color, flexShrink: 0 }} />
                            <span style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.5)" }}>{q.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RECENT ACTIVITY */}
                  <div style={{ marginTop: "0.5rem" }}>
                    <div className="section-label">Recent Activity</div>
                    <div className="activity-list">
                      {[
                        { emoji: "🌿", text: "Farmer in Nakuru asked about maize blight", time: "2m ago" },
                        { emoji: "💰", text: "Market price query, tomatoes in Mombasa", time: "5m ago" },
                        { emoji: "🌦️", text: "Weather alert sent to 234 farmers in Kisumu", time: "12m ago" },
                        { emoji: "🗓️", text: "Planting calendar query, beans in Eldoret", time: "18m ago" },
                      ].map((a, i) => (
                        <div className="activity-item" key={i}>
                          <span className="activity-emoji">{a.emoji}</span>
                          <span className="activity-text">{a.text}</span>
                          <span className="activity-time">{a.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}

            {/* CONVERSATIONS TAB */}
            {dashTab === "Conversations" && (
              <>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: "1.2rem", color: "var(--white)" }}>Conversations</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { name: "Mkulima wa Nakuru", phone: "+254 712 ***456", last: "My maize has yellow spots, what should I do?", time: "2m ago", status: "active" },
                    { name: "Farmer Wanjiku", phone: "+254 733 ***123", last: "Bei ya mahindi leo ni ngapi?", time: "8m ago", status: "active" },
                    { name: "John Kipchoge", phone: "+254 722 ***789", last: "When should I plant beans in Eldoret?", time: "22m ago", status: "resolved" },
                    { name: "Mama Mboga", phone: "+254 700 ***321", last: "Nyanya zangu zinakauka haraka sana", time: "1h ago", status: "resolved" },
                    { name: "Peter Otieno", phone: "+254 711 ***654", last: "What fertilizer is best for sugarcane?", time: "2h ago", status: "resolved" },
                    { name: "Grace Akinyi", phone: "+254 745 ***987", last: "Nipe ratiba ya kupanda viazi", time: "3h ago", status: "resolved" },
                  ].map((c, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.9rem", padding: "1rem 1.2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(76,175,80,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>👤</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.2rem" }}>
                          <span style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--white)" }}>{c.name}</span>
                          <span style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.35)" }}>{c.time}</span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", marginBottom: "0.3rem" }}>{c.phone}</div>
                        <div style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.last}</div>
                      </div>
                      <span style={{ fontSize: "0.68rem", padding: "0.2rem 0.6rem", borderRadius: "1rem", background: c.status === "active" ? "rgba(76,175,80,0.2)" : "rgba(255,255,255,0.05)", color: c.status === "active" ? "var(--green-bright)" : "rgba(245,240,232,0.35)", flexShrink: 0 }}>{c.status}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* REGIONS TAB */}
            {dashTab === "Regions" && (
              <>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", marginBottom: "1.2rem", color: "var(--white)" }}>Regions</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { region: "Nakuru", farmers: 312, queries: 1240, top: "Maize blight", pct: 85 },
                    { region: "Nairobi", farmers: 278, queries: 980, top: "Market prices", pct: 75 },
                    { region: "Kisumu", farmers: 201, queries: 760, top: "Weather alerts", pct: 60 },
                    { region: "Eldoret", farmers: 189, queries: 620, top: "Bean planting", pct: 55 },
                    { region: "Mombasa", farmers: 145, queries: 490, top: "Tomato prices", pct: 42 },
                    { region: "Kitale", farmers: 159, queries: 401, top: "Fertilizer advice", pct: 38 },
                  ].map((r, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.9rem", padding: "1rem 1.2rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--white)" }}>📍 {r.region}</span>
                        <span style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.45)" }}>{r.farmers} farmers</span>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.45)", marginBottom: "0.5rem" }}>Top query: <span style={{ color: "var(--gold)" }}>{r.top}</span> · {r.queries} messages</div>
                      <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "1rem", height: 6 }}>
                        <div style={{ width: `${r.pct}%`, height: "100%", background: "var(--green-bright)", borderRadius: "1rem", transition: "width 0.6s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* SETTINGS TAB */}
            {dashTab === "Settings" && (
              <>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", marginBottom: "1rem", color: "var(--white)" }}>Settings</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {[
                    { label: "WhatsApp Number", value: "+254 700 AGU AI", icon: "📱" },
                    { label: "AI Language", value: "English and Swahili", icon: "🌐" },
                    { label: "Alert Regions", value: "All Kenya counties", icon: "📍" },
                    { label: "Market Data", value: "Wakulima Market", icon: "📊" },
                    { label: "Response Target", value: "Under 3 seconds", icon: "⚡" },
                    { label: "Powered By", value: "Agunextech", icon: "🤖" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.8rem", padding: "0.75rem 1rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.3rem" }}>
                        <span style={{ fontSize: "1rem" }}>{s.icon}</span>
                        <span style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</span>
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "var(--cream)", fontWeight: 500, paddingLeft: "1.5rem" }}>{s.value}</div>
                    </div>
                  ))}
                  <button style={{ marginTop: "0.3rem", background: "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.3)", color: "var(--green-bright)", padding: "0.75rem", borderRadius: "0.75rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 500, cursor: "pointer", width: "100%" }}>Save Changes</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
      {activeTab === "docs" && (
        <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
          <div style={{ padding: "2rem 1.2rem", maxWidth: "800px", margin: "0 auto" }}>

            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Documentation</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", marginBottom: "0.5rem" }}>agu.ai Docs</h1>
              <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.6 }}>Everything you need to integrate and use agu.ai for your farming community.</p>
            </div>

            {[
              {
                icon: "🚀",
                title: "Getting Started",
                items: [
                  { q: "What is agu.ai?", a: "agu.ai is an AI-powered WhatsApp chatbot built by Agunextech that helps Kenyan farmers get instant crop advice, market prices, and weather alerts in Swahili or English." },
                  { q: "How do farmers access agu.ai?", a: "Farmers simply save the agu.ai WhatsApp number and send a message. No app download or registration needed." },
                  { q: "Which languages are supported?", a: "agu.ai supports English and Kiswahili. It automatically detects the language and responds accordingly." },
                ]
              },
              {
                icon: "🌿",
                title: "Features",
                items: [
                  { q: "Crop Disease Diagnosis", a: "Describe your crop symptoms and agu.ai will identify the likely disease and recommend treatment options available in Kenya." },
                  { q: "Market Prices", a: "Ask for current prices of maize, beans, tomatoes, and other crops from major Kenyan markets like Wakulima in Nairobi." },
                  { q: "Weather Alerts", a: "agu.ai sends automated rain and drought alerts to farmers based on their registered county or region." },
                  { q: "Planting Calendar", a: "Ask when to plant any crop in your county and agu.ai will give you the optimal planting window based on historical weather data." },
                ]
              },
              {
                icon: "🛠️",
                title: "Technical Integration",
                items: [
                  { q: "What is the tech stack?", a: "agu.ai is built with Node.js for the WhatsApp webhook, Python for the AI service, MongoDB for farmer data, and React for the admin dashboard." },
                  { q: "Which WhatsApp API is used?", a: "agu.ai uses the Twilio WhatsApp Business API for message routing. Production deployments can use the Meta WhatsApp Business API." },
                  { q: "How do I connect the webhook?", a: "Point your Twilio WhatsApp sandbox to your Node.js server at /webhook/whatsapp. The server handles incoming messages and routes them to the AI service." },
                ]
              },
              {
                icon: "📞",
                title: "Support",
                items: [
                  { q: "How do I report an issue?", a: "Contact the Agunextech team via the admin dashboard or email support. For urgent issues, use the WhatsApp business number." },
                  { q: "How do I add a new region?", a: "New regions can be added from the Settings tab in the admin dashboard. Weather alerts and market data will automatically include the new region." },
                ]
              },
            ].map((section, si) => (
              <div key={si} style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(76,175,80,0.12)" }}>
                  <span style={{ fontSize: "1.1rem" }}>{section.icon}</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--white)" }}>{section.title}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.8rem", padding: "0.9rem 1rem" }}>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gold)", marginBottom: "0.35rem" }}>{item.q}</div>
                      <div style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6 }}>{item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{ marginTop: "2rem", background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "1rem", padding: "1.2rem", textAlign: "center" }}>
              <div style={{ fontSize: "1.2rem", marginBottom: "0.4rem" }}>🌱</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "var(--white)", marginBottom: "0.3rem" }}>Built by Agunextech</div>
              <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.4)" }}>Empowering Kenyan farmers with AI technology</div>
            </div>

          </div>
        </div>
      )}
      {activeTab === "about" && (
        <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.2rem" }}>

            {/* HERO */}
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Our Story</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.2, marginBottom: "1rem" }}>
                Built for the <span style={{ color: "var(--gold)" }}>mkulima</span>,<br />by Agunextech
              </h1>
              <p style={{ fontSize: "0.9rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.8, maxWidth: "560px", margin: "0 auto" }}>
                Agunextech was founded with one belief: that every Kenyan farmer, whether in Nakuru or Kilifi, deserves access to the same quality of agricultural knowledge as the biggest farms in the world.
              </p>
            </div>

            {/* MISSION & VISION */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { icon: "🎯", title: "Our Mission", text: "To empower smallholder farmers across Kenya with AI-driven advice, market intelligence, and real-time support through tools they already use." },
                { icon: "🌍", title: "Our Vision", text: "A Kenya where no farmer loses a harvest due to lack of information. Where technology bridges the gap between the farm and the future." },
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.15)", borderRadius: "1rem", padding: "1.2rem" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.6rem" }}>{item.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "var(--gold)", marginBottom: "0.5rem" }}>{item.title}</div>
                  <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* STORY */}
            <div style={{ marginBottom: "2.5rem", background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1rem", padding: "1.5rem" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>How It Started</div>
              <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
                In 2024, the Agunextech team visited smallholder farms across Nakuru, Eldoret, and Kisumu. One thing was clear: farmers had mobile phones and WhatsApp, but no easy way to get timely advice on crop diseases, fair market prices, or planting schedules.
              </p>
              <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.8 }}>
                agu.ai was born from that gap. A simple idea: put an expert agronomist in every farmer's WhatsApp, available 24 hours a day, in their own language, at zero cost to them.
              </p>
            </div>

            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2.5rem" }}>
              {[
                { num: "1,284", label: "Farmers served" },
                { num: "3,491", label: "Daily messages" },
                { num: "6", label: "Kenya regions" },
                { num: "2024", label: "Founded" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.9rem", padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "var(--gold)" }}>{s.num}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.45)", marginTop: "0.25rem" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* TEAM */}
            <div style={{ marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>The Team</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { name: "Brian Agunextech", role: "Founder and CEO", emoji: "👨🏾‍💻", bio: "Passionate about using technology to solve real African problems." },
                  { name: "Wanjiku M.", role: "Head of Agriculture", emoji: "👩🏾‍🌾", bio: "Agronomist with 10 years experience across Kenyan farms." },
                  { name: "Otieno K.", role: "Lead Engineer", emoji: "👨🏾‍🔧", bio: "Full stack developer specializing in AI and mobile systems." },
                  { name: "Aisha N.", role: "Community Lead", emoji: "👩🏾‍🤝‍👨🏾", bio: "Connects agu.ai with farmer cooperatives across Kenya." },
                ].map((member, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1rem", padding: "1rem", textAlign: "center" }}>
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{member.emoji}</div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--white)", marginBottom: "0.2rem" }}>{member.name}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", marginBottom: "0.4rem" }}>{member.role}</div>
                    <p style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.5 }}>{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* VALUES */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Our Values</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { icon: "🤝", value: "Farmer First", desc: "Every decision we make puts the farmer at the center." },
                  { icon: "🌱", value: "Grow Together", desc: "We succeed only when Kenyan farmers succeed." },
                  { icon: "💡", value: "Simple Technology", desc: "The best tech is the kind that just works, with no complexity." },
                  { icon: "🇰🇪", value: "Proudly Kenyan", desc: "Built in Kenya, for Kenya, with deep local knowledge." },
                ].map((v, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.9rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "0.8rem", padding: "0.9rem 1rem" }}>
                    <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{v.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--white)", marginBottom: "0.2rem" }}>{v.value}</div>
                      <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.5)" }}>{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center", background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "1rem", padding: "1.5rem" }}>
              <div style={{ fontSize: "1.4rem", marginBottom: "0.5rem" }}>🌱</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "var(--white)", marginBottom: "0.4rem" }}>Join the agu.ai mission</div>
              <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.45)", marginBottom: "1rem" }}>Help us bring AI farming advice to every mkulima in Kenya.</p>
              <button onClick={() => setActiveTab("home")} style={{ background: "var(--green-bright)", border: "none", color: "var(--dark)", padding: "0.7rem 1.8rem", borderRadius: "2rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.85rem", cursor: "pointer" }}>Get Started</button>
            </div>

          </div>
        </div>
      )}
      {activeTab === "pricing" && (
        <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem 1.2rem" }}>

            {/* HEADER */}
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Simple Pricing</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                Plans for every <span style={{ color: "var(--gold)" }}>mkulima</span>
              </h1>
              <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.7 }}>
                Start free. Upgrade as you grow. No hidden charges.
              </p>
            </div>

            {/* PLANS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                {
                  name: "Mkulima Free",
                  price: "KSh 0",
                  period: "forever",
                  tag: null,
                  color: "rgba(255,255,255,0.03)",
                  border: "rgba(76,175,80,0.12)",
                  features: [
                    "✓ WhatsApp chatbot access",
                    "✓ Crop disease diagnosis",
                    "✓ Basic market prices",
                    "✓ Swahili and English support",
                    "✓ 30 messages per month",
                    "✗ Weather alerts",
                    "✗ Planting calendar",
                    "✗ Priority response",
                  ]
                },
                {
                  name: "Mkulima Pro",
                  price: "KSh 500",
                  period: "per month",
                  tag: "Most Popular",
                  color: "rgba(76,175,80,0.07)",
                  border: "rgba(76,175,80,0.4)",
                  features: [
                    "✓ Everything in Free",
                    "✓ Unlimited messages",
                    "✓ Live market prices daily",
                    "✓ Weather alerts by county",
                    "✓ Planting calendar",
                    "✓ Pest and fertilizer advice",
                    "✓ Priority AI response",
                    "✗ Admin dashboard",
                  ]
                },
                {
                  name: "Biashara Business",
                  price: "KSh 1,499",
                  period: "per month",
                  tag: "For Cooperatives",
                  color: "rgba(232,196,74,0.05)",
                  border: "rgba(232,196,74,0.3)",
                  features: [
                    "✓ Everything in Pro",
                    "✓ Up to 500 farmers",
                    "✓ Admin dashboard",
                    "✓ Regional analytics",
                    "✓ Custom WhatsApp number",
                    "✓ Bulk weather alerts",
                    "✓ API access",
                    "✓ Dedicated support",
                  ]
                },
              ].map((plan, i) => (
                <div key={i} style={{ background: plan.color, border: `1px solid ${plan.border}`, borderRadius: "1.2rem", padding: "1.4rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.3rem" }}>{plan.name}</div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: i === 1 ? "var(--green-bright)" : i === 2 ? "var(--gold)" : "var(--cream)" }}>{plan.price}</span>
                        <span style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.4)" }}>{plan.period}</span>
                      </div>
                    </div>
                    {plan.tag && (
                      <span style={{ fontSize: "0.68rem", padding: "0.25rem 0.7rem", borderRadius: "1rem", background: i === 1 ? "rgba(76,175,80,0.2)" : "rgba(232,196,74,0.15)", color: i === 1 ? "var(--green-bright)" : "var(--gold)", fontWeight: 600, whiteSpace: "nowrap" }}>{plan.tag}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.2rem" }}>
                    {plan.features.map((f, fi) => (
                      <div key={fi} style={{ fontSize: "0.82rem", color: f.startsWith("✓") ? "rgba(245,240,232,0.75)" : "rgba(245,240,232,0.25)" }}>{f}</div>
                    ))}
                  </div>
                  <button style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: i === 1 ? "none" : `1px solid ${plan.border}`, background: i === 1 ? "var(--green-bright)" : i === 2 ? "rgba(232,196,74,0.15)" : "rgba(255,255,255,0.05)", color: i === 1 ? "var(--dark)" : i === 2 ? "var(--gold)" : "var(--cream)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer" }}>
                    {i === 0 ? "Get Started Free" : i === 1 ? "Start Pro Plan" : "Contact Us"}
                  </button>
                </div>
              ))}
            </div>

            {/* M-PESA NOTE */}
            <div style={{ background: "rgba(76,175,80,0.06)", border: "1px solid rgba(76,175,80,0.15)", borderRadius: "1rem", padding: "1rem 1.2rem", display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "2rem" }}>
              <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>📱</span>
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--white)", marginBottom: "0.2rem" }}>Pay via M-Pesa</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.5 }}>All plans can be paid monthly via M-Pesa Paybill. No credit card needed.</div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>Common Questions</div>
              {[
                { q: "Can I switch plans anytime?", a: "Yes. You can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle." },
                { q: "Is there a contract or lock-in?", a: "No contracts. Pay month to month and cancel anytime with no penalties." },
                { q: "What happens when I hit 30 messages on Free?", a: "You will receive a notification and can upgrade to Pro, or wait until the next month when your count resets." },
                { q: "Do cooperatives get a discount?", a: "Yes. Cooperatives with over 100 farmers get a custom quote. Contact the Agunextech team for details." },
              ].map((faq, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "0.8rem", padding: "1rem", marginBottom: "0.6rem" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gold)", marginBottom: "0.35rem" }}>{faq.q}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.6 }}>{faq.a}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
      {activeTab === "contact" && (
        <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto", padding: "2rem 1.2rem" }}>

            {/* HEADER */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Get In Touch</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                Talk to <span style={{ color: "var(--gold)" }}>Agunextech</span>
              </h1>
              <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.7 }}>
                Have a question, partnership idea, or want to bring agu.ai to your cooperative? We would love to hear from you.
              </p>
            </div>

            {/* CONTACT CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "2rem" }}>
              {[
                { icon: "📱", title: "WhatsApp", value: "+254 700 000 000", sub: "Mon to Fri, 8am to 6pm" },
                { icon: "📧", title: "Email", value: "hello@agu.ai", sub: "We reply within 24 hours" },
                { icon: "📍", title: "Location", value: "Nairobi, Kenya", sub: "Westlands Business Park" },
                { icon: "🌐", title: "Social", value: "@aguai_kenya", sub: "Twitter and Instagram" },
              ].map((c, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1rem", padding: "1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{c.icon}</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>{c.title}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--white)", marginBottom: "0.2rem" }}>{c.value}</div>
                  <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.35)" }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* CONTACT FORM */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1.2rem", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--white)", marginBottom: "1.2rem" }}>Send us a message</div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>First Name</label>
                    <input
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                      placeholder="John"
                      value={contactForm.firstName}
                      onChange={e => setContactForm(f => ({ ...f, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Last Name</label>
                    <input
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                      placeholder="Kamau"
                      value={contactForm.lastName}
                      onChange={e => setContactForm(f => ({ ...f, lastName: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Email Address</label>
                  <input
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                    placeholder="john@example.com"
                    type="email"
                    value={contactForm.email}
                    onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>I am a</label>
                  <select
                    style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                    value={contactForm.type}
                    onChange={e => setContactForm(f => ({ ...f, type: e.target.value }))}
                  >
                    <option value="">Select one</option>
                    <option value="farmer">Farmer</option>
                    <option value="cooperative">Cooperative or SACCO</option>
                    <option value="ngo">NGO or Government</option>
                    <option value="business">Business or Investor</option>
                    <option value="developer">Developer or Partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Message</label>
                  <textarea
                    rows={4}
                    style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none", boxSizing: "border-box" }}
                    placeholder="Tell us how we can help..."
                    value={contactForm.message}
                    onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                  />
                </div>

                <button
                  onClick={() => {
                    if (contactForm.firstName && contactForm.email && contactForm.message) {
                      setContactSent(true);
                    }
                  }}
                  style={{ width: "100%", padding: "0.85rem", borderRadius: "0.75rem", border: "none", background: contactSent ? "rgba(76,175,80,0.2)" : "var(--green-bright)", color: contactSent ? "var(--green-bright)" : "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.3s" }}
                >
                  {contactSent ? t.sentBtn : t.sendBtn}
                </button>
              </div>
            </div>

            {/* BOTTOM NOTE */}
            <div style={{ textAlign: "center", fontSize: "0.78rem", color: "rgba(245,240,232,0.35)", lineHeight: 1.7 }}>
              Prefer WhatsApp? Send us a message directly at <span style={{ color: "var(--green-bright)" }}>+254 700 000 000</span>. We are proudly based in Nairobi, Kenya. 🇰🇪
            </div>

          </div>
        </div>
      )}
      {activeTab === "register" && (
        <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
          <div style={{ maxWidth: "500px", margin: "0 auto", padding: "2rem 1.2rem" }}>

            {!onboardDone ? (
              <>
                {/* PROGRESS BAR */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    {["Profile", "Location", "Crops", "Plan"].map((s, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem", flex: 1 }}>
                        <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 700, background: onboardStep > i + 1 ? "var(--green-bright)" : onboardStep === i + 1 ? "rgba(76,175,80,0.2)" : "rgba(255,255,255,0.05)", border: `2px solid ${onboardStep >= i + 1 ? "var(--green-bright)" : "rgba(255,255,255,0.1)"}`, color: onboardStep > i + 1 ? "var(--dark)" : onboardStep === i + 1 ? "var(--green-bright)" : "rgba(245,240,232,0.3)" }}>
                          {onboardStep > i + 1 ? "✓" : i + 1}
                        </div>
                        <span style={{ fontSize: "0.65rem", color: onboardStep === i + 1 ? "var(--green-bright)" : "rgba(245,240,232,0.3)" }}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: "2rem", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${((onboardStep - 1) / 3) * 100}%`, background: "var(--green-bright)", borderRadius: "2rem", transition: "width 0.4s ease" }} />
                  </div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1.2rem", padding: "1.5rem" }}>

                  {/* STEP 1 - PROFILE */}
                  {onboardStep === 1 && (
                    <>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>👤</div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: "0.3rem" }}>Welcome to agu.ai</h2>
                      <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginBottom: "1.2rem", lineHeight: 1.6 }}>Let us set up your farmer profile. It only takes 2 minutes.</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                        <div>
                          <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Full Name</label>
                          <input style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} placeholder="e.g. John Kamau" value={farmer.name} onChange={e => setFarmer(f => ({ ...f, name: e.target.value }))} />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>WhatsApp Number</label>
                          <input style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} placeholder="+254 712 345 678" value={farmer.phone} onChange={e => setFarmer(f => ({ ...f, phone: e.target.value }))} />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Preferred Language</label>
                          <div style={{ display: "flex", gap: "0.6rem" }}>
                            {["English", "Swahili"].map(lang => (
                              <button key={lang} onClick={() => setFarmer(f => ({ ...f, language: lang }))} style={{ flex: 1, padding: "0.65rem", borderRadius: "0.6rem", border: `1px solid ${farmer.language === lang ? "var(--green-bright)" : "rgba(76,175,80,0.2)"}`, background: farmer.language === lang ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.03)", color: farmer.language === lang ? "var(--green-bright)" : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer", transition: "all 0.2s" }}>{lang}</button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* STEP 2 - LOCATION */}
                  {onboardStep === 2 && (
                    <>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📍</div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: "0.3rem" }}>Your Location</h2>
                      <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginBottom: "1.2rem", lineHeight: 1.6 }}>We use your county to send accurate weather alerts and planting advice.</p>
                      <div>
                        <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Select Your County</label>
                        <select
                          style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: farmer.county ? "var(--cream)" : "rgba(245,240,232,0.35)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "0.75rem" }}
                          value={farmer.county}
                          onChange={e => setFarmer(f => ({ ...f, county: e.target.value }))}
                        >
                          <option value="">Choose your county...</option>
                          {["Baringo","Bomet","Bungoma","Busia","Elgeyo Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"].map(county => (
                            <option key={county} value={county}>{county}</option>
                          ))}
                        </select>
                        {farmer.county && (
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.9rem" }}>
                            <span>📍</span>
                            <span style={{ fontSize: "0.85rem", color: "var(--green-bright)", fontWeight: 500 }}>{farmer.county} County selected</span>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* STEP 3 - CROPS */}
                  {onboardStep === 3 && (
                    <>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🌱</div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: "0.3rem" }}>Your Crops</h2>
                      <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginBottom: "1.2rem", lineHeight: 1.6 }}>Select the crops you grow. Pick as many as you like.</p>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
                        {[
                          { name: "Maize", emoji: "🌽" }, { name: "Beans", emoji: "🫘" },
                          { name: "Tomatoes", emoji: "🍅" }, { name: "Potatoes", emoji: "🥔" },
                          { name: "Tea", emoji: "🍵" }, { name: "Coffee", emoji: "☕" },
                          { name: "Sugarcane", emoji: "🎋" }, { name: "Bananas", emoji: "🍌" },
                          { name: "Kale", emoji: "🥬" }, { name: "Wheat", emoji: "🌾" },
                        ].map(crop => {
                          const selected = farmer.crops.includes(crop.name);
                          return (
                            <button key={crop.name} onClick={() => setFarmer(f => ({ ...f, crops: selected ? f.crops.filter(c => c !== crop.name) : [...f.crops, crop.name] }))} style={{ padding: "0.6rem", borderRadius: "0.6rem", border: `1px solid ${selected ? "var(--green-bright)" : "rgba(76,175,80,0.15)"}`, background: selected ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.02)", color: selected ? "var(--green-bright)" : "rgba(245,240,232,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: "0.4rem", justifyContent: "center" }}>
                              <span>{crop.emoji}</span> {crop.name}
                            </button>
                          );
                        })}
                      </div>

                      {/* CUSTOM CROP INPUT */}
                      <div style={{ marginBottom: "0.5rem" }}>
                        <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>My crop is not listed</label>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          <input
                            style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.9rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                            placeholder="Type your crop e.g. Avocado"
                            value={customCrop}
                            onChange={e => setCustomCrop(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === "Enter" && customCrop.trim()) {
                                const name = customCrop.trim();
                                if (!farmer.crops.includes(name)) {
                                  setFarmer(f => ({ ...f, crops: [...f.crops, name] }));
                                }
                                setCustomCrop("");
                              }
                            }}
                          />
                          <button
                            onClick={() => {
                              const name = customCrop.trim();
                              if (name && !farmer.crops.includes(name)) {
                                setFarmer(f => ({ ...f, crops: [...f.crops, name] }));
                              }
                              setCustomCrop("");
                            }}
                            style={{ padding: "0.6rem 1rem", borderRadius: "0.6rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
                          >Add</button>
                        </div>
                      </div>

                      {/* SHOW CUSTOM CROPS ADDED */}
                      {farmer.crops.filter(c => !["Maize","Beans","Tomatoes","Potatoes","Tea","Coffee","Sugarcane","Bananas","Kale","Wheat"].includes(c)).length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.4rem" }}>
                          {farmer.crops.filter(c => !["Maize","Beans","Tomatoes","Potatoes","Tea","Coffee","Sugarcane","Bananas","Kale","Wheat"].includes(c)).map((c, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.3rem", background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "2rem", padding: "0.25rem 0.7rem" }}>
                              <span style={{ fontSize: "0.78rem", color: "var(--green-bright)" }}>🌿 {c}</span>
                              <button onClick={() => setFarmer(f => ({ ...f, crops: f.crops.filter(x => x !== c) }))} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.4)", cursor: "pointer", fontSize: "0.75rem", padding: 0, lineHeight: 1 }}>✕</button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}

                  {/* STEP 4 - PLAN */}
                  {onboardStep === 4 && (
                    <>
                      <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🚀</div>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: "0.3rem" }}>Choose Your Plan</h2>
                      <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginBottom: "1.2rem", lineHeight: 1.6 }}>You can always upgrade later. Start free today.</p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {[
                          { name: "Mkulima Free", price: "KSh 0", desc: "30 messages per month, basic features", color: "rgba(255,255,255,0.03)", border: "rgba(76,175,80,0.12)" },
                          { name: "Mkulima Pro", price: "KSh 500/mo", desc: "Unlimited messages, weather and planting", color: "rgba(76,175,80,0.07)", border: "rgba(76,175,80,0.4)" },
                          { name: "Biashara Business", price: "KSh 1,499/mo", desc: "Up to 500 farmers, dashboard and API", color: "rgba(232,196,74,0.05)", border: "rgba(232,196,74,0.25)" },
                        ].map(plan => (
                          <button key={plan.name} onClick={() => setFarmer(f => ({ ...f, plan: plan.name }))} style={{ padding: "0.9rem 1rem", borderRadius: "0.8rem", border: `1px solid ${farmer.plan === plan.name ? "var(--green-bright)" : plan.border}`, background: farmer.plan === plan.name ? "rgba(76,175,80,0.12)" : plan.color, cursor: "pointer", textAlign: "left", fontFamily: "'DM Sans', sans-serif", transition: "all 0.2s" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.2rem" }}>
                              <span style={{ fontWeight: 600, fontSize: "0.88rem", color: farmer.plan === plan.name ? "var(--green-bright)" : "var(--white)" }}>{plan.name}</span>
                              <span style={{ fontSize: "0.82rem", color: "var(--gold)", fontWeight: 600 }}>{plan.price}</span>
                            </div>
                            <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.45)" }}>{plan.desc}</div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  {/* NAV BUTTONS */}
                  <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                    {onboardStep > 1 && (
                      <button onClick={() => setOnboardStep(s => s - 1)} style={{ flex: 1, padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid rgba(76,175,80,0.2)", background: "transparent", color: "rgba(245,240,232,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", cursor: "pointer" }}>Back</button>
                    )}
                    <button
                      onClick={() => { if (onboardStep < 4) { setOnboardStep(s => s + 1); } else { setOnboardDone(true); } }}
                      style={{ flex: 2, padding: "0.75rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}
                    >
                      {onboardStep === 4 ? t.completeBtn : t.continueBtn}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* SUCCESS SCREEN */
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: "var(--white)", marginBottom: "0.5rem" }}>Welcome, {farmer.name || "Mkulima"}!</h2>
                <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  You are registered on agu.ai. Save our WhatsApp number and send us your first question.
                </p>
                <div style={{ background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "1rem", padding: "1.2rem", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Your Profile Summary</div>
                  {[
                    { label: "Name", value: farmer.name || "Not set" },
                    { label: "Phone", value: farmer.phone || "Not set" },
                    { label: "County", value: farmer.county || "Not set" },
                    { label: "Crops", value: farmer.crops.length > 0 ? farmer.crops.join(", ") : "Not set" },
                    { label: "Language", value: farmer.language || "Not set" },
                    { label: "Plan", value: farmer.plan || "Mkulima Free" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.4rem 0", borderBottom: i < 5 ? "1px solid rgba(76,175,80,0.07)" : "none" }}>
                      <span style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.4)" }}>{item.label}</span>
                      <span style={{ fontSize: "0.78rem", color: "var(--cream)", fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab("home")} style={{ width: "100%", padding: "0.85rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>
                  🌱 Start on WhatsApp
                </button>
              </div>
            )}

          </div>
        </div>
      )}
      {activeTab === "prices" && (() => {
        const STATIC_PRICES = {
          Wakulima: [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3400, change: +5.2, high: 3600, low: 3100 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9200, change: -2.1, high: 9800, low: 8900 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1800, change: +12.4, high: 2200, low: 1500 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2100, change: -1.3, high: 2400, low: 1900 },
            { crop: "Kale", emoji: "🥬", unit: "bale", price: 350, change: +3.8, high: 400, low: 300 },
            { crop: "Onions", emoji: "🧅", unit: "50kg bag", price: 3800, change: +8.1, high: 4200, low: 3400 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 120, change: +15.6, high: 150, low: 90 },
            { crop: "Bananas", emoji: "🍌", unit: "bunch", price: 180, change: +2.3, high: 220, low: 160 },
          ],
          Kongowea: [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3300, change: +3.1, high: 3500, low: 3000 },
            { crop: "Coconut", emoji: "🥥", unit: "per piece", price: 30, change: -2.0, high: 40, low: 25 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 80, change: +20.0, high: 100, low: 60 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1500, change: +4.0, high: 1800, low: 1300 },
            { crop: "Pineapple", emoji: "🍍", unit: "per piece", price: 60, change: +5.0, high: 80, low: 50 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 2100, change: +9.2, high: 2400, low: 1800 },
            { crop: "Kale", emoji: "🥬", unit: "bale", price: 320, change: +2.5, high: 380, low: 280 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9000, change: -1.5, high: 9500, low: 8700 },
          ],
          "Uasin Gishu (Eldoret)": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3200, change: +2.8, high: 3400, low: 3000 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4800, change: -0.8, high: 5100, low: 4600 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8800, change: +1.2, high: 9200, low: 8500 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 1900, change: -3.1, high: 2200, low: 1700 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 45, change: +2.3, high: 50, low: 42 },
            { crop: "Sunflower", emoji: "🌻", unit: "90kg bag", price: 5200, change: +1.0, high: 5500, low: 4900 },
            { crop: "Soya Beans", emoji: "🫘", unit: "90kg bag", price: 6800, change: +3.5, high: 7200, low: 6400 },
            { crop: "Carrots", emoji: "🥕", unit: "50kg bag", price: 2000, change: +3.0, high: 2300, low: 1800 },
          ],
          "Kisumu": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3100, change: +1.5, high: 3300, low: 2900 },
            { crop: "Fish (Tilapia)", emoji: "🐟", unit: "per kg", price: 350, change: +6.2, high: 400, low: 300 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4200, change: -1.8, high: 4500, low: 3900 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1600, change: +3.5, high: 1900, low: 1400 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1400, change: +2.0, high: 1700, low: 1200 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1900, change: +7.0, high: 2200, low: 1600 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5500, change: -0.5, high: 5800, low: 5200 },
            { crop: "Onions", emoji: "🧅", unit: "50kg bag", price: 3600, change: +4.5, high: 4000, low: 3200 },
          ],
          "Nakuru": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3250, change: +4.0, high: 3500, low: 3000 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2200, change: +5.5, high: 2500, low: 2000 },
            { crop: "Pyrethrum", emoji: "🌸", unit: "per kg dry", price: 180, change: +2.0, high: 210, low: 160 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 48, change: +1.5, high: 52, low: 44 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4700, change: +0.5, high: 5000, low: 4500 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9100, change: -1.0, high: 9500, low: 8800 },
            { crop: "Carrots", emoji: "🥕", unit: "50kg bag", price: 1900, change: +2.8, high: 2200, low: 1700 },
            { crop: "Kale", emoji: "🥬", unit: "bale", price: 340, change: +1.2, high: 390, low: 300 },
          ],
          "Meru": [
            { crop: "Miraa (Khat)", emoji: "🌿", unit: "per kg", price: 250, change: +10.0, high: 300, low: 200 },
            { crop: "Coffee", emoji: "☕", unit: "per kg FAQ", price: 320, change: +8.5, high: 380, low: 280 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 110, change: +12.0, high: 140, low: 85 },
            { crop: "Bananas", emoji: "🍌", unit: "bunch", price: 200, change: +3.0, high: 240, low: 175 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3150, change: +3.2, high: 3400, low: 2900 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9000, change: -0.5, high: 9400, low: 8700 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 2000, change: +5.0, high: 2300, low: 1700 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2050, change: -2.0, high: 2300, low: 1850 },
          ],
          "Nyeri": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 28, change: +1.8, high: 32, low: 25 },
            { crop: "Coffee", emoji: "☕", unit: "per kg FAQ", price: 310, change: +7.0, high: 370, low: 270 },
            { crop: "Macadamia", emoji: "🥜", unit: "per kg", price: 95, change: +9.0, high: 115, low: 80 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2150, change: +4.0, high: 2450, low: 1950 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3180, change: +2.5, high: 3400, low: 2950 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9050, change: -1.2, high: 9450, low: 8750 },
            { crop: "Carrots", emoji: "🥕", unit: "50kg bag", price: 2050, change: +2.0, high: 2350, low: 1850 },
            { crop: "Kale", emoji: "🥬", unit: "bale", price: 330, change: +1.5, high: 380, low: 290 },
          ],
          "Kiambu": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 26, change: +2.0, high: 30, low: 23 },
            { crop: "Coffee", emoji: "☕", unit: "per kg FAQ", price: 300, change: +6.0, high: 360, low: 260 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1750, change: +10.0, high: 2100, low: 1450 },
            { crop: "Kale", emoji: "🥬", unit: "bale", price: 360, change: +4.0, high: 410, low: 310 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2050, change: -1.5, high: 2350, low: 1850 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3300, change: +3.0, high: 3550, low: 3050 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 115, change: +14.0, high: 145, low: 88 },
            { crop: "Passion Fruit", emoji: "🍈", unit: "per kg", price: 95, change: +7.0, high: 120, low: 75 },
          ],
          "Murang'a": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 27, change: +1.5, high: 31, low: 24 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 105, change: +11.0, high: 135, low: 82 },
            { crop: "Bananas", emoji: "🍌", unit: "bunch", price: 190, change: +2.8, high: 230, low: 165 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3220, change: +2.2, high: 3450, low: 2980 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9100, change: -0.8, high: 9500, low: 8800 },
            { crop: "Coffee", emoji: "☕", unit: "per kg FAQ", price: 295, change: +5.5, high: 355, low: 255 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1550, change: +3.0, high: 1850, low: 1350 },
            { crop: "Arrowroot", emoji: "🌿", unit: "per kg", price: 35, change: +2.5, high: 45, low: 30 },
          ],
          "Kirinyaga": [
            { crop: "Rice (Mwea)", emoji: "🍚", unit: "per kg", price: 120, change: +3.5, high: 140, low: 105 },
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 27, change: +2.0, high: 31, low: 24 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3200, change: +2.0, high: 3420, low: 2960 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9050, change: -1.0, high: 9420, low: 8750 },
            { crop: "Bananas", emoji: "🍌", unit: "bunch", price: 185, change: +2.5, high: 225, low: 160 },
            { crop: "Coffee", emoji: "☕", unit: "per kg FAQ", price: 305, change: +6.5, high: 365, low: 265 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2080, change: -1.8, high: 2360, low: 1880 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 108, change: +13.0, high: 138, low: 84 },
          ],
          "Machakos": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3100, change: +2.5, high: 3350, low: 2880 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8900, change: -1.5, high: 9300, low: 8600 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 75, change: +18.0, high: 95, low: 55 },
            { crop: "Pawpaw", emoji: "🍈", unit: "per kg", price: 50, change: +5.0, high: 65, low: 40 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1850, change: +8.0, high: 2150, low: 1550 },
            { crop: "Watermelon", emoji: "🍉", unit: "per kg", price: 25, change: +3.0, high: 35, low: 20 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7500, change: +4.0, high: 8000, low: 7000 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4100, change: -2.0, high: 4400, low: 3800 },
          ],
          "Makueni": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3050, change: +2.0, high: 3300, low: 2830 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8850, change: -1.0, high: 9250, low: 8550 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 70, change: +15.0, high: 90, low: 52 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7400, change: +3.5, high: 7900, low: 6900 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4050, change: -1.5, high: 4350, low: 3750 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1820, change: +6.5, high: 2100, low: 1520 },
            { crop: "Watermelon", emoji: "🍉", unit: "per kg", price: 22, change: +2.5, high: 32, low: 18 },
            { crop: "Green Grams", emoji: "🫘", unit: "50kg bag", price: 7200, change: +5.0, high: 7700, low: 6700 },
          ],
          "Kitui": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3000, change: +1.8, high: 3250, low: 2780 },
            { crop: "Green Grams", emoji: "🫘", unit: "50kg bag", price: 7100, change: +4.5, high: 7600, low: 6600 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7300, change: +3.0, high: 7800, low: 6800 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4000, change: -1.0, high: 4300, low: 3700 },
            { crop: "Cotton", emoji: "🌿", unit: "per kg", price: 65, change: +2.0, high: 80, low: 55 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8800, change: -0.5, high: 9200, low: 8500 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1800, change: +5.0, high: 2080, low: 1500 },
            { crop: "Watermelon", emoji: "🍉", unit: "per kg", price: 20, change: +2.0, high: 30, low: 16 },
          ],
          "Embu": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 27, change: +1.8, high: 31, low: 24 },
            { crop: "Coffee", emoji: "☕", unit: "per kg FAQ", price: 308, change: +6.8, high: 368, low: 268 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3170, change: +2.8, high: 3390, low: 2940 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9020, change: -0.8, high: 9400, low: 8720 },
            { crop: "Bananas", emoji: "🍌", unit: "bunch", price: 190, change: +2.6, high: 230, low: 165 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 112, change: +13.5, high: 142, low: 87 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2090, change: -1.6, high: 2370, low: 1890 },
            { crop: "Miraa", emoji: "🌿", unit: "per kg", price: 230, change: +8.0, high: 280, low: 185 },
          ],
          "Tharaka Nithi": [
            { crop: "Miraa", emoji: "🌿", unit: "per kg", price: 240, change: +9.0, high: 290, low: 192 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3120, change: +2.3, high: 3360, low: 2900 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8950, change: -0.7, high: 9350, low: 8650 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4150, change: -1.2, high: 4450, low: 3850 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5400, change: -0.3, high: 5700, low: 5100 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1950, change: +6.0, high: 2250, low: 1650 },
            { crop: "Coffee", emoji: "☕", unit: "per kg FAQ", price: 312, change: +7.0, high: 372, low: 272 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 106, change: +11.5, high: 136, low: 83 },
          ],
          "Kakamega": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3050, change: +1.5, high: 3280, low: 2840 },
            { crop: "Sugarcane", emoji: "🎋", unit: "per tonne", price: 4200, change: +2.0, high: 4500, low: 3900 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8750, change: -0.5, high: 9150, low: 8450 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4100, change: -1.5, high: 4400, low: 3800 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8500, change: +5.0, high: 9000, low: 8000 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1500, change: +2.8, high: 1800, low: 1300 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1780, change: +6.0, high: 2050, low: 1480 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1380, change: +3.0, high: 1660, low: 1180 },
          ],
          "Vihiga": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3020, change: +1.2, high: 3250, low: 2810 },
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 25, change: +1.5, high: 29, low: 22 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8700, change: -0.3, high: 9100, low: 8400 },
            { crop: "Sugarcane", emoji: "🎋", unit: "per tonne", price: 4100, change: +1.8, high: 4400, low: 3800 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4050, change: -1.0, high: 4350, low: 3750 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8400, change: +4.5, high: 8900, low: 7900 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1480, change: +2.5, high: 1780, low: 1280 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1360, change: +2.8, high: 1640, low: 1160 },
          ],
          "Bungoma": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3080, change: +2.0, high: 3310, low: 2870 },
            { crop: "Sugarcane", emoji: "🎋", unit: "per tonne", price: 4300, change: +2.5, high: 4600, low: 4000 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4650, change: -0.5, high: 4950, low: 4450 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8780, change: -0.8, high: 9180, low: 8480 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8550, change: +5.2, high: 9050, low: 8050 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4120, change: -1.3, high: 4420, low: 3820 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1400, change: +3.2, high: 1680, low: 1200 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1520, change: +3.0, high: 1820, low: 1320 },
          ],
          "Busia": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3000, change: +1.0, high: 3230, low: 2790 },
            { crop: "Fish (Tilapia)", emoji: "🐟", unit: "per kg", price: 330, change: +5.5, high: 380, low: 280 },
            { crop: "Sugarcane", emoji: "🎋", unit: "per tonne", price: 4150, change: +2.2, high: 4450, low: 3850 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8720, change: -0.5, high: 9120, low: 8420 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1460, change: +2.3, high: 1760, low: 1260 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1340, change: +2.5, high: 1620, low: 1140 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4000, change: -0.8, high: 4300, low: 3700 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8300, change: +4.0, high: 8800, low: 7800 },
          ],
          "Siaya": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3020, change: +1.3, high: 3250, low: 2810 },
            { crop: "Fish (Tilapia)", emoji: "🐟", unit: "per kg", price: 340, change: +5.8, high: 390, low: 290 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4080, change: -1.6, high: 4380, low: 3780 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5450, change: -0.4, high: 5750, low: 5150 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1530, change: +3.2, high: 1830, low: 1330 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1370, change: +2.7, high: 1650, low: 1170 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8730, change: -0.6, high: 9130, low: 8430 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8350, change: +4.2, high: 8850, low: 7850 },
          ],
          "Homa Bay": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3010, change: +1.1, high: 3240, low: 2800 },
            { crop: "Fish (Tilapia)", emoji: "🐟", unit: "per kg", price: 320, change: +5.0, high: 370, low: 270 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4060, change: -1.4, high: 4360, low: 3760 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5420, change: -0.3, high: 5720, low: 5120 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1510, change: +3.0, high: 1810, low: 1310 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1350, change: +2.5, high: 1630, low: 1150 },
            { crop: "Rice", emoji: "🍚", unit: "per kg", price: 115, change: +3.0, high: 135, low: 100 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8320, change: +4.0, high: 8820, low: 7820 },
          ],
          "Migori": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3030, change: +1.4, high: 3260, low: 2820 },
            { crop: "Fish (Tilapia)", emoji: "🐟", unit: "per kg", price: 335, change: +5.5, high: 385, low: 285 },
            { crop: "Sugarcane", emoji: "🎋", unit: "per tonne", price: 4200, change: +2.3, high: 4500, low: 3900 },
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 25, change: +1.4, high: 29, low: 22 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4090, change: -1.5, high: 4390, low: 3790 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8740, change: -0.7, high: 9140, low: 8440 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1545, change: +3.3, high: 1845, low: 1345 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8370, change: +4.3, high: 8870, low: 7870 },
          ],
          "Kisii": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 26, change: +1.7, high: 30, low: 23 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3060, change: +1.8, high: 3290, low: 2850 },
            { crop: "Bananas", emoji: "🍌", unit: "bunch", price: 185, change: +2.5, high: 225, low: 160 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 100, change: +10.0, high: 130, low: 78 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8760, change: -0.6, high: 9160, low: 8460 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4070, change: -1.2, high: 4370, low: 3770 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1490, change: +2.7, high: 1790, low: 1290 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8340, change: +4.1, high: 8840, low: 7840 },
          ],
          "Nyamira": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 26, change: +1.6, high: 30, low: 23 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3040, change: +1.6, high: 3270, low: 2830 },
            { crop: "Bananas", emoji: "🍌", unit: "bunch", price: 183, change: +2.4, high: 223, low: 158 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 98, change: +9.5, high: 128, low: 76 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8710, change: -0.4, high: 9110, low: 8410 },
            { crop: "Sweet Potato", emoji: "🍠", unit: "50kg bag", price: 1470, change: +2.6, high: 1770, low: 1270 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8310, change: +3.9, high: 8810, low: 7810 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1330, change: +2.3, high: 1610, low: 1130 },
          ],
          "Kericho": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 29, change: +2.0, high: 33, low: 26 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3140, change: +2.2, high: 3370, low: 2930 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 47, change: +1.8, high: 51, low: 43 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8980, change: -0.9, high: 9380, low: 8680 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2060, change: -1.7, high: 2340, low: 1860 },
            { crop: "Cabbage", emoji: "🥦", unit: "per head", price: 42, change: -4.5, high: 57, low: 37 },
            { crop: "Carrots", emoji: "🥕", unit: "50kg bag", price: 1950, change: +2.5, high: 2250, low: 1750 },
            { crop: "Pyrethrum", emoji: "🌸", unit: "per kg dry", price: 175, change: +1.8, high: 205, low: 155 },
          ],
          "Bomet": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 28, change: +1.9, high: 32, low: 25 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3130, change: +2.1, high: 3360, low: 2920 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 46, change: +1.7, high: 50, low: 42 },
            { crop: "Pyrethrum", emoji: "🌸", unit: "per kg dry", price: 172, change: +1.5, high: 202, low: 152 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8960, change: -0.8, high: 9360, low: 8660 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2040, change: -1.5, high: 2320, low: 1840 },
            { crop: "Cabbage", emoji: "🥦", unit: "per head", price: 41, change: -4.3, high: 56, low: 36 },
            { crop: "Carrots", emoji: "🥕", unit: "50kg bag", price: 1940, change: +2.3, high: 2240, low: 1740 },
          ],
          "Nandi": [
            { crop: "Tea", emoji: "🍵", unit: "per kg green leaf", price: 27, change: +1.7, high: 31, low: 24 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3160, change: +2.4, high: 3390, low: 2950 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 46, change: +1.6, high: 50, low: 42 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8850, change: -0.7, high: 9250, low: 8550 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2000, change: -1.4, high: 2280, low: 1800 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4720, change: -0.6, high: 5020, low: 4520 },
            { crop: "Sunflower", emoji: "🌻", unit: "90kg bag", price: 5150, change: +0.8, high: 5450, low: 4850 },
            { crop: "Pyrethrum", emoji: "🌸", unit: "per kg dry", price: 170, change: +1.3, high: 200, low: 150 },
          ],
          "Trans Nzoia": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3080, change: +2.0, high: 3310, low: 2870 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4750, change: -0.7, high: 5050, low: 4550 },
            { crop: "Sunflower", emoji: "🌻", unit: "90kg bag", price: 5180, change: +1.0, high: 5480, low: 4880 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8790, change: -0.8, high: 9190, low: 8490 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 1950, change: -1.2, high: 2230, low: 1750 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 46, change: +1.5, high: 50, low: 42 },
            { crop: "Soya Beans", emoji: "🫘", unit: "90kg bag", price: 6850, change: +3.8, high: 7250, low: 6450 },
            { crop: "Cabbage", emoji: "🥦", unit: "per head", price: 39, change: -4.8, high: 54, low: 34 },
          ],
          "Elgeyo Marakwet": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3190, change: +2.6, high: 3420, low: 2970 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4780, change: -0.7, high: 5080, low: 4580 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2030, change: -1.6, high: 2310, low: 1830 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 47, change: +1.7, high: 51, low: 43 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8870, change: -0.8, high: 9270, low: 8570 },
            { crop: "Sunflower", emoji: "🌻", unit: "90kg bag", price: 5160, change: +0.9, high: 5460, low: 4860 },
            { crop: "Pyrethrum", emoji: "🌸", unit: "per kg dry", price: 176, change: +1.7, high: 206, low: 156 },
            { crop: "Cabbage", emoji: "🥦", unit: "per head", price: 40, change: -4.4, high: 55, low: 35 },
          ],
          "West Pokot": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2950, change: +0.8, high: 3200, low: 2750 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 3950, change: -1.0, high: 4250, low: 3650 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5350, change: -0.2, high: 5650, low: 5050 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8650, change: -0.2, high: 9050, low: 8350 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 44, change: +1.2, high: 48, low: 40 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 350, change: +3.0, high: 400, low: 300 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8200, change: +3.5, high: 8700, low: 7700 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1300, change: +2.0, high: 1580, low: 1100 },
          ],
          "Turkana": [
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 3900, change: -0.8, high: 4200, low: 3600 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5300, change: -0.1, high: 5600, low: 5000 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2900, change: +0.5, high: 3150, low: 2700 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 340, change: +2.8, high: 390, low: 290 },
            { crop: "Goat", emoji: "🐐", unit: "per head", price: 6500, change: +3.5, high: 7500, low: 5800 },
            { crop: "Camel Milk", emoji: "🥛", unit: "per litre", price: 85, change: +4.0, high: 100, low: 70 },
            { crop: "Fish (Nile Perch)", emoji: "🐟", unit: "per kg", price: 280, change: +4.5, high: 330, low: 240 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7200, change: +3.0, high: 7700, low: 6700 },
          ],
          "Samburu": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2980, change: +0.7, high: 3220, low: 2770 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 345, change: +2.9, high: 395, low: 295 },
            { crop: "Goat", emoji: "🐐", unit: "per head", price: 6200, change: +3.2, high: 7200, low: 5500 },
            { crop: "Camel Milk", emoji: "🥛", unit: "per litre", price: 80, change: +3.8, high: 95, low: 67 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5320, change: -0.2, high: 5620, low: 5020 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 3920, change: -0.9, high: 4220, low: 3620 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8630, change: -0.1, high: 9030, low: 8330 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8180, change: +3.4, high: 8680, low: 7680 },
          ],
          "Baringo": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3100, change: +1.6, high: 3330, low: 2890 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 4050, change: -1.1, high: 4350, low: 3750 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5380, change: -0.3, high: 5680, low: 5080 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 348, change: +3.0, high: 398, low: 298 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 44, change: +1.3, high: 48, low: 40 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8680, change: -0.3, high: 9080, low: 8380 },
            { crop: "Groundnuts", emoji: "🥜", unit: "50kg bag", price: 8230, change: +3.6, high: 8730, low: 7730 },
            { crop: "Cotton", emoji: "🌿", unit: "per kg", price: 63, change: +1.8, high: 78, low: 53 },
          ],
          "Laikipia": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3210, change: +2.3, high: 3440, low: 2990 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4760, change: -0.7, high: 5060, low: 4560 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2120, change: +3.8, high: 2420, low: 1920 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 47, change: +1.7, high: 51, low: 43 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9080, change: -1.1, high: 9480, low: 8780 },
            { crop: "Sunflower", emoji: "🌻", unit: "90kg bag", price: 5170, change: +0.9, high: 5470, low: 4870 },
            { crop: "Carrots", emoji: "🥕", unit: "50kg bag", price: 1980, change: +2.7, high: 2280, low: 1780 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 355, change: +3.2, high: 405, low: 305 },
          ],
          "Isiolo": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2970, change: +0.6, high: 3210, low: 2760 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 342, change: +2.7, high: 392, low: 292 },
            { crop: "Goat", emoji: "🐐", unit: "per head", price: 6100, change: +3.0, high: 7100, low: 5400 },
            { crop: "Camel Milk", emoji: "🥛", unit: "per litre", price: 78, change: +3.5, high: 93, low: 65 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 3930, change: -0.9, high: 4230, low: 3630 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5310, change: -0.2, high: 5610, low: 5010 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7150, change: +2.8, high: 7650, low: 6650 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8640, change: -0.2, high: 9040, low: 8340 },
          ],
          "Marsabit": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2930, change: +0.4, high: 3170, low: 2730 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 338, change: +2.6, high: 388, low: 288 },
            { crop: "Camel Milk", emoji: "🥛", unit: "per litre", price: 82, change: +3.9, high: 97, low: 68 },
            { crop: "Goat", emoji: "🐐", unit: "per head", price: 6050, change: +2.9, high: 7050, low: 5350 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 3880, change: -0.7, high: 4180, low: 3580 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5280, change: -0.1, high: 5580, low: 4980 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8600, change: -0.1, high: 9000, low: 8300 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7100, change: +2.5, high: 7600, low: 6600 },
          ],
          "Wajir": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2920, change: +0.3, high: 3160, low: 2720 },
            { crop: "Camel Milk", emoji: "🥛", unit: "per litre", price: 88, change: +4.2, high: 103, low: 73 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 335, change: +2.5, high: 385, low: 285 },
            { crop: "Goat", emoji: "🐐", unit: "per head", price: 6000, change: +2.8, high: 7000, low: 5300 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 3860, change: -0.6, high: 4160, low: 3560 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7050, change: +2.3, high: 7550, low: 6550 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5260, change: -0.1, high: 5560, low: 4960 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8580, change: 0.0, high: 8980, low: 8280 },
          ],
          "Mandera": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2910, change: +0.2, high: 3150, low: 2710 },
            { crop: "Camel Milk", emoji: "🥛", unit: "per litre", price: 90, change: +4.5, high: 105, low: 75 },
            { crop: "Goat", emoji: "🐐", unit: "per head", price: 5950, change: +2.7, high: 6950, low: 5250 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 332, change: +2.4, high: 382, low: 282 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 3850, change: -0.5, high: 4150, low: 3550 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7000, change: +2.2, high: 7500, low: 6500 },
            { crop: "Millet", emoji: "🌾", unit: "90kg bag", price: 5250, change: 0.0, high: 5550, low: 4950 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8560, change: 0.0, high: 8960, low: 8260 },
          ],
          "Garissa": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2960, change: +0.5, high: 3200, low: 2760 },
            { crop: "Camel Milk", emoji: "🥛", unit: "per litre", price: 85, change: +4.0, high: 100, low: 70 },
            { crop: "Goat", emoji: "🐐", unit: "per head", price: 6150, change: +3.0, high: 7150, low: 5450 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 340, change: +2.6, high: 390, low: 290 },
            { crop: "Sorghum", emoji: "🌾", unit: "90kg bag", price: 3870, change: -0.7, high: 4170, low: 3570 },
            { crop: "Fish (Tana River)", emoji: "🐟", unit: "per kg", price: 260, change: +4.0, high: 310, low: 220 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7080, change: +2.4, high: 7580, low: 6580 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8610, change: -0.1, high: 9010, low: 8310 },
          ],
          "Tana River": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 2990, change: +0.8, high: 3230, low: 2790 },
            { crop: "Coconut", emoji: "🥥", unit: "per piece", price: 28, change: -1.5, high: 38, low: 23 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 72, change: +16.0, high: 92, low: 54 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1320, change: +2.1, high: 1600, low: 1120 },
            { crop: "Fish", emoji: "🐟", unit: "per kg", price: 270, change: +4.2, high: 320, low: 230 },
            { crop: "Cotton", emoji: "🌿", unit: "per kg", price: 62, change: +1.5, high: 77, low: 52 },
            { crop: "Rice", emoji: "🍚", unit: "per kg", price: 110, change: +2.8, high: 130, low: 95 },
            { crop: "Cowpeas", emoji: "🫘", unit: "90kg bag", price: 7120, change: +2.6, high: 7620, low: 6620 },
          ],
          "Kilifi": [
            { crop: "Coconut", emoji: "🥥", unit: "per piece", price: 28, change: -1.8, high: 38, low: 23 },
            { crop: "Cashew Nut", emoji: "🥜", unit: "per kg", price: 220, change: +8.0, high: 260, low: 185 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1310, change: +1.9, high: 1590, low: 1110 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3010, change: +1.0, high: 3240, low: 2800 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 74, change: +17.0, high: 94, low: 56 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8690, change: -0.3, high: 9090, low: 8390 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 2050, change: +8.5, high: 2350, low: 1750 },
            { crop: "Pineapple", emoji: "🍍", unit: "per piece", price: 58, change: +4.5, high: 78, low: 48 },
          ],
          "Kwale": [
            { crop: "Coconut", emoji: "🥥", unit: "per piece", price: 27, change: -1.6, high: 37, low: 22 },
            { crop: "Cashew Nut", emoji: "🥜", unit: "per kg", price: 215, change: +7.5, high: 255, low: 180 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1300, change: +1.8, high: 1580, low: 1100 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3000, change: +0.9, high: 3230, low: 2790 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 72, change: +16.5, high: 92, low: 54 },
            { crop: "Sisal", emoji: "🌿", unit: "per kg", price: 42, change: +2.5, high: 55, low: 35 },
            { crop: "Pineapple", emoji: "🍍", unit: "per piece", price: 56, change: +4.0, high: 76, low: 46 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8670, change: -0.2, high: 9070, low: 8370 },
          ],
          "Taita Taveta": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3050, change: +1.5, high: 3280, low: 2840 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8800, change: -0.6, high: 9200, low: 8500 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1900, change: +7.5, high: 2200, low: 1600 },
            { crop: "Onions", emoji: "🧅", unit: "50kg bag", price: 3700, change: +5.5, high: 4100, low: 3300 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 76, change: +18.5, high: 96, low: 58 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 103, change: +10.5, high: 133, low: 80 },
            { crop: "Bananas", emoji: "🍌", unit: "bunch", price: 175, change: +2.0, high: 215, low: 152 },
            { crop: "Cabbage", emoji: "🥦", unit: "per head", price: 43, change: -4.0, high: 58, low: 38 },
          ],
          "Lamu": [
            { crop: "Coconut", emoji: "🥥", unit: "per piece", price: 32, change: -1.2, high: 42, low: 27 },
            { crop: "Cashew Nut", emoji: "🥜", unit: "per kg", price: 225, change: +8.5, high: 265, low: 190 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 78, change: +19.0, high: 98, low: 60 },
            { crop: "Fish", emoji: "🐟", unit: "per kg", price: 380, change: +7.0, high: 430, low: 330 },
            { crop: "Cassava", emoji: "🌿", unit: "50kg bag", price: 1350, change: +2.3, high: 1630, low: 1150 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3080, change: +1.6, high: 3310, low: 2870 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 2150, change: +10.0, high: 2450, low: 1850 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 8750, change: -0.5, high: 9150, low: 8450 },
          ],
          "Kajiado": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3350, change: +4.5, high: 3600, low: 3100 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9150, change: -2.0, high: 9650, low: 8850 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1750, change: +11.0, high: 2150, low: 1450 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 50, change: +2.0, high: 54, low: 46 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 370, change: +3.8, high: 420, low: 320 },
            { crop: "Onions", emoji: "🧅", unit: "50kg bag", price: 3900, change: +8.5, high: 4300, low: 3500 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 118, change: +15.0, high: 148, low: 88 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2080, change: -1.5, high: 2360, low: 1880 },
          ],
          "Narok": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3180, change: +2.5, high: 3410, low: 2960 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4820, change: -0.7, high: 5120, low: 4620 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 49, change: +1.9, high: 53, low: 45 },
            { crop: "Cattle (beef)", emoji: "🐄", unit: "per kg live weight", price: 365, change: +3.5, high: 415, low: 315 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9000, change: -1.3, high: 9400, low: 8700 },
            { crop: "Sunflower", emoji: "🌻", unit: "90kg bag", price: 5220, change: +1.1, high: 5520, low: 4920 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2000, change: -1.8, high: 2280, low: 1800 },
            { crop: "Pyrethrum", emoji: "🌸", unit: "per kg dry", price: 178, change: +1.9, high: 208, low: 158 },
          ],
          "Nyandarua": [
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2250, change: +6.0, high: 2550, low: 2050 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3200, change: +2.8, high: 3430, low: 2980 },
            { crop: "Milk", emoji: "🥛", unit: "per litre", price: 49, change: +1.8, high: 53, low: 45 },
            { crop: "Wheat", emoji: "🌾", unit: "90kg bag", price: 4790, change: -0.7, high: 5090, low: 4590 },
            { crop: "Kale", emoji: "🥬", unit: "bale", price: 345, change: +1.3, high: 395, low: 305 },
            { crop: "Carrots", emoji: "🥕", unit: "50kg bag", price: 2100, change: +2.9, high: 2400, low: 1900 },
            { crop: "Cabbage", emoji: "🥦", unit: "per head", price: 44, change: -4.1, high: 59, low: 39 },
            { crop: "Pyrethrum", emoji: "🌸", unit: "per kg dry", price: 182, change: +2.1, high: 212, low: 162 },
          ],
          "Mombasa": [
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 2150, change: +10.5, high: 2450, low: 1850 },
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3350, change: +3.5, high: 3600, low: 3100 },
            { crop: "Onions", emoji: "🧅", unit: "50kg bag", price: 3900, change: +8.8, high: 4300, low: 3500 },
            { crop: "Fish", emoji: "🐟", unit: "per kg", price: 390, change: +7.5, high: 440, low: 340 },
            { crop: "Coconut", emoji: "🥥", unit: "per piece", price: 32, change: -1.3, high: 42, low: 27 },
            { crop: "Mango", emoji: "🥭", unit: "per kg", price: 82, change: +21.0, high: 102, low: 64 },
            { crop: "Pineapple", emoji: "🍍", unit: "per piece", price: 62, change: +5.5, high: 82, low: 52 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9100, change: -2.0, high: 9600, low: 8800 },
          ],
          "Nairobi": [
            { crop: "Maize", emoji: "🌽", unit: "90kg bag", price: 3420, change: +5.5, high: 3650, low: 3150 },
            { crop: "Tomatoes", emoji: "🍅", unit: "crate (64kg)", price: 1820, change: +13.0, high: 2220, low: 1520 },
            { crop: "Kale", emoji: "🥬", unit: "bale", price: 360, change: +4.0, high: 410, low: 310 },
            { crop: "Onions", emoji: "🧅", unit: "50kg bag", price: 3850, change: +8.3, high: 4250, low: 3450 },
            { crop: "Potatoes", emoji: "🥔", unit: "110kg bag", price: 2120, change: -1.2, high: 2420, low: 1920 },
            { crop: "Beans", emoji: "🫘", unit: "90kg bag", price: 9250, change: -2.2, high: 9850, low: 8950 },
            { crop: "Cabbage", emoji: "🥦", unit: "per head", price: 46, change: -4.3, high: 61, low: 41 },
            { crop: "Avocado", emoji: "🥑", unit: "per kg", price: 122, change: +16.0, high: 152, low: 92 },
          ],
        };

        const markets = Object.keys(STATIC_PRICES);
        const currentPrices = STATIC_PRICES[selectedMarket] || [];
        const filtered = currentPrices.filter(p => p.crop.toLowerCase().includes(priceSearch.toLowerCase()));

        const fetchAIPrices = async () => {
          setPricesLoading(true);
          try {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                system: "You are a Kenya agricultural market data expert. Return ONLY a JSON array of crop prices. No explanation, no markdown, just raw JSON.",
                messages: [{
                  role: "user",
                  content: `Give me current estimated crop prices at ${selectedMarket} market in Kenya as a JSON array. Each item must have: crop, emoji, unit, price (number in KSh), change (percentage number positive or negative), high (number), low (number). Include 8 crops common to that market.`
                }]
              })
            });
            const data = await response.json();
            const text = data.content?.[0]?.text || "[]";
            const clean = text.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(clean);
            setPricesData(parsed);
          } catch (err) {
            setPricesData(null);
          } finally {
            setPricesLoading(false);
          }
        };

        const displayPrices = pricesData
          ? pricesData.filter(p => p.crop.toLowerCase().includes(priceSearch.toLowerCase()))
          : filtered;

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

              {/* HEADER */}
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Live Market Data</div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.2, marginBottom: "0.4rem" }}>
                  Kenya Crop <span style={{ color: "var(--gold)" }}>Prices</span>
                </h1>
                <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)" }}>Updated daily from major Kenyan markets. Prices in KSh.</p>
              </div>

              {/* MARKET SELECTOR */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Select County Market</label>
                <select
                  value={selectedMarket}
                  onChange={e => { setSelectedMarket(e.target.value); setPricesData(null); }}
                  style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.25)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--green-bright)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                >
                  {markets.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              {/* SEARCH + AI REFRESH */}
              <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.2rem" }}>
                <input
                  style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}
                  placeholder="Search crop..."
                  value={priceSearch}
                  onChange={e => setPriceSearch(e.target.value)}
                />
                <button onClick={fetchAIPrices} disabled={pricesLoading} style={{ padding: "0.6rem 1rem", borderRadius: "0.6rem", border: "none", background: pricesLoading ? "rgba(76,175,80,0.1)" : "var(--green-bright)", color: pricesLoading ? "var(--green-bright)" : "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.78rem", cursor: pricesLoading ? "not-allowed" : "pointer", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                  {pricesLoading ? "..." : "🤖 AI Update"}
                </button>
              </div>

              {/* PRICES TABLE */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "1rem", overflow: "hidden", marginBottom: "1.5rem" }}>
                {/* TABLE HEADER */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 0.8fr 0.3fr", gap: "0.5rem", padding: "0.7rem 1rem", borderBottom: "1px solid rgba(76,175,80,0.1)", background: "rgba(76,175,80,0.05)" }}>
                  {["Crop", "Price (KSh)", "Change", "Range", ""].map(h => (
                    <div key={h} style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</div>
                  ))}
                </div>
                {/* TABLE ROWS */}
                {displayPrices.length > 0 ? displayPrices.map((p, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 0.8fr 0.3fr", gap: "0.5rem", padding: "0.85rem 1rem", borderBottom: i < displayPrices.length - 1 ? "1px solid rgba(76,175,80,0.06)" : "none", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.1rem" }}>{p.emoji}</span>
                      <div>
                        <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--white)" }}>{p.crop}</div>
                        <div style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.35)" }}>{p.unit}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "var(--gold)" }}>
                      {Number(p.price).toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 600, color: p.change >= 0 ? "#4caf50" : "#e57373" }}>
                      {p.change >= 0 ? "▲" : "▼"} {Math.abs(p.change)}%
                    </div>
                    <div style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.4)", lineHeight: 1.5 }}>
                      <div style={{ color: "#4caf50" }}>↑ {Number(p.high).toLocaleString()}</div>
                      <div style={{ color: "#e57373" }}>↓ {Number(p.low).toLocaleString()}</div>
                    </div>
                    <button onClick={() => {
                      const already = watchlist.find(w => w.crop === p.crop && w.market === selectedMarket);
                      if (!already) {
                        setWatchlist(prev => [...prev, { crop: p.crop, emoji: p.emoji, market: selectedMarket, alertPrice: p.price }]);
                        setNotifications(prev => [{ emoji: "👀", title: `Watching ${p.crop}`, body: `You will be alerted when ${p.crop} price changes in ${selectedMarket}.`, time: "Just now" }, ...prev]);
                        setShowNotifPanel(true); setNotifTab("alerts");
                      }
                    }} style={{ background: watchlist.find(w => w.crop === p.crop && w.market === selectedMarket) ? "rgba(76,175,80,0.2)" : "rgba(255,255,255,0.04)", border: `1px solid ${watchlist.find(w => w.crop === p.crop && w.market === selectedMarket) ? "rgba(76,175,80,0.4)" : "rgba(255,255,255,0.1)"}`, borderRadius: "0.4rem", cursor: "pointer", fontSize: "0.8rem", padding: "0.25rem 0.3rem", color: watchlist.find(w => w.crop === p.crop && w.market === selectedMarket) ? "var(--green-bright)" : "rgba(245,240,232,0.3)" }}>
                      {watchlist.find(w => w.crop === p.crop && w.market === selectedMarket) ? "🔔" : "🔕"}
                    </button>
                  </div>
                )) : (
                  <div style={{ padding: "2rem", textAlign: "center", color: "rgba(245,240,232,0.35)", fontSize: "0.85rem" }}>No crops found</div>
                )}
              </div>

              {/* NOTE */}
              <div style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.8rem", padding: "0.9rem 1rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>💡</span>
                <p style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.6 }}>
                  Prices are estimates based on recent market data. Tap <strong style={{ color: "var(--green-bright)" }}>AI Update</strong> to get the latest AI-powered price estimates for {selectedMarket} market. Always confirm with your local market before selling.
                </p>
              </div>

            </div>
          </div>
        );
      })()}
      {activeTab === "forum" && (
        <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

            {/* HEADER */}
            {!openPost && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Community</div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.2 }}>Farmer <span style={{ color: "var(--gold)" }}>Forum</span></h1>
                  </div>
                  <button onClick={() => setShowNewPost(true)} style={{ background: "var(--green-bright)", border: "none", borderRadius: "0.75rem", padding: "0.65rem 1rem", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer", flexShrink: 0 }}>+ New Post</button>
                </div>

                {/* SEARCH */}
                <input style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "1rem" }} placeholder="Search discussions..." value={forumSearch} onChange={e => setForumSearch(e.target.value)} />

                {/* CATEGORIES */}
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
                  {["All", "Tips", "Disease", "Market", "Prices", "Weather"].map(cat => (
                    <button key={cat} onClick={() => setForumCategory(cat)} style={{ padding: "0.3rem 0.75rem", borderRadius: "2rem", border: `1px solid ${forumCategory === cat ? "var(--green-bright)" : "rgba(76,175,80,0.15)"}`, background: forumCategory === cat ? "rgba(76,175,80,0.15)" : "transparent", color: forumCategory === cat ? "var(--green-bright)" : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", cursor: "pointer", transition: "all 0.2s" }}>{cat}</button>
                  ))}
                </div>

                {/* STATS ROW */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem", marginBottom: "1.2rem" }}>
                  {[
                    { num: forumPosts.length, label: "Discussions" },
                    { num: forumPosts.reduce((a, p) => a + p.replies.length, 0), label: "Replies" },
                    { num: forumPosts.reduce((a, p) => a + p.likes, 0), label: "Likes" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.8rem", padding: "0.75rem", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold)" }}>{s.num}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* NEW POST FORM */}
                {showNewPost && (
                  <div style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "1rem", padding: "1.2rem", marginBottom: "1.2rem" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "var(--white)", marginBottom: "0.9rem" }}>Start a New Discussion</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                      <select value={newPost.category} onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))} style={{ background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.5rem", padding: "0.55rem 0.8rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                        {["Tips", "Disease", "Market", "Prices", "Weather"].map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <input style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.5rem", padding: "0.55rem 0.8rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }} placeholder="Post title..." value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))} />
                      <textarea rows={3} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.5rem", padding: "0.55rem 0.8rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none" }} placeholder="Share your question or tip..." value={newPost.body} onChange={e => setNewPost(p => ({ ...p, body: e.target.value }))} />
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button onClick={() => {
                          if (newPost.title && newPost.body) {
                            setForumPosts(prev => [{ id: Date.now(), author: "You", avatar: "👤", county: "Kenya", category: newPost.category, title: newPost.title, body: newPost.body, likes: 0, replies: [], time: "Just now", solved: false }, ...prev]);
                            setNewPost({ title: "", body: "", category: "Tips" });
                            setShowNewPost(false);
                          }
                        }} style={{ flex: 2, padding: "0.6rem", borderRadius: "0.5rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Post</button>
                        <button onClick={() => setShowNewPost(false)} style={{ flex: 1, padding: "0.6rem", borderRadius: "0.5rem", border: "1px solid rgba(76,175,80,0.2)", background: "transparent", color: "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", cursor: "pointer" }}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* POSTS LIST */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {forumPosts
                    .filter(p => forumCategory === "All" || p.category === forumCategory)
                    .filter(p => !forumSearch || p.title.toLowerCase().includes(forumSearch.toLowerCase()) || p.body.toLowerCase().includes(forumSearch.toLowerCase()))
                    .map(post => (
                    <div key={post.id} onClick={() => setOpenPost(post)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "1rem", padding: "1rem 1.1rem", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontSize: "1.2rem" }}>{post.avatar}</span>
                          <div>
                            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--white)" }}>{post.author}</span>
                            <span style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.35)", marginLeft: "0.4rem" }}>· {post.county}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                          {post.solved && <span style={{ fontSize: "0.62rem", background: "rgba(76,175,80,0.2)", color: "var(--green-bright)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "1rem", padding: "0.15rem 0.5rem" }}>✓ Solved</span>}
                          <span style={{ fontSize: "0.62rem", background: "rgba(232,196,74,0.1)", color: "var(--gold)", border: "1px solid rgba(232,196,74,0.2)", borderRadius: "1rem", padding: "0.15rem 0.5rem" }}>{post.category}</span>
                        </div>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--white)", marginBottom: "0.3rem", lineHeight: 1.4 }}>{post.title}</div>
                      <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.45)", lineHeight: 1.5, marginBottom: "0.6rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{post.body}</div>
                      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <span style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.35)" }}>❤️ {post.likes}</span>
                        <span style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.35)" }}>💬 {post.replies.length} replies</span>
                        <span style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.25)", marginLeft: "auto" }}>{post.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* OPEN POST VIEW */}
            {openPost && (() => {
              const post = forumPosts.find(p => p.id === openPost.id) || openPost;
              return (
                <>
                  <button onClick={() => { setOpenPost(null); setReplyText(""); }} style={{ background: "none", border: "none", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer", marginBottom: "1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>← Back to Forum</button>

                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1rem", padding: "1.2rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ fontSize: "1.4rem" }}>{post.avatar}</span>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--white)" }}>{post.author}</div>
                          <div style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.35)" }}>{post.county} · {post.time}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: "0.65rem", background: "rgba(232,196,74,0.1)", color: "var(--gold)", border: "1px solid rgba(232,196,74,0.2)", borderRadius: "1rem", padding: "0.2rem 0.6rem" }}>{post.category}</span>
                    </div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "var(--white)", marginBottom: "0.6rem", lineHeight: 1.4 }}>{post.title}</h2>
                    <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.7, marginBottom: "0.9rem" }}>{post.body}</p>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button onClick={() => setForumPosts(prev => prev.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2rem", padding: "0.3rem 0.75rem", color: "rgba(245,240,232,0.6)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", cursor: "pointer" }}>❤️ {post.likes} Likes</button>
                      <button onClick={() => setForumPosts(prev => prev.map(p => p.id === post.id ? { ...p, solved: !p.solved } : p))} style={{ background: post.solved ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${post.solved ? "rgba(76,175,80,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: "2rem", padding: "0.3rem 0.75rem", color: post.solved ? "var(--green-bright)" : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", cursor: "pointer" }}>{post.solved ? "✓ Solved" : "Mark Solved"}</button>
                    </div>
                  </div>

                  {/* REPLIES */}
                  <div style={{ marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{post.replies.length} Replies</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                      {post.replies.map((r, i) => (
                        <div key={i} style={{ background: r.author.includes("agu.ai") ? "rgba(76,175,80,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${r.author.includes("agu.ai") ? "rgba(76,175,80,0.2)" : "rgba(76,175,80,0.07)"}`, borderRadius: "0.8rem", padding: "0.85rem 1rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                            <span style={{ fontSize: "1rem" }}>{r.avatar}</span>
                            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: r.author.includes("agu.ai") ? "var(--green-bright)" : "var(--white)" }}>{r.author}</span>
                            <span style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.3)", marginLeft: "auto" }}>{r.time}</span>
                          </div>
                          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.6 }}>{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* REPLY BOX */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.9rem", padding: "1rem" }}>
                    <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.45)", marginBottom: "0.5rem" }}>Write a reply</div>
                    <textarea rows={3} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.15)", borderRadius: "0.5rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "none", boxSizing: "border-box", marginBottom: "0.6rem" }} placeholder="Share your advice or experience..." value={replyText} onChange={e => setReplyText(e.target.value)} />
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => {
                        if (replyText.trim()) {
                          setForumPosts(prev => prev.map(p => p.id === post.id ? { ...p, replies: [...p.replies, { author: "You", avatar: "👤", text: replyText, time: "Just now" }] } : p));
                          setOpenPost(prev => ({ ...prev, replies: [...prev.replies, { author: "You", avatar: "👤", text: replyText, time: "Just now" }] }));
                          setReplyText("");
                        }
                      }} style={{ flex: 2, padding: "0.65rem", borderRadius: "0.5rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Post Reply</button>
                      <button onClick={() => {
                        setForumPosts(prev => prev.map(p => p.id === post.id ? { ...p, replies: [...p.replies, { author: "agu.ai 🤖", avatar: "🌱", text: "Analyzing your question and providing AI-powered farming advice... (Connect the AI API for live responses)", time: "Just now" }] } : p));
                        setOpenPost(prev => ({ ...prev, replies: [...prev.replies, { author: "agu.ai 🤖", avatar: "🌱", text: "Analyzing your question and providing AI-powered farming advice... (Connect the AI API for live responses)", time: "Just now" }] }));
                      }} style={{ flex: 1, padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid rgba(76,175,80,0.3)", background: "rgba(76,175,80,0.08)", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>🤖 Ask AI</button>
                    </div>
                  </div>
                </>
              );
            })()}

          </div>
        </div>
      )}
      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.2rem" }} onClick={(e) => { if (e.target === e.currentTarget) setShowAdminLogin(false); }}>
          <div style={{ background: "rgba(15,31,18,0.98)", border: "1px solid rgba(76,175,80,0.25)", borderRadius: "1.2rem", padding: "2rem 1.5rem", width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>

            {!isLoggedIn ? (
              <>
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔐</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--white)", marginBottom: "0.3rem" }}>Admin Login</h2>
                  <p style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.4)" }}>agu.ai by Agunextech</p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                  <div>
                    <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Email Address</label>
                    <input
                      type="email"
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${loginError ? "rgba(229,57,53,0.4)" : "rgba(76,175,80,0.2)"}`, borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                      placeholder="admin@agu.ai"
                      value={loginForm.email}
                      onChange={e => { setLoginForm(f => ({ ...f, email: e.target.value })); setLoginError(""); }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Password</label>
                    <input
                      type="password"
                      style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: `1px solid ${loginError ? "rgba(229,57,53,0.4)" : "rgba(76,175,80,0.2)"}`, borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                      placeholder="Enter password"
                      value={loginForm.password}
                      onChange={e => { setLoginForm(f => ({ ...f, password: e.target.value })); setLoginError(""); }}
                      onKeyDown={e => e.key === "Enter" && handleLogin()}
                    />
                  </div>

                  {loginError && (
                    <div style={{ background: "rgba(229,57,53,0.1)", border: "1px solid rgba(229,57,53,0.3)", borderRadius: "0.5rem", padding: "0.6rem 0.8rem", fontSize: "0.78rem", color: "#e57373", display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <span>⚠️</span> {loginError}
                    </div>
                  )}

                  <button
                    onClick={handleLogin}
                    disabled={loginLoading}
                    style={{ width: "100%", padding: "0.8rem", borderRadius: "0.75rem", border: "none", background: loginLoading ? "rgba(76,175,80,0.3)" : "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: loginLoading ? "not-allowed" : "pointer", transition: "all 0.2s", marginTop: "0.2rem" }}
                  >
                    {loginLoading ? "Signing in..." : "Sign In"}
                  </button>

                  <div style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(245,240,232,0.3)", marginTop: "0.25rem" }}>
                    Demo credentials: admin@agu.ai / agunextech2024
                  </div>
                </div>

                <button onClick={() => setShowAdminLogin(false)} style={{ position: "absolute", top: "1rem", right: "1rem", background: "none", border: "none", color: "rgba(245,240,232,0.4)", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>✅</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: "0.4rem" }}>Welcome back, Admin!</h2>
                <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginBottom: "1.2rem" }}>You are now logged into agu.ai admin panel.</p>
                <button onClick={() => { setShowAdminLogin(false); setActiveTab("dashboard"); }} style={{ width: "100%", padding: "0.8rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", marginBottom: "0.6rem" }}>Go to Dashboard</button>
                <button onClick={() => setShowAdminLogin(false)} style={{ width: "100%", padding: "0.8rem", borderRadius: "0.75rem", border: "1px solid rgba(76,175,80,0.2)", background: "transparent", color: "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", cursor: "pointer" }}>Stay on this page</button>
              </div>
            )}
          </div>
        </div>
      )}
      {activeTab === "diseases" && (() => {
        const DISEASES = [
          {
            id: 1, crop: "Maize", emoji: "🌽", name: "Northern Corn Leaf Blight (NCLB)",
            severity: "High", cause: "Fungal (Exserohilum turcicum)",
            symptoms: ["Long, cigar-shaped grey-green to tan lesions on leaves", "Lesions measure 2.5 to 15cm in length", "Lesions start on lower leaves and move upward", "Infected leaves may die prematurely"],
            treatment: ["Apply fungicide: Mancozeb 80WP at 2.5kg per hectare", "Use resistant maize varieties like H614D or DK8031", "Remove and destroy infected crop residue after harvest", "Practice crop rotation with non-host crops like beans"],
            prevention: ["Plant certified disease-resistant seeds", "Avoid planting in waterlogged areas", "Apply balanced fertilizer to strengthen plant immunity", "Monitor fields regularly especially after rains"],
            season: "Long rains (March to June)", counties: ["Nakuru", "Trans Nzoia", "Uasin Gishu", "Kakamega"]
          },
          {
            id: 2, crop: "Maize", emoji: "🌽", name: "Maize Lethal Necrosis (MLN)",
            severity: "Critical", cause: "Viral (MCMV + SCMV)",
            symptoms: ["Yellowing of leaves starting from the edges", "Premature drying of tassels and leaves", "Stunted plant growth", "Poor cob formation or no cobs at all"],
            treatment: ["No cure exists. Remove and burn infected plants immediately", "Control thrips and aphids which spread the virus using Dimethoate", "Apply systemic insecticides at planting to protect seedlings", "Do not use seeds from infected crops"],
            prevention: ["Use MLN-tolerant varieties from CIMMYT or KEPHIS certified sources", "Control insect vectors with seed treatment", "Avoid maize on maize cultivation", "Plant early to escape peak vector population"],
            season: "Year round but worse in dry conditions", counties: ["Rift Valley", "Central", "Western", "Nyanza"]
          },
          {
            id: 3, crop: "Tomatoes", emoji: "🍅", name: "Tomato Late Blight",
            severity: "High", cause: "Oomycete (Phytophthora infestans)",
            symptoms: ["Water-soaked pale green to brown lesions on leaves", "White fuzzy growth on underside of leaves in humid weather", "Dark brown lesions on stems", "Fruits show firm brown rot"],
            treatment: ["Spray with Ridomil Gold MZ 68WG at 2.5kg per hectare", "Apply Copper Oxychloride 50WP as preventive spray", "Remove and destroy all infected plant material", "Avoid overhead irrigation"],
            prevention: ["Plant resistant varieties such as Rio Grande", "Space plants properly for air circulation", "Avoid wetting foliage when watering", "Rotate tomatoes with non-solanaceous crops for 3 years"],
            season: "Cool and wet seasons (July to September)", counties: ["Kiambu", "Nyandarua", "Meru", "Kirinyaga"]
          },
          {
            id: 4, crop: "Tomatoes", emoji: "🍅", name: "Tomato Bacterial Wilt",
            severity: "Critical", cause: "Bacterial (Ralstonia solanacearum)",
            symptoms: ["Sudden wilting of entire plant in hot weather", "Leaves remain green initially when wilted", "Brown discolouration inside stem when cut", "Milky bacterial ooze from cut stem in water"],
            treatment: ["No effective chemical cure. Remove and burn infected plants immediately", "Drench soil with Copper Oxychloride solution", "Do not replant tomatoes in same bed for at least 3 seasons", "Disinfect all farm tools with bleach solution"],
            prevention: ["Use grafted tomato plants on resistant rootstocks", "Avoid waterlogged soils", "Do not bring soil from infected areas", "Use certified disease-free seedlings only"],
            season: "Hot and humid conditions year round", counties: ["Mombasa", "Kilifi", "Kwale", "Taita Taveta"]
          },
          {
            id: 5, crop: "Beans", emoji: "🫘", name: "Bean Rust",
            severity: "Medium", cause: "Fungal (Uromyces appendiculatus)",
            symptoms: ["Small reddish-brown powdery pustules on leaves and pods", "Yellow halo around rust pustules", "Severe infection causes early leaf drop", "Pods may have rust pustules reducing quality"],
            treatment: ["Spray with Mancozeb 80WP or Chlorothalonil at first sign of disease", "Apply sulfur-based fungicide every 7 to 10 days", "Remove heavily infected leaves and destroy them", "Avoid working in the field when plants are wet"],
            prevention: ["Plant rust-resistant bean varieties like Lyamungu 85", "Avoid dense planting to improve air circulation", "Rotate beans with cereals or other non-legume crops", "Plant early to avoid peak rust season"],
            season: "Cool and humid conditions (April to June)", counties: ["Nakuru", "Nyeri", "Murang'a", "Kisii"]
          },
          {
            id: 6, crop: "Beans", emoji: "🫘", name: "Bean Angular Leaf Spot",
            severity: "Medium", cause: "Fungal (Phaeoisariopsis griseola)",
            symptoms: ["Angular brown lesions limited by leaf veins", "Grey powdery mass visible on underside of lesions", "Lesions on pods are circular to elongated dark brown", "Severe infection causes defoliation"],
            treatment: ["Apply Mancozeb 80WP at 2kg per hectare every 10 days", "Use Copper Oxychloride spray as alternative", "Remove infected debris after harvest", "Avoid working in wet fields"],
            prevention: ["Use certified resistant varieties like KK8", "Treat seeds with Thiram before planting", "Ensure proper field drainage", "Practice 2 to 3 year crop rotation"],
            season: "During rains especially long rains", counties: ["Western Kenya", "Central", "Eastern"]
          },
          {
            id: 7, crop: "Potatoes", emoji: "🥔", name: "Potato Late Blight",
            severity: "Critical", cause: "Oomycete (Phytophthora infestans)",
            symptoms: ["Dark water-soaked lesions on leaves and stems", "White mold on underside of leaves in humid weather", "Brown rotting tubers with reddish brown discolouration inside", "Entire field can collapse within 2 weeks if untreated"],
            treatment: ["Spray with Ridomil Gold MZ 68WG every 7 days during wet season", "Apply Copper Oxychloride 50WP as preventive measure", "Harvest early if blight pressure is very high", "Do not store infected tubers with healthy ones"],
            prevention: ["Use certified blight-resistant varieties like Shangi or Dutch Robjin", "Earth up potato ridges to protect tubers", "Avoid planting in poorly drained soils", "Destroy all infected plant material after harvest"],
            season: "Cool and wet weather (July to September)", counties: ["Nyandarua", "Nyeri", "Nakuru", "Meru", "Elgeyo Marakwet"]
          },
          {
            id: 8, crop: "Potatoes", emoji: "🥔", name: "Bacterial Soft Rot",
            severity: "High", cause: "Bacterial (Pectobacterium carotovorum)",
            symptoms: ["Soft water-soaked lesions on tubers", "Foul smell from infected tubers", "Rotting starts at wounds or lenticels", "Entire tuber can rot into a slimy mass"],
            treatment: ["Remove and destroy all rotting tubers immediately", "Improve field drainage to reduce waterlogging", "Apply lime to soil to raise pH above 6.0", "Store harvested potatoes in cool dry ventilated stores"],
            prevention: ["Use certified seed potatoes only", "Avoid harvesting in wet conditions", "Cure harvested potatoes at 15 to 20 degrees for 2 weeks", "Do not plant in fields with history of soft rot"],
            season: "Wet conditions especially in waterlogged soils", counties: ["Nyandarua", "Nakuru", "Kisii", "Trans Nzoia"]
          },
          {
            id: 9, crop: "Tea", emoji: "🍵", name: "Tea Blister Blight",
            severity: "High", cause: "Fungal (Exobasidium vexans)",
            symptoms: ["Pale yellow translucent spots on young leaves", "Spots become white blisters on underside of leaf", "Infected leaves curl and distort", "Severe infection reduces yield significantly"],
            treatment: ["Spray with Copper Oxychloride 50WP every 7 to 10 days", "Apply Chlorothalonil fungicide in severe cases", "Pluck infected shoots promptly during harvesting", "Improve drainage around tea bushes"],
            prevention: ["Plant in well-drained soils with good air circulation", "Avoid over-fertilizing with nitrogen", "Prune tea bushes regularly to open up canopy", "Monitor new growth closely during rainy season"],
            season: "Cool wet conditions during long and short rains", counties: ["Nyeri", "Kirinyaga", "Kericho", "Nandi", "Bomet"]
          },
          {
            id: 10, crop: "Coffee", emoji: "☕", name: "Coffee Berry Disease (CBD)",
            severity: "Critical", cause: "Fungal (Colletotrichum kahawae)",
            symptoms: ["Dark sunken lesions on green berries", "Berries turn black and mummify on the tree", "Premature berry drop", "Brown lesions on stems of young shoots"],
            treatment: ["Spray with Copper Oxychloride 50WP starting at pin-head stage", "Apply Antracol (Propineb) for better systemic control", "Maintain spray program every 21 days during berry development", "Remove all mummified berries from trees and ground"],
            prevention: ["Plant CBD-resistant varieties like Ruiru 11 or Batian", "Strip harvest all berries including infected ones", "Maintain good field hygiene and remove dead wood", "Apply balanced fertilizer to maintain plant vigour"],
            season: "During berry development coinciding with rains", counties: ["Nyeri", "Kirinyaga", "Murang'a", "Embu", "Meru"]
          },
          {
            id: 11, crop: "Bananas", emoji: "🍌", name: "Banana Fusarium Wilt (Panama Disease)",
            severity: "Critical", cause: "Fungal (Fusarium oxysporum f.sp. cubense)",
            symptoms: ["Yellowing of older leaves starting from leaf margins", "Leaves collapse and hang around the pseudostem", "Brown discolouration inside pseudostem when cut", "Plant dies before fruiting or produces poor bunch"],
            treatment: ["No chemical cure available. Remove and destroy infected plants with roots", "Drench soil with 2% formalin solution before replanting", "Do not replant susceptible bananas for at least 6 months", "Use systemic fungicide drenches as suppressive measure only"],
            prevention: ["Plant certified tissue culture banana plantlets", "Avoid introducing soil from infected farms", "Use resistant varieties like FHIA-17 or Nakyetenyi", "Disinfect farm tools with bleach between plants"],
            season: "Year round but worse in wet and warm conditions", counties: ["Meru", "Embu", "Kisii", "Murang'a", "Tharaka Nithi"]
          },
          {
            id: 12, crop: "Sugarcane", emoji: "🎋", name: "Sugarcane Smut",
            severity: "High", cause: "Fungal (Sporisorium scitamineum)",
            symptoms: ["Long black whip-like structure emerges from shoot apex", "Infected plants are stunted with thin grass-like shoots", "Tillers die prematurely", "Severely infected fields show poor stand establishment"],
            treatment: ["Remove and burn smutted shoots immediately when spotted", "Hot water treat seed cane at 50 degrees for 2 hours before planting", "Apply systemic fungicide Propiconazole as bud treatment", "Rogue out infected stools completely including ratoon"],
            prevention: ["Plant smut-resistant varieties like N14 or KEN 83-737", "Use certified disease-free planting material", "Avoid ratooning heavily infected fields", "Inspect new planting material before introducing to farm"],
            season: "Year round especially in hot dry conditions", counties: ["Kakamega", "Bungoma", "Migori", "Kisumu", "Siaya"]
          },
        ];

        const crops = ["All", ...new Set(DISEASES.map(d => d.crop))];
        const filtered = DISEASES.filter(d =>
          (selectedCrop === "All" || d.crop === selectedCrop) &&
          (!diseaseSearch || d.name.toLowerCase().includes(diseaseSearch.toLowerCase()) || d.crop.toLowerCase().includes(diseaseSearch.toLowerCase()))
        );

        const severityColor = { "Critical": "#e53935", "High": "#e8c44a", "Medium": "#4caf50" };
        const severityBg = { "Critical": "rgba(229,57,53,0.1)", "High": "rgba(232,196,74,0.1)", "Medium": "rgba(76,175,80,0.1)" };

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

              {!openDisease ? (
                <>
                  {/* HEADER */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Knowledge Base</div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.2, marginBottom: "0.4rem" }}>Crop Disease <span style={{ color: "var(--gold)" }}>Encyclopedia</span></h1>
                    <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)" }}>Identify, treat and prevent common crop diseases in Kenya.</p>
                  </div>

                  {/* SEARCH */}
                  <input style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "1rem" }} placeholder="Search diseases or crops..." value={diseaseSearch} onChange={e => setDiseaseSearch(e.target.value)} />

                  {/* CROP FILTER */}
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
                    {crops.map(c => (
                      <button key={c} onClick={() => setSelectedCrop(c)} style={{ padding: "0.3rem 0.75rem", borderRadius: "2rem", border: `1px solid ${selectedCrop === c ? "var(--green-bright)" : "rgba(76,175,80,0.15)"}`, background: selectedCrop === c ? "rgba(76,175,80,0.15)" : "transparent", color: selectedCrop === c ? "var(--green-bright)" : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", cursor: "pointer", transition: "all 0.2s" }}>{c}</button>
                    ))}
                  </div>

                  {/* STATS */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem", marginBottom: "1.2rem" }}>
                    {[
                      { num: DISEASES.length, label: "Diseases Listed" },
                      { num: new Set(DISEASES.map(d => d.crop)).size, label: "Crops Covered" },
                      { num: DISEASES.filter(d => d.severity === "Critical").length, label: "Critical Alerts" },
                    ].map((s, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.8rem", padding: "0.75rem", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold)" }}>{s.num}</div>
                        <div style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* DISEASE CARDS */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {filtered.map(disease => (
                      <div key={disease.id} onClick={() => setOpenDisease(disease)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "1rem", padding: "1rem 1.1rem", cursor: "pointer", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                            <span style={{ fontSize: "1.4rem" }}>{disease.emoji}</span>
                            <div>
                              <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.4)", marginBottom: "0.1rem" }}>{disease.crop}</div>
                              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--white)", lineHeight: 1.3 }}>{disease.name}</div>
                            </div>
                          </div>
                          <span style={{ fontSize: "0.65rem", padding: "0.2rem 0.6rem", borderRadius: "1rem", background: severityBg[disease.severity], color: severityColor[disease.severity], border: `1px solid ${severityColor[disease.severity]}33`, whiteSpace: "nowrap", flexShrink: 0 }}>{disease.severity}</span>
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", marginBottom: "0.4rem" }}>Cause: {disease.cause}</div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.35)", display: "flex", gap: "1rem" }}>
                          <span>🗓️ {disease.season.split("(")[0].trim()}</span>
                          <span>📍 {disease.counties.slice(0, 2).join(", ")}{disease.counties.length > 2 ? ` +${disease.counties.length - 2}` : ""}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => setOpenDisease(null)} style={{ background: "none", border: "none", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer", marginBottom: "1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>← Back to Encyclopedia</button>

                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "1.2rem", padding: "1.3rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <span style={{ fontSize: "2rem" }}>{openDisease.emoji}</span>
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.4)" }}>{openDisease.crop}</div>
                          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "var(--white)", lineHeight: 1.3 }}>{openDisease.name}</h2>
                        </div>
                      </div>
                      <span style={{ fontSize: "0.68rem", padding: "0.25rem 0.7rem", borderRadius: "1rem", background: severityBg[openDisease.severity], color: severityColor[openDisease.severity], border: `1px solid ${severityColor[openDisease.severity]}33`, whiteSpace: "nowrap" }}>{openDisease.severity}</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "0.75rem" }}>
                      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem" }}>
                        <div style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>Cause</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--cream)" }}>{openDisease.cause}</div>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem" }}>
                        <div style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>Peak Season</div>
                        <div style={{ fontSize: "0.78rem", color: "var(--cream)" }}>{openDisease.season}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.35)" }}>📍 Common in: {openDisease.counties.join(", ")}</div>
                  </div>

                  {[
                    { title: "⚠️ Symptoms", items: openDisease.symptoms, color: "#e8c44a" },
                    { title: "💊 Treatment", items: openDisease.treatment, color: "#4caf50" },
                    { title: "🛡️ Prevention", items: openDisease.prevention, color: "#42a5f5" },
                  ].map((section, si) => (
                    <div key={si} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "1rem", padding: "1rem 1.1rem", marginBottom: "0.75rem" }}>
                      <div style={{ fontSize: "0.8rem", fontWeight: 700, color: section.color, marginBottom: "0.75rem" }}>{section.title}</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {section.items.map((item, i) => (
                          <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                            <div style={{ width: 6, height: 6, borderRadius: "50%", background: section.color, flexShrink: 0, marginTop: 5 }} />
                            <span style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.6 }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button onClick={() => { setActiveTab("home"); setTimeout(() => document.querySelector(".chat-input")?.focus(), 300); }} style={{ width: "100%", padding: "0.85rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
                    🌱 Ask agu.ai about {openDisease.name}
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })()}
      {/* ===== WEATHER PAGE ===== */}
      {activeTab === "weather" && (() => {
        const WEATHER_DATA = {
          "Nairobi": { temp: 22, feels: 20, humidity: 68, wind: 12, condition: "Partly Cloudy", icon: "⛅", rain: 30, forecast: [{ day: "Today", icon: "⛅", high: 24, low: 14, rain: 30 }, { day: "Tue", icon: "🌧️", high: 19, low: 13, rain: 85 }, { day: "Wed", icon: "🌦️", high: 21, low: 14, rain: 60 }, { day: "Thu", icon: "☀️", high: 26, low: 15, rain: 10 }, { day: "Fri", icon: "☀️", high: 27, low: 16, rain: 5 }, { day: "Sat", icon: "⛅", high: 25, low: 15, rain: 20 }, { day: "Sun", icon: "🌧️", high: 20, low: 13, rain: 75 }], advice: ["Light rains expected Tuesday and Wednesday. Good time to transplant seedlings.", "Hold off on pesticide application Tuesday to Thursday due to expected rains.", "Thursday to Saturday ideal for harvesting maize if ready.", "Prepare drainage channels before Tuesday rains."] },
          "Nakuru": { temp: 18, feels: 16, humidity: 72, wind: 8, condition: "Cloudy", icon: "☁️", rain: 55, forecast: [{ day: "Today", icon: "☁️", high: 20, low: 10, rain: 55 }, { day: "Tue", icon: "🌧️", high: 17, low: 9, rain: 90 }, { day: "Wed", icon: "🌧️", high: 16, low: 9, rain: 88 }, { day: "Thu", icon: "🌦️", high: 19, low: 10, rain: 45 }, { day: "Fri", icon: "⛅", high: 21, low: 11, rain: 25 }, { day: "Sat", icon: "☀️", high: 23, low: 12, rain: 10 }, { day: "Sun", icon: "⛅", high: 22, low: 11, rain: 20 }], advice: ["Heavy rains Tuesday and Wednesday. Avoid spraying fungicides.", "Good planting window opens Friday through Sunday.", "Monitor potato fields for late blight due to high humidity.", "Maize prices may drop after rains. Consider storage."] },
          "Kisumu": { temp: 27, feels: 29, humidity: 78, wind: 15, condition: "Humid and Warm", icon: "🌤️", rain: 40, forecast: [{ day: "Today", icon: "🌤️", high: 30, low: 18, rain: 40 }, { day: "Tue", icon: "⛅", high: 28, low: 17, rain: 50 }, { day: "Wed", icon: "🌦️", high: 25, low: 16, rain: 70 }, { day: "Thu", icon: "🌧️", high: 23, low: 16, rain: 85 }, { day: "Fri", icon: "🌦️", high: 26, low: 17, rain: 55 }, { day: "Sat", icon: "⛅", high: 29, low: 18, rain: 30 }, { day: "Sun", icon: "☀️", high: 31, low: 19, rain: 15 }], advice: ["High humidity increases disease risk in tomatoes and beans.", "Thursday heavy rains. Secure any harvested produce.", "Weekend dry spell ideal for sorghum and millet harvesting.", "Lake Victoria winds may increase Friday afternoon."] },
          "Mombasa": { temp: 30, feels: 34, humidity: 82, wind: 18, condition: "Hot and Humid", icon: "☀️", rain: 15, forecast: [{ day: "Today", icon: "☀️", high: 32, low: 22, rain: 15 }, { day: "Tue", icon: "☀️", high: 33, low: 23, rain: 10 }, { day: "Wed", icon: "⛅", high: 31, low: 22, rain: 20 }, { day: "Thu", icon: "⛅", high: 30, low: 21, rain: 25 }, { day: "Fri", icon: "🌦️", high: 28, low: 20, rain: 45 }, { day: "Sat", icon: "🌧️", high: 26, low: 20, rain: 70 }, { day: "Sun", icon: "🌧️", high: 25, low: 19, rain: 75 }], advice: ["Dry conditions ideal for coconut harvesting this week.", "Irrigate vegetable crops daily in current heat.", "Rain expected from Friday. Good time to plant coastal crops.", "High humidity increases post-harvest losses. Store produce carefully."] },
          "Eldoret": { temp: 16, feels: 14, humidity: 65, wind: 10, condition: "Cool and Clear", icon: "☀️", rain: 10, forecast: [{ day: "Today", icon: "☀️", high: 22, low: 8, rain: 10 }, { day: "Tue", icon: "⛅", high: 20, low: 7, rain: 25 }, { day: "Wed", icon: "⛅", high: 19, low: 7, rain: 30 }, { day: "Thu", icon: "🌦️", high: 18, low: 8, rain: 50 }, { day: "Fri", icon: "☁️", high: 17, low: 8, rain: 60 }, { day: "Sat", icon: "🌧️", high: 16, low: 7, rain: 80 }, { day: "Sun", icon: "🌦️", high: 18, low: 8, rain: 55 }], advice: ["Excellent wheat drying conditions today and tomorrow.", "Apply pre-emergent herbicides before Thursday rains.", "Weekend rains beneficial for potatoes in establishment stage.", "Cold nights may slow maize growth. Monitor closely."] },
          "Kisii": { temp: 20, feels: 18, humidity: 75, wind: 9, condition: "Misty", icon: "🌫️", rain: 65, forecast: [{ day: "Today", icon: "🌫️", high: 22, low: 12, rain: 65 }, { day: "Tue", icon: "🌧️", high: 19, low: 11, rain: 88 }, { day: "Wed", icon: "🌧️", high: 18, low: 11, rain: 82 }, { day: "Thu", icon: "🌦️", high: 21, low: 12, rain: 50 }, { day: "Fri", icon: "⛅", high: 23, low: 13, rain: 30 }, { day: "Sat", icon: "☀️", high: 25, low: 14, rain: 12 }, { day: "Sun", icon: "⛅", high: 24, low: 13, rain: 22 }], advice: ["Very high rainfall risk Tuesday and Wednesday. Avoid field operations.", "Tea plucking ideal Friday through Sunday in drier conditions.", "Monitor bananas for Fusarium in high humidity.", "Drainage maintenance critical before Tuesday heavy rains."] },
        };

        const counties47 = ["Baringo","Bomet","Bungoma","Busia","Elgeyo Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];

        const weather = WEATHER_DATA[weatherCounty] || WEATHER_DATA["Nairobi"];

        const fetchAIWeather = async () => {
          setWeatherLoading(true);
          try {
            const res = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 600,
                system: "You are a Kenya agricultural weather expert. Give practical farming advice based on county weather. Return JSON only with keys: condition, temp, humidity, advice (array of 4 strings), alert (string or null).",
                messages: [{ role: "user", content: `Give current weather conditions and farming advice for ${weatherCounty} County, Kenya. JSON only.` }]
              })
            });
            const data = await res.json();
            const text = data.content?.[0]?.text || "{}";
            const clean = text.replace(/```json|```/g, "").trim();
            setWeatherAI(JSON.parse(clean));
          } catch { setWeatherAI(null); }
          finally { setWeatherLoading(false); }
        };

        const advice = weatherAI?.advice || weather.advice;

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>
              <div style={{ marginBottom: "1.2rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Kenya Weather</div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>Weather <span style={{ color: "var(--gold)" }}>Alerts</span></h1>
              </div>

              {/* COUNTY SELECTOR */}
              <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.2rem" }}>
                <select value={weatherCounty} onChange={e => { setWeatherCounty(e.target.value); setWeatherAI(null); }} style={{ flex: 1, background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.25)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--green-bright)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                  {counties47.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={fetchAIWeather} disabled={weatherLoading} style={{ padding: "0.6rem 1rem", borderRadius: "0.6rem", border: "none", background: weatherLoading ? "rgba(76,175,80,0.1)" : "var(--green-bright)", color: weatherLoading ? "var(--green-bright)" : "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.78rem", cursor: "pointer", whiteSpace: "nowrap" }}>
                  {weatherLoading ? "..." : "🤖 AI Update"}
                </button>
              </div>

              {/* MAIN WEATHER CARD */}
              <div style={{ background: "linear-gradient(135deg, rgba(44,106,53,0.3), rgba(15,31,18,0.8))", border: "1px solid rgba(76,175,80,0.25)", borderRadius: "1.2rem", padding: "1.5rem", marginBottom: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.5)", marginBottom: "0.2rem" }}>📍 {weatherCounty} County</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3rem", fontWeight: 900, color: "var(--white)", lineHeight: 1 }}>{weatherAI?.temp || weather.temp}°C</div>
                    <div style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.6)", marginTop: "0.3rem" }}>{weatherAI?.condition || weather.condition}</div>
                  </div>
                  <div style={{ fontSize: "4rem" }}>{weather.icon}</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" }}>
                  {[
                    { label: "Humidity", value: `${weatherAI?.humidity || weather.humidity}%`, icon: "💧" },
                    { label: "Wind", value: `${weather.wind} km/h`, icon: "💨" },
                    { label: "Rain Chance", value: `${weather.rain}%`, icon: "🌧️" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "0.7rem", padding: "0.6rem", textAlign: "center" }}>
                      <div style={{ fontSize: "1rem", marginBottom: "0.2rem" }}>{s.icon}</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--white)" }}>{s.value}</div>
                      <div style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.4)" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7 DAY FORECAST */}
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "1rem", padding: "1rem", marginBottom: "1rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>7-Day Forecast</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.3rem" }}>
                  {weather.forecast.map((f, i) => (
                    <div key={i} style={{ textAlign: "center", padding: "0.5rem 0.2rem", background: i === 0 ? "rgba(76,175,80,0.1)" : "transparent", borderRadius: "0.6rem", border: i === 0 ? "1px solid rgba(76,175,80,0.2)" : "1px solid transparent" }}>
                      <div style={{ fontSize: "0.6rem", color: i === 0 ? "var(--green-bright)" : "rgba(245,240,232,0.4)", marginBottom: "0.3rem", fontWeight: i === 0 ? 700 : 400 }}>{f.day}</div>
                      <div style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>{f.icon}</div>
                      <div style={{ fontSize: "0.68rem", color: "var(--white)", fontWeight: 600 }}>{f.high}°</div>
                      <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.35)" }}>{f.low}°</div>
                      <div style={{ fontSize: "0.58rem", color: f.rain > 60 ? "#e57373" : "rgba(245,240,232,0.3)", marginTop: "0.2rem" }}>{f.rain}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FARMING ADVICE */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "1rem", padding: "1rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>🌾 Farming Advice for {weatherCounty}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {advice.map((tip, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", borderRadius: "0.6rem", padding: "0.7rem 0.8rem" }}>
                      <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>{["🌱","💊","☀️","💧"][i]}</span>
                      <span style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.6 }}>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ===== FARMER PROFILE PAGE ===== */}
      {activeTab === "profile" && (
        <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

            {/* PROFILE HEADER */}
            <div style={{ background: "linear-gradient(135deg, rgba(44,106,53,0.3), rgba(15,31,18,0.8))", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "1.2rem", padding: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(76,175,80,0.2)", border: "2px solid rgba(76,175,80,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 0.75rem" }}>👨🏾‍🌾</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "var(--white)", marginBottom: "0.2rem" }}>{profileData.name}</h2>
              <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.45)", marginBottom: "0.75rem" }}>📍 {profileData.county} · Joined {profileData.joined}</div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.25)", borderRadius: "2rem", padding: "0.3rem 0.9rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--green-bright)", fontWeight: 600 }}>🌱 {profileData.plan}</span>
              </div>
            </div>

            {/* STATS */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem", marginBottom: "1rem" }}>
              {[
                { num: profileData.messages, label: "AI Messages", icon: "💬" },
                { num: profileData.alerts, label: "Price Alerts", icon: "🔔" },
                { num: profileData.forumPosts, label: "Forum Posts", icon: "📝" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.9rem", padding: "0.9rem 0.5rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.2rem", marginBottom: "0.3rem" }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--gold)" }}>{s.num}</div>
                  <div style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.4)" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* PROFILE TABS */}
            <div style={{ display: "flex", borderBottom: "1px solid rgba(76,175,80,0.1)", marginBottom: "1rem" }}>
              {["overview", "crops", "settings"].map(tab => (
                <button key={tab} onClick={() => setProfileTab(tab)} style={{ flex: 1, padding: "0.65rem", background: "none", border: "none", borderBottom: `2px solid ${profileTab === tab ? "var(--green-bright)" : "transparent"}`, color: profileTab === tab ? "var(--green-bright)" : "rgba(245,240,232,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", fontWeight: 500, cursor: "pointer", textTransform: "capitalize", transition: "all 0.2s" }}>{tab}</button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {profileTab === "overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {[
                  { label: "Full Name", value: profileData.name, icon: "👤" },
                  { label: "WhatsApp", value: profileData.phone, icon: "📱" },
                  { label: "County", value: profileData.county, icon: "📍" },
                  { label: "Language", value: profileData.language, icon: "🌐" },
                  { label: "Plan", value: profileData.plan, icon: "🌱" },
                  { label: "Member Since", value: profileData.joined, icon: "📅" },
                ].map((item, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "0.8rem", padding: "0.8rem 1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{item.label}</div>
                      <div style={{ fontSize: "0.88rem", color: "var(--white)", fontWeight: 500 }}>{item.value}</div>
                    </div>
                  </div>
                ))}
                <button onClick={() => setProfileTab("settings")} style={{ marginTop: "0.4rem", width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid rgba(76,175,80,0.2)", background: "transparent", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", fontWeight: 500, cursor: "pointer" }}>✏️ Edit Profile</button>
              </div>
            )}

            {/* CROPS TAB */}
            {profileTab === "crops" && (
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Your Crops</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem", marginBottom: "1rem" }}>
                  {profileData.crops.map((crop, i) => {
                    const emojiMap = { Maize: "🌽", Beans: "🫘", Potatoes: "🥔", Tomatoes: "🍅", Tea: "🍵", Coffee: "☕", Bananas: "🍌", Kale: "🥬", Wheat: "🌾", Sugarcane: "🎋" };
                    return (
                      <div key={i} style={{ background: "rgba(76,175,80,0.07)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.8rem", padding: "0.9rem", display: "flex", alignItems: "center", gap: "0.6rem", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <span style={{ fontSize: "1.3rem" }}>{emojiMap[crop] || "🌿"}</span>
                          <span style={{ fontSize: "0.85rem", color: "var(--white)", fontWeight: 500 }}>{crop}</span>
                        </div>
                        <button onClick={() => setProfileData(p => ({ ...p, crops: p.crops.filter(c => c !== crop) }))} style={{ background: "none", border: "none", color: "rgba(245,240,232,0.3)", cursor: "pointer", fontSize: "0.75rem" }}>✕</button>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setActiveTab("register")} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid rgba(76,175,80,0.2)", background: "rgba(76,175,80,0.05)", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer" }}>+ Update Crops</button>
              </div>
            )}

            {/* SETTINGS TAB */}
            {profileTab === "settings" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.2rem" }}>Edit Profile</div>
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Your full name" },
                  { label: "WhatsApp Number", key: "phone", type: "tel", placeholder: "+254 700 000 000" },
                ].map((field, i) => (
                  <div key={i}>
                    <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>{field.label}</label>
                    <input type={field.type} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} value={profileData[field.key]} onChange={e => setProfileData(p => ({ ...p, [field.key]: e.target.value }))} placeholder={field.placeholder} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>County</label>
                  <select value={profileData.county} onChange={e => setProfileData(p => ({ ...p, county: e.target.value }))} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}>
                    {["Baringo","Bomet","Bungoma","Busia","Elgeyo Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Language</label>
                  <div style={{ display: "flex", gap: "0.6rem" }}>
                    {["English", "Swahili"].map(l => (
                      <button key={l} onClick={() => setProfileData(p => ({ ...p, language: l }))} style={{ flex: 1, padding: "0.65rem", borderRadius: "0.6rem", border: `1px solid ${profileData.language === l ? "var(--green-bright)" : "rgba(76,175,80,0.2)"}`, background: profileData.language === l ? "rgba(76,175,80,0.15)" : "transparent", color: profileData.language === l ? "var(--green-bright)" : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer" }}>{l}</button>
                    ))}
                  </div>
                </div>
                <button onClick={() => { setProfileTab("overview"); }} style={{ width: "100%", padding: "0.8rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", marginTop: "0.3rem" }}>Save Changes</button>
                <button onClick={() => { setIsLoggedIn(false); setActiveTab("home"); }} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid rgba(229,57,53,0.3)", background: "rgba(229,57,53,0.08)", color: "#e57373", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer" }}>🔓 Sign Out</button>
              </div>
            )}

          </div>
        </div>
      )}
      {/* ===== AGRO-VET LOCATOR ===== */}
      {activeTab === "agrovets" && (() => {
        const AGROVETS = {
          "Nairobi": [
            { name: "Farmers Choice Agro", category: "Agro-vet", address: "Tom Mboya St, Nairobi CBD", phone: "+254 720 111 001", rating: 4.8, open: true, products: ["Seeds", "Fertilizers", "Pesticides", "Animal feeds"], hours: "Mon-Sat 7:30am-6pm" },
            { name: "Kenya Farmers Association", category: "Inputs", address: "Waiyaki Way, Westlands", phone: "+254 722 222 002", rating: 4.6, open: true, products: ["Certified seeds", "Fertilizers", "Farm tools"], hours: "Mon-Fri 8am-5pm" },
            { name: "Simlaw Seeds Nairobi", category: "Seeds", address: "Enterprise Rd, Industrial Area", phone: "+254 733 333 003", rating: 4.9, open: false, products: ["Vegetable seeds", "Maize seeds", "Bean seeds", "Tree seedlings"], hours: "Mon-Sat 8am-5:30pm" },
            { name: "MEA Fertilizers Ltd", category: "Fertilizers", address: "Lusaka Rd, Industrial Area", phone: "+254 711 444 004", rating: 4.5, open: true, products: ["CAN", "DAP", "NPK", "Urea", "Foliar feeds"], hours: "Mon-Fri 8am-5pm" },
            { name: "Proton Agrochemicals", category: "Pesticides", address: "Mombasa Rd, Nairobi", phone: "+254 700 555 005", rating: 4.3, open: true, products: ["Fungicides", "Herbicides", "Insecticides", "Soil amendments"], hours: "Mon-Sat 8am-6pm" },
          ],
          "Nakuru": [
            { name: "Nakuru Farmers Bureau", category: "Agro-vet", address: "Kenyatta Ave, Nakuru Town", phone: "+254 720 111 101", rating: 4.7, open: true, products: ["Seeds", "Fertilizers", "Veterinary drugs", "Farm tools"], hours: "Mon-Sat 7am-6pm" },
            { name: "Rift Valley Agro Inputs", category: "Inputs", address: "Oginga Odinga Rd, Nakuru", phone: "+254 722 222 102", rating: 4.5, open: true, products: ["Certified seeds", "Fertilizers", "Pesticides"], hours: "Mon-Sat 8am-5:30pm" },
            { name: "Flamingo Agrochemicals", category: "Pesticides", address: "Pandit Rd, Nakuru", phone: "+254 733 333 103", rating: 4.4, open: false, products: ["Fungicides", "Insecticides", "Herbicides", "Nematicides"], hours: "Mon-Fri 8am-5pm" },
            { name: "Pyrethrum Board Kenya", category: "Inputs", address: "Pyrethrum Rd, Nakuru", phone: "+254 711 444 104", rating: 4.6, open: true, products: ["Pyrethrum extracts", "Organic pesticides", "Bio-inputs"], hours: "Mon-Fri 8am-4:30pm" },
          ],
          "Kisumu": [
            { name: "Lake Basin Agro", category: "Agro-vet", address: "Oginga Odinga St, Kisumu", phone: "+254 720 111 201", rating: 4.6, open: true, products: ["Seeds", "Fish feeds", "Fertilizers", "Veterinary drugs"], hours: "Mon-Sat 7:30am-6pm" },
            { name: "Nyanza Farmers Hub", category: "Inputs", address: "Jomo Kenyatta Hwy, Kisumu", phone: "+254 722 222 202", rating: 4.4, open: true, products: ["Rice seeds", "Sorghum seeds", "Fertilizers", "Farm tools"], hours: "Mon-Sat 8am-5:30pm" },
            { name: "Victoria Agrochemicals", category: "Pesticides", address: "Nairobi Rd, Kisumu", phone: "+254 733 333 203", rating: 4.3, open: true, products: ["Fungicides", "Herbicides", "Insecticides"], hours: "Mon-Sat 8am-6pm" },
            { name: "Aquaculture Inputs Kenya", category: "Inputs", address: "Dunga Beach Rd, Kisumu", phone: "+254 711 444 204", rating: 4.7, open: false, products: ["Fish feeds", "Fish fingerlings", "Pond liners", "Water testing kits"], hours: "Mon-Fri 8am-5pm" },
          ],
          "Mombasa": [
            { name: "Coast Agro Supplies", category: "Agro-vet", address: "Digo Rd, Mombasa", phone: "+254 720 111 301", rating: 4.5, open: true, products: ["Coconut seedlings", "Seeds", "Fertilizers", "Pesticides"], hours: "Mon-Sat 7:30am-6:30pm" },
            { name: "Pwani Farmers Centre", category: "Inputs", address: "Nyerere Ave, Mombasa", phone: "+254 722 222 302", rating: 4.3, open: true, products: ["Cashew inputs", "Cassava cuttings", "Coastal crop seeds"], hours: "Mon-Sat 8am-5pm" },
            { name: "Coastal Agrochemicals", category: "Pesticides", address: "Moi Ave, Mombasa", phone: "+254 733 333 303", rating: 4.4, open: true, products: ["Fungicides", "Insecticides", "Herbicides", "Post-harvest chemicals"], hours: "Mon-Fri 8am-5:30pm" },
          ],
          "Eldoret": [
            { name: "Eldoret Farmers Co-op", category: "Agro-vet", address: "Uganda Rd, Eldoret", phone: "+254 720 111 401", rating: 4.8, open: true, products: ["Wheat seeds", "Maize seeds", "Fertilizers", "Dairy inputs"], hours: "Mon-Sat 7am-6pm" },
            { name: "KARI Seed Centre Eldoret", category: "Seeds", address: "Eldoret-Nakuru Rd", phone: "+254 722 222 402", rating: 4.9, open: true, products: ["Certified wheat", "Certified maize", "Certified soybean", "Sunflower seeds"], hours: "Mon-Fri 8am-4:30pm" },
            { name: "Rift Agrochemicals", category: "Pesticides", address: "Nandi Rd, Eldoret", phone: "+254 733 333 403", rating: 4.5, open: false, products: ["Fungicides", "Herbicides", "Grain storage chemicals"], hours: "Mon-Sat 8am-5:30pm" },
            { name: "Uasin Gishu Dairy Inputs", category: "Inputs", address: "Kimumu, Eldoret", phone: "+254 711 444 404", rating: 4.6, open: true, products: ["Dairy feeds", "Mineral licks", "Veterinary drugs", "Milking equipment"], hours: "Mon-Sat 7am-5pm" },
          ],
          "Meru": [
            { name: "Meru Agro Centre", category: "Agro-vet", address: "Meru Town Centre", phone: "+254 720 111 501", rating: 4.7, open: true, products: ["Coffee inputs", "Tea inputs", "Seeds", "Fertilizers"], hours: "Mon-Sat 7:30am-6pm" },
            { name: "Miraa Farmers Supplies", category: "Inputs", address: "Maua Rd, Meru", phone: "+254 722 222 502", rating: 4.5, open: true, products: ["Miraa seedlings", "Fertilizers", "Pesticides for khat"], hours: "Mon-Sat 7am-5:30pm" },
            { name: "Mt Kenya Agrochemicals", category: "Pesticides", address: "Giaki Rd, Meru", phone: "+254 733 333 503", rating: 4.4, open: true, products: ["Coffee fungicides", "Insecticides", "Foliar feeds"], hours: "Mon-Fri 8am-5pm" },
          ],
          "Nyeri": [
            { name: "Nyeri Farmers Centre", category: "Agro-vet", address: "Kimathi Way, Nyeri", phone: "+254 720 111 601", rating: 4.8, open: true, products: ["Tea inputs", "Coffee seedlings", "Fertilizers", "Pesticides"], hours: "Mon-Sat 7am-6pm" },
            { name: "Central Kenya Co-op", category: "Inputs", address: "Dedan Kimathi St, Nyeri", phone: "+254 722 222 602", rating: 4.6, open: false, products: ["Certified seeds", "Organic fertilizers", "Farm tools"], hours: "Mon-Fri 8am-5pm" },
            { name: "Aberdare Agrochemicals", category: "Pesticides", address: "Kimemia Rd, Nyeri", phone: "+254 733 333 603", rating: 4.5, open: true, products: ["Tea pesticides", "Fungicides", "Herbicides", "Nematicides"], hours: "Mon-Sat 8am-5:30pm" },
          ],
          "Kakamega": [
            { name: "Western Kenya Agro Hub", category: "Agro-vet", address: "Atwoli Rd, Kakamega", phone: "+254 720 111 701", rating: 4.6, open: true, products: ["Sugarcane inputs", "Maize seeds", "Fertilizers", "Veterinary drugs"], hours: "Mon-Sat 7am-6pm" },
            { name: "Mumias Sugar Inputs", category: "Inputs", address: "Mumias-Kakamega Rd", phone: "+254 722 222 702", rating: 4.4, open: true, products: ["Sugarcane seedlings", "Fertilizers", "Herbicides for cane"], hours: "Mon-Fri 7:30am-5pm" },
            { name: "Kakamega Agrochemicals", category: "Pesticides", address: "Market Rd, Kakamega", phone: "+254 733 333 703", rating: 4.3, open: false, products: ["Fungicides", "Insecticides", "Herbicides"], hours: "Mon-Sat 8am-5:30pm" },
          ],
        };

        const counties47 = ["Baringo","Bomet","Bungoma","Busia","Elgeyo Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];

        const currentVets = AGROVETS[agroCounty] || [
          { name: `${agroCounty} Agro Supplies`, category: "Agro-vet", address: `Main Market, ${agroCounty}`, phone: "+254 700 000 000", rating: 4.2, open: true, products: ["Seeds", "Fertilizers", "Pesticides", "Farm tools"], hours: "Mon-Sat 8am-5pm" },
          { name: `${agroCounty} Farmers Co-op`, category: "Inputs", address: `Town Centre, ${agroCounty}`, phone: "+254 722 000 000", rating: 4.0, open: true, products: ["Certified seeds", "Fertilizers", "Farm tools"], hours: "Mon-Fri 8am-5pm" },
        ];

        const categories = ["All", "Agro-vet", "Seeds", "Fertilizers", "Pesticides", "Inputs"];
        const filtered = currentVets.filter(v =>
          (agroCategory === "All" || v.category === agroCategory) &&
          (!agroSearch || v.name.toLowerCase().includes(agroSearch.toLowerCase()) || v.products.some(p => p.toLowerCase().includes(agroSearch.toLowerCase())))
        );

        const catIcons = { "Agro-vet": "🏪", "Seeds": "🌱", "Fertilizers": "🧪", "Pesticides": "💊", "Inputs": "🛒" };

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

              {!agroSelected ? (
                <>
                  {/* HEADER */}
                  <div style={{ marginBottom: "1.2rem" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Find Inputs Near You</div>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>Agro-Vet <span style={{ color: "var(--gold)" }}>Locator</span></h1>
                    <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginTop: "0.3rem" }}>Find seeds, fertilizers, pesticides and vet services near you.</p>
                  </div>

                  {/* COUNTY SELECTOR */}
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Select Your County</label>
                    <select value={agroCounty} onChange={e => { setAgroCounty(e.target.value); setAgroSelected(null); }} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.25)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--green-bright)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                      {counties47.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  {/* SEARCH */}
                  <input style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "1rem" }} placeholder="Search by name or product..." value={agroSearch} onChange={e => setAgroSearch(e.target.value)} />

                  {/* CATEGORY FILTER */}
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setAgroCategory(cat)} style={{ padding: "0.3rem 0.75rem", borderRadius: "2rem", border: `1px solid ${agroCategory === cat ? "var(--green-bright)" : "rgba(76,175,80,0.15)"}`, background: agroCategory === cat ? "rgba(76,175,80,0.15)" : "transparent", color: agroCategory === cat ? "var(--green-bright)" : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", cursor: "pointer", transition: "all 0.2s" }}>{catIcons[cat] || ""} {cat}</button>
                    ))}
                  </div>

                  {/* STATS */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem", marginBottom: "1.2rem" }}>
                    {[
                      { num: filtered.length, label: "Shops Found" },
                      { num: filtered.filter(v => v.open).length, label: "Open Now" },
                      { num: [...new Set(filtered.map(v => v.category))].length, label: "Categories" },
                    ].map((s, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.8rem", padding: "0.75rem", textAlign: "center" }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold)" }}>{s.num}</div>
                        <div style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* SHOP CARDS */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {filtered.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "2rem", color: "rgba(245,240,232,0.35)", fontSize: "0.85rem" }}>
                        <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
                        No agro-vets found. Try changing the county or category.
                      </div>
                    ) : filtered.map((shop, i) => (
                      <div key={i} onClick={() => setAgroSelected(shop)} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "1rem", padding: "1rem 1.1rem", cursor: "pointer", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                            <span style={{ fontSize: "1.5rem" }}>{catIcons[shop.category] || "🏪"}</span>
                            <div>
                              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--white)" }}>{shop.name}</div>
                              <div style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>📍 {shop.address}</div>
                            </div>
                          </div>
                          <span style={{ fontSize: "0.65rem", padding: "0.2rem 0.5rem", borderRadius: "1rem", background: shop.open ? "rgba(76,175,80,0.15)" : "rgba(229,57,53,0.1)", color: shop.open ? "var(--green-bright)" : "#e57373", border: `1px solid ${shop.open ? "rgba(76,175,80,0.3)" : "rgba(229,57,53,0.2)"}`, whiteSpace: "nowrap", flexShrink: 0 }}>{shop.open ? "● Open" : "● Closed"}</span>
                        </div>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                          {shop.products.slice(0, 3).map((p, pi) => (
                            <span key={pi} style={{ fontSize: "0.65rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "1rem", padding: "0.15rem 0.5rem", color: "rgba(245,240,232,0.5)" }}>{p}</span>
                          ))}
                          {shop.products.length > 3 && <span style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.3)" }}>+{shop.products.length - 3} more</span>}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.72rem", color: "var(--gold)" }}>{"⭐".repeat(Math.round(shop.rating))} {shop.rating}</span>
                          <span style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.35)" }}>{shop.hours}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* SHOP DETAIL VIEW */
                <>
                  <button onClick={() => setAgroSelected(null)} style={{ background: "none", border: "none", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer", marginBottom: "1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>← Back to Locator</button>

                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.15)", borderRadius: "1.2rem", padding: "1.3rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                        <div style={{ width: 52, height: 52, borderRadius: "0.75rem", background: "rgba(76,175,80,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", flexShrink: 0 }}>{catIcons[agroSelected.category] || "🏪"}</div>
                        <div>
                          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", color: "var(--white)", marginBottom: "0.2rem" }}>{agroSelected.name}</h2>
                          <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.4)" }}>{agroSelected.category} · {agroCounty}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: "0.68rem", padding: "0.25rem 0.6rem", borderRadius: "1rem", background: agroSelected.open ? "rgba(76,175,80,0.15)" : "rgba(229,57,53,0.1)", color: agroSelected.open ? "var(--green-bright)" : "#e57373", border: `1px solid ${agroSelected.open ? "rgba(76,175,80,0.3)" : "rgba(229,57,53,0.2)"}` }}>{agroSelected.open ? "● Open Now" : "● Closed"}</span>
                    </div>

                    {[
                      { icon: "📍", label: "Address", value: agroSelected.address },
                      { icon: "📱", label: "Phone", value: agroSelected.phone },
                      { icon: "🕒", label: "Hours", value: agroSelected.hours },
                      { icon: "⭐", label: "Rating", value: `${agroSelected.rating} out of 5` },
                    ].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.6rem 0", borderBottom: i < 3 ? "1px solid rgba(76,175,80,0.06)" : "none" }}>
                        <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                        <div>
                          <div style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{item.label}</div>
                          <div style={{ fontSize: "0.85rem", color: "var(--white)" }}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PRODUCTS */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "1rem", padding: "1rem", marginBottom: "1rem" }}>
                    <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Available Products</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                      {agroSelected.products.map((p, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.6rem", padding: "0.6rem 0.75rem" }}>
                          <span style={{ fontSize: "0.9rem" }}>✓</span>
                          <span style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.7)" }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    <a href={`tel:${agroSelected.phone}`} style={{ display: "block", width: "100%", padding: "0.85rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>📞 Call {agroSelected.phone}</a>
                    <a href={`https://wa.me/${agroSelected.phone.replace(/\s|\+/g, "")}`} target="_blank" rel="noreferrer" style={{ display: "block", width: "100%", padding: "0.85rem", borderRadius: "0.75rem", border: "1px solid rgba(76,175,80,0.3)", background: "rgba(76,175,80,0.08)", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>💬 WhatsApp them</a>
                    <button onClick={() => { setActiveTab("home"); }} style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1px solid rgba(76,175,80,0.15)", background: "transparent", color: "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer" }}>🌱 Ask agu.ai about their products</button>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })()}
      {/* ===== FARM CALCULATOR ===== */}
      {activeTab === "calculator" && (() => {
        const CROP_DATA = {
          "Maize":      { yieldPerAcre: 25, unit: "90kg bags", seedCost: 2500, fertCost: 8000, pesticideCost: 2000, labourCost: 5000, marketPrice: 3400, season: 120 },
          "Beans":      { yieldPerAcre: 8,  unit: "90kg bags", seedCost: 4000, fertCost: 5000, pesticideCost: 1500, labourCost: 4000, marketPrice: 9200, season: 75 },
          "Tomatoes":   { yieldPerAcre: 40, unit: "crates",    seedCost: 3500, fertCost: 12000,pesticideCost: 6000, labourCost: 8000, marketPrice: 1800, season: 90 },
          "Potatoes":   { yieldPerAcre: 50, unit: "110kg bags",seedCost: 15000,fertCost: 10000,pesticideCost: 4000, labourCost: 6000, marketPrice: 2100, season: 90 },
          "Wheat":      { yieldPerAcre: 18, unit: "90kg bags", seedCost: 3000, fertCost: 7000, pesticideCost: 2500, labourCost: 4500, marketPrice: 4800, season: 150 },
          "Kale":       { yieldPerAcre: 200,unit: "bales",     seedCost: 1500, fertCost: 6000, pesticideCost: 1000, labourCost: 5000, marketPrice: 350,  season: 45 },
          "Sugarcane":  { yieldPerAcre: 30, unit: "tonnes",    seedCost: 8000, fertCost: 9000, pesticideCost: 3000, labourCost: 7000, marketPrice: 4200, season: 365 },
          "Tea":        { yieldPerAcre: 2000,unit:"kg green leaf",seedCost:0,  fertCost: 8000, pesticideCost: 2000, labourCost: 10000,marketPrice: 28,   season: 365 },
          "Coffee":     { yieldPerAcre: 800, unit:"kg FAQ",    seedCost: 0,    fertCost: 7000, pesticideCost: 3000, labourCost: 8000, marketPrice: 310,  season: 365 },
          "Bananas":    { yieldPerAcre: 120, unit:"bunches",   seedCost: 5000, fertCost: 6000, pesticideCost: 1500, labourCost: 4000, marketPrice: 180,  season: 365 },
        };

        const crop = CROP_DATA[calcCrop];
        const acres = parseFloat(calcAcres) || 1;

        const calcYield = () => {
          const totalYield = crop.yieldPerAcre * acres;
          const seedCost = parseFloat(calcSeedRate) || crop.seedCost * acres;
          const fertCost = parseFloat(calcFertCost) || crop.fertCost * acres;
          const pesticideCost = parseFloat(calcPesticideCost) || crop.pesticideCost * acres;
          const labourCost = parseFloat(calcLabourCost) || crop.labourCost * acres;
          const sellingPrice = parseFloat(calcSellingPrice) || crop.marketPrice;
          const totalCost = seedCost + fertCost + pesticideCost + labourCost;
          const grossRevenue = totalYield * sellingPrice;
          const netProfit = grossRevenue - totalCost;
          const roi = ((netProfit / totalCost) * 100).toFixed(1);
          const profitPerAcre = (netProfit / acres).toFixed(0);
          setCalcResult({ totalYield, totalCost, grossRevenue, netProfit, roi, profitPerAcre, seedCost, fertCost, pesticideCost, labourCost, sellingPrice });
        };

        const budgetTotal = calcBudgetItems.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

              {/* HEADER */}
              <div style={{ marginBottom: "1.2rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Farm Tools</div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>Farm <span style={{ color: "var(--gold)" }}>Calculator</span></h1>
                <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginTop: "0.3rem" }}>Calculate yield, profit, costs and ROI for your farm.</p>
              </div>

              {/* CALC TABS */}
              <div style={{ display: "flex", borderBottom: "1px solid rgba(76,175,80,0.1)", marginBottom: "1.2rem" }}>
                {[
                  { id: "yield", label: "📊 Yield and Profit" },
                  { id: "budget", label: "💰 Budget Planner" },
                  { id: "breakeven", label: "⚖️ Break-even" },
                ].map(tab => (
                  <button key={tab.id} onClick={() => { setCalcTab(tab.id); setCalcResult(null); }} style={{ flex: 1, padding: "0.65rem 0.3rem", background: "none", border: "none", borderBottom: `2px solid ${calcTab === tab.id ? "var(--green-bright)" : "transparent"}`, color: calcTab === tab.id ? "var(--green-bright)" : "rgba(245,240,232,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>{tab.label}</button>
                ))}
              </div>

              {/* YIELD AND PROFIT TAB */}
              {calcTab === "yield" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div>
                      <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Crop</label>
                      <select value={calcCrop} onChange={e => { setCalcCrop(e.target.value); setCalcResult(null); }} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                        {Object.keys(CROP_DATA).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Acres Planted</label>
                      <input type="number" min="0.1" step="0.5" value={calcAcres} onChange={e => { setCalcAcres(e.target.value); setCalcResult(null); }} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                    </div>
                  </div>

                  <div style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.8rem", padding: "0.8rem 1rem", fontSize: "0.78rem", color: "rgba(245,240,232,0.5)" }}>
                    💡 Default values loaded for <strong style={{ color: "var(--green-bright)" }}>{calcCrop}</strong> in Kenya. Override any value below.
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {[
                      { label: "Seed Cost (KSh)", key: "calcSeedRate", setter: setCalcSeedRate, val: calcSeedRate, placeholder: `Default: ${(crop.seedCost * acres).toLocaleString()}` },
                      { label: "Fertilizer Cost (KSh)", key: "calcFertCost", setter: setCalcFertCost, val: calcFertCost, placeholder: `Default: ${(crop.fertCost * acres).toLocaleString()}` },
                      { label: "Pesticide Cost (KSh)", key: "calcPesticideCost", setter: setCalcPesticideCost, val: calcPesticideCost, placeholder: `Default: ${(crop.pesticideCost * acres).toLocaleString()}` },
                      { label: "Labour Cost (KSh)", key: "calcLabourCost", setter: setCalcLabourCost, val: calcLabourCost, placeholder: `Default: ${(crop.labourCost * acres).toLocaleString()}` },
                      { label: `Selling Price (per ${crop.unit})`, key: "calcSellingPrice", setter: setCalcSellingPrice, val: calcSellingPrice, placeholder: `Market: KSh ${crop.marketPrice.toLocaleString()}` },
                    ].map((field, i) => (
                      <div key={i} style={{ gridColumn: i === 4 ? "1 / -1" : "auto" }}>
                        <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>{field.label}</label>
                        <input type="number" value={field.val} onChange={e => { field.setter(e.target.value); setCalcResult(null); }} placeholder={field.placeholder} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>

                  <button onClick={calcYield} style={{ width: "100%", padding: "0.85rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer" }}>🧮 Calculate Now</button>

                  {calcResult && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                      {/* SUMMARY CARDS */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                        {[
                          { label: "Expected Yield", value: `${calcResult.totalYield.toLocaleString()} ${crop.unit}`, color: "var(--white)", bg: "rgba(255,255,255,0.03)" },
                          { label: "Total Cost", value: `KSh ${calcResult.totalCost.toLocaleString()}`, color: "#e57373", bg: "rgba(229,57,53,0.05)" },
                          { label: "Gross Revenue", value: `KSh ${calcResult.grossRevenue.toLocaleString()}`, color: "var(--gold)", bg: "rgba(232,196,74,0.05)" },
                          { label: "Net Profit", value: `KSh ${calcResult.netProfit.toLocaleString()}`, color: calcResult.netProfit >= 0 ? "var(--green-bright)" : "#e57373", bg: calcResult.netProfit >= 0 ? "rgba(76,175,80,0.08)" : "rgba(229,57,53,0.08)" },
                        ].map((card, i) => (
                          <div key={i} style={{ background: card.bg, border: `1px solid ${card.color}22`, borderRadius: "0.9rem", padding: "0.9rem" }}>
                            <div style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.4)", marginBottom: "0.3rem" }}>{card.label}</div>
                            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: card.color }}>{card.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* ROI AND PROFIT PER ACRE */}
                      <div style={{ background: "rgba(76,175,80,0.06)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.9rem", padding: "1rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.4)", marginBottom: "0.3rem" }}>Return on Investment</div>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: parseFloat(calcResult.roi) >= 0 ? "var(--green-bright)" : "#e57373" }}>{calcResult.roi}%</div>
                        </div>
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.4)", marginBottom: "0.3rem" }}>Profit per Acre</div>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--gold)" }}>KSh {parseInt(calcResult.profitPerAcre).toLocaleString()}</div>
                        </div>
                      </div>

                      {/* COST BREAKDOWN */}
                      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "0.9rem", padding: "1rem" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Cost Breakdown</div>
                        {[
                          { label: "Seeds", value: calcResult.seedCost, color: "#42a5f5" },
                          { label: "Fertilizer", value: calcResult.fertCost, color: "#e8c44a" },
                          { label: "Pesticides", value: calcResult.pesticideCost, color: "#ef5350" },
                          { label: "Labour", value: calcResult.labourCost, color: "#66bb6a" },
                        ].map((item, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.55)", minWidth: 80 }}>{item.label}</span>
                            <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: "1rem", overflow: "hidden" }}>
                              <div style={{ width: `${(item.value / calcResult.totalCost * 100).toFixed(0)}%`, height: "100%", background: item.color, borderRadius: "1rem", transition: "width 0.6s ease" }} />
                            </div>
                            <span style={{ fontSize: "0.75rem", color: "var(--cream)", minWidth: 70, textAlign: "right" }}>KSh {item.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* ADVICE */}
                      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "0.9rem", padding: "1rem" }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>💡 agu.ai Advice</div>
                        <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.7 }}>
                          {calcResult.netProfit > 0
                            ? `Great potential! Your ${calcCrop} farm on ${acres} acre${acres > 1 ? "s" : ""} should return KSh ${parseInt(calcResult.profitPerAcre).toLocaleString()} per acre with an ROI of ${calcResult.roi}%. To maximize profit, consider buying inputs in bulk and selling directly to markets rather than middlemen.`
                            : `This farm plan shows a potential loss. Consider reducing input costs, increasing your selling price, or choosing a more profitable crop. Talk to agu.ai on WhatsApp for personalized advice.`}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* BUDGET PLANNER TAB */}
              {calcTab === "budget" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginBottom: "0.25rem" }}>Add all your planned farm expenses below to get a total budget.</div>
                  {calcBudgetItems.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <input value={item.name} onChange={e => setCalcBudgetItems(prev => prev.map((p, j) => j === i ? { ...p, name: e.target.value } : p))} placeholder="Expense name e.g. Maize seeds" style={{ flex: 2, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                      <input type="number" value={item.cost} onChange={e => setCalcBudgetItems(prev => prev.map((p, j) => j === i ? { ...p, cost: e.target.value } : p))} placeholder="KSh" style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }} />
                      <button onClick={() => setCalcBudgetItems(prev => prev.filter((_, j) => j !== i))} style={{ background: "rgba(229,57,53,0.1)", border: "1px solid rgba(229,57,53,0.2)", borderRadius: "0.5rem", color: "#e57373", cursor: "pointer", fontSize: "0.8rem", padding: "0.5rem 0.6rem", flexShrink: 0 }}>✕</button>
                    </div>
                  ))}
                  <button onClick={() => setCalcBudgetItems(prev => [...prev, { name: "", cost: "" }])} style={{ padding: "0.6rem", borderRadius: "0.6rem", border: "1px dashed rgba(76,175,80,0.3)", background: "transparent", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", cursor: "pointer" }}>+ Add Expense</button>
                  <div style={{ background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.9rem", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.7)", fontWeight: 600 }}>Total Budget</span>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--gold)" }}>KSh {budgetTotal.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* BREAK-EVEN TAB */}
              {calcTab === "breakeven" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)" }}>Find out the minimum price you need to sell at to cover your costs.</div>
                  <div>
                    <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Select Crop</label>
                    <select value={calcCrop} onChange={e => { setCalcCrop(e.target.value); setCalcResult(null); }} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                      {Object.keys(CROP_DATA).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Acres Planted</label>
                    <input type="number" min="0.1" step="0.5" value={calcAcres} onChange={e => setCalcAcres(e.target.value)} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.65rem 0.9rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                  </div>
                  {(() => {
                    const totalCost = (crop.seedCost + crop.fertCost + crop.pesticideCost + crop.labourCost) * acres;
                    const totalYield = crop.yieldPerAcre * acres;
                    const breakEvenPrice = (totalCost / totalYield).toFixed(0);
                    const currentPrice = crop.marketPrice;
                    const margin = currentPrice - parseInt(breakEvenPrice);
                    return (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "0.5rem" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" }}>
                          {[
                            { label: "Total Cost", value: `KSh ${totalCost.toLocaleString()}`, color: "#e57373" },
                            { label: `Break-even Price per ${crop.unit}`, value: `KSh ${parseInt(breakEvenPrice).toLocaleString()}`, color: "var(--gold)" },
                            { label: "Current Market Price", value: `KSh ${currentPrice.toLocaleString()}`, color: "var(--green-bright)" },
                          ].map((card, i) => (
                            <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${card.color}22`, borderRadius: "0.8rem", padding: "0.8rem 0.6rem", textAlign: "center" }}>
                              <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.4)", marginBottom: "0.3rem", lineHeight: 1.4 }}>{card.label}</div>
                              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, color: card.color }}>{card.value}</div>
                            </div>
                          ))}
                        </div>
                        <div style={{ background: margin >= 0 ? "rgba(76,175,80,0.08)" : "rgba(229,57,53,0.08)", border: `1px solid ${margin >= 0 ? "rgba(76,175,80,0.25)" : "rgba(229,57,53,0.25)"}`, borderRadius: "0.9rem", padding: "1rem", textAlign: "center" }}>
                          <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.5)", marginBottom: "0.4rem" }}>Your profit margin per {crop.unit}</div>
                          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: margin >= 0 ? "var(--green-bright)" : "#e57373" }}>KSh {margin.toLocaleString()}</div>
                          <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.45)", marginTop: "0.4rem" }}>{margin >= 0 ? `✓ Market price is above break-even. You are profitable!` : `⚠️ Market price is below break-even. Consider reducing costs.`}</div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

            </div>
          </div>
        );
      })()}
      {/* ===== SOIL HEALTH CHECKER ===== */}
      {activeTab === "soil" && (() => {
        const SOIL_PROFILES = {
          "Nairobi":    { type: "Red Volcanic", ph: "5.5-6.5", nitrogen: "Medium", phosphorus: "Low",  potassium: "High",  bestCrops: ["Maize", "Beans", "Kale", "Potatoes"] },
          "Nakuru":     { type: "Volcanic Loam", ph: "5.8-6.8", nitrogen: "High",   phosphorus: "Medium",potassium: "High",  bestCrops: ["Maize", "Wheat", "Potatoes", "Pyrethrum"] },
          "Kisumu":     { type: "Clay Loam",    ph: "5.0-6.0", nitrogen: "Medium", phosphorus: "Low",  potassium: "Medium",bestCrops: ["Rice", "Sorghum", "Sugarcane", "Maize"] },
          "Mombasa":    { type: "Sandy Coastal", ph: "6.0-7.5", nitrogen: "Low",    phosphorus: "Low",  potassium: "Medium",bestCrops: ["Coconut", "Cassava", "Mango", "Cashew"] },
          "Eldoret":    { type: "Volcanic Loam", ph: "5.5-6.5", nitrogen: "High",   phosphorus: "Medium",potassium: "High",  bestCrops: ["Wheat", "Maize", "Sunflower", "Soya Beans"] },
          "Meru":       { type: "Red Volcanic", ph: "5.0-6.5", nitrogen: "High",   phosphorus: "Medium",potassium: "High",  bestCrops: ["Coffee", "Miraa", "Bananas", "Avocado"] },
          "Nyeri":      { type: "Volcanic Clay", ph: "5.5-6.5", nitrogen: "High",   phosphorus: "High", potassium: "High",  bestCrops: ["Tea", "Coffee", "Potatoes", "Macadamia"] },
          "Kisii":      { type: "Red Clay",     ph: "4.5-5.5", nitrogen: "Medium", phosphorus: "Low",  potassium: "Medium",bestCrops: ["Tea", "Maize", "Bananas", "Avocado"] },
          "Kakamega":   { type: "Clay Loam",    ph: "5.5-6.5", nitrogen: "Medium", phosphorus: "Low",  potassium: "Medium",bestCrops: ["Sugarcane", "Maize", "Beans", "Groundnuts"] },
          "Kitui":      { type: "Sandy Loam",   ph: "6.0-7.5", nitrogen: "Low",    phosphorus: "Low",  potassium: "Low",   bestCrops: ["Sorghum", "Millet", "Green Grams", "Cotton"] },
        };

        const soilProfile = SOIL_PROFILES[soilCounty] || SOIL_PROFILES["Nairobi"];

        const COLORS = ["Dark Brown/Black", "Reddish Brown", "Light Brown", "Grey", "Yellow/Orange", "White/Pale"];
        const TEXTURES = ["Sandy (gritty, falls apart)", "Loamy (crumbles easily)", "Clay (sticky when wet)", "Silty (smooth and silky)", "Rocky/Gravelly"];
        const DRAINAGES = ["Well drained (water sinks fast)", "Moderate (water stays briefly)", "Poorly drained (waterlogged)", "Very dry (water repels)"];
        const PROBLEMS = ["Crops always yellow", "Poor germination", "Stunted growth", "Waterlogging", "Soil cracks when dry", "White crust on surface", "Very acidic smell", "Plants wilt quickly"];

        const analyzeSoil = async () => {
          if (!soilColor || !soilTexture || !soilDrainage) {
            setSoilResult({ error: "Please select soil color, texture and drainage to get your analysis." });
            return;
          }
          setSoilLoading(true);
          try {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                system: "You are a Kenya soil science expert. Analyze soil health based on visual and physical observations. Return ONLY a JSON object with these exact keys: healthScore (0-100 number), healthLabel (string like Excellent/Good/Fair/Poor), soilType (string), phEstimate (string like 5.5-6.5), issues (array of strings), recommendations (array of 4 strings), fertilizers (array of 3 strings with dosages), suitableCrops (array of 4 crop names). No markdown, no explanation, raw JSON only.",
                messages: [{ role: "user", content: `Analyze soil for a farmer in ${soilCounty} County, Kenya. They want to grow ${soilCrop}. Observations: Color: ${soilColor}, Texture: ${soilTexture}, Drainage: ${soilDrainage}, Problems observed: ${soilProblems.length > 0 ? soilProblems.join(", ") : "None"}. County soil profile: ${JSON.stringify(soilProfile)}. Provide practical Kenyan farming advice.` }]
              })
            });
            const data = await response.json();
            const text = data.content?.[0]?.text || "{}";
            const clean = text.replace(/```json|```/g, "").trim();
            setSoilResult(JSON.parse(clean));
          } catch (e) {
            setSoilResult({ error: "Analysis failed. Please try again." });
          } finally {
            setSoilLoading(false);
          }
        };

        const healthColor = (score) => score >= 75 ? "#4caf50" : score >= 50 ? "#e8c44a" : "#e53935";

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

              {/* HEADER */}
              <div style={{ marginBottom: "1.2rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>AI-Powered Analysis</div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>Soil Health <span style={{ color: "var(--gold)" }}>Checker</span></h1>
                <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginTop: "0.3rem" }}>Describe your soil and get AI-powered health analysis and recommendations.</p>
              </div>

              {/* COUNTY AND CROP */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Your County</label>
                  <select value={soilCounty} onChange={e => { setSoilCounty(e.target.value); setSoilResult(null); }} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                    {["Baringo","Bomet","Bungoma","Busia","Elgeyo Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Intended Crop</label>
                  <select value={soilCrop} onChange={e => { setSoilCrop(e.target.value); setSoilResult(null); }} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                    {["Maize","Beans","Tomatoes","Potatoes","Wheat","Tea","Coffee","Sugarcane","Kale","Bananas","Sorghum","Millet","Avocado","Mango","Rice"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* COUNTY SOIL PROFILE */}
              <div style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.8rem", padding: "0.8rem 1rem", marginBottom: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.72rem", color: "var(--green-bright)", fontWeight: 600 }}>📍 {soilCounty}:</span>
                <span style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.55)" }}>{soilProfile.type} · pH {soilProfile.ph} · N: {soilProfile.nitrogen} · P: {soilProfile.phosphorus} · K: {soilProfile.potassium}</span>
              </div>

              {/* SOIL COLOR */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>Soil Color</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                  {COLORS.map(c => (
                    <button key={c} onClick={() => { setSoilColor(c); setSoilResult(null); }} style={{ padding: "0.55rem 0.75rem", borderRadius: "0.6rem", border: `1px solid ${soilColor === c ? "var(--green-bright)" : "rgba(76,175,80,0.15)"}`, background: soilColor === c ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.02)", color: soilColor === c ? "var(--green-bright)" : "rgba(245,240,232,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>{c}</button>
                  ))}
                </div>
              </div>

              {/* SOIL TEXTURE */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>Soil Texture (feel it in your hand)</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {TEXTURES.map(t => (
                    <button key={t} onClick={() => { setSoilTexture(t); setSoilResult(null); }} style={{ padding: "0.6rem 0.9rem", borderRadius: "0.6rem", border: `1px solid ${soilTexture === t ? "var(--green-bright)" : "rgba(76,175,80,0.15)"}`, background: soilTexture === t ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.02)", color: soilTexture === t ? "var(--green-bright)" : "rgba(245,240,232,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>{t}</button>
                  ))}
                </div>
              </div>

              {/* DRAINAGE */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>Drainage (pour water on soil)</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {DRAINAGES.map(d => (
                    <button key={d} onClick={() => { setSoilDrainage(d); setSoilResult(null); }} style={{ padding: "0.6rem 0.9rem", borderRadius: "0.6rem", border: `1px solid ${soilDrainage === d ? "var(--green-bright)" : "rgba(76,175,80,0.15)"}`, background: soilDrainage === d ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.02)", color: soilDrainage === d ? "var(--green-bright)" : "rgba(245,240,232,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>{d}</button>
                  ))}
                </div>
              </div>

              {/* PROBLEMS */}
              <div style={{ marginBottom: "1.2rem" }}>
                <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>Problems You Have Noticed (optional, select all that apply)</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                  {PROBLEMS.map(p => {
                    const selected = soilProblems.includes(p);
                    return (
                      <button key={p} onClick={() => { setSoilProblems(prev => selected ? prev.filter(x => x !== p) : [...prev, p]); setSoilResult(null); }} style={{ padding: "0.5rem 0.7rem", borderRadius: "0.6rem", border: `1px solid ${selected ? "rgba(232,196,74,0.4)" : "rgba(76,175,80,0.12)"}`, background: selected ? "rgba(232,196,74,0.08)" : "rgba(255,255,255,0.02)", color: selected ? "var(--gold)" : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>{selected ? "✓ " : ""}{p}</button>
                    );
                  })}
                </div>
              </div>

              {/* ANALYZE BUTTON */}
              <button onClick={analyzeSoil} disabled={soilLoading} style={{ width: "100%", padding: "0.9rem", borderRadius: "0.75rem", border: "none", background: soilLoading ? "rgba(76,175,80,0.3)" : "var(--green-bright)", color: soilLoading ? "var(--green-bright)" : "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: soilLoading ? "not-allowed" : "pointer", transition: "all 0.2s", marginBottom: "1.2rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                {soilLoading ? (
                  <><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block", animation: "bounce 1s infinite 0s" }} /><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block", animation: "bounce 1s infinite 0.2s" }} /><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block", animation: "bounce 1s infinite 0.4s" }} /></>
                ) : "🌍 Analyze My Soil"}
              </button>

              {/* RESULTS */}
              {soilResult && !soilResult.error && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {/* HEALTH SCORE */}
                  <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${healthColor(soilResult.healthScore)}33`, borderRadius: "1.2rem", padding: "1.3rem", textAlign: "center" }}>
                    <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Soil Health Score</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "4rem", fontWeight: 900, color: healthColor(soilResult.healthScore), lineHeight: 1 }}>{soilResult.healthScore}</div>
                    <div style={{ fontSize: "1rem", color: healthColor(soilResult.healthScore), fontWeight: 600, marginTop: "0.3rem" }}>{soilResult.healthLabel}</div>
                    <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: "1rem", overflow: "hidden", marginTop: "0.75rem" }}>
                      <div style={{ width: `${soilResult.healthScore}%`, height: "100%", background: healthColor(soilResult.healthScore), borderRadius: "1rem", transition: "width 0.8s ease" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.3rem" }}>
                      <span style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.3)" }}>0 Poor</span>
                      <span style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.3)" }}>100 Excellent</span>
                    </div>
                  </div>

                  {/* SOIL INFO */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                    {[
                      { label: "Soil Type", value: soilResult.soilType, icon: "🌍" },
                      { label: "Estimated pH", value: soilResult.phEstimate, icon: "🔬" },
                    ].map((item, i) => (
                      <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.8rem", padding: "0.8rem" }}>
                        <div style={{ fontSize: "1.1rem", marginBottom: "0.3rem" }}>{item.icon}</div>
                        <div style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{item.label}</div>
                        <div style={{ fontSize: "0.88rem", color: "var(--white)", fontWeight: 500 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* ISSUES */}
                  {soilResult.issues?.length > 0 && (
                    <div style={{ background: "rgba(229,57,53,0.05)", border: "1px solid rgba(229,57,53,0.15)", borderRadius: "0.9rem", padding: "1rem" }}>
                      <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#e57373", marginBottom: "0.6rem" }}>⚠️ Issues Detected</div>
                      {soilResult.issues.map((issue, i) => (
                        <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
                          <span style={{ color: "#e57373", flexShrink: 0 }}>•</span>
                          <span style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.65)" }}>{issue}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* RECOMMENDATIONS */}
                  <div style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.9rem", padding: "1rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--green-bright)", marginBottom: "0.6rem" }}>✅ Recommendations</div>
                    {soilResult.recommendations?.map((rec, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <span style={{ color: "var(--green-bright)", flexShrink: 0, fontWeight: 700 }}>{i + 1}.</span>
                        <span style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.6 }}>{rec}</span>
                      </div>
                    ))}
                  </div>

                  {/* FERTILIZER ADVICE */}
                  <div style={{ background: "rgba(232,196,74,0.05)", border: "1px solid rgba(232,196,74,0.15)", borderRadius: "0.9rem", padding: "1rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gold)", marginBottom: "0.6rem" }}>🧪 Recommended Fertilizers</div>
                    {soilResult.fertilizers?.map((fert, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
                        <span style={{ color: "var(--gold)", flexShrink: 0 }}>•</span>
                        <span style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)" }}>{fert}</span>
                      </div>
                    ))}
                  </div>

                  {/* SUITABLE CROPS */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "0.9rem", padding: "1rem" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--white)", marginBottom: "0.6rem" }}>🌱 Best Crops for Your Soil</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {soilResult.suitableCrops?.map((crop, i) => (
                        <span key={i} style={{ background: "rgba(76,175,80,0.12)", border: "1px solid rgba(76,175,80,0.25)", borderRadius: "2rem", padding: "0.25rem 0.75rem", fontSize: "0.78rem", color: "var(--green-bright)" }}>{crop}</span>
                      ))}
                    </div>
                  </div>

                  <button onClick={() => setActiveTab("home")} style={{ width: "100%", padding: "0.8rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>🌱 Ask agu.ai for more soil advice</button>
                </div>
              )}

              {soilResult?.error && (
                <div style={{ background: "rgba(229,57,53,0.08)", border: "1px solid rgba(229,57,53,0.2)", borderRadius: "0.8rem", padding: "1rem", fontSize: "0.82rem", color: "#e57373", textAlign: "center" }}>⚠️ {soilResult.error}</div>
              )}

            </div>
          </div>
        );
      })()}
      {/* ===== LIVESTOCK HEALTH TRACKER ===== */}
      {activeTab === "livestock" && (() => {

        const statusColor = { "Healthy": "#4caf50", "Sick": "#e53935", "Vaccinated": "#e8c44a", "Pregnant": "#42a5f5", "Quarantined": "#ef5350", "Recovering": "#ff9800" };
        const typeEmoji = { "Cow": "🐄", "Goat": "🐐", "Sheep": "🐑", "Chicken": "🐓", "Pig": "🐷", "Rabbit": "🐰", "Donkey": "🫏" };

        const SYMPTOM_SETS = {
          "Cow":     ["Not eating", "Reduced milk", "Fever", "Coughing", "Diarrhea", "Limping", "Swollen udder", "Nasal discharge", "Weight loss", "Bloating"],
          "Goat":    ["Not eating", "Coughing", "Diarrhea", "Limping", "Skin lesions", "Weight loss", "Bloating", "Discharge from eyes", "Fever", "Weak"],
          "Chicken": ["Not eating", "Dull feathers", "Swollen face", "Diarrhea", "Reduced eggs", "Coughing", "Sudden deaths", "Limping", "Paralysis", "Gasping"],
          "Sheep":   ["Not eating", "Coughing", "Diarrhea", "Limping", "Wool loss", "Bloating", "Nasal discharge", "Fever", "Weight loss", "Weak"],
          "Pig":     ["Not eating", "Fever", "Coughing", "Diarrhea", "Skin lesions", "Limping", "Vomiting", "Weight loss", "Sneezing", "Weak"],
          "Rabbit":  ["Not eating", "Diarrhea", "Runny nose", "Swollen eyes", "Hair loss", "Weight loss", "Lethargy", "Tilted head"],
          "Donkey":  ["Not eating", "Limping", "Coughing", "Weight loss", "Diarrhea", "Nasal discharge", "Fever", "Weak"],
        };

        const diagnoseSymptoms = async () => {
          if (symptoms.length === 0) return;
          setLiveAILoading(true);
          try {
            const res = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 800,
                system: "You are a Kenya livestock veterinary expert. Diagnose animal health issues based on symptoms. Return ONLY JSON with keys: condition (string), severity (Critical/High/Medium/Low), description (string), treatment (array of 4 strings), prevention (array of 3 strings), urgency (string like 'Call vet immediately' or 'Monitor closely' or 'Home treatment possible'). No markdown, raw JSON only.",
                messages: [{ role: "user", content: `A ${symAnimalType} in Kenya has these symptoms: ${symptoms.join(", ")}. What is the likely condition and treatment? Give practical Kenyan farming advice.` }]
              })
            });
            const data = await res.json();
            const text = data.content?.[0]?.text || "{}";
            setLiveAIResult(JSON.parse(text.replace(/```json|```/g, "").trim()));
          } catch { setLiveAIResult({ error: "Diagnosis failed. Please try again." }); }
          finally { setLiveAILoading(false); }
        };

        const healthSummary = {
          total: livestock.length,
          healthy: livestock.filter(a => a.status === "Healthy").length,
          sick: livestock.filter(a => a.status === "Sick").length,
          vaccinated: livestock.filter(a => a.status === "Vaccinated").length,
        };

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "700px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

              {/* HEADER */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                <div>
                  <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Farm Management</div>
                  <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>Livestock <span style={{ color: "var(--gold)" }}>Tracker</span></h1>
                </div>
                <button onClick={() => setShowAddAnimal(true)} style={{ background: "var(--green-bright)", border: "none", borderRadius: "0.75rem", padding: "0.6rem 1rem", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", flexShrink: 0 }}>+ Add Animal</button>
              </div>

              {/* SUMMARY CARDS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "0.5rem", marginBottom: "1.2rem" }}>
                {[
                  { num: healthSummary.total, label: "Total", color: "var(--white)" },
                  { num: healthSummary.healthy, label: "Healthy", color: "#4caf50" },
                  { num: healthSummary.sick, label: "Sick", color: "#e53935" },
                  { num: healthSummary.vaccinated, label: "Vaccinated", color: "#e8c44a" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${s.color}22`, borderRadius: "0.8rem", padding: "0.7rem 0.4rem", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: s.color }}>{s.num}</div>
                    <div style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.4)" }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* TABS */}
              <div style={{ display: "flex", borderBottom: "1px solid rgba(76,175,80,0.1)", marginBottom: "1.2rem" }}>
                {[
                  { id: "herd", label: "🐄 My Herd" },
                  { id: "diagnose", label: "🩺 Diagnose" },
                  { id: "vaccines", label: "💉 Vaccines" },
                ].map(tab => (
                  <button key={tab.id} onClick={() => setLiveTab(tab.id)} style={{ flex: 1, padding: "0.65rem 0.3rem", background: "none", border: "none", borderBottom: `2px solid ${liveTab === tab.id ? "var(--green-bright)" : "transparent"}`, color: liveTab === tab.id ? "var(--green-bright)" : "rgba(245,240,232,0.45)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap" }}>{tab.label}</button>
                ))}
              </div>

              {/* ADD ANIMAL FORM */}
              {showAddAnimal && (
                <div style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "1rem", padding: "1.2rem", marginBottom: "1.2rem" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "var(--white)", marginBottom: "0.9rem" }}>Add New Animal</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "0.65rem" }}>
                    {[
                      { label: "Name", key: "name", placeholder: "e.g. Bossy" },
                      { label: "Breed", key: "breed", placeholder: "e.g. Friesian" },
                      { label: "Age", key: "age", placeholder: "e.g. 2 years" },
                      { label: "Weight", key: "weight", placeholder: "e.g. 350kg" },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.4)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: "0.3rem" }}>{f.label}</label>
                        <input value={newAnimal[f.key]} onChange={e => setNewAnimal(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.5rem", padding: "0.55rem 0.75rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem", marginBottom: "0.65rem" }}>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.4)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: "0.3rem" }}>Animal Type</label>
                      <select value={newAnimal.type} onChange={e => setNewAnimal(p => ({ ...p, type: e.target.value }))} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.5rem", padding: "0.55rem 0.75rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                        {Object.keys(typeEmoji).map(t => <option key={t} value={t}>{typeEmoji[t]} {t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.4)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: "0.3rem" }}>Health Status</label>
                      <select value={newAnimal.status} onChange={e => setNewAnimal(p => ({ ...p, status: e.target.value }))} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.5rem", padding: "0.55rem 0.75rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                        {Object.keys(statusColor).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <input value={newAnimal.notes} onChange={e => setNewAnimal(p => ({ ...p, notes: e.target.value }))} placeholder="Notes (optional)" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.5rem", padding: "0.55rem 0.75rem", color: "var(--cream)", fontSize: "0.82rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box", marginBottom: "0.65rem" }} />
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={() => {
                      if (newAnimal.name && newAnimal.type) {
                        setLivestock(prev => [...prev, { ...newAnimal, id: Date.now(), color: statusColor[newAnimal.status] || "#4caf50", milkYield: "N/A" }]);
                        setNewAnimal({ name: "", type: "Cow", breed: "", age: "", weight: "", status: "Healthy", lastVaccine: "", nextVaccine: "", notes: "" });
                        setShowAddAnimal(false);
                      }
                    }} style={{ flex: 2, padding: "0.65rem", borderRadius: "0.5rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>Save Animal</button>
                    <button onClick={() => setShowAddAnimal(false)} style={{ flex: 1, padding: "0.65rem", borderRadius: "0.5rem", border: "1px solid rgba(76,175,80,0.2)", background: "transparent", color: "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer" }}>Cancel</button>
                  </div>
                </div>
              )}

              {/* HERD TAB */}
              {liveTab === "herd" && !openAnimal && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {livestock.map(animal => (
                    <div key={animal.id} onClick={() => setOpenAnimal(animal)} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${animal.color}22`, borderRadius: "1rem", padding: "1rem", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                          <span style={{ fontSize: "1.6rem" }}>{typeEmoji[animal.type] || "🐄"}</span>
                          <div>
                            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--white)" }}>{animal.name}</div>
                            <div style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.4)" }}>{animal.breed} · {animal.age} · {animal.weight}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: "0.65rem", padding: "0.2rem 0.6rem", borderRadius: "1rem", background: `${animal.color}18`, color: animal.color, border: `1px solid ${animal.color}44`, whiteSpace: "nowrap" }}>{animal.status}</span>
                      </div>
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.72rem", color: "rgba(245,240,232,0.4)" }}>
                        {animal.milkYield !== "N/A" && <span>🥛 {animal.milkYield}</span>}
                        <span>💉 Next vaccine: {animal.nextVaccine || "Not set"}</span>
                      </div>
                      {animal.notes && <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.35)", marginTop: "0.35rem", fontStyle: "italic" }}>"{animal.notes}"</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* ANIMAL DETAIL VIEW */}
              {liveTab === "herd" && openAnimal && (() => {
                const animal = livestock.find(a => a.id === openAnimal.id) || openAnimal;
                return (
                  <>
                    <button onClick={() => setOpenAnimal(null)} style={{ background: "none", border: "none", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer", marginBottom: "1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>← Back to Herd</button>
                    <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${animal.color}33`, borderRadius: "1.2rem", padding: "1.3rem", marginBottom: "1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                          <span style={{ fontSize: "2.5rem" }}>{typeEmoji[animal.type] || "🐄"}</span>
                          <div>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--white)", marginBottom: "0.2rem" }}>{animal.name}</h2>
                            <div style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.4)" }}>{animal.type} · {animal.breed}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: "0.68rem", padding: "0.25rem 0.7rem", borderRadius: "1rem", background: `${animal.color}18`, color: animal.color, border: `1px solid ${animal.color}44` }}>{animal.status}</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        {[
                          { label: "Age", value: animal.age || "N/A" },
                          { label: "Weight", value: animal.weight || "N/A" },
                          { label: "Milk/Eggs Yield", value: animal.milkYield || "N/A" },
                          { label: "Last Vaccine", value: animal.lastVaccine || "Not recorded" },
                          { label: "Next Vaccine", value: animal.nextVaccine || "Not set" },
                        ].map((item, i) => (
                          <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem" }}>
                            <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.2rem" }}>{item.label}</div>
                            <div style={{ fontSize: "0.85rem", color: "var(--white)" }}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                      {animal.notes && (
                        <div style={{ marginTop: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: "0.6rem", padding: "0.7rem 0.9rem" }}>
                          <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", textTransform: "uppercase", marginBottom: "0.2rem" }}>Notes</div>
                          <div style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)" }}>{animal.notes}</div>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {Object.keys(statusColor).map(s => (
                        <button key={s} onClick={() => setLivestock(prev => prev.map(a => a.id === animal.id ? { ...a, status: s, color: statusColor[s] } : a))} style={{ flex: 1, padding: "0.5rem 0.2rem", borderRadius: "0.5rem", border: `1px solid ${statusColor[s]}44`, background: animal.status === s ? `${statusColor[s]}18` : "transparent", color: statusColor[s], fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", cursor: "pointer", whiteSpace: "nowrap" }}>{s}</button>
                      ))}
                    </div>
                    <button onClick={() => { setLivestock(prev => prev.filter(a => a.id !== animal.id)); setOpenAnimal(null); }} style={{ width: "100%", marginTop: "0.75rem", padding: "0.7rem", borderRadius: "0.75rem", border: "1px solid rgba(229,57,53,0.3)", background: "rgba(229,57,53,0.08)", color: "#e57373", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer" }}>Remove Animal</button>
                  </>
                );
              })()}

              {/* DIAGNOSE TAB */}
              {liveTab === "diagnose" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>Animal Type</label>
                    <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                      {Object.keys(typeEmoji).map(t => (
                        <button key={t} onClick={() => { setSymAnimalType(t); setSymptoms([]); setLiveAIResult(null); }} style={{ padding: "0.35rem 0.8rem", borderRadius: "2rem", border: `1px solid ${symAnimalType === t ? "var(--green-bright)" : "rgba(76,175,80,0.15)"}`, background: symAnimalType === t ? "rgba(76,175,80,0.15)" : "transparent", color: symAnimalType === t ? "var(--green-bright)" : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", cursor: "pointer" }}>{typeEmoji[t]} {t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.5rem" }}>Select Symptoms (pick all that apply)</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                      {(SYMPTOM_SETS[symAnimalType] || SYMPTOM_SETS["Cow"]).map(s => {
                        const sel = symptoms.includes(s);
                        return (
                          <button key={s} onClick={() => { setSymptoms(prev => sel ? prev.filter(x => x !== s) : [...prev, s]); setLiveAIResult(null); }} style={{ padding: "0.5rem 0.7rem", borderRadius: "0.6rem", border: `1px solid ${sel ? "rgba(232,196,74,0.4)" : "rgba(76,175,80,0.12)"}`, background: sel ? "rgba(232,196,74,0.08)" : "rgba(255,255,255,0.02)", color: sel ? "var(--gold)" : "rgba(245,240,232,0.55)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.78rem", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>{sel ? "✓ " : ""}{s}</button>
                        );
                      })}
                    </div>
                  </div>
                  <button onClick={diagnoseSymptoms} disabled={liveAILoading || symptoms.length === 0} style={{ width: "100%", padding: "0.85rem", borderRadius: "0.75rem", border: "none", background: symptoms.length === 0 ? "rgba(76,175,80,0.2)" : liveAILoading ? "rgba(76,175,80,0.3)" : "var(--green-bright)", color: symptoms.length === 0 ? "rgba(245,240,232,0.3)" : liveAILoading ? "var(--green-bright)" : "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: symptoms.length === 0 ? "not-allowed" : "pointer" }}>
                    {liveAILoading ? "Diagnosing..." : `🩺 Diagnose ${symptoms.length > 0 ? `(${symptoms.length} symptoms)` : ""}`}
                  </button>

                  {liveAIResult && !liveAIResult.error && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${liveAIResult.severity === "Critical" ? "rgba(229,57,53,0.3)" : liveAIResult.severity === "High" ? "rgba(232,196,74,0.3)" : "rgba(76,175,80,0.2)"}`, borderRadius: "1rem", padding: "1.2rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "var(--white)" }}>{liveAIResult.condition}</h3>
                          <span style={{ fontSize: "0.65rem", padding: "0.2rem 0.6rem", borderRadius: "1rem", background: liveAIResult.severity === "Critical" ? "rgba(229,57,53,0.15)" : liveAIResult.severity === "High" ? "rgba(232,196,74,0.12)" : "rgba(76,175,80,0.12)", color: liveAIResult.severity === "Critical" ? "#e57373" : liveAIResult.severity === "High" ? "var(--gold)" : "var(--green-bright)", border: "1px solid currentColor", whiteSpace: "nowrap" }}>{liveAIResult.severity}</span>
                        </div>
                        <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.6, marginBottom: "0.6rem" }}>{liveAIResult.description}</p>
                        <div style={{ background: liveAIResult.severity === "Critical" ? "rgba(229,57,53,0.1)" : "rgba(76,175,80,0.08)", borderRadius: "0.5rem", padding: "0.5rem 0.75rem", fontSize: "0.8rem", fontWeight: 600, color: liveAIResult.severity === "Critical" ? "#e57373" : "var(--green-bright)" }}>⚡ {liveAIResult.urgency}</div>
                      </div>
                      {[
                        { title: "💊 Treatment", items: liveAIResult.treatment, color: "#4caf50" },
                        { title: "🛡️ Prevention", items: liveAIResult.prevention, color: "#42a5f5" },
                      ].map((section, si) => (
                        <div key={si} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "0.9rem", padding: "0.9rem 1rem" }}>
                          <div style={{ fontSize: "0.75rem", fontWeight: 700, color: section.color, marginBottom: "0.6rem" }}>{section.title}</div>
                          {section.items?.map((item, i) => (
                            <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.4rem" }}>
                              <span style={{ color: section.color, flexShrink: 0 }}>{i + 1}.</span>
                              <span style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)", lineHeight: 1.6 }}>{item}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* VACCINES TAB */}
              {liveTab === "vaccines" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  <div style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginBottom: "0.25rem" }}>Track upcoming and past vaccinations for all your animals.</div>
                  {livestock.map(animal => (
                    <div key={animal.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "0.9rem", padding: "0.9rem 1rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <span style={{ fontSize: "1.2rem" }}>{typeEmoji[animal.type] || "🐄"}</span>
                          <span style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--white)" }}>{animal.name}</span>
                        </div>
                        <span style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.35)" }}>{animal.breed}</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "0.5rem", padding: "0.5rem 0.7rem" }}>
                          <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", marginBottom: "0.15rem" }}>Last Vaccine</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--white)" }}>{animal.lastVaccine || "Not recorded"}</div>
                        </div>
                        <div style={{ background: animal.nextVaccine ? "rgba(232,196,74,0.06)" : "rgba(255,255,255,0.03)", border: animal.nextVaccine ? "1px solid rgba(232,196,74,0.2)" : "none", borderRadius: "0.5rem", padding: "0.5rem 0.7rem" }}>
                          <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", marginBottom: "0.15rem" }}>Next Vaccine Due</div>
                          <div style={{ fontSize: "0.8rem", color: animal.nextVaccine ? "var(--gold)" : "rgba(245,240,232,0.4)" }}>{animal.nextVaccine || "Not set"}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.8rem", padding: "0.9rem 1rem", fontSize: "0.78rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.6 }}>
                    💡 Common Kenya livestock vaccines: <strong style={{ color: "var(--green-bright)" }}>FMD</strong> (cattle, twice yearly), <strong style={{ color: "var(--green-bright)" }}>Newcastle</strong> (poultry, every 3 months), <strong style={{ color: "var(--green-bright)" }}>CCPP</strong> (goats, annually), <strong style={{ color: "var(--green-bright)" }}>Anthrax</strong> (cattle and goats, annually).
                  </div>
                </div>
              )}

            </div>
          </div>
        );
      })()}
      {/* ===== PLANTING CALENDAR ===== */}
      {activeTab === "calendar" && (() => {
        const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        const CALENDAR_DATA = {
          "Nakuru": {
            zone: "Upper Midland / Highland",
            rainfall: "Long Rains: Mar-May, Short Rains: Oct-Dec",
            crops: [
              { name: "Maize", emoji: "🌽", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Plant certified hybrid like H614D or DK8031. Use DAP at planting." },
              { name: "Wheat", emoji: "🌾", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Best in cool highland areas above 1800m. Use certified KWS varieties." },
              { name: "Potatoes", emoji: "🥔", longRains: { plant: [1,2], harvest: [4,5] }, shortRains: { plant: [9,10], harvest: [12,1] }, notes: "Use certified seed potato like Shangi. Apply Ridomil for blight prevention." },
              { name: "Beans", emoji: "🫘", longRains: { plant: [3,4], harvest: [5,6] }, shortRains: { plant: [10,11], harvest: [12,1] }, notes: "Intercrop with maize for best results. Good nitrogen fixation for soil." },
              { name: "Kale", emoji: "🥬", longRains: { plant: [2,3,4], harvest: [4,5,6] }, shortRains: { plant: [9,10,11], harvest: [11,12,1] }, notes: "Can be grown year round with irrigation. High demand in local markets." },
              { name: "Carrots", emoji: "🥕", longRains: { plant: [2,3], harvest: [5,6] }, shortRains: { plant: [9,10], harvest: [12,1] }, notes: "Needs well drained sandy loam soil. Thin seedlings to 5cm spacing." },
              { name: "Pyrethrum", emoji: "🌸", longRains: { plant: [3,4], harvest: [7,8,9] }, shortRains: { plant: [9,10], harvest: [1,2,3] }, notes: "Perennial crop. First harvest 6 months after planting. High value export crop." },
            ]
          },
          "Nairobi": {
            zone: "Upper Midland",
            rainfall: "Long Rains: Mar-May, Short Rains: Oct-Dec",
            crops: [
              { name: "Kale", emoji: "🥬", longRains: { plant: [2,3,4], harvest: [4,5,6] }, shortRains: { plant: [9,10,11], harvest: [11,12,1] }, notes: "High urban demand. Can be grown year round with drip irrigation." },
              { name: "Tomatoes", emoji: "🍅", longRains: { plant: [2,3], harvest: [5,6] }, shortRains: { plant: [9,10], harvest: [12,1] }, notes: "Use drip irrigation. Apply Ridomil for late blight control every 7 days." },
              { name: "Spinach", emoji: "🥬", longRains: { plant: [2,3,4,5], harvest: [4,5,6,7] }, shortRains: { plant: [9,10,11], harvest: [11,12,1,2] }, notes: "Fast growing, 30-40 days to harvest. High demand in city markets." },
              { name: "Maize", emoji: "🌽", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Mainly grown in peri-urban areas. Use high yield hybrid varieties." },
              { name: "Beans", emoji: "🫘", longRains: { plant: [3,4], harvest: [5,6] }, shortRains: { plant: [10,11], harvest: [12,1] }, notes: "High protein crop. Good for urban small scale farming." },
            ]
          },
          "Kisumu": {
            zone: "Lake Basin Lowland",
            rainfall: "Long Rains: Mar-May, Short Rains: Oct-Dec",
            crops: [
              { name: "Maize", emoji: "🌽", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Use varieties tolerant to Maize Lethal Necrosis. Avoid WEMA varieties in MLN zones." },
              { name: "Rice", emoji: "🍚", longRains: { plant: [3,4], harvest: [7,8] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Grows well in lowland flooded areas near the lake. Use Basmati 370 variety." },
              { name: "Sorghum", emoji: "🌾", longRains: { plant: [3,4], harvest: [7,8] }, shortRains: { plant: [10,11], harvest: [1,2] }, notes: "Drought tolerant. Good for areas with unreliable rainfall. Use Gadam variety." },
              { name: "Sweet Potato", emoji: "🍠", longRains: { plant: [3,4], harvest: [6,7] }, shortRains: { plant: [10,11], harvest: [1,2] }, notes: "Very adaptable to Lake Basin conditions. Orange fleshed varieties have high nutrition." },
              { name: "Sugarcane", emoji: "🎋", longRains: { plant: [3,4,5], harvest: [15,16,17] }, shortRains: { plant: [10,11], harvest: [22,23] }, notes: "Matures in 12-18 months. Plant near Mumias or West Kenya Sugar mills for ready market." },
              { name: "Beans", emoji: "🫘", longRains: { plant: [3,4], harvest: [5,6] }, shortRains: { plant: [10,11], harvest: [12,1] }, notes: "Popular in Lake Basin. Avoid planting in waterlogged soils." },
            ]
          },
          "Mombasa": {
            zone: "Coastal Lowland",
            rainfall: "Long Rains: Apr-Jun, Short Rains: Oct-Dec",
            crops: [
              { name: "Coconut", emoji: "🥥", longRains: { plant: [4,5], harvest: [48,49,50] }, shortRains: { plant: [10,11], harvest: [54,55] }, notes: "Takes 4-5 years to first harvest. Plant 8m spacing. High value coastal crop." },
              { name: "Cashew Nut", emoji: "🥜", longRains: { plant: [4,5], harvest: [9,10] }, shortRains: { plant: [10,11], harvest: [3,4] }, notes: "Plant at start of rains. First harvest after 3 years. Export market available." },
              { name: "Cassava", emoji: "🌿", longRains: { plant: [4,5], harvest: [10,11,12] }, shortRains: { plant: [10,11], harvest: [4,5,6] }, notes: "Very drought tolerant. Matures in 6-12 months. Good food security crop." },
              { name: "Mango", emoji: "🥭", longRains: { plant: [4,5], harvest: [10,11,12] }, shortRains: { plant: [10], harvest: [4,5] }, notes: "Apple and Tommy Atkins varieties have good market. Spray for fruit fly control." },
              { name: "Tomatoes", emoji: "🍅", longRains: { plant: [4,5], harvest: [7,8] }, shortRains: { plant: [9,10], harvest: [12,1] }, notes: "Use grafted seedlings on resistant rootstocks to manage bacterial wilt." },
              { name: "Cowpeas", emoji: "🫘", longRains: { plant: [4,5], harvest: [6,7] }, shortRains: { plant: [10,11], harvest: [12,1] }, notes: "Heat tolerant and drought resistant. Good protein source for coastal communities." },
            ]
          },
          "Eldoret": {
            zone: "Upper Highland",
            rainfall: "Long Rains: Mar-May, Short Rains: Oct-Nov",
            crops: [
              { name: "Wheat", emoji: "🌾", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Kenya breadbasket crop. Use KWSC certified seed. Apply fungicide for rust control." },
              { name: "Maize", emoji: "🌽", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Use cold tolerant varieties like DK8031. Apply CAN top dressing at knee height." },
              { name: "Sunflower", emoji: "🌻", longRains: { plant: [3,4], harvest: [7,8] }, shortRains: { plant: [10,11], harvest: [1,2] }, notes: "Good cash crop with ready oil mill market. Drought tolerant once established." },
              { name: "Soya Beans", emoji: "🫘", longRains: { plant: [3,4], harvest: [7,8] }, shortRains: { plant: [10,11], harvest: [1,2] }, notes: "High protein and nitrogen fixing. Good rotation crop after wheat or maize." },
              { name: "Potatoes", emoji: "🥔", longRains: { plant: [1,2], harvest: [4,5] }, shortRains: { plant: [9,10], harvest: [12,1] }, notes: "Highlands ideal for quality potato production. Use certified Shangi or Dutch Robjin." },
              { name: "Beans", emoji: "🫘", longRains: { plant: [3,4], harvest: [5,6] }, shortRains: { plant: [10,11], harvest: [12,1] }, notes: "Cool highland conditions favor bean quality. Rose Coco variety popular in markets." },
            ]
          },
          "Meru": {
            zone: "Upper Midland / Highland",
            rainfall: "Long Rains: Mar-May, Short Rains: Oct-Dec",
            crops: [
              { name: "Coffee", emoji: "☕", longRains: { plant: [3,4], harvest: [10,11,12] }, shortRains: { plant: [10,11], harvest: [4,5,6] }, notes: "Plant at start of long rains. First harvest after 2-3 years. Use Ruiru 11 for CBD resistance." },
              { name: "Miraa", emoji: "🌿", longRains: { plant: [3,4], harvest: [0] }, shortRains: { plant: [10,11], harvest: [0] }, notes: "Perennial crop, harvested weekly year round. High value export crop to Somalia and UK." },
              { name: "Avocado", emoji: "🥑", longRains: { plant: [3,4], harvest: [7,8,9] }, shortRains: { plant: [10,11], harvest: [1,2,3] }, notes: "Hass variety preferred for export. Takes 3-4 years to first harvest. High export value." },
              { name: "Maize", emoji: "🌽", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Use highland varieties. Intercrop with beans for soil health and income." },
              { name: "Beans", emoji: "🫘", longRains: { plant: [3,4], harvest: [5,6] }, shortRains: { plant: [10,11], harvest: [12,1] }, notes: "Good intercrop with coffee in early years. Rose Coco and Mwitemania popular varieties." },
              { name: "Bananas", emoji: "🍌", longRains: { plant: [3,4,5], harvest: [9,10,11] }, shortRains: { plant: [10,11], harvest: [4,5,6] }, notes: "Williams and Grand Naine varieties for export. Mulch heavily to retain soil moisture." },
            ]
          },
          "Nyeri": {
            zone: "Upper Highland",
            rainfall: "Long Rains: Mar-May, Short Rains: Oct-Dec",
            crops: [
              { name: "Tea", emoji: "🍵", longRains: { plant: [3,4], harvest: [0] }, shortRains: { plant: [10,11], harvest: [0] }, notes: "Perennial, plucked year round every 7-14 days. Plant clonal tea cuttings from KTDA." },
              { name: "Coffee", emoji: "☕", longRains: { plant: [3,4], harvest: [10,11,12] }, shortRains: { plant: [10,11], harvest: [4,5,6] }, notes: "SL28 and SL34 varieties produce premium Nyeri coffee. Apply zinc and boron for quality." },
              { name: "Macadamia", emoji: "🥜", longRains: { plant: [3,4], harvest: [7,8,9,10] }, shortRains: { plant: [10,11], harvest: [1,2,3] }, notes: "High value nut crop. First harvest 4-5 years. Process locally or sell to Macadamia processors." },
              { name: "Potatoes", emoji: "🥔", longRains: { plant: [1,2], harvest: [4,5] }, shortRains: { plant: [9,10], harvest: [12,1] }, notes: "Cool Nyeri highlands ideal for quality potato. Monitor for late blight closely." },
              { name: "Maize", emoji: "🌽", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Mainly for subsistence. Intercrop with beans to maximize land use." },
              { name: "Beans", emoji: "🫘", longRains: { plant: [3,4], harvest: [5,6] }, shortRains: { plant: [10,11], harvest: [12,1] }, notes: "High altitude beans have premium taste. Rose Coco variety fetches good prices." },
            ]
          },
          "Kisii": {
            zone: "Highland",
            rainfall: "Bimodal, relatively reliable year round",
            crops: [
              { name: "Tea", emoji: "🍵", longRains: { plant: [3,4], harvest: [0] }, shortRains: { plant: [10,11], harvest: [0] }, notes: "Kisii highlands ideal for quality tea. KTDA manages most outgrower factories." },
              { name: "Maize", emoji: "🌽", longRains: { plant: [2,3], harvest: [6,7] }, shortRains: { plant: [9,10], harvest: [1,2] }, notes: "Densely populated area, small holdings. Maximize yield with H614D hybrid." },
              { name: "Bananas", emoji: "🍌", longRains: { plant: [3,4,5], harvest: [9,10,11] }, shortRains: { plant: [10,11], harvest: [4,5,6] }, notes: "Major banana growing region. Tissue culture bananas give best yields. Plant 3x3m spacing." },
              { name: "Avocado", emoji: "🥑", longRains: { plant: [3,4], harvest: [7,8,9] }, shortRains: { plant: [10,11], harvest: [1,2,3] }, notes: "Hass variety has strong export demand. Train trees to open canopy for better yields." },
              { name: "Beans", emoji: "🫘", longRains: { plant: [3,4], harvest: [5,6] }, shortRains: { plant: [10,11], harvest: [12,1] }, notes: "Good rotation crop with maize. Helps fix nitrogen and improve soil fertility." },
              { name: "Sorghum", emoji: "🌾", longRains: { plant: [3,4], harvest: [7,8] }, shortRains: { plant: [10,11], harvest: [1,2] }, notes: "Grown in drier parts of Kisii. Traditional crop with strong local market." },
            ]
          },
        };

        const counties47 = ["Baringo","Bomet","Bungoma","Busia","Elgeyo Marakwet","Embu","Garissa","Homa Bay","Isiolo","Kajiado","Kakamega","Kericho","Kiambu","Kilifi","Kirinyaga","Kisii","Kisumu","Kitui","Kwale","Laikipia","Lamu","Machakos","Makueni","Mandera","Marsabit","Meru","Migori","Mombasa","Murang'a","Nairobi","Nakuru","Nandi","Narok","Nyamira","Nyandarua","Nyeri","Samburu","Siaya","Taita Taveta","Tana River","Tharaka Nithi","Trans Nzoia","Turkana","Uasin Gishu","Vihiga","Wajir","West Pokot"];

        const calData = CALENDAR_DATA[calCounty] || CALENDAR_DATA["Nakuru"];
        const crops = calData.crops;
        const filteredCrops = calCrop === "All" ? crops : crops.filter(c => c.name === calCrop);
        const currentMonth = new Date().getMonth();

        const getMonthStatus = (crop, monthIdx) => {
          const season = crop.longRains;
          const shortSeason = crop.shortRains;
          const inLongPlant = season.plant.includes(monthIdx);
          const inLongHarvest = season.harvest.map(m => m % 12).includes(monthIdx);
          const inShortPlant = shortSeason.plant.includes(monthIdx);
          const inShortHarvest = shortSeason.harvest.map(m => m % 12).includes(monthIdx);
          if (inLongPlant || inShortPlant) return "plant";
          if (inLongHarvest || inShortHarvest) return "harvest";
          const inGrowLong = monthIdx > Math.min(...season.plant) && monthIdx < Math.max(...season.harvest.map(m => m % 12));
          const inGrowShort = monthIdx > Math.min(...shortSeason.plant) && monthIdx < Math.max(...shortSeason.harvest.map(m => m % 12));
          if (inGrowLong || inGrowShort) return "grow";
          return "none";
        };

        const statusStyle = {
          plant:   { bg: "rgba(76,175,80,0.7)",   label: "🌱 Plant" },
          harvest: { bg: "rgba(232,196,74,0.7)",  label: "🌾 Harvest" },
          grow:    { bg: "rgba(76,175,80,0.2)",   label: "" },
          none:    { bg: "transparent",            label: "" },
        };

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

              {/* HEADER */}
              <div style={{ marginBottom: "1.2rem" }}>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Season Planning</div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>Planting <span style={{ color: "var(--gold)" }}>Calendar</span></h1>
                <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginTop: "0.3rem" }}>Know exactly when to plant and harvest in your county.</p>
              </div>

              {/* COUNTY + CROP FILTERS */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>County</label>
                  <select value={calCounty} onChange={e => { setCalCounty(e.target.value); setCalCrop("All"); }} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.25)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--green-bright)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                    {counties47.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.7rem", color: "rgba(245,240,232,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: "0.4rem" }}>Filter Crop</label>
                  <select value={calCrop} onChange={e => setCalCrop(e.target.value)} style={{ width: "100%", background: "rgba(15,31,18,0.95)", border: "1px solid rgba(76,175,80,0.2)", borderRadius: "0.6rem", padding: "0.6rem 0.8rem", color: "var(--cream)", fontSize: "0.85rem", fontFamily: "'DM Sans', sans-serif", outline: "none" }}>
                    <option value="All">All Crops</option>
                    {crops.map(c => <option key={c.name} value={c.name}>{c.emoji} {c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* ZONE INFO */}
              <div style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.12)", borderRadius: "0.8rem", padding: "0.75rem 1rem", marginBottom: "1.2rem", display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--green-bright)", fontWeight: 600 }}>📍 {calCounty}</span>
                <span style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.5)" }}>Zone: {calData.zone}</span>
                <span style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)" }}>· {calData.rainfall}</span>
              </div>

              {/* LEGEND */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                {[
                  { color: "rgba(76,175,80,0.7)", label: "Planting time" },
                  { color: "rgba(76,175,80,0.2)", label: "Growing period" },
                  { color: "rgba(232,196,74,0.7)", label: "Harvest time" },
                  { color: "rgba(100,180,255,0.5)", label: "Current month" },
                ].map((l, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "0.25rem", background: l.color }} />
                    <span style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.5)" }}>{l.label}</span>
                  </div>
                ))}
              </div>

              {/* CALENDAR GRID */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.1)", borderRadius: "1rem", overflow: "hidden", marginBottom: "1.5rem" }}>
                {/* MONTH HEADERS */}
                <div style={{ display: "grid", gridTemplateColumns: "100px repeat(12, 1fr)", background: "rgba(76,175,80,0.05)", borderBottom: "1px solid rgba(76,175,80,0.1)" }}>
                  <div style={{ padding: "0.5rem 0.6rem", fontSize: "0.65rem", color: "rgba(245,240,232,0.4)" }}>Crop</div>
                  {MONTHS.map((m, i) => (
                    <div key={m} style={{ padding: "0.5rem 0.1rem", textAlign: "center", fontSize: "0.6rem", color: i === currentMonth ? "var(--green-bright)" : "rgba(245,240,232,0.4)", fontWeight: i === currentMonth ? 700 : 400, background: i === currentMonth ? "rgba(76,175,80,0.08)" : "transparent" }}>{m}</div>
                  ))}
                </div>

                {/* CROP ROWS */}
                {filteredCrops.map((crop, ci) => (
                  <div key={ci} style={{ display: "grid", gridTemplateColumns: "100px repeat(12, 1fr)", borderBottom: ci < filteredCrops.length - 1 ? "1px solid rgba(76,175,80,0.06)" : "none" }}>
                    <div style={{ padding: "0.6rem", display: "flex", alignItems: "center", gap: "0.3rem", borderRight: "1px solid rgba(76,175,80,0.08)" }}>
                      <span style={{ fontSize: "1rem" }}>{crop.emoji}</span>
                      <span style={{ fontSize: "0.68rem", color: "var(--white)", fontWeight: 500, lineHeight: 1.2 }}>{crop.name}</span>
                    </div>
                    {MONTHS.map((m, mi) => {
                      const status = getMonthStatus(crop, mi);
                      const style = statusStyle[status];
                      return (
                        <div key={mi} style={{ background: mi === currentMonth ? `rgba(100,180,255,0.08)` : "transparent", borderLeft: mi === currentMonth ? "1px solid rgba(100,180,255,0.2)" : "none", borderRight: mi === currentMonth ? "1px solid rgba(100,180,255,0.2)" : "none", padding: "0.3rem 0.1rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {status !== "none" && (
                            <div style={{ width: "90%", height: 18, borderRadius: "0.25rem", background: style.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontSize: "0.55rem" }}>{style.label}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* CROP NOTES */}
              <div>
                <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>Farming Tips for {calCounty}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {filteredCrops.map((crop, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(76,175,80,0.08)", borderRadius: "0.8rem", padding: "0.85rem 1rem", display: "flex", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{crop.emoji}</span>
                      <div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--white)", marginBottom: "0.2rem" }}>{crop.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.6 }}>{crop.notes}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        );
      })()}
      {/* ===== FARM NEWS FEED ===== */}
      {activeTab === "news" && (() => {

        const STATIC_NEWS = [
          {
            id: 1, category: "Policy", tag: "Government", urgent: true,
            title: "Kenya Government Increases Fertilizer Subsidy for 2025 Season",
            summary: "The Ministry of Agriculture has announced an increase in fertilizer subsidies for smallholder farmers ahead of the long rains season. DAP and CAN prices will be capped at KSh 2,500 per 50kg bag.",
            body: "The Cabinet Secretary for Agriculture confirmed that over 500,000 farmers will benefit from the expanded subsidy program. Farmers can access subsidized inputs through registered agro-dealers and co-operative societies. Registration is open until March 15th. Farmers are required to present their national ID and farm registration certificate to qualify.",
            source: "Ministry of Agriculture Kenya", time: "2 hours ago", readTime: "3 min read", emoji: "🏛️",
            tags: ["Fertilizer", "Subsidy", "Policy"]
          },
          {
            id: 2, category: "Prices", tag: "Market Alert", urgent: true,
            title: "Maize Prices Hit 5-Year High at Wakulima Market",
            summary: "Maize prices have surged to KSh 3,800 per 90kg bag at Wakulima Market in Nairobi, driven by reduced supply from the North Rift region following erratic rains last season.",
            body: "Traders at Wakulima report that maize arrivals from Trans Nzoia and Uasin Gishu counties have dropped by 40% compared to the same period last year. Analysts warn that prices could rise further if the long rains underperform. The National Cereals and Produce Board (NCPB) has announced it will release strategic grain reserves to stabilize prices. Farmers who have stored maize are advised to sell gradually rather than flooding the market.",
            source: "Kenya Grain Traders Association", time: "5 hours ago", readTime: "4 min read", emoji: "📈",
            tags: ["Maize", "Prices", "Market"]
          },
          {
            id: 3, category: "Weather", tag: "Alert", urgent: true,
            title: "Kenya Meteorological Department Forecasts Above Normal Long Rains",
            summary: "KMD predicts above normal rainfall for March to May 2025 across most counties. Farmers in Central, Rift Valley and Western regions advised to prepare early.",
            body: "The Kenya Meteorological Department seasonal forecast indicates a 60% probability of above normal rainfall during the March to May 2025 long rains season. This is attributed to the continued influence of the Indian Ocean Dipole and La Nina conditions. Counties expected to receive the highest rainfall include Nyeri, Nakuru, Trans Nzoia, Kakamega and Kisii. Farmers are advised to ensure proper field drainage, plant early maturing crop varieties and pre-position inputs before the rains begin. Flood-prone areas in Tana River, Garissa and Busia should prepare accordingly.",
            source: "Kenya Meteorological Department", time: "1 day ago", readTime: "5 min read", emoji: "🌧️",
            tags: ["Weather", "Long Rains", "Forecast"]
          },
          {
            id: 4, category: "Disease", tag: "Warning", urgent: true,
            title: "Fall Armyworm Outbreak Reported in Western Kenya Counties",
            summary: "Extension officers in Kakamega, Bungoma and Trans Nzoia have reported a new outbreak of Fall Armyworm affecting maize crops. Farmers urged to scout fields daily.",
            body: "The Fall Armyworm (Spodoptera frugiperda) has been confirmed in maize fields across 8 sub-counties in Western Kenya. The pest, which can destroy an entire field within days if untreated, has caused losses of up to 70% in some farms. Recommended control measures include early morning scouting, application of Coragen or Dipel biopesticide, and planting push-pull companion crops like Napier grass and Desmodium. Farmers are advised to contact their nearest extension officer for free pesticide samples available through the national response program.",
            source: "KALRO Extension Services", time: "1 day ago", readTime: "5 min read", emoji: "🐛",
            tags: ["Disease", "Maize", "Pest Control"]
          },
          {
            id: 5, category: "Export", tag: "Opportunity", urgent: false,
            title: "EU Opens New Market for Kenyan Avocado Exports",
            summary: "The European Union has approved Kenya as a certified source of organic avocados following a 2-year audit. Hass avocado farmers in Murang'a and Meru counties stand to benefit.",
            body: "The EU market approval means Kenyan avocado exporters can now access premium prices of up to KSh 250 per kg for certified organic Hass avocados. The approval covers farms in Murang'a, Meru, Kirinyaga and Embu counties that have received GlobalGAP certification. Farmers interested in joining the export program should contact the Horticultural Crops Directorate or registered exporters like Kakuzi and Sunripe. The avocado export season runs from February to September.",
            source: "Horticultural Crops Directorate", time: "2 days ago", readTime: "4 min read", emoji: "🥑",
            tags: ["Avocado", "Export", "Opportunity"]
          },
          {
            id: 6, category: "Technology", tag: "Innovation", urgent: false,
            title: "KALRO Releases New Drought-Tolerant Maize Varieties for ASAL Counties",
            summary: "The Kenya Agricultural and Livestock Research Organization has released 4 new drought-tolerant maize varieties suitable for arid and semi-arid areas receiving as little as 300mm of rainfall.",
            body: "The four new varieties, named KALRO DT1 through DT4, mature in 75-90 days and can yield up to 15 bags per acre under minimal rainfall. They are targeted at farmers in Machakos, Makueni, Kitui, Tharaka Nithi and other ASAL counties where conventional maize struggles. Certified seed will be available from KALRO seed outlets and registered agro-dealers starting March 2025. The seed costs KSh 350 per 2kg packet and is available in most county agro-vet shops.",
            source: "KALRO Press Release", time: "3 days ago", readTime: "4 min read", emoji: "🌽",
            tags: ["Maize", "Seeds", "ASAL", "Technology"]
          },
          {
            id: 7, category: "Finance", tag: "Loans", urgent: false,
            title: "Equity Bank Launches KSh 5 Billion Agri-Loan Fund for Smallholders",
            summary: "Equity Bank has unveiled a new agricultural loan product targeting smallholder farmers with loans from KSh 5,000 to KSh 500,000 at 10% interest per year with flexible repayment.",
            body: "The Equity Kilimo loan product does not require land title as collateral. Farmers can borrow against expected produce, livestock, or co-operative membership. Repayment is structured to align with harvest seasons. To qualify, farmers need a registered mobile money account, farm registration certificate, and at least 6 months of transaction history. Applications can be made through the Equity mobile app, Equity agents, or branch offices. The fund is backed by a KSh 2 billion guarantee from the Kenya Guarantee Fund.",
            source: "Equity Bank Kenya", time: "4 days ago", readTime: "3 min read", emoji: "💰",
            tags: ["Finance", "Loans", "Banks"]
          },
          {
            id: 8, category: "Livestock", tag: "Health Alert", urgent: false,
            title: "FMD Vaccination Drive Kicks Off in Rift Valley Counties",
            summary: "The government has launched a free Foot and Mouth Disease vaccination campaign covering over 2 million cattle in Narok, Kajiado, Nakuru and Baringo counties.",
            body: "The Ministry of Agriculture and Kenya Veterinary Board have deployed over 500 veterinary officers and community animal health workers for the 3-week vaccination exercise. Farmers do not need to move their animals. Vaccination teams will visit farms directly. All cattle should be registered with the local county livestock office to receive the free vaccine. Animals that were vaccinated over 6 months ago should be revaccinated. Contact your nearest DVS office for the schedule in your area.",
            source: "Department of Veterinary Services", time: "5 days ago", readTime: "3 min read", emoji: "🐄",
            tags: ["Livestock", "FMD", "Vaccination"]
          },
        ];

        const categories = ["All", "Policy", "Prices", "Weather", "Disease", "Export", "Technology", "Finance", "Livestock"];
        const filtered = STATIC_NEWS.filter(n => newsCategory === "All" || n.category === newsCategory);

        const catColors = {
          "Policy": "#42a5f5", "Prices": "#e8c44a", "Weather": "#4fc3f7",
          "Disease": "#ef5350", "Export": "#66bb6a", "Technology": "#ab47bc",
          "Finance": "#26a69a", "Livestock": "#ff7043"
        };

        const fetchAINews = async () => {
          setNewsLoading(true);
          try {
            const res = await fetch("https://api.anthropic.com/v1/messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1000,
                system: "You are a Kenya agricultural news expert. Generate realistic, practical farming news relevant to Kenyan farmers today. Return ONLY a JSON array of 3 news items. Each item must have: title (string), summary (string, 2 sentences), category (one of: Policy/Prices/Weather/Disease/Export/Technology/Finance/Livestock), emoji (relevant emoji), tags (array of 3 strings). No markdown, raw JSON only.",
                messages: [{ role: "user", content: "Generate 3 current Kenya farming news headlines for today that would be most useful for smallholder farmers. Make them realistic and practical." }]
              })
            });
            const data = await res.json();
            const text = data.content?.[0]?.text || "[]";
            setAiNews(JSON.parse(text.replace(/```json|```/g, "").trim()));
          } catch { setAiNews(null); }
          finally { setNewsLoading(false); }
        };

        return (
          <div style={{ paddingTop: "110px", minHeight: "100vh" }}>
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "1.5rem 1.2rem" }}>

              {!openNews ? (
                <>
                  {/* HEADER */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                    <div>
                      <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Latest Updates</div>
                      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 900, color: "var(--white)", lineHeight: 1.1 }}>Farm <span style={{ color: "var(--gold)" }}>News</span></h1>
                    </div>
                    <button onClick={fetchAINews} disabled={newsLoading} style={{ background: newsLoading ? "rgba(76,175,80,0.1)" : "rgba(76,175,80,0.15)", border: "1px solid rgba(76,175,80,0.3)", borderRadius: "0.75rem", padding: "0.6rem 0.9rem", color: newsLoading ? "rgba(76,175,80,0.5)" : "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.78rem", cursor: newsLoading ? "not-allowed" : "pointer", whiteSpace: "nowrap", flexShrink: 0 }}>
                      {newsLoading ? "Loading..." : "🤖 AI News"}
                    </button>
                  </div>

                  {/* URGENT ALERTS */}
                  {filtered.some(n => n.urgent) && (
                    <div style={{ background: "rgba(229,57,53,0.06)", border: "1px solid rgba(229,57,53,0.2)", borderRadius: "0.9rem", padding: "0.75rem 1rem", marginBottom: "1rem", display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "1rem", flexShrink: 0 }}>🚨</span>
                      <div>
                        <div style={{ fontSize: "0.72rem", color: "#e57373", fontWeight: 700, marginBottom: "0.2rem" }}>URGENT ALERTS</div>
                        <div style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.6)" }}>{filtered.filter(n => n.urgent).length} urgent updates require your attention today.</div>
                      </div>
                    </div>
                  )}

                  {/* AI NEWS */}
                  {aiNews && (
                    <div style={{ marginBottom: "1.2rem" }}>
                      <div style={{ fontSize: "0.72rem", color: "var(--green-bright)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.6rem" }}>🤖 AI Generated Updates</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                        {aiNews.map((n, i) => (
                          <div key={i} style={{ background: "rgba(76,175,80,0.05)", border: "1px solid rgba(76,175,80,0.15)", borderRadius: "0.9rem", padding: "0.9rem 1rem" }}>
                            <div style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.4rem" }}>
                              <span style={{ fontSize: "1.2rem", flexShrink: 0 }}>{n.emoji}</span>
                              <div>
                                <span style={{ fontSize: "0.62rem", background: `${catColors[n.category] || "#4caf50"}22`, color: catColors[n.category] || "var(--green-bright)", border: `1px solid ${catColors[n.category] || "#4caf50"}44`, borderRadius: "1rem", padding: "0.1rem 0.5rem", marginBottom: "0.3rem", display: "inline-block" }}>{n.category}</span>
                                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--white)", lineHeight: 1.3, marginTop: "0.2rem" }}>{n.title}</div>
                              </div>
                            </div>
                            <p style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.55)", lineHeight: 1.6, marginLeft: "1.7rem" }}>{n.summary}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CATEGORY FILTER */}
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.2rem", overflowX: "auto", paddingBottom: "0.25rem" }}>
                    {categories.map(cat => (
                      <button key={cat} onClick={() => setNewsCategory(cat)} style={{ padding: "0.3rem 0.75rem", borderRadius: "2rem", border: `1px solid ${newsCategory === cat ? (catColors[cat] || "var(--green-bright)") : "rgba(76,175,80,0.15)"}`, background: newsCategory === cat ? `${catColors[cat] || "rgba(76,175,80,0.15)"}22` : "transparent", color: newsCategory === cat ? (catColors[cat] || "var(--green-bright)") : "rgba(245,240,232,0.5)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0 }}>{cat}</button>
                    ))}
                  </div>

                  {/* NEWS LIST */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {filtered.map(news => (
                      <div key={news.id} onClick={() => setOpenNews(news)} style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${news.urgent ? "rgba(229,57,53,0.2)" : "rgba(76,175,80,0.1)"}`, borderRadius: "1rem", padding: "1rem 1.1rem", cursor: "pointer", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flex: 1, minWidth: 0 }}>
                            <span style={{ fontSize: "1.3rem", flexShrink: 0 }}>{news.emoji}</span>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                                <span style={{ fontSize: "0.62rem", background: `${catColors[news.category] || "#4caf50"}22`, color: catColors[news.category] || "var(--green-bright)", border: `1px solid ${catColors[news.category] || "#4caf50"}44`, borderRadius: "1rem", padding: "0.1rem 0.5rem", whiteSpace: "nowrap" }}>{news.category}</span>
                                {news.urgent && <span style={{ fontSize: "0.6rem", background: "rgba(229,57,53,0.12)", color: "#e57373", border: "1px solid rgba(229,57,53,0.25)", borderRadius: "1rem", padding: "0.1rem 0.5rem" }}>🚨 Urgent</span>}
                              </div>
                              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--white)", lineHeight: 1.3 }}>{news.title}</div>
                            </div>
                          </div>
                        </div>
                        <p style={{ fontSize: "0.78rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.5, marginBottom: "0.5rem", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{news.summary}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.3)" }}>{news.source}</span>
                          <div style={{ display: "flex", gap: "0.75rem" }}>
                            <span style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.3)" }}>{news.readTime}</span>
                            <span style={{ fontSize: "0.65rem", color: "rgba(245,240,232,0.3)" }}>{news.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* NEWS DETAIL */
                <>
                  <button onClick={() => setOpenNews(null)} style={{ background: "none", border: "none", color: "var(--green-bright)", fontFamily: "'DM Sans', sans-serif", fontSize: "0.85rem", cursor: "pointer", marginBottom: "1rem", padding: 0, display: "flex", alignItems: "center", gap: "0.3rem" }}>← Back to News</button>

                  <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${openNews.urgent ? "rgba(229,57,53,0.2)" : "rgba(76,175,80,0.12)"}`, borderRadius: "1.2rem", padding: "1.3rem", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.65rem", background: `${catColors[openNews.category] || "#4caf50"}22`, color: catColors[openNews.category] || "var(--green-bright)", border: `1px solid ${catColors[openNews.category] || "#4caf50"}44`, borderRadius: "1rem", padding: "0.2rem 0.6rem" }}>{openNews.category}</span>
                      {openNews.urgent && <span style={{ fontSize: "0.62rem", background: "rgba(229,57,53,0.12)", color: "#e57373", border: "1px solid rgba(229,57,53,0.25)", borderRadius: "1rem", padding: "0.2rem 0.6rem" }}>🚨 Urgent</span>}
                      {openNews.tags.map((tag, i) => <span key={i} style={{ fontSize: "0.62rem", background: "rgba(255,255,255,0.05)", color: "rgba(245,240,232,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "0.2rem 0.6rem" }}>#{tag}</span>)}
                    </div>
                    <div style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>{openNews.emoji}</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "var(--white)", lineHeight: 1.3, marginBottom: "0.75rem" }}>{openNews.title}</h2>
                    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", fontSize: "0.7rem", color: "rgba(245,240,232,0.35)" }}>
                      <span>📰 {openNews.source}</span>
                      <span>🕒 {openNews.time}</span>
                      <span>📖 {openNews.readTime}</span>
                    </div>
                    <p style={{ fontSize: "0.88rem", color: "rgba(245,240,232,0.7)", lineHeight: 1.8, marginBottom: "1rem", fontWeight: 500 }}>{openNews.summary}</p>
                    <p style={{ fontSize: "0.85rem", color: "rgba(245,240,232,0.6)", lineHeight: 1.8 }}>{openNews.body}</p>
                  </div>

                  <button onClick={() => { setActiveTab("home"); }} style={{ width: "100%", padding: "0.8rem", borderRadius: "0.75rem", border: "none", background: "var(--green-bright)", color: "var(--dark)", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer" }}>
                    🌱 Discuss this with agu.ai
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })()}
    </>
  );
}
