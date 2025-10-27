'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const lofiStations = [
  { id: 1, title: 'Lofi Hip Hop Radio', youtubeId: 'jfKfPfyJRdk' },
  { id: 2, title: 'Chill Beats', youtubeId: '5qap5aO4i9A' },
  { id: 3, title: 'Study Music', youtubeId: 'DWcJFNfaw9c' },
  { id: 4, title: 'Peaceful Vibes', youtubeId: '5yx6BWlEVcY' },
]

export function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation] = useState(3) // Peaceful Vibes
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(30) // Lower volume (30% instead of 100%)

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const currentYoutubeId = lofiStations[currentStation].youtubeId

  return (
    <>
      {/* Hidden iframe that plays the music */}
      {typeof window !== 'undefined' && (
        <iframe
          key={`${currentYoutubeId}-${isPlaying}`}
          src={`https://www.youtube.com/embed/${currentYoutubeId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${currentYoutubeId}&controls=0&mute=${isMuted ? 1 : 0}&volume=${volume}`}
          style={{ 
            position: 'fixed', 
            top: '-9999px', 
            left: '-9999px',
            width: '1px',
            height: '1px',
            pointerEvents: 'none',
            opacity: 0 
          }}
          allow="autoplay; encrypted-media"
          title="Lofi Music Stream"
        />
      )}

      {/* Mini Lofi Player */}
      <div 
        className="relative flex items-center gap-2 cursor-pointer select-none text-xs text-orange-500 hover:text-orange-400 transition-all duration-500 px-2 py-1 rounded-lg hover:bg-gray-800/20"
        onClick={togglePlay}
      >
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden sm:inline"
        >
          {isPlaying ? '⏸ lofi playing...' : '▶ play lofi'}
        </motion.span>

        {/* Fallback play icon for mobile */}
        {!isPlaying && (
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-orange-500"></div>
        )}

        {isPlaying && (
          <div className="flex gap-1 items-center">
            <div className="w-1 h-3 bg-orange-500 rounded-sm"></div>
            <div className="w-1 h-3 bg-orange-500 rounded-sm"></div>
          </div>
        )}
      </div>
    </>
  )
}

