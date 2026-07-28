export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface AuthResponse {
  userId: number
  firstName: string
  lastName?: string
  email: string
  token: string
}

export interface UserProfileResponse {
  id: number
  firstName: string
  lastName?: string
  email: string
  phone?: string
}

export interface ProductResponse {
  id: number
  categoryId: number
  categoryName: string
  name: string
  slug: string
  shortDescription?: string
  description?: string
  sku: string
  brand?: string
  netWeight?: string
  nutritionInfo?: string
  allergenInfo?: string
  storageInstructions?: string
  price: number
  discountPrice?: number
  stock: number
  thumbnailUrl?: string
  active: boolean
  featured: boolean
  flavors?: string[]
  highlights?: string[]
  ingredients?: string[]
  images?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface PageProductResponse {
  content: ProductResponse[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface CategoryResponse {
  id: number
  name: string
  slug: string
  description?: string
  imageUrl?: string
  active: boolean
  sortOrder: number
  parentId?: number
}

export interface CartItemResponse {
  cartItemId: number
  productId: number
  productName: string
  thumbnailUrl?: string
  flavor?: string
  quantity: number
  price: number
  subtotal: number
}

export interface CartResponse {
  cartId: number
  totalItems: number
  totalAmount: number
  items: CartItemResponse[]
}

export interface AddressResponse {
  id: number
  type: 'HOME' | 'OFFICE' | 'OTHER'
  fullName: string
  phone: string
  email?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  label?: string
  isDefault: boolean
}

export interface OrderItemResponse {
  productId: number
  productName: string
  sku: string
  flavor?: string
  price: number
  quantity: number
  subtotal: number
}

export interface OrderResponse {
  id: number
  orderNumber: string
  orderStatus: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  paymentMethod: 'COD' | 'UPI' | 'CARD' | 'NET_BANKING'
  subtotal: number
  shippingCharge: number
  taxAmount: number
  discountAmount: number
  totalAmount: number
  fullName: string
  phone: string
  email: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  notes?: string
  createdAt: string
  items: OrderItemResponse[]
}

export interface AdminDashboardResponse {
  totalCustomers: number
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  confirmedOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  totalRevenue: number
  todayRevenue: number
}

export interface PaymentResponse {
  paymentId: number
  orderId: number
  gateway: 'COD' | 'RAZORPAY' | 'STRIPE' | 'CASHFREE' | 'PHONEPE' | 'PAYU'
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'
  amount: number
  currency: string
  gatewayOrderId?: string
  gatewayPaymentId?: string
}

export interface CreatePaymentResponse {
  paymentId: number
  gatewayOrderId: string
  gatewayKey: string
  currency: string
  amount: string
}
