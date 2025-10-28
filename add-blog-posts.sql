-- Blog yazılarına tarih ekle ve yeni yazılar ekle
UPDATE blog_posts 
SET date = NOW() - INTERVAL '1 day' 
WHERE title = 'Web Tasarımı Temelleri';

UPDATE blog_posts 
SET date = NOW() - INTERVAL '2 days' 
WHERE title = 'React ile Modern UI';

UPDATE blog_posts 
SET date = NOW() - INTERVAL '3 days' 
WHERE title = 'JavaScript ES6+ Özellikleri';

-- Yeni blog yazıları ekle
INSERT INTO blog_posts (title, excerpt, content, slug, category, image, date, read_time, featured, published) VALUES
('Next.js 14 ile Full-Stack Geliştirme', 'Next.js 14''ün yeni özelliklerini keşfedin ve modern web uygulamaları geliştirin.', 'Next.js 14 ile full-stack geliştirme hakkında detaylı rehber...', 'nextjs-14-fullstack', 'Development', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', NOW() - INTERVAL '4 days', '8 min', true, true),

('CSS Grid ile Responsive Layout', 'CSS Grid kullanarak modern ve esnek layoutlar oluşturun.', 'CSS Grid ile responsive tasarım teknikleri...', 'css-grid-responsive', 'Design', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', NOW() - INTERVAL '5 days', '6 min', false, true),

('TypeScript Best Practices', 'TypeScript ile daha güvenli ve ölçeklenebilir kod yazın.', 'TypeScript kullanımında dikkat edilmesi gerekenler...', 'typescript-best-practices', 'Development', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400', NOW() - INTERVAL '6 days', '10 min', true, true),

('Figma ile UI/UX Tasarım', 'Figma kullanarak profesyonel UI/UX tasarımları yapın.', 'Figma ile tasarım süreci ve teknikleri...', 'figma-ui-ux-design', 'Design', 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400', NOW() - INTERVAL '7 days', '7 min', false, true),

('Node.js ile API Geliştirme', 'Node.js ve Express kullanarak RESTful API''ler oluşturun.', 'Node.js ile backend geliştirme rehberi...', 'nodejs-api-development', 'Development', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', NOW() - INTERVAL '8 days', '12 min', true, true),

('Tailwind CSS ile Hızlı Styling', 'Tailwind CSS ile hızlı ve tutarlı stil geliştirme.', 'Tailwind CSS kullanım teknikleri ve ipuçları...', 'tailwind-css-styling', 'Design', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', NOW() - INTERVAL '9 days', '5 min', false, true),

('MongoDB ve Mongoose Kullanımı', 'MongoDB veritabanı ve Mongoose ODM ile veri yönetimi.', 'MongoDB ile NoSQL veritabanı kullanımı...', 'mongodb-mongoose', 'Development', 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400', NOW() - INTERVAL '10 days', '9 min', false, true),

('Web Accessibility (A11y) Rehberi', 'Web erişilebilirliği için temel prensipler ve uygulamalar.', 'Web accessibility standartları ve uygulamaları...', 'web-accessibility-guide', 'Design', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', NOW() - INTERVAL '11 days', '8 min', true, true),

('Git ve GitHub Workflow', 'Git versiyon kontrolü ve GitHub ile işbirliği.', 'Git ve GitHub kullanımı ve best practices...', 'git-github-workflow', 'Development', 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400', NOW() - INTERVAL '12 days', '6 min', false, true),

('Progressive Web App (PWA)', 'PWA geliştirme ve native app deneyimi sunma.', 'Progressive Web App geliştirme rehberi...', 'progressive-web-app', 'Development', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', NOW() - INTERVAL '13 days', '11 min', true, true),

('Design System Oluşturma', 'Tutarlı tasarım sistemi oluşturma ve yönetme.', 'Design system oluşturma süreci ve araçları...', 'design-system-creation', 'Design', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400', NOW() - INTERVAL '14 days', '9 min', false, true),

('Docker ile Containerization', 'Docker kullanarak uygulamaları containerize etme.', 'Docker ve containerization teknikleri...', 'docker-containerization', 'Development', 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=400', NOW() - INTERVAL '15 days', '10 min', false, true),

('Web Performance Optimizasyonu', 'Web sitelerinin performansını artırma teknikleri.', 'Web performance optimizasyonu rehberi...', 'web-performance-optimization', 'Development', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', NOW() - INTERVAL '16 days', '7 min', true, true),

('Figma Plugins ve Otomasyon', 'Figma plugin geliştirme ve tasarım otomasyonu.', 'Figma plugin geliştirme ve kullanımı...', 'figma-plugins-automation', 'Design', 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400', NOW() - INTERVAL '17 days', '8 min', false, true),

('GraphQL ile Modern API', 'GraphQL kullanarak esnek ve verimli API''ler oluşturun.', 'GraphQL ile API geliştirme teknikleri...', 'graphql-modern-api', 'Development', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', NOW() - INTERVAL '18 days', '12 min', true, true),

('Micro-frontend Architecture', 'Micro-frontend mimarisi ile ölçeklenebilir uygulamalar.', 'Micro-frontend architecture ve uygulamaları...', 'micro-frontend-architecture', 'Development', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400', NOW() - INTERVAL '19 days', '13 min', false, true),

('Design Thinking Süreci', 'Design thinking metodolojisi ile problem çözme.', 'Design thinking süreci ve uygulamaları...', 'design-thinking-process', 'Design', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', NOW() - INTERVAL '20 days', '6 min', false, true);
