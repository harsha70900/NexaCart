import api from "./axios";
import {
    type AddToCartRequest,
    type CartResponse,
    type UpdateCartRequest,
} from "../types/cart";

export async function addToCart(
    request: AddToCartRequest
): Promise<string> {

    const response = await api.post<{ message: string }>(
        "/customer/cart",
        request
    );

    return response.data.message;
}

export async function getCart(): Promise<CartResponse> {

    const response = await api.get<CartResponse>(
        "/customer/cart"
    );

    return response.data;
}

export async function updateCartItem(
    cartItemId: number,
    request: UpdateCartRequest
): Promise<string> {

    const response = await api.put<{ message: string }>(
        `/customer/cart/${cartItemId}`,
        request
    );

    return response.data.message;
}

export async function removeCartItem(
    cartItemId: number
): Promise<string> {

    const response = await api.delete<{ message: string }>(
        `/customer/cart/${cartItemId}`
    );

    return response.data.message;
}