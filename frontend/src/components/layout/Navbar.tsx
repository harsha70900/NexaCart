import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
function Navbar() {

const { isAuthenticated, logout } = useAuth();

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
            Home
          </Link>
          

          <Link
            to="/products"
            className="transition hover:text-blue-400"
          >
            Products
          </Link>

          {isAuthenticated ? (
    <>
        <Link
            to="/cart"
            className="transition hover:text-blue-400"
        >
            Cart
        </Link>

        <button
            className="transition hover:text-red-400"
        >
            Logout
        </button>
    </>
) : (
    <Link
        to="/login"
        className="transition hover:text-blue-400"
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