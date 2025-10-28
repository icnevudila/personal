-- Site settings'e örnek veriler ekle
INSERT INTO site_settings (key, value) VALUES
('hero_image', 'https://res.cloudinary.com/dqiwrytdx/image/upload/hero/hero-profile-1761406363151.jpg'),
('about_image', 'https://res.cloudinary.com/dqiwrytdx/image/upload/v1761406379/hero/about-profile-1761406376606.jpg'),
('site_title', 'icnevudila - Web Developer & Designer'),
('site_description', 'Modern web tasarımı ve geliştirme hizmetleri'),
('hero_title', 'icnevudila'),
('hero_subtitle', 'Web Developer & Designer'),
('hero_description', 'Modern web teknolojileri ile sade ve kullanıcı odaklı tasarımlar yapıyorum.'),
('about_title', 'Hakkımda'),
('about_description', 'Modern UI/UX prensiplerini kullanarak sakin, insan odaklı web siteleri tasarlıyorum. Sezgisel düzenler, dengeli renk kullanımı ve görsel hikaye anlatan tasarım sistemleri üzerinde odaklanıyorum.'),
('contact_email', 'contact@icnevudila.com'),
('contact_phone', '+90 555 123 45 67'),
('social_instagram', 'https://instagram.com/icnevudila'),
('social_twitter', 'https://twitter.com/icnevudila'),
('social_linkedin', 'https://linkedin.com/in/icnevudila'),
('social_github', 'https://github.com/icnevudila')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
