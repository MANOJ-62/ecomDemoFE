'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'
import { ArrowRight, Leaf, Zap, Heart } from 'lucide-react'

export default function Home() {
  const { data: products = [], isLoading } = useProducts('All Products')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container-custom py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Taste the{' '}
              <span className="gradient-text">
                Flavor & Fun
              </span>
              {' '}of FoodZone
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto font-medium">
              Discover the world's favorite snacks and food products. From Pringles to Doritos, find your favorite treats and crunchy delights!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/shop" className="btn-primary flex items-center gap-2">
                Start Shopping
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-secondary">
                About Us
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-4 mt-16 sm:mt-20"
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text">1M+</p>
              <p className="text-sm text-gray-700 mt-2 font-medium">Orders Shipped</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text">100K+</p>
              <p className="text-sm text-gray-700 mt-2 font-medium">Happy Customers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text">4.9★</p>
              <p className="text-sm text-gray-700 mt-2 font-medium">Customer Rating</p>
            </div>
          </motion.div>
        </section>

        {/* Featured Section */}
        <section className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Trending Snacks Now
              </h2>
              <p className="text-gray-700 font-medium">
                Discover the snacks loved by millions worldwide - straight from your favorite brands!
              </p>
            </div>
            <ProductGrid products={products.slice(0, 3)} isLoading={isLoading} />
            <div className="text-center">
              <Link href="/shop" className="btn-secondary">
                View All Snacks
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="bg-gradient-to-r from-orange-100 to-pink-100 py-16">
          <div className="container-custom">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center"
            >
              Why Choose Us
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  icon: Leaf,
                  title: 'Premium Quality',
                  description: 'All products are certified organic and sustainably sourced',
                },
                {
                  icon: Zap,
                  title: 'Fast Shipping',
                  description: 'Free shipping on orders over $50, delivered in 5-7 business days',
                },
                {
                  icon: Heart,
                  title: 'Customer Care',
                  description: '100% satisfaction guarantee with hassle-free returns',
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-400 transition-colors"
                >
                  <feature.icon className="w-12 h-12 text-emerald-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-2xl p-8 sm:p-12 text-white text-center shadow-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Join FoodZone Lovers
            </h2>
            <p className="text-purple-50 mb-6 max-w-lg mx-auto font-medium">
              Get exclusive deals, special offers, and first access to new snacks!
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 font-medium"
              />
              <button className="px-6 py-3 bg-yellow-400 text-purple-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                Subscribe
              </button>
            </form>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
