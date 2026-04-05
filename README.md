# 🌱 agu.ai by Agunextech

> AI-powered farming assistant for Kenyan farmers on WhatsApp

[![Version](https://img.shields.io/badge/version-9.0.0-green)](https://github.com/agunextech/agu-ai)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Made in Kenya](https://img.shields.io/badge/Made%20in-Kenya%20🇰🇪-red)](https://agu.ai)

---

## What is agu.ai?

agu.ai connects Kenyan farmers to real-time crop advice, market prices, weather alerts and more, right in their WhatsApp inbox. Built by Agunextech, it serves smallholder farmers across all 47 Kenya counties in both English and Kiswahili.

---

## Features

| Feature | Description |
|---|---|
| 💬 AI Chat | Live farming advice via WhatsApp and web chat |
| 💰 Market Prices | Crop prices from all 47 Kenya counties |
| 🌦️ Weather Alerts | County-specific forecasts and farming advice |
| 🗓️ Planting Calendar | When to plant and harvest by county |
| 🌿 Disease Encyclopedia | 12+ crop diseases with treatment guides |
| 🧮 Farm Calculator | Yield, profit, budget and break-even tools |
| 🌍 Soil Health Checker | AI-powered soil analysis and fertilizer advice |
| 🐄 Livestock Tracker | Herd management, AI diagnosis and vaccine tracker |
| 🏪 Agro-Vet Locator | Find farm inputs near you by county |
| 📰 Farm News | Latest Kenya agriculture news and alerts |
| 💬 Community Forum | Farmer discussion boards |
| 👤 Farmer Profile | Personalized profile and crop watchlist |
| 🔐 Admin Dashboard | Protected analytics and conversation management |

---

## Tech Stack

```
Frontend:   React 18, Recharts, CSS-in-JS
Backend:    Node.js, Express, Twilio WhatsApp API
AI:         Python, Flask, Anthropic Claude API
Database:   MongoDB Atlas
Hosting:    Vercel (frontend), Railway (backend), Render (Python)
```

---

## Project Structure

```
agu-ai/
├── src/
│   └── App.jsx              # Main React frontend (v9)
├── backend/
│   ├── server.js            # Node.js WhatsApp webhook
│   ├── ai_service.py        # Python AI service
│   ├── package.json         # Node dependencies
│   └── requirements.txt     # Python dependencies
├── public/
│   └── index.html
├── .env.example             # Environment variables template
├── .gitignore
├── vercel.json              # Vercel deployment config
└── README.md
```

---

## Quick Start

### 1. Clone the repo
```bash
git clone https://github.com/agunextech/agu-ai.git
cd agu-ai
```

### 2. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your real API keys
```

### 3. Install and run frontend
```bash
npm install
npm start
# Opens at http://localhost:3000
```

### 4. Run backend services
```bash
# Terminal 1 - Node.js
cd backend
npm install
npm start

# Terminal 2 - Python AI
pip install -r backend/requirements.txt
python backend/ai_service.py
```

---

## Deployment

### Frontend to Vercel (free)
```bash
npm install -g vercel
vercel login
vercel --prod
```
Add your `REACT_APP_ANTHROPIC_API_KEY` in Vercel dashboard under Settings, then Environment Variables.

### Backend to Railway (free tier)
1. Go to railway.app and sign up
2. New Project, then Deploy from GitHub repo
3. Select the backend folder
4. Add all environment variables from .env.example
5. Railway auto-deploys on every git push

### Python service to Render (free tier)
1. Go to render.com and sign up
2. New Web Service, connect GitHub
3. Build command: `pip install -r requirements.txt`
4. Start command: `python ai_service.py`
5. Add `ANTHROPIC_API_KEY` in environment variables

---

## Making Data Live

Once deployed, replace placeholder data with real sources:

| Data | Current | Live Source |
|---|---|---|
| Crop prices | Static estimates | WFP VAM API or KALRO data |
| Weather | Static forecasts | Kenya Meteorological Dept API |
| Farm news | Static articles | Scrape Ministry of Agriculture website |
| Agro-vet locations | Static listings | Google Places API or crowdsourced |
| AI responses | Live (Anthropic API) | Already live! |

---

## Admin Access

Default credentials for demo (change in production):
- Email: `admin@agu.ai`
- Password: `agunextech2024`

**Important:** Change the admin credentials in your `.env` file before deploying to production.

---

## WhatsApp Setup (Twilio)

1. Sign up at twilio.com
2. Go to Messaging, then Try it out, then Send a WhatsApp message
3. Set webhook URL to: `https://your-railway-url.railway.app/webhook/whatsapp`
4. Save your Twilio credentials in `.env`
5. Farmers save your Twilio sandbox number and start chatting

For production, apply for a dedicated WhatsApp Business number through Meta.

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## License

MIT License. Built with pride in Kenya by Agunextech 🇰🇪

---

## Contact

- Website: agu.ai
- Email: hello@agu.ai
- WhatsApp: +254 700 000 000
- Twitter: @aguai_kenya
