import { BadgeCheck, CreditCard, ShoppingBag } from "lucide-react";

type OrderSummaryCardProps = {
    status: string;
    totalAmount: number;
    itemCount: number;
};

function OrderSummaryCard({
    status,
    totalAmount,
    itemCount,
}: OrderSummaryCardProps) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

            <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-blue-100 p-3">

                    <ShoppingBag className="text-blue-600" size={28} />

                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                    Order Summary
                </h2>

            </div>

            <div className="space-y-5">

                <div className="flex items-center justify-between">

                    <span className="text-slate-500">
                        Payment Status
                    </span>

                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 font-semibold text-emerald-700">

                        <BadgeCheck size={18} />

                        {status}

                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <span className="text-slate-500">
                        Items
                    </span>

                    <span className="font-semibold">
                        {itemCount}
                    </span>

                </div>

                <div className="flex items-center justify-between">

                    <span className="flex items-center gap-2 text-slate-500">

                        <CreditCard size={18} />

                        Total Amount

                    </span>

                    <span className="text-3xl font-bold text-blue-600">

                        ₹{totalAmount.toLocaleString()}

                    </span>

                </div>

            </div>

        </div>
    );
}

export default OrderSummaryCard;