import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getOrder } from "../api/orderApi";
import LoadingSpinner from "../components/ui/LoadingSpinner";

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

        <div className="mx-auto max-w-6xl px-6 py-12">

            <h1 className="mb-8 text-4xl font-bold">

                Order #{order.orderId}

            </h1>

            <div className="mb-8 rounded-xl bg-white p-6 shadow">

                <p className="text-lg">

                    Status:

                    <span className="ml-2 font-semibold text-green-600">

                        {order.status}

                    </span>

                </p>

                <p className="mt-3 text-2xl font-bold text-blue-600">

                    Total : ₹{order.totalAmount.toLocaleString()}

                </p>

            </div>

            <div className="space-y-6">

                {order.items.map((item) => (

                    <div
                        key={item.productId}
                        className="flex items-center gap-6 rounded-xl border bg-white p-6 shadow-sm"
                    >

                        <img
                            src={
                                item.imageUrl ||
                                "https://placehold.co/150x150?text=No+Image"
                            }
                            alt={item.productName}
                            className="h-32 w-32 rounded-lg object-cover"
                        />

                        <div className="flex-1">

                            <h2 className="text-2xl font-semibold">

                                {item.productName}

                            </h2>

                            <p className="mt-2">

                                Price :

                                <span className="ml-2 font-medium">

                                    ₹{item.price.toLocaleString()}

                                </span>

                            </p>

                            <p className="mt-2">

                                Quantity :

                                <span className="ml-2 font-medium">

                                    {item.quantity}

                                </span>

                            </p>

                            <p className="mt-2 text-lg font-bold text-blue-600">

                                Subtotal :

                                ₹{item.subtotal.toLocaleString()}

                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default OrderDetailsPage;