@echo off
echo Creating Admin Account...
echo.

curl -X POST "http://localhost:8000/api/v1/auth/register" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@foodhub.com\",\"password\":\"admin123\",\"full_name\":\"Admin User\",\"phone\":\"1234567890\",\"role\":\"admin\"}"

echo.
echo.
echo ========================================
echo Admin Account Created!
echo ========================================
echo.
echo Email: admin@foodhub.com
echo Password: admin123
echo.
echo Login at: http://localhost:5177
echo.
pause
