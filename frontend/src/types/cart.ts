export interface AddToCartRequest {
    productId: number;
    quantity: number;
}

export interface UpdateCartRequest {
    quantity: number;
}

export interface CartItem {
    cartItemId: number;
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
    category: string;
    imageUrl: string;
}

export interface CartResponse {
    items: CartItem[];
    totalAmount: number;
}