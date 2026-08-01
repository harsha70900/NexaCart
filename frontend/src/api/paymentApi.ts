import api from "./axios";
import type {
    CreatePaymentOrderResponse,
    VerifyPaymentRequest,
} from "../types/payment";

export async function createPaymentOrder(): Promise<CreatePaymentOrderResponse> {

    const response = await api.post<CreatePaymentOrderResponse>(
        "/customer/payment/create-order"
    );

    return response.data;
}

export async function verifyPayment(
    request: VerifyPaymentRequest
): Promise<string> {

    const response = await api.post<{ message: string }>(
        "/customer/payment/verify",
        request
    );

    return response.data.message;
}