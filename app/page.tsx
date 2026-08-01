'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, PackageCheck, ShieldCheck, Star, Truck } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

const benefits = [
  { icon: PackageCheck, title: 'Curated favourites', copy: 'Tried, loved and chosen for every kind of craving.' },
  { icon: Truck, title: 'Fast doorstep delivery', copy: 'Free delivery on qualifying orders across India.' },
  { icon: ShieldCheck, title: 'Easy, secure shopping', copy: 'Simple checkout with support whenever you need it.' },
]

export default function Home() {
  const { data: products = [], isLoading } = useProducts('All Products')

  return <div className="min-h-screen bg-[#fffcf7] text-[#2f1b16]">
    <Header />
    <main>
      <section className="border-b border-[#e7ddd2] bg-[#f6eedf]">
        <div className="container-custom grid min-h-[520px] items-center gap-8 py-12 md:grid-cols-2 md:py-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }} className="max-w-xl">
            <p className="section-eyebrow mb-4">Everyday snacks, thoughtfully chosen</p>
            <h1 className="text-4xl font-extrabold leading-[1.06] tracking-[-.05em] text-[#2f1b16] sm:text-5xl lg:text-6xl">Good snacks for every good moment.</h1>
            <p className="mt-6 text-lg leading-relaxed text-[#70635e]">Discover familiar favourites and exciting new finds, delivered straight to your doorstep.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/shop" className="btn-primary gap-2">Shop all snacks <ArrowRight size={17} /></Link><Link href="/about" className="btn-secondary">Why Divaksha</Link></div>
            <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[#70635e]"><span className="flex text-[#eba11d]">{[...Array(5)].map((_, index) => <Star key={index} size={16} fill="currentColor" />)}</span> Loved by snackers across India</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .45 }} className="relative mx-auto h-[360px] w-full max-w-[500px] overflow-hidden bg-[#e7ddd2] md:h-[440px]">
            <div className="absolute inset-x-[10%] bottom-0 h-[62%] bg-[#d9c8b8]" />
            <Image src="/images/handgrowthins.png" alt="Hangrow Thins snack selection" fill priority sizes="(max-width: 768px) 90vw, 45vw" className="object-contain p-8 drop-shadow-2xl" />
            <span className="absolute left-5 top-5 bg-[#4a2a22] px-3 py-2 text-xs font-bold uppercase tracking-[.12em] text-white">New arrivals</span>
          </motion.div>
        </div>
      </section>

      <section className="container-custom py-14 md:py-20">
        <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-eyebrow mb-3">Most loved</p><h2 className="page-title">Shop customer favourites</h2></div><Link href="/shop" className="flex items-center gap-2 text-sm font-bold text-[#4a2a22] hover:text-[#c97c08]">View all products <ArrowRight size={16} /></Link></div>
        <ProductGrid products={products.slice(0, 4)} isLoading={isLoading} />
      </section>

      <section className="border-y border-[#e7ddd2] bg-white"><div className="container-custom grid gap-0 py-10 md:grid-cols-3 md:py-14">{benefits.map((benefit, index) => <article key={benefit.title} className={`px-2 py-5 md:px-8 ${index < benefits.length - 1 ? 'md:border-r md:border-[#e7ddd2]' : ''}`}><benefit.icon size={27} className="text-[#5b6a35]" /><h3 className="mt-4 text-lg font-bold text-[#2f1b16]">{benefit.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#70635e]">{benefit.copy}</p></article>)}</div></section>

      <section className="container-custom py-14 md:py-20"><div className="grid overflow-hidden bg-[#4a2a22] text-white md:grid-cols-[1.25fr_.75fr]"><div className="p-8 md:p-12"><p className="mb-3 text-xs font-bold uppercase tracking-[.15em] text-[#eba11d]">Stay in the loop</p><h2 className="text-3xl font-bold tracking-[-.04em] md:text-4xl">Offers and new finds, sent sparingly.</h2><p className="mt-3 max-w-lg text-white/65">Be first to know about snack drops, bundle offers and delivery deals.</p><form className="mt-7 flex max-w-md gap-2" onSubmit={(event) => event.preventDefault()}><label htmlFor="newsletter-email" className="sr-only">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" className="min-w-0 flex-1 rounded-md border-0 px-4 py-3 text-[#2f1b16] outline-none ring-0" /><button className="rounded-md bg-[#eba11d] px-5 py-3 text-sm font-bold text-[#2f1b16] hover:bg-[#c97c08]">Sign up</button></form></div><div className="hidden bg-[#5b6a35] md:block" /></div></section>
    </main>
    <Footer />
  </div>
}
