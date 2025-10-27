'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Local storage'dan theme'i oku
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setTheme(savedTheme)
    } else {
      // Hiç kaydetme yoksa varsayılan olarak dark mode
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    // Theme değiştiğinde localStorage'a kaydet ve document attribute'unu güncelle
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    // Add transition class for smooth animation
    document.body.classList.add('transitioning')
    
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      
      // Remove transition class after animation
      setTimeout(() => {
        document.body.classList.remove('transitioning')
      }, 400)
      
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
