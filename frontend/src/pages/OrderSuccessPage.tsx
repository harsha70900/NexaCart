import { Link, useSearchParams } from "react-router-dom";
import {
    CheckCircle,
    Package,
    ArrowRight,
    ShoppingBag,
} from "lucide-react";

function OrderSuccessPage() {

    const [searchParams] = useSearchParams();

    const orderId = searchParams.get("orderId");

    return (

        <div className="flex min-h-[70vh] items-center justify-center px-6 py-12">

            <div className="w-full max-w-2xl">

                {/* Success Card */}

                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-12">

                    {/* Success Icon */}

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">

                        <CheckCircle
                            size={48}
                            className="text-emerald-500"
                        />

                    </div>


                    {/* Heading */}

                    <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">

                        Order Placed Successfully!

                    </h1>


                    <p className="mx-auto mt-4 max-w-lg text-slate-500">

                        Thank you for shopping with NexaCart.
                        Your payment has been successfully verified
                        and your order has been confirmed.

                    </p>


                    {/* Order Information */}

                    {orderId && (

                        <div className="mx-auto mt-8 max-w-md rounded-2xl bg-slate-50 p-5">

                            <div className="flex items-center justify-center gap-3">

                                <Package
                                    size={22}
                                    className="text-blue-600"
                                />

                                <span className="text-sm font-medium text-slate-500">
                                    Order ID
                                </span>

                            </div>

                            <p className="mt-2 text-2xl font-bold text-slate-900">

                                #{orderId}

                            </p>

                            <div className="mt-3 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">

                                Payment Successful

                            </div>

                        </div>

                    )}


                    {/* Actions */}

                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

                        {orderId && (

                            <Link
                                to={`/orders/${orderId}`}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
                            >

                                <Package size={18} />

                                View Order Details

                                <ArrowRight size={18} />

                            </Link>

                        )}

                        <Link
                            to="/orders"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
                        >

                            <ShoppingBag size={18} />

                            My Orders

                        </Link>

                    </div>


                    {/* Continue Shopping */}

                    <div className="mt-8 border-t border-slate-100 pt-6">

                        <Link
                            to="/products"
                            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                        >

                            Continue Shopping

                        </Link>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default OrderSuccessPage;