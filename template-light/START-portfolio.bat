@echo off
title SuryaTeja Portfolio (Light template) - port 3000
cd /d "%~dp0"

echo ============================================
echo  Freeing port 3000 (stopping any server on it)...
echo ============================================
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
  echo Stopping PID %%a
  taskkill /F /PID %%a >nul 2>&1
)

echo.
echo ============================================
echo  Installing dependencies (first run only)...
echo ============================================
call npm install

echo.
echo ============================================
echo  Starting dev server on http://localhost:3000
echo ============================================
call npm run dev -- -p 3000
pause
