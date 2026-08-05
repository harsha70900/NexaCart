import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Package } from "lucide-react";

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
            <h2 className="p-10 text-center text-red-600">
                Failed to load order.
            </h2>
        );
    }

    if (!order) {
        return (
            <h2 className="p-10 text-center">
                Order not found.
            </h2>
        );
    }

    return (

        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Back Button */}

                <Link
                    to="/orders"
                    className="mb-8 inline-flex items-center gap-2 text-blue-600 transition hover:text-blue-700"
                >
                    <ArrowLeft size={18} />

                    Back to My Orders

                </Link>

                {/* Header */}

                <div className="mb-10 flex items-center gap-4">

                    <div className="rounded-2xl bg-blue-600 p-4 text-white shadow-lg">

                        <Package size={34} />

                    </div>

                    <div>

                        <h1 className="text-5xl font-bold text-slate-900">

                            Order #{order.orderId}

                        </h1>

                        <p className="mt-2 text-lg text-slate-500">

                            View complete information about this order.

                        </p>

                    </div>

                </div>

                {/* Summary */}

                <OrderSummaryCard
                    status={order.status}
                    totalAmount={order.totalAmount}
                    itemCount={order.items.length}
                />

                {/* Products */}

                <div className="mt-12">

                    <h2 className="mb-6 text-3xl font-bold text-slate-900">

                        Purchased Products

                    </h2>

                    <div className="space-y-6">

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

            </div>

        </div>

    );

}

export default OrderDetailsPage;