import type { Product } from "../types/product";

const fallbackProducts: Product[] = [
    {
        id: 1,
        name: "Wireless Noise Cancelling Headphones",
        description:
            "Premium wireless headphones with active noise cancellation and long battery life.",
        price: 5999,
        stock: 25,
        category: "Audio",
        imageUrl:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },

    {
        id: 2,
        name: "Mechanical Gaming Keyboard",
        description:
            "RGB mechanical keyboard with tactile switches designed for gaming and productivity.",
        price: 3499,
        stock: 40,
        category: "Computer Accessories",
        imageUrl:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    },

    {
        id: 3,
        name: "Smartphone Pro 5G",
        description:
            "High-performance 5G smartphone with a modern display and powerful processor.",
        price: 29999,
        stock: 15,
        category: "Mobiles",
        imageUrl:
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },

    {
        id: 4,
        name: "Wireless Gaming Mouse",
        description:
            "Ergonomic wireless gaming mouse with adjustable DPI and low-latency connectivity.",
        price: 1999,
        stock: 35,
        category: "Computer Accessories",
        imageUrl:
            "https://images.unsplash.com/photo-1527814050087-3793815479db",
    },

    {
        id: 5,
        name: "Smart Watch Series X",
        description:
            "Smart fitness watch with health tracking, notifications and activity monitoring.",
        price: 4499,
        stock: 20,
        category: "Wearables",
        imageUrl:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },

    {
        id: 6,
        name: "Portable Bluetooth Speaker",
        description:
            "Compact Bluetooth speaker with powerful audio and all-day battery life.",
        price: 2499,
        stock: 30,
        category: "Audio",
        imageUrl:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    },
];

export default fallbackProducts;