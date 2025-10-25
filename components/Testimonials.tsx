'use client'

import { motion } from 'framer-motion'
import { StarIcon } from '@heroicons/react/24/solid'

interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    quote: "Ali ile çalışmak hem profesyonel hem de eğlenceli bir deneyim. Tasarımları sade ama çok etkili.",
    author: "Ayşe Kaya",
    role: "Proje Yöneticisi",
    avatar: "https://ui-avatars.com/api/?name=Ayse+Kaya&background=0f172a&color=F97316&size=128"
  },
  {
    quote: "AI araçlarını nasıl kullanacağını biliyor ama insan dokunuşunu hiç kaybetmiyor. Mucize!",
    author: "Mehmet Demir",
    role: "Girişimci",
    avatar: "https://ui-avatars.com/api/?name=Mehmet+Demir&background=0f172a&color=F97316&size=128"
  },
  {
    quote: "Portföyünde gördüğüm denge ve zarafet gerçekten işlerinde de var. Güven veriyor.",
    author: "Zeynep Yılmaz",
    role: "Müşteri",
    avatar: "https://ui-avatars.com/api/?name=Zeynep+Yilmaz&background=0f172a&color=F97316&size=128"
  }
]

export function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="section-padding"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#F1F5F9] mb-4">
            Bana Güvenenler
          </h2>
          <p className="text-lg text-[#94A3B8]">
            İşte çalışma şeklim hakkında gerçek geri bildirimler
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#1e293b]/50 backdrop-blur-sm p-8 rounded-2xl border border-[#334155]/50 hover:border-[#F97316]/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-[#F97316]" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#E2E8F0] italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full grayscale hover:grayscale-0 transition-all duration-300"
                />
                <div>
                  <p className="text-[#F1F5F9] font-semibold">{testimonial.author}</p>
                  <p className="text-[#94A3B8] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

