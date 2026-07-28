import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, OrderResponse } from './types/backend'
import { mapOrderResponseToOrder } from './mappers'
import { CartItem, Customer, Order } from '@/types'
import { createAddressFromCustomer } from './addresses'

export async function placeOrder(payload: {
  addressId: number
  paymentMethod: 'COD' | 'UPI' | 'CARD' | 'NET_BANKING'
  notes?: string
}): Promise<OrderResponse> {
  const response = await api.post<ApiResponse<OrderResponse>>('/orders', payload)
  return unwrapApiResponse(response)
}

export async function getMyOrders(): Promise<Order[]> {
  const response = await api.get<ApiResponse<OrderResponse[]>>('/orders')
  const orders = unwrapApiResponse(response)
  return orders.map(mapOrderResponseToOrder)
}

export async function getOrderById(orderId: number | string): Promise<Order | null> {
  try {
    const response = await api.get<ApiResponse<OrderResponse>>(`/orders/${orderId}`)
    return mapOrderResponseToOrder(unwrapApiResponse(response))
  } catch {
    return null
  }
}

export async function cancelOrder(orderId: number): Promise<void> {
  const response = await api.patch<ApiResponse<null>>(`/orders/${orderId}/cancel`)
  unwrapApiResponse(response)
}

export async function createOrder(
  items: CartItem[],
  customer: Customer,
  _subtotal: number,
  _tax: number,
  _shipping: number
): Promise<Order> {
  const address = await createAddressFromCustomer(customer)
  const orderResponse = await placeOrder({
    addressId: Number(address.id),
    paymentMethod: 'COD',
  })

  return mapOrderResponseToOrder(orderResponse)
}

export async function getOrder(orderId: string): Promise<Order | null> {
  return getOrderById(orderId)
}

export async function getOrderHistory(_email: string): Promise<Order[]> {
  return getMyOrders()
}

export async function getAdminOrdersList(): Promise<OrderResponse[]> {
  const response = await api.get<ApiResponse<OrderResponse[]>>('/admin/orders')
  return unwrapApiResponse(response)
}

export async function getAdminOrdersByStatus(status: OrderResponse['orderStatus']): Promise<OrderResponse[]> {
  const response = await api.get<ApiResponse<OrderResponse[]>>(`/admin/orders/status/${status}`)
  return unwrapApiResponse(response)
}

export async function updateAdminOrderStatus(
  orderId: number,
  orderStatus: OrderResponse['orderStatus']
): Promise<OrderResponse> {
  const response = await api.patch<ApiResponse<OrderResponse>>(`/admin/orders/${orderId}/status`, {
    orderStatus,
  })
  return unwrapApiResponse(response)
}
