'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { CalendarIcon, ClockIcon, ArrowRightIcon, PencilIcon, TrashIcon, PlusIcon, XMarkIcon, CheckIcon, PhotoIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'
import { uploadImageToSupabase } from '@/lib/supabase-storage'
import { getAllBlogPosts, saveBlogPost } from '@/lib/blog-database'

interface BlogPost {
  id?: number
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  category: string
  featured?: boolean
  content?: string
  image?: string
}

export function Blog() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<BlogPost>>({})
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [password, setPassword] = useState('')

  // Admin password - you can change this or move to environment variable
  const ADMIN_PASSWORD = 'icnevudila2024'

  useEffect(() => {
    const checkAdminMode = () => {
      const adminMode = localStorage.getItem('adminMode')
      setIsAdmin(adminMode === 'true')
    }
    
    checkAdminMode()
    
    // Check every second for admin mode changes
    const interval = setInterval(checkAdminMode, 1000)
    
    return () => clearInterval(interval)
  }, [])

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true)
      localStorage.setItem('adminMode', 'true')
      setShowPasswordModal(false)
      setPassword('')
    } else {
      alert('Yanlış şifre!')
      setPassword('')
    }
  }

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      title: 'Modern Araçlarla Tasarım Sürecini Hızlandırmak',
      excerpt: 'Güncel araçları kullanarak web tasarımında zaman kazanmanın ve yaratıcı süreçleri optimize etmenin yollarını keşfedin.',
      date: '2024-01-15',
      readTime: '5 dk okuma',
      slug: 'modern-araclar-tasarim-sureci',
      category: 'Design',
      featured: true,
      image: 'https://res.cloudinary.com/dqiwrytdx/image/upload/v1/blog/blog-modern-araclar-tasarim-sureci-1761406325897.jpg',
      content: `Web tasarımında modern araçlar giderek daha önemli bir rol oynuyor. ChatGPT, Midjourney ve Leonardo AI gibi araçlar sayesinde tasarım süreçlerini hızlandırabilir ve yaratıcılığımızı destekleyebiliriz.

## Modern Araçların Rolü

Modern araçlar, tasarımcıların tekrarlayan görevlerini azaltarak odaklanmalarını gereken alanlara yönlendiriyor. Örneğin, renk paletleri oluşturma, layout önerileri alma ve tipografi seçimi gibi konularda bu araçlardan destek alabiliriz.

## Pratik Örnekler

Günlük iş akışında, AI araçlarından şu şekillerde faydalanabiliriz:
- Hızlı mockup'lar ve konsept görselleri oluşturma
- İçerik önerileri ve metin düzenlemeleri
- Renk uyumluluğu analizi
- Responsive tasarım kontrolleri

## Sonuç

AI, tasarımcının yerini almıyor, aksine güçlendiriyor. Bu araçları doğru kullanarak daha verimli ve yaratıcı tasarım süreçleri oluşturabiliriz.`,
    },
    {
      title: 'Minimalizm ve Duygusal Tasarım',
      excerpt: 'Sade arayüzler tasarlarken kullanıcıların duygusal bağ kurabilmesi için dikkat edilmesi gerekenleri öğrenin.',
      date: '2024-01-10',
      readTime: '8 dk okuma',
      slug: 'minimalizm-duygusal-tasarim',
      category: 'Design',
      featured: true,
      image: 'https://res.cloudinary.com/dqiwrytdx/image/upload/v1/blog/blog-modern-araclar-tasarim-sureci-1761406325897.jpg',
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
    },
    {
      title: 'Renk Psikolojisi ve Web Tasarımı',
      excerpt: 'Renklerin kullanıcı davranışları üzerindeki etkilerini ve web tasarımında nasıl kullanılacağını keşfedin.',
      date: '2024-01-05',
      readTime: '6 dk okuma',
      slug: 'renk-psikolojisi-web-tasarim',
      category: 'Design',
      featured: false,
      image: 'https://res.cloudinary.com/dqiwrytdx/image/upload/v1/blog/blog-modern-araclar-tasarim-sureci-1761406325897.jpg',
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
    },
    {
      title: 'Responsive Tasarımın Modern Yaklaşımları',
      excerpt: 'Mobil ve masaüstü cihazlarda kusursuz görünen tasarımlar için Tailwind CSS ve modern teknikleri keşfedin.',
      date: '2024-01-01',
      readTime: '10 dk okuma',
      slug: 'responsive-tasarim-modern-yaklasimlar',
      category: 'Development',
      featured: false,
      image: 'https://res.cloudinary.com/dqiwrytdx/image/upload/v1/blog/blog-modern-araclar-tasarim-sureci-1761406325897.jpg',
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
    },
  ])

  useEffect(() => {
    // Load from Supabase Database (public, everyone can see)
    getAllBlogPosts().then(posts => {
      if (posts && posts.length > 0) {
        setBlogPosts(posts)
        localStorage.setItem('blogPosts', JSON.stringify(posts))
      } else {
        // Fallback to localStorage if database is empty
        const saved = localStorage.getItem('blogPosts')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            setBlogPosts(parsed)
          } catch (e) {
            console.error('Error parsing blog posts:', e)
          }
        }
      }
    })
  }, [])

  const handleEdit = (post: BlogPost, index: number) => {
    setEditingId(index)
    setEditForm(post)
    setShowEditModal(true)
  }

  const handleSaveEdit = () => {
    if (editingId !== null) {
      const updated = [...blogPosts]
      updated[editingId] = { ...updated[editingId], ...editForm } as BlogPost
      setBlogPosts(updated)
      localStorage.setItem('blogPosts', JSON.stringify(updated))
      setShowEditModal(false)
      setEditingId(null)
      setEditForm({})
      alert('Blog yazısı başarıyla güncellendi!')
    }
  }

  const handleDelete = (index: number) => {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      const updated = blogPosts.filter((_, i) => i !== index)
      setBlogPosts(updated)
      localStorage.setItem('blogPosts', JSON.stringify(updated))
      alert('Blog yazısı silindi!')
    }
  }

  const handleAdd = () => {
    const newPost: BlogPost = {
      title: '',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      slug: '',
      category: 'Design',
      featured: false,
      content: '',
    }
    setEditForm(newPost)
    setShowAddModal(true)
  }

  const handleSaveAdd = () => {
    if (editForm.title && editForm.slug) {
      const newPost = { ...editForm } as BlogPost
      const updated = [newPost, ...blogPosts]
      setBlogPosts(updated)
      localStorage.setItem('blogPosts', JSON.stringify(updated))
      setShowAddModal(false)
      setEditForm({})
      alert('Yeni blog yazısı eklendi!')
    } else {
      alert('Lütfen başlık ve slug girin!')
    }
  }

  const handleCancel = () => {
    setShowEditModal(false)
    setShowAddModal(false)
    setEditingId(null)
    setEditForm({})
  }


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Development: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      Design: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      Performance: 'bg-green-500/20 text-green-400 border-green-500/30',
    }
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <section id="blog" className="section-padding bg-gray-800/30">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-8 md:mb-16 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-6 gap-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                {t.blog.title}
            </h2>
              {isAdmin && (
                <div className="flex gap-2 md:gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-sm md:text-base"
                  >
                    <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="hidden sm:inline">{t.blog.addPost}</span>
                    <span className="sm:hidden">Ekle</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsAdmin(false)
                      localStorage.setItem('adminMode', 'false')
                    }}
                    className="px-3 md:px-4 py-2 rounded-lg transition-colors bg-green-500 hover:bg-green-600 text-sm md:text-base"
                  >
                    <span className="hidden sm:inline">{t.blog.adminModeOn}</span>
                    <span className="sm:hidden">Çıkış</span>
                  </button>
                </div>
              )}
            </div>
            <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full" />
            <p className="text-base sm:text-lg text-gray-400 mt-4 md:mt-6 max-w-2xl mx-auto leading-relaxed">
              {t.blog.subtitle}
            </p>
          </motion.div>

          {/* Featured Posts */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-16 px-4">
            <h3 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
              <AnimatedText text="Öne Çıkan Yazılar" />
            </h3>
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
              {blogPosts.filter(post => post.featured === true).map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  className="card card-hover group cursor-pointer"
                >
                  {/* Post Image Placeholder */}
                  <div className="relative overflow-hidden rounded-lg mb-6 group-hover:scale-105 transition-transform">
                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center relative">
                      {/* Uploaded Image */}
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full" style={{
                              backgroundImage: 'linear-gradient(45deg, rgba(249,115,22,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(249,115,22,0.1) 25%, transparent 25%)',
                              backgroundSize: '20px 20px'
                            }} />
                          </div>
                          <span className="text-gray-400 relative z-10">Blog Görseli</span>
                        </>
                      )}
                      
                      {/* Image Upload Button - Admin Only */}
                      {isAdmin && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={async (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onloadend = async () => {
                                    const base64String = reader.result as string
                                    
                                    console.log('📤 Uploading blog image to Supabase...')
                                    const result = await uploadImageToSupabase(
                                      base64String,
                                      'blog',
                                      `blog-${post.slug}-${Date.now()}`
                                    )
                                    
                                    console.log('📥 Upload result:', result)
                                    
                                    if (result.success && result.url) {
                                      const updatedPosts = [...blogPosts]
                                      updatedPosts[blogPosts.indexOf(post)].image = result.url
                                      setBlogPosts(updatedPosts)
                                      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
                                      alert('Görsel Supabase\'e yüklendi ve herkese görünecek!')
                                    } else {
                                      console.error('❌ Upload failed:', result.error)
                                      const updatedPosts = [...blogPosts]
                                      updatedPosts[blogPosts.indexOf(post)].image = base64String
                                      setBlogPosts(updatedPosts)
                                      localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
                                      alert('Görsel kaydedildi (sadece sizde görünecek)')
                                    }
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="hidden"
                            />
                            <div className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                              <PhotoIcon className="w-5 h-5 text-white" />
                              <span className="text-white font-medium">
                                {post.image ? 'Değiştir' : 'Görsel Yükle'}
                              </span>
                            </div>
                          </label>
                        </div>
                      )}
                      
                      {/* Edit/Delete Buttons - Admin Only */}
                      {isAdmin && (
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(post, blogPosts.indexOf(post))
                            }}
                            className="p-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(blogPosts.indexOf(post))
                            }}
                            className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-3 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More */}
                    <Link href={`/blog/${post.slug}`} className="flex items-center text-primary-500 font-medium group-hover:text-primary-400 transition-colors">
                      <span>{t.blog.readMore}</span>
                      <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Other Posts */}
          <motion.div variants={itemVariants} className="px-4">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 md:mb-8">
              Son Yazılar
            </h3>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {blogPosts.filter(post => post.featured !== true).map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="card card-hover group cursor-pointer"
                >
                  {/* Post Image Placeholder */}
                  <div className="relative overflow-hidden rounded-lg mb-4 group-hover:scale-105 transition-transform">
                    <div className="w-full h-32 bg-gray-800 flex items-center justify-center relative">
                      {/* Uploaded Image */}
                      {post.image ? (
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full" style={{
                              backgroundImage: 'linear-gradient(45deg, rgba(249,115,22,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(249,115,22,0.1) 25%, transparent 25%)',
                              backgroundSize: '20px 20px'
                            }} />
                          </div>
                          <span className="text-gray-400 text-sm relative z-10">Blog Görseli</span>
                        </>
                      )}
                      
                      {/* Image Upload Button - Admin Only */}
                      {isAdmin && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onloadend = () => {
                                    const base64String = reader.result as string
                                    const updatedPosts = [...blogPosts]
                                    updatedPosts[blogPosts.indexOf(post)].image = base64String
                                    setBlogPosts(updatedPosts)
                                    localStorage.setItem('blogPosts', JSON.stringify(updatedPosts))
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="hidden"
                            />
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
                              <PhotoIcon className="w-4 h-4 text-white" />
                              <span className="text-white text-sm font-medium">
                                {post.image ? 'Değiştir' : 'Görsel'}
                              </span>
                            </div>
                          </label>
                        </div>
                      )}
                      
                      {/* Edit/Delete Buttons - Admin Only */}
                      {isAdmin && (
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEdit(post, blogPosts.indexOf(post))
                            }}
                            className="p-1.5 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
                          >
                            <PencilIcon className="w-3 h-3 text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(blogPosts.indexOf(post))
                            }}
                            className="p-1.5 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                          >
                            <TrashIcon className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 z-20">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    {/* Post Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span>{new Date(post.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Read More */}
                    <Link href={`/blog/${post.slug}`} className="flex items-center text-primary-500 font-medium text-sm group-hover:text-primary-400 transition-colors">
                      <span>{t.blog.readMore}</span>
                      <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* View All Posts Button */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Tüm Yazıları Gör
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Blog Yazısını Düzenle</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Özet</label>
                <textarea
                  value={editForm.excerpt || ''}
                  onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={editForm.slug || ''}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">İçerik</label>
                <textarea
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={8}
                  placeholder="Blog yazısının tam içeriğini buraya yazın..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <select
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Performance">Performance</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg"
                >
                  <CheckIcon className="w-5 h-5" />
                  Kaydet
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                  İptal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold mb-4">Yeni Blog Yazısı</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="Blog yazısı başlığı"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Özet</label>
                <textarea
                  value={editForm.excerpt || ''}
                  onChange={(e) => setEditForm({ ...editForm, excerpt: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={3}
                  placeholder="Kısa açıklama"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Slug (URL)</label>
                <input
                  type="text"
                  value={editForm.slug || ''}
                  onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  placeholder="blog-yazisi-url"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">İçerik</label>
                <textarea
                  value={editForm.content || ''}
                  onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                  rows={8}
                  placeholder="Blog yazısının tam içeriğini buraya yazın..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kategori</label>
                <select
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white"
                >
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Performance">Performance</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveAdd}
                  className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg"
                >
                  <CheckIcon className="w-5 h-5" />
                  Ekle
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5" />
                  İptal
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-lg p-6 max-w-md w-full border border-gray-700"
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Admin Girişi</h3>
            <p className="text-gray-400 mb-4">Lütfen admin şifresini girin:</p>
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Şifre"
              autoFocus
            />
            
            <div className="flex gap-2">
              <button
                onClick={handlePasswordSubmit}
                className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-white transition-colors"
              >
                Giriş Yap
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPassword('')
                }}
                className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
              >
                İptal
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

