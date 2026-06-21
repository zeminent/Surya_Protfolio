@echo off
title Stop dev server (ports 3000 & 3001)
echo Stopping any dev server on ports 3000 and 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000 :3001" ^| findstr LISTENING') do (
  echo Stopping PID %%a
  taskkill /F /PID %%a >nul 2>&1
)
echo Done.
timeout /t 2 >nul
