@echo off
echo.
echo ========================================
echo  Supabase Hizli Kurulum
echo ========================================
echo.
echo Supabase bilgilerinizi girin:
echo.
set /p SUPABASE_URL="Supabase URL: "
set /p SUPABASE_KEY="Supabase Anon Key: "
echo.
echo .env.local dosyasi olusturuluyor...
echo.
(
echo # Supabase Configuration
echo NEXT_PUBLIC_SUPABASE_URL=%SUPABASE_URL%
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=%SUPABASE_KEY%
echo.
echo # Admin Credentials
echo NEXT_PUBLIC_ADMIN_PASSWORD=icnevudila2024
echo.
echo # Site Configuration
echo NEXT_PUBLIC_SITE_URL=https://icnevudila.xyz
) > .env.local
echo.
echo [OK] .env.local dosyasi basariyla olusturuldu!
echo.
echo Uygulamayi baslatmak icin: npm run dev
echo.
pause
