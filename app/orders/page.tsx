'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Package, Calendar, DollarSign, TrendingUp } from 'lucide-react'

export default function OrdersPage() {
  const orders = [
    {
      id: 'ORD-001',
      date: 'June 1, 2024',
      items: 2,
      total: '$84.88',
      status: 'Delivered',
      estimatedDelivery: 'Delivered on June 5, 2024',
    },
    {
      id: 'ORD-002',
      date: 'May 25, 2024',
      items: 1,
      total: '$56.99',
      status: 'Delivered',
      estimatedDelivery: 'Delivered on May 29, 2024',
    },
    {
      id: 'ORD-003',
      date: 'May 15, 2024',
      items: 3,
      total: '$124.50',
      status: 'Delivered',
      estimatedDelivery: 'Delivered on May 19, 2024',
    },
    {
      id: 'ORD-004',
      date: 'May 5, 2024',
      items: 1,
      total: '$42.99',
      status: 'Delivered',
      estimatedDelivery: 'Delivered on May 9, 2024',
    },
  ]

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Order History</h1>
            <p className="text-lg text-gray-600 mb-12">
              Track and manage all your orders in one place
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
                  </div>
                  <Package className="w-10 h-10 text-emerald-600 opacity-20" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">$309.36</p>
                  </div>
                  <DollarSign className="w-10 h-10 text-emerald-600 opacity-20" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Delivered</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">4/4</p>
                  </div>
                  <TrendingUp className="w-10 h-10 text-emerald-600 opacity-20" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Order</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">$77.34</p>
                  </div>
                  <Calendar className="w-10 h-10 text-emerald-600 opacity-20" />
                </div>
              </motion.div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-bold text-gray-900 text-lg">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="text-gray-900">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Items</p>
                      <p className="text-gray-900">{order.items} item{order.items > 1 ? 's' : ''}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold text-gray-900 text-lg">{order.total}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                        {order.status}
                      </span>
                      <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">{order.estimatedDelivery}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
