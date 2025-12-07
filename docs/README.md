# 🚀 Next-Gen Food Delivery Platform

A distributed, real-time, full-stack food delivery system built with modern technologies.

## 🛠️ Tech Stack

- **Frontend**: React + Vite (JavaScript) + TailwindCSS
- **Backend**: FastAPI (Python)
- **Database**: MySQL
- **Real-time**: WebSockets
- **Payments**: Stripe / Chapa
- **Maps**: Google Maps API
- **Notifications**: Firebase Cloud Messaging

## 📁 Project Structure

```
├── frontend/          # React + Vite applications
│   ├── customer/      # Customer web app
│   ├── restaurant/    # Restaurant dashboard
│   ├── rider/         # Delivery rider app
│   └── admin/         # Admin panel
├── backend/           # FastAPI application
│   ├── app/
│   │   ├── api/       # API routes
│   │   ├── models/    # Database models
│   │   ├── schemas/   # Pydantic schemas
│   │   ├── services/  # Business logic
│   │   └── core/      # Config, security, dependencies
│   └── requirements.txt
└── database/          # MySQL scripts
```

## 🚀 Quick Start

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend/customer
npm install
npm run dev
```

## 🎯 Features

- Multi-role authentication (Customer, Restaurant, Rider, Admin)
- Real-time order tracking with WebSockets
- Payment integration (Stripe, Chapa, COD)
- Interactive maps for delivery tracking
- Advanced analytics dashboards
- Menu management with variations
- Promotions and coupons system
- Push notifications
- Rating and review system
