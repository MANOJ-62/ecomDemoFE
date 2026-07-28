import { useState, useEffect } from 'react'

const WISHLIST_STORAGE_KEY = 'ecommerce-wishlist'

export const useWishlist = () => {
  const [productIds, setProductIds] = useState<number[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY)
    if (saved) {
      try {
        setProductIds(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse wishlist from storage:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(productIds))
    }
  }, [productIds, isLoaded])

  const addToWishlist = (productId: number) => {
    setProductIds(prev =>
      prev.includes(productId) ? prev : [...prev, productId]
    )
  }

  const removeFromWishlist = (productId: number) => {
    setProductIds(prev => prev.filter(id => id !== productId))
  }

  const toggleWishlist = (productId: number) => {
    if (productIds.includes(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  const isInWishlist = (productId: number) => {
    return productIds.includes(productId)
  }

  return {
    productIds,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    isLoaded,
  }
}
