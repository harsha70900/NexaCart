import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    ArrowLeft,
    Package,
    ShieldCheck,
    ShoppingBag,
} from "lucide-react";

import { getOrder } from "../api/orderApi";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import OrderSummaryCard from "../components/order/OrderSummaryCard";
import OrderProductCard from "../components/order/OrderProductCard";

function OrderDetailsPage() {

    const { orderId } = useParams();

    const id = Number(orderId);

    const {
        data: order,
        isLoading,
        error,
    } = useQuery({

        queryKey: ["order", id],

        queryFn: () => getOrder(id),

    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">

                        <Package
                            size={32}
                            className="text-red-500"
                        />

                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        Failed to load order

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Please try again later.

                    </p>

                    <Link
                        to="/orders"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >

                        <ArrowLeft size={18} />

                        Back to My Orders

                    </Link>

                </div>

            </div>

        );

    }

    if (!order) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">

                        <Package
                            size={32}
                            className="text-slate-400"
                        />

                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        Order not found

                    </h2>

                    <p className="mt-2 text-slate-500">

                        The order you're looking for does not exist.

                    </p>

                    <Link
                        to="/orders"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >

                        <ArrowLeft size={18} />

                        Back to My Orders

                    </Link>

                </div>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Back Navigation */}

                <Link
                    to="/orders"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                >

                    <ArrowLeft size={18} />

                    Back to My Orders

                </Link>


                {/* Header */}

                <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">

                    <div className="flex items-center gap-4">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">

                            <Package size={32} />

                        </div>

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

                                Order Details

                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">

                                Order #{order.orderId}

                            </h1>

                            <p className="mt-1 text-sm text-slate-500">

                                Complete information about your purchase

                            </p>

                        </div>

                    </div>


                    {/* Status */}

                    <div className="self-start rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-600 md:self-center">

                        {order.status}

                    </div>

                </div>


                {/* Summary */}

                <div className="mt-10">

                    <OrderSummaryCard
                        status={order.status}
                        totalAmount={order.totalAmount}
                        itemCount={order.items.length}
                    />

                </div>


                {/* Purchased Products */}

                <div className="mt-12">

                    <div className="mb-6 flex items-center justify-between">

                        <div>

                            <h2 className="text-2xl font-bold text-slate-900">

                                Purchased Products

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">

                                {order.items.length}{" "}
                                {order.items.length === 1
                                    ? "product"
                                    : "products"}{" "}
                                in this order

                            </p>

                        </div>

                        <ShoppingBag
                            size={24}
                            className="text-slate-400"
                        />

                    </div>


                    <div className="space-y-5">

                        {order.items.map((item) => (

                            <OrderProductCard
                                key={item.productId}
                                imageUrl={item.imageUrl}
                                productName={item.productName}
                                price={item.price}
                                quantity={item.quantity}
                                subtotal={item.subtotal}
                            />

                        ))}

                    </div>

                </div>


                {/* Trust Information */}

                <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5">

                    <div className="flex items-start gap-4">

                        <div className="rounded-xl bg-blue-50 p-3">

                            <ShieldCheck
                                size={24}
                                className="text-blue-600"
                            />

                        </div>

                        <div>

                            <h3 className="font-semibold text-slate-900">

                                Secure Order

                            </h3>

                            <p className="mt-1 text-sm leading-6 text-slate-500">

                                Your order and payment information are
                                securely handled by NexaCart.

                            </p>

                        </div>

                    </div>

                </div>


                {/* Bottom Actions */}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                    <Link
                        to="/orders"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >

                        <ArrowLeft size={18} />

                        Back to My Orders

                    </Link>

                    <Link
                        to="/products"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                    >

                        <ShoppingBag size={18} />

                        Continue Shopping

                    </Link>

                </div>

            </div>

        </div>

    );
}

export default OrderDetailsPage;