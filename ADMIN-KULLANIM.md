# Admin Modu Kullanım Kılavuzu

## Admin Modunu Açma

Admin modunu açmak için tarayıcı konsolunu kullanın:

1. Tarayıcıda **F12** tuşuna basın
2. **Console** sekmesine gidin
3. Şu kodu yapıştırın ve Enter'a basın:

```javascript
localStorage.setItem('adminMode', 'true');
window.location.reload();
```

## Admin Modunu Kapatma

Admin modundayken:
- Blog veya Projeler bölümündeki **"Admin Modu: Açık"** butonuna tıklayın
- Veya konsola şunu yazın:

```javascript
localStorage.setItem('adminMode', 'false');
window.location.reload();
```

## Admin Modunda Yapabilecekleriniz

### Blog Bölümü
- ✅ Yeni yazı ekleme
- ✅ Mevcut yazıları düzenleme
- ✅ Yazıları silme
- ✅ Yazılara görsel yükleme

### Projeler Bölümü
- ✅ Yeni proje ekleme
- ✅ Mevcut projeleri düzenleme
- ✅ Projeleri silme
- ✅ Projelere görsel yükleme

### Hakkımda Bölümü
- ✅ Profil görseli yükleme

### Hero Bölümü
- ✅ Profil görseli yükleme (Admin Panel'den)

## İletişim Formu Kurulumu (Resend + Vercel)

İletişim formundan gelen mesajların direkt e-posta adresinize gönderilmesi için Resend API kullanılmaktadır.

### Resend Nasıl Çalışır?

1. Form gönderildiğinde Next.js API route çalışır
2. Resend API ile e-posta gönderilir
3. Gmail API izinleri gerekmez - çok daha basit!

### Kurulum Adımları

#### 1. Resend Hesabı Oluşturun

1. [Resend.com](https://resend.com/) adresine gidin
2. Ücretsiz hesap oluşturun
3. Dashboard'a giriş yapın

#### 2. API Key Alın

1. Dashboard'da **API Keys** bölümüne gidin
2. **Create API Key** butonuna tıklayın
3. Bir isim verin (örn: "Portfolio Contact Form")
4. Permissions'ı **Sending access** olarak seçin
5. API Key'i kopyalayın (bir daha gösterilmeyecek!)

#### 3. Environment Variable Ekleyin

**Local Development için:**
1. Proje kök dizininde `.env.local` dosyası oluşturun
2. Şu satırı ekleyin:

```env
RESEND_API_KEY=re_your_api_key_here
```

**Vercel Deploy için:**
1. Vercel Dashboard'da projenize gidin
2. **Settings** > **Environment Variables** bölümüne gidin
3. Yeni variable ekleyin:
   - Name: `RESEND_API_KEY`
   - Value: Resend'den aldığınız API key
4. Tüm ortamlar için (Production, Preview, Development) seçin
5. **Save** butonuna tıklayın

#### 4. Domain Yapılandırması (Önemli!)

Resend ilk kurulumda `onboarding@resend.dev` domain'i ile çalışır. 

**Ücretsiz kullanım için:** Hiçbir şey yapmanıza gerek yok, direkt çalışır.

**Kendi domain'inizi kullanmak için:**
1. Resend Dashboard > **Domains** bölümüne gidin
2. **Add Domain** butonuna tıklayın
3. Domain'inizi ekleyin
4. DNS kayıtlarını ekleyin
5. API route'da `from` adresini güncelleyin

#### 5. Deploy ve Test

1. Kodu commit edin ve GitHub'a push edin
2. Vercel otomatik deploy edecek
3. Sitenizi açın ve formu test edin
4. E-posta kutunuzda mesajı kontrol edin

### Form Verilerini Görüntüleme

Resend Dashboard'da:
- **Emails** bölümünden tüm gönderilen e-postaları görebilirsiniz
- Her e-postanın durumunu (delivered, opened, etc.) takip edebilirsiniz
- Detaylı analytics mevcuttur

### Önemli Notlar

- ✅ Gmail API izinleri gerekmez
- ✅ Vercel ile mükemmel entegrasyon
- ✅ Ücretsiz plan yeterlidir
- ✅ Ayda **3,000 e-posta** limiti var (ücretsiz plan)
- ✅ Professional e-posta görünümü
- ⚠️ İlk kullanımda `onboarding@resend.dev` domain'i ile çalışır

## Önemli Notlar

- ⚠️ Admin modu **sadece admin modunu açan kişiye görünür**
- ⚠️ Admin butonları normal ziyaretçilere gözükmez
- ⚠️ localStorage kullanıldığı için veriler tarayıcıya özgüdür
- ⚠️ Tarayıcı cache'ini temizlerseniz admin modu sıfırlanır
- ℹ️ Resend ücretsiz planında **ayda 3,000 e-posta** limiti vardır

