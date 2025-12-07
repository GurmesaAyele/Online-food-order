@echo off
echo Starting Food Delivery Backend...
echo.
cd backend
call venv\Scripts\activate
echo Installing dependencies (this may take a few minutes)...
pip install fastapi uvicorn sqlalchemy pymysql python-jose[cryptography] passlib[bcrypt] python-multipart pydantic pydantic-settings python-dotenv websockets --quiet
echo.
echo Starting server...
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
