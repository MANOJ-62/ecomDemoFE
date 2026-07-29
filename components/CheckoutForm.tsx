'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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

  paymentMethod: z.enum([
    'COD',
    'UPI'
  ])
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => Promise<void>
  isLoading?: boolean
}

export const CheckoutForm = ({
  onSubmit,
  isLoading,
}: CheckoutFormProps) => {

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),

    defaultValues: {
      paymentMethod: 'COD',
      country: 'India',
    },
  })

  const loading = isSubmitting || isLoading

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      {/* First Name + Last Name */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>

          <input
            {...register("firstName")}
            className="input-field"
            placeholder="John"
          />

          {errors.firstName && (
            <p className="text-xs text-red-600 mt-1">
              {errors.firstName.message}
            </p>
          )}

        </div>

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>

          <input
            {...register("lastName")}
            className="input-field"
            placeholder="Doe"
          />

          {errors.lastName && (
            <p className="text-xs text-red-600 mt-1">
              {errors.lastName.message}
            </p>
          )}

        </div>

      </div>

      {/* Email */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>

        <input
          {...register("email")}
          type="email"
          className="input-field"
        />

        {errors.email && (
          <p className="text-xs text-red-600 mt-1">
            {errors.email.message}
          </p>
        )}

      </div>

      {/* Phone */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>

        <input
          {...register("phone")}
          className="input-field"
        />

        {errors.phone && (
          <p className="text-xs text-red-600 mt-1">
            {errors.phone.message}
          </p>
        )}

      </div>

      {/* Address */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address
        </label>

        <input
          {...register("address")}
          className="input-field"
        />

        {errors.address && (
          <p className="text-xs text-red-600 mt-1">
            {errors.address.message}
          </p>
        )}

      </div>

      {/* City State Zip */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>

          <input
            {...register("city")}
            className="input-field"
          />

        </div>

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>

          <input
            {...register("state")}
            className="input-field"
          />

        </div>

        <div>

          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>

          <input
            {...register("zipCode")}
            className="input-field"
          />

        </div>

      </div>

      {/* Country */}

      <div>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>

        <input
          {...register("country")}
          className="input-field"
        />

      </div>

      {/* Payment Method */}

      <div className="border rounded-lg p-5">

        <h3 className="text-lg font-semibold mb-4">
          Payment Method
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="radio"
              value="COD"
              {...register("paymentMethod")}
            />

            <div>

              <p className="font-medium">
                Cash on Delivery
              </p>

              <p className="text-sm text-gray-500">
                Pay when your order is delivered.
              </p>

            </div>

          </label>

          <label className="flex items-center gap-3 cursor-pointer">

            <input
              type="radio"
              value="UPI"
              {...register("paymentMethod")}
            />

            <div>

              <p className="font-medium">
                Pay Online (Razorpay)
              </p>

              <p className="text-sm text-gray-500">
                UPI, Cards, Net Banking, Wallets
              </p>

            </div>

          </label>

        </div>

      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
      >

        {loading && (
          <Loader
            size={18}
            className="animate-spin"
          />
        )}

        {loading
          ? "Processing..."
          : "Place Order"}

      </button>

    </form>
  )

}