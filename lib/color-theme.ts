// Premium Yellow Color Theme System
// Bu dosya turuncu ve sarı renkler arasında geçiş yapmak için kullanılır

export interface ColorTheme {
  primary: string
  primaryHover: string
  primaryDark: string
  primaryLight: string
  primaryBg: string
  primaryBorder: string
  primaryText: string
  primaryShadow: string
  primaryGradient: string
  primaryGradientHover: string
}

// Premium Yellow Theme
export const yellowTheme: ColorTheme = {
  primary: '#FFD700',        // Gold
  primaryHover: '#FFC107',   // Amber
  primaryDark: '#FF8F00',    // Dark Amber
  primaryLight: '#FFF59D',   // Light Yellow
  primaryBg: '#FFD700',      // Gold
  primaryBorder: '#FFD700',  // Gold
  primaryText: '#FFD700',    // Gold
  primaryShadow: 'rgba(255, 215, 0, 0.4)', // Gold with opacity
  primaryGradient: 'from-[#FFD700] to-[#FFC107]',
  primaryGradientHover: 'from-[#FFC107] to-[#FF8F00]'
}

// Original Orange Theme
export const orangeTheme: ColorTheme = {
  primary: '#F97316',        // Orange
  primaryHover: '#ea6707',   // Dark Orange
  primaryDark: '#d45a05',    // Darker Orange
  primaryLight: '#F97316',   // Orange
  primaryBg: '#F97316',      // Orange
  primaryBorder: '#F97316',  // Orange
  primaryText: '#F97316',    // Orange
  primaryShadow: 'rgba(249, 115, 22, 0.4)', // Orange with opacity
  primaryGradient: 'from-[#F97316] to-[#ea6707]',
  primaryGradientHover: 'from-[#ea6707] to-[#d45a05]'
}

// Current theme state
let currentTheme: ColorTheme = yellowTheme

export const getCurrentTheme = (): ColorTheme => currentTheme

export const setTheme = (theme: 'yellow' | 'orange'): void => {
  currentTheme = theme === 'yellow' ? yellowTheme : orangeTheme
  // Store in localStorage for persistence
  localStorage.setItem('colorTheme', theme)
}

export const loadTheme = (): void => {
  const savedTheme = localStorage.getItem('colorTheme')
  if (savedTheme === 'orange') {
    currentTheme = orangeTheme
  } else {
    currentTheme = yellowTheme
  }
}

// Initialize theme on load
if (typeof window !== 'undefined') {
  loadTheme()
}

