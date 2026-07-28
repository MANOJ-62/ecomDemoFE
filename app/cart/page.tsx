'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useCart } from '@/hooks/useCart'
import { Trash2, ArrowLeft, ShoppingCart } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, tax, shipping, total } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 container-custom py-16 text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
          <Link href="/shop" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/shop" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4">
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>
            <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                className="space-y-4"
              >
                {items.map((item) => (
                  <motion.div
                    key={item.cartItemId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    {/* Image placeholder */}
                    <div className="w-24 h-24 bg-gradient-to-br from-emerald-50 to-teal-50 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-gray-400 text-center px-2">
                        {item.product.name}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        ${item.product.price.toFixed(2)} each
                      </p>
                      {item.flavor && <p className="text-sm text-gray-500 mb-2">Flavor: {item.flavor}</p>}

                      {/* Quantity Control */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => item.cartItemId && updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-semibold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold min-w-10 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => item.cartItemId && updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="text-right">
                      <p className="font-bold text-gray-900 mb-2">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => item.cartItemId && removeItem(item.cartItemId)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? 'text-emerald-600 font-semibold' : ''}>
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary block w-full text-center mb-3">
                  Proceed to Checkout
                </Link>
                <Link href="/shop" className="btn-secondary block w-full text-center">
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
