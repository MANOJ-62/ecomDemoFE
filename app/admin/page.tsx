'use client'

import { motion } from 'framer-motion'
import { useDashboardStats } from '@/hooks/useAdmin'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Package, Users, ShoppingCart, DollarSign } from 'lucide-react'
import Link from 'next/link'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export default function AdminDashboard() {
  const { data: stats, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No data available</p>
      </div>
    )
  }

  const COLORS = ['#9333EA', '#DB2777', '#F97316', '#FACC15', '#3B82F6']

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's your store overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {[
          {
            label: 'Total Revenue',
            value: `$${stats.totalRevenue.toFixed(2)}`,
            icon: DollarSign,
            color: 'from-purple-600 to-pink-600',
          },
          {
            label: 'Total Orders',
            value: stats.totalOrders.toString(),
            icon: ShoppingCart,
            color: 'from-pink-600 to-orange-600',
          },
          {
            label: 'Total Customers',
            value: stats.totalCustomers.toString(),
            icon: Users,
            color: 'from-orange-600 to-yellow-600',
          },
          {
            label: 'Total Products',
            value: stats.totalProducts.toString(),
            icon: Package,
            color: 'from-blue-600 to-purple-600',
          },
          {
            label: 'Avg Order Value',
            value: `$${stats.averageOrderValue.toFixed(2)}`,
            icon: TrendingUp,
            color: 'from-green-600 to-teal-600',
          },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              variants={item}
              className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium opacity-90">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <Icon size={40} className="opacity-20" />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.revenueByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value) => `$${value}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#9333EA"
                strokeWidth={2}
                dot={{ fill: '#9333EA', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Product */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow p-6 border border-purple-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Selling Product</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Product</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{stats.topProduct.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Sales</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{stats.topProduct.sales}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Revenue</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">${stats.topProduct.revenue.toFixed(2)}</p>
            </div>
            <Link
              href="/admin/products"
              className="mt-4 block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
            >
              View All Products
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Orders and Customers by Month */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Orders by Month</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="orders" fill="#9333EA" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Link
          href="/admin/products/new"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <Package size={24} className="mb-2" />
          <h3 className="font-bold text-lg">Add New Product</h3>
          <p className="text-sm opacity-90">Create a new product listing</p>
        </Link>
        <Link
          href="/admin/orders"
          className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <ShoppingCart size={24} className="mb-2" />
          <h3 className="font-bold text-lg">View Orders</h3>
          <p className="text-sm opacity-90">Manage pending orders</p>
        </Link>
        <Link
          href="/admin/customers"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          <Users size={24} className="mb-2" />
          <h3 className="font-bold text-lg">Customers</h3>
          <p className="text-sm opacity-90">View customer list</p>
        </Link>
      </motion.div>
    </div>
  )
}
