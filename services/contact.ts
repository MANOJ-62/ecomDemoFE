import api, { unwrapApiResponse } from './apiClient'
import { ApiNotAvailableError } from './errors'

export async function subscribeNewsletter(_email: string): Promise<boolean> {
  throw new ApiNotAvailableError('POST /api/newsletter/subscribe')
}

export async function submitContactForm(_data: {
  name: string
  email: string
  message: string
}): Promise<boolean> {
  throw new ApiNotAvailableError('POST /api/contact')
}
