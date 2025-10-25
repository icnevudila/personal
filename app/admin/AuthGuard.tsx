'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isLocalAdmin, setIsLocalAdmin] = useState(false)

  useEffect(() => {
    // Check localStorage for admin mode
    const adminMode = localStorage.getItem('adminMode')
    if (adminMode === 'true') {
      setIsLocalAdmin(true)
    }
  }, [])

  useEffect(() => {
    if (!loading && !user && !isLocalAdmin) {
      router.push('/admin/login')
    }
  }, [user, loading, isLocalAdmin, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4"></div>
          <div className="text-white text-lg">Yükleniyor...</div>
        </div>
      </div>
    )
  }

  if (!user && !isLocalAdmin) {
    return null
  }

  return <>{children}</>
}

