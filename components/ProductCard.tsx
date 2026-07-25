'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Star, ShoppingCart } from 'lucide-react'
import { Product } from '@/types'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addItem } = useCart()
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product, 1)
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/product/${product.id}`}>
        <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-emerald-400 transition-all duration-300 hover:shadow-lg">
          {/* Image Container */}
          <div className="relative h-64 bg-gray-100 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-gray-400 text-center px-4">
                {product.name}
              </span>
            </div>

            {/* Category Badge */}
            <div className="absolute top-3 left-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.category}
            </div>

            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault()
                toggleWishlist(product.id)
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
            >
              <Heart
                size={18}
                className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
              />
            </motion.button>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">
                ({product.reviews})
              </span>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-1 mb-3">
              {product.benefits.slice(0, 2).map((benefit, i) => (
                <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                  {benefit}
                </span>
              ))}
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`p-2 rounded-lg transition-colors ${
                  isAddedToCart
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                }`}
              >
                <ShoppingCart size={18} />
              </motion.button>
            </div>

            {/* Add to Cart Message */}
            {isAddedToCart && (
              <p className="text-xs text-emerald-600 mt-2 text-center font-medium">
                Added to cart!
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
