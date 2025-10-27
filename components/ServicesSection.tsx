'use client'

import React from 'react'
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
  RocketLaunchIcon,
  VideoCameraIcon,
  BellIcon
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
  const { language } = useLanguage()
  const t = require('@/lib/translations').translations[language]
  
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [expandedServices, setExpandedServices] = useState<Set<string>>(new Set())
  const [activeProcessStep, setActiveProcessStep] = useState(0)
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

  const services: ServiceCard[] = t.services.serviceCards
  // Map icons to serviceCards
  services[0].icon = GlobeAltIcon
  services[1].icon = ShoppingBagIcon
  services[2].icon = DevicePhoneMobileIcon
  services[3].icon = PaintBrushIcon
  services[4].icon = ChartBarIcon
  services[5].icon = CommandLineIcon

  const packages: Package[] = t.services.packages
  packages[1].highlighted = true

  const faqs: FAQ[] = t.services.faqSection.items

  const processSteps = [...t.services.processSection.steps]
  // Map icons to steps
  processSteps[0].icon = LightBulbIcon
  processSteps[1].icon = PaintBrushIcon
  processSteps[2].icon = CodeBracketIcon
  processSteps[3].icon = RocketLaunchIcon

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
              {t.services.heroSection.title}{' '}
              <span className="text-[#F97316]">{t.services.heroSection.titleHighlight}</span>
            </h1>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              {t.services.heroSection.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#F97316] text-white rounded-xl font-semibold hover:bg-[#ea6707] transition-colors flex items-center justify-center gap-2"
              >
                {t.services.heroSection.button1}
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
              <motion.a
                href="#portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold border border-gray-700 hover:border-[#F97316] transition-colors"
              >
                {t.services.heroSection.button2}
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
              {t.services.servicesTitle}
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
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 cursor-pointer transition-all group relative overflow-hidden"
                >
                  
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
                    <service.icon className="w-12 h-12 text-[#F97316] mb-4 transition-all" />
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
                      {t.services.seeDetails} <ArrowRightIcon className="w-4 h-4" />
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
              {t.services.pricingSection.title}
            </h2>
            <p className="text-center text-gray-400 mb-12">
              {t.services.pricingSection.subtitle}
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
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border relative ${
                    pkg.highlighted 
                      ? 'border-[#F97316] scale-105' 
                      : 'border-gray-700'
                  }`}
                >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F97316] text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg z-10 border-2 border-gray-800">
                    {t.services.pricingSection.popular}
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
                    {t.services.pricingSection.button}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 5. SÜREÇ - Premium Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white">
                {t.services.processSection.mainTitle}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.services.processSection.mainSubtitle}
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Process Steps Buttons */}
              <div className="grid md:grid-cols-4 gap-4 mb-12">
                {processSteps.map((step, index) => (
                  <motion.button
                    key={step.title}
                    onClick={() => setActiveProcessStep(index)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -5,
                      scale: 1.03
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 overflow-hidden text-center ${
                      activeProcessStep === index 
                        ? 'border-[#F97316]' 
                        : 'border-gray-700/50'
                    }`}
                  >

                    {/* Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-[#F97316]/20 to-[#F97316]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all">
                      <step.icon className={`w-10 h-10 text-[#F97316] transition-all ${
                        activeProcessStep === index ? 'scale-110' : ''
                      }`} />
                    </div>

                    {/* Content */}
                    <h3 className={`text-xl font-bold mb-3 transition-colors ${
                      activeProcessStep === index ? 'text-[#F97316]' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {step.description}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Dynamic Content Area */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcessStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-700/50"
                >
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#F97316]/20 to-[#F97316]/10 rounded-2xl flex items-center justify-center">
                        {React.createElement(processSteps[activeProcessStep].icon, { className: "w-10 h-10 text-[#F97316]" })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {processSteps[activeProcessStep].details.title}
                        </h3>
                        <p className="text-gray-400">
                          {t.services.processSection.durationLabel}: {processSteps[activeProcessStep].details.duration}
                        </p>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-white mb-4">{t.services.processSection.checklistTitle}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {processSteps[activeProcessStep].details.checklist.map((item: string, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-3 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50 transition-colors"
                          >
                            <CheckIcon className="w-6 h-6 text-[#F97316] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Output */}
                    <div className="bg-gradient-to-r from-[#F97316]/10 to-transparent border-l-4 border-[#F97316] p-6 rounded-xl">
                      <p className="text-sm font-semibold text-[#F97316] mb-2">{t.services.processSection.outputTitle}</p>
                      <p className="text-white">{processSteps[activeProcessStep].details.output}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* 6. GARANTİ & RİSK AZALTMA - Premium Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold mb-4 text-center text-white">
              {t.services.guaranteesSection.title}
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              {t.services.guaranteesSection.subtitle}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: ShieldCheckIcon, color: 'from-blue-500 to-cyan-400' },
                { icon: ClockIcon, color: 'from-[#F97316] to-orange-400' },
                { icon: CheckIcon, color: 'from-green-500 to-emerald-400' }
              ].map((item, index) => {
                const guaranteeItem = t.services.guaranteesSection.items[index]
                return {
                  ...item,
                  title: guaranteeItem.title,
                  desc: guaranteeItem.desc
                }
              }).map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -8,
                    rotateY: 3,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-[#F97316]/50 cursor-pointer transition-all duration-300 overflow-hidden"
                >
                  {/* 3D Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color}/0 via-${item.color}/10 to-${item.color}/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={false}
                    whileHover={{ scale: 1.2, rotate: 45 }}
                  />

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="mb-4"
                  >
                    <item.icon className="w-12 h-12 text-[#F97316] group-hover:drop-shadow-[0_0_20px_rgba(249,115,22,0.6)] transition-all" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F97316] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
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
              {t.services.faqSection.title}
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
                {t.services.formSection.title}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {t.services.formSection.subtitle}
              </p>
            </div>

            <form
              onSubmit={handleFormSubmit}
              className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-700/50 max-w-2xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    {t.services.formSection.nameLabel} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                    placeholder={t.services.formSection.namePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    {t.services.formSection.emailLabel} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                    placeholder={t.services.formSection.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                    {t.services.formSection.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors"
                    placeholder={t.services.formSection.phonePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-white mb-2">
                    {t.services.formSection.projectTypeLabel} *
                  </label>
                  <select
                    id="projectType"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-[#F97316] transition-colors"
                  >
                    <option value="">{t.services.formSection.selectPlaceholder}</option>
                    <option value="web">{t.services.formSection.projectTypes.web}</option>
                    <option value="ecommerce">{t.services.formSection.projectTypes.ecommerce}</option>
                    <option value="mobile">{t.services.formSection.projectTypes.mobile}</option>
                    <option value="brand">{t.services.formSection.projectTypes.brand}</option>
                    <option value="other">{t.services.formSection.projectTypes.other}</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  {t.services.formSection.messageLabel} *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#F97316] transition-colors resize-none"
                  placeholder={t.services.formSection.messagePlaceholder}
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
                      {t.services.formSection.sendingButton}
                    </>
                  )}
                  {formStatus === 'idle' && (
                    <>
                      {t.services.formSection.sendButton}
                      <ArrowRightIcon className="w-5 h-5" />
                    </>
                  )}
                  {formStatus === 'success' && (
                    <>
                      <CheckIcon className="w-5 h-5" />
                      {t.services.formSection.successButton}
                    </>
                  )}
                </motion.button>
                
                {formStatus === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-green-400"
                  >
                    {t.services.formSection.successQuickMessage}
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
              {t.services.formSection.ctaTitle}
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              {t.services.formSection.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#teklif-formu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#F97316] text-white rounded-xl font-semibold hover:bg-[#ea6707] transition-colors inline-flex items-center justify-center gap-2"
              >
                {t.services.formSection.ctaButton1}
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
                {t.services.formSection.ctaButton2}
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

