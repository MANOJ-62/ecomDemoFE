'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckoutForm, CheckoutFormData } from '@/components/CheckoutForm'
import { useCart } from '@/hooks/useCart'
import { createOrder } from '@/services/api'
import { Loader, ShoppingCart } from 'lucide-react'
import { isAuthenticated } from '@/services/auth'
import { initializeRazorpay } from '@/services/payment'
import { createPaymentIntent, verifyPayment } from '@/services/payment'
import { openRazorpayCheckout } from '@/services/utils/openRazorpay'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, tax, shipping, total, clearCart, addItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [restoringPendingCart, setRestoringPendingCart] = useState(true)

  useEffect(() => {
    if (!isAuthenticated()) router.replace('/login?next=%2Fcheckout')
  }, [router])

  useEffect(() => {
    const pending = sessionStorage.getItem('pending-cart-item')
    if (!pending || !isAuthenticated()) {
      setRestoringPendingCart(false)
      return
    }
    try {
      const { product, quantity, flavor } = JSON.parse(pending)
      sessionStorage.removeItem('pending-cart-item')
      addItem(product, quantity, flavor).catch(() => setError('Unable to add the selected item to your cart.')).finally(() => setRestoringPendingCart(false))
    } catch {
      sessionStorage.removeItem('pending-cart-item')
      setRestoringPendingCart(false)
    }
  }, [addItem])

  if (restoringPendingCart) {
    return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin text-emerald-600" /></div>
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 container-custom py-16 text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add products before checking out</p>
          <a href="/shop" className="btn-primary inline-block">
            Continue Shopping
          </a>
        </main>
        <Footer />
      </div>
    )
  }

  const handleSubmit = async (data: CheckoutFormData) => {
    try {
      setIsLoading(true)
      setError(null)

      // Create order on backend
      const order = await createOrder(
        items,
        data,
        subtotal,
        tax,
        shipping,
        data.paymentMethod
      )

      if (data.paymentMethod === 'UPI') {
        await initializeRazorpay()

        const paymentIntent = await createPaymentIntent(
          String(order.orderDbId)
        )

        const razorpayResult = await openRazorpayCheckout({
          gatewayKey: paymentIntent.gatewayKey,
          gatewayOrderId: paymentIntent.gatewayOrderId,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          companyName: 'Divaksha',
          description: `Order ${order.id} Payment`,
        })

        const verification = await verifyPayment({
          orderId: order.orderDbId,
          gatewayOrderId: razorpayResult.razorpay_order_id,
          gatewayPaymentId: razorpayResult.razorpay_payment_id,
          gatewaySignature: razorpayResult.razorpay_signature,
        })

        if (!verification.success) {
          throw new Error('Payment verification failed.')
        }

        await clearCart()
        router.push('/order-success')
        return
      }

      // Clear cart for COD
      await clearCart()
      router.push('/order-success')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to place order. Please try again.'
      )
      console.error('Checkout error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-12"
          >
            Checkout
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                  >
                    {error}
                  </motion.div>
                )}
                <CheckoutForm onSubmit={handleSubmit} isLoading={isLoading} />
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-20">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-300">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <div>
                        <p className="font-medium text-gray-900">{item.product.name}</p>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg text-center text-sm text-green-700">
                  ✓ Secure checkout powered by trusted payment processor
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
