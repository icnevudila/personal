-- Daha fazla blog yazısı ekle (toplam 20+ yazı)
INSERT INTO blog_posts (title, excerpt, content, slug, category, image, date, read_time, featured, published) VALUES
('Vue.js 3 Composition API Rehberi', 'Vue.js 3''ün yeni Composition API''sini öğrenin ve modern Vue uygulamaları geliştirin.', 'Vue.js 3 Composition API ile geliştirme teknikleri...', 'vue3-composition-api', 'Development', 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400', NOW() - INTERVAL '21 days', '9 min', false, true),

('Sass ile CSS Organizasyonu', 'Sass kullanarak CSS kodlarınızı daha organize ve sürdürülebilir hale getirin.', 'Sass ile CSS organizasyonu teknikleri...', 'sass-css-organization', 'Design', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', NOW() - INTERVAL '22 days', '7 min', false, true),

('Webpack vs Vite Karşılaştırması', 'Modern build araçlarının avantaj ve dezavantajlarını karşılaştırın.', 'Webpack ve Vite karşılaştırması...', 'webpack-vs-vite', 'Development', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400', NOW() - INTERVAL '23 days', '8 min', true, true),

('Figma Auto Layout Kullanımı', 'Figma''da Auto Layout ile responsive tasarımlar oluşturun.', 'Figma Auto Layout teknikleri...', 'figma-auto-layout', 'Design', 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400', NOW() - INTERVAL '24 days', '6 min', false, true),

('Jest ile Unit Testing', 'Jest kullanarak JavaScript kodlarınızı test edin.', 'Jest ile unit testing teknikleri...', 'jest-unit-testing', 'Development', 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400', NOW() - INTERVAL '25 days', '10 min', false, true),

('CSS Custom Properties (CSS Variables)', 'CSS Custom Properties ile dinamik stiller oluşturun.', 'CSS Variables kullanım teknikleri...', 'css-custom-properties', 'Design', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', NOW() - INTERVAL '26 days', '5 min', false, true),

('Express.js ile RESTful API', 'Express.js kullanarak RESTful API''ler geliştirin.', 'Express.js API geliştirme...', 'express-restful-api', 'Development', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', NOW() - INTERVAL '27 days', '11 min', true, true),

('Adobe XD ile Prototyping', 'Adobe XD ile etkileşimli prototipler oluşturun.', 'Adobe XD prototyping teknikleri...', 'adobe-xd-prototyping', 'Design', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', NOW() - INTERVAL '28 days', '8 min', false, true),

('Redux Toolkit ile State Management', 'Redux Toolkit ile React state yönetimi.', 'Redux Toolkit kullanımı...', 'redux-toolkit-state', 'Development', 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', NOW() - INTERVAL '29 days', '12 min', true, true),

('Sketch ile UI Design', 'Sketch kullanarak profesyonel UI tasarımları.', 'Sketch UI design teknikleri...', 'sketch-ui-design', 'Design', 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400', NOW() - INTERVAL '30 days', '7 min', false, true),

('WebSocket ile Real-time Communication', 'WebSocket kullanarak gerçek zamanlı iletişim.', 'WebSocket implementasyonu...', 'websocket-realtime', 'Development', 'https://images.unsplash.com/photo-1605745341112-85968b19335a?w=400', NOW() - INTERVAL '31 days', '9 min', false, true),

('Adobe Illustrator ile Icon Design', 'Adobe Illustrator ile profesyonel ikonlar tasarlayın.', 'Illustrator icon design...', 'illustrator-icon-design', 'Design', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400', NOW() - INTERVAL '32 days', '6 min', false, true),

('Cypress ile E2E Testing', 'Cypress ile end-to-end testler yazın.', 'Cypress E2E testing...', 'cypress-e2e-testing', 'Development', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400', NOW() - INTERVAL '33 days', '10 min', true, true),

('Photoshop ile Web Design', 'Photoshop ile web tasarımı teknikleri.', 'Photoshop web design...', 'photoshop-web-design', 'Design', 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400', NOW() - INTERVAL '34 days', '8 min', false, true),

('Storybook ile Component Documentation', 'Storybook ile component dokümantasyonu.', 'Storybook kullanımı...', 'storybook-documentation', 'Development', 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400', NOW() - INTERVAL '35 days', '7 min', false, true),

('InVision ile Design Handoff', 'InVision ile tasarım teslim süreci.', 'InVision design handoff...', 'invision-design-handoff', 'Design', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', NOW() - INTERVAL '36 days', '6 min', false, true),

('Webpack Bundle Analyzer', 'Webpack bundle analizi ve optimizasyonu.', 'Webpack bundle analyzer...', 'webpack-bundle-analyzer', 'Development', 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400', NOW() - INTERVAL '37 days', '8 min', false, true),

('Zeplin ile Design Collaboration', 'Zeplin ile tasarım işbirliği.', 'Zeplin collaboration...', 'zeplin-collaboration', 'Design', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', NOW() - INTERVAL '38 days', '5 min', false, true),

('ESLint ile Code Quality', 'ESLint ile kod kalitesi kontrolü.', 'ESLint code quality...', 'eslint-code-quality', 'Development', 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400', NOW() - INTERVAL '39 days', '6 min', false, true),

('Adobe After Effects ile Motion Graphics', 'After Effects ile web animasyonları.', 'After Effects motion graphics...', 'after-effects-motion', 'Design', 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400', NOW() - INTERVAL '40 days', '9 min', false, true);
