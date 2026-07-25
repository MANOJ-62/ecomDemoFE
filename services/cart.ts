import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, CartResponse } from './types/backend'

export async function getCart(): Promise<CartResponse> {
  const response = await api.get<ApiResponse<CartResponse>>('/cart')
  return unwrapApiResponse(response)
}

export async function addToCart(productId: number, quantity: number): Promise<CartResponse> {
  const response = await api.post<ApiResponse<CartResponse>>('/cart/items', {
    productId,
    quantity,
  })
  return unwrapApiResponse(response)
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number): Promise<CartResponse> {
  const response = await api.put<ApiResponse<CartResponse>>(`/cart/items/${cartItemId}`, {
    quantity,
  })
  return unwrapApiResponse(response)
}

export async function removeCartItem(cartItemId: number): Promise<CartResponse> {
  const response = await api.delete<ApiResponse<CartResponse>>(`/cart/items/${cartItemId}`)
  return unwrapApiResponse(response)
}

export async function clearCart(): Promise<void> {
  const response = await api.delete<ApiResponse<null>>('/cart')
  unwrapApiResponse(response)
}

export async function syncCartItems(items: Array<{ productId: number; quantity: number }>): Promise<void> {
  await clearCart()

  for (const item of items) {
    await addToCart(item.productId, item.quantity)
  }
}
