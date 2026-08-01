import { useMutation } from "@tanstack/react-query";
import { createPaymentOrder } from "../api/paymentApi";
import toast from "react-hot-toast";
import { verifyPayment } from "../api/paymentApi";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

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

            razorpayOrderId: response.razorpay_order_id,

            razorpayPaymentId: response.razorpay_payment_id,

            razorpaySignature: response.razorpay_signature,

        });

        toast.success(message);

        queryClient.invalidateQueries({
            queryKey: ["cart"],
        });

        navigate("/");

    } catch (error: any) {

        toast.error(

            error?.response?.data?.message ??

            "Payment verification failed."

        );

    }

},

        theme: {
            color: "#2563eb",
        },

    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();

},

        onError: (error: any) => {

            toast.error(
                error?.response?.data?.message ??
                "Failed to create payment order."
            );

        },

    });

    return (

        <div className="mx-auto max-w-5xl px-6 py-12">

            <h1 className="mb-10 text-4xl font-bold">

                Checkout

            </h1>

            <div className="rounded-xl bg-white p-8 shadow-lg">

                <h2 className="mb-6 text-2xl font-semibold">

                    Order Summary

                </h2>

                <button
                    onClick={() => paymentMutation.mutate()}
                    disabled={paymentMutation.isPending}
                    className="w-full rounded-lg bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:opacity-50"
                >

                    {paymentMutation.isPending
                        ? "Creating Order..."
                        : "Pay with Razorpay"}

                </button>

            </div>

        </div>

    );

}

export default CheckoutPage;