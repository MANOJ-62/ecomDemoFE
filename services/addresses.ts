import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, AddressResponse } from './types/backend'
import { mapAddressResponseToAddress, mapAddressToCreateRequest } from './mappers'
import { ApiNotAvailableError } from './errors'
import { Address, AddressValidation } from './types/address'
import { Customer } from '@/types'

export type { Address, AddressValidation } from './types/address'

async function fetchAddresses(): Promise<Address[]> {
  const response = await api.get<ApiResponse<AddressResponse[]>>('/addresses')
  return unwrapApiResponse(response).map((address) => mapAddressResponseToAddress(address))
}

export const getUserAddresses = async (_userId: string): Promise<Address[]> => fetchAddresses()

export const getDefaultAddress = async (_userId: string): Promise<Address | null> => {
  const addresses = await fetchAddresses()
  return addresses.find((address) => address.isDefault) ?? addresses[0] ?? null
}

export const getAddressById = async (_userId: string, addressId: string): Promise<Address | null> => {
  try {
    const response = await api.get<ApiResponse<AddressResponse>>(`/addresses/${addressId}`)
    return mapAddressResponseToAddress(unwrapApiResponse(response))
  } catch {
    return null
  }
}

export const addAddress = async (
  _userId: string,
  address: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<Address | null> => {
  const validation = validateAddress(address)
  if (!validation.valid) {
    throw new Error(`Address validation failed: ${Object.values(validation.errors).join(', ')}`)
  }

  const response = await api.post<ApiResponse<AddressResponse>>(
    '/addresses',
    mapAddressToCreateRequest(address)
  )
  return mapAddressResponseToAddress(unwrapApiResponse(response))
}

export const createAddressFromCustomer = async (customer: Customer): Promise<Address> => {
  const address = await addAddress('', {
    type: 'home',
    fullName: `${customer.firstName} ${customer.lastName}`.trim(),
    phone: customer.phone,
    email: customer.email,
    addressLine1: customer.address,
    city: customer.city,
    state: customer.state,
    zipCode: customer.zipCode,
    country: customer.country,
    isDefault: true,
  })

  if (!address) {
    throw new Error('Failed to create shipping address')
  }

  return address
}

export const updateAddress = async (
  _userId: string,
  addressId: string,
  updates: Partial<Omit<Address, 'id' | 'userId' | 'createdAt'>>
): Promise<Address | null> => {
  const existing = await getAddressById('', addressId)
  if (!existing) {
    return null
  }

  const merged = { ...existing, ...updates }
  const validation = validateAddress(merged)
  if (!validation.valid) {
    throw new Error(`Address validation failed: ${Object.values(validation.errors).join(', ')}`)
  }

  const response = await api.put<ApiResponse<AddressResponse>>(
    `/addresses/${addressId}`,
    mapAddressToCreateRequest(merged)
  )
  return mapAddressResponseToAddress(unwrapApiResponse(response))
}

export const deleteAddress = async (_userId: string, addressId: string): Promise<boolean> => {
  const response = await api.delete<ApiResponse<null>>(`/addresses/${addressId}`)
  unwrapApiResponse(response)
  return true
}

export const setDefaultAddress = async (_userId: string, addressId: string): Promise<Address | null> => {
  const response = await api.patch<ApiResponse<null>>(`/addresses/${addressId}/default`)
  unwrapApiResponse(response)
  return getAddressById('', addressId)
}

export const validateAddress = (
  address: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): AddressValidation => {
  const errors: Record<string, string> = {}

  if (!address.fullName || address.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters'
  }

  if (!address.phone || !/^\+?[\d\s\-()]{10,}$/.test(address.phone)) {
    errors.phone = 'Invalid phone number'
  }

  if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
    errors.email = 'Invalid email address'
  }

  if (!address.addressLine1 || address.addressLine1.trim().length < 5) {
    errors.addressLine1 = 'Address must be at least 5 characters'
  }

  if (!address.city || address.city.trim().length < 2) {
    errors.city = 'City is required'
  }

  if (!address.state || address.state.trim().length < 2) {
    errors.state = 'State is required'
  }

  if (!address.zipCode || !/^[\d\s-]{3,}$/.test(address.zipCode)) {
    errors.zipCode = 'Invalid zip code'
  }

  if (!address.country || address.country.trim().length < 2) {
    errors.country = 'Country is required'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

export const addressExists = async (_userId: string, addressLine1: string, zipCode: string): Promise<boolean> => {
  const addresses = await fetchAddresses()
  return addresses.some(
    (address) =>
      address.addressLine1.toLowerCase() === addressLine1.toLowerCase() && address.zipCode === zipCode
  )
}

export const getAddressCount = async (_userId: string): Promise<number> => {
  const addresses = await fetchAddresses()
  return addresses.length
}

export const exportAddressesAsCSV = async (_userId: string): Promise<string> => {
  throw new ApiNotAvailableError('GET /api/addresses/export')
}

export const getAddressStats = async () => {
  throw new ApiNotAvailableError('GET /api/addresses/stats')
}

export const getAddressesByType = async (
  _userId: string,
  type: Address['type']
): Promise<Address[]> => {
  const addresses = await fetchAddresses()
  return addresses.filter((address) => address.type === type)
}

export const getAddressesByCountry = async (_userId: string, country: string): Promise<Address[]> => {
  const addresses = await fetchAddresses()
  return addresses.filter((address) => address.country.toLowerCase() === country.toLowerCase())
}

export const deleteMultipleAddresses = async (_userId: string, addressIds: string[]): Promise<number> => {
  let deletedCount = 0
  for (const id of addressIds) {
    if (await deleteAddress('', id)) {
      deletedCount++
    }
  }
  return deletedCount
}

export const getRecentAddresses = async (_userId: string): Promise<Address[]> => {
  const addresses = await fetchAddresses()
  return addresses.slice(0, 5)
}

export const searchAddresses = async (_userId: string, query: string): Promise<Address[]> => {
  const lowerQuery = query.toLowerCase()
  const addresses = await fetchAddresses()

  return addresses.filter(
    (address) =>
      address.fullName.toLowerCase().includes(lowerQuery) ||
      address.addressLine1.toLowerCase().includes(lowerQuery) ||
      address.city.toLowerCase().includes(lowerQuery) ||
      address.state.toLowerCase().includes(lowerQuery) ||
      address.zipCode.includes(query) ||
      (address.label ? address.label.toLowerCase().includes(lowerQuery) : false)
  )
}

export const calculateShipping = async (_address: Address): Promise<number> => {
  throw new ApiNotAvailableError('POST /api/shipping/calculate')
}

export const verifyAddress = async (address: Address): Promise<boolean> => validateAddress(address).valid

export const getAddressSuggestions = async (_query: string): Promise<string[]> => {
  throw new ApiNotAvailableError('GET /api/addresses/suggestions')
}
