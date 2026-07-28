'use client'

import Link from 'next/link'
import { ArrowUpRight, Camera, Mail, MapPin, Phone } from 'lucide-react'

export const Footer = () => (
  <footer className="mt-20 border-t-2 border-black bg-[#16130f] text-white">
    <div className="overflow-hidden border-b-2 border-white/20 bg-[#ff4d00] py-3 text-sm font-black uppercase tracking-[.18em]">
      <p className="text-center">Crunchy classics · Global favourites · Delivered fast</p>
    </div>
    <div className="container-custom py-14">
      <div className="grid gap-10 border-b border-white/15 pb-12 md:grid-cols-[1.3fr_.7fr_.7fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-2 text-2xl font-black tracking-[-.055em]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#ffd92f] text-black">D</span>
            DIVAKSHA
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/55">The loudest snack shelf on the internet. Cult classics, bold flavours and zero boring bites.</p>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-black uppercase tracking-[.16em] text-[#ffd92f]">Explore</h4>
          <div className="space-y-3 text-sm text-white/65">
            <Link href="/shop" className="block hover:text-white">Shop all</Link>
            <Link href="/about" className="block hover:text-white">Our story</Link>
            <Link href="/contact" className="block hover:text-white">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-black uppercase tracking-[.16em] text-[#78d7ff]">Help</h4>
          <div className="space-y-3 text-sm text-white/65">
            <Link href="/returns" className="block hover:text-white">Returns</Link>
            <Link href="/privacy" className="block hover:text-white">Privacy</Link>
            <Link href="/terms" className="block hover:text-white">Terms</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-black uppercase tracking-[.16em] text-[#ef9cff]">Say hello</h4>
          <ul className="space-y-3 text-sm text-white/65">
            <li className="flex gap-2"><Phone size={15} className="mt-0.5 text-[#ffd92f]" />(555) 123-4567</li>
            <li className="flex gap-2 break-all"><Mail size={15} className="mt-0.5 shrink-0 text-[#78d7ff]" />rakesh23sep2000@gmail.com</li>
            <li className="flex gap-2"><MapPin size={15} className="mt-0.5 shrink-0 text-[#ef9cff]" />Chennai 600095, India</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-7 text-xs font-medium text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© 2026 Divaksha. All crunch reserved.</p>
        <a href="#" className="flex items-center gap-2 hover:text-white"><Camera size={15} /> Follow the flavour <ArrowUpRight size={14} /></a>
      </div>
    </div>
  </footer>
)
