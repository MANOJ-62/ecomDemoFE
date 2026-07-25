import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, UserProfileResponse } from './types/backend'
import { mapUserProfileResponseToUser } from './mappers'
import { User } from '@/types'

export async function getUserProfile(): Promise<User> {
  const response = await api.get<ApiResponse<UserProfileResponse>>('/users/me')
  return mapUserProfileResponseToUser(unwrapApiResponse(response))
}

export async function updateUserProfile(payload: {
  firstName: string
  lastName?: string
  email: string
  phone?: string
}): Promise<User> {
  const response = await api.put<ApiResponse<UserProfileResponse>>('/users/me', payload)
  return mapUserProfileResponseToUser(unwrapApiResponse(response))
}

export async function changePassword(payload: { oldPassword: string; newPassword: string }): Promise<void> {
  const response = await api.put<ApiResponse<null>>('/users/change-password', payload)
  unwrapApiResponse(response)
}
