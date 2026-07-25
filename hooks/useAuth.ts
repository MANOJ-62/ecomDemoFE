import { useState, useCallback, useEffect } from 'react'
import { User } from '@/types'
import {
  login,
  logout,
  register,
  getCurrentUser,
  getAuthToken,
} from '@/services/auth'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = getAuthToken()
    const currentUser = getCurrentUser()

    if (token && currentUser) {
      setUser(currentUser)
      setIsAuthenticated(true)
    }
  }, [])

  const loginUser = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await login({
          email,
          password,
        })

        setUser(response.user)
        setIsAuthenticated(true)

        return true
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Login failed'

        setError(message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const registerUser = useCallback(
    async (payload: {
      firstName: string
      lastName?: string
      email: string
      password: string
      phone?: string
    }) => {
      setIsLoading(true)
      setError(null)

      try {
        await register(payload)
        return true
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Registration failed'

        setError(message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const handleLogout = useCallback(() => {
    logout()
    setUser(null)
    setIsAuthenticated(false)
    setError(null)
  }, [])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,

    login: loginUser,
    register: registerUser,
    logout: handleLogout,
  }
}