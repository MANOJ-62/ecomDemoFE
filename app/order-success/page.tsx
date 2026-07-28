'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle size={64} className="text-emerald-600" />
              </div>
            </motion.div>

            {/* Main Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Order Confirmed!
              </h1>
              <p className="text-xl text-gray-600 mb-2">
                Thank you for your purchase
              </p>
              <p className="text-gray-600">
                Your order has been successfully placed and is being processed.
              </p>
            </motion.div>

            {/* Order ID */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200"
            >
              <p className="text-sm text-gray-600 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-emerald-600">
                ORD-{Date.now()}
              </p>
            </motion.div>

            {/* Delivery Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-4 my-8"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package className="text-emerald-600" size={24} />
                </div>
                <p className="font-semibold text-gray-900 text-sm">Processing</p>
                <p className="text-xs text-gray-600 mt-1">Today</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="text-gray-600" size={24} />
                </div>
                <p className="font-semibold text-gray-600 text-sm">Shipping</p>
                <p className="text-xs text-gray-600 mt-1">In progress</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Home className="text-gray-600" size={24} />
                </div>
                <p className="font-semibold text-gray-600 text-sm">Delivery</p>
                <p className="text-xs text-gray-600 mt-1">3-5 days</p>
              </div>
            </motion.div>

            {/* Information Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left"
            >
              <h3 className="font-semibold text-blue-900 mb-2">What Next?</h3>
              <ul className="space-y-2 text-blue-800 text-sm">
                <li>• Check your email for order confirmation and tracking details</li>
                <li>• Your order will be dispatched within 24 hours</li>
                <li>• You can track your shipment using the provided tracking number</li>
                <li>• For any questions, contact our support team</li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/shop" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
            </motion.div>

            {/* Contact Support */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-gray-600 text-sm"
            >
              Need help? Contact our support team at{' '}
              <a href="mailto:rakesh23sep2000@gmail.com" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                rakesh23sep2000@gmail.com
              </a>
            </motion.p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
