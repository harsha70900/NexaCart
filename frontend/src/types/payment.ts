export interface CreatePaymentOrderResponse {
    localOrderId: number;
    razorpayOrderId: string;
    amount: number;
    currency: string;
    keyId: string;
}

export interface VerifyPaymentRequest {
    localOrderId: number;
    razorpayOrderId: string;
    razorpayPaymentId: string;
    razorpaySignature: string;
}