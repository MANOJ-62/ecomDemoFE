import { User } from '@/types'
import api, { unwrapApiResponse } from './apiClient'
import { ApiNotAvailableError } from './errors'
import { ApiResponse, AuthResponse } from './types/backend'
import { mapAuthResponseToUser } from './mappers'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName?: string
  email: string
  password: string
  phone?: string
}

export const login = async (request: LoginRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', request)
  const data = unwrapApiResponse(response)
  const user = mapAuthResponseToUser(data)

  localStorage.setItem('token', data.token)
  localStorage.setItem('user', JSON.stringify(user))

  return { ...data, user }
}

export const register = async (request: RegisterRequest) => {
  const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', request)
  return unwrapApiResponse(response)
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/'
}

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export const getToken = () => {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('token')
}

export const storeAuthData = (token: string, user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export const getAuthToken = (): string | null => getToken()

export const loginWithOTP = async (_email: string): Promise<{ success: boolean; message: string }> => {
  throw new ApiNotAvailableError('POST /api/auth/otp/send')
}

export const verifyOTPAndGetToken = async (
  _email: string,
  _otp: string
): Promise<{ success: boolean; token?: string; user?: User; message: string }> => {
  throw new ApiNotAvailableError('POST /api/auth/otp/verify')
}

export const sendOTPEmail = async (_email: string): Promise<boolean> => {
  throw new ApiNotAvailableError('POST /api/auth/otp/send')
}

export const verifyOTP = async (_email: string, _otp: string): Promise<boolean> => {
  throw new ApiNotAvailableError('POST /api/auth/otp/verify')
}

export const generateJWT = (_user: User): string => {
  throw new ApiNotAvailableError('Client-side JWT generation is not supported. Use POST /api/auth/login')
}

export const verifyJWT = (_token: string): User | null => {
  throw new ApiNotAvailableError('Client-side JWT verification is not supported. Use GET /api/users/me')
}

export const generateOTP = (): string => {
  throw new ApiNotAvailableError('POST /api/auth/otp/send')
}
