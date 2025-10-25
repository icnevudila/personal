# Supabase Storage Setup Guide

Bu rehber, blog ve projeler için fotoğrafları Supabase Storage'da saklamak için gereken adımları açıklar.

## 📋 İçindekiler

1. [Storage Bucket Oluşturma](#storage-bucket-oluşturma)
2. [Storage Policies](#storage-policies)
3. [Image Upload API](#image-upload-api)
4. [Admin Panel Entegrasyonu](#admin-panel-entegrasyonu)

---

## 🪣 Storage Bucket Oluşturma

### 1. Supabase Dashboard'a Giriş

1. [Supabase Dashboard](https://app.supabase.com) adresine gidin
2. Projenizi seçin
3. Sol menüden **Storage** sekmesine tıklayın

### 2. Bucket Oluşturma

1. **Create a new bucket** butonuna tıklayın
2. Aşağıdaki bilgileri girin:
   - **Name**: `portfolio-images`
   - **Public bucket**: ✅ İşaretli olmalı (herkese açık görseller için)
3. **Create bucket** butonuna tıklayın

### 3. Folder Yapısı

Storage'da şu klasörleri oluşturun:

```
portfolio-images/
├── blog/
│   ├── featured/
│   └── regular/
├── projects/
│   ├── featured/
│   └── regular/
└── hero/
```

**Not:** Klasörler dosya yüklerken otomatik oluşturulur.

---

## 🔒 Storage Policies

Storage > Policies sekmesinde şu politikaları oluşturun:

### 1. Public Read Policy

```sql
-- Public read access
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT
USING (bucket_id = 'portfolio-images');
```

### 2. Authenticated Upload Policy

```sql
-- Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);
```

### 3. Authenticated Update Policy

```sql
-- Authenticated users can update
CREATE POLICY "Authenticated users can update"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);
```

### 4. Authenticated Delete Policy

```sql
-- Authenticated users can delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'portfolio-images' 
  AND auth.role() = 'authenticated'
);
```

---

## 📤 Image Upload API

### API Route Oluşturma

`app/api/upload-to-supabase/route.ts` dosyası oluşturun:

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { imageData, folder, fileName } = await request.json()
    
    // Base64'ü buffer'a çevir
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')
    
    // Supabase client
    const supabase = createRouteHandlerClient({ cookies })
    
    // File path
    const filePath = `${folder}/${fileName || Date.now()}.jpg`
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('portfolio-images')
      .upload(filePath, buffer, {
        contentType: 'image/jpeg',
        upsert: true
      })
    
    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(filePath)
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      path: filePath
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

---

## 🎨 Admin Panel Entegrasyonu

### Upload Helper Function

`lib/supabase-storage.ts` dosyası oluşturun:

```typescript
export async function uploadImageToSupabase(
  imageData: string,
  folder: 'blog' | 'projects' | 'hero',
  fileName?: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const response = await fetch('/api/upload-to-supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageData,
        folder,
        fileName
      })
    })
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Upload error:', error)
    return { success: false, error: 'Upload failed' }
  }
}

export function getSupabasePublicUrl(path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  return `${supabaseUrl}/storage/v1/object/public/portfolio-images/${path}`
}
```

---

## 📝 Kullanım Örnekleri

### Blog için Image Upload

```typescript
const handleImageUpload = async (file: File) => {
  const reader = new FileReader()
  reader.onloadend = async () => {
    const base64String = reader.result as string
    
    const result = await uploadImageToSupabase(
      base64String,
      'blog',
      `blog-${Date.now()}`
    )
    
    if (result.success) {
      // Supabase URL'ini kullan
      setBlogImage(result.url)
    }
  }
  reader.readAsDataURL(file)
}
```

### Project için Image Upload

```typescript
const handleProjectImageUpload = async (file: File) => {
  const reader = new FileReader()
  reader.onloadend = async () => {
    const base64String = reader.result as string
    
    const result = await uploadImageToSupabase(
      base64String,
      'projects',
      `project-${Date.now()}`
    )
    
    if (result.success) {
      setProjectImage(result.url)
    }
  }
  reader.readAsDataURL(file)
}
```

---

## 🔄 Storage ve Database Entegrasyonu

Image URL'lerini Supabase database'de saklamak için:

### Blog Posts Table Update

```sql
ALTER TABLE blog_posts 
ADD COLUMN image_url TEXT,
ADD COLUMN image_path TEXT;
```

### Projects Table Update

```sql
ALTER TABLE projects 
ADD COLUMN image_url TEXT,
ADD COLUMN image_path TEXT;
```

### Insert with Image

```typescript
const { data, error } = await supabase
  .from('blog_posts')
  .insert({
    title: 'My Post',
    content: '...',
    image_url: publicUrl,
    image_path: filePath
  })
```

---

## 🗑️ Image Delete

Image silmek için:

```typescript
const deleteImage = async (imagePath: string) => {
  const { error } = await supabase.storage
    .from('portfolio-images')
    .remove([imagePath])
  
  if (error) {
    console.error('Delete error:', error)
  }
}
```

---

## ✅ Checklist

- [ ] Storage bucket oluşturuldu
- [ ] Storage policies ayarlandı
- [ ] API route oluşturuldu
- [ ] Helper functions eklendi
- [ ] Admin panel entegrasyonu yapıldı
- [ ] Database tables güncellendi
- [ ] Test upload yapıldı

---

## 🆘 Sorun Giderme

### "Bucket not found" Hatası

- Storage bucket'ın adını kontrol edin
- Bucket'ın oluşturulduğundan emin olun

### "Not authorized" Hatası

- Storage policies'i kontrol edin
- Authenticated olduğunuzdan emin olun

### Upload Yavaş

- Büyük görseller için optimize edin
- WebP formatı kullanın

---

İyi çalışmalar! 🚀

