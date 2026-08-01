import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {
    getCart,
    updateCartItem,
    removeCartItem,
} from "../api/cartApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function CartPage() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const {
        data: cart,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
    });

    const updateMutation = useMutation({

        mutationFn: ({
            cartItemId,
            quantity,
        }: {
            cartItemId: number;
            quantity: number;
        }) =>
            updateCartItem(cartItemId, {
                quantity,
            }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },

    });

    const removeMutation = useMutation({

        mutationFn: removeCartItem,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
            toast.success("Product removed successfully from cart");
        },

        onError: (error: any) => {

            console.error(error);

            toast.error(
                error?.response?.data?.message ??
                "Failed to remove product from cart."
            );

        },

    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <h2 className="p-10 text-center text-red-600">
                Failed to load cart.
            </h2>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-3xl font-bold">
                    Your cart is empty
                </h2>

                <p className="mt-4 text-gray-500">
                    Add some products to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-6 py-10">

            <h1 className="mb-10 text-4xl font-bold">
                Shopping Cart
            </h1>

            <div className="grid gap-8 lg:grid-cols-3">

                {/* Cart Items */}

                <div className="space-y-6 lg:col-span-2">

                    {cart.items.map((item) => (

                        <div
                            key={item.cartItemId}
                            className="flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-md md:flex-row"
                        >

                            {/* Product Image */}

                            <img
                                src={
                                    item.imageUrl ||
                                    "https://placehold.co/250x250?text=No+Image"
                                }
                                alt={item.productName}
                                className="h-44 w-44 rounded-xl object-cover"
                            />

                            {/* Product Details */}

                            <div className="flex flex-1 flex-col justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        {item.productName}
                                    </h2>

                                    <p className="mt-2 text-gray-500">
                                        {item.category}
                                    </p>

                                    <p className="mt-4 text-3xl font-bold text-blue-600">
                                        ₹{item.price.toLocaleString()}
                                    </p>

                                </div>

                                <div className="mt-6 flex flex-wrap items-center gap-4">

                                    {/* Quantity */}

                                    <div className="flex items-center rounded-lg border">

                                        <button
                                            onClick={() => {

                                                if (item.quantity === 1) return;

                                                updateMutation.mutate({
                                                    cartItemId: item.cartItemId,
                                                    quantity: item.quantity - 1,
                                                });

                                            }}
                                            className="px-4 py-2 text-xl hover:bg-gray-100"
                                        >
                                            −
                                        </button>

                                        <span className="px-5 font-semibold">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                updateMutation.mutate({
                                                    cartItemId: item.cartItemId,
                                                    quantity: item.quantity + 1,
                                                })
                                            }
                                            className="px-4 py-2 text-xl hover:bg-gray-100"
                                        >
                                            +
                                        </button>

                                    </div>

                                    {/* Remove */}

                                    <button
                                        onClick={() =>
                                            removeMutation.mutate(item.cartItemId)
                                        }
                                        disabled={removeMutation.isPending}
                                        className="rounded-lg bg-red-600 px-5 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
                                    >
                                        {removeMutation.isPending
                                            ? "Removing..."
                                            : "Remove"}
                                    </button>

                                </div>

                                <p className="mt-5 text-lg font-semibold">
                                    Subtotal:
                                    <span className="ml-2 text-blue-600">
                                        ₹{item.subtotal.toLocaleString()}
                                    </span>
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Order Summary */}

                <div>

                    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-md">

                        <h2 className="mb-6 text-2xl font-bold">
                            Order Summary
                        </h2>

                        <div className="flex justify-between border-b pb-4">

                            <span>Total Items</span>

                            <span>
                                {cart.items.reduce(
                                    (total, item) =>
                                        total + item.quantity,
                                    0
                                )}
                            </span>

                        </div>

                        <div className="mt-5 flex justify-between text-2xl font-bold">

                            <span>Total</span>

                            <span className="text-blue-600">
                                ₹{cart.totalAmount.toLocaleString()}
                            </span>

                        </div>

                        <button
    onClick={() => navigate("/checkout")}
    className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-lg font-semibold text-white transition hover:bg-blue-700"
>
    Proceed to Checkout
</button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default CartPage;