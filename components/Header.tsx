'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Heart, LogOut, Menu, Search, ShoppingBag, User as UserIcon, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { getAuthToken, getCurrentUser, logout } from '@/services/auth'
import { User } from '@/types'

const navItems = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'Our story' },
  { href: '/contact', label: 'Contact' },
]

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { itemCount } = useCart()

  useEffect(() => {
    if (getAuthToken()) setUser(getCurrentUser())
  }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    setIsDropdownOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-black bg-[#fff8eb]/95 text-[#16130f] backdrop-blur-xl">
      <div className="overflow-hidden border-b-2 border-black bg-[#16130f] py-2 text-xs font-black uppercase tracking-[.16em] text-white whitespace-nowrap">
        <div className="delivery-marquee inline-block">
          Free delivery above ₹500 &nbsp; ★ &nbsp; Big crunch, zero boring &nbsp; ★ &nbsp; New drops every week &nbsp; ★ &nbsp;
        </div>
      </div>
      <div className="container-custom">
        <div className="flex h-[72px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-[-.055em]">
            <span className="grid h-9 w-9 -rotate-3 place-items-center rounded-full bg-[#ff4d00] text-white shadow-[3px_3px_0_#16130f]">D</span>
            DIVAKSHA
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 text-sm font-bold transition-colors hover:text-[#ff4d00] ${pathname === item.href ? 'text-[#ff4d00]' : ''}`}
              >
                {item.label}
                {pathname === item.href && <span className="absolute inset-x-0 -bottom-0.5 h-1 rounded-full bg-[#ffd92f]" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link href="/shop" aria-label="Search products" className="hidden rounded-full p-2.5 transition hover:bg-[#ffd92f] sm:block">
              <Search size={20} />
            </Link>
            <Link href="/wishlist" aria-label="Wishlist" className="rounded-full p-2.5 transition hover:bg-[#ef9cff]">
              <Heart size={20} />
            </Link>

            {user ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-2 text-sm font-bold shadow-[2px_2px_0_#16130f]"
                >
                  <UserIcon size={16} /> {user.name}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[5px_5px_0_#16130f]">
                    <Link href="/profile" className="block border-b border-black/10 px-4 py-3 text-sm font-bold hover:bg-[#ffd92f]">My profile</Link>
                    <Link href="/orders" className="block border-b border-black/10 px-4 py-3 text-sm font-bold hover:bg-[#78d7ff]">My orders</Link>
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 sm:block">
                Login
              </Link>
            )}

            <Link href="/cart" aria-label={`Cart with ${itemCount} items`} className="relative rounded-full bg-[#ffd92f] p-2.5 transition hover:-rotate-6">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border border-black bg-[#ff4d00] px-1 text-[10px] font-black text-white">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="rounded-full p-2.5 hover:bg-[#78d7ff] md:hidden">
              {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t-2 border-black py-4 md:hidden">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="block rounded-xl px-4 py-3 font-bold hover:bg-[#ffd92f]">
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link href="/profile" className="block rounded-xl px-4 py-3 font-bold hover:bg-[#78d7ff]">My profile</Link>
                <Link href="/orders" className="block rounded-xl px-4 py-3 font-bold hover:bg-[#78d7ff]">My orders</Link>
                <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-xl px-4 py-3 font-bold text-red-600 hover:bg-red-50"><LogOut size={16} /> Logout</button>
              </>
            ) : (
              <Link href="/login" className="mt-2 block rounded-full bg-black px-4 py-3 text-center font-bold text-white">Login</Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
