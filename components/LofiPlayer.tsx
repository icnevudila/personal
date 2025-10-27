'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  MusicalNoteIcon
} from '@heroicons/react/24/outline'

const lofiSongs = [
  { id: 1, title: 'Peaceful Morning', url: 'https://assets.mixkit.co/music/download/mixkit-chimes-cluster-344.mp3' },
  { id: 2, title: 'Cozy Vibes', url: 'https://assets.mixkit.co/music/download/mixkit-kitchen-ambience-112.mp3' },
  { id: 3, title: 'Coffee Dreams', url: 'https://assets.mixkit.co/music/download/mixkit-winter-atmosphere-1695.mp3' },
  { id: 4, title: 'Study Focus', url: 'https://assets.mixkit.co/music/download/mixkit-forest-stream-2531.mp3' },
]

export function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      // Auto-play next song
      if (audio.ended) {
        nextSong()
      }
    }

    audio.addEventListener('ended', handleTimeUpdate)
    return () => audio.removeEventListener('ended', handleTimeUpdate)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(err => console.error('Play failed:', err))
    } else {
      audio.pause()
    }
  }, [isPlaying, currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const togglePlay = () => setIsPlaying(!isPlaying)
  
  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % lofiSongs.length)
    setIsPlaying(true)
  }

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + lofiSongs.length) % lofiSongs.length)
    setIsPlaying(true)
  }

  const toggleMute = () => setIsMuted(!isMuted)

  return (
    <>
      <audio
        ref={audioRef}
        src={lofiSongs[currentSong].url}
        preload="auto"
      />

      {/* Minimized Player */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className={`fixed bottom-24 right-6 z-40 bg-gray-900/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-80' : 'w-72'
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          {/* Album Cover Placeholder */}
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center flex-shrink-0"
          >
            <MusicalNoteIcon className="w-7 h-7 text-white" />
          </motion.div>

          {/* Song Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold text-sm truncate">
              {lofiSongs[currentSong].title}
            </h4>
            <p className="text-gray-400 text-xs">Lofi Vibes</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 transition-colors flex items-center justify-center"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <PauseIcon className="w-5 h-5 text-white" />
              ) : (
                <PlayIcon className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="w-8 h-8 rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="w-4 h-4 text-gray-400" />
              ) : (
                <SpeakerWaveIcon className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Expanded Playlist */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-gray-800 max-h-64 overflow-y-auto"
            >
              <div className="p-3 space-y-2">
                {lofiSongs.map((song, index) => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setCurrentSong(index)
                      setIsPlaying(true)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      currentSong === index
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <MusicalNoteIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{song.title}</p>
                        <p className="text-xs text-gray-500">Lofi</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Volume Control */}
        <div className="px-4 pb-3">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value))
              setIsMuted(parseFloat(e.target.value) === 0)
            }}
            className="w-full h-1.5 rounded-full bg-gray-700 appearance-none cursor-pointer accent-primary-500"
          />
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 text-xs text-center text-gray-400 hover:text-white transition-colors border-t border-gray-800"
        >
          {isExpanded ? 'Daha Az' : 'Playlist'}
        </button>
      </motion.div>
    </>
  )
}

