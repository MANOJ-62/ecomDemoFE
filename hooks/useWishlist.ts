import { useCallback, useEffect, useSyncExternalStore } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { addWishlistProduct, getWishlist, removeWishlistProduct, syncWishlistProducts } from '@/services/wishlist'
import { getCurrentUser, isAuthenticated } from '@/services/auth'
import { WishlistResponse } from '@/services/types/backend'

const WISHLIST_STORAGE_KEY = 'ecommerce-wishlist'
const WISHLIST_QUERY_KEY = ['wishlist'] as const
const listeners = new Set<() => void>()
const EMPTY_WISHLIST: number[] = []
let guestWishlistCache = EMPTY_WISHLIST

function readGuestWishlist(): number[] {
  return guestWishlistCache
}

function writeGuestWishlist(productIds: number[]) {
  guestWishlistCache = productIds

  localStorage.setItem(
    WISHLIST_STORAGE_KEY,
    JSON.stringify(productIds)
  )

  listeners.forEach((listener) => listener())
}

function loadGuestWishlist() {
  if (typeof window === 'undefined') return

  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(WISHLIST_STORAGE_KEY) ?? '[]'
    )

    guestWishlistCache = Array.isArray(value)
      ? value.filter((id): id is number => typeof id === 'number')
      : EMPTY_WISHLIST
  } catch {
    guestWishlistCache = EMPTY_WISHLIST
  }
}

// function readGuestWishlist(): number[] {
//   if (typeof window === 'undefined') return []
//   try {
//     const value: unknown = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) ?? '[]')
//     return Array.isArray(value) ? value.filter((id): id is number => typeof id === 'number') : []
//   } catch {
//     return []
//   }
// }

// function writeGuestWishlist(productIds: number[]) {
//   localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds))
//   listeners.forEach((listener) => listener())
// }

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => event.key === WISHLIST_STORAGE_KEY && listener()
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export const useWishlist = () => {
  const queryClient = useQueryClient()
  const authenticated = typeof window !== 'undefined' && isAuthenticated()
  const guestProductIds = useSyncExternalStore(subscribe, readGuestWishlist, () => EMPTY_WISHLIST)
  const { data, isLoading } = useQuery({ queryKey: WISHLIST_QUERY_KEY, queryFn: getWishlist, enabled: authenticated })
  const productIds = authenticated ? data?.productIds ?? [] : guestProductIds

  useEffect(() => {
    if (!authenticated || !data) return
    const userId = getCurrentUser()?.id
    const migrationKey = userId ? `${WISHLIST_STORAGE_KEY}-migrated-${userId}` : ''
    const guestIds = readGuestWishlist()
    if (!migrationKey || !guestIds.length || localStorage.getItem(migrationKey)) return

    localStorage.setItem(migrationKey, 'true')
    const mergedIds = [...new Set([...data.productIds, ...guestIds])]
    syncWishlistProducts(mergedIds)
      .then((wishlist) => {
        queryClient.setQueryData(WISHLIST_QUERY_KEY, wishlist)
        localStorage.removeItem(WISHLIST_STORAGE_KEY)
        listeners.forEach((listener) => listener())
      })
      .catch(() => localStorage.removeItem(migrationKey))
  }, [authenticated, data, queryClient])

  const updateServerWishlist = useCallback(async (productId: number, add: boolean) => {
    const previous = queryClient.getQueryData<WishlistResponse>(WISHLIST_QUERY_KEY)
    const currentIds = previous?.productIds ?? []
    const nextIds = add ? [...new Set([...currentIds, productId])] : currentIds.filter((id) => id !== productId)
    queryClient.setQueryData<WishlistResponse>(WISHLIST_QUERY_KEY, { wishlistId: previous?.wishlistId ?? 0, productIds: nextIds })
    try {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, add ? await addWishlistProduct(productId) : await removeWishlistProduct(productId))
    } catch (error) {
      queryClient.setQueryData(WISHLIST_QUERY_KEY, previous)
      throw error
    }
  }, [queryClient])

  const addToWishlist = useCallback(async (productId: number) => {
    if (authenticated) return updateServerWishlist(productId, true)
    const current = readGuestWishlist()
    if (!current.includes(productId)) writeGuestWishlist([...current, productId])
  }, [authenticated, updateServerWishlist])

  const removeFromWishlist = useCallback(async (productId: number) => {
    if (authenticated) return updateServerWishlist(productId, false)
    writeGuestWishlist(readGuestWishlist().filter((id) => id !== productId))
  }, [authenticated, updateServerWishlist])

  const toggleWishlist = useCallback(async (productId: number) => {
    if (productIds.includes(productId)) return removeFromWishlist(productId)
    return addToWishlist(productId)
  }, [addToWishlist, productIds, removeFromWishlist])

  return {
    productIds,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist: (productId: number) => productIds.includes(productId),
    isLoaded: authenticated ? !isLoading : true,
  }
}
