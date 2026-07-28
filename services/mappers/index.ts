import { Product, User, Customer, Order, CartItem } from '@/types'
import { AdminProduct, AdminOrder, DashboardStats } from '@/types/admin'
import {
  ProductResponse,
  OrderResponse,
  CategoryResponse,
  AddressResponse,
  AuthResponse,
  UserProfileResponse,
  AdminDashboardResponse,
} from '../types/backend'
import { Category, CategoryHierarchy } from '../types/category'
import { Address } from '../types/address'

export function mapProductResponseToProduct(dto: ProductResponse): Product {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.shortDescription ?? dto.description ?? '',
    longDescription: dto.description,
    price: dto.discountPrice ?? dto.price,
    rating: 0,
    reviews: 0,
    image: dto.thumbnailUrl ?? dto.images?.[0] ?? '',
    category: dto.categoryName ?? '',
    stock: dto.stock,
    benefits: dto.highlights ?? [],
    ingredients: dto.ingredients ?? [],
    weight: dto.netWeight,
    flavors: dto.flavors ?? [],
    nutritionInfo: dto.nutritionInfo,
    allergenInfo: dto.allergenInfo,
    storageInstructions: dto.storageInstructions,
  }
}

export function mapProductResponseToAdminProduct(dto: ProductResponse): AdminProduct {
  return {
    id: dto.id,
    name: dto.name,
    category: dto.categoryName ?? '',
    price: dto.discountPrice ?? dto.price,
    stock: dto.stock,
    rating: 0,
    reviews: 0,
    image: dto.thumbnailUrl ?? dto.images?.[0] ?? '',
    description: dto.shortDescription ?? dto.description ?? '',
    flavors: dto.flavors ?? [],
    status: dto.active ? 'active' : 'inactive',
    createdAt: dto.createdAt ?? new Date().toISOString(),
    updatedAt: dto.updatedAt ?? new Date().toISOString(),
  }
}

export function mapAdminProductToCreateRequest(product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>, categoryId: number) {
  return {
    categoryId,
    name: product.name,
    shortDescription: product.description,
    description: product.description,
    sku: `SKU-${Date.now()}`,
    price: product.price,
    stock: product.stock,
    thumbnailUrl: product.image,
    active: product.status === 'active',
    featured: false,
    flavors: product.flavors,
    images: product.image ? [product.image] : [],
  }
}

export function mapAdminProductToUpdateRequest(product: Partial<AdminProduct>, categoryId?: number) {
  return {
    ...(categoryId !== undefined && { categoryId }),
    ...(product.name !== undefined && { name: product.name }),
    ...(product.description !== undefined && {
      shortDescription: product.description,
      description: product.description,
    }),
    ...(product.price !== undefined && { price: product.price }),
    ...(product.stock !== undefined && { stock: product.stock }),
    ...(product.image !== undefined && {
      thumbnailUrl: product.image,
      images: product.image ? [product.image] : [],
    }),
    ...(product.status !== undefined && { active: product.status === 'active' }),
    ...(product.flavors !== undefined && { flavors: product.flavors }),
  }
}

const orderStatusMap: Record<OrderResponse['orderStatus'], Order['status']> = {
  PENDING: 'pending',
  CONFIRMED: 'processing',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

const adminOrderStatusMap: Record<OrderResponse['orderStatus'], AdminOrder['status']> = {
  PENDING: 'pending',
  CONFIRMED: 'processing',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

const paymentStatusMap: Record<OrderResponse['paymentStatus'], AdminOrder['paymentStatus']> = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  REFUNDED: 'failed',
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/)
  return {
    firstName: parts[0] ?? '',
    lastName: parts.slice(1).join(' '),
  }
}

function mapOrderItemToCartItem(item: OrderResponse['items'][number]): CartItem {
  return {
    productId: item.productId,
    product: mapProductResponseToProduct({
      id: item.productId,
      categoryId: 0,
      categoryName: '',
      name: item.productName,
      slug: '',
      sku: item.sku,
      price: item.price,
      stock: 0,
      active: true,
      featured: false,
    }),
    quantity: item.quantity,
    flavor: item.flavor,
  }
}

export function mapOrderResponseToOrder(dto: OrderResponse): Order {
  const { firstName, lastName } = splitFullName(dto.fullName)

  const customer: Customer = {
    firstName,
    lastName,
    email: dto.email,
    phone: dto.phone,
    address: dto.addressLine1,
    city: dto.city,
    state: dto.state,
    zipCode: dto.postalCode,
    country: dto.country,
  }

  return {
    id: dto.orderNumber || String(dto.id),
    customer,
    items: dto.items.map(mapOrderItemToCartItem),
    subtotal: dto.subtotal,
    tax: dto.taxAmount,
    shipping: dto.shippingCharge,
    total: dto.totalAmount,
    status: orderStatusMap[dto.orderStatus] ?? 'pending',
    createdAt: dto.createdAt,
  }
}

export function mapOrderResponseToAdminOrder(dto: OrderResponse): AdminOrder {
  return {
    id: dto.orderNumber || String(dto.id),
    customer: {
      id: dto.email,
      name: dto.fullName,
      email: dto.email,
    },
    items: dto.items.map((item) => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
    })),
    total: dto.totalAmount,
    status: adminOrderStatusMap[dto.orderStatus] ?? 'pending',
    paymentStatus: paymentStatusMap[dto.paymentStatus] ?? 'pending',
    createdAt: dto.createdAt,
    updatedAt: dto.createdAt,
  }
}

export function mapCategoryResponseToCategory(dto: CategoryResponse): Category {
  return {
    id: String(dto.id),
    name: dto.name,
    slug: dto.slug,
    description: dto.description ?? '',
    image: dto.imageUrl,
    parentId: dto.parentId !== undefined ? String(dto.parentId) : undefined,
    isActive: dto.active,
    displayOrder: dto.sortOrder,
    productCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function buildCategoryHierarchy(categories: Category[]): CategoryHierarchy[] {
  const build = (parent: Category): CategoryHierarchy => {
    const children = categories
      .filter((c) => c.parentId === parent.id && c.isActive)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((child) => build(child))

    return {
      ...parent,
      children: children.length > 0 ? children : undefined,
    }
  }

  return categories
    .filter((c) => !c.parentId && c.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((parent) => build(parent))
}

const addressTypeToFrontend: Record<AddressResponse['type'], Address['type']> = {
  HOME: 'home',
  OFFICE: 'work',
  OTHER: 'other',
}

const addressTypeToBackend: Record<Address['type'], AddressResponse['type']> = {
  home: 'HOME',
  work: 'OFFICE',
  other: 'OTHER',
}

export function mapAddressResponseToAddress(dto: AddressResponse, userId = ''): Address {
  return {
    id: String(dto.id),
    userId,
    type: addressTypeToFrontend[dto.type],
    fullName: dto.fullName,
    phone: dto.phone,
    email: dto.email,
    addressLine1: dto.addressLine1,
    addressLine2: dto.addressLine2,
    city: dto.city,
    state: dto.state,
    zipCode: dto.postalCode,
    country: dto.country,
    isDefault: dto.isDefault,
    label: dto.label,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export function mapAddressToCreateRequest(
  address: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
) {
  return {
    type: addressTypeToBackend[address.type],
    fullName: address.fullName,
    phone: address.phone,
    email: address.email,
    addressLine1: address.addressLine1,
    addressLine2: address.addressLine2,
    city: address.city,
    state: address.state,
    postalCode: address.zipCode,
    country: address.country,
    label: address.label,
    isDefault: address.isDefault,
  }
}

export function mapAuthResponseToUser(dto: AuthResponse): User {
  return {
    id: String(dto.userId),
    email: dto.email,
    name: [dto.firstName, dto.lastName].filter(Boolean).join(' '),
  }
}

export function mapUserProfileResponseToUser(dto: UserProfileResponse): User {
  return {
    id: String(dto.id),
    email: dto.email,
    name: [dto.firstName, dto.lastName].filter(Boolean).join(' '),
    phone: dto.phone,
  }
}

export function mapDashboardResponseToStats(dto: AdminDashboardResponse): DashboardStats {
  return {
    totalRevenue: dto.totalRevenue,
    totalOrders: dto.totalOrders,
    totalCustomers: dto.totalCustomers,
    totalProducts: dto.totalProducts,
    averageOrderValue: dto.totalOrders > 0 ? dto.totalRevenue / dto.totalOrders : 0,
    conversionRate: 0,
    topProduct: {
      id: 0,
      name: '',
      sales: 0,
      revenue: 0,
    },
    revenueByMonth: [],
  }
}

export function mapFrontendStatusToBackend(status: AdminOrder['status']): OrderResponse['orderStatus'] {
  const map: Record<AdminOrder['status'], OrderResponse['orderStatus']> = {
    pending: 'PENDING',
    processing: 'PROCESSING',
    shipped: 'SHIPPED',
    delivered: 'DELIVERED',
    cancelled: 'CANCELLED',
  }
  return map[status]
}
