# Supabase Image Upload Testing Guide

## Bucket Ayarları ✅

Bucket adı: `portfolio-images`
Public bucket: ✅ Açık
File size limit: Kapalı
MIME type restriction: Kapalı

Bu ayarlar doğru! Şimdi test edelim.

## Testing Adımları

### 1. Browser Console'u Açın
- F12 tuşuna basın
- Console sekmesine gidin

### 2. Terminal'de Logları Kontrol Edin
`npm run dev` çalışıyorsa terminal'de logları göreceksiniz.

### 3. Admin Panelden Görsel Yükleyin
1. `/admin/login` ile giriş yapın
2. Blog veya Projects sekmesine gidin
3. Bir görsele hover edin
4. "Yükle" butonuna tıklayın
5. Görsel seçin

### 4. Console'da Beklenen Loglar

**Browser Console:**
```
📤 Uploading blog image to Supabase...
📥 Upload result: { success: true, url: "..." }
```

**Terminal (npm run dev):**
```
📤 API: Uploading to Supabase...
📁 Folder: blog
📝 FileName: blog-modern-araclar-tasarim-sureci-1234567890
🛤️ File path: blog/blog-modern-araclar-tasarim-sureci-1234567890.jpg
✅ Upload successful: { ... }
🔗 Public URL: https://...
```

### 5. Network Tab'da Kontrol Edin
- F12 > Network sekmesi
- `/api/upload-to-supabase` isteğini bulun
- Status: 200 OK olmalı
- Response'da `success: true` olmalı

## Sorun Giderme

### Error: "bucket not found"
- Bucket adının `portfolio-images` olduğundan emin olun
- Supabase Dashboard > Storage'da kontrol edin

### Error: "not authorized"
- Public bucket açık mı kontrol edin
- Storage > Policies'de public read policy olmalı

### Upload sessizce başarısız oluyor
- Browser console'da error logları var mı kontrol edin
- Network tab'da failed request var mı kontrol edin
- Supabase Dashboard > Logs'da error var mı kontrol edin

### "Görsel kaydedildi (sadece sizde görünecek)" mesajı
- Supabase upload başarısız olmuş
- Fallback localStorage'a kaydetmiş
- Console'da error logları kontrol edin

## Başarılı Upload Sonrası

Upload başarılı olursa:
1. Supabase Dashboard > Storage > portfolio-images'da dosyayı göreceksiniz
2. Browser console'da Supabase URL'si görünecek
3. localStorage'da Supabase URL saklanacak
4. Ana sayfada görsel herkese görünecek
5. Incognito modda test edebilirsiniz

## Test Checklist

- [ ] Browser console açık
- [ ] Terminal logları açık
- [ ] Admin panelden görsel yükleme deneniyor
- [ ] Console'da loglar görünüyor
- [ ] Network tab'da istek başarılı
- [ ] Supabase Dashboard'da dosya görünüyor
- [ ] Ana sayfada görsel görünüyor
- [ ] Incognito modda görsel görünüyor

