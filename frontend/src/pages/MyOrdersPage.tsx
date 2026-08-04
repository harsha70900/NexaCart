import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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

        <div className="mx-auto max-w-5xl px-6 py-12">

            <h1 className="mb-8 text-4xl font-bold">

                My Orders

            </h1>

            <div className="space-y-6">

                {orders.map((order) => (

                    <div
                        key={order.orderId}
                        className="rounded-xl border bg-white p-6 shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-semibold">

                                    Order #{order.orderId}

                                </h2>

                                <p className="mt-2 text-gray-600">

                                    Status:
                                    <span className="ml-2 font-medium text-green-600">
                                        {order.status}
                                    </span>

                                </p>

                                <p className="mt-2 text-lg font-bold text-blue-600">

                                    ₹{order.totalAmount.toLocaleString()}

                                </p>

                            </div>

                            <Link
                                to={`/orders/${order.orderId}`}
                                className="rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                            >
                                View Details
                            </Link>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );
}

export default MyOrdersPage;