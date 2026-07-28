export interface Product {
  id: number
  name: string
  description: string
  longDescription?: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
  stock: number
  benefits: string[]
  ingredients: string[]
  servings?: number
  weight?: string
  flavors?: string[]
  nutritionInfo?: string
  allergenInfo?: string
  storageInstructions?: string
}

export interface CartItem {
  cartItemId?: number
  productId: number
  product: Product
  quantity: number
  flavor?: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  tax: number
  total: number
}

export interface Customer {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface Order {
  id: string
  customer: Customer
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  estimatedDelivery?: string
}

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}

export interface Wishlist {
  productIds: string[]
}
