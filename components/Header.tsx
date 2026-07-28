'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, Heart, Search, LogOut, User as UserIcon } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { getAuthToken, getCurrentUser, logout } from '@/services/auth'
import { User } from '@/types'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()
  const { itemCount } = useCart()

  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      const currentUser = getCurrentUser()
      if (currentUser) {
        setUser(currentUser)
      }
    }
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    setIsDropdownOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-purple-50 to-orange-50 border-b-2 border-purple-200 shadow-md">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold gradient-text">
            FoodZone
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 hover:bg-purple-100 rounded-lg transition-colors hidden sm:flex">
              <Search size={20} className="text-purple-600" />
            </button>
            <Link href="/wishlist" className="p-2 hover:bg-pink-100 rounded-lg transition-colors relative">
              <Heart size={20} className="text-pink-600" />
            </Link>

            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-purple-50 rounded-lg border border-purple-200">
                  <UserIcon onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      size={16} className="text-purple-600 cursor-pointer" />
                  <span className="text-sm font-medium text-gray-700 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>{user.name}</span>
                </div>
                <div className="relative hidden sm:block">
                  
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-purple-200 z-50">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 font-medium text-sm border-b border-purple-100"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-gray-700 hover:bg-purple-50 font-medium text-sm border-b border-purple-100"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium text-sm flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="hidden sm:block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Login
              </Link>
            )}

            <Link href="/cart" className="p-2 hover:bg-orange-100 rounded-lg transition-colors relative">
              <ShoppingCart size={20} className="text-orange-600" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-purple-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={20} className="text-purple-600" /> : <Menu size={20} className="text-purple-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t-2 border-purple-200 bg-gradient-to-r from-purple-50 to-orange-50">
            <Link href="/shop" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
              Products
            </Link>
            {user ? (
              <>
                <div className="px-4 py-3 bg-purple-100 border-b border-purple-200 font-medium text-purple-900">
                  Hello, {user.name}
                </div>
                <Link href="/profile" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
                  My Profile
                </Link>
                <Link href="/orders" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
                  My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg my-2 text-center">
                Login
              </Link>
            )}
            <Link href="/about" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-purple-600 font-medium">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
