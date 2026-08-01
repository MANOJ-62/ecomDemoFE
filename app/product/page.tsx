'use client'

import { Suspense, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Heart, Loader, Minus, Package, Plus, ShoppingBag, Sparkles } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ProductGrid } from '@/components/ProductGrid'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'
import { useProducts } from '@/hooks/useProducts'
import { getProductById } from '@/services/products'
import { isAuthenticated } from '@/services/auth'
import { Product } from '@/types'

function ProductDetails() {
  const searchParams = useSearchParams()
  const id = Number(searchParams.get('id'))
  const router = useRouter()
  const { addItem } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { data: allProducts = [] } = useProducts()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedFlavor, setSelectedFlavor] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!Number.isInteger(id) || id <= 0) {
      setProduct(null)
      setLoading(false)
      return
    }
    setLoading(true)
    getProductById(id)
      .then((value) => {
        setProduct(value)
        const requestedFlavor = searchParams.get('flavor')
        const flavor = requestedFlavor && value?.flavors?.includes(requestedFlavor) ? requestedFlavor : value?.flavors?.[0] ?? ''
        setSelectedFlavor(flavor)
        setSelectedImage(value?.flavorImages?.[flavor] ?? value?.images?.[0] ?? value?.image ?? '')
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id, searchParams])

  // const gallery = useMemo(() => {
  //   if (!product) return []
  //   return [...new Set([product.flavorImages?.[selectedFlavor], ...(product.images ?? []), product.image].filter(Boolean))] as string[]
  // }, [product, selectedFlavor])
  const gallery = useMemo(() => {
    if (!product) return []
  
    const selectedFlavorImage =
      product.flavorImages?.[selectedFlavor]
  
    const allFlavorImage =
      product.images?.find((img) =>
        img.includes('range') ||
        img.includes('all') ||
        img.includes('mini-thins1') ||
        img.includes('handgrowthins')
      )
  
    return [
      
      selectedFlavorImage,
      allFlavorImage
    ].filter(Boolean) as string[]
  
  }, [product, selectedFlavor])
  
  useEffect(() => {
    if (gallery.length && !gallery.includes(selectedImage)) setSelectedImage(gallery[0])
  }, [gallery, selectedImage])

  const relatedProducts = product
    ? allProducts.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4)
    : []

  const addToCart = async () => {
    if (!product) return
    if (!isAuthenticated()) {
      sessionStorage.setItem('pending-cart-item', JSON.stringify({ product, quantity, flavor: selectedFlavor || undefined }))
      router.push('/login?next=%2Fcheckout')
      return
    }
    await addItem(product, quantity, selectedFlavor || undefined)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2500)
  }

  if (loading) return <div className="min-h-screen grid place-items-center bg-[#fffcf7]"><Loader className="animate-spin text-[#5b6a35]" size={34} /></div>

  if (!product) return <div className="min-h-screen bg-[#fffcf7] flex flex-col"><Header /><main className="container-custom flex flex-1 flex-col items-center justify-center py-24 text-center"><Package size={48} className="mb-5 text-[#5b6a35]" /><h1 className="page-title">Product not found</h1><p className="mt-3 text-[#70635e]">This product is no longer available.</p><Link href="/shop" className="btn-primary mt-7">Browse snacks</Link></main><Footer /></div>

  return <div className="min-h-screen bg-[#fffcf7] text-[#2f1b16] flex flex-col">
    <Header />
    <main className="flex-1">
      <div className="container-custom py-7 sm:py-10 lg:py-14">
        <Link href="/shop" className="text-sm font-semibold text-[#5b6a35] hover:text-[#4a2a22]">← Back to shop</Link>
        <section className="mt-6 grid gap-9 lg:grid-cols-[minmax(0,1.04fr)_minmax(360px,.96fr)] lg:gap-14">
          <div className="min-w-0">
            <div className="relative flex min-h-[340px] items-center justify-center overflow-hidden border border-[#e7ddd2] bg-[#f6eedf] p-6 sm:min-h-[510px] sm:p-12">
              {selectedImage && <img src={selectedImage} alt={product.name} className="max-h-[470px] w-full object-contain mix-blend-multiply" />}
            </div>
            {gallery.length > 1 && <div className="mt-4 flex gap-3 overflow-x-auto pb-1">{gallery.map((image, index) => <button key={image} type="button" onClick={() => setSelectedImage(image)} aria-label={`View image ${index + 1}`} className={`h-20 w-20 shrink-0 border bg-white p-1.5 transition sm:h-24 sm:w-24 ${selectedImage === image ? 'border-[#4a2a22] ring-2 ring-[#eba11d]' : 'border-[#e7ddd2] hover:border-[#5b6a35]'}`}><img src={image} alt="" className="h-full w-full object-contain mix-blend-multiply" /></button>)}</div>}
          </div>
          <div className="lg:pt-3">
            <p className="inline-flex bg-[#eef0e7] px-3 py-1 text-xs font-bold uppercase tracking-[.13em] text-[#3e6b45]">{product.category}</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-.05em] sm:text-5xl">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-[#70635e]">{product.description}</p>
            <p className="mt-5 text-3xl font-bold">₹{product.price.toFixed(2)} <span className="text-sm font-medium text-[#70635e]">incl. taxes</span></p>
            {product.flavors?.length ? <div className="mt-7"><h2 className="text-sm font-bold uppercase tracking-[.12em]">Choose a flavour</h2><div className="mt-3 flex flex-wrap gap-2">{product.flavors.map((flavor) => <button type="button" key={flavor} onClick={() => { setSelectedFlavor(flavor); setSelectedImage(product.flavorImages?.[flavor] ?? selectedImage) }} className={`border px-4 py-2 text-sm font-semibold transition ${selectedFlavor === flavor ? 'border-[#4a2a22] bg-[#4a2a22] text-white' : 'border-[#e7ddd2] bg-white hover:border-[#5b6a35]'}`}>{flavor}</button>)}</div></div> : null}
            <div className="mt-8 flex flex-wrap gap-3"><div className="flex items-center border border-[#d9c8b8] bg-white"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity" className="p-3 hover:bg-[#f6eedf]"><Minus size={17} /></button><span className="w-10 text-center font-bold">{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity" className="p-3 hover:bg-[#f6eedf]"><Plus size={17} /></button></div><button onClick={addToCart} className="btn-primary flex flex-1 items-center justify-center gap-2 min-w-[190px]"><ShoppingBag size={18} /> Add to cart</button><button onClick={() => toggleWishlist(product.id)} aria-label="Toggle wishlist" className="border border-[#d9c8b8] bg-white p-3 hover:bg-[#f6eedf]"><Heart className={isInWishlist(product.id) ? 'fill-[#b65736] text-[#b65736]' : ''} /></button></div>
            {added && <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-[#3e6b45]"><Check size={17} /> Added to your cart.</p>}
            {product.benefits.length > 0 ? <div className="mt-9 border-t border-[#e7ddd2] pt-7"><h2 className="flex items-center gap-2 font-bold"><Sparkles size={18} className="text-[#eba11d]" /> Product highlights</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{product.benefits.map((highlight) => <li key={highlight} className="flex gap-2 text-sm text-[#70635e]"><Check size={16} className="mt-0.5 shrink-0 text-[#3e6b45]" />{highlight}</li>)}</ul></div> : null}
          </div>
        </section>
        <section className="mt-12 grid gap-5 border-y border-[#e7ddd2] py-9 md:grid-cols-3"><div><h2 className="font-bold">Description</h2><p className="mt-2 text-sm leading-relaxed text-[#70635e]">{product.longDescription || product.description}</p></div><div><h2 className="font-bold">Specifications</h2><dl className="mt-2 space-y-1 text-sm text-[#70635e]"><div><dt className="inline font-semibold text-[#2f1b16]">Net quantity: </dt><dd className="inline">{product.weight || 'See pack for details'}</dd></div><div><dt className="inline font-semibold text-[#2f1b16]">Storage: </dt><dd className="inline">{product.storageInstructions || 'Store in a cool, dry place.'}</dd></div></dl></div><div><h2 className="font-bold">Ingredients & nutrition</h2><p className="mt-2 text-sm leading-relaxed text-[#70635e]">{product.ingredients?.join(', ') || product.nutritionInfo || 'Refer to the pack for ingredient and nutrition information.'}</p>{product.allergenInfo && <p className="mt-2 text-sm text-[#70635e]"><span className="font-semibold text-[#2f1b16]">Allergen advice: </span>{product.allergenInfo}</p>}</div></section>
        {relatedProducts.length > 0 && <section className="mt-12"><div className="mb-6 flex items-end justify-between gap-4"><div><p className="section-eyebrow mb-2">Keep exploring</p><h2 className="page-title">You may also like</h2></div><Link href="/shop" className="text-sm font-bold text-[#5b6a35]">View all</Link></div><ProductGrid products={relatedProducts} /></section>}
      </div>
    </main>
    <Footer />
  </div>
}

export default function ProductPage() {
  return <Suspense fallback={<div className="min-h-screen grid place-items-center bg-[#fffcf7]"><Loader className="animate-spin text-[#5b6a35]" size={34} /></div>}><ProductDetails /></Suspense>
}
