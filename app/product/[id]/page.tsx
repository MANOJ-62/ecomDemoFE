'use client'

import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { Star, Heart, ShoppingCart, Check, Loader } from 'lucide-react'
import { Product } from '@/types'
import { useEffect } from 'react'
import { getProductById } from '@/services/products'
import { isAuthenticated } from '@/services/auth'

export default function ProductPage({ params }: { params: Promise<{ id: number }> }) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setLoading] = useState(true)
  const { addItem } = useCart()
  const router = useRouter()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [selectedFlavor, setSelectedFlavor] = useState('')
  const productImage = selectedFlavor ? product?.flavorImages?.[selectedFlavor] ?? product?.image : product?.image

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
  
        const data = await getProductById(id)
  
        setProduct(data);
        setSelectedFlavor(data?.flavors?.[0] || "");
      } catch (error) {
        console.error(error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
  
    fetchProduct()
  }, [id])

  useEffect(() => {
    const requestedFlavor = new URLSearchParams(window.location.search).get('flavor')
    if (requestedFlavor && product?.flavors?.includes(requestedFlavor)) {
      setSelectedFlavor(requestedFlavor)
    }
  }, [product])
  
  
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
              <a href="/shop" className="btn-primary">
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

  const handleAddToCart = async () => {
    if (product.flavors?.length && !selectedFlavor) return
    if (!isAuthenticated()) {
      sessionStorage.setItem('pending-cart-item', JSON.stringify({ product, quantity, flavor: selectedFlavor || undefined }))
      router.push('/login?next=%2Fcheckout')
      return
    }
    try {
      await addItem(product, quantity, selectedFlavor || undefined)
      setIsAddedToCart(true)
      setTimeout(() => setIsAddedToCart(false), 3000)
    } catch (error) {
      console.error('Unable to add item to cart', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#fff8eb] flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex min-h-[480px] items-center justify-center rounded-[2rem] border-2 border-black bg-[#ffd92f] p-8 shadow-[8px_8px_0_#16130f]"
              >
                <img
                  src={productImage}
                  alt={product.name}
                  className="max-h-[520px] w-full object-contain drop-shadow-2xl"
                />
              </motion.div>

              {/* Benefits */}
              {product.benefits.length > 0 && <div>
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
              </div>}

              {/* Ingredients */}
              {product.ingredients.length > 0 && <div>
                <h3 className="font-semibold text-gray-900 mb-3">Ingredients:</h3>
                <ul className="space-y-1">
                  {product.ingredients.map((ingredient, i) => (
                    <li key={i} className="text-gray-700 flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>}

              {/* Product Info */}
              {(product.weight || product.nutritionInfo || product.storageInstructions || product.allergenInfo) && (
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {product.weight && <div>
                    <p className="text-sm text-gray-600">Weight</p>
                    <p className="font-semibold text-gray-900">{product.weight}</p>
                  </div>}
                  {product.servings && (
                    <div>
                      <p className="text-sm text-gray-600">Servings</p>
                      <p className="font-semibold text-gray-900">{product.servings}</p>
                    </div>
                  )}
                </div>
              )}

              {(product.nutritionInfo || product.storageInstructions || product.allergenInfo) && (
                <div className="rounded-lg border border-gray-200 divide-y divide-gray-200">
                  {product.nutritionInfo && <div className="p-4"><h3 className="font-semibold text-gray-900 mb-1">Nutrition information</h3><p className="text-sm text-gray-600">{product.nutritionInfo}</p></div>}
                  {product.allergenInfo && <div className="p-4"><h3 className="font-semibold text-gray-900 mb-1">Allergen advice</h3><p className="text-sm text-gray-600">{product.allergenInfo}</p></div>}
                  {product.storageInstructions && <div className="p-4"><h3 className="font-semibold text-gray-900 mb-1">Storage</h3><p className="text-sm text-gray-600">{product.storageInstructions}</p></div>}
                </div>
              )}
            </div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6 md:py-5"
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
                <p className="electric-kicker mb-5">Crave-worthy pick</p>
                <h1 className="electric-title text-5xl md:text-6xl text-gray-900 mb-5">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-700 mb-4">{product.description}</p>
                {product.longDescription && (
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.longDescription}</p>
                )}
              </div>

              {/* Rating 
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
              </div>*/}

              {/* Price */}
              <div className="text-4xl font-black text-gray-900">
                ₹{product.price.toFixed(2)}
              </div>
              {/* Flavors */}
              {product.flavors && product.flavors.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Choose a flavor</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.flavors.map((flavor) => (
                      <button key={flavor} type="button" onClick={() => setSelectedFlavor(flavor)}
                        className={`px-4 py-2 rounded-lg border font-medium transition-colors ${selectedFlavor === flavor ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-300 text-gray-700 hover:border-emerald-400'}`}>
                        {flavor}
                      </button>
                    ))}
                  </div>
                  {!selectedFlavor && <p className="mt-2 text-sm text-gray-500">Select a flavor before adding this product.</p>}
                </div>
              )}

              

              {/* Quantity and Add to Cart */}
              <div className="flex gap-4 pt-4">
                <div className="flex items-center border-2 border-black rounded-full bg-white overflow-hidden">
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
                  disabled={Boolean(product.flavors?.length && !selectedFlavor)}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="px-6 py-3 border-2 border-black bg-[#ef9cff] text-black rounded-full font-bold transition-transform hover:-translate-y-1"
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
