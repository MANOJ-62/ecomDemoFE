import {
  AdminProduct,
  AdminOrder,
  AdminCustomer,
  DashboardStats,
  AdminUser,
  ActivityLog,
} from '@/types/admin'
import { ApiNotAvailableError } from './errors'
import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, AdminDashboardResponse, OrderResponse, ProductResponse } from './types/backend'
import {
  mapDashboardResponseToStats,
  mapOrderResponseToAdminOrder,
  mapProductResponseToAdminProduct,
  mapAdminProductToCreateRequest,
  mapAdminProductToUpdateRequest,
  mapFrontendStatusToBackend,
} from './mappers'
import {
  createProductRequest,
  deleteProductById,
  getProductResponseById,
  getProductsPage,
  updateProductRequest,
} from './products'
import { getAdminOrdersByStatus, getAdminOrdersList, updateAdminOrderStatus } from './orders'
import { getCategories } from './categories'

async function resolveCategoryId(categoryName: string): Promise<number> {
  const categories = await getCategories(true)
  const category = categories.find((item) => item.name === categoryName)
  if (!category) {
    throw new Error(`Category not found: ${categoryName}`)
  }
  return Number(category.id)
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get<ApiResponse<AdminDashboardResponse>>('/admin/dashboard')
  return mapDashboardResponseToStats(unwrapApiResponse(response))
}

export const getAdminProducts = async (
  page: number = 1,
  limit: number = 10
): Promise<{ data: AdminProduct[]; total: number }> => {
  const result = await getProductsPage({ page: page - 1, size: limit })
  return {
    data: result.data.map((product) => ({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
      reviews: product.reviews,
      image: product.image,
      description: product.description,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })),
    total: result.total,
  }
}

export const getAdminProductById = async (id: number): Promise<AdminProduct | null> => {
  try {
    const product = await getProductResponseById(id)
    return mapProductResponseToAdminProduct(product)
  } catch {
    return null
  }
}

export const createAdminProduct = async (
  product: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>
): Promise<AdminProduct> => {
  const categoryId = await resolveCategoryId(product.category)
  const payload = mapAdminProductToCreateRequest(product, categoryId)
  const created = await createProductRequest(payload)
  return mapProductResponseToAdminProduct(created)
}

export const updateAdminProduct = async (
  id: number,
  updates: Partial<AdminProduct>
): Promise<AdminProduct | null> => {
  const categoryId = updates.category ? await resolveCategoryId(updates.category) : undefined
  const payload = mapAdminProductToUpdateRequest(updates, categoryId)
  const updated = await updateProductRequest(id, payload)
  return mapProductResponseToAdminProduct(updated)
}

export const deleteAdminProduct = async (id: number): Promise<boolean> => {
  await deleteProductById(id)
  return true
}

export const getAdminOrders = async (
  page: number = 1,
  limit: number = 10,
  status?: string
): Promise<{ data: AdminOrder[]; total: number }> => {
  let orders: OrderResponse[]

  if (status) {
    const backendStatus = mapFrontendStatusToBackend(status as AdminOrder['status'])
    orders = await getAdminOrdersByStatus(backendStatus)
  } else {
    orders = await getAdminOrdersList()
  }

  const start = (page - 1) * limit
  const end = start + limit

  return {
    data: orders.slice(start, end).map(mapOrderResponseToAdminOrder),
    total: orders.length,
  }
}

export const getAdminOrderById = async (id: string): Promise<AdminOrder | null> => {
  try {
    const response = await api.get<ApiResponse<OrderResponse>>(`/orders/${id}`)
    return mapOrderResponseToAdminOrder(unwrapApiResponse(response))
  } catch {
    return null
  }
}

export const updateAdminOrder = async (
  id: string,
  updates: Partial<AdminOrder>
): Promise<AdminOrder | null> => {
  if (!updates.status) {
    throw new Error('Only order status updates are supported by the backend')
  }

  const updated = await updateAdminOrderStatus(Number(id), mapFrontendStatusToBackend(updates.status))
  return mapOrderResponseToAdminOrder(updated)
}

export const getAdminCustomers = async (_page: number = 1, _limit: number = 10): Promise<{ data: AdminCustomer[]; total: number }> => {
  throw new ApiNotAvailableError('GET /api/admin/customers')
}

export const getAdminCustomerById = async (_id: string): Promise<AdminCustomer | null> => {
  throw new ApiNotAvailableError('GET /api/admin/customers/{id}')
}

export const updateAdminCustomer = async (
  _id: string,
  _updates: Partial<AdminCustomer>
): Promise<AdminCustomer | null> => {
  throw new ApiNotAvailableError('PUT /api/admin/customers/{id}')
}

export const getAdminUsers = async (_page: number = 1, _limit: number = 10): Promise<{ data: AdminUser[]; total: number }> => {
  throw new ApiNotAvailableError('GET /api/admin/users')
}

export const createAdminUser = async (_user: Omit<AdminUser, 'id' | 'createdAt'>): Promise<AdminUser> => {
  throw new ApiNotAvailableError('POST /api/admin/users')
}

export const updateAdminUser = async (_id: string, _updates: Partial<AdminUser>): Promise<AdminUser | null> => {
  throw new ApiNotAvailableError('PUT /api/admin/users/{id}')
}

export const deleteAdminUser = async (_id: string): Promise<boolean> => {
  throw new ApiNotAvailableError('DELETE /api/admin/users/{id}')
}

export const getActivityLogs = async (_page: number = 1, _limit: number = 20): Promise<{ data: ActivityLog[]; total: number }> => {
  throw new ApiNotAvailableError('GET /api/admin/activity-logs')
}
