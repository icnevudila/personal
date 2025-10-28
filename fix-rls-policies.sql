-- Fix RLS policies for admin operations
-- Bu kodu Supabase SQL Editor'da çalıştırın

-- Drop existing policies
DROP POLICY IF EXISTS "Public read access for blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin write access for blog_posts" ON blog_posts;

-- Create new policies
CREATE POLICY "Public read access for blog_posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Admin write access for blog_posts" ON blog_posts
  FOR ALL USING (true);

-- Also fix projects policies
DROP POLICY IF EXISTS "Public read access for projects" ON projects;
DROP POLICY IF EXISTS "Admin write access for projects" ON projects;

CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Admin write access for projects" ON projects
  FOR ALL USING (true);

-- Fix site_settings policies
DROP POLICY IF EXISTS "Public read access for site_settings" ON site_settings;
DROP POLICY IF EXISTS "Admin write access for site_settings" ON site_settings;

CREATE POLICY "Public read access for site_settings" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admin write access for site_settings" ON site_settings
  FOR ALL USING (true);
