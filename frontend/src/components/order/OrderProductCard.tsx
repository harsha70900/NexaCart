import { Package } from "lucide-react";

type Props = {
    imageUrl: string;
    productName: string;
    price: number;
    quantity: number;
    subtotal: number;
};

function OrderProductCard({
    imageUrl,
    productName,
    price,
    quantity,
    subtotal,
}: Props) {
    return (
        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            <div className="flex flex-col gap-6 md:flex-row">

                <img
                    src={
                        imageUrl ||
                        "https://placehold.co/300x300?text=No+Image"
                    }
                    alt={productName}
                    className="h-40 w-40 rounded-2xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-between">

                    <div>

                        <div className="mb-3 flex items-center gap-3">

                            <Package
                                className="text-blue-600"
                                size={22}
                            />

                            <h2 className="text-2xl font-bold text-slate-900">

                                {productName}

                            </h2>

                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">

                            <div>

                                <p className="text-sm text-slate-500">

                                    Price

                                </p>

                                <p className="font-semibold">

                                    ₹{price.toLocaleString()}

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    Quantity

                                </p>

                                <p className="font-semibold">

                                    {quantity}

                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">

                                    Subtotal

                                </p>

                                <p className="font-bold text-blue-600">

                                    ₹{subtotal.toLocaleString()}

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrderProductCard;