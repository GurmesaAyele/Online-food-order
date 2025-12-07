@echo off
echo Starting Admin Dashboard...
cd frontend\admin
start cmd /k "npm run dev"
echo Admin Dashboard starting on http://localhost:5177
pause
