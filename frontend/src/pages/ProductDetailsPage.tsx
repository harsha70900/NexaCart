import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import {
    ShoppingCart,
    Star,
    Package,
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";

import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { getProductById } from "../api/productApi";
import { addToCart } from "../api/cartApi";

import LoadingSpinner from "../components/ui/LoadingSpinner";

import { useAuth } from "../hooks/useAuth";

import type { Product } from "../types/product";


function ProductDetailsPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { isAuthenticated } = useAuth();

    const productId = Number(id);


    // ========================================================
    // First get the products already available in React Query
    // ========================================================

    const {
        data: products = [],
    } = useQuery<Product[]>({

        queryKey: ["products"],

        // This should normally already exist because the
        // Products page uses fallbackProducts + React Query.
        //
        // We don't need to fetch again here.

        queryFn: async () => {
            return [];
        },

        enabled: false,

    });


    // ========================================================
    // Find product from already loaded products
    // ========================================================

    const cachedProduct = products.find(
        (product) => product.id === productId
    );


    // ========================================================
    // Direct Product Request
    // ========================================================
    //
    // Only used when the product is NOT already available
    // in the products cache.
    //
    // Example:
    //
    // User directly opens:
    // /products/5
    //
    // without visiting /products first.
    //
    // ========================================================

    const {
        data: directProduct,
        isLoading: isDirectLoading,
        error: directError,
    } = useQuery<Product>({

        queryKey: ["product", productId],

        queryFn: () => getProductById(productId),

        enabled: !cachedProduct,

        retry: 1,

    });


    // ========================================================
    // Select Product
    // ========================================================

    const product =
        cachedProduct ?? directProduct;


    // ========================================================
    // Add To Cart
    // ========================================================

    const addToCartMutation = useMutation({

        mutationFn: addToCart,

        onSuccess: (message) => {

            toast.success(
                message ||
                "Product added to cart successfully"
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


        if (!product) {

            return;

        }


        if (product.stock <= 0) {

            toast.error(
                "This product is currently out of stock"
            );

            return;

        }


        addToCartMutation.mutate({

            productId: product.id,

            quantity: 1,

        });

    };


    // ========================================================
    // Loading
    // ========================================================

    if (!product && isDirectLoading) {

        return <LoadingSpinner />;

    }


    // ========================================================
    // Error
    // ========================================================

    if (!product && directError) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <Package
                        size={52}
                        className="mx-auto mb-4 text-red-500"
                    />

                    <h2 className="text-2xl font-bold text-slate-900">

                        Failed to load product

                    </h2>


                    <p className="mt-2 text-slate-500">

                        Please try again later.

                    </p>


                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                    >

                        Back to Products

                    </button>

                </div>

            </div>

        );

    }


    // ========================================================
    // Product Not Found
    // ========================================================

    if (!product) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <Package
                        size={52}
                        className="mx-auto mb-4 text-slate-300"
                    />


                    <h2 className="text-2xl font-bold text-slate-900">

                        Product not found

                    </h2>


                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                    >

                        Back to Products

                    </button>

                </div>

            </div>

        );

    }


    // ========================================================
    // UI
    // ========================================================

    return (

        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-10">


                {/* ==================================================
                    BACK
                ================================================== */}

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                    className="mb-8 inline-flex items-center gap-2 font-medium text-slate-600 transition hover:text-blue-600"
                >

                    <ArrowLeft size={18} />

                    Back to Products

                </button>


                {/* ==================================================
                    PRODUCT
                ================================================== */}

                <div className="grid gap-10 lg:grid-cols-2">


                    {/* IMAGE */}

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


                    {/* INFORMATION */}

                    <div className="flex flex-col justify-center">


                        {/* CATEGORY */}

                        <div>

                            <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                                {product.category}

                            </span>

                        </div>


                        {/* NAME */}

                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">

                            {product.name}

                        </h1>


                        {/* RATING */}

                        <div className="mt-5 flex items-center gap-3">

                            <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-4 py-2">

                                <Star
                                    size={18}
                                    className="fill-yellow-400 text-yellow-400"
                                />

                                <span className="font-semibold text-slate-700">

                                    4.8

                                </span>

                            </div>


                            <span className="text-sm text-slate-500">

                                Customer Rating

                            </span>

                        </div>


                        {/* PRICE */}

                        <div className="mt-7">

                            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">

                                Price

                            </p>


                            <p className="mt-1 text-4xl font-bold text-blue-600">

                                ₹
                                {product.price.toLocaleString(
                                    "en-IN"
                                )}

                            </p>

                        </div>


                        {/* STOCK */}

                        <div className="mt-6">

                            {product.stock > 0 ? (

                                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">

                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

                                    In Stock

                                    <span className="font-normal">

                                        (
                                        {product.stock}
                                        {" "}
                                        available)

                                    </span>

                                </div>

                            ) : (

                                <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 font-semibold text-red-700">

                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />

                                    Out of Stock

                                </div>

                            )}

                        </div>


                        <div className="my-8 border-t border-slate-200" />


                        {/* DESCRIPTION */}

                        <div>

                            <h2 className="text-xl font-bold text-slate-900">

                                Product Description

                            </h2>


                            <p className="mt-4 leading-8 text-slate-600">

                                {product.description}

                            </p>

                        </div>


                        {/* ADD TO CART */}

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


                        {/* FEATURES */}

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