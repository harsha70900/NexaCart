import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag, ShieldCheck, Zap } from "lucide-react";

function HeroSection() {

    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden bg-slate-900 text-white">

            {/* Background glow */}

            <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-28">

                <div className="max-w-4xl">

                    {/* Badge */}

                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">

                        <span className="h-2 w-2 rounded-full bg-blue-400" />

                        Premium Technology Store

                    </div>

                    {/* Heading */}

                    <h1 className="mt-7 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">

                        Discover the Future

                        <span className="block text-blue-400">
                            of Technology.
                        </span>

                    </h1>

                    {/* Description */}

                    <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">

                        Shop premium electronics, laptops, smartphones and
                        accessories with secure payments and lightning-fast
                        delivery.

                    </p>

                    {/* Buttons */}

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">

                        <button
                            onClick={() => navigate("/products")}
                            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-semibold shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-xl"
                        >

                            Shop Now

                            <ArrowRight
                                size={20}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />

                        </button>

                        <button
                            onClick={() => navigate("/products")}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-600 bg-slate-800/50 px-7 py-4 font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-700"
                        >

                            <ShoppingBag size={20} />

                            Explore Deals

                        </button>

                    </div>

                </div>

                {/* Feature highlights */}

                <div className="mt-16 grid max-w-3xl gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-sm">

                        <ShieldCheck
                            size={24}
                            className="text-blue-400"
                        />

                        <p className="mt-3 font-semibold">
                            Secure Payments
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Safe & protected checkout
                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-sm">

                        <Zap
                            size={24}
                            className="text-blue-400"
                        />

                        <p className="mt-3 font-semibold">
                            Fast Delivery
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Quick and reliable service
                        </p>

                    </div>

                    <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-5 backdrop-blur-sm">

                        <ShoppingBag
                            size={24}
                            className="text-blue-400"
                        />

                        <p className="mt-3 font-semibold">
                            Quality Products
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            Products you'll love
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default HeroSection;