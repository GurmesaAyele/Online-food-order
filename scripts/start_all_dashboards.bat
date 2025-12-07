@echo off
echo ========================================
echo   Starting All Food Delivery Dashboards
echo ========================================
echo.

echo Starting Backend API...
start "Backend API" cmd /k "cd backend && venv\Scripts\activate && python start.py"
timeout /t 5

echo Starting Customer App...
start "Customer App" cmd /k "cd frontend\customer && npm run dev"
timeout /t 2

echo Starting Restaurant Dashboard...
start "Restaurant Dashboard" cmd /k "cd frontend\restaurant && npm run dev"
timeout /t 2

echo Starting Rider Dashboard...
start "Rider Dashboard" cmd /k "cd frontend\rider && npm install && npm run dev"
timeout /t 2

echo Starting Admin Panel...
start "Admin Panel" cmd /k "cd frontend\admin && npm install && npm run dev"

echo.
echo ========================================
echo   All Dashboards Starting!
echo ========================================
echo.
echo Backend API:          http://localhost:8000
echo Customer App:         http://localhost:5174
echo Restaurant Dashboard: http://localhost:5175
echo Rider Dashboard:      http://localhost:5176
echo Admin Panel:          http://localhost:5177
echo.
echo API Documentation:    http://localhost:8000/docs
echo.
pause
