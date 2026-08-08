import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
    ShoppingCart,
    Star,
    ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";

import { addToCart } from "../../api/cartApi";
import { useAuth } from "../../hooks/useAuth";

type ProductCardProps = {
    productId: number;
    name: string;
    price: number;
    image?: string;
    rating?: number;
    inStock?: boolean;
};

function ProductCard({
    productId,
    name,
    price,
    image,
    rating = 4.8,
    inStock = true,
}: ProductCardProps) {

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    const addToCartMutation = useMutation({

        mutationFn: addToCart,

        onSuccess: (message) => {

            toast.success(
                message || "Product added to cart successfully"
            );

        },

        onError: (error: any) => {

            toast.error(
                error?.response?.data?.message ??
                "Failed to add product to cart"
            );

        },

    });

    const handleAddToCart = () => {

        if (!isAuthenticated) {

            navigate("/login");

            return;
        }

        if (!inStock) {

            toast.error("This product is currently out of stock");

            return;
        }

        addToCartMutation.mutate({
            productId,
            quantity: 1,
        });

    };

    return (

        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl">

            {/* ================= PRODUCT IMAGE ================= */}

            <Link
                to={`/products/${productId}`}
                className="relative block overflow-hidden bg-slate-100"
            >

                <img
                    src={
                        image ||
                        "https://placehold.co/600x600?text=No+Image"
                    }
                    alt={name}
                    className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Stock Badge */}

                <div className="absolute left-4 top-4">

                    {inStock ? (

                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-600 shadow-sm backdrop-blur">
                            In Stock
                        </span>

                    ) : (

                        <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-red-500 shadow-sm backdrop-blur">
                            Out of Stock
                        </span>

                    )}

                </div>

            </Link>


            {/* ================= PRODUCT INFORMATION ================= */}

            <div className="p-5">

                {/* Product Name */}

                <Link
                    to={`/products/${productId}`}
                    className="block"
                >

                    <h3 className="line-clamp-2 min-h-[48px] text-lg font-bold leading-6 text-slate-900 transition-colors hover:text-blue-600">

                        {name}

                    </h3>

                </Link>


                {/* Rating */}

                <div className="mt-3 flex items-center gap-2">

                    <div className="flex items-center gap-1">

                        <Star
                            size={15}
                            className="fill-amber-400 text-amber-400"
                        />

                        <span className="text-sm font-semibold text-slate-700">
                            {rating.toFixed(1)}
                        </span>

                    </div>

                    <span className="text-xs text-slate-400">
                        Customer rating
                    </span>

                </div>


                {/* Price */}

                <div className="mt-4">

                    <span className="text-2xl font-bold tracking-tight text-slate-900">

                        ₹{price.toLocaleString("en-IN")}

                    </span>

                </div>


                {/* ================= ACTIONS ================= */}

                <div className="mt-5 space-y-3">

                    {/* Add To Cart */}

                    <button
                        onClick={handleAddToCart}
                        disabled={
                            !inStock ||
                            addToCartMutation.isPending
                        }
                        className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                            inStock
                                ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                                : "cursor-not-allowed bg-slate-100 text-slate-400"
                        }`}
                    >

                        <ShoppingCart size={17} />

                        {!inStock
                            ? "Out of Stock"
                            : addToCartMutation.isPending
                                ? "Adding..."
                                : "Add to Cart"}

                    </button>


                    {/* View Details */}

                    <Link
                        to={`/products/${productId}`}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >

                        View Details

                        <ArrowRight size={16} />

                    </Link>

                </div>

            </div>

        </div>
    );
}

export default ProductCard;