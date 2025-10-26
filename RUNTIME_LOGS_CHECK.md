# Runtime Logs Kontrolü 🔍

## Vercel Runtime Logs'a Bakın

### 1. Vercel Dashboard → Deployments
### 2. En üstteki deployment'a tıklayın
### 3. Sayfanın altında **"Runtime Logs"** kartını bulun
### 4. **"Runtime Logs"** linkine tıklayın
### 5. Admin panelden blog görseli yükleyin
### 6. Runtime Logs'ta şu mesajları arayın:

```
✅ Cloudinary config check:
  - cloudName: Set (dqiwrytdx...)
  - apiKey: Set (439723396...)
  - apiSecret: Set (pQk33ZDpAh...)
```

**VEYA**

```
✅ Cloudinary config check:
  - cloudName: MISSING
  - apiKey: MISSING
  - apiSecret: MISSING
```

---

## Runtime Logs Bulamıyorsanız:

Vercel Dashboard → Deployments → En üstteki deployment → **Functions** sekmesine bakın.

---

**Runtime Logs'taki tam mesajları paylaşın. Böylece hangi environment variable'ın eksik olduğunu görebiliriz!**

