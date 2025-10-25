// Blog posts'ları localStorage'a eklemek için
// Browser console'da çalıştırın

const blogPosts = [
  {
    title: 'Modern Araçlarla Tasarım Sürecini Hızlandırmak',
    excerpt: 'Güncel araçları kullanarak web tasarımında zaman kazanmanın ve yaratıcı süreçleri optimize etmenin yollarını keşfedin.',
    date: '2024-01-15',
    readTime: '5 dk okuma',
    slug: 'modern-araclar-tasarim-sureci',
    category: 'Design',
    featured: true,
    content: 'Content here...'
  },
  {
    title: 'Minimalizm ve Duygusal Tasarım',
    excerpt: 'Sade arayüzler tasarlarken kullanıcıların duygusal bağ kurabilmesi için dikkat edilmesi gerekenleri öğrenin.',
    date: '2024-01-10',
    readTime: '8 dk okuma',
    slug: 'minimalizm-duygusal-tasarim',
    category: 'Design',
    featured: true,
    content: 'Content here...'
  }
]

localStorage.setItem('blogPosts', JSON.stringify(blogPosts))
console.log('✅ Blog posts added to localStorage!')

