'use client'

import { useState, useEffect } from 'react'

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
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const currentYoutubeId = lofiStations[currentStation].youtubeId

  return (
    <>
      {/* Hidden iframe that plays the music */}
      {isMounted && (
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

      {/* Play/Pause Button - Right Triangle */}
      <button
        onClick={togglePlay}
        className="relative group w-8 h-8 flex items-center justify-center"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          // Pause icon
          <div className="flex gap-1 items-center">
            <div className="w-1 h-3 bg-orange-500 rounded-sm"></div>
            <div className="w-1 h-3 bg-orange-500 rounded-sm"></div>
          </div>
        ) : (
          // Play icon - Right triangle
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-orange-500 group-hover:border-l-orange-400 ml-1 transition-colors"></div>
        )}
        {isPlaying && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        )}
      </button>
    </>
  )
}

