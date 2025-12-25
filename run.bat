@echo off
echo ====================================
echo Starting Frontend and Backend...
echo ====================================

REM Start backend in a new window
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to initialize
timeout /t 2 /nobreak >nul

REM Start frontend in a new window
start "Frontend Server" cmd /k "cd frontend && npm run dev"

echo.
echo ====================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ====================================
echo.
echo Press any key to stop all servers...
pause >nul

REM Kill the processes when user presses a key
taskkill /FI "WindowTitle eq Backend Server*" /T /F >nul 2>&1
taskkill /FI "WindowTitle eq Frontend Server*" /T /F >nul 2>&1

echo Servers stopped.
