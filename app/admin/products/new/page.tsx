'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useCreateAdminProduct } from '@/hooks/useAdmin'
import { useState } from 'react'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewProductPage() {
  const router = useRouter()
  const createProduct = useCreateAdminProduct()
  const [formData, setFormData] = useState({
    name: '',
    category: 'Snacks',
    price: 0,
    stock: 0,
    rating: 4.5,
    reviews: 0,
    image: '/products/default.png',
    description: '',
    flavors: [] as string[],
    status: 'active',
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createProduct.mutateAsync(formData as any)
      router.push('/admin/products')
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-4"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              placeholder="Enter product name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            >
              <option value="Snacks">Snacks</option>
              <option value="Beverages">Beverages</option>
              <option value="Dairy">Dairy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => handleChange('price', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => handleChange('stock', parseInt(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              placeholder="Enter product description"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Flavors</label>
            <input
              type="text"
              value={formData.flavors.join(', ')}
              onChange={(e) => handleChange('flavors', e.target.value.split(',').map((flavor) => flavor.trim()).filter(Boolean))}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
              placeholder="e.g. Chocolate, Vanilla, Strawberry"
            />
            <p className="mt-1 text-xs text-gray-500">Separate each flavor with a comma. Leave empty for products without flavor options.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={createProduct.isPending}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save size={20} />
            {createProduct.isPending ? 'Creating...' : 'Create Product'}
          </button>
          <Link
            href="/admin/products"
            className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
        </div>
      </motion.form>
    </div>
  )
}
