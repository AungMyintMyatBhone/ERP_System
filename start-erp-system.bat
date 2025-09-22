@echo off
echo ===========================================
echo        ERP System Startup Script
echo ===========================================
echo.

echo Step 1: Starting Backend Server...
echo.
cd /d "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base\server"
start "ERP Backend Server" cmd /k "npm start"

echo Step 2: Waiting for server to start...
timeout /t 5 /nobreak > nul

echo Step 3: Starting Frontend Application...
echo.
cd /d "c:\Totals-inc\Code Testing\test2_ERP_system\Test2_react_Base"
start "ERP Frontend App" cmd /k "npm start"

echo.
echo ===========================================
echo Backend Server: http://localhost:5001
echo Frontend App:   http://localhost:3001
echo ===========================================
echo.
echo Both applications are starting...
echo Check the opened terminal windows for status.
pause