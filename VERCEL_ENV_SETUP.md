# Vercel Environment Variables Kurulumu

## Vercel Dashboard'a Git

1. https://vercel.com/dashboard
2. Projenizi seçin: `alis-projects-a7c43f3e`
3. **Settings** → **Environment Variables**

## Supabase Credentials Ekle

### 1. Supabase URL'i Ekle:
- **Name:** `NEXT_PUBLIC_SUPABASE_URL`
- **Value:** Supabase dashboard'unuzdan alın (Settings → API → Project URL)
- **Environment:** Production, Preview, Development ✅
- **Add** butonuna tıklayın

### 2. Supabase Anon Key'i Ekle:
- **Name:** `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value:** Supabase dashboard'unuzdan alın (Settings → API → anon public key)
- **Environment:** Production, Preview, Development ✅
- **Add** butonuna tıklayın

## Redeploy Et

Environment variables ekledikten sonra:
1. **Deployments** sekmesine gidin
2. En üstteki deployment'ın sağındaki **⋮** (üç nokta) → **Redeploy**
3. Build'in bitmesini bekleyin (1-2 dakika)

## Test Et

Redeploy tamamlandıktan sonra:
1. Admin panel'e girin
2. Blog görseli yükleyin
3. Artık "Supabase'e yüklendi" mesajını görmelisiniz! ✅

