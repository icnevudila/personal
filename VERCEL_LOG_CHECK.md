# Vercel Log Kontrolü 📋

## Runtime Logs (Serverless Functions için)

1. Vercel Dashboard → Deployments
2. En üstteki deployment'a tıkla
3. Sayfanın altında **"Runtime Logs"** kartını bul
4. **"Runtime Logs"** kartına tıkla
5. Burada Cloudinary upload loglarını görebilirsin

---

## Build Logs (Build sırasında hatalar için)

1. Vercel Dashboard → Deployments
2. En üstteki deployment'a tıkla
3. "Build Logs" sekmesine tıkla
4. Burada build hatalarını görebilirsin

---

## Browser Console (Daha Kolay Yöntem 🎯)

1. Admin paneli aç: `icnevudila.xyz/admin`
2. Browser Console'u aç: **F12** veya **Sağ tık → Inspect**
3. **Console** sekmesine git
4. Blog görseli yükle
5. Console'da şunları ara:
   - `🚀 Starting Cloudinary upload...`
   - `📡 Response status:`
   - `❌ Upload error:` (varsa)

---

## Sorun mu var?

Eğer hala "sadece sizde görünecek" diyorsa:
1. Browser Console'daki hata mesajını paylaş
2. Veya Runtime Logs'taki hata mesajını paylaş

Daha kolay olan Browser Console'u kullanın!

