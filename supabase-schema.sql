-- Supabase Database Schema for Personal Portfolio CMS
-- Bu dosyayı Supabase SQL Editor'da çalıştırın

-- Enable RLS (Row Level Security)
ALTER TABLE IF EXISTS auth.users ENABLE ROW LEVEL SECURITY;

-- 1. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_time TEXT DEFAULT '5 min',
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. YouTube Channel Table
CREATE TABLE IF NOT EXISTS youtube_channel (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_name TEXT NOT NULL DEFAULT 'icnevudila',
  channel_url TEXT NOT NULL DEFAULT 'https://youtube.com/@icnevudila',
  subscriber_count TEXT DEFAULT '0',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. YouTube Videos Table
CREATE TABLE IF NOT EXISTS youtube_videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id UUID REFERENCES youtube_channel(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  duration TEXT DEFAULT '00:00',
  thumbnail TEXT,
  url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  technologies TEXT[],
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default YouTube channel
INSERT INTO youtube_channel (channel_name, channel_url, subscriber_count, is_active)
VALUES ('icnevudila', 'https://youtube.com/@icnevudila', '0', TRUE)
ON CONFLICT DO NOTHING;

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
('site_logo', ''),
('site_favicon', ''),
('hero_image', ''),
('about_image', ''),
('site_title', 'Personal Portfolio'),
('site_description', 'Modern portfolio website')
ON CONFLICT (key) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, excerpt, content, slug, category, image, featured, published) VALUES
('Web Tasarımı Temelleri', 'Modern web tasarımının temel prensiplerini öğrenin', 'Detaylı içerik...', 'web-tasarimi-temelleri', 'Design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80', TRUE, TRUE),
('React ile Modern UI', 'React kullanarak modern kullanıcı arayüzleri oluşturun', 'Detaylı içerik...', 'react-modern-ui', 'Development', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80', TRUE, TRUE),
('CSS Grid Masterclass', 'CSS Grid ile profesyonel layoutlar tasarlayın', 'Detaylı içerik...', 'css-grid-masterclass', 'Tutorial', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&q=80', FALSE, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, description, image, technologies, featured) VALUES
('E-Commerce Platform', 'Modern e-ticaret platformu', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80', ARRAY['React', 'Node.js', 'MongoDB'], TRUE),
('Portfolio Website', 'Kişisel portföy websitesi', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80', ARRAY['Next.js', 'TypeScript', 'Tailwind'], TRUE),
('Mobile App', 'iOS ve Android uygulaması', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80', ARRAY['React Native', 'Firebase'], FALSE)
ON CONFLICT DO NOTHING;

-- Insert sample YouTube videos
INSERT INTO youtube_videos (channel_id, title, duration, url) 
SELECT 
  yc.id,
  'Web Tasarımı Temelleri',
  '15:30',
  'https://youtube.com/watch?v=example1'
FROM youtube_channel yc
WHERE yc.channel_name = 'icnevudila'
ON CONFLICT DO NOTHING;

INSERT INTO youtube_videos (channel_id, title, duration, url) 
SELECT 
  yc.id,
  'React ile Modern UI',
  '22:15',
  'https://youtube.com/watch?v=example2'
FROM youtube_channel yc
WHERE yc.channel_name = 'icnevudila'
ON CONFLICT DO NOTHING;

INSERT INTO youtube_videos (channel_id, title, duration, url) 
SELECT 
  yc.id,
  'CSS Grid Masterclass',
  '18:45',
  'https://youtube.com/watch?v=example3'
FROM youtube_channel yc
WHERE yc.channel_name = 'icnevudila'
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_youtube_videos_channel ON youtube_videos(channel_id);

-- Enable RLS on all tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_channel ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for blog_posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access for youtube_channel" ON youtube_channel
  FOR SELECT USING (true);

CREATE POLICY "Public read access for youtube_videos" ON youtube_videos
  FOR SELECT USING (true);

CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for site_settings" ON site_settings
  FOR SELECT USING (true);

-- Create policies for admin write access (you'll need to update this with your admin user ID)
-- For now, we'll allow all authenticated users to write (you can restrict this later)
CREATE POLICY "Admin write access for blog_posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access for youtube_channel" ON youtube_channel
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access for youtube_videos" ON youtube_videos
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access for projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin write access for site_settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_youtube_channel_updated_at BEFORE UPDATE ON youtube_channel
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_youtube_videos_updated_at BEFORE UPDATE ON youtube_videos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
