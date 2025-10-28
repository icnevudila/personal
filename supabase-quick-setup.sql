-- Supabase Quick Setup - Blog Posts ve Projects Tabloları
-- Bu kodu Supabase SQL Editor'da çalıştırın

-- 1. Blog Posts Tablosu
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

-- 2. Projects Tablosu
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

-- 3. Site Settings Tablosu
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. RLS Ayarları (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- 5. Public Read Policies
CREATE POLICY "Public read access for blog_posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Public read access for site_settings" ON site_settings
  FOR SELECT USING (true);

-- 6. Admin Write Policies (Allow all for now)
CREATE POLICY "Admin write access for blog_posts" ON blog_posts
  FOR ALL USING (true);

CREATE POLICY "Admin write access for projects" ON projects
  FOR ALL USING (true);

CREATE POLICY "Admin write access for site_settings" ON site_settings
  FOR ALL USING (true);

-- 7. Sample Data - Blog Posts
INSERT INTO blog_posts (title, excerpt, content, slug, category, image, featured, published) VALUES
('Web Tasarımı Temelleri', 'Modern web tasarımının temel prensiplerini öğrenin', 'Detaylı içerik burada...', 'web-tasarimi-temelleri', 'Design', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80', TRUE, TRUE),
('React ile Modern UI', 'React kullanarak modern kullanıcı arayüzleri oluşturun', 'Detaylı içerik burada...', 'react-modern-ui', 'Development', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80', TRUE, TRUE),
('CSS Grid Masterclass', 'CSS Grid ile profesyonel layoutlar tasarlayın', 'Detaylı içerik burada...', 'css-grid-masterclass', 'Tutorial', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&q=80', FALSE, TRUE)
ON CONFLICT (slug) DO NOTHING;

-- 8. Sample Data - Projects
INSERT INTO projects (title, description, image, technologies, featured) VALUES
('E-Commerce Platform', 'Modern e-ticaret platformu', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&q=80', ARRAY['React', 'Node.js', 'MongoDB'], TRUE),
('Portfolio Website', 'Kişisel portföy websitesi', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80', ARRAY['Next.js', 'TypeScript', 'Tailwind'], TRUE),
('Mobile App', 'iOS ve Android uygulaması', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80', ARRAY['React Native', 'Firebase'], FALSE)
ON CONFLICT DO NOTHING;

-- 9. Sample Data - Site Settings
INSERT INTO site_settings (key, value) VALUES
('site_title', 'Personal Portfolio'),
('site_description', 'Modern portfolio website'),
('hero_image', ''),
('about_image', '')
ON CONFLICT (key) DO NOTHING;

-- 10. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
