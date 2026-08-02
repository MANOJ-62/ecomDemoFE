'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export const Footer = () => <footer className="mt-16 bg-[#4a2a22] text-white">
  <div className="container-custom grid gap-10 py-12 md:grid-cols-[1.35fr_.75fr_.75fr_1fr]">
    <div><Link href="/" className="text-2xl font-black tracking-[-.06em]">DIVAKSHA<span className="text-[#eba11d]">.</span></Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">Curated snacks for every everyday moment. Delivered simply, quickly and with care.</p></div>
    <div><h3 className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-[#eba11d]">Shop</h3><div className="space-y-3 text-sm text-white/70"><Link href="/shop" className="block hover:text-white">All products</Link><Link href="/wishlist" className="block hover:text-white">Wishlist</Link><Link href="/cart" className="block hover:text-white">Your cart</Link></div></div>
    <div><h3 className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-[#eba11d]">Help</h3><div className="space-y-3 text-sm text-white/70"><Link href="/about" className="block hover:text-white">About us</Link><Link href="/returns" className="block hover:text-white">Returns</Link><Link href="/privacy" className="block hover:text-white">Privacy policy</Link><Link href="/terms" className="block hover:text-white">Terms of service</Link></div></div>
    <div><h3 className="mb-4 text-xs font-bold uppercase tracking-[.14em] text-[#eba11d]">Contact</h3><ul className="space-y-3 text-sm text-white/70"><li className="flex gap-2"><Phone size={15} className="mt-0.5 shrink-0 text-[#eba11d]" />(555) 123-4567</li><li className="flex gap-2 break-all"><Mail size={15} className="mt-0.5 shrink-0 text-[#eba11d]" />rakesh23sep2000@gmail.com</li><li className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-[#eba11d]" />Chennai, India</li></ul></div>
  </div>
  <div className="border-t border-white/15"><div className="container-custom py-5 text-xs text-white/45">© 2026 Divaksha. All rights reserved.</div></div>
</footer>
