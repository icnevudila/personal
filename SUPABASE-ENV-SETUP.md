# 🚀 Supabase Environment Variables Kurulumu

## ✅ Hızlı Başlangıç (En Kolay Yol)

### Seçenek 1: Otomatik Script (ÖNERİLEN)

PowerShell'de şu komutu çalıştırın:

```powershell
.\create-env.ps1
```

Veya Batch dosyası ile:

```cmd
quick-setup.bat
```

### Seçenek 2: Manuel Oluşturma

1. Proje kök dizininde `.env.local` dosyası oluşturun
2. Aşağıdaki içeriği ekleyin:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY-HERE

# Admin Credentials
NEXT_PUBLIC_ADMIN_PASSWORD=icnevudila2024

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://icnevudila.xyz
```

### Seçenek 3: Test Sayfası ile

1. `test-supabase.html` dosyasını tarayıcıda açın
2. Supabase bilgilerinizi girin
3. Bağlantıyı test edin
4. Oluşturulan içeriği kopyalayıp `.env.local` dosyasına yapıştırın

---

## 📋 Supabase Bilgilerini Nasıl Alırsınız?

1. **Supabase Dashboard** → https://supabase.com/dashboard
2. Projenizi seçin
3. **Settings** (⚙️) → **API** bölümüne tıklayın
4. Şu bilgileri kopyalayın:
   - **Project URL**: `https://abcdefgh.supabase.co` formatında
   - **anon public key**: Uzun bir JWT token string

---

## 🎯 Kurulum Sonrası

1. Dosyayı oluşturduktan sonra uygulamayı başlatın:
   ```bash
   npm run dev
   ```

2. Tarayıcıda `http://localhost:3000` adresine gidin

3. Console'da (F12) şu mesajı görmelisiniz:
   ```
   📊 Loaded data from Supabase: {
     blogPosts: 3,
     youtubeChannel: "icnevudila",
     videos: [...]
   }
   ```

---

## ✅ Test Adımları

1. ✅ Blog bölümünde 3 blog yazısı görünmeli
2. ✅ YouTube kanal bilgileri yüklenmeli
3. ✅ Admin paneli çalışmalı (şifre: `icnevudila2024`)
4. ✅ Supabase'den veri çekildiğini console'da görmelisiniz

---

## 🔍 Sorun Giderme

### Hata: "Failed to connect to Supabase"

**Çözüm:**
- `.env.local` dosyasının proje kök dizininde olduğundan emin olun
- URL ve KEY değerlerinin doğru olduğunu kontrol edin
- Dosyada syntax hatası olmadığından emin olun

### Hata: "No data found"

**Çözüm:**
- `supabase-schema.sql` dosyasını Supabase SQL Editor'da çalıştırdığınızdan emin olun
- Veritabanının boş olmadığını kontrol edin

### Hata: Port 3000 kullanımda

**Çözüm:**
```bash
# Node process'lerini sonlandır
taskkill /F /IM node.exe

# Tekrar başlat
npm run dev
```

---

## 📁 Oluşturulan Dosyalar

- ✅ `.env.local` - Environment variables (gitignore'da)
- ✅ `create-env.ps1` - PowerShell kurulum script'i
- ✅ `quick-setup.bat` - Batch kurulum script'i
- ✅ `test-supabase.html` - Tarayıcıda test sayfası
- ✅ `setup-env.md` - Manuel kurulum rehberi
- ✅ `SUPABASE-ENV-SETUP.md` - Bu dosya

---

## 🎉 Başarılı Kurulum!

Environment variables'ı oluşturduktan sonra:
- ✅ Veritabanı bağlantısı çalışır
- ✅ Blog yazıları otomatik yüklenir
- ✅ YouTube kanal bilgileri gelir
- ✅ Admin paneli aktif olur
- ✅ Gerçek zamanlı güncellemeler çalışır
