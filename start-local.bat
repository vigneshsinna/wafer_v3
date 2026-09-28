@echo off
setlocal
cd /d "%~dp0"

where php >nul 2>nul || (echo PHP is required to run the Laravel backend.& pause & exit /b 1)
where npm >nul 2>nul || (echo Node.js and npm are required to run the storefront.& pause & exit /b 1)
if not exist "vendor\autoload.php" (echo Laravel dependencies are missing. Run composer install in this folder.& pause & exit /b 1)
if not exist "storefront\node_modules" (echo Storefront dependencies are missing. Run npm ci in the storefront folder.& pause & exit /b 1)

set "APP_URL=http://localhost:8081"
set "STOREFRONT_URL=http://localhost:3001"
set "API_CORS_ORIGINS=http://localhost:3001,http://127.0.0.1:3001"
set "NEXT_PUBLIC_API_URL=http://127.0.0.1:8081/api/v3"

curl.exe -fsS -o nul http://127.0.0.1:8081/login >nul 2>nul
if errorlevel 1 (
    echo Starting Laravel backend at http://localhost:8081
    start "Wafer King Laravel Backend" /D "%~dp0" cmd /k "php artisan serve --host=127.0.0.1 --port=8081"
) else (
    echo Laravel backend already running at http://localhost:8081
)

curl.exe -fsS -o nul http://127.0.0.1:3001/ >nul 2>nul
if errorlevel 1 (
    echo Starting storefront at http://localhost:3001
    start "Wafer King Storefront" /D "%~dp0storefront" cmd /k "npm run dev -- --hostname 127.0.0.1 --port 3001"
) else (
    echo Storefront already running at http://localhost:3001
)

endlocal
