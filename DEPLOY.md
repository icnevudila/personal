# Canlıya Alma Kılavuzu

Bu Next.js projesini Vercel veya Netlify'da canlıya almak için aşağıdaki adımları izleyin.

## 🚀 Vercel ile Canlıya Alma

### Yöntem 1: Vercel CLI ile (Hızlı)

1. **Vercel CLI kurulumu:**
```bash
npm install -g vercel
```

2. **Projeyi deploy edin:**
```bash
vercel
```

3. **İlk defa deploy ediyorsanız:**
   - `vercel` komutunu çalıştırın
   - Sorulara cevap verin
   - Otomatik olarak deploy edilecek

4. **Sonraki güncellemeler için:**
```bash
vercel --prod
```

### Yöntem 2: GitHub ile (Önerilen)

1. **GitHub'da repository oluşturun:**
   - GitHub'a gidin
   - "New repository" oluşturun
   - Repository adını verin (örn: icnevudila-portfolio)

2. **Projeyi GitHub'a yükleyin:**
```bash
git init
git add .
git commit -m "İlk commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADI/REPO_ADI.git
git push -u origin main
```

3. **Vercel'e bağlayın:**
   - [vercel.com](https://vercel.com) adresine gidin
   - "Import Project" butonuna tıklayın
   - GitHub repository'nizi seçin
   - Otomatik olarak deploy edilir

### Vercel Avantajları:
- ✅ Ücretsiz
- ✅ Otomatik SSL sertifikası
- ✅ Sonraki her push'ta otomatik deploy
- ✅ Global CDN
- ✅ Next.js için optimize edilmiş

---

## 🌐 Netlify ile Canlıya Alma

### Yöntem 1: Netlify CLI ile

1. **Netlify CLI kurulumu:**
```bash
npm install -g netlify-cli
```

2. **Giriş yapın:**
```bash
netlify login
```

3. **Site oluşturun:**
```bash
netlify init
```

4. **Deploy edin:**
```bash
netlify deploy --prod
```

### Yöntem 2: GitHub ile

1. **GitHub'da repository oluşturun** (yukarıdaki adımlar)

2. **Netlify'e bağlayın:**
   - [netlify.com](https://netlify.com) adresine gidin
   - "Add new site" > "Import an existing project"
   - GitHub repository'nizi seçin
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - "Deploy site" butonuna tıklayın

### Netlify Avantajları:
- ✅ Ücretsiz
- ✅ Otomatik SSL
- ✅ Form gönderimi desteği
- ✅ Git push otomatik deploy

---

## ⚙️ Önemli Notlar

### LocalStorage Verileri
⚠️ Bu proje localStorage kullanıyor. LocalStorage verileri:
- Tarayıcıya özeldir
- Kullanıcı tarayıcısında saklanır
- Sunucuda saklanmaz

**Profesyonel kullanım için:**
- Veritabanı (Firebase, Supabase, MongoDB) kullanın
- API endpoints oluşturun
- Gerçek bir CMS entegre edin

### Environment Variables
Eğer environment variable kullanmak isterseniz:

1. `.env.local` dosyası oluşturun
2. Vercel/Netlify dashboard'da environment variables ekleyin

### Build Komutu
Proje hazır:
```bash
npm run build
```

Eğer build başarılı olursa, deploy için hazırsınız demektir!

---

## 📝 Deploy Öncesi Kontrol Listesi

- [ ] `npm run build` başarılı mı?
- [ ] Git repository oluşturuldu mu?
- [ ] Kod GitHub'a push edildi mi?
- [ ] Vercel/Netlify hesabı var mı?

---

## 🎉 Deploy Sonrası

Deploy başarılı olduktan sonra:
1. URL'nizi paylaşın
2. Admin modu ile içerik ekleyin/düzenleyin
3. localStorage verileri kullanıcıların tarayıcısında saklanır

**Not:** Herkes kendi localStorage'ını kullanır, bu yüzden admin modu herkes için ayrı çalışır.


