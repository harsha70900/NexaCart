import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-blue-400">
          NexaCart
        </h1>

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

          <Link
            to="/cart"
            className="transition hover:text-blue-400"
          >
            Cart
          </Link>

          <Link
            to="/login"
            className="transition hover:text-blue-400"
          >
            Login
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;