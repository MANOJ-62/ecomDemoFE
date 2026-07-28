'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { getShopCategories } from '@/services/categories'
import { ApiResponse } from '@/services/types/backend'
import { Product } from '@/types'
import api, { unwrapApiResponse } from '@/services/apiClient'
import { getProductsPage } from '@/services/products'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [categories, setCategories] = useState<string[]>(['All Products'])
  const [priceRange, setPriceRange] = useState<number[]>([])
  const [minRating, setMinRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    getShopCategories()
      .then(setCategories)
      .catch(() => setCategories(['All Products']))
  }, [])

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [selectedCategory])

  const loadProducts = async () => {
    try {
      setLoading(true)
  
      let categoryId: number | undefined
  
      if (selectedCategory !== 'All Products') {
        const response = await api.get<
          ApiResponse<Array<{ id: number; name: string }>>
        >('/categories')
  
        const categories = unwrapApiResponse(response)
  
        categoryId = categories.find(
          c => c.name === selectedCategory
        )?.id
      }
  
      const result = await getProductsPage({
        page: 0,
        size: 100,
        categoryId,
      })
  
      setProducts(result.data)
    } finally {
      setLoading(false)
    }
  }
  
  // // Filter products
  // const filteredProducts = products
  //   .filter(p => {
  //     if (priceRange.length > 0) {
  //       const price = p.price
  //       return priceRange.some(range => {
  //         if (range === 0) return price <= 25
  //         if (range === 1) return price > 25 && price <= 50
  //         if (range === 2) return price > 50
  //         return true
  //       })
  //     }
  //     return true
  //   })
  //   .filter(p => {
  //     if (minRating !== null) return p.rating >= minRating
  //     return true
  //   })
  //   .sort((a, b) => {
  //     if (sortBy === 'newest') return 0
  //     if (sortBy === 'price-low') return a.price - b.price
  //     if (sortBy === 'price-high') return b.price - a.price
  //     if (sortBy === 'rating') return b.rating - a.rating
  //     return 0
  //   })
  const displayedProducts = [...products].sort((a, b) => {
    if (sortBy === 'newest') return 0
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  const togglePriceRange = (range: number) => {
    setPriceRange(prev =>
      prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]
    )
  }

  const toggleRating = (rating: number) => {
    setMinRating(minRating === rating ? null : rating)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Shop All Snacks
            </h1>
            <p className="text-lg text-gray-700 font-medium">
              Browse our delicious collection of snacks and treats from your favorite brands
            </p>
          </motion.div>
        </section>

        {/* Filters and Products */}
        <section className="container-custom pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-gray-900">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-white text-gray-700 hover:bg-purple-50 border border-purple-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Price Filter */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-8 pt-8 border-t-2 border-purple-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: '$0 - $5', value: 0 },
                    { label: '$5 - $10', value: 1 },
                    { label: '$10+', value: 2 },
                  ].map(({ label, value }) => (
                    <label key={value} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={priceRange.includes(value)}
                        onChange={() => togglePriceRange(value)}
                        className="w-4 h-4 rounded accent-purple-600 cursor-pointer"
                      />
                      <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Rating Filter */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-8 pt-8 border-t-2 border-purple-200"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Rating</h3>
                <div className="space-y-3 text-sm">
                  {[5, 4, 3].map((stars) => (
                    <label
                      key={stars}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={minRating === stars}
                        onChange={() => toggleRating(stars)}
                        className="w-4 h-4 accent-purple-600 cursor-pointer"
                      />
                      <span className="text-gray-700 group-hover:text-purple-600 transition-colors">
                        {stars}+ Stars
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Clear Filters */}
              {(selectedCategory !== 'All Products' || priceRange.length > 0 || minRating) && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => {
                    setSelectedCategory('All Products')
                    setPriceRange([])
                    setMinRating(null)
                  }}
                  className="w-full mt-8 px-4 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                >
                  Clear Filters
                </motion.button>
              )}
            </aside>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <p className="text-gray-700 font-medium">
                    Showing {displayedProducts.length} of {products.length} products
                  </p>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-300 font-medium bg-white text-gray-900 cursor-pointer"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                <ProductGrid products={displayedProducts} isLoading={loading} />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
