@echo off
echo ========================================
echo QUEST Legal - Development Server Test
echo ========================================
echo.

echo Step 1: Checking if ports are in use...
echo.
echo Port 5000 (Express API):
netstat -ano | findstr :5000
echo.
echo Port 5173 (Vite Dev Server):
netstat -ano | findstr :5173
echo.

echo Step 2: Starting development servers...
echo.
echo This will run both Express API (5000) and Vite (5173)
echo.
echo After servers start, open: http://localhost:5173
echo.
echo Press Ctrl+C to stop servers
echo.

cd /d "%~dp0"
call npm run dev:all

pause
