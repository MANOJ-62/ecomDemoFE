'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getAuthToken } from '@/services/auth'

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = getAuthToken()
    
    // For demo purposes, allow access with email containing 'admin' or 'foodzone'
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[0] || ''))
        if (payload.email?.includes('admin') || payload.email?.includes('foodzone')) {
          setIsAdmin(true)
        } else {
          router.push('/')
        }
      } catch (e) {
        router.push('/')
      }
    } else {
      router.push('/login')
    }
    
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
}
