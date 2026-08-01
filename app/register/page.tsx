'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/hooks/useAuth'
import {
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle,
  Loader,
  ArrowRight,
  ArrowLeft,
  Clock,
  Send,
} from 'lucide-react'
import {
    sendRegistrationOtp,
    formatExpiryTime,
    isValidEmail,
    validatePasswordStrength,
    verifyRegistrationOtp,
  } from '@/services/otp'


type RegistrationStep = 'email' | 'otp' | 'details' | 'complete'

interface RegistrationFormData {
  email: string
  firstName: string
  lastName: string
  phone: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading } = useAuth()

  const [step, setStep] = useState<RegistrationStep>('email')
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [otp, setOtp] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'error' | 'success' | 'info'>('error')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expiryTime, setExpiryTime] = useState(0)
  const [otpSession, setOtpSession] = useState<any>(null)

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    setErrors({})
    setMessage('')
  
    if (!formData.email.trim()) {
      setErrors({
        email: 'Email is required',
      })
      return
    }
  
    if (!isValidEmail(formData.email)) {
      setErrors({
        email: 'Invalid email',
      })
      return
    }
  
    setIsSubmitting(true)
  
    try {
      await sendRegistrationOtp({
        email: formData.email,
      })
  
      setMessage('OTP sent successfully.')
  
      setMessageType('success')
  
      setStep('otp')
  
      setOtp('')
    } catch (e: any) {
      setMessage(
        e?.response?.data?.message ??
          e.message ??
          'Unable to send OTP'
      )
  
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    setErrors({})
    setMessage('')
  
    if (otp.length != 6) {
      setErrors({
        otp: 'OTP must be 6 digits',
      })
  
      return
    }
  
    setIsSubmitting(true)
  
    try {
      await verifyRegistrationOtp({
        email: formData.email,
        otp,
      })
  
      setMessage('OTP verified successfully.')
  
      setMessageType('success')
  
      setTimeout(() => {
        setStep('details')
      }, 500)
    } catch (e: any) {
      setMessage(
        e?.response?.data?.message ??
          e.message ??
          'Invalid OTP'
      )
  
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setMessage('')

    const newErrors: Record<string, string> = {}

    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else {
      const passwordValidation = validatePasswordStrength(formData.password)
      if (!passwordValidation.valid) {
        newErrors.password = passwordValidation.message
      }
    }

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      // Register user
      const result = await register({
        firstName: formData.firstName,
        lastName: formData.lastName || undefined,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
      })

      if (result) {
        setMessage('Registration successful!')
        setMessageType('success')
        setStep('complete')

        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        setMessage('Registration failed. Please try again.')
        setMessageType('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof RegistrationFormData
  ) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    clearError(field)
  }

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    setOtp(value)
    clearError('otp')
  }

  const handleBackClick = () => {
    if (step === 'otp') {
      setStep('email')
      setOtp('')
      setMessage('')
    } else if (step === 'details') {
      setStep('otp')
      setMessage('')
    }
  }

  const handleResendOtp = async () => {
    setIsSubmitting(true)
  
    try {
      await sendRegistrationOtp({
        email: formData.email,
      })
  
      setMessage('OTP sent again.')
  
      setMessageType('success')
  
      setOtp('')
    } catch (e: any) {
      setMessage(
        e?.response?.data?.message ??
          e.message ??
          'Unable to resend OTP'
      )
  
      setMessageType('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const progressPercentage = {
    email: 25,
    otp: 50,
    details: 75,
    complete: 100,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-amber-50 to-orange-50 flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-200">
            {/* Progress Bar */}
            <div className="h-1 bg-gray-200">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-600 to-amber-600"
                animate={{ width: `${progressPercentage[step]}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="p-8">
              {/* Header */}
              <motion.div
                key={`header-${step}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl font-bold gradient-text mb-2">Join Divaksha</h1>
                <p className="text-gray-600">
                  {step === 'email' && 'Enter your email to get started'}
                  {step === 'otp' && 'Verify your email with OTP'}
                  {step === 'details' && 'Complete your profile'}
                  {step === 'complete' && 'Welcome to Divaksha!'}
                </p>
              </motion.div>

              {/* Step Indicator */}
              <div className="flex justify-between mb-6 text-sm">
                <div className={`text-center ${step === 'email' ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
                  <div className="w-6 h-6 rounded-full border-2 mx-auto mb-1 flex items-center justify-center"
                    style={{ borderColor: progressPercentage[step] >= 25 ? '#9333ea' : '#d1d5db' }}>
                    1
                  </div>
                </div>
                <div className="flex-1 border-t-2 mx-2 mt-3" style={{ borderColor: progressPercentage[step] >= 50 ? '#9333ea' : '#d1d5db' }} />
                <div className={`text-center ${step === 'otp' ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
                  <div className="w-6 h-6 rounded-full border-2 mx-auto mb-1 flex items-center justify-center"
                    style={{ borderColor: progressPercentage[step] >= 50 ? '#9333ea' : '#d1d5db' }}>
                    2
                  </div>
                </div>
                <div className="flex-1 border-t-2 mx-2 mt-3" style={{ borderColor: progressPercentage[step] >= 75 ? '#9333ea' : '#d1d5db' }} />
                <div className={`text-center ${step === 'details' ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
                  <div className="w-6 h-6 rounded-full border-2 mx-auto mb-1 flex items-center justify-center"
                    style={{ borderColor: progressPercentage[step] >= 75 ? '#9333ea' : '#d1d5db' }}>
                    3
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* Step 1: Email */}
                {step === 'email' && (
                  <motion.form
                    key="email-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleEmailSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-emerald-600" size={20} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange(e, 'email')}
                          placeholder="john@example.com"
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                            errors.email
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-gray-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={16} />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {message && messageType === 'success' && (
                      <div className="p-4 rounded-lg border border-green-200 bg-green-50 flex items-center gap-2">
                        <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                        <p className="text-green-700 text-sm">{message}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin inline mr-2" size={18} />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send OTP <ArrowRight className="inline ml-2" size={18} />
                        </>
                      )}
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-6">
                      Already have an account?{' '}
                      <Link href="/login" className="text-emerald-600 font-semibold hover:underline">
                        Sign In
                      </Link>
                    </p>
                  </motion.form>
                )}

                {/* Step 2: OTP Verification */}
                {step === 'otp' && (
                  <motion.form
                    key="otp-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleOtpSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Enter OTP *
                      </label>
                      <p className="text-xs text-gray-600 mb-3">
                        We sent a 6-digit code to <span className="font-semibold">{formData.email}</span>
                      </p>
                      <input
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="000000"
                        maxLength={6}
                        className={`w-full px-4 py-4 border-2 rounded-lg text-center text-2xl tracking-widest font-mono focus:outline-none transition ${
                          errors.otp
                            ? 'border-red-500 focus:border-red-600'
                            : 'border-gray-200 focus:border-emerald-600'
                        }`}
                      />
                      {errors.otp && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={16} />
                          {errors.otp}
                        </p>
                      )}
                    </div>

                    {/* Expiry Timer */}
                    {expiryTime > 0 && (
                      <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-amber-800">
                          <Clock size={16} />
                          <span>OTP expires in {formatExpiryTime(expiryTime)}</span>
                        </div>
                      </div>
                    )}

                    {message && (
                      <div
                        className={`p-4 rounded-lg border flex items-center gap-2 ${
                          messageType === 'success'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        {messageType === 'success' ? (
                          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                        ) : (
                          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                        )}
                        <p className={messageType === 'success' ? 'text-green-700 text-sm' : 'text-red-700 text-sm'}>
                          {message}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin inline mr-2" size={18} />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify OTP <ArrowRight className="inline ml-2" size={18} />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 pt-4">
                      <button
                        type="button"
                        onClick={handleBackClick}
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                      >
                        <ArrowLeft className="inline mr-2" size={18} />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isSubmitting || expiryTime > 240} // Show after 1 minute
                        className="flex-1 px-4 py-2 border-2 border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition disabled:opacity-50"
                      >
                        <Send className="inline mr-2" size={18} />
                        Resend
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* Step 3: Account Details */}
                {step === 'details' && (
                  <motion.form
                    key="details-form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleDetailsSubmit}
                    className="space-y-4"
                  >
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-emerald-600" size={20} />
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange(e, 'firstName')}
                          placeholder="John"
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                            errors.firstName
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-gray-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.firstName && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={16} />
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-emerald-600" size={20} />
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange(e, 'lastName')}
                          placeholder="Doe"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-emerald-600" size={20} />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange(e, 'phone')}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 transition"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-emerald-600" size={20} />
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange(e, 'password')}
                          placeholder="••••••••"
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                            errors.password
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-gray-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={16} />
                          {errors.password}
                        </p>
                      )}
                      <p className="text-xs text-gray-600 mt-1">
                        At least 8 characters with uppercase, lowercase, and numbers
                      </p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-emerald-600" size={20} />
                        <input
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange(e, 'confirmPassword')}
                          placeholder="••••••••"
                          className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition ${
                            errors.confirmPassword
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-gray-200 focus:border-emerald-600'
                          }`}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={16} />
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    {message && (
                      <div
                        className={`p-4 rounded-lg border flex items-center gap-2 ${
                          messageType === 'success'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        {messageType === 'success' ? (
                          <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                        ) : (
                          <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                        )}
                        <p className={messageType === 'success' ? 'text-green-700 text-sm' : 'text-red-700 text-sm'}>
                          {message}
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="animate-spin inline mr-2" size={18} />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account <ArrowRight className="inline ml-2" size={18} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleBackClick}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition mt-2 disabled:opacity-50"
                    >
                      <ArrowLeft className="inline mr-2" size={18} />
                      Back
                    </button>
                  </motion.form>
                )}

                {/* Step 4: Complete */}
                {step === 'complete' && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6 }}
                      className="mb-4"
                    >
                      <CheckCircle className="text-green-600 mx-auto" size={64} />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete!</h2>
                    <p className="text-gray-600 mb-6">
                      Welcome to Divaksha! You&apos;re being redirected to login...
                    </p>
                    <div className="flex justify-center">
                      <Loader className="animate-spin text-emerald-600" size={24} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Terms */}
              {(step === 'email' || step === 'otp') && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 text-center text-xs text-gray-600"
                >
                  <p>
                    By registering, you agree to our{' '}
                    <Link href="/terms" className="text-emerald-600 hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-emerald-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </motion.div>
              )}
            </div>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
