# Cloudinary Test Adımları 🧪

## 1. Redeploy Yapın
Vercel otomatik deploy başlatacak. Bekleyin (1-2 dakika).

## 2. Browser Console'u Açın
1. Admin panele gidin: `icnevudila.xyz/admin`
2. **F12** veya **Ctrl+Shift+I** ile Developer Tools'u açın
3. **Console** sekmesine geçin

## 3. Blog Görseli Yükleyin
Admin panelden bir blog görseli yükleyin.

## 4. Console'da Şu Mesajları Arayın:

```
🔍 Cloudinary config check:
  - cloudName: Set (dqiwrytdx...)
  - apiKey: Set (439723396...)
  - apiSecret: Set (pQk33ZDpAh...)
```

veya

```
🔍 Cloudinary config check:
  - cloudName: MISSING
  - apiKey: MISSING
  - apiSecret: MISSING
```

## 5. Sonucu Paylaşın

Console'daki tam mesajları kopyalayıp paylaşın. Böylece hangi environment variable'ın eksik olduğunu görebiliriz!

---

Redeploy tamamlandıktan sonra test edin ve console çıktısını paylaşın.

