'use client'

import { useState, use } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useProduct } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { Star, Heart, ShoppingCart, Check, Loader } from 'lucide-react'

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data: product, isLoading } = useProduct(id)
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-emerald-600" size={40} />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 container-custom py-24 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900">Product Not Found</h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto">
                The product you&apos;re looking for doesn&apos;t exist or has been removed. Let&apos;s find something great for you instead.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/products" className="btn-primary">
                Browse All Products
              </a>
              <a href="/" className="btn-secondary">
                Back to Home
              </a>
            </div>
            <div className="pt-12 text-6xl opacity-20">
              ∅
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center"
            >
              <div className="w-full aspect-square bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-center justify-center p-8">
                <span className="text-center text-gray-400 text-lg max-w-xs">
                  {product.name}
                </span>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
                <span className="text-sm text-gray-600">
                  Stock: {product.stock} units
                </span>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                {product.longDescription && (
                  <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-700">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Key Benefits:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.benefits.map((benefit, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg text-sm"
                    >
                      <Check size={16} />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Ingredients:</h3>
                <ul className="space-y-1">
                  {product.ingredients.map((ingredient, i) => (
                    <li key={i} className="text-gray-700 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Info */}
              {product.weight && (
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-semibold text-gray-900">{product.weight}</p>
                  </div>
                  {product.servings && (
                    <div>
                      <p className="text-sm text-gray-600">Servings</p>
                      <p className="font-semibold text-gray-900">{product.servings}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4 pt-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-semibold text-gray-900 min-w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="px-6 py-3 border-2 border-emerald-600 text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                >
                  <Heart
                    size={20}
                    className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}
                  />
                </button>
              </div>

              {/* Feedback Message */}
              {isAddedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2"
                >
                  <Check size={20} className="text-emerald-600" />
                  <span className="text-emerald-700">
                    Added {quantity} to cart!
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
