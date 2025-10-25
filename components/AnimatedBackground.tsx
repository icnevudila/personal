'use client'

import { motion } from 'framer-motion'

export default function AnimatedBackground() {
  // Responsive blob sizes for mobile optimization
  const blobs = [
    { color: 'rgba(249,115,22,0.12)', size: { mobile: 200, desktop: 350 }, x: -200, y: -100 },
    { color: 'rgba(59,130,246,0.12)', size: { mobile: 250, desktop: 400 }, x: 300, y: 100 },
    { color: 'rgba(148,163,184,0.08)', size: { mobile: 300, desktop: 500 }, x: 0, y: 250 },
  ]

  // Network lines / grid pattern - Reduced on mobile
  const networkLines = [
    { x1: '0%', y1: '20%', x2: '100%', y2: '20%' },
    { x1: '0%', y1: '50%', x2: '100%', y2: '50%' },
    { x1: '0%', y1: '80%', x2: '100%', y2: '80%' },
    { x1: '20%', y1: '0%', x2: '20%', y2: '100%' },
    { x1: '50%', y1: '0%', x2: '50%', y2: '100%' },
    { x1: '80%', y1: '0%', x2: '80%', y2: '100%' },
  ]

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Gradient Blobs */}
      {blobs.map((b, i) => (
        <motion.div
          key={`blob-${i}`}
          initial={{ x: b.x, y: b.y }}
          animate={{
            x: [b.x, b.x + 60, b.x - 60, b.x],
            y: [b.y, b.y - 40, b.y + 40, b.y],
          }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:block"
          style={{
            background: b.color,
            width: b.size.desktop,
            height: b.size.desktop,
            borderRadius: '9999px',
            filter: 'blur(100px)',
            position: 'absolute',
          }}
        />
      ))}
      
      {/* Mobile-Optimized Smaller Blobs */}
      {blobs.map((b, i) => (
        <motion.div
          key={`blob-mobile-${i}`}
          initial={{ x: b.x, y: b.y }}
          animate={{
            x: [b.x, b.x + 30, b.x - 30, b.x],
            y: [b.y, b.y - 20, b.y + 20, b.y],
          }}
          transition={{ duration: 20 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
          className="block md:hidden"
          style={{
            background: b.color,
            width: b.size.mobile,
            height: b.size.mobile,
            borderRadius: '9999px',
            filter: 'blur(60px)',
            position: 'absolute',
          }}
        />
      ))}
      
      {/* Network Lines - Reduced animation on mobile */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03] md:opacity-[0.03]" style={{ filter: 'blur(0.5px)' }}>
        {networkLines.map((line, i) => (
          <motion.line
            key={`line-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(249,115,22,0.15)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.1, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>
    </div>
  )
}

