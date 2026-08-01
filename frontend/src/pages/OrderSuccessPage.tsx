import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function OrderSuccessPage() {

    return (

        <div className="flex min-h-[70vh] items-center justify-center px-6">

            <div className="max-w-lg rounded-2xl bg-white p-10 text-center shadow-xl">

                <CheckCircle
                    className="mx-auto mb-6 text-green-500"
                    size={80}
                />

                <h1 className="text-4xl font-bold">

                    Order Placed Successfully!

                </h1>

                <p className="mt-6 text-gray-600">

                    Thank you for shopping with NexaCart.

                </p>

                <p className="text-gray-600">

                    Your payment has been received successfully.

                </p>

                <div className="mt-10 flex justify-center gap-4">

                    <Link
                        to="/orders"
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
                    >
                        View My Orders
                    </Link>

                    <Link
                        to="/products"
                        className="rounded-lg border border-gray-300 px-6 py-3 transition hover:bg-gray-100"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default OrderSuccessPage;