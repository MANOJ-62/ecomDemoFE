export interface RazorpayCheckoutOptions {
  gatewayKey: string;
  gatewayOrderId: string;
  amount: number;
  currency: string;
  companyName?: string;
  description?: string;
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export function openRazorpayCheckout(
  options: RazorpayCheckoutOptions
): Promise<RazorpaySuccessResponse> {
  return new Promise((resolve, reject) => {
    const razorpay = new window.Razorpay({
      key: options.gatewayKey,

      amount: options.amount,

      currency: options.currency,

      order_id: options.gatewayOrderId,

      name: options.companyName ?? "Divaksha",

      description: options.description ?? "Order Payment",

      handler: function (response: RazorpaySuccessResponse) {
        resolve(response);
      },

      modal: {
        ondismiss() {
          reject(new Error("Payment cancelled by user"));
        },
      },

      theme: {
        color: "#16a34a",
      },
    });

    razorpay.open();
  });
}