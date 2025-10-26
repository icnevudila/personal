# Vercel Environment Variables FİX 🛠️

## Sorun
Environment variables Vercel'de var ama sunucu tarafında okunmuyor.

## Çözüm: Yeniden Ekleyip Redeploy

### 1. Mevcut Variables'ları Silin
1. Vercel Dashboard → Settings → Environment Variables
2. Her bir Cloudinary variable'ı seçin
3. ⋮ menüsünden **Delete**'e tıklayın
4. Tümünü silin (3 tane)

### 2. Yeniden Ekleyin
Tek tek ekleyin:

#### CLOUDINARY_CLOUD_NAME
- Name: `CLOUDINARY_CLOUD_NAME`
- Value: `dqiwrytdx`
- Environments: Production ✅ Preview ✅ Development ✅
- **Add**

#### CLOUDINARY_API_KEY
- Name: `CLOUDINARY_API_KEY`
- Value: `439723396121717`
- Environments: Production ✅ Preview ✅ Development ✅
- **Add**

#### CLOUDINARY_API_SECRET
- Name: `CLOUDINARY_API_SECRET`
- Value: `pQk33ZDpAhNHBGC_BPdI8ACI-iE`
- Environments: Production ✅ Preview ✅ Development ✅
- **Add**

### 3. Save Butonuna Tıklayın
Sayfanın altındaki **Save** butonuna tıklayın

### 4. YENİ Deployment Başlatın
1. Vercel Dashboard → Deployments
2. En üstteki deployment → ⋮ → **Redeploy**
3. ✅ "Use existing Build Cache" seçeneğini **KAPATIN**
4. **Redeploy** butonuna tıklayın
5. Build tamamlanmasını bekleyin (2-3 dakika)

### 5. Test Edin
1. Admin panele gidin
2. Blog görseli yükleyin
3. Console'da şu mesajları görün:
   ```
   🔍 Cloudinary config check:
     - cloudName: Set (dqiwrytdx...)
     - apiKey: Set (439723396...)
     - apiSecret: Set (pQk33ZDpAh...)
   ```

---

**VEYA:** Daha kolay bir çözüm istiyorsanız, başka bir storage servisi kullanalım?

