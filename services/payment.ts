import api, { unwrapApiResponse } from "./apiClient";
import {
  ApiResponse,
  CreatePaymentResponse,
  PaymentResponse,
} from "./types/backend";
import { ApiNotAvailableError } from "./errors";
import { loadRazorpay } from "./utils/loadRazorpay";

export interface PaymentIntent {
  paymentId: number;
  gatewayOrderId: string;
  gatewayKey: string;
  currency: string;
  amount: number;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "upi" | "netbanking";

  last4?: string;

  brand?: string;

  expiryMonth?: number;

  expiryYear?: number;
}

export interface PaymentResult {
  success: boolean;

  transactionId: string;

  message: string;

  orderId?: string;
}

export async function initializeRazorpay(): Promise<void> {
  const loaded = await loadRazorpay();

  if (!loaded) {
    throw new Error("Unable to load Razorpay SDK.");
  }
}

export async function createPaymentIntent(
  orderId: string
): Promise<PaymentIntent> {
  const response = await api.post<ApiResponse<CreatePaymentResponse>>(
    "/payments/create",
    {
      orderId: Number(orderId),
      gateway: "RAZORPAY",
    }
  );

  const payment = unwrapApiResponse(response);

  return {
    paymentId: payment.paymentId,
    gatewayOrderId: payment.gatewayOrderId,
    gatewayKey: payment.gatewayKey,
    currency: payment.currency,
    amount: Math.round(Number(payment.amount) * 100),
  };
}

export async function verifyPayment(payload: {
  orderId: number;
  gatewayOrderId: string;
  gatewayPaymentId: string;
  gatewaySignature: string;
}): Promise<PaymentResult> {
  const response = await api.post<ApiResponse<PaymentResponse>>(
    "/payments/verify",
    payload
  );

  const payment = unwrapApiResponse(response);

  return {
    success: payment.paymentStatus === "PAID",
    transactionId:
      payment.gatewayPaymentId ?? String(payment.paymentId),
    message:
      payment.paymentStatus === "PAID"
        ? "Payment successful"
        : "Payment verification failed",
    orderId: String(payment.orderId),
  };
}

export async function getPaymentByOrderId(
  orderId: number
): Promise<PaymentResponse | null> {
  try {
    const response = await api.get<ApiResponse<PaymentResponse>>(
      `/payments/${orderId}`
    );

    return unwrapApiResponse(response);
  } catch {
    return null;
  }
}

export const processPayment = async () => {
  throw new ApiNotAvailableError("Not Required For Razorpay");
};

export const refundPayment = async () => {
  throw new ApiNotAvailableError("Refund API Not Implemented");
};

export const getSavedPaymentMethods = async () => {
  throw new ApiNotAvailableError("Not Implemented");
};

export const savePaymentMethod = async () => {
  throw new ApiNotAvailableError("Not Implemented");
};

export const generateInvoice = async () => {
  throw new ApiNotAvailableError("Not Implemented");
};

export const getPaymentHistory = async () => {
  throw new ApiNotAvailableError("Not Implemented");
};

export const handlePaymentWebhook = async () => {
  throw new ApiNotAvailableError("Webhook Not Implemented");
};