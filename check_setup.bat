@echo off
echo ========================================
echo   Food Delivery Platform - Setup Check
echo ========================================
echo.

echo Checking Python...
python --version
if %errorlevel% neq 0 (
    echo [ERROR] Python not found!
) else (
    echo [OK] Python installed
)
echo.

echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
) else (
    echo [OK] Node.js installed
)
echo.

echo Checking npm...
npm --version
if %errorlevel% neq 0 (
    echo [ERROR] npm not found!
) else (
    echo [OK] npm installed
)
echo.

echo Checking virtual environment...
if exist "backend\venv" (
    echo [OK] Virtual environment exists
) else (
    echo [INFO] Creating virtual environment...
    python -m venv backend\venv
    echo [OK] Virtual environment created
)
echo.

echo Checking .env file...
if exist "backend\.env" (
    echo [OK] .env file exists
) else (
    echo [INFO] Creating .env file...
    copy backend\.env.example backend\.env
    echo [OK] .env file created
)
echo.

echo ========================================
echo   Setup Check Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Start WampServer (make sure it's GREEN)
echo 2. Create database 'fooddelivery' in phpMyAdmin
echo 3. Double-click: start_backend.bat
echo 4. Double-click: start_customer_app.bat
echo.
pause
