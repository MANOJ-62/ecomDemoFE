export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'staff'
  permissions: string[]
  status: 'active' | 'inactive'
  createdAt: string
  lastLogin?: string
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  averageOrderValue: number
  conversionRate: number
  topProduct: {
    id: number
    name: string
    sales: number
    revenue: number
  }
  revenueByMonth: Array<{
    month: string
    revenue: number
    orders: number
  }>
}

export interface AdminProduct {
  id: number
  name: string
  category: string
  price: number
  stock: number
  rating: number
  reviews: number
  image: string
  description: string
  status: 'active' | 'inactive' | 'discontinued'
  createdAt: string
  updatedAt: string
}

export interface AdminOrder {
  id: string
  customer: {
    id: string
    name: string
    email: string
  }
  items: Array<{
    productId: number
    productName: string
    quantity: number
    price: number
  }>
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'paid' | 'pending' | 'failed'
  createdAt: string
  updatedAt: string
}

export interface AdminCustomer {
  id: string
  name: string
  email: string
  phone?: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive'
  joinedAt: string
  lastOrderAt?: string
}

export interface ActivityLog {
  id: string
  userId: string
  action: string
  details: string
  timestamp: string
}

export interface AdminSettings {
  storeName: string
  storeEmail: string
  storePhone: string
  currency: string
  taxRate: number
  shippingCost: number
  maintenanceMode: boolean
}
