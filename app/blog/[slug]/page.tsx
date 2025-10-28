'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { CalendarIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { getBlogPosts, type BlogPost } from '@/lib/supabase-cms'

export default function BlogDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      try {
        const posts = await getBlogPosts()
        const foundPost = posts.find(p => p.slug === slug)
        
        if (foundPost) {
          setPost(foundPost)
        } else {
          // Fallback verilerden ara
          const fallbackPosts = [
            {
              id: '1',
              title: 'Web Tasarımı Temelleri',
              excerpt: 'Modern web tasarımının temel prensiplerini öğrenin.',
              content: `
                <h2>Modern Web Tasarımının Temel Prensipleri</h2>
                <p>Web tasarımı, kullanıcı deneyimini optimize eden ve görsel olarak çekici siteler oluşturma sanatıdır. Bu kapsamlı rehberde, modern web tasarımının temel prensiplerini öğreneceksiniz.</p>
                
                <h3>1. Responsive Tasarım</h3>
                <p>Responsive tasarım, web sitelerinin farklı cihazlarda (masaüstü, tablet, mobil) mükemmel görünmesini sağlar. CSS Grid ve Flexbox gibi modern teknikler kullanarak esnek layoutlar oluşturabilirsiniz.</p>
                
                <h3>2. Renk Teorisi</h3>
                <p>Renk paleti seçimi, web sitesinin ruh halini ve kullanıcı deneyimini doğrudan etkiler. Uyumlu renk kombinasyonları kullanarak profesyonel görünüm elde edebilirsiniz.</p>
                
                <h3>3. Tipografi</h3>
                <p>Doğru font seçimi ve hiyerarşi, içeriğin okunabilirliğini artırır. Web-safe fontlar ve Google Fonts gibi kaynakları kullanarak etkili tipografi oluşturabilirsiniz.</p>
                
                <h3>4. Kullanıcı Deneyimi (UX)</h3>
                <p>UX tasarımı, kullanıcıların web sitesinde kolayca gezinmesini ve istedikleri bilgilere hızlıca ulaşmasını sağlar. Sezgisel navigasyon ve temiz arayüz tasarımı önemlidir.</p>
                
                <h3>Sonuç</h3>
                <p>Modern web tasarımı, teknik bilgi ve yaratıcılığın birleşimidir. Bu prensipleri uygulayarak kullanıcı dostu ve görsel olarak çekici web siteleri oluşturabilirsiniz.</p>
              `,
              slug: 'web-tasarimi-temelleri',
              category: 'Design',
              image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&q=80',
              date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              read_time: '5 min',
              featured: true,
              published: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: '2',
              title: 'React ile Modern UI',
              excerpt: 'React kullanarak modern ve responsive kullanıcı arayüzleri geliştirin.',
              content: `
                <h2>React ile Modern UI Geliştirme</h2>
                <p>React, modern web uygulamaları geliştirmek için en popüler JavaScript kütüphanelerinden biridir. Bu rehberde React ile modern UI bileşenleri nasıl oluşturulacağını öğreneceksiniz.</p>
                
                <h3>1. Component Tasarımı</h3>
                <p>React'ta bileşenler, yeniden kullanılabilir UI parçalarıdır. Fonksiyonel bileşenler ve hooks kullanarak modern ve temiz kod yazabilirsiniz.</p>
                
                <h3>2. State Yönetimi</h3>
                <p>useState ve useEffect hooks'ları ile bileşen durumunu yönetebilirsiniz. Daha karmaşık uygulamalar için Redux veya Context API kullanabilirsiniz.</p>
                
                <h3>3. Props ve Data Flow</h3>
                <p>Props kullanarak verileri bileşenler arasında aktarabilirsiniz. TypeScript ile tip güvenliği sağlayarak daha güvenilir kod yazabilirsiniz.</p>
                
                <h3>4. Modern CSS Teknikleri</h3>
                <p>CSS Modules, Styled Components veya Tailwind CSS ile modern stillendirme teknikleri uygulayabilirsiniz.</p>
                
                <h3>Sonuç</h3>
                <p>React ile modern UI geliştirme, sürekli öğrenme ve pratik gerektirir. Bu teknikleri uygulayarak kullanıcı dostu uygulamalar oluşturabilirsiniz.</p>
              `,
              slug: 'react-modern-ui',
              category: 'Development',
              image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&q=80',
              date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              read_time: '7 min',
              featured: true,
              published: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            {
              id: '3',
              title: 'JavaScript ES6+ Özellikleri',
              excerpt: 'Modern JavaScript özelliklerini öğrenin ve kodunuzu daha verimli hale getirin.',
              content: `
                <h2>JavaScript ES6+ Modern Özellikleri</h2>
                <p>ES6 ve sonrası JavaScript özellikleri, kodunuzu daha okunabilir, kısa ve güçlü hale getirir. Bu rehberde en önemli ES6+ özelliklerini öğreneceksiniz.</p>
                
                <h3>1. Arrow Functions</h3>
                <p>Arrow functions, daha kısa ve temiz fonksiyon yazımı sağlar. this binding'i farklı çalışır ve kodunuzu daha okunabilir hale getirir.</p>
                
                <h3>2. Destructuring</h3>
                <p>Destructuring ile objelerden ve dizilerden değerleri kolayca çıkarabilirsiniz. Bu özellik kodunuzu daha temiz ve anlaşılır hale getirir.</p>
                
                <h3>3. Template Literals</h3>
                <p>Backtick (\`) kullanarak string interpolation ve çok satırlı stringler oluşturabilirsiniz.</p>
                
                <h3>4. Async/Await</h3>
                <p>Promise'ları daha okunabilir şekilde kullanmak için async/await syntax'ını kullanabilirsiniz.</p>
                
                <h3>5. Modules</h3>
                <p>ES6 modules ile kodunuzu organize edebilir ve yeniden kullanılabilir modüller oluşturabilirsiniz.</p>
                
                <h3>Sonuç</h3>
                <p>Modern JavaScript özellikleri, geliştirme sürecinizi hızlandırır ve kodunuzu daha maintainable hale getirir.</p>
              `,
              slug: 'javascript-es6-features',
              category: 'Development',
              image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=600&fit=crop&q=80',
              date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              read_time: '6 min',
              featured: false,
              published: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }
          ]
          
          const fallbackPost = fallbackPosts.find(p => p.slug === slug)
          if (fallbackPost) {
            setPost(fallbackPost)
          } else {
            setNotFound(true)
          }
        }
      } catch (error) {
        console.error('Error loading post:', error)
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      loadPost()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Yazı yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <p className="text-gray-400 mb-6">Bu yazı bulunamadı</p>
          <Link href="/blog">
            <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors">
              Blog'a Dön
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/blog" className="inline-flex items-center text-gray-400 hover:text-orange-500 transition-colors mb-4">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Blog'a Dön
          </Link>
          
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-orange-500/20 text-orange-500 rounded-full">
              {post.category}
              </span>
            </div>
            
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {post.title}
            </h1>
            
          <p className="text-xl text-gray-300 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex items-center text-sm text-gray-500 space-x-6">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-4 h-4" />
              <span>{post.read_time}</span>
            </div>
          </div>
                </div>
              </div>

          {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {post.image && (
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
            </div>
        )}
        
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content || post.excerpt }}
        />
      </div>
    </div>
  )
}