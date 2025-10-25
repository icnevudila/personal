# Admin Panel Authentication Setup

Bu rehber, admin panelinde Supabase authentication'ı nasıl kuracağınızı açıklar.

## 📋 İçindekiler

1. [Supabase Auth Kullanıcısı Oluşturma](#supabase-auth-kullanıcısı-oluşturma)
2. [Environment Variables](#environment-variables)
3. [Admin Panel Kullanımı](#admin-panel-kullanımı)
4. [Güvenlik Notları](#güvenlik-notları)

---

## 🔐 Supabase Auth Kullanıcısı Oluşturma

### 1. Supabase Dashboard'a Giriş

1. [Supabase Dashboard](https://app.supabase.com) adresine gidin
2. Projenizi seçin
3. Sol menüden **Authentication** sekmesine tıklayın

### 2. Yeni Kullanıcı Ekleme

**Yöntem 1: Dashboard Üzerinden**

1. Authentication > Users menüsüne gidin
2. **Add user** butonuna tıklayın
3. Aşağıdaki bilgileri girin:
   - **Email**: Admin email adresiniz (örn: `admin@icnevudila.com`)
   - **Password**: Güçlü bir şifre oluşturun
   - **Confirm Password**: Şifreyi tekrar girin
4. **Create user** butonuna tıklayın

**Yöntem 2: Sign Up Form Üzerinden**

Eğer Sign Up form'unuz varsa:
1. Sign up formundan kayıt olun
2. Supabase Dashboard > Authentication > Users'da kullanıcınızı görün
3. İsterseniz email'i verify edin (Settings > Auth > Email Verification)

### 3. Email Verification (Opsiyonel)

Admin kullanıcıları için email verification isteyebilirsiniz:

1. Authentication > Settings'e gidin
2. **Email Auth** altında "Confirm email" ayarını aktif edin
3. Veya kullanıcı listesinden manuel olarak "Verify" edin

---

## 🔑 Environment Variables

`.env.local` dosyanıza Supabase bilgilerinizi ekleyin:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Önemli:**
- Bu bilgileri Supabase Dashboard > Settings > API'den alabilirsiniz
- `NEXT_PUBLIC_` prefix'i olmadan çalışmaz!
- Vercel'e deploy ederken bu değişkenleri Vercel Dashboard'a da ekleyin

---

## 🎯 Admin Panel Kullanımı

### Giriş Yapma

1. Tarayıcınızda `/admin/login` adresine gidin
2. Email ve şifrenizi girin
3. **Giriş Yap** butonuna tıklayın
4. Başarılı girişte `/admin` sayfasına yönlendirileceksiniz

### Admin Panel Özellikleri

✅ **Giriş Korumalı:** Admin paneli sadece authenticated kullanıcılar tarafından erişilebilir

✅ **Oturum Yönetimi:** 
- Login durumu session'da saklanır
- Sayfa yenilendiğinde oturum korunur
- Sign out ile çıkış yapılabilir

✅ **Güvenli Çıkış:**
- Sağ üstteki "Çıkış Yap" butonuna tıklayın
- Oturum sonlandırılır ve login sayfasına yönlendirilirsiniz

### Admin Panel İçeriği

- **Hero Profil Görseli:** Hero section'daki profil görselini yükleme
- **Proje Yönetimi:** Projeleri ekleme, düzenleme, silme
- **İstatistikler:** Toplam proje, öne çıkan proje sayıları
- **Görsel Yükleme:** Projeler için görsel yükleme

---

## 🔒 Güvenlik Notları

### ✅ Güvenlik Best Practices

1. **Güçlü Şifre:**
   - En az 12 karakter
   - Büyük/küçük harf, rakam ve özel karakter içermeli
   - Örnek: `Admin@2024Secure!`

2. **Email Verification:**
   - Admin kullanıcıları için email verification aktif edin
   - Supabase Settings > Auth > Email Auth ayarlarından yapın

3. **Row Level Security (RLS):**
   - Admin işlemleri için RLS politikaları ekleyin
   - Sadece authenticated kullanıcılar veri güncelleyebilsin

4. **Rate Limiting:**
   - Login denemeleri için rate limit ekleyin
   - Supabase Dashboard > Authentication > Settings'ten yapın

5. **HTTPS:**
   - Production'da mutlaka HTTPS kullanın
   - Supabase API URL'si zaten HTTPS'dir

### 🚨 Güvenlik İpuçları

- ❌ Şifreleri hiçbir yerde hardcode etmeyin
- ❌ Session token'ları localStorage'a kaydetmeyin (Supabase otomatik yönetir)
- ❌ Admin panelini public repository'de paylaşmayın
- ✅ Environment variables'ları `.gitignore`'a ekleyin
- ✅ Düzenli olarak şifre değiştirin
- ✅ Gereksiz kullanıcıları silin

---

## 🛠️ Sorun Giderme

### "Invalid login credentials" Hatası

**Olası Nedenler:**
- Email veya şifre yanlış
- Kullanıcı Supabase'de oluşturulmamış
- Email verification gerekli ama yapılmamış

**Çözüm:**
1. Supabase Dashboard > Authentication > Users'da kullanıcıyı kontrol edin
2. Email'i doğru girdiğinizden emin olun
3. Şifreyi reset edin (Dashboard'dan)

### "Missing Supabase environment variables" Hatası

**Çözüm:**
1. `.env.local` dosyasını kontrol edin
2. `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` varsa
3. Değişkenlerin `NEXT_PUBLIC_` ile başladığından emin olun
4. Projeyi yeniden başlatın (`npm run dev`)

### Admin Panel'e Erişemiyorum

**Kontrol Listesi:**
- ✅ Supabase URL ve Key doğru mu?
- ✅ Kullanıcı Supabase'de oluşturuldu mu?
- ✅ Environment variables tanımlı mı?
- ✅ Browser console'da hata var mı?

### Oturum Korunmuyor

**Olası Nedenler:**
- localStorage/SessionStorage engellenmiş
- Tarayıcı private mode aktif
- Third-party cookies engellenmiş

**Çözüm:**
- Normal browsing mode kullanın
- Tarayıcı ayarlarından cookies'i kontrol edin

---

## 📝 SQL Komutları (Opsiyonel)

Admin kullanıcıları için özel bir tablo oluşturmak isterseniz:

```sql
-- Admin users tablosu oluştur
CREATE TABLE admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sadece authenticated kullanıcılar ekleyebilir
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can insert"
  ON admin_users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can view"
  ON admin_users FOR SELECT
  USING (true);
```

---

## 🎉 Hazır!

Artık admin paneliniz güvenli bir şekilde Supabase authentication ile korunuyor!

Herhangi bir sorunuz olursa veya ek özellik isterseniz bana ulaşın.

---

**Not:** Bu dosya admin paneli için özel olarak hazırlanmıştır. Production'a çıkmadan önce tüm güvenlik kontrollerini yaptığınızdan emin olun.

