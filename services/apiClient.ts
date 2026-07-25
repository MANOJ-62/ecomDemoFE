import axios, { AxiosResponse } from 'axios'
import { ApiResponse } from './types/backend'
import { ApiError } from './errors'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export function unwrapApiResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
  const body = response.data
  if (!body.success) {
    throw new ApiError(body.message || 'Request failed')
  }
  return body.data
}

export default api
