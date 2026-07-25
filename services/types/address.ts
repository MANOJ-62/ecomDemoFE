export interface Address {
  id: string
  userId: string
  type: 'home' | 'work' | 'other'
  fullName: string
  phone: string
  email?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  label?: string
  createdAt: string
  updatedAt: string
}

export interface AddressValidation {
  valid: boolean
  errors: Record<string, string>
}
