import api, { unwrapApiResponse } from './apiClient'
import { ApiResponse, CreatePaymentResponse, PaymentResponse } from './types/backend'
import { ApiNotAvailableError } from './errors'

export interface PaymentIntent {
  id: string
  clientSecret: string
  amount: number
  currency: string
  status:
    | 'requires_payment_method'
    | 'requires_confirmation'
    | 'requires_action'
    | 'processing'
    | 'succeeded'
    | 'requires_capture'
    | 'canceled'
}

export interface PaymentMethod {
  id: string
  type: 'card' | 'upi' | 'netbanking'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
}

export interface PaymentResult {
  success: boolean
  transactionId: string
  message: string
  orderId?: string
}

function mapCreatePaymentResponse(response: CreatePaymentResponse): PaymentIntent {
  return {
    id: String(response.paymentId),
    clientSecret: response.gatewayOrderId,
    amount: Number(response.amount),
    currency: response.currency,
    status: 'requires_payment_method',
  }
}

function mapPaymentStatus(status: PaymentResponse['paymentStatus']): PaymentIntent['status'] {
  switch (status) {
    case 'PAID':
      return 'succeeded'
    case 'FAILED':
      return 'canceled'
    case 'PENDING':
      return 'processing'
    default:
      return 'processing'
  }
}

export const createPaymentIntent = async (amount: number, orderId: string): Promise<PaymentIntent> => {
  const response = await api.post<ApiResponse<CreatePaymentResponse>>('/payments/create', {
    orderId: Number(orderId),
    gateway: 'RAZORPAY',
  })
  const data = unwrapApiResponse(response)
  const intent = mapCreatePaymentResponse(data)
  return {
    ...intent,
    amount,
  }
}

export const processPayment = async (
  paymentIntentId: string,
  _paymentMethod: PaymentMethod,
  _amount: number
): Promise<PaymentResult> => {
  throw new ApiNotAvailableError('POST /api/payments/process')
}

export const verifyPayment = async (payload: {
  orderId: number
  gatewayOrderId: string
  gatewayPaymentId: string
  gatewaySignature: string
}): Promise<PaymentResult> => {
  const response = await api.post<ApiResponse<PaymentResponse>>('/payments/verify', payload)
  const data = unwrapApiResponse(response)

  return {
    success: data.paymentStatus === 'PAID',
    transactionId: data.gatewayPaymentId ?? String(data.paymentId),
    message: data.paymentStatus === 'PAID' ? 'Payment successful' : 'Payment verification failed',
    orderId: String(data.orderId),
  }
}

export const getPaymentByOrderId = async (orderId: number): Promise<PaymentIntent | null> => {
  try {
    const response = await api.get<ApiResponse<PaymentResponse>>(`/payments/${orderId}`)
    const data = unwrapApiResponse(response)
    return {
      id: String(data.paymentId),
      clientSecret: data.gatewayOrderId ?? '',
      amount: data.amount,
      currency: data.currency,
      status: mapPaymentStatus(data.paymentStatus),
    }
  } catch {
    return null
  }
}

export const refundPayment = async (_transactionId: string, _amount: number): Promise<boolean> => {
  throw new ApiNotAvailableError('POST /api/payments/refund')
}

export const getSavedPaymentMethods = async (_userId: string): Promise<PaymentMethod[]> => {
  throw new ApiNotAvailableError('GET /api/payments/methods')
}

export const savePaymentMethod = async (_userId: string, _paymentMethod: PaymentMethod): Promise<boolean> => {
  throw new ApiNotAvailableError('POST /api/payments/methods')
}

export const generateInvoice = async (_orderId: string, _amount: number): Promise<string> => {
  throw new ApiNotAvailableError('POST /api/payments/invoice')
}

export const getPaymentHistory = async (_userId: string) => {
  throw new ApiNotAvailableError('GET /api/payments/history')
}

export const handlePaymentWebhook = async (_event: unknown): Promise<boolean> => {
  throw new ApiNotAvailableError('POST /api/payments/webhook')
}
