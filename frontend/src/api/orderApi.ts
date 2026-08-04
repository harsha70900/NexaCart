import api from "./axios";
import type {
    OrderSummary,
    OrderDetails,
} from "../types/order";

export async function getOrders(): Promise<OrderSummary[]> {

    const response = await api.get<OrderSummary[]>(
        "/customer/orders"
    );

    return response.data;
}

export async function getOrder(
    orderId: number
): Promise<OrderDetails> {

    const response = await api.get<OrderDetails>(
        `/customer/orders/${orderId}`
    );

    return response.data;
}