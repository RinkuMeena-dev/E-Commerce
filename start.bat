@echo off
title OneCart - E-Commerce Host
cd /d "%~dp0"

echo Starting Backend Server (port 8000)...
start "Backend" cmd /k "cd backend && npm run dev"

echo Starting Frontend (port 5173)...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo Starting Admin Panel (port 5174)...
start "Admin" cmd /k "cd admin && npm run dev"

echo.
echo All servers starting. Open in browser:
echo   Frontend:  http://localhost:5173
echo   Admin:     http://localhost:5174
echo.
pause
