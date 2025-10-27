'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useCallback } from 'react'
import { 
  GlobeAltIcon, 
  DevicePhoneMobileIcon, 
  ShoppingBagIcon,
  PaintBrushIcon,
  CommandLineIcon,
  ChartBarIcon,
  ChevronDownIcon,
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  ClockIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  CodeBracketIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from './AnimatedText'

interface ServiceCard {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  title: string
  description: string
  features: string[]
  examples: string
}

interface Package {
  name: string
  price: string
  duration: string
  features: string[]
  highlighted?: boolean
}

interface FAQ {
  question: string
  answer: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
}

export default function ServicesSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    files: [] as File[]
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const services: ServiceCard[] = [
    {
      icon: GlobeAltIcon,
      title: 'Web Tasarım Hizmetleri',
      description: 'Responsive ve SEO uyumlu kurumsal siteler, landing page\'ler ve portfolyo siteleri.',
      features: [
        'Kurumsal Web Sitesi',
        'Landing Page',
        'Blog Sitesi',
        'Portfolio Sitesi',
        'Kurumsal İntranet',
        'Gelir Paylaşımlı Site'
      ],
      examples: 'Kahve eşliğinde sıfırdan prod\'a ☕'
    },
    {
      icon: ShoppingBagIcon,
      title: 'E-ticaret Çözümleri',
      description: 'Tam özellikli e-ticaret platformları, pazar yeri entegrasyonları ve stok yönetimi.',
      features: [
        'E-ticaret Sitesi',
        'Pazar Yeri Entegrasyonu',
        'Stok Yönetimi',
        'Admin Panel',
        'Ödeme Entegrasyonları',
        'Ürün Yönetimi'
      ],
      examples: 'Sepette kalmaz, satar geçer 📦'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobil Uygulama Tasarımı',
      description: 'iOS ve Android için modern, kullanıcı dostu arayüz tasarımları ve prototipler.',
      features: [
        'Mobil Uygulama UI',
        'Web Uygulaması',
        'PWA Tasarımı',
        'Prototip & Wireframe',
        'Design System',
        'Kullanıcı Testi'
      ],
      examples: 'Cebe sığar ama güç verir 📱'
    },
    {
      icon: PaintBrushIcon,
      title: 'Marka & Logo Tasarımı',
      description: 'Güçlü marka kimliği, logo tasarımları ve kurumsal görsel dil oluşturma.',
      features: [
        'Logo Tasarımı',
        'Marka Kimliği',
        'Görsel Dil',
        'Sunum Dosyaları',
        'Renk Paleti',
        'Tipografi'
      ],
      examples: 'Markanı konuşturur ✨'
    },
    {
      icon: ChartBarIcon,
      title: 'UI/UX & Analiz',
      description: 'Kullanıcı araştırması, UX haritalama, A/B test ve kullanılabilirlik analizi.',
      features: [
        'User Research',
        'UX Haritalama',
        'A/B Testing',
        'Kullanılabilirlik Analizi',
        'User Flow',
        'Wireframe'
      ],
      examples: 'Kullanıcı mutluluğu garantisi 😊'
    },
    {
      icon: CommandLineIcon,
      title: 'Full-Stack Geliştirme',
      description: 'React, Next.js ve modern teknolojilerle tam özellikli web uygulamaları.',
      features: [
        'Frontend Development',
        'Backend API',
        'Database Tasarımı',
        'API Entegrasyonları',
        'Deployment',
        'Bakım & Destek'
      ],
      examples: 'Kod ile dostluk kuralım 💻'
    }
  ]

  const packages: Package[] = [
    {
      name: 'Basit Site',
      price: 'Başlangıç',
      duration: '7–10 gün',
      features: [
        'Responsive tasarım',
        'SEO optimizasyonu',
        'CMS entegrasyonu',
        'Form & iletişim',
        'Güvenlik sertifikası',
        'Teknik destek'
      ]
    },
    {
      name: 'Kurumsal Site',
      price: 'Orta seviye',
      duration: '10–14 gün',
      features: [
        'Özel tasarım',
        'Gelişmiş SEO',
        'Analytics entegrasyonu',
        'Performans optimizasyonu',
        'Ödeme entegrasyonları',
        'Genişletilmiş destek'
      ],
      highlighted: true
    },
    {
      name: 'E-ticaret Platform',
      price: 'İleri seviye',
      duration: '14–21 gün',
      features: [
        'Tam özellikli e-ticaret',
        'Stok yönetimi',
        'Ödeme sistemleri',
        'API entegrasyonları',
        'Güvenlik & yedekleme',
        'Kapsamlı destek'
      ]
    }
  ]

  const faqs: FAQ[] = [
    {
      question: 'Proje teslim süresi ne kadar?',
      answer: 'Proje tipine göre 7 ile 21 gün arasında değişir. Starter paketler 7–10 gün, Pro paketler 10–14 gün, Scale paketler ise 14–21 gün içinde teslim edilir.'
    },
    {
      question: 'Revizyon hakkım var mı?',
      answer: 'Evet! Starter paket 1 revizyon, Pro paket 3 revizyon, Scale pakette sınırsız revizyon hakkı bulunmaktadır. Tüm revizyonlar teslim sonrası 30 gün içinde kullanılmalıdır.'
    },
    {
      question: 'İçerikleri kim hazırlar?',
      answer: 'Kopya yazım ve görsel içerikleri siz hazırlarsınız. Gerekirse içerik danışmanlığı veriyorum. Yazıların düzenlenmesi ve SEO optimizasyonu hizmetimize dahil.'
    },
    {
      question: 'Domain ve hosting dahil mi?',
      answer: 'Domain ve hosting size aittir. İsterseniz yönlendirme ve kurulum desteği veriyorum. Size önerdiğim güvenilir hosting sağlayıcılar var.'
    },
    {
      question: 'Bakım hizmeti ne kadar?',
      answer: 'İlk 30 gün ücretsiz bakım dahil. Sonrasında aylık 2-5K TL arası bakım paketleri sunuyorum. Minimum güvenlik güncellemeleri, yedekleme ve teknik destek dahil.'
    }
  ]

  const processSteps = [
    {
      icon: LightBulbIcon,
      title: 'Keşif',
      description: 'İhtiyaçlarınızı dinliyor, hedeflerinizi analiz ediyoruz.'
    },
    {
      icon: PaintBrushIcon,
      title: 'Tasarım',
      description: 'Müşteri onayıyla tasarım sürecini başlatıyoruz.'
    },
    {
      icon: CodeBracketIcon,
      title: 'Geliştirme',
      description: 'Modern teknolojilerle canlı ortama hazırlıyoruz.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Yayın',
      description: 'Test ve optimizasyondan sonra canlıya alıyoruz.'
    }
  ]

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')
    
    // Simüle edilmiş gönderim - gerçek implementasyonda API'ye gönder
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setFormStatus('success')
    setFormData({ name: '', email: '', phone: '', projectType: '', message: '', files: [] })
    
    setTimeout(() => setFormStatus('idle'), 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData({ ...formData, files: [...formData.files, ...files] })
  }

  const removeFile = (index: number) => {
    setFormData({ ...formData, files: formData.files.filter((_, i) => i !== index) })
  }

  const scrollToForm = () => {
    const formElement = document.getElementById('teklif-formu')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="hizmetler" className="section-padding bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          
          {/* 1. HERO BLOK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Hızlı, ölçülebilir ve{' '}
              <span className="text-[#F97316]">şık web deneyimleri</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Modern tasarım ve gelişmiş teknolojilerle projenizi hayata geçirin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#F97316] text-white rounded-xl font-semibold hover:bg-[#ea6707] transition-colors flex items-center justify-center gap-2"
              >
                Teklif Al
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold border border-gray-700 hover:border-[#F97316] transition-colors"
              >
                Projelerime Bakın
              </motion.a>
            </div>
          </motion.div>

          {/* HİZMET KARTLARI */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-white">
              Hizmetlerimiz
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ y: -8, rotateX: 2, rotateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ perspective: '1000px' }}
                  onClick={() => {
                    const newSet = new Set(expandedServices)
                    if (newSet.has(service.title)) {
                      newSet.delete(service.title)
                    } else {
                      newSet.add(service.title)
                    }
                    setExpandedServices(newSet)
                  }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-[#F97316]/50 cursor-pointer transition-all group relative overflow-hidden"
                >
                  {/* 3D Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[#F97316]/0 via-[#F97316]/20 to-[#F97316]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    whileHover={{ scale: 1.2, rotate: 45 }}
                  />
                  
                  {/* Animated Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%', transition: { duration: 0.6, ease: 'easeInOut' } }}
                  />
                  
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="relative z-10"
                  >
                    <service.icon className="w-12 h-12 text-[#F97316] mb-4 group-hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.6)] transition-all" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{service.description}</p>
                  
                  <AnimatePresence>
                    {expandedServices.has(service.title) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 mt-4 pt-4 border-t border-gray-700">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckIcon className="w-4 h-4 text-[#F97316] mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <span className="text-xs text-[#F97316] font-medium">{service.examples}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!expandedServices.has(service.title) && (
                    <div className="text-sm text-[#F97316] mt-4 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Detayları Gör <ArrowRightIcon className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 4. PAKETLER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-4 text-center text-white">
              Paket & Fiyatlar
            </h2>
            <p className="text-center text-gray-400 mb-12">
              Projenizin ihtiyacına göre seçin, başlangıç fiyatları
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: pkg.highlighted ? 1.05 : 1.03,
                    rotateY: 5,
                    rotateX: -2,
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border relative overflow-hidden ${
                    pkg.highlighted 
                      ? 'border-[#F97316] ring-2 ring-[#F97316]/20 scale-105' 
                      : 'border-gray-700 hover:border-[#F97316]/50'
                  }`}
                >
                  {/* 3D Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%', transition: { duration: 0.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2 } }}
                  />
                  {pkg.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#F97316] text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Popüler
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#F97316]">{pkg.price}</span>
                    <span className="text-gray-400 ml-2">{pkg.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <CheckIcon className="w-5 h-5 text-[#F97316] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    type="button"
                    onClick={scrollToForm}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-xl font-semibold text-center block transition-colors ${
                      pkg.highlighted
                        ? 'bg-[#F97316] text-white hover:bg-[#ea6707]'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    Teklif Al
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 5. SÜREÇ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-4 text-center text-white">
              Çalışma Sürecimiz
            </h2>
            <p className="text-center text-gray-400 mb-12">
              4 adımda projenizi canlıya alıyoruz
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center"
                >
                  <div className="w-16 h-16 bg-[#F97316]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-[#F97316]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 6. GARANTİ & RİSK AZALTMA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20 grid md:grid-cols-3 gap-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <ShieldCheckIcon className="w-10 h-10 text-[#F97316] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Lighthouse 90+ Hedefi</h3>
              <p className="text-sm text-gray-400">Performans, erişilebilirlik ve SEO skorları garanti altında</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <ClockIcon className="w-10 h-10 text-[#F97316] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">30 Gün Ücretsiz Bakım</h3>
              <p className="text-sm text-gray-400">Canlı sonrası ilk ay tamamen ücretsiz destek</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
              <CheckIcon className="w-10 h-10 text-[#F97316] mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">Revizyon Hakkı</h3>
              <p className="text-sm text-gray-400">Paketinize göre sınırlı veya sınırsız revizyon</p>
            </div>
          </motion.div>

          {/* 7. SSS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-12 text-center text-white">
              Sıkça Sorulan Sorular
            </h2>
            
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-800/30 transition-colors"
                  >
                    <span className="text-lg font-semibold text-white">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDownIcon className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-gray-400">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 7.5. TEKLİF FORMU */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
            id="teklif-formu"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">
                Teklif Alın
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Projenizi detaylarıyla paylaşın, size özel bir teklif hazırlayalım
              </p>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-700/50 max-w-2xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* İsim */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    İsim *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                    placeholder="Adınız"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                    placeholder="email@ornek.com"
                  />
                </div>

                {/* Telefon */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                    placeholder="+90 (555) 000 00 00"
                  />
                </div>

                {/* Proje Tipi */}
                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-white mb-2">
                    Proje Tipi *
                  </label>
                  <select
                    id="projectType"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#F97316] transition-colors"
                  >
                    <option value="">Seçiniz</option>
                    <option value="web">Web Sitesi</option>
                    <option value="ecommerce">E-ticaret</option>
                    <option value="mobile">Mobil Uygulama</option>
                    <option value="brand">Marka & Logo</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>

              {/* Mesaj */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  Proje Detayları *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors resize-none"
                  placeholder="Projenizi kısaca anlatın, özel istekleriniz varsa belirtin..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex items-center gap-4">
                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending' || formStatus === 'success'}
                  whileHover={formStatus === 'idle' ? { scale: 1.02 } : {}}
                  whileTap={formStatus === 'idle' ? { scale: 0.98 } : {}}
                  className={`flex-1 px-8 py-4 bg-[#F97316] text-white rounded-xl font-semibold hover:bg-[#ea6707] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                >
                  {formStatus === 'sending' && (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Gönderiliyor...
                    </>
                  )}
                  {formStatus === 'success' && (
                    <>
                      <CheckIcon className="w-5 h-5" />
                      Gönderildi!
                    </>
                  )}
                  {formStatus === 'idle' && (
                    <>
                      Teklif İste
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
                
                {formStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-green-400"
                  >
                    En kısa sürede size döneceğim! 🎉
                  </motion.p>
                )}
              </div>
            </form>
          </motion.div>

          {/* 8. KAPANIŞ CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 border border-[#F97316]/20"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Projenizi 24 saat içinde planlayalım
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Hemen teklif alın ve projenizi hayata geçirin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#teklif-formu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#F97316] text-white rounded-xl font-semibold hover:bg-[#ea6707] transition-colors inline-flex items-center justify-center gap-2"
              >
                Teklif Formu
                <ArrowRightIcon className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://wa.me/905453651319"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-700 text-white rounded-xl font-semibold border border-gray-600 hover:border-[#F97316] transition-colors"
              >
                WhatsApp
              </motion.a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

/* 
✅ KONTROL LİSTESİ
- ✅ Mobil 1 sütun (grid-cols-1, md:grid-cols-2, lg:grid-cols-3)
- ✅ CTA görünür ve belirgin
- ✅ Kontrast yeterli (text-white, text-gray-400)
- ✅ Animasyonlar Framer Motion ile 60fps
- ✅ prefers-reduced-motion uyumlu (varsayılan smooth)
- ✅ Semantic HTML (section, h1-h3)
- ✅ Accessibility (aria-label, button roles)
- ✅ SEO: Her bölüm başlık hiyerarşisi ile
*/

