import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CartItem, Product } from '@/types'
import { addToCart, clearCart as clearBackendCart, getCart, removeCartItem, updateCartItemQuantity } from '@/services/cart'
import { isAuthenticated } from '@/services/auth'
import { CartItemResponse, CartResponse } from '@/services/types/backend'

const CART_QUERY_KEY = ['cart'] as const

function toCartItem(item: CartItemResponse): CartItem {
  return {
    cartItemId: item.cartItemId,
    productId: item.productId,
    quantity: item.quantity,
    flavor: item.flavor,
    product: {
      id: item.productId,
      name: item.productName,
      description: '',
      price: item.price,
      rating: 0,
      reviews: 0,
      image: item.thumbnailUrl ?? '',
      category: '',
      stock: 0,
      benefits: [],
      ingredients: [],
    },
  }
}

export const useCart = () => {
  const queryClient = useQueryClient()
  const authenticated = typeof window !== 'undefined' && isAuthenticated()
  const { data, isLoading } = useQuery({
    queryKey: CART_QUERY_KEY,
    queryFn: getCart,
    enabled: authenticated,
  })
  const items = (data?.items ?? []).map(toCartItem)
  const refresh = (cart: CartResponse) => queryClient.setQueryData(CART_QUERY_KEY, cart)

  const addItem = async (product: Product, quantity = 1, flavor?: string) => {
    refresh(await addToCart(product.id, quantity, flavor))
  }
  const updateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity <= 0) return removeItem(cartItemId)
    refresh(await updateCartItemQuantity(cartItemId, quantity))
  }
  const removeItem = async (cartItemId: number) => refresh(await removeCartItem(cartItemId))
  const clearCart = async () => {
    await clearBackendCart()
    queryClient.setQueryData<CartResponse>(CART_QUERY_KEY, (current) => current ? { ...current, items: [], totalItems: 0, totalAmount: 0 } : current)
  }
  const subtotal = data?.totalAmount ?? 0

  return { items, addItem, removeItem, updateQuantity, clearCart, subtotal, tax: 0, shipping: 0,
    total: subtotal, itemCount: data?.totalItems ?? 0, isLoaded: !isLoading, isAuthenticated: authenticated }
}
