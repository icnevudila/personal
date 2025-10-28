-- Blog yazılarına tarih ekle
UPDATE blog_posts 
SET date = NOW() - INTERVAL '1 day' 
WHERE title = 'Web Tasarımı Temelleri';

UPDATE blog_posts 
SET date = NOW() - INTERVAL '2 days' 
WHERE title = 'React ile Modern UI';

UPDATE blog_posts 
SET date = NOW() - INTERVAL '3 days' 
WHERE title = 'JavaScript ES6+ Özellikleri';
