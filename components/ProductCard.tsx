'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, Plus, Star } from 'lucide-react'
import { Product } from '@/types'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
}

const swatches = ['bg-[#ffd92f]', 'bg-[#78d7ff]', 'bg-[#ef9cff]', 'bg-[#ff9f6d]']

export const ProductCard = ({ product }: ProductCardProps) => {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addItem } = useCart()
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const handleAddToCart = (event: React.MouseEvent) => {
    event.preventDefault()
    addItem(product, 1)
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 1800)
  }

  const color = swatches[Number(product.id) % swatches.length]

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="overflow-hidden rounded-[1.5rem] border-2 border-black bg-white shadow-[5px_5px_0_#16130f] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0_#ff4d00]">
          <div className={`relative h-64 overflow-hidden ${color}`}>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-7 drop-shadow-xl transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110"
              />
            ) : (
              <span className="absolute inset-0 grid place-items-center px-8 text-center text-lg font-black">{product.name}</span>
            )}
            <span className="absolute left-3 top-3 rounded-full border border-black bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider">
              {product.category}
            </span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={(event) => {
                event.preventDefault()
                toggleWishlist(product.id)
              }}
              aria-label="Toggle wishlist"
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border-2 border-black bg-white transition hover:bg-[#ef9cff]"
            >
              <Heart size={17} className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-black'} />
            </motion.button>
          </div>

          <div className="p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-xs font-bold">
                <Star size={14} className="fill-[#ff4d00] text-[#ff4d00]" />
                {product.rating}
                <span className="font-medium text-black/40">({product.reviews})</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">Snack pick</span>
            </div>
            <h3 className="min-h-12 text-lg font-black leading-tight tracking-[-.025em]" style={{color:"#000"}}>{product.name}</h3>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-black" style={{color:"#000"}}>₹{product.price.toFixed(2)}</span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
                className={`flex h-11 items-center gap-2 rounded-full border-2 border-black px-4 text-xs font-black transition ${isAddedToCart ? 'bg-[#ffd92f]' : 'bg-black text-white hover:bg-[#ff4d00]'}`}
              >
                <Plus size={16} /> {isAddedToCart ? 'Added!' : 'Add'}
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
