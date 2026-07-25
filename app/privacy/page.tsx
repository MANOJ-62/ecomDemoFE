'use client'

import { motion } from 'framer-motion'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: June 2024</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl space-y-8 text-gray-700 leading-relaxed"
          >
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                Mini Ecommerce (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information Collection</h2>
              <p className="mb-3">We collect information in various ways, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Information you provide directly (name, email, address)</li>
                <li>Information collected automatically (cookies, usage data)</li>
                <li>Information from third parties when necessary</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use of Information</h2>
              <p className="mb-3">We use collected information for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing and maintaining our service</li>
                <li>Processing transactions and sending confirmations</li>
                <li>Sending promotional materials (with your consent)</li>
                <li>Improving and analyzing our service</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p>
                The security of your data is important to us, but no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at support@mini.com
              </p>
            </section>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
