@echo off
echo ========================================
echo PixlabSite Production Build Script
echo ========================================
echo.

echo [1/4] Checking environment configuration...
if not exist "client\.env" (
    echo WARNING: client\.env not found!
    echo Please create client\.env with your backend URL:
    echo VITE_API_URL=https://your-backend-url
    echo.
    pause
    exit /b 1
)

echo [2/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [3/4] Building production bundle...
call npm run build
if errorlevel 1 (
    echo ERROR: Build failed
    pause
    exit /b 1
)

echo [4/4] Build complete!
echo.
echo ========================================
echo Build Output Location:
echo %CD%\dist\public
echo ========================================
echo.
echo Next Steps:
echo 1. Upload contents of 'dist\public' to cPanel public_html
echo 2. Upload '.htaccess' file to public_html
echo 3. Test your site at https://apexverse.site
echo.
echo Opening build folder...
explorer "%CD%\dist\public"

pause
