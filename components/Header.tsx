'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, Heart, LogOut, Menu, Search, ShoppingBag, User as UserIcon, X } from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { getAuthToken, getCurrentUser, logout } from '@/services/auth'
import { User } from '@/types'

const navItems = [
  { href: '/shop', label: 'Shop' },
  { href: '/shop', label: 'Categories' },
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

  useEffect(() => { if (getAuthToken()) setUser(getCurrentUser()) }, [])

  const handleLogout = () => {
    logout()
    setUser(null)
    setIsDropdownOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-[#fffcf7] text-[#2f1b16] shadow-[0_1px_0_#e7ddd2]">
      <div className="bg-[#168bcb] px-4 py-2 text-center text-[11px] font-bold uppercase tracking-[.12em] text-white">
        Free delivery on orders above ₹500 · Extra savings on prepaid orders
      </div>
      <div className="border-b border-[#e7ddd2] bg-[#4a2a22] text-white">
        <div className="container-custom flex h-16 items-center justify-between gap-5">
          <Link href="/" className="shrink-0 text-2xl font-black tracking-[-.06em] text-white">DIVAKSHA<span className="text-[#eba11d]">.</span></Link>
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item, index) => (
              <Link key={`${item.label}-${index}`} href={item.href} className={`flex items-center gap-1 text-sm font-semibold tracking-wide transition hover:text-[#eba11d] ${pathname === item.href && index === 0 ? 'text-[#eba11d]' : ''}`}>
                {item.label}{index < 2 && <ChevronDown size={14} />}
              </Link>
            ))}
          </nav>
          <div className="ml-auto hidden max-w-xs flex-1 lg:block">
            <Link href="/shop" className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm text-[#70635e] transition focus:outline-none focus:ring-2 focus:ring-[#eba11d]">
              <Search size={17} /> Search snacks
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/shop" aria-label="Search products" className="rounded p-2 hover:bg-white/10 lg:hidden"><Search size={20} /></Link>
            <Link href="/wishlist" aria-label="Wishlist" className="rounded p-2 hover:bg-white/10"><Heart size={20} /></Link>
            {user ? (
              <div className="relative hidden sm:block">
                <button onClick={() => setIsDropdownOpen((value) => !value)} className="flex items-center gap-2 rounded p-2 text-sm font-semibold hover:bg-white/10"><UserIcon size={18} /> {user.name}</button>
                {isDropdownOpen && <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-md border border-[#e7ddd2] bg-white text-[#2f1b16] shadow-xl">
                  <Link href="/profile" className="block px-4 py-3 text-sm hover:bg-[#f6eedf]">My profile</Link>
                  <Link href="/orders" className="block px-4 py-3 text-sm hover:bg-[#f6eedf]">My orders</Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-700 hover:bg-red-50"><LogOut size={16} /> Logout</button>
                </div>}
              </div>
            ) : <Link href="/login" className="hidden rounded border border-white/40 px-3 py-1.5 text-sm font-semibold transition hover:border-[#eba11d] hover:text-[#eba11d] sm:block">Login</Link>}
            <Link href="/cart" aria-label={`Cart with ${itemCount} items`} className="relative rounded p-2 hover:bg-white/10"><ShoppingBag size={21} />{itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#eba11d] px-1 text-[9px] font-black text-[#2f1b16]">{itemCount > 9 ? '9+' : itemCount}</span>}</Link>
            <button onClick={() => setIsMenuOpen((value) => !value)} aria-label="Toggle menu" className="rounded p-2 hover:bg-white/10 lg:hidden">{isMenuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          </div>
        </div>
      </div>
      {isMenuOpen && <nav className="border-b border-[#e7ddd2] bg-white px-4 py-3 lg:hidden">
        {navItems.map((item, index) => <Link key={`${item.label}-${index}`} href={item.href} onClick={() => setIsMenuOpen(false)} className="block rounded px-3 py-3 text-sm font-semibold hover:bg-[#f6eedf]">{item.label}</Link>)}
        {user ? <><Link href="/profile" className="block rounded px-3 py-3 text-sm font-semibold hover:bg-[#f6eedf]">My profile</Link><button onClick={handleLogout} className="flex w-full items-center gap-2 rounded px-3 py-3 text-sm font-semibold text-red-700 hover:bg-red-50"><LogOut size={16} /> Logout</button></> : <Link href="/login" className="mt-2 block rounded bg-[#eba11d] px-3 py-3 text-center text-sm font-bold text-[#2f1b16]">Login</Link>}
      </nav>}
    </header>
  )
}
