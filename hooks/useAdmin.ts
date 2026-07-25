import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getDashboardStats,
  getAdminProducts,
  getAdminProductById,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
  getAdminOrders,
  getAdminOrderById,
  updateAdminOrder,
  getAdminCustomers,
  getAdminCustomerById,
  updateAdminCustomer,
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
  getActivityLogs,
} from '@/services/admin'
import { AdminProduct, AdminOrder, AdminCustomer, AdminUser, ActivityLog } from '@/types/admin'

// Dashboard
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    staleTime: 60000, // 1 minute
  })
}

// Products
export const useAdminProducts = (page: number = 1) => {
  return useQuery({
    queryKey: ['admin', 'products', page],
    queryFn: () => getAdminProducts(page),
  })
}

export const useAdminProductById = (id: number) => {
  return useQuery({
    queryKey: ['admin', 'product', id],
    queryFn: () => getAdminProductById(id),
    enabled: !!id,
  })
}

export const useCreateAdminProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>) => createAdminProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] })
    },
  })
}

export const useUpdateAdminProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<AdminProduct> }) => updateAdminProduct(id, updates),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'products'] })
        queryClient.invalidateQueries({ queryKey: ['admin', 'product', data.id] })
      }
    },
  })
}

export const useDeleteAdminProduct = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => deleteAdminProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] })
    },
  })
}

// Orders
export const useAdminOrders = (page: number = 1, status?: string) => {
  return useQuery({
    queryKey: ['admin', 'orders', page, status],
    queryFn: () => getAdminOrders(page, 10, status),
  })
}

export const useAdminOrderById = (id: string) => {
  return useQuery({
    queryKey: ['admin', 'order', id],
    queryFn: () => getAdminOrderById(id),
    enabled: !!id,
  })
}

export const useUpdateAdminOrder = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AdminOrder> }) => updateAdminOrder(id, updates),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'orders'] })
        queryClient.invalidateQueries({ queryKey: ['admin', 'order', data.id] })
      }
    },
  })
}

// Customers
export const useAdminCustomers = (page: number = 1) => {
  return useQuery({
    queryKey: ['admin', 'customers', page],
    queryFn: () => getAdminCustomers(page),
  })
}

export const useAdminCustomerById = (id: string) => {
  return useQuery({
    queryKey: ['admin', 'customer', id],
    queryFn: () => getAdminCustomerById(id),
    enabled: !!id,
  })
}

export const useUpdateAdminCustomer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AdminCustomer> }) => updateAdminCustomer(id, updates),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'customers'] })
        queryClient.invalidateQueries({ queryKey: ['admin', 'customer', data.id] })
      }
    },
  })
}

// Admin Users
export const useAdminUsers = (page: number = 1) => {
  return useQuery({
    queryKey: ['admin', 'users', page],
    queryFn: () => getAdminUsers(page),
  })
}

export const useCreateAdminUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<AdminUser, 'id' | 'createdAt'>) => createAdminUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
  })
}

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AdminUser> }) => updateAdminUser(id, updates),
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      }
    },
  })
}

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAdminUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
    },
  })
}

// Activity Logs
export const useActivityLogs = (page: number = 1) => {
  return useQuery({
    queryKey: ['admin', 'logs', page],
    queryFn: () => getActivityLogs(page),
    staleTime: 30000,
  })
}
