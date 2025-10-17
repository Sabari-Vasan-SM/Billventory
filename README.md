## Billventory
An all-in-one digital solution that streamlines the retail experience by integrating inventory control, billing, and sales management into a single platform.

<div align="center">
	<img src="public/favicon.png" alt="Billventory Logo" width="120" />
  
</div>

---

## ✨ Features

- 🔐 **Authentication**: Secure login with session management
- 🧭 **Dashboard**: Modern navigation, animated transitions, and user profile
- 📦 **Products**: Add, edit, delete, and search products with real-time inventory updates
- 💳 **Billing**: Cart management, customer details, PDF/printable invoice, UPI QR code, and payment modal
- 📊 **Reports**: Sales analytics, date range filters, statistics cards, and transaction history with modal details
- 🛒 **Online Orders**: Real-time order management with delete and status updates
- ⌨️ **Loading Screen**: Animated typewriter loader for a professional first impression
- 🎨 **Design System**: Consistent colors, typography, spacing, border radius, and shadows across all components
- 📱 **Responsive**: Fully mobile-friendly and desktop-optimized

## 🛠️ Tech Stack

- ⚛️ **Frontend**: React 18+, Framer Motion, styled-components
- 🟩 **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- 🧾 **PDF/Print**: jsPDF, jspdf-autotable, react-to-print
- 🔳 **QR Code**: qrcode.react
- 🎨 **Styling**: Custom design system ([`src/styles/designSystem.js`](src/styles/designSystem.js))

## 📁 Folder Structure

```text
Billventory/
├── public/
│   ├── favicon.png
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js
│   ├── components/
│   │   ├── Billing.js
│   │   ├── Dashboard.js
│   │   ├── Loader.js
│   │   ├── Login.js
│   │   ├── OnlineOrders.js
│   │   ├── Products.js
│   │   ├── ProtectedRoute.js
│   │   └── Reports.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── styles/
│   │   ├── designSystem.js
│   │   └── Billing.css
│   └── ...
├── package.json
└── README.md
```

## 🚀 Getting Started

1. **Clone the repository:**
	 ```sh
	 git clone https://github.com/Sabari-Vasan-SM/Billventory.git
	 cd Billventory
	 ```
2. **Install dependencies:**
	 ```sh
	 npm install
	 ```
3. **Configure Supabase:**
	 - Create a project at [supabase.com](https://supabase.com/)
	 - Copy your Supabase URL and anon/public key
	 - Update [`src/supabaseClient.js`](src/supabaseClient.js) with your credentials
4. **Start the development server:**
	 ```sh
	 npm start
	 ```
5. **Open in browser:**
	 - Visit [http://localhost:3000](http://localhost:3000)



<div align="center">
	<strong>Modern UI, smooth animations, and robust inventory management for your retail business.</strong><br />
	<br />
	<img src="https://img.shields.io/badge/MIT-License-blue.svg" />
	<br /><br />
	<sub>MIT © Sabari Vasan S M</sub>
</div>
