# 🚀 Setup Guide

## Prerequisites

- Python 3.9+
- Node.js 18+
- MySQL 8.0+
- Redis (optional, for caching)

## Backend Setup

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE fooddelivery;

# Exit MySQL
exit
```

### 2. Backend Installation

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
copy .env.example .env

# Edit .env file with your configuration
# Update DATABASE_URL, SECRET_KEY, and API keys
```

### 3. Run Backend

```bash
# Make sure you're in the backend directory with venv activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000
API Documentation: http://localhost:8000/docs

## Frontend Setup

### Customer App

```bash
cd frontend/customer
npm install
npm run dev
```

Available at: http://localhost:5173

### Restaurant Dashboard

```bash
cd frontend/restaurant
npm install
npm run dev
```

Available at: http://localhost:5174

### Rider App

```bash
cd frontend/rider
npm install
npm run dev
```

Available at: http://localhost:5175

### Admin Panel

```bash
cd frontend/admin
npm install
npm run dev
```

Available at: http://localhost:5176

## Test Accounts

After running the backend, you can use these test accounts:

- **Admin**: admin@foodhub.com / password123
- **Restaurant**: restaurant@test.com / password123
- **Customer**: customer@test.com / password123
- **Rider**: rider@test.com / password123

## Environment Variables

### Backend (.env)

```env
DATABASE_URL=mysql+pymysql://root:your_password@localhost:3306/fooddelivery
SECRET_KEY=your-secret-key-generate-a-strong-one
STRIPE_SECRET_KEY=your_stripe_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Frontend

Create `.env` in each frontend app:

```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000/ws
VITE_GOOGLE_MAPS_KEY=your_google_maps_key
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

## Production Deployment

### Backend

1. Set `DEBUG=False` in production
2. Use a production WSGI server (Gunicorn)
3. Set up proper CORS origins
4. Use environment variables for secrets
5. Enable HTTPS

### Frontend

```bash
npm run build
```

Deploy the `dist` folder to your hosting service (Vercel, Netlify, etc.)

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running
- Check DATABASE_URL in .env
- Ensure database exists

### CORS Errors

- Update BACKEND_CORS_ORIGINS in backend/.env
- Include your frontend URLs

### Port Already in Use

- Change port in vite.config.js (frontend)
- Change port in uvicorn command (backend)
