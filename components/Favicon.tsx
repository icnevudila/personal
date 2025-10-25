'use client'

import { useEffect } from 'react'

export function Favicon() {
  useEffect(() => {
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
    
    // Check for updates every second
    const interval = setInterval(() => {
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
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  return null
}

