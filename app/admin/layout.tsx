'use client'

import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Hide navbar and footer for admin pages
    const navbar = document.querySelector('nav')
    const footer = document.querySelector('footer')
    
    if (navbar) navbar.style.display = 'none'
    if (footer) footer.style.display = 'none'
    
    return () => {
      // Show navbar and footer when leaving admin
      if (navbar) navbar.style.display = ''
      if (footer) footer.style.display = ''
    }
  }, [])

  return <>{children}</>
}

