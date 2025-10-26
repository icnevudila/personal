import { useEffect } from 'react'

export const useColorTheme = () => {
  useEffect(() => {
    const applyColorTheme = () => {
      const theme = localStorage.getItem('colorTheme')
      
      if (theme === 'orange') {
        // Apply orange theme
        document.documentElement.style.setProperty('--primary-color', '#F97316')
        document.documentElement.style.setProperty('--primary-hover', '#ea6707')
        document.documentElement.style.setProperty('--primary-dark', '#d45a05')
        document.documentElement.style.setProperty('--primary-shadow', 'rgba(249, 115, 22, 0.4)')
      } else {
        // Apply yellow theme (default)
        document.documentElement.style.setProperty('--primary-color', '#FFD700')
        document.documentElement.style.setProperty('--primary-hover', '#FFC107')
        document.documentElement.style.setProperty('--primary-dark', '#FF8F00')
        document.documentElement.style.setProperty('--primary-shadow', 'rgba(255, 215, 0, 0.4)')
      }
    }

    applyColorTheme()
    
    // Listen for theme changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'colorTheme') {
        applyColorTheme()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])
}

