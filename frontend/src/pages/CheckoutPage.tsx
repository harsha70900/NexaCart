import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    createPaymentOrder,
    verifyPayment,
    cancelPayment,
    failPayment,
} from "../api/paymentApi";

function CheckoutPage() {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

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

                        /*
                         * Payment verification succeeded.
                         *
                         * Backend has:
                         * - created OrderItems
                         * - updated product stock
                         * - saved payment transaction
                         * - marked order as PAID
                         * - cleared the cart
                         */

                        await queryClient.invalidateQueries({
                            queryKey: ["cart"],
                        });

                        await queryClient.invalidateQueries({
                            queryKey: ["orders"],
                        });

                        toast.success(message);

                        navigate("/order-success");

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

                /*
                 * User closes the Razorpay payment window.
                 */
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

            /*
             * Actual Razorpay payment failure.
             */
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

    const handlePayment = () => {

        if (paymentMutation.isPending) {
            return;
        }

        paymentMutation.mutate();

    };

    return (

        <div className="mx-auto max-w-5xl px-6 py-12">

            {/* Header */}

            <div className="mb-10">

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                    Secure Checkout
                </p>

                <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
                    Checkout
                </h1>

                <p className="mt-2 text-slate-500">
                    Complete your payment securely with Razorpay.
                </p>

            </div>


            {/* Checkout Card */}

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

                <div className="mb-8">

                    <h2 className="text-2xl font-bold text-slate-900">
                        Order Summary
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Your cart will be converted into an order
                        after successful payment verification.
                    </p>

                </div>


                {/* Payment Information */}

                <div className="mb-8 rounded-xl bg-slate-50 p-5">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="font-semibold text-slate-800">
                                Secure Payment
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Payments are securely processed by Razorpay.
                            </p>

                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                            Secure
                        </span>

                    </div>

                </div>


                {/* Payment Button */}

                <button
                    onClick={handlePayment}
                    disabled={paymentMutation.isPending}
                    className="w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60"
                >

                    {paymentMutation.isPending
                        ? "Preparing Secure Payment..."
                        : "Pay Securely with Razorpay"}

                </button>


                {/* Payment Notice */}

                <p className="mt-4 text-center text-xs text-slate-400">
                    Your cart will only be cleared after successful
                    payment verification.
                </p>

            </div>

        </div>

    );
}

export default CheckoutPage;