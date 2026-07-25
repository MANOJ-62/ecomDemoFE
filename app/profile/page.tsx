'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { User, Mail, Phone, MapPin, Edit2 } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const userProfile = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    joinedDate: 'March 2024',
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Profile Header */}
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {userProfile.firstName} {userProfile.lastName}
                </h1>
                <p className="text-gray-600">Member since {userProfile.joinedDate}</p>
              </div>
            </div>

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 space-y-6"
              >
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                    <button className="flex items-center gap-2 btn-secondary">
                      <Edit2 size={18} />
                      Edit
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-semibold text-gray-600">First Name</label>
                        <p className="text-lg text-gray-900 mt-1">{userProfile.firstName}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Last Name</label>
                        <p className="text-lg text-gray-900 mt-1">{userProfile.lastName}</p>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <Mail size={16} />
                        Email Address
                      </label>
                      <p className="text-lg text-gray-900 mt-1">{userProfile.email}</p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <Phone size={16} />
                        Phone Number
                      </label>
                      <p className="text-lg text-gray-900 mt-1">{userProfile.phone}</p>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                        <MapPin size={16} />
                        Address
                      </label>
                      <p className="text-lg text-gray-900 mt-1">
                        {userProfile.address}, {userProfile.city}, {userProfile.state} {userProfile.zipCode}
                      </p>
                      <p className="text-gray-600">{userProfile.country}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-gray-50 rounded-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                    <Link href="/orders" className="text-emerald-600 font-semibold hover:text-emerald-700">
                      View All
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'ORD-001', date: 'June 1, 2024', status: 'Delivered', amount: '$84.88' },
                      { id: 'ORD-002', date: 'May 25, 2024', status: 'Delivered', amount: '$56.99' },
                      { id: 'ORD-003', date: 'May 15, 2024', status: 'Delivered', amount: '$124.50' },
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                        <div>
                          <p className="font-semibold text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                            {order.status}
                          </span>
                          <p className="font-semibold text-gray-900">{order.amount}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Account Settings */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Account Settings</h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      Change Password
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      Email Preferences
                    </button>
                    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      Notification Settings
                    </button>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Support</h3>
                  <div className="space-y-3">
                    <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      Contact Us
                    </Link>
                    <Link href="/returns" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      Returns & Refunds
                    </Link>
                    <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold">
                      Logout
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
