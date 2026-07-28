'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Package, ShoppingCart, Users, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { logout } from '@/services/auth'
import { useRouter } from 'next/navigation'

export const AdminSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#ff4d00] text-white rounded-full border-2 border-black shadow-[3px_3px_0_#16130f]"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-[#16130f] text-white shadow-lg transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/15">
          <Link href="/admin" className="flex items-center gap-2 text-xl font-black tracking-[-.04em]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#ffd92f] text-black">D</span> ADMIN
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-[#ff4d00] text-white shadow-[4px_4px_0_#ffd92f]'
                    : 'text-white/55 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/15">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/55 hover:bg-red-600 hover:text-white transition-all duration-200 font-bold"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
