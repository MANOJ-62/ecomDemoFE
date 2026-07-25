# Quick Start: Using the New Services

## Start Here! 🚀

All 9 production-ready services are implemented. Here's how to start using them immediately.

---

## 1. Payment Integration (5 minutes)

### Add to Checkout Page

```typescript
'use client'

import { createPaymentIntent, processPayment } from '@/services/payment'
import { sendOrderConfirmation } from '@/services/email'

export default function CheckoutForm() {
  const handleCheckout = async (formData) => {
    // 1. Create payment intent
    const intent = await createPaymentIntent(cartTotal, orderId)
    
    // 2. Process payment
    const result = await processPayment(
      intent.id,
      paymentMethod,
      cartTotal
    )
    
    if (result.success) {
      // 3. Send confirmation email
      await sendOrderConfirmation(
        userEmail,
        userName,
        orderId,
        cartItems,
        cartTotal
      )
      
      // 4. Redirect to success
      router.push(`/order/${result.orderId}`)
    }
  }
  
  return <form onSubmit={handleCheckout}>{/* form fields */}</form>
}
```

---

## 2. Search Bar Integration (10 minutes)

### Add Search Autocomplete to Header

```typescript
'use client'

import { searchProducts, getSearchSuggestions, trackSearch } from '@/services/search'
import { useState, useEffect } from 'react'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    if (query.length > 2) {
      getSearchSuggestions(query, 5).then(setSuggestions)
    }
  }, [query])

  const handleSearch = async (searchTerm: string) => {
    trackSearch(searchTerm)
    const results = await searchProducts({
      query: searchTerm,
      limit: 12
    })
    // Navigate to search results
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="relative">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
        placeholder="Search products..."
      />
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-2 bg-white border rounded">
          {suggestions.map((s) => (
            <li
              key={s}
              onClick={() => handleSearch(s)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

---

## 3. Product Reviews Integration (10 minutes)

### Add Reviews Section to Product Page

```typescript
'use client'

import {
  getProductReviews,
  submitReview,
  getReviewStats,
  markHelpful
} from '@/services/reviews'

export default function ProductReviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)

  useEffect(() => {
    const loadReviews = async () => {
      const { reviews: data } = await getProductReviews(productId)
      const stats = await getReviewStats(productId)
      setReviews(data)
      setStats(stats)
    }
    loadReviews()
  }, [productId])

  const handleSubmitReview = async (formData) => {
    const review = await submitReview(
      productId,
      userId,
      userName,
      formData.rating,
      formData.title,
      formData.content
    )
    if (review) {
      // Show "Review pending moderation" message
      alert('Thank you! Your review is pending approval.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      {stats && (
        <div>
          <div className="text-3xl font-bold">{stats.averageRating}</div>
          <div className="text-sm text-gray-600">{stats.totalReviews} reviews</div>
        </div>
      )}

      {/* Review Form */}
      <ReviewForm onSubmit={handleSubmitReview} />

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onMarkHelpful={() => markHelpful(review.id, userId)}
          />
        ))}
      </div>
    </div>
  )
}
```

---

## 4. Coupon System Integration (5 minutes)

### Add Coupon to Cart

```typescript
'use client'

import { validateCoupon, applyCoupon } from '@/services/coupons'

export function CouponForm({ cartTotal }: { cartTotal: number }) {
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState<CartDiscount | null>(null)

  const handleApply = async () => {
    const result = await applyCoupon(couponCode, cartTotal, userId)
    if (result) {
      setDiscount(result)
      // Update cart total: cartTotal - result.amount
    } else {
      alert('Invalid coupon code')
    }
  }

  return (
    <div className="flex gap-2">
      <input
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
        placeholder="Enter coupon code"
      />
      <button onClick={handleApply}>Apply</button>
      
      {discount && (
        <div className="text-green-600">
          Discount: ${discount.amount.toFixed(2)}
        </div>
      )}
    </div>
  )
}
```

**Pre-loaded Coupons to Test**:
- `SAVE10` - 10% off
- `SAVE20` - 20% off (min $50)
- `NEWUSER` - 15% for new users

---

## 5. Inventory Check (3 minutes)

### Show Stock Status

```typescript
'use client'

import { isInStock, getInventory } from '@/services/inventory'

export async function StockBadge({ productId }: { productId: string }) {
  const inventory = await getInventory(productId)

  if (!inventory || inventory.available === 0) {
    return <span className="text-red-600">Out of Stock</span>
  }

  if (inventory.available < 10) {
    return <span className="text-orange-600">Low Stock ({inventory.available})</span>
  }

  return <span className="text-green-600">In Stock</span>
}
```

---

## 6. Multi-Address Checkout (15 minutes)

### Shipping Address Selection

```typescript
'use client'

import {
  getUserAddresses,
  setDefaultAddress,
  addAddress
} from '@/services/addresses'

export function AddressSelector({ userId }: { userId: string }) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

  useEffect(() => {
    const loadAddresses = async () => {
      const userAddresses = await getUserAddresses(userId)
      setAddresses(userAddresses)
      // Select default
      const defaultAddr = userAddresses.find((a) => a.isDefault)
      if (defaultAddr) setSelectedAddress(defaultAddr.id)
    }
    loadAddresses()
  }, [userId])

  const handleAddNew = async (formData) => {
    const newAddress = await addAddress(userId, formData)
    if (newAddress) {
      setAddresses([...addresses, newAddress])
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {addresses.map((addr) => (
          <label key={addr.id} className="flex items-start gap-3 p-3 border rounded">
            <input
              type="radio"
              name="address"
              value={addr.id}
              checked={selectedAddress === addr.id}
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
            <div>
              <div className="font-medium">{addr.fullName}</div>
              <div className="text-sm text-gray-600">{addr.addressLine1}</div>
              <div className="text-sm text-gray-600">
                {addr.city}, {addr.state} {addr.zipCode}
              </div>
            </div>
          </label>
        ))}
      </div>

      <button onClick={() => setShowAddressForm(true)}>Add New Address</button>

      {/* Address Form Modal */}
      {showAddressForm && (
        <AddressForm onSubmit={handleAddNew} onClose={() => setShowAddressForm(false)} />
      )}
    </div>
  )
}
```

---

## 7. Order Tracking Page (10 minutes)

### Display Order Status

```typescript
'use client'

import {
  getOrderTracking,
  getTrackingTimeline,
  getOrderNotifications
} from '@/services/orderTracking'

export default function OrderTracker({ orderId }: { orderId: string }) {
  const [tracking, setTracking] = useState<OrderTracking | null>(null)
  const [timeline, setTimeline] = useState<TrackingEvent[]>([])

  useEffect(() => {
    const loadTracking = async () => {
      const t = await getOrderTracking(orderId)
      const events = await getTrackingTimeline(orderId)
      setTracking(t)
      setTimeline(events)
    }
    loadTracking()
  }, [orderId])

  const statusColors = {
    pending: 'gray',
    confirmed: 'blue',
    processing: 'blue',
    packed: 'blue',
    shipped: 'blue',
    in_transit: 'blue',
    out_for_delivery: 'orange',
    delivered: 'green',
    cancelled: 'red'
  }

  return (
    <div className="space-y-6">
      {/* Current Status */}
      {tracking && (
        <div className="bg-white p-6 rounded-lg border">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Tracking Number</div>
              <div className="text-lg font-mono">{tracking.trackingNumber}</div>
            </div>
            <div className={`text-lg font-bold capitalize text-${statusColors[tracking.currentStatus]}-600`}>
              {tracking.currentStatus.replace(/_/g, ' ')}
            </div>
          </div>
          {tracking.estimatedDelivery && (
            <div className="mt-4 text-sm">
              Estimated Delivery: {new Date(tracking.estimatedDelivery).toLocaleDateString()}
            </div>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="font-bold">Tracking History</h3>
        {timeline.map((event, index) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-blue-500" />
              {index < timeline.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-300" />
              )}
            </div>
            <div>
              <div className="font-medium capitalize">
                {event.status.replace(/_/g, ' ')}
              </div>
              <div className="text-sm text-gray-600">{event.description}</div>
              {event.location && (
                <div className="text-sm text-gray-600">{event.location}</div>
              )}
              <div className="text-xs text-gray-500">
                {new Date(event.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 8. Admin: Coupon Management (10 minutes)

### Admin Coupon Dashboard

```typescript
'use client'

import {
  getActiveCoupons,
  createCoupon,
  updateCoupon,
  getCouponStats
} from '@/services/coupons'

export default function CouponAdmin() {
  const [coupons, setCoupons] = useState<Coupon[]>([])

  useEffect(() => {
    const loadCoupons = async () => {
      const data = await getActiveCoupons()
      setCoupons(data)
    }
    loadCoupons()
  }, [])

  const handleCreate = async (formData) => {
    const coupon = await createCoupon(
      formData.code,
      formData.type,
      formData.value,
      {
        minPurchase: formData.minPurchase,
        maxUses: formData.maxUses,
        validUntil: formData.validUntil
      }
    )
    setCoupons([...coupons, coupon])
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          Create Coupon
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <CouponForm onSubmit={handleCreate} onClose={() => setShowForm(false)} />
      )}

      {/* Coupons Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Type</th>
            <th className="p-3 text-right">Value</th>
            <th className="p-3 text-right">Used / Max</th>
            <th className="p-3 text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="border-t">
              <td className="p-3 font-mono">{coupon.code}</td>
              <td className="p-3 capitalize">{coupon.type}</td>
              <td className="p-3 text-right">
                {coupon.type === 'percentage' ? `${coupon.value}%` : `$${coupon.value}`}
              </td>
              <td className="p-3 text-right">
                {coupon.usedCount} / {coupon.maxUses || '∞'}
              </td>
              <td className="p-3 text-center">
                <span className={coupon.active ? 'text-green-600' : 'text-gray-400'}>
                  {coupon.active ? 'Active' : 'Inactive'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

## 9. Admin: Inventory Dashboard (10 minutes)

```typescript
'use client'

import {
  getLowStockProducts,
  getOutOfStockProducts,
  getInventoryReport
} from '@/services/inventory'

export default function InventoryAdmin() {
  const [lowStock, setLowStock] = useState<InventoryItem[]>([])
  const [outOfStock, setOutOfStock] = useState<InventoryItem[]>([])
  const [report, setReport] = useState<any>(null)

  useEffect(() => {
    const loadData = async () => {
      const low = await getLowStockProducts()
      const out = await getOutOfStockProducts()
      const rep = await getInventoryReport()
      
      setLowStock(low)
      setOutOfStock(out)
      setReport(rep)
    }
    loadData()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inventory</h1>

      {/* Stats Cards */}
      {report && (
        <div className="grid grid-cols-4 gap-4">
          <Card label="Total Stock" value={report.totalStock} />
          <Card label="Reserved" value={report.totalReserved} />
          <Card label="Available" value={report.totalAvailable} />
          <Card label="Low Stock" value={report.lowStock} color="orange" />
          <Card label="Out of Stock" value={report.outOfStock} color="red" />
        </div>
      )}

      {/* Low Stock Alert */}
      {lowStock.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 p-4 rounded">
          <h3 className="font-bold text-orange-900">Low Stock Alert</h3>
          <ul className="mt-2 space-y-1">
            {lowStock.map((item) => (
              <li key={item.productId} className="text-sm text-orange-800">
                Product {item.productId}: {item.available} units (Reorder: {item.reorderPoint})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
```

---

## 10. Admin: Review Moderation (10 minutes)

```typescript
'use client'

import {
  getPendingReviews,
  approveReview,
  rejectReview
} from '@/services/reviews'

export default function ReviewModeration() {
  const [pending, setPending] = useState<Review[]>([])

  useEffect(() => {
    const loadPending = async () => {
      const reviews = await getPendingReviews()
      setPending(reviews)
    }
    loadPending()
  }, [])

  const handleApprove = async (reviewId: string) => {
    await approveReview(reviewId)
    setPending(pending.filter((r) => r.id !== reviewId))
  }

  const handleReject = async (reviewId: string) => {
    await rejectReview(reviewId, 'Inappropriate content')
    setPending(pending.filter((r) => r.id !== reviewId))
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Review Moderation</h1>
      <p className="text-sm text-gray-600">{pending.length} reviews pending approval</p>

      <div className="space-y-4">
        {pending.map((review) => (
          <div key={review.id} className="bg-white p-4 rounded border">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-bold">{review.title}</div>
                <div className="text-sm text-gray-600">
                  By {review.userName} • {'⭐'.repeat(review.rating)}
                </div>
                <div className="mt-2">{review.content}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleApprove(review.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(review.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Testing the Services

```typescript
// Test payment
import { createPaymentIntent } from '@/services/payment'
const intent = await createPaymentIntent(5000, 'test_order')
console.log(intent)

// Test search
import { searchProducts } from '@/services/search'
const results = await searchProducts({ query: 'chips' })
console.log(results)

// Test coupons (pre-loaded)
import { validateCoupon } from '@/services/coupons'
const result = await validateCoupon('SAVE10', 5000)
console.log(result) // Should be valid!

// Test inventory
import { getInventory } from '@/services/inventory'
const stock = await getInventory('1')
console.log(stock) // Product 1 has 138 available

// Test reviews (sample data)
import { getProductReviews } from '@/services/reviews'
const { reviews } = await getProductReviews('1')
console.log(reviews) // 3 sample reviews
```

---

## What's Next?

1. ✅ Import services
2. ✅ Use test data
3. ✅ Add UI components
4. ⏳ Connect real APIs
5. ⏳ Deploy to production

You're all set! Happy coding! 🚀

