'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-800 to-orange-900 text-gray-100 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4 gradient-text">FoodZone</h3>
            <p className="text-sm text-gray-300">
              Your favorite snacks and food products delivered fresh and fast!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-emerald-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white font-semibold mb-4">Policies</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-emerald-400 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-emerald-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-emerald-400" />
                <span>rakesh23sep2000@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-emerald-400 mt-0.5" />
                <span>123 Wellness St, Health City, Chennai 600095</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2026 RAK - Ecommerce. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
