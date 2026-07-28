'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Trash2, ShoppingCart } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export const CartDrawer = () => {
  const { items, removeItem, updateQuantity, subtotal, tax, shipping, total, itemCount } = useCart()

  if (!items.length) {
    return (
      <div className="text-center py-12">
        <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
        <p className="text-gray-600">Your cart is empty</p>
        <Link href="/shop" className="btn-primary inline-block mt-4">
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Items */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <motion.div
            key={item.cartItemId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex gap-3 p-3 bg-gray-50 rounded-lg"
          >
            {/* Image placeholder */}
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-50 to-teal-50 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-gray-400 text-center px-1">
                {item.product.name}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 line-clamp-1">
                {item.product.name}
              </h4>
              {item.flavor && <p className="text-xs text-gray-500">Flavor: {item.flavor}</p>}
              <p className="text-xs text-gray-600">${item.product.price.toFixed(2)}</p>

              {/* Quantity Control */}
              <div className="flex items-center gap-2 mt-1">
                <button
                  onClick={() => item.cartItemId && updateQuantity(item.cartItemId, item.quantity - 1)}
                  className="px-2 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xs font-semibold w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => item.cartItemId && updateQuantity(item.cartItemId, item.quantity + 1)}
                  className="px-2 py-1 bg-white border border-gray-300 rounded text-xs hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Remove */}
            <button
              onClick={() => item.cartItemId && removeItem(item.cartItemId)}
              className="text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 pt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-semibold">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold">${shipping.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link href="/checkout" className="btn-primary block w-full text-center">
        Checkout
      </Link>
      <Link href="/shop" className="btn-secondary block w-full text-center">
        Continue Shopping
      </Link>
    </div>
  )
}
