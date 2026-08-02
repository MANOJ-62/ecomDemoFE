'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useAuth } from '@/hooks/useAuth'
import { Mail, Lock, Loader, Check, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()

  // const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')
  // const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
  
    setMessage('')
    setSuccess(false)
  
    if (!email || !password) {
      setMessage('Please enter email and password')
      return
    }
  
    const result = await login(email.toLowerCase(), password)
  
    if (result) {
      setSuccess(true)
      setMessage('Login successful! Redirecting...')
  
      setTimeout(() => {
        const next = new URLSearchParams(window.location.search).get('next')
        router.push(next || '/shop')
      }, 1000)
    } else {
      setMessage('Invalid email or password')
    }
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
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-200">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-2">Welcome to Hangrow</h1>
              <p className="text-gray-600">
                Sign in using your email and password
              </p>
            </motion.div>

            {/* Email Step */}
            

            {/* OTP Step */}
            <motion.form
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  onSubmit={handleLogin}
  className="space-y-4"
>
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Email Address
    </label>

    <div className="relative">
      <Mail className="absolute left-3 top-3 text-emerald-600" size={20} />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600"
      />
    </div>
  </div>

  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      Password
    </label>

    <div className="relative">
      <Lock className="absolute left-3 top-3 text-emerald-600" size={20} />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600"
      />
    </div>
  </div>

  {message && (
    <div
      className={`p-4 rounded-lg ${
        success
          ? 'bg-green-50 border border-green-200'
          : 'bg-red-50 border border-red-200'
      }`}
    >
      <p>{message}</p>
    </div>
  )}

  <button
    type="submit"
    disabled={isLoading}
    className="w-full btn-primary"
  >
    {isLoading ? (
      <>
        <Loader className="animate-spin inline mr-2" size={18} />
        Logging in...
      </>
    ) : (
      'Login'
    )}
  </button>

  <p className="text-center text-sm">
    Don't have an account?{' '}
    <Link href="/register" className="text-emerald-600 font-semibold">
      Register
    </Link>
  </p>
</motion.form>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-center text-sm text-gray-600"
            >
              <p>
                By logging in, you agree to our{' '}
                <Link href="/terms" className="text-emerald-600 hover:underline font-semibold">
                  Terms of Service
                </Link>
              </p>
            </motion.div>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
