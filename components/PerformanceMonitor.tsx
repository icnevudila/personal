'use client'

import { useEffect } from 'react'

export function PerformanceMonitor() {
  useEffect(() => {
    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Measure page load time
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        
        if (perfData) {
          console.log('Performance Metrics:', {
            'DOM Content Loaded': `${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`,
            'Page Load Complete': `${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`,
            'Total Load Time': `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`,
            'First Paint': `${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`
          })
        }
      })

      // Monitor Core Web Vitals
      if ('web-vital' in window) {
        // This would require web-vitals library
        // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'
      }
    }
  }, [])

  return null
}
