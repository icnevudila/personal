'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'

const lofiStations = [
  { id: 1, title: 'Lofi Hip Hop Radio', youtubeId: 'jfKfPfyJRdk' },
  { id: 2, title: 'Chill Beats', youtubeId: '5qap5aO4i9A' },
  { id: 3, title: 'Study Music', youtubeId: 'DWcJFNfaw9c' },
  { id: 4, title: 'Peaceful Vibes', youtubeId: '5yx6BWlEVcY' },
]

export function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState(3) // Peaceful Vibes
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

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

  const toggleMute = () => setIsMuted(!isMuted)

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

      {/* Minimal Player in Navbar */}
      <div className="relative">
        <button
          onClick={togglePlay}
          className="group relative w-9 h-9 rounded-lg bg-orange-500 hover:bg-orange-600 transition-colors flex items-center justify-center"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <PauseIcon className="w-4 h-4 text-white" />
          ) : (
            <PlayIcon className="w-4 h-4 text-white ml-0.5" />
          )}
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
        </button>

        {/* Dropdown on hover */}
        <div className="absolute top-full right-0 mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
          <div className="bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-2xl border border-orange-500/20 p-3">
            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-700/50">
              <div className="w-8 h-8 rounded bg-orange-500 flex items-center justify-center flex-shrink-0">
                <MusicalNoteIcon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold text-sm truncate">
                  {lofiStations[currentStation].title}
                </h4>
                <p className="text-orange-400 text-xs">Now Playing</p>
              </div>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleMute()
                  }}
                  className="w-7 h-7 rounded hover:bg-gray-800 transition-colors flex items-center justify-center flex-shrink-0"
                >
                  {isMuted ? (
                    <SpeakerXMarkIcon className="w-3 h-3 text-orange-500" />
                  ) : (
                    <SpeakerWaveIcon className="w-3 h-3 text-orange-500" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseInt(e.target.value))
                    setIsMuted(parseInt(e.target.value) === 0)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 h-1 rounded-full bg-gray-700 appearance-none cursor-pointer accent-orange-500"
                />
              </div>
            </div>

            {/* Stations */}
            <div className="mt-3 pt-3 border-t border-gray-700/50 max-h-48 overflow-y-auto">
              <div className="space-y-1">
                {lofiStations.map((station, index) => (
                  <button
                    key={station.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentStation(index)
                      setIsPlaying(true)
                    }}
                    className={`w-full text-left px-2 py-1.5 rounded text-xs transition-colors ${
                      currentStation === index
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    {station.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

