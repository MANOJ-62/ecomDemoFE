import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, WishlistResponse } from './types/backend'

export async function getWishlist(): Promise<WishlistResponse> {
  return unwrapApiResponse(await api.get<ApiResponse<WishlistResponse>>('/wishlist'))
}

export async function addWishlistProduct(productId: number): Promise<WishlistResponse> {
  return unwrapApiResponse(await api.post<ApiResponse<WishlistResponse>>('/wishlist/items', { productId }))
}

export async function removeWishlistProduct(productId: number): Promise<WishlistResponse> {
  return unwrapApiResponse(await api.delete<ApiResponse<WishlistResponse>>(`/wishlist/items/${productId}`))
}

export async function syncWishlistProducts(productIds: number[]): Promise<WishlistResponse> {
  return unwrapApiResponse(await api.put<ApiResponse<WishlistResponse>>('/wishlist', { productIds }))
}
