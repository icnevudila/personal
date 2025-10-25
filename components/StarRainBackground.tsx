'use client'

import { useEffect, useState } from 'react'

export default function StarRainBackground() {
  const [stars, setStars] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([])

  useEffect(() => {
    // Create 150 stars with random positions and timings - MUCH MORE VISIBLE
    const newStars = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 3 + Math.random() * 4,
      size: 2 + Math.random() * 3, // Random size between 2-5px
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full"
          style={{
            left: `${star.left}%`,
            top: '-20px',
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: '#F97316',
            boxShadow: '0 0 10px rgba(249, 115, 22, 1), 0 0 20px rgba(249, 115, 22, 0.8), 0 0 30px rgba(249, 115, 22, 0.5)',
            animation: `fallDown ${star.duration}s linear ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

