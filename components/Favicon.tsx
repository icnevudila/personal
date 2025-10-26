'use client'

import { useEffect, useState } from 'react'

export function Favicon() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    if (typeof window === 'undefined') return

    try {
      // Load favicon from localStorage
      const savedFavicon = localStorage.getItem('siteFavicon')
      
      if (savedFavicon) {
        // Remove existing favicon
        const existingFavicon = document.querySelector("link[rel~='icon']")
        if (existingFavicon) {
          existingFavicon.remove()
        }
        
        // Create new favicon link
        const link = document.createElement('link')
        link.rel = 'icon'
        link.type = 'image/png'
        link.href = savedFavicon
        document.head.appendChild(link)
      }
      
      // Check for updates every 5 seconds (reduced frequency)
      const interval = setInterval(() => {
        try {
          const updatedFavicon = localStorage.getItem('siteFavicon')
          if (updatedFavicon && updatedFavicon !== savedFavicon) {
            const existingFavicon = document.querySelector("link[rel~='icon']")
            if (existingFavicon) {
              existingFavicon.remove()
            }
            
            const link = document.createElement('link')
            link.rel = 'icon'
            link.type = 'image/png'
            link.href = updatedFavicon
            document.head.appendChild(link)
          }
        } catch (error) {
          console.warn('Favicon update error:', error)
        }
      }, 5000) // Increased interval to 5 seconds
      
      return () => clearInterval(interval)
    } catch (error) {
      console.warn('Favicon initialization error:', error)
    }
  }, [])

  // Don't render anything on server side
  if (!isClient) return null

  return null
}

