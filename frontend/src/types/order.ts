export interface OrderSummary {
    orderId: number;
    totalAmount: number;
    status: string;
}

export interface OrderItem {
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
    imageUrl: string;
}

export interface OrderDetails {
    orderId: number;
    totalAmount: number;
    status: string;
    items: OrderItem[];
}