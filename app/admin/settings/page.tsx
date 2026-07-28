'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Save, AlertCircle } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    storeName: 'FoodZone',
    storeEmail: 'support@foodzone.com',
    storePhone: '+1-555-FOODZONE',
    currency: 'USD',
    taxRate: 8.5,
    shippingCost: 5.99,
    maintenanceMode: false,
  })

  const [saved, setSaved] = useState(false)

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  const handleSave = () => {
    // In real app, this would be an API call
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage store configuration and preferences</p>
      </motion.div>

      {/* Alerts */}
      {settings.maintenanceMode && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900">Maintenance Mode Enabled</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Your store is currently in maintenance mode. Customers cannot access the store.
            </p>
          </div>
        </motion.div>
      )}

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border-2 border-green-200 rounded-lg p-4 flex items-start gap-3"
        >
          <AlertCircle className="text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-green-900">Settings Saved</h3>
            <p className="text-sm text-green-700 mt-1">Your changes have been saved successfully.</p>
          </div>
        </motion.div>
      )}

      {/* Store Info Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Store Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
            <input
              type="text"
              value={settings.storeName}
              onChange={(e) => handleChange('storeName', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Store Email</label>
            <input
              type="email"
              value={settings.storeEmail}
              onChange={(e) => handleChange('storeEmail', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Store Phone</label>
            <input
              type="tel"
              value={settings.storePhone}
              onChange={(e) => handleChange('storePhone', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>
      </motion.div>

      {/* Business Settings Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Business Settings</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Rate (%)</label>
              <input
                type="number"
                step="0.1"
                value={settings.taxRate}
                onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Cost (₹)</label>
            <input
              type="number"
              step="0.01"
              value={settings.shippingCost}
              onChange={(e) => handleChange('shippingCost', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>
      </motion.div>

      {/* Maintenance Mode Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Maintenance</h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
              className="w-5 h-5 accent-emerald-600 cursor-pointer"
            />
            <div>
              <p className="font-semibold text-gray-900">Enable Maintenance Mode</p>
              <p className="text-sm text-gray-600">Temporarily disable customer access to the store</p>
            </div>
          </label>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={handleSave}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-amber-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
      >
        <Save size={20} />
        Save Settings
      </motion.button>
    </div>
  )
}
