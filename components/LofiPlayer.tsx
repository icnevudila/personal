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
  { id: 1, title: 'Lofi Hip Hop Radio', youtubeId: 'jfKfPfyJRdk', autoplay: true },
  { id: 2, title: 'Chill Beats', youtubeId: '5qap5aO4i9A', autoplay: false },
  { id: 3, title: 'Study Music', youtubeId: 'DWcJFNfaw9c', autoplay: false },
  { id: 4, title: 'Peaceful Vibes', youtubeId: '5yx6BWlEVcY', autoplay: false },
]

export function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStation, setCurrentStation] = useState(0)
  const [volume, setVolume] = useState(50)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const iframeRef = useState<HTMLIFrameElement | null>(null)[0]

  const currentYoutubeId = lofiStations[currentStation].youtubeId

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextStation = () => {
    setIsPlaying(false)
    setCurrentStation((prev) => (prev + 1) % lofiStations.length)
    setTimeout(() => setIsPlaying(true), 100)
  }

  const prevStation = () => {
    setIsPlaying(false)
    setCurrentStation((prev) => (prev - 1 + lofiStations.length) % lofiStations.length)
    setTimeout(() => setIsPlaying(true), 100)
  }

  const toggleMute = () => setIsMuted(!isMuted)

  const iframeUrl = `https://www.youtube.com/embed/${currentYoutubeId}?autoplay=${isPlaying ? 1 : 0}&loop=1&playlist=${currentYoutubeId}&controls=0&mute=${isMuted ? 1 : 0}&volume=${isMuted ? 0 : Math.floor(volume / 100)}`

  return (
    <>
      {/* Hidden YouTube iframe */}
      <div className="fixed top-0 right-0 w-1 h-1 pointer-events-none opacity-0 z-0">
        <iframe
          ref={iframeRef}
          src={iframeUrl}
          allow="autoplay; encrypted-media"
          className="w-1 h-1"
          title="Lofi Music"
        />
      </div>

      {/* Minimized Player */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className={`fixed bottom-24 right-6 z-40 bg-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-80' : 'w-72'
        }`}
      >
        <div className="flex items-center gap-3 p-4">
          {/* Album Cover */}
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
              {lofiStations[currentStation].title}
            </h4>
            <p className="text-gray-400 text-xs">Live Stream</p>
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
                {lofiStations.map((station, index) => (
                  <button
                    key={station.id}
                    onClick={() => {
                      setCurrentStation(index)
                      setIsPlaying(true)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      currentStation === index
                        ? 'bg-primary-500/20 text-primary-400'
                        : 'hover:bg-gray-800 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <MusicalNoteIcon className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{station.title}</p>
                        <p className="text-xs text-gray-500">Lofi Live</p>
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
            max="100"
            step="1"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(parseInt(e.target.value))
              setIsMuted(parseInt(e.target.value) === 0)
            }}
            className="w-full h-1.5 rounded-full bg-gray-700 appearance-none cursor-pointer accent-primary-500"
          />
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full py-2 text-xs text-center text-gray-400 hover:text-white transition-colors border-t border-gray-800"
        >
          {isExpanded ? 'Daha Az' : 'Stations'}
        </button>
      </motion.div>

      {/* Hidden iframe that actually plays the music */}
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
    </>
  )
}

