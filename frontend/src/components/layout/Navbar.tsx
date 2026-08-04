import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../api/cartApi";
import { useAuth } from "../../hooks/useAuth";

function Navbar() {

const { isAuthenticated, logout } = useAuth();

const { data: cart } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: isAuthenticated,
});

const cartCount = cart?.items.length ?? 0;

const navigate = useNavigate();

  console.log(isAuthenticated);

  const handleLogout = () => {

    logout();

    navigate("/");

};



  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <Link
    to="/"
    className="text-2xl font-bold text-blue-400"
>
    NexaCart
</Link>

        <div className="flex gap-6">

          <Link
            to="/"
            className="transition hover:text-blue-400"
          >
            🏠 Home
          </Link>
          

          <Link
            to="/products"
            className="transition hover:text-blue-400"
          >
            🛍 Products
          </Link>

          {isAuthenticated ? (
    <>
        <Link
    to="/cart"
    className="relative"
>
    🛒 Cart

    {cartCount > 0 && (
        <span className="absolute -right-5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
            {cartCount}
        </span>
    )}
</Link>

{isAuthenticated && (
    <Link
        to="/orders"
        className="transition hover:text-blue-400"
    >
        📦 Orders
    </Link>
)}

        <button
    className="text-red-400/80 transition-colors duration-200 hover:text-red-500 font-medium"
    onClick={handleLogout}
>
    👤 Logout
</button>
    </>
) : (
    <Link
        to="/login"
        className="transition hover:text-blue-400"
    >
        🔐 Login
    </Link>
)}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;