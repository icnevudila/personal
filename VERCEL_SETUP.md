# VERCEL ENVIRONMENT VARIABLES

Vercel Dashboard'da şu değişkenleri ekleyin:

## 📋 Gerekli Environment Variables

### 1. Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://uwcgcwgxtezmecldnsnr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3Y2djd2d4dGV6bWVjbGRuc25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNzQ0NDYsImV4cCI6MjA3Njk1MDQ0Nn0.2EkJGmgauM-trUp9hdEXyXdM9xdFKnrdGL4MxY36f9g
```

### 2. Admin Credentials
```
NEXT_PUBLIC_ADMIN_PASSWORD=icnevudila2024
```

### 3. Site Configuration (Optional)
```
NEXT_PUBLIC_SITE_URL=https://icnevudila.xyz
```

## 🎯 Nasıl Ekle:
1. Vercel Dashboard > Your Project > Settings
2. Environment Variables sekmesine git
3. Her bir değişkeni tek tek ekle:
   - Name: NEXT_PUBLIC_SUPABASE_URL
   - Value: https://uwcgcwgxtezmecldnsnr.supabase.co
   - Environment: Production, Preview, Development (hepsini seç)
4. Aynı şekilde diğerlerini de ekle
5. Deploy > Redeploy (Tüm ortamlarda)

## ⚠️ ÖNEMLİ:
- Tüm değişkenlerin başında **NEXT_PUBLIC_** olmalı (client-side'da kullanılacaklar için)
- Environment'ları Production, Preview, Development olarak seç
- Her değişkeni ekledikten sonra redeploy yap!

## ✅ Sonuç:
Environment variables eklenince admin paneli Supabase'den veri çekebilecek ve boş görünmeyecek!
