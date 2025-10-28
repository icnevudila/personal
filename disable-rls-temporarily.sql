-- Temporarily disable RLS for testing
-- Bu kodu Supabase SQL Editor'da çalıştırın

-- Disable RLS on all tables temporarily
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_channel DISABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos DISABLE ROW LEVEL SECURITY;

-- This will allow all operations without RLS restrictions
