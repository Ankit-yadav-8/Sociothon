# EcoLoop — AI-Driven Smart Waste Recovery & Recycling Marketplace ♻️

An enterprise-grade, tactile Neomorphic Progressive Web Application (PWA) designed for circular economy waste management, instant financial incentives, and regulatory compliance under India's Extended Producer Responsibility (CPCB EPR) framework.

---

## 🌟 Key Innovations & Architecture

```
 [User Finds Waste] 
        │
        ▼
 [Scans Station QR Code / Opens AI Camera] 
        │
        ▼
 [Real-Time Edge AI Waste Analysis] (YOLOE-26 + 47-Category PWVO Ontology)
        │
        ▼
 [Neomorphic Tactile Guidance Card] ("Wash, Cap Off, & Place in Bin A")
        │
        ▼
 [User Sorting & Smart Bin Deposit] (Digital Scale Weighing & Confidence Gating)
        │
        ▼
 [Portal Log & Instant Reward Settlement] (UPI / Green Points & CPCB EPR Trace)
```

1. **Station Pairing via QR Code**: Physical QR code pairing for smart bin stations and community waste banks with live GPS validation (e.g. *Potheri Ward 3 Waste Bank - Station #04*).
2. **Real-Time Edge AI Waste Classification**: Lightweight open-vocabulary instance segmentation using **YOLOE-26** and the **47-category Plastic Waste Vocabulary Ontology (PWVO)** analyzing material streams in `<440ms` completely offline.
3. **Tactile Neomorphic (Soft UI) Interface**: Built with high-fidelity soft light/dark shadows (`#E0E5EC` base, extruded `#FFFFFF` / `#A3B1C6` elevation, and inset concave wells) for realistic physical affordances.
4. **Interactive Step-by-Step Guidance Card**: Clear instructions on cap removal, contamination washing, compaction, and slot sorting with live market yields (pts/kg and ₹/kg).
5. **Integrated Digital Scale & Confidence Gating**: Weight logging with automated threshold gating ($\ge 0.40$ auto-accepted; $<0.40$ triggers human operator review).
6. **CPCB EPR Provenance Ledger**: Automatically generates machine-verifiable JSON trace records containing `event_id`, `gps`, `timestamp`, `depositor_id`, `pwvo_class`, `mass_g`, and cryptographic hash matching Central Pollution Control Board (CPCB) standards.

---

## 👥 Multi-Role Consoles & Dashboards

- 🛡️ **Admin Dashboard**: System-wide throughput analytics, regional performance tracking, diversion KPIs, and volunteer leaderboards.
- 🏢 **NGO Partner Dashboard**: Community campaign drives, volunteer dispatching, and environmental impact meters (trees saved, CO₂e abatement, water conserved).
- 🚚 **Volunteer & Hauler Console**: Route navigation, digital scale Bluetooth sync, doorstep collection scheduling, and customer OTP authentication.
- 🎓 **Hostel & Institutional Dashboard**: Commercial kitchen mess food waste tracking with above-bin optical recognition (Orbisk / Winnow Vision inspired), "Surprise Bags" food rescue (Too Good To Go inspired), and on-site thermomechanical dehydration (Mill Recycler).
- 📦 **B2B Commodity Marketplace**: Secondary raw material trading (Scrapo-grade), real-time competitive e-auctions, and transparent price discovery.
- ⚙️ **MRF & Telematics Tracking**: High-speed conveyor belt multi-spectral optical sorting (Greyparrot Analyzer simulation) with pneumatic air jet zones and fleet GPS tracking.
- 📜 **EPR Credits Registry**: Official CPCB credit trading, statutory brand compliance offsetting, and auditable JSON trace export.

---

## 🚀 Tech Stack

- **Frontend**: React 19, Vite 8, React Router v7
- **Design System**: Custom Neomorphic Soft UI & Tactile Elevation System with Dark/Light Theme Switching
- **Computer Vision & AI Simulation**: YOLOE-26 Edge Neural Net logic, 47-class PWVO Ontology
- **Data Visualization**: Chart.js, React-ChartJS-2
- **Icons**: Lucide Icons
- **Notifications**: React Hot Toast

---

## 💻 Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Ankit-yadav-8/Sociothon.git
cd Sociothon

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📄 License & Hackathon Context

Built for the **Sociothon / Recycling & Waste-to-Resource Solutions Challenge**.
© 2026 EcoLoop. Dedicated to building a sustainable, circular India.
