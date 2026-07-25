'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Award, Users, Leaf, Zap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-custom py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              About Mini Ecommerce
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted partner for premium health supplements and wellness products. We&apos;re committed to helping you achieve your health and wellness goals through quality products and exceptional service.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To make premium wellness products accessible to everyone. We believe that quality health supplements shouldn&apos;t be expensive or difficult to find.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is to provide scientifically-formulated, ethically-sourced supplements that help our customers achieve their health goals.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  To become the leading provider of premium health supplements trusted by millions worldwide.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We envision a world where everyone has access to high-quality, effective supplements to support their health and wellness journey.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container-custom py-16">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-gray-900 mb-12 text-center"
          >
            Our Core Values
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: 'Quality',
                description: 'We source only the highest quality ingredients and conduct rigorous testing',
              },
              {
                icon: Leaf,
                title: 'Sustainability',
                description: 'Committed to ethical sourcing and environmentally friendly practices',
              },
              {
                icon: Users,
                title: 'Customer Focus',
                description: 'Your satisfaction and health are our top priorities',
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'Continuously researching and developing better formulations',
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gray-50 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '500+', label: 'Products' },
                { number: '4.8★', label: 'Average Rating' },
                { number: '10 Years', label: 'Industry Experience' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-custom py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Your Wellness Journey?</h2>
            <Link href="/shop" className="btn-primary inline-block">
              Shop Now
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
