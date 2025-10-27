'use client'

import { useState, useEffect } from 'react'
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline'

const lofiStations = [
  { id: 1, title: 'Lofi Hip Hop Radio', youtubeId: 'jfKfPfyJRdk' },
  { id: 2, title: 'Chill Beats', youtubeId: '5qap5aO4i9A' },
  { id: 3, title: 'Study Music', youtubeId: 'DWcJFNfaw9c' },
  { id: 4, title: 'Peaceful Vibes', youtubeId: '5yx6BWlEVcY' },
]

export function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState(3) // Peaceful Vibes
  const [isMuted, setIsMuted] = useState(false)

  // Auto-play on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const currentYoutubeId = lofiStations[currentStation].youtubeId

  return (
    <>
      {/* Hidden iframe that plays the music */}
      {typeof window !== 'undefined' && (
        <iframe
          key={`${currentYoutubeId}-${isPlaying}-${isMuted}`}
          src={`https://www.youtube.com/embed/${currentYoutubeId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${currentYoutubeId}&controls=0&mute=${isMuted ? 1 : 0}`}
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

      {/* Minimal Triangle Button */}
      <button
        onClick={togglePlay}
        className="relative group"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[12px] border-b-orange-500 group-hover:border-b-orange-400 transition-colors">
          {isPlaying && (
            <PauseIcon className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-3 h-3 text-white" />
          )}
        </div>
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        )}
      </button>
    </>
  )
}

