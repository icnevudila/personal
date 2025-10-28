'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  featured?: boolean
  image?: string
  published?: boolean
}

export default function BlogDetail() {
  const params = useParams()
  const slug = params.slug as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  // Generate category-specific images using Unsplash API
  const getCategoryImage = (category: string, index: number): string => {
    const categoryImages = {
      Development: [
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80'
      ],
      Design: [
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&q=80'
      ],
      AI: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&q=80'
      ],
      Performance: [
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&q=80'
      ],
      'UX/UI': [
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&q=80'
      ],
      Technology: [
        'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&q=80'
      ],
      Tutorial: [
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&q=80'
      ],
      'Case Study': [
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=600&fit=crop&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80'
      ],
    }
    
    const images = categoryImages[category as keyof typeof categoryImages] || categoryImages.Tutorial
    return images[index % images.length]
  }

  useEffect(() => {
    // Generate the same blog posts as in Blog component
    const generateBlogPosts = (): BlogPost[] => {
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

      const posts: BlogPost[] = []
      
      for (let i = 1; i <= 100; i++) {
        const topic = topics[Math.floor(Math.random() * topics.length)]
        const category = categories[Math.floor(Math.random() * categories.length)]
        
        // İlk 60 yazı: bugüne kadar (geçmiş tarihler)
        // Sonraki 40 yazı: gelecek 40 gün
        let date: Date
        if (i <= 60) {
          date = new Date(2024, 11, 20 - i) // Son 60 gün
        } else {
          date = new Date(2024, 11, 21 + (i - 60)) // Gelecek 40 gün
        }
        
        const published = i <= 60 // İlk 60 yazı published
        
        posts.push({
          id: i,
          title: `${topic}: ${i}. Adımda Uzmanlaşma`,
          slug: `${topic.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${i}`,
          excerpt: `${topic} konusunda ${i}. seviyeye ulaşmak için bilmeniz gereken temel prensipler ve uygulamalar. Bu kapsamlı rehber ile ${category} alanında uzmanlaşın.`,
          content: `# ${topic}: ${i}. Adımda Uzmanlaşma

Bu kapsamlı rehberde ${topic} konusunda ${i}. seviyeye ulaşmak için bilmeniz gereken tüm detayları bulacaksınız.

## Temel Kavramlar

${topic} alanında başarılı olmak için öncelikle temel kavramları anlamanız gerekiyor. Bu kavramlar:

- Temel prensipler ve teorik altyapı
- Best practices ve endüstri standartları
- Yaygın hatalar ve bunlardan kaçınma yolları
- Optimizasyon teknikleri ve performans iyileştirmeleri

## Pratik Uygulamalar

Teorik bilgiyi pratiğe dökmek için:

1. **Proje örnekleri**: Gerçek dünya senaryolarında ${topic} nasıl uygulanır
2. **Kod parçacıkları**: Kullanıma hazır kod örnekleri ve açıklamaları
3. **Gerçek dünya senaryoları**: Endüstri deneyimleri ve case study'ler
4. **Problem çözme yaklaşımları**: Karşılaşılan sorunlar ve çözüm yöntemleri

## Detaylı İçerik

${topic} konusunda derinlemesine bilgi sahibi olmak için:

### Alt Başlık 1: Temel Prensipler
${topic} alanında başarılı olmak için bilmeniz gereken temel prensipler şunlardır:

- **Prensip 1**: Detaylı açıklama ve örnekler
- **Prensip 2**: Uygulama alanları ve kullanım senaryoları
- **Prensip 3**: Avantajları ve dezavantajları

### Alt Başlık 2: İleri Seviye Teknikler
${i}. seviyeye ulaştıktan sonra öğrenebileceğiniz teknikler:

- **Teknik 1**: Gelişmiş optimizasyonlar ve performans iyileştirmeleri
- **Teknik 2**: Ölçeklenebilir çözümler ve mimari desenler
- **Teknik 3**: Gelecek trendleri ve teknoloji öngörüleri

### Alt Başlık 3: Pratik Örnekler
Gerçek projelerde ${topic} nasıl uygulanır:

\`\`\`javascript
// Örnek kod bloğu
function ${topic.toLowerCase().replace(/[^a-z0-9]/g, '')}Example() {
  // Detaylı kod açıklaması
  return "Başarılı sonuç";
}
\`\`\`

## Sonuç ve Öneriler

${topic} konusunda ${i}. seviyeye ulaşmak sabır ve pratik gerektirir. Bu rehberdeki adımları takip ederek başarıya ulaşabilirsiniz.

### Önemli Noktalar:
- Sürekli öğrenme ve güncel kalma
- Pratik yapma ve proje geliştirme
- Topluluk ile etkileşim ve deneyim paylaşımı
- Mentoring ve geri bildirim alma

### Gelecek Adımlar:
1. Bu rehberdeki bilgileri pratikte uygulayın
2. Daha ileri seviye kaynakları araştırın
3. Projelerinizde bu teknikleri kullanın
4. Deneyimlerinizi başkalarıyla paylaşın

Bu yolculukta başarılar dileriz! 🚀`,
          date: date.toISOString().split('T')[0],
          readTime: `${Math.floor(Math.random() * 10) + 3} dk okuma`,
          category: category,
          featured: i <= 6,
          image: i <= 6 ? getCategoryImage(category, i) : undefined,
          published: published
        })
      }
      
      return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }

    const posts = generateBlogPosts()
    const foundPost = posts.find(p => p.slug === slug)
    
    // Her zaman bir post göster (bulunamazsa ilk postu göster)
    setPost(foundPost || posts[0])
    setLoading(false)
  }, [slug])

  const getCategoryColor = (category: string) => {
    const colors = {
      Development: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Design: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Performance: 'bg-green-500/20 text-green-400 border-green-500/30',
      AI: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'UX/UI': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      Technology: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      Tutorial: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Case Study': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#151515] flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-96 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Post her zaman var olacak, bu kontrolü kaldırıyoruz

  return (
    <div className="min-h-screen bg-[#151515]">
      <div className="container-custom py-16">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 text-[#F97316] hover:text-[#ea6707] transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Blog'a Dön
          </Link>
        </motion.div>

        {/* Article */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <header className="mb-12">
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${post ? getCategoryColor(post.category) : 'border-gray-600 text-gray-400'}`}>
                {post?.category || 'Uncategorized'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post?.title || 'Loading...'}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post?.excerpt || 'Loading...'}
            </p>
            
            <div className="flex items-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{post?.date ? new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Loading...'}</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>{post?.readTime || 'Loading...'}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post?.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative overflow-hidden rounded-xl">
                <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">Blog Görseli</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            <div className="text-gray-300 leading-relaxed whitespace-pre-line">
              {post?.content || 'Loading...'}
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-gray-700"
          >
            <div className="flex justify-between items-center">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] hover:bg-[#ea6707] text-white rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Tüm Yazıları Gör
              </Link>
              
              <div className="text-sm text-gray-400">
                <span className="font-mono">icnevudila</span>
              </div>
            </div>
          </motion.div>
        </motion.article>
      </div>
    </div>
  )
}