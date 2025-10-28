'use client'

import { useState, useEffect } from 'react'
import { CalendarIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  getBlogPosts, 
  getYouTubeChannel, 
  getYouTubeVideos,
  type BlogPost as SupabaseBlogPost,
  type YouTubeChannel as SupabaseYouTubeChannel,
  type YouTubeVideo as SupabaseYouTubeVideo
} from '@/lib/supabase-cms'

interface BlogProps {
  isHomePage?: boolean
}

export function Blog({ isHomePage = false }: BlogProps) {
  const { t } = useLanguage()
  
  const [blogPosts, setBlogPosts] = useState<SupabaseBlogPost[]>([])
  const [youtubeChannel, setYoutubeChannel] = useState<SupabaseYouTubeChannel | null>(null)
  const [youtubeVideos, setYoutubeVideos] = useState<SupabaseYouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      console.log('🔄 Blog component loading data...')
      
      try {
        // Load blog posts from Supabase
        const postsData = await getBlogPosts()
        console.log('📊 Supabase posts:', postsData.length)
        
        // Eğer Supabase'den veri gelmiyorsa fallback kullan
        if (postsData.length === 0) {
          console.log('📝 No Supabase data, using fallback')
          setBlogPosts([
            {
              id: '1',
              title: 'Web Tasarımı Temelleri',
              excerpt: 'Modern web tasarımının temel prensiplerini öğrenin.',
              content: 'Bu kapsamlı rehberde modern web tasarımının temel prensiplerini öğreneceksiniz.',
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
              content: 'React ile modern UI geliştirme teknikleri ve en iyi uygulamalar.',
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
              content: 'ES6+ JavaScript özellikleri ve modern geliştirme teknikleri.',
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
          ])
        } else {
          setBlogPosts(postsData)
        }
        
        // Load YouTube channel data
        const youtubeChannelData = await getYouTubeChannel()
        console.log('📺 YouTube channel:', youtubeChannelData?.channel_name)
        setYoutubeChannel(youtubeChannelData)
        
        if (youtubeChannelData) {
          const videosData = await getYouTubeVideos(youtubeChannelData.id)
          console.log('📺 YouTube videos:', videosData.length)
          setYoutubeVideos(videosData)
        }
        
        console.log('📊 Loaded data from Supabase:', {
          blogPosts: postsData.length,
          youtubeChannel: youtubeChannelData?.channel_name,
          videos: youtubeChannelData ? await getYouTubeVideos(youtubeChannelData.id) : []
        })
        
      } catch (error) {
        console.log('📝 Error loading data, using fallback')
      } finally {
        setLoading(false)
        console.log('✅ Blog loading completed')
      }
    }
    
    loadData()
  }, [])

  // Ana sayfada sadece featured postları göster
  const displayPosts = isHomePage 
    ? blogPosts.filter(post => post.featured).slice(0, 4)
    : blogPosts

  console.log('🎯 Display posts:', { 
    isHomePage, 
    totalPosts: blogPosts.length, 
    featuredPosts: blogPosts.filter(post => post.featured).length,
    displayPosts: displayPosts.length 
  })

  return (
    <section id="blog" className="section-padding bg-gray-800/30">
      <div className="container-custom">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-400">İçerikler yükleniyor...</p>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 md:mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center text-white">
                {t.blog.title || 'Blog'}
              </h2>
              <div className="w-24 h-1 bg-[#F97316] mx-auto rounded-full" />
              <p className="text-base sm:text-lg text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto leading-relaxed">
                {t.blog.subtitle || 'Teknoloji ve tasarım dünyasından güncel yazılar'}
              </p>
            </div>

            {/* Debug Info */}
            <div className="text-center mb-4 p-4 bg-blue-900/20 rounded-lg">
              <p className="text-blue-400 text-sm">
                Debug: {displayPosts.length} blog yazısı yüklendi (Featured: {blogPosts.filter(post => post.featured).length})
              </p>
            </div>

            {/* Featured Posts */}
            <div className="mb-8 md:mb-16 px-4">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8 text-white">
                {t.blog.featured || 'Öne Çıkan Yazılar'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {displayPosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-orange-500 transition-colors group cursor-pointer h-full"
                  >
                    {/* Post Image */}
                    <div className="relative overflow-hidden rounded-lg mb-3 group-hover:scale-105 transition-transform">
                      <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                        {post.image ? (
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-4xl font-bold text-[#F97316]">
                            {post.title.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="flex flex-col h-full">
                      {/* Category */}
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-[#F97316]/20 text-[#F97316] rounded-full">
                          {post.category}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
                        {post.title}
                      </h4>
                      
                      {/* Excerpt */}
                      <p className="text-gray-400 text-sm mb-3 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                      
                      {/* Post Meta */}
                      <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{post.date ? new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Tarih Yok'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-3 h-3" />
                          <span>{post.read_time}</span>
                        </div>
                      </div>
                      
                      {/* Read More Button */}
                      <div className="mt-auto">
                        <Link href={`/blog/${post.slug}`}>
                          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#F97316] hover:bg-[#ea6707] text-white rounded-lg font-medium transition-colors group">
                            Devamını Oku
                            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* View All Posts Button - Only on Homepage */}
            {isHomePage && (
              <div className="text-center mt-12">
                <Link href="/blog">
                  <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors">
                    Tüm Yazıları Gör
                  </button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}