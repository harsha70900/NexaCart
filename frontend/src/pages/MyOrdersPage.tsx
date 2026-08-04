import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
    Package,
    ArrowRight,
    CheckCircle2,
    ShoppingBag,
} from "lucide-react";

import { getOrders } from "../api/orderApi";
import LoadingSpinner from "../components/ui/LoadingSpinner";


function MyOrdersPage() {

    const {
        data: orders,
        isLoading,
        error,
    } = useQuery({

        queryKey: ["orders"],

        queryFn: getOrders,

    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <h2 className="p-10 text-center text-red-600">
                Failed to load orders.
            </h2>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="py-20 text-center">

                <h2 className="text-3xl font-bold">

                    No Orders Found

                </h2>

                <p className="mt-4 text-gray-500">

                    You haven't placed any orders yet.

                </p>

                <Link
                    to="/products"
                    className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                >
                    Start Shopping
                </Link>

            </div>
        );
    }

    return (

<div className="min-h-screen bg-slate-50">

    <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Header */}

        <div className="mb-10 flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-4 text-white shadow-lg">

                <ShoppingBag size={34} />

            </div>

            <div>

                <h1 className="text-5xl font-bold text-slate-900">

                    My Orders

                </h1>

                <p className="mt-2 text-lg text-slate-500">

                    Track all your purchases and order history.

                </p>

            </div>

        </div>

        {/* Orders */}

        <div className="space-y-6">

            {orders.map((order) => (

                <div
                    key={order.orderId}
                    className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        {/* Left */}

                        <div>

                            <div className="mb-4 flex items-center gap-3">

                                <div className="rounded-xl bg-blue-100 p-3">

                                    <Package
                                        size={28}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <h2 className="text-2xl font-bold text-slate-900">

                                        Order #{order.orderId}

                                    </h2>

                                    <p className="text-slate-500">

                                        Thank you for shopping with NexaCart

                                    </p>

                                </div>

                            </div>

                            <div className="mt-6 flex flex-wrap items-center gap-6">

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Status

                                    </p>

                                    <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                                        <CheckCircle2 size={16} />

                                        {order.status}

                                    </span>

                                </div>

                                <div>

                                    <p className="text-sm text-slate-500">

                                        Total Amount

                                    </p>

                                    <h3 className="mt-1 text-3xl font-bold text-blue-600">

                                        ₹{order.totalAmount.toLocaleString()}

                                    </h3>

                                </div>

                            </div>

                        </div>

                        {/* Right */}

                        <Link
                            to={`/orders/${order.orderId}`}
                            className="inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
                        >

                            View Details

                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />

                        </Link>

                    </div>

                </div>

            ))}

        </div>

    </div>

</div>

);
}

export default MyOrdersPage;