import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
    ShoppingCart,
    Star,
    Package,
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";

import { getProductById } from "../api/productApi";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { addToCart } from "../api/cartApi";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

function ProductDetailsPage() {

    const { isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const { id } = useParams();

    const productId = Number(id);

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(productId),
    });

    const addToCartMutation = useMutation({

        mutationFn: addToCart,

        onSuccess: (message) => {
            toast.success(message);
        },

        onError: (error: any) => {

            toast.error(
                error?.response?.data?.message ??
                "Failed to add product"
            );

        },

    });

    const handleAddToCart = () => {

        if (!isAuthenticated) {

            navigate("/login");

            return;
        }

        if (!product) return;

        addToCartMutation.mutate({
            productId: product.id,
            quantity: 1,
        });

    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <Package
                        size={48}
                        className="mx-auto mb-4 text-red-500"
                    />

                    <h2 className="text-2xl font-bold text-slate-900">

                        Failed to load product.

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Please try again later.

                    </p>

                </div>

            </div>
        );

    }

    if (!product) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center">

                <h2 className="text-2xl font-bold text-slate-900">

                    Product not found.

                </h2>

            </div>
        );

    }

    return (

        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Back to Products */}

                <button
                    onClick={() => navigate("/products")}
                    className="mb-8 inline-flex items-center gap-2 font-medium text-slate-600 transition hover:text-blue-600"
                >

                    <ArrowLeft size={18} />

                    Back to Products

                </button>

                {/* Product Section */}

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* ================= IMAGE ================= */}

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                        <div className="overflow-hidden rounded-2xl bg-slate-100">

                            <img
                                src={
                                    product.imageUrl ||
                                    "https://placehold.co/700x700?text=No+Image"
                                }
                                alt={product.name}
                                className="h-[500px] w-full object-cover transition duration-500 hover:scale-105"
                            />

                        </div>

                    </div>

                    {/* ================= PRODUCT INFO ================= */}

                    <div className="flex flex-col justify-center">

                        {/* Category */}

                        <div>

                            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                {product.category}

                            </span>

                        </div>

                        {/* Product Name */}

                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">

                            {product.name}

                        </h1>

                        {/* Rating */}

                        <div className="mt-5 flex items-center gap-3">

                            <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-4 py-2">

                                <Star
                                    size={18}
                                    className="fill-yellow-400 text-yellow-400"
                                />


                            </div>

                            <span className="text-sm text-slate-500">

                                Customer Rating

                            </span>

                        </div>

                        {/* Price */}

                        <div className="mt-7">

                            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">

                                Price

                            </p>

                            <p className="mt-1 text-4xl font-bold text-blue-600">

                                ₹{product.price.toLocaleString()}

                            </p>

                        </div>

                        {/* Stock */}

                        <div className="mt-6">

                            {product.stock > 0 ? (

                                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">

                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                    In Stock

                                    <span className="font-normal">

                                        ({product.stock} available)

                                    </span>

                                </div>

                            ) : (

                                <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">

                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                                    Out of Stock

                                </div>

                            )}

                        </div>

                        {/* Divider */}

                        <div className="my-8 border-t border-slate-200" />

                        {/* Description */}

                        <div>

                            <h2 className="text-xl font-bold text-slate-900">

                                Product Description

                            </h2>

                            <p className="mt-4 leading-8 text-slate-600">

                                {product.description}

                            </p>

                        </div>

                        {/* Add to Cart */}

                        <button
                            onClick={handleAddToCart}
                            disabled={
                                addToCartMutation.isPending ||
                                product.stock <= 0
                            }
                            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                        >

                            <ShoppingCart size={22} />

                            {addToCartMutation.isPending
                                ? "Adding..."
                                : product.stock <= 0
                                    ? "Out of Stock"
                                    : "Add to Cart"}

                        </button>

                        {/* Security Information */}

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">

                                <div className="rounded-xl bg-blue-100 p-2">

                                    <ShieldCheck
                                        size={22}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <p className="font-semibold text-slate-900">

                                        Secure Shopping

                                    </p>

                                    <p className="text-sm text-slate-500">

                                        Safe & protected

                                    </p>

                                </div>

                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">

                                <div className="rounded-xl bg-blue-100 p-2">

                                    <Package
                                        size={22}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <p className="font-semibold text-slate-900">

                                        Quality Products

                                    </p>

                                    <p className="text-sm text-slate-500">

                                        Carefully selected

                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetailsPage;