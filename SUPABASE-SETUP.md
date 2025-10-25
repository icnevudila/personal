# Supabase Kurulum Rehberi

Bu rehber, projenizde Supabase'i nasıl kuracağınızı ve kullanacağınızı açıklar.

## 📋 İçindekiler

1. [Supabase Hesabı Oluşturma](#supabase-hesabı-oluşturma)
2. [Environment Variables Ayarlama](#environment-variables-ayarlama)
3. [Veritabanı Tabloları Oluşturma](#veritabanı-tabloları-oluşturma)
4. [Kullanım Örnekleri](#kullanım-örnekleri)
5. [Componentlerde Kullanım](#componentlerde-kullanım)

---

## 🚀 Supabase Hesabı Oluşturma

1. [Supabase](https://supabase.com) adresine gidin
2. Ücretsiz hesap oluşturun
3. Yeni bir proje oluşturun
4. Proje ayarlarından URL ve Anon Key'i kopyalayın

---

## 🔑 Environment Variables Ayarlama

`.env.local` dosyanıza şu değişkenleri ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Önemli:** 
- Vercel deployment için bu değişkenleri Vercel Dashboard'da da ekleyin
- Değişkenler `NEXT_PUBLIC_` ile başlamalı (client-side kullanım için)

---

## 🗄️ Veritabanı Tabloları Oluşturma

Supabase Dashboard > SQL Editor'de aşağıdaki SQL komutlarını çalıştırın:

### Blog Posts Tablosu

```sql
CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  read_time TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index'ler
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_date ON blog_posts(date DESC);
```

### Projects Tablosu

```sql
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_projects_featured ON projects(featured);
```

### Images Tablosu

```sql
CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  section TEXT NOT NULL,
  alt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_images_section ON images(section);
```

### Row Level Security (RLS) Ayarları

```sql
-- Blog posts için herkes okuyabilir, admin yazabilir
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (true);

CREATE POLICY "Blog posts are insertable by authenticated users"
  ON blog_posts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Blog posts are updatable by authenticated users"
  ON blog_posts FOR UPDATE
  USING (true);

CREATE POLICY "Blog posts are deletable by authenticated users"
  ON blog_posts FOR DELETE
  USING (true);

-- Projects için herkes okuyabilir
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone"
  ON projects FOR SELECT
  USING (true);

-- Images için herkes okuyabilir ve yazabilir
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Images are viewable by everyone"
  ON images FOR SELECT
  USING (true);

CREATE POLICY "Images are insertable by everyone"
  ON images FOR INSERT
  WITH CHECK (true);
```

---

## 💡 Kullanım Örnekleri

### 1. Basit Fetch (lib/supabase-examples.ts)

```typescript
import { getBlogPosts } from '@/lib/supabase-examples'

// Component içinde
const posts = await getBlogPosts()
```

### 2. Hook Kullanımı (lib/hooks/useSupabase.ts)

```typescript
import { useSupabaseData } from '@/lib/hooks/useSupabase'

function MyComponent() {
  const { data, loading, error } = useSupabaseData('blog_posts')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {data.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}
```

### 3. Insert İşlemi

```typescript
import { useSupabaseInsert } from '@/lib/hooks/useSupabase'

function AddPost() {
  const { insert, loading } = useSupabaseInsert('blog_posts')
  
  const handleAdd = async () => {
    try {
      await insert({
        title: 'Yeni Post',
        excerpt: 'Özet',
        content: 'İçerik',
        date: '2024-01-01',
        readTime: '5 dk',
        slug: 'yeni-post',
        category: 'Design'
      })
      alert('Başarılı!')
    } catch (error) {
      console.error(error)
    }
  }
  
  return <button onClick={handleAdd} disabled={loading}>Ekle</button>
}
```

### 4. Update İşlemi

```typescript
import { useSupabaseUpdate } from '@/lib/hooks/useSupabase'

function EditPost({ postId }: { postId: number }) {
  const { update, loading } = useSupabaseUpdate('blog_posts')
  
  const handleUpdate = async () => {
    try {
      await update(postId, {
        title: 'Güncellenmiş Başlık'
      })
      alert('Güncellendi!')
    } catch (error) {
      console.error(error)
    }
  }
  
  return <button onClick={handleUpdate} disabled={loading}>Güncelle</button>
}
```

### 5. Delete İşlemi

```typescript
import { useSupabaseDelete } from '@/lib/hooks/useSupabase'

function DeletePost({ postId }: { postId: number }) {
  const { deleteRecord, loading } = useSupabaseDelete('blog_posts')
  
  const handleDelete = async () => {
    if (confirm('Silmek istediğinizden emin misiniz?')) {
      try {
        await deleteRecord(postId)
        alert('Silindi!')
      } catch (error) {
        console.error(error)
      }
    }
  }
  
  return <button onClick={handleDelete} disabled={loading}>Sil</button>
}
```

---

## 🎨 Componentlerde Kullanım

### Blog Component'i Örneği

```typescript
'use client'

import { useEffect, useState } from 'react'
import { getBlogPosts, BlogPost } from '@/lib/supabase-examples'

export function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const data = await getBlogPosts()
      setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

---

## 📊 Supabase Dashboard

Supabase Dashboard'da şunları yapabilirsiniz:

- ✅ Veritabanı tablolarını görüntüleme ve düzenleme
- ✅ Gerçek zamanlı veri izleme
- ✅ SQL sorguları çalıştırma
- ✅ API ayarlarını yapılandırma
- ✅ Authentication ayarları
- ✅ Storage (dosya yükleme) ayarları

---

## 🔒 Güvenlik Notları

1. **RLS Politikaları:** Her tablo için Row Level Security'i etkinleştirin
2. **API Keys:** Anon Key'i client-side kullanın, Service Role Key'i ASLA paylaşmayın
3. **Veri Doğrulama:** Her veri girişini doğrulayın (Zod kullanabilirsiniz)
4. **Rate Limiting:** Supabase'in rate limit'lerini kontrol edin

---

## 🆘 Sorun Giderme

### "Missing Supabase environment variables" Hatası

- `.env.local` dosyasını kontrol edin
- Vercel'de environment variables'ları kontrol edin
- Değişkenlerin `NEXT_PUBLIC_` ile başladığından emin olun

### Veritabanı Bağlantı Hatası

- Supabase projenizin aktif olduğundan emin olun
- URL ve Anon Key'in doğru olduğunu kontrol edin
- Network isteklerini tarayıcı console'unda kontrol edin

---

## 📚 Ek Kaynaklar

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase React Hooks](https://supabase.com/docs/guides/auth/auth-helpers/react)

---

İyi çalışmalar! 🚀

