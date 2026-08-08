import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
    ShoppingCart,
    Package,
    Home,
    ShoppingBag,
    LogOut,
} from "lucide-react";

import { getCart } from "../../api/cartApi";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {

    const { isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    const { data: cart } = useQuery({
        queryKey: ["cart"],
        queryFn: getCart,
        enabled: isAuthenticated,
    });

    const cartCount = cart?.items.length ?? 0;

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/95 text-white shadow-lg backdrop-blur">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}

                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-blue-400 transition hover:text-blue-300"
                >
                    NexaCart
                </Link>

                {/* Navigation */}

                <div className="flex items-center gap-5 md:gap-7">

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-blue-400"
                    >
                        <Home size={18} />

                        <span className="hidden sm:inline">
                            Home
                        </span>
                    </Link>

                    <Link
                        to="/products"
                        className="flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-blue-400"
                    >
                        <ShoppingBag size={18} />

                        <span className="hidden sm:inline">
                            Products
                        </span>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            {/* Cart */}

                            <Link
                                to="/cart"
                                className="relative flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-blue-400"
                            >
                                <ShoppingCart size={19} />

                                <span className="hidden sm:inline">
                                    Cart
                                </span>

                                {cartCount > 0 && (
                                    <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white shadow-md">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Orders */}

                            <Link
                                to="/orders"
                                className="flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-blue-400"
                            >
                                <Package size={19} />

                                <span className="hidden sm:inline">
                                    Orders
                                </span>
                            </Link>

                            {/* Logout */}

                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 text-sm font-medium text-red-400 transition hover:text-red-300"
                            >
                                <LogOut size={18} />

                                <span className="hidden sm:inline">
                                    Logout
                                </span>
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg"
                        >
                            Login
                        </Link>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;