'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Loader } from 'lucide-react'

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  address: z.string().min(5, 'Address required'),
  city: z.string().min(2, 'City required'),
  state: z.string().min(2, 'State required'),
  zipCode: z.string().min(5, 'ZIP code required'),
  country: z.string().min(2, 'Country required'),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>
  isLoading?: boolean
}

export const CheckoutForm = ({ onSubmit, isLoading }: CheckoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  const loading = isSubmitting || isLoading

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            {...register('firstName')}
            className="input-field"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-red-600 text-xs mt-1">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            {...register('lastName')}
            className="input-field"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-red-600 text-xs mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          className="input-field"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          {...register('phone')}
          type="tel"
          className="input-field"
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>
        <input
          {...register('address')}
          className="input-field"
          placeholder="123 Main Street"
        />
        {errors.address && (
          <p className="text-red-600 text-xs mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            {...register('city')}
            className="input-field"
            placeholder="Chennai"
          />
          {errors.city && (
            <p className="text-red-600 text-xs mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            {...register('state')}
            className="input-field"
            placeholder="Tamil Nadu"
          />
          {errors.state && (
            <p className="text-red-600 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            {...register('zipCode')}
            className="input-field"
            placeholder="10001"
          />
          {errors.zipCode && (
            <p className="text-red-600 text-xs mt-1">{errors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
          
        <input
          {...register('country')}
          className="input-field"
          placeholder="India"
        />
        {errors.country && (
          <p className="text-red-600 text-xs mt-1">{errors.country.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading && <Loader size={18} className="animate-spin" />}
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  )
}
