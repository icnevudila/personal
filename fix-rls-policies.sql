-- RLS Politikalarını Düzelt - Admin Panel İçin
-- Bu kodu Supabase SQL Editor'da çalıştırın

-- 1. Mevcut politikaları sil
DROP POLICY IF EXISTS "Public read access for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public read access for projects" ON projects;
DROP POLICY IF EXISTS "Public read access for site_settings" ON site_settings;
DROP POLICY IF EXISTS "Admin write access for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin write access for projects" ON projects;
DROP POLICY IF EXISTS "Admin write access for site_settings" ON site_settings;

-- 2. Yeni politikalar oluştur - Herkes okuyabilir, herkes yazabilir (geçici)
CREATE POLICY "Allow all operations on blog_posts" ON blog_posts
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on projects" ON projects
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on site_settings" ON site_settings
  FOR ALL USING (true) WITH CHECK (true);

-- 3. YouTube tabloları için de aynı şeyi yap
DROP POLICY IF EXISTS "Public read access for youtube_channel" ON youtube_channel;
DROP POLICY IF EXISTS "Public read access for youtube_videos" ON youtube_videos;
DROP POLICY IF EXISTS "Admin write access for youtube_channel" ON youtube_channel;
DROP POLICY IF EXISTS "Admin write access for youtube_videos" ON youtube_videos;

CREATE POLICY "Allow all operations on youtube_channel" ON youtube_channel
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all operations on youtube_videos" ON youtube_videos
  FOR ALL USING (true) WITH CHECK (true);

-- 4. Test için basit bir sorgu çalıştır
SELECT COUNT(*) as blog_count FROM blog_posts;
SELECT COUNT(*) as project_count FROM projects;
SELECT COUNT(*) as settings_count FROM site_settings;