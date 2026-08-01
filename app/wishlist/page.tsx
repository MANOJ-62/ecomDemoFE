'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductGrid } from '@/components/ProductGrid'
import { useWishlist } from '@/hooks/useWishlist'
import { useProducts } from '@/hooks/useProducts'
import { Heart, ArrowLeft } from 'lucide-react'

export default function WishlistPage() {
  const { productIds } = useWishlist()
  const { data: allProducts = [], isLoading } = useProducts()

  // Filter products that are in wishlist
  const wishlistProducts = allProducts.filter(p => productIds.includes(p.id))

  return (
    <div className="min-h-screen bg-[#fffcf7] flex flex-col">
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
              Back to Shop
            </Link>
            <h1 className="page-title flex items-center gap-3">
              <Heart size={32} className="text-red-500 fill-red-500" />
              My Wishlist
            </h1>
          </motion.div>

          {wishlistProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Heart size={64} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
              <p className="text-gray-600 mb-6">
                Add products to your wishlist to save them for later
              </p>
              <Link href="/shop" className="btn-primary inline-block">
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-600 mb-6">
                You have {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved
              </p>
              <ProductGrid products={wishlistProducts} isLoading={isLoading} />
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
