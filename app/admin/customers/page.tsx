'use client'

import { motion } from 'framer-motion'
import { useAdminCustomers, useUpdateAdminCustomer } from '@/hooks/useAdmin'
import { useState } from 'react'
import Link from 'next/link'
import { Eye, Mail, Phone } from 'lucide-react'

export default function AdminCustomersPage() {
  const [page, setPage] = useState(1)
  const { data, isLoading } = useAdminCustomers(page)
  const updateCustomer = useUpdateAdminCustomer()

  const customers = data?.data || []
  const total = data?.total || 0

  const toggleCustomerStatus = (customerId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    updateCustomer.mutate({
      id: customerId,
      updates: { status: newStatus as any },
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">View and manage customer accounts</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium opacity-90">Total Customers</p>
          <p className="text-3xl font-bold mt-2">{total}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium opacity-90">Active Customers</p>
          <p className="text-3xl font-bold mt-2">{customers.filter(c => c.status === 'active').length}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white p-6 rounded-lg shadow">
          <p className="text-sm font-medium opacity-90">Inactive Customers</p>
          <p className="text-3xl font-bold mt-2">{customers.filter(c => c.status === 'inactive').length}</p>
        </div>
      </motion.div>

      {/* Customers Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading customers...</p>
            </div>
          </div>
        ) : customers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No customers found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Orders</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total Spent</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Joined</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} />
                        {customer.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-purple-600">{customer.totalOrders}</td>
                    <td className="px-6 py-4 font-semibold text-green-600">${customer.totalSpent.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleCustomerStatus(customer.id, customer.status)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all cursor-pointer ${
                          customer.status === 'active'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {customer.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(customer.joinedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                      >
                        <Eye size={18} />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing page {page} (Total: {total} customers)
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page * 10 >= total}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
