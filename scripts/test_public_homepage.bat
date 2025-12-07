@echo off
echo ========================================
echo   Testing Public Homepage System
echo ========================================
echo.

echo Step 1: Creating access_requests table...
cd backend
call venv\Scripts\activate
python create_requests_table.py
cd ..
echo.

echo Step 2: Starting Backend...
start "Backend API" cmd /k "cd backend && venv\Scripts\activate && python start.py"
timeout /t 5

echo Step 3: Starting Customer App (Public Homepage)...
start "Public Homepage" cmd /k "cd frontend\customer && npm run dev"
timeout /t 3

echo Step 4: Starting Admin Dashboard...
start "Admin Dashboard" cmd /k "cd frontend\admin && npm run dev"

echo.
echo ========================================
echo   System Ready for Testing!
echo ========================================
echo.
echo Public Homepage:  http://localhost:5174
echo Admin Dashboard:  http://localhost:5177
echo.
echo TEST FLOW:
echo 1. Visit http://localhost:5174
echo 2. Click "Restaurant Owner? Request to join"
echo 3. Fill and submit the form
echo 4. Login to admin at http://localhost:5177
echo 5. Go to "Access Requests"
echo 6. Approve the request
echo 7. Login with new credentials
echo.
pause
