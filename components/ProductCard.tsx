'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Product } from '@/types'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'

interface ProductCardProps { product: Product }

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addItem } = useCart()
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault()
    addItem(product, 1, product.flavors?.[0])
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 1800)
  }

  return (
    <motion.article initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .22 }} className="group">
      <Link href={`/product?id=${product.id}`} className="block">
        <div className="h-full overflow-hidden border border-[#e7ddd2] bg-white transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_32px_rgba(47,27,22,.12)]">
          <div className="relative h-64 overflow-hidden bg-[#f6eedf] sm:h-72">
            {product.image ? <Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-contain p-5 transition duration-300 group-hover:scale-[1.025]" /> : <span className="absolute inset-0 grid place-items-center p-6 text-center font-semibold text-[#70635e]">{product.name}</span>}
            <span className="absolute left-0 top-4 bg-[#5b6a35] px-3 py-1 text-xs font-bold text-white">{product.category}</span>
            <motion.button whileTap={{ scale: .94 }} onClick={(event) => { event.preventDefault(); toggleWishlist(product.id) }} aria-label="Toggle wishlist" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#4a2a22] shadow-sm transition hover:bg-white">
              <Heart size={17} className={isInWishlist(product.id) ? 'fill-[#b65736] text-[#b65736]' : ''} />
            </motion.button>
          </div>
          <div className="flex flex-col p-5">
            <div className="mb-3 flex items-center gap-1 text-xs font-semibold text-[#70635e]"><Star size={14} className="fill-[#eba11d] text-[#eba11d]" /> {product.rating}<span className="font-normal">({product.reviews})</span></div>
            <h3 className="min-h-12 text-[17px] font-bold leading-snug text-[#2f1b16]">{product.name}</h3>
            <p className="mt-2 min-h-5 text-sm text-[#70635e]">{product.benefits?.[0] || 'A delicious everyday favourite'}</p>
            <div className="mt-5 flex items-end justify-between gap-3"><span className="text-xl font-bold text-[#2f1b16]">₹{product.price.toFixed(2)}</span><span className="text-xs font-medium text-[#70635e]">incl. taxes</span></div>
            <motion.button whileTap={{ scale: .98 }} onClick={handleAddToCart} className={`mt-5 flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold transition ${isAddedToCart ? 'bg-[#eef0e7] text-[#3e6b45]' : 'bg-[#eba11d] text-[#2f1b16] hover:bg-[#c97c08]'}`}>
              <ShoppingBag size={17} /> {isAddedToCart ? 'Added to cart' : 'Add to cart'}
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
