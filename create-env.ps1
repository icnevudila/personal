# Supabase .env.local Dosyasi Olusturucu
# Bu script'i calistirarak .env.local dosyasini olusturun

Write-Host "Supabase .env.local Dosyasi Olusturucu" -ForegroundColor Cyan
Write-Host ""

# Supabase bilgilerini kullanici dan al
$supabaseUrl = Read-Host "Supabase URL'inizi girin (orn: https://abcdefgh.supabase.co)"
$supabaseKey = Read-Host "Supabase Anon Key'inizi girin"

# Dosya icerigini olustur
$envContent = @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabaseKey

# Admin Credentials
NEXT_PUBLIC_ADMIN_PASSWORD=icnevudila2024

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://icnevudila.xyz
"@

# Dosyayi olustur
try {
    $envContent | Out-File -FilePath ".env.local" -Encoding utf8 -NoNewline
    Write-Host ""
    Write-Host ".env.local dosyasi basariyla olusturuldu!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Olusturulan icerik:" -ForegroundColor Yellow
    Write-Host $envContent
    Write-Host ""
    Write-Host "Artik 'npm run dev' komutu ile uygulamayi baslatabilirsiniz!" -ForegroundColor Green
}
catch {
    Write-Host ""
    Write-Host "Hata: Dosya olusturulamadi!" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
}

Write-Host ""
Write-Host "Devam etmek icin herhangi bir tusa basin..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")