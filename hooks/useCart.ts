import { useState, useEffect } from 'react'
import { CartItem, Product } from '@/types'

const CART_STORAGE_KEY = 'ecommerce-cart'

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart from storage:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.productId === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevItems, { productId: product.id, product, quantity }]
    })
  }

  const removeItem = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
    } else {
      setItems(prevItems =>
        prevItems.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setItems([])
  }

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = parseFloat((subtotal * 0.1).toFixed(2))
  const shipping = items.length > 0 ? 5.0 : 0
  const total = parseFloat((subtotal + tax + shipping).toFixed(2))

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax,
    shipping,
    total,
    itemCount: items.length,
    isLoaded,
  }
}
