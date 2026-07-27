import api from "./axios";

export async function addToCart(productId: number) {
    const response = await api.post("/customer/cart", {
        productId,
        quantity: 1,
    });

    return response.data;
}