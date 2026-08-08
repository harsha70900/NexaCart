import { useQuery } from "@tanstack/react-query";

import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import ProductCard from "../components/ui/ProductCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import { getProducts } from "../api/productApi";

function HomePage() {

    const {
        data: products = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <h2 className="text-2xl font-bold text-slate-900">
                        Failed to load products
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Please try again later.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="bg-slate-50">

            {/* Hero */}

            <HeroSection />

            {/* Categories */}

            <CategorySection />

            {/* Featured Products */}

            <section className="mx-auto max-w-7xl px-6 py-16">

                <div className="mb-10">

                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Featured Collection
                    </p>

                    <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Featured Products
                    </h2>

                    <p className="mt-3 max-w-2xl text-lg text-slate-500">
                        Discover some of our most popular products, carefully
                        selected for your shopping experience.
                    </p>

                </div>

                {products.length === 0 ? (

                    <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

                        <h2 className="text-2xl font-bold text-slate-900">
                            No Products Available
                        </h2>

                        <p className="mt-3 text-slate-500">
                            Check back soon for new products.
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

                        {products.slice(0, 6).map((product) => (

                            <ProductCard
                                key={product.id}
                                productId={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.imageUrl}
                                rating={4.8}
                                inStock={product.stock > 0}
                            />

                        ))}

                    </div>

                )}

            </section>

            {/* Why NexaCart */}

            <section className="border-y border-slate-200 bg-white">

                <div className="mx-auto max-w-7xl px-6 py-16">

                    <div className="mb-10 text-center">

                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Why NexaCart
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                            Shopping made simple
                        </h2>

                        <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                            Everything you need for a smooth, secure and
                            convenient shopping experience.
                        </p>

                    </div>

                    <div className="grid gap-6 md:grid-cols-3">

                        {/* Secure Shopping */}

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                                <span className="text-2xl">
                                    🔒
                                </span>

                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Secure Shopping
                            </h3>

                            <p className="mt-3 leading-7 text-slate-500">
                                Your account and payments are protected with
                                secure authentication and payment processing.
                            </p>

                        </div>

                        {/* Quality Products */}

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                                <span className="text-2xl">
                                    📦
                                </span>

                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Quality Products
                            </h3>

                            <p className="mt-3 leading-7 text-slate-500">
                                Explore a growing collection of products
                                selected for quality and value.
                            </p>

                        </div>

                        {/* Easy Checkout */}

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">

                                <span className="text-2xl">
                                    ⚡
                                </span>

                            </div>

                            <h3 className="mt-5 text-xl font-bold text-slate-900">
                                Easy Checkout
                            </h3>

                            <p className="mt-3 leading-7 text-slate-500">
                                Add your favorite products to the cart and
                                complete your purchase with a simple checkout.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default HomePage;