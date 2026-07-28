'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CheckCircle, Clock, RotateCcw, Package } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container-custom py-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Refunds Policy</h1>
            <p className="text-gray-600">Last updated: June 2024</p>
          </motion.div>

          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-12"
          >
            <h2 className="text-xl font-bold text-emerald-900 mb-2">30-Day Satisfaction Guarantee</h2>
            <p className="text-emerald-800">
              We stand behind our products. If you&apos;re not completely satisfied, we offer a full refund within 30 days of purchase, no questions asked.
            </p>
          </motion.div>

          {/* Return Process */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">How to Return Your Order</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  icon: Package,
                  step: 1,
                  title: 'Contact Us',
                  desc: 'Email rakesh23sep2000@gmail.com with your order number',
                },
                {
                  icon: Clock,
                  step: 2,
                  title: 'Get Authorization',
                  desc: 'Receive return shipping instructions within 24 hours',
                },
                {
                  icon: RotateCcw,
                  step: 3,
                  title: 'Ship Back',
                  desc: 'Send the item back in original condition',
                },
                {
                  icon: CheckCircle,
                  step: 4,
                  title: 'Refund',
                  desc: 'Receive refund within 5-7 business days',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div className="inline-block bg-emerald-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mb-2">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Terms and Conditions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-50 rounded-lg p-8 mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Return Terms & Conditions</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Eligibility</h3>
                <p>Items must be returned within 30 days of purchase in original, unused condition with all original packaging and documentation.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Condition</h3>
                <p>Items should be unopened and in resalable condition. Opened or used items may be subject to a restocking fee.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Shipping</h3>
                <p>Customers are responsible for return shipping costs unless the item is defective or damaged. We provide a prepaid return label upon request.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Refund Processing</h3>
                <p>Once we receive and inspect your return, refunds will be processed within 5-7 business days to your original payment method.</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Exchanges</h3>
                <p>For defective items, we offer free exchanges or replacements. Contact our support team to arrange an exchange.</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h2>
            <p className="text-gray-600 mb-6">Our customer support team is here to help with any return or refund inquiries.</p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Support
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
