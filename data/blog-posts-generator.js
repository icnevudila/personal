// 100 Blog Post Generator
const generateBlogPosts = () => {
  const categories = ['Design', 'Development', 'AI', 'Performance', 'UX/UI', 'Technology', 'Tutorial', 'Case Study']
  const topics = [
    'Modern Web Tasarımı', 'React Best Practices', 'AI ve Yaratıcılık', 'Performance Optimization',
    'User Experience', 'Mobile First Design', 'CSS Grid', 'JavaScript ES6+', 'TypeScript',
    'Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive Design', 'Accessibility',
    'SEO Optimization', 'Web Security', 'API Design', 'Database Design', 'Cloud Computing',
    'DevOps', 'Git Workflow', 'Testing Strategies', 'Code Review', 'Agile Development',
    'Design Systems', 'Color Theory', 'Typography', 'Layout Design', 'Animation',
    'Micro-interactions', 'User Research', 'Prototyping', 'Wireframing', 'Information Architecture',
    'Content Strategy', 'Branding', 'Logo Design', 'Visual Hierarchy', 'White Space',
    'Contrast', 'Balance', 'Proximity', 'Alignment', 'Repetition', 'Consistency',
    'Scalability', 'Maintainability', 'Code Quality', 'Documentation', 'Version Control',
    'Deployment', 'Monitoring', 'Analytics', 'A/B Testing', 'Conversion Optimization',
    'Landing Pages', 'E-commerce', 'SaaS Design', 'Dashboard Design', 'Data Visualization',
    'Charts', 'Graphs', 'Infographics', 'Icons', 'Illustrations', 'Photography',
    'Video Content', 'Podcast Design', 'Social Media', 'Email Marketing', 'Content Marketing',
    'Growth Hacking', 'Startup', 'Freelancing', 'Remote Work', 'Productivity',
    'Time Management', 'Project Management', 'Client Relations', 'Pricing Strategies',
    'Portfolio Building', 'Networking', 'Career Development', 'Learning', 'Mentoring',
    'Community Building', 'Open Source', 'Contributing', 'Speaking', 'Writing',
    'Teaching', 'Consulting', 'Agency', 'Studio', 'Team Building', 'Leadership',
    'Innovation', 'Trends', 'Future', 'Predictions', 'Analysis', 'Reviews'
  ]

  const posts = []
  
  for (let i = 1; i <= 100; i++) {
    const topic = topics[Math.floor(Math.random() * topics.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const date = new Date(2024, 0, i)
    
    posts.push({
      id: i,
      title: `${topic}: ${i}. Adımda Uzmanlaşma`,
      slug: `${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i}`,
      excerpt: `${topic} konusunda ${i}. seviyeye ulaşmak için bilmeniz gereken temel prensipler ve uygulamalar. Bu kapsamlı rehber ile ${category} alanında uzmanlaşın.`,
      content: `# ${topic}: ${i}. Adımda Uzmanlaşma

Bu kapsamlı rehberde ${topic} konusunda ${i}. seviyeye ulaşmak için bilmeniz gereken tüm detayları bulacaksınız.

## Temel Kavramlar

${topic} alanında başarılı olmak için öncelikle temel kavramları anlamanız gerekiyor. Bu kavramlar:

- Temel prensipler
- Best practices
- Yaygın hatalar
- Optimizasyon teknikleri

## Pratik Uygulamalar

Teorik bilgiyi pratiğe dökmek için:

1. Proje örnekleri
2. Kod parçacıkları
3. Gerçek dünya senaryoları
4. Problem çözme yaklaşımları

## İleri Seviye Teknikler

${i}. seviyeye ulaştıktan sonra:

- Gelişmiş optimizasyonlar
- Performans iyileştirmeleri
- Ölçeklenebilir çözümler
- Gelecek trendleri

## Sonuç

${topic} konusunda ${i}. seviyeye ulaşmak sabır ve pratik gerektirir. Bu rehberdeki adımları takip ederek başarıya ulaşabilirsiniz.`,
      date: date.toISOString().split('T')[0],
      readTime: `${Math.floor(Math.random() * 10) + 3} dk okuma`,
      category: category,
      featured: i <= 6, // İlk 6 yazı featured
      image: i <= 6 ? `/portfolio/blog-${i}.jpg` : undefined
    })
  }
  
  return posts
}

export const blogPosts = generateBlogPosts()
