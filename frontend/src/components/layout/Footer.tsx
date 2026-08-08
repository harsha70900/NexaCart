import { Link } from "react-router-dom";

function Footer() {

    return (
        <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">

            <div className="mx-auto max-w-7xl px-6 py-12">

                <div className="grid gap-10 md:grid-cols-3">

                    <div>
                        <h2 className="text-2xl font-bold text-blue-400">
                            NexaCart
                        </h2>

                        <p className="mt-4 max-w-sm leading-7 text-slate-400">
                            A modern e-commerce experience for discovering
                            quality products with secure payments and a
                            seamless shopping journey.
                        </p>
                    </div>

                    <div>

                        <h3 className="font-semibold text-white">
                            Quick Links
                        </h3>

                        <div className="mt-4 space-y-3 text-sm">

                            <Link
                                to="/"
                                className="block transition hover:text-blue-400"
                            >
                                Home
                            </Link>

                            <Link
                                to="/products"
                                className="block transition hover:text-blue-400"
                            >
                                Products
                            </Link>

                            <Link
                                to="/orders"
                                className="block transition hover:text-blue-400"
                            >
                                My Orders
                            </Link>

                            <Link
                                to="/cart"
                                className="block transition hover:text-blue-400"
                            >
                                Shopping Cart
                            </Link>

                        </div>

                    </div>

                    <div>

                        <h3 className="font-semibold text-white">
                            Why NexaCart?
                        </h3>

                        <div className="mt-4 space-y-3 text-sm text-slate-400">
                            <p>✓ Secure Payments</p>
                            <p>✓ Quality Products</p>
                            <p>✓ Fast Shopping Experience</p>
                            <p>✓ Easy Order Management</p>
                        </div>

                    </div>

                </div>

                <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">

                    © {new Date().getFullYear()} NexaCart. All rights reserved.

                </div>

            </div>

        </footer>
    );
}

export default Footer;