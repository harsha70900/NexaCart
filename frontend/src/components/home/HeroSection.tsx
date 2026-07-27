import { useNavigate } from "react-router-dom";

function HeroSection() {

    const navigate = useNavigate();

    return (

        <section className="bg-slate-900 text-white">

            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-24 text-center">

                <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium">
                    🚀 New Collection 2026
                </span>

                <h1 className="mt-6 text-5xl font-bold leading-tight">

                    Discover the Future

                    <br />

                    of Technology

                </h1>

                <p className="mt-6 max-w-2xl text-lg text-slate-300">

                    Shop premium laptops, smartphones,
                    gaming accessories and electronics
                    with secure payments and fast delivery.

                </p>

                <div className="mt-10 flex gap-5">

                    <button
                        onClick={() => navigate("/products")}
                        className="rounded-lg bg-blue-600 px-7 py-3 font-semibold transition hover:bg-blue-700"
                    >
                        Shop Now
                    </button>

                    <button
                        onClick={() => navigate("/products")}
                        className="rounded-lg border border-white px-7 py-3 font-semibold transition hover:bg-white hover:text-slate-900"
                    >
                        Explore Products
                    </button>

                </div>

            </div>

        </section>

    );
}

export default HeroSection;