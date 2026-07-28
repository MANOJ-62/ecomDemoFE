'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, PackageCheck, ShieldCheck, Sparkles, Star, Truck } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductGrid } from '@/components/ProductGrid'
import { useProducts } from '@/hooks/useProducts'

const perks = [
  { icon: PackageCheck, title: 'Freshly packed', copy: 'Every order is packed with care, crunch intact.' },
  { icon: Truck, title: 'Fast delivery', copy: 'Free shipping above ₹500. At your door in 2–3 days.' },
  { icon: ShieldCheck, title: 'Easy returns', copy: 'Changed your mind? We keep returns simple.' },
]

export default function Home() {
  const { data: products = [], isLoading } = useProducts('All Products')

  return (
    <div className="min-h-screen bg-[#fff8eb] text-[#16130f]">
      <Header />
      <main>
        <section className="container-custom relative grid min-h-[650px] items-center overflow-hidden py-12 md:grid-cols-[1.08fr_.92fr] md:py-16">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="relative z-10">
            <span className="electric-kicker mb-7 -rotate-2"><Sparkles size={14} /> Snack louder</span>
            <h1 className="electric-title text-[clamp(4.3rem,9.4vw,8.5rem)]">
              Big
              <br />
              <span className="text-[#ff4d00]">crunch.</span>
              <br />
              Zero boring.
            </h1>
            <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-black/60">
              Iconic chips, global flavours and cult favourites delivered straight to your snack drawer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary gap-3">Raid the pantry <ArrowRight size={18} /></Link>
              <Link href="/about" className="btn-secondary">Meet Divaksha</Link>
            </div>
            <div className="mt-9 flex items-center gap-3 text-sm font-bold">
              <span className="flex text-[#ff4d00]">
                {[...Array(5)].map((_, index) => <Star key={index} size={16} fill="currentColor" />)}
              </span>
              4.9 from 100K+ snackers
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.86, rotate: 4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.65 }} className="relative mt-12 h-[430px] md:mt-0 md:h-[570px]">
            <div className="absolute left-[8%] top-[9%] h-[80%] w-[80%] rotate-6 rounded-[38%_62%_55%_45%] bg-[#ff4d00]" />
            <div className="absolute right-[3%] top-[5%] h-24 w-24 rounded-full border-2 border-black bg-[#78d7ff]" />
            <div className="absolute bottom-[4%] left-[1%] h-32 w-32 rounded-full border-2 border-black bg-[#ffd92f]" />
            <div className="absolute inset-0 z-10">
              <Image src="/products/pringles.png" alt="Pringles snack pack" fill priority sizes="(max-width: 768px) 90vw, 45vw" className="object-contain p-8 drop-shadow-2xl" />
            </div>
            <span className="absolute right-[2%] top-[24%] z-20 rotate-12 border-2 border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0_#16130f]">SO GOOD!</span>
          </motion.div>
        </section>

        <section className="border-y-2 border-black bg-[#ffd92f] py-5">
          <div className="container-custom grid grid-cols-3 divide-x-2 divide-black text-center">
            <div><strong className="block text-2xl font-black md:text-4xl">1M+</strong><span className="text-[10px] font-black uppercase tracking-wider md:text-xs">Orders shipped</span></div>
            <div><strong className="block text-2xl font-black md:text-4xl">100K+</strong><span className="text-[10px] font-black uppercase tracking-wider md:text-xs">Happy snackers</span></div>
            <div><strong className="block text-2xl font-black md:text-4xl">4.9★</strong><span className="text-[10px] font-black uppercase tracking-wider md:text-xs">Average rating</span></div>
          </div>
        </section>

        <section className="bg-[#16130f] py-20 text-white">
          <div className="container-custom">
            <div className="mb-11 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="electric-kicker mb-5">Crowd favourites</span>
                <h2 className="electric-title text-5xl md:text-7xl">The crunch list</h2>
              </div>
              <Link href="/shop" className="flex items-center gap-2 self-start border-b-2 border-[#ffd92f] pb-2 text-sm font-black text-[#ffd92f]">Shop all snacks <ArrowRight size={16} /></Link>
            </div>
            <ProductGrid products={products.slice(0, 3)} isLoading={isLoading} />
          </div>
        </section>

        <section className="container-custom py-20">
          <div className="grid gap-5 md:grid-cols-3">
            {perks.map((perk, index) => (
              <motion.article
                key={perk.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`rounded-[1.5rem] border-2 border-black p-7 shadow-[5px_5px_0_#16130f] ${['bg-[#78d7ff]', 'bg-[#ffd92f]', 'bg-[#ef9cff]'][index]}`}
              >
                <perk.icon size={35} strokeWidth={2.4} />
                <h3 className="mt-8 text-2xl font-black tracking-tight">{perk.title}</h3>
                <p className="mt-2 font-medium leading-relaxed text-black/60">{perk.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="container-custom pb-10">
          <div className="relative overflow-hidden rounded-[2rem] border-2 border-black bg-[#ff4d00] px-6 py-14 text-white shadow-[8px_8px_0_#16130f] md:px-12">
            <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-[#ffd92f]" />
            <div className="relative z-10 max-w-2xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[.2em] text-[#ffd92f]">The snack signal</p>
              <h2 className="electric-title text-4xl md:text-6xl">Fresh drops. Hot deals. No spam.</h2>
              <form className="mt-7 flex max-w-lg flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input id="newsletter-email" type="email" placeholder="you@email.com" className="min-w-0 flex-1 rounded-full border-2 border-black bg-white px-5 py-3.5 font-bold text-black outline-none focus:ring-4 focus:ring-[#ffd92f]" />
                <button className="rounded-full border-2 border-black bg-[#ffd92f] px-6 py-3.5 font-black text-black transition hover:-translate-y-1">Join the list</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
