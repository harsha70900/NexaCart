import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
    CreditCard,
    ShieldCheck,
    LockKeyhole,
    ArrowLeft,
    CheckCircle,
    ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";

import {
    createPaymentOrder,
    verifyPayment,
    cancelPayment,
    failPayment,
} from "../api/paymentApi";

import { getCart } from "../api/cartApi";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function CheckoutPage() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    // Get current cart
    const {
        data: cart,
        isLoading: isCartLoading,
        error: cartError,
    } = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
    });


    const paymentMutation = useMutation({

        mutationFn: createPaymentOrder,

        onSuccess: (data) => {

            const options = {

                key: data.keyId,

                amount: data.amount,

                currency: data.currency,

                name: "NexaCart",

                description: "Order Payment",

                order_id: data.razorpayOrderId,

                handler: async function (response: any) {

                    try {

                        const message = await verifyPayment({

                            localOrderId: data.localOrderId,

                            razorpayOrderId:
                                response.razorpay_order_id,

                            razorpayPaymentId:
                                response.razorpay_payment_id,

                            razorpaySignature:
                                response.razorpay_signature,

                        });

                        await queryClient.invalidateQueries({
                            queryKey: ["cart"],
                        });

                        await queryClient.invalidateQueries({
                            queryKey: ["orders"],
                        });

                        toast.success(message);

                        navigate(
                            `/order-success?orderId=${data.localOrderId}`
                        );

                    } catch (error: any) {

                        console.error(
                            "Payment verification failed:",
                            error
                        );

                        toast.error(
                            error?.response?.data?.message ??
                            "Payment verification failed."
                        );

                    }

                },

                modal: {

                    ondismiss: async () => {

                        try {

                            await cancelPayment(
                                data.localOrderId
                            );

                            toast.error(
                                "Payment cancelled. Your cart is still saved."
                            );

                        } catch (error) {

                            console.error(
                                "Failed to update cancellation:",
                                error
                            );

                            toast.error(
                                "Payment cancelled. Your cart is still saved."
                            );

                        }

                    },

                },

                theme: {
                    color: "#2563eb",
                },

            };

            const razorpay =
                new window.Razorpay(options);


            razorpay.on(
                "payment.failed",
                async function (response: any) {

                    console.error(
                        "Razorpay payment failed:",
                        response?.error
                    );

                    try {

                        await failPayment(
                            data.localOrderId
                        );

                        toast.error(
                            response?.error?.description ??
                            "Payment failed. Your cart is still saved."
                        );

                    } catch (error) {

                        console.error(
                            "Failed to update payment failure:",
                            error
                        );

                        toast.error(
                            "Payment failed. Your cart is still saved."
                        );

                    }

                }
            );


            razorpay.open();

        },

        onError: (error: any) => {

            console.error(
                "Create payment order failed:",
                error
            );

            toast.error(
                error?.response?.data?.message ??
                "Failed to create payment order."
            );

        },

    });


    // Cart loading
    if (isCartLoading) {
        return <LoadingSpinner />;
    }


    // Cart error
    if (cartError) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <h2 className="text-2xl font-bold text-slate-900">

                        Failed to load cart

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Please try again before proceeding to checkout.

                    </p>

                    <button
                        onClick={() => navigate("/cart")}
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >

                        Back to Cart

                    </button>

                </div>

            </div>

        );

    }


    // Empty cart
    if (!cart || cart.items.length === 0) {

        return (

            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">

                        <ShoppingBag
                            size={32}
                            className="text-slate-400"
                        />

                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">

                        Your cart is empty

                    </h2>

                    <p className="mt-2 text-slate-500">

                        Add some products before proceeding to checkout.

                    </p>

                    <button
                        onClick={() => navigate("/products")}
                        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >

                        Continue Shopping

                    </button>

                </div>

            </div>

        );

    }


    const totalItems = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
    );


    const handlePayment = () => {

        if (paymentMutation.isPending) {
            return;
        }

        paymentMutation.mutate();

    };


    return (

        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-6xl px-6 py-10">

                {/* Back */}

                <button
                    onClick={() => navigate("/cart")}
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
                >

                    <ArrowLeft size={18} />

                    Back to Cart

                </button>


                {/* Header */}

                <div className="mb-10">

                    <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">

                            <CreditCard
                                size={28}
                                className="text-white"
                            />

                        </div>

                        <div>

                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">

                                Secure Checkout

                            </p>

                            <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">

                                Complete Your Order

                            </h1>

                        </div>

                    </div>

                    <p className="mt-4 max-w-2xl text-slate-500">

                        Review your order and complete your payment securely
                        through Razorpay.

                    </p>

                </div>


                {/* Main Checkout */}

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* LEFT */}

                    <div className="lg:col-span-2">

                        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                            {/* Order Review */}

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-blue-50 p-3">

                                    <CheckCircle
                                        size={22}
                                        className="text-blue-600"
                                    />

                                </div>

                                <div>

                                    <h2 className="text-xl font-bold text-slate-900">

                                        Order Review

                                    </h2>

                                    <p className="text-sm text-slate-500">

                                        {totalItems}{" "}
                                        {totalItems === 1
                                            ? "item"
                                            : "items"}{" "}
                                        ready for payment.

                                    </p>

                                </div>

                            </div>


                            <div className="my-8 border-t border-slate-100" />


                            {/* Payment Method */}

                            <div>

                                <h2 className="text-xl font-bold text-slate-900">

                                    Payment Method

                                </h2>

                                <p className="mt-1 text-sm text-slate-500">

                                    Choose Razorpay to securely complete your
                                    payment.

                                </p>

                            </div>


                            <div className="mt-6 rounded-2xl border-2 border-blue-100 bg-blue-50/50 p-5">

                                <div className="flex items-center gap-4">

                                    <div className="rounded-xl bg-white p-3 shadow-sm">

                                        <CreditCard
                                            size={24}
                                            className="text-blue-600"
                                        />

                                    </div>

                                    <div className="flex-1">

                                        <p className="font-bold text-slate-900">

                                            Razorpay

                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">

                                            Secure online payment

                                        </p>

                                    </div>

                                    <div className="h-5 w-5 rounded-full border-[5px] border-blue-600 bg-white" />

                                </div>

                            </div>


                            {/* Security */}

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">

                                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                                    <ShieldCheck
                                        size={22}
                                        className="shrink-0 text-emerald-500"
                                    />

                                    <div>

                                        <p className="text-sm font-semibold text-slate-800">

                                            Secure Payment

                                        </p>

                                        <p className="text-xs text-slate-500">

                                            Protected by Razorpay

                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">

                                    <LockKeyhole
                                        size={22}
                                        className="shrink-0 text-blue-500"
                                    />

                                    <div>

                                        <p className="text-sm font-semibold text-slate-800">

                                            Encrypted

                                        </p>

                                        <p className="text-xs text-slate-500">

                                            Your payment is protected

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT - PAYMENT SUMMARY */}

                    <div>

                        <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

                            <h2 className="text-xl font-bold text-slate-900">

                                Payment Summary

                            </h2>

                            <p className="mt-1 text-sm text-slate-500">

                                Complete your purchase securely.

                            </p>


                            <div className="my-6 border-t border-slate-100" />


                            {/* Items */}

                            <div className="flex items-center justify-between">

                                <span className="text-sm text-slate-500">

                                    Items

                                </span>

                                <span className="font-semibold text-slate-800">

                                    {totalItems}

                                </span>

                            </div>


                            {/* Subtotal */}

                            <div className="mt-4 flex items-center justify-between">

                                <span className="text-sm text-slate-500">

                                    Subtotal

                                </span>

                                <span className="font-semibold text-slate-800">

                                    ₹{cart.totalAmount.toLocaleString()}

                                </span>

                            </div>


                            <div className="my-6 border-t border-slate-100" />


                            {/* Total */}

                            <div className="flex items-center justify-between">

                                <span className="text-lg font-bold text-slate-900">

                                    Total

                                </span>

                                <span className="text-2xl font-bold text-blue-600">

                                    ₹{cart.totalAmount.toLocaleString()}

                                </span>

                            </div>


                            {/* Pay */}

                            <button
                                onClick={handlePayment}
                                disabled={paymentMutation.isPending}
                                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 text-base font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60"
                            >

                                <LockKeyhole size={18} />

                                {paymentMutation.isPending
                                    ? "Preparing Secure Payment..."
                                    : "Pay Securely with Razorpay"}

                            </button>


                            <p className="mt-4 text-center text-xs leading-5 text-slate-400">

                                Your cart will only be cleared after
                                successful payment verification.

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default CheckoutPage;