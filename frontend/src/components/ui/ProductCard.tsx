type ProductCardProps = {
  name: string;
  price: number;
  image: string;
  rating: number;
  inStock: boolean;
};

function ProductCard({
  name,
  price,
  image,
  rating,
  inStock,
}: ProductCardProps) {
  return (
    <div className="w-72 overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

      <img
        src={image}
        alt={name}
        className="h-56 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-semibold">
          {name}
        </h2>

        <p className="mt-2 text-yellow-500">
          ⭐ {rating}
        </p>

        <p className="mt-2 text-2xl font-bold text-blue-600">
          ₹{price.toLocaleString()}
        </p>

        <p
          className={`mt-2 font-medium ${
            inStock ? "text-green-600" : "text-red-600"
          }`}
        >
          {inStock ? "✓ In Stock" : "Out of Stock"}
        </p>

        <button
          disabled={!inStock}
          className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;