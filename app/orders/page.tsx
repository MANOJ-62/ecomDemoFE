'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getMyOrders } from '@/services/orders'
import { isAuthenticated } from '@/services/auth'
import { Order } from '@/types'
import { Loader, Package } from 'lucide-react'

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login?next=%2Forders')
      return
    }
    getMyOrders().then(setOrders).catch(() => setError('Unable to load your orders.')).finally(() => setLoading(false))
  }, [router])

  return <div className="min-h-screen bg-[#fff8eb] flex flex-col">
    <Header />
    <main className="flex-1 container-custom py-12">
      <span className="electric-kicker mb-5">Your snack trail</span>
      <h1 className="electric-title text-5xl md:text-7xl text-gray-900 mb-3">Order history</h1>
      <p className="text-gray-600 mb-8">Your orders are loaded from your account.</p>
      {loading && <Loader className="animate-spin text-emerald-600" />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && orders.length === 0 && <div className="py-16 text-center text-gray-600"><Package className="mx-auto mb-3 text-gray-300" size={48} />You have not placed any orders yet.</div>}
      <div className="space-y-4">
        {orders.map((order) => <article key={order.id} className="electric-card p-6">
          <div className="flex flex-wrap justify-between gap-4 border-b border-gray-100 pb-4">
            <div><p className="text-sm text-gray-500">Order</p><p className="font-bold text-gray-900">{order.id}</p></div>
            <div><p className="text-sm text-gray-500">Placed</p><p>{new Date(order.createdAt).toLocaleDateString()}</p></div>
            <div><p className="text-sm text-gray-500">Total</p><p className="font-bold">₹{order.total.toFixed(2)}</p></div>
            <span className="self-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold capitalize">{order.status}</span>
          </div>
          <ul className="mt-4 space-y-2">{order.items.map((item, index) => <li key={`${item.productId}-${index}`} className="flex justify-between text-sm"><span>{item.product.name}{item.flavor ? ` — ${item.flavor}` : ''} × {item.quantity}</span><span>₹{(item.product.price * item.quantity).toFixed(2)}</span></li>)}</ul>
        </article>)}
      </div>
    </main>
    <Footer />
  </div>
}
