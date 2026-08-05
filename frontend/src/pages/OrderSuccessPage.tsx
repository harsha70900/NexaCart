import { Link } from "react-router-dom";
import {
    CheckCircle2,
    Package,
    Truck,
    ShoppingBag,
    ArrowRight,
} from "lucide-react";

function OrderSuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto flex max-w-4xl items-center justify-center px-6 py-16">

                <div className="w-full rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

                    {/* Success Icon */}

                    <div className="flex justify-center">

                        <div className="rounded-full bg-green-100 p-6">

                            <CheckCircle2
                                size={80}
                                className="text-green-600"
                            />

                        </div>

                    </div>

                    {/* Heading */}

                    <div className="mt-8 text-center">

                        <h1 className="text-5xl font-bold text-slate-900">

                            Order Placed Successfully!

                        </h1>

                        <p className="mt-4 text-lg text-slate-500">

                            Thank you for shopping with NexaCart.

                        </p>

                        <p className="text-slate-500">

                            Your payment has been received successfully.

                        </p>

                    </div>

                    {/* Information Cards */}

                    <div className="mt-12 grid gap-6 md:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                            <div className="mb-4 flex items-center gap-3">

                                <Package
                                    size={28}
                                    className="text-blue-600"
                                />

                                <h2 className="text-xl font-bold">

                                    Order Confirmed

                                </h2>

                            </div>

                            <p className="leading-7 text-slate-600">

                                Your order has been confirmed and is now
                                being prepared for dispatch.

                            </p>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                            <div className="mb-4 flex items-center gap-3">

                                <Truck
                                    size={28}
                                    className="text-blue-600"
                                />

                                <h2 className="text-xl font-bold">

                                    Estimated Delivery

                                </h2>

                            </div>

                            <p className="leading-7 text-slate-600">

                                Your order is expected to arrive within

                                <span className="font-semibold text-slate-900">

                                    {" "}3–5 business days.

                                </span>

                            </p>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

                        <Link
                            to="/orders"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
                        >
                            <ShoppingBag size={20} />

                            View My Orders

                            <ArrowRight size={18} />

                        </Link>

                        <Link
                            to="/products"
                            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-100"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                    {/* Footer */}

                    <div className="mt-12 border-t border-slate-200 pt-8 text-center">

                        <p className="text-slate-500">

                            ❤️ Thank you for choosing

                            <span className="font-semibold text-blue-600">

                                {" "}NexaCart

                            </span>

                        </p>

                        <p className="mt-2 text-sm text-slate-400">

                            We appreciate your trust and hope to see you again.

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrderSuccessPage;