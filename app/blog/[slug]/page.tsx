'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

interface BlogPost {
  id?: number
  title: string
  slug: string
  excerpt: string
  content?: string
  date: string
  readTime: string
  category: string
  featured?: boolean
  image?: string
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('blogPosts')
    
    if (saved) {
      try {
        const posts = JSON.parse(saved)
        const found = posts.find((p: BlogPost) => p.slug === params.slug)
        setPost(found || null)
      } catch (e) {
        console.error('Error parsing blog posts:', e)
      }
    } else {
      // Fallback to default posts
      const defaultPosts = [
        {
          title: 'Yapay Zekâ ile Tasarım Sürecini Hızlandırmak',
          excerpt: 'AI araçlarını kullanarak web tasarımında zaman kazanmanın ve yaratıcı süreçleri optimize etmenin yollarını keşfedin.',
          content: `Web tasarımında yapay zekâ araçları giderek daha önemli bir rol oynuyor. ChatGPT, Midjourney ve Leonardo AI gibi araçlar sayesinde tasarım süreçlerini hızlandırabilir ve yaratıcılığımızı destekleyebiliriz.

## AI Araçlarının Rolü

Yapay zekâ, tasarımcıların tekrarlayan görevlerini azaltarak odaklanmalarını gereken alanlara yönlendiriyor. Örneğin, renk paletleri oluşturma, layout önerileri alma ve tipografi seçimi gibi konularda AI'dan destek alabiliriz.

## Pratik Örnekler

Günlük iş akışında, AI araçlarından şu şekillerde faydalanabiliriz:
- Hızlı mockup'lar ve konsept görselleri oluşturma
- İçerik önerileri ve metin düzenlemeleri
- Renk uyumluluğu analizi
- Responsive tasarım kontrolleri

## Sonuç

AI, tasarımcının yerini almıyor, aksine güçlendiriyor. Bu araçları doğru kullanarak daha verimli ve yaratıcı tasarım süreçleri oluşturabiliriz.`,
          date: '2024-01-15',
          readTime: '5 dk okuma',
          slug: 'yapay-zeka-tasarim-sureci',
          category: 'Design',
          featured: true,
        },
        {
          title: 'Minimalizm ve Duygusal Tasarım',
          excerpt: 'Sade arayüzler tasarlarken kullanıcıların duygusal bağ kurabilmesi için dikkat edilmesi gerekenleri öğrenin.',
          content: `Minimalist tasarım sadece boş alanlar ve az öğe demek değil. Kullanıcının duygusal tepkilerini düşünerek tasarlanmış bir yaklaşım.

## Minimalizmin Psikolojisi

Boş alanlar (whitespace) görsel hiyerarşi oluşturur ve kullanıcının dikkatini önemli öğelere yönlendirir. Ancak bu her zaman soğuk ve steril bir deneyim anlamına gelmez.

## Duygusal Bağ Kurmak

Renkler, tipografi ve mikro-etkileşimler minimal bir arayüzde kullanıcı ile duygusal bağ kurmanın anahtarlarıdır:
- Warm grays ve soft oranges gibi sıcak tonlar
- İnsan dostu font seçimleri
- Hover animasyonları ve transition'lar
- Kişisel dokunuşlar

## Dengeli Yaklaşım

Basitlik ve duygu arasında denge kurmak önemli. Her öğenin bir amacı olmalı ama aynı zamanda kullanıcıyı neşelendirmeli ve ilham vermeli.`,
    date: '2024-01-10',
          readTime: '8 dk okuma',
          slug: 'minimalizm-duygusal-tasarim',
    category: 'Design',
          featured: true,
        },
        {
          title: 'Renk Psikolojisi ve Web Tasarımı',
          excerpt: 'Renklerin kullanıcı davranışları üzerindeki etkilerini ve web tasarımında nasıl kullanılacağını keşfedin.',
          content: `Renkler, web sitelerinde kullanıcıların ilk izlenimini şekillendiren en güçlü araçlardan biridir. Turuncu vurgular güven ve sıcaklık hissi verirken, gri tonlar profesyonellik ve istikrar iletir.

## Renklerin Duygusal Etkileri

Her rengin kendine özgü psikolojik etkileri vardır:
- Turuncu: Cesaret, yaratıcılık, samimiyet
- Gri: Dengelilik, profesyonellik, modernlik
- Beyaz: Temizlik, sadelik, netlik

## Web Tasarımında Uygulama

Renkleri stratejik olarak kullanmak için:
- Call-to-action butonlarında yüksek kontrastlı renkler
- Arka planlarda nötr tonlar
- Vurgu için accent renkler
- Okunabilirlik için kontrast oranlarına dikkat

## Sonuç

Renk seçimi rastgele olmamalı. Her rengin bir amacı ve mesajı olmalı.`,
          date: '2024-01-05',
          readTime: '6 dk okuma',
          slug: 'renk-psikolojisi-web-tasarim',
          category: 'Design',
          featured: false,
        },
        {
          title: 'Responsive Tasarımın Modern Yaklaşımları',
          excerpt: 'Mobil ve masaüstü cihazlarda kusursuz görünen tasarımlar için Tailwind CSS ve modern teknikleri keşfedin.',
          content: `Responsive tasarım artık bir lüks değil, gereklilik. Kullanıcılar farklı cihazlardan web sitelerinize erişiyor ve her birinde mükemmel bir deneyim bekliyorlar.

## Mobile-First Yaklaşım

Tasarıma küçük ekranlardan başlamak ve sonra büyütmek, büyük ekranlardan küçültmekten çok daha etkili bir yöntemdir.

## Tailwind CSS ile Kolaylık

Tailwind CSS'in responsive utilities sayesinde:
- Grid ve flexbox ile esnek düzenler
- Breakpoint bazlı stil değişiklikleri
- Kolay bakım ve güncelleme

## Performans Optimizasyonu

Responsive görseller için:
- srcset ve sizes attribute'ları
- Modern formatlar (WebP, AVIF)
- Lazy loading

## Sonuç

Responsive tasarım sadece teknik bir gereklilik değil, kullanıcı deneyiminin temelidir.`,
          date: '2024-01-01',
          readTime: '10 dk okuma',
          slug: 'responsive-tasarim-modern-yaklasimlar',
          category: 'Development',
          featured: false,
        },
      ]
      const found = defaultPosts.find((p: any) => p.slug === params.slug)
      setPost(found || null)
    }
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-gray-400">Yükleniyor...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Yazı Bulunamadı</h1>
          <Link href="/#blog" className="text-primary-500 hover:text-primary-400">
            ← Bloga Dön
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Bloga Dön
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
            <div className="mb-4">
            <span className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                {post.category}
              </span>
            </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Post Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 rounded-2xl overflow-hidden"
          >
            <div className="w-full h-96 bg-gray-800 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-10">
                <div className="w-full h-full" style={{
                  backgroundImage: 'radial-gradient(circle at 4px 4px, rgba(249,115,22,0.2) 1px, transparent 0)',
                  backgroundSize: '60px 60px'
                }} />
              </div>
              <span className="text-gray-400 relative z-10 text-lg">Blog Görseli</span>
            </div>
          </motion.div>
        )}

        {/* Post Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-p:text-gray-300 prose-p:text-lg prose-p:leading-relaxed prose-ul:text-gray-300 prose-li:text-gray-300"
        >
          <div className="text-lg text-gray-300 leading-relaxed whitespace-pre-line">
            {post.content || post.excerpt}
          </div>
        </motion.div>
        </article>
    </div>
  )
}
