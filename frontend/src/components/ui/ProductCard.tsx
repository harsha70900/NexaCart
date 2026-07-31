import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { addToCart } from "../../api/cartApi";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type ProductCardProps = {
    productId: number;
    name: string;
    price: number;
    image: string;
    rating: number;
    inStock: boolean;
};

function ProductCard({
    productId,
    name,
    price,
    image,
    rating,
    inStock,
}: ProductCardProps) {

  const { isAuthenticated } = useAuth();
const navigate = useNavigate();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: addToCart,

        onSuccess: (message) => {

    queryClient.invalidateQueries({
        queryKey: ["cart"],
    });

    alert(message);
},

        onError: (error) => {
            console.error(error);
        },
    });

    const handleAddToCart = () => {

    if (!isAuthenticated) {
        navigate("/login");
        return;
    }

    mutation.mutate({
        productId,
        quantity: 1,
    });
};

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

            {/* Everything inside Link navigates to Product Details */}
            <Link to={`/products/${productId}`}>

                <img
                    src={
                        image ||
                        "https://placehold.co/400x400?text=No+Image"
                    }
                    alt={name}
                    className="h-60 w-full object-cover"
                />

                <div className="p-5">

                    <h3 className="text-xl font-semibold">
                        {name}
                    </h3>

                    <p className="mt-2 text-yellow-500">
                        ⭐ {rating}
                    </p>

                    <p className="mt-3 text-2xl font-bold text-blue-600">
                        ₹{price.toLocaleString()}
                    </p>

                    <p
                        className={`mt-2 font-medium ${
                            inStock
                                ? "text-green-600"
                                : "text-red-600"
                        }`}
                    >
                        {inStock
                            ? "✓ In Stock"
                            : "Out of Stock"}
                    </p>

                </div>

            </Link>

            {/* Button is outside Link */}
            <div className="px-5 pb-5">
                <button
    onClick={handleAddToCart}
    disabled={mutation.isPending || !inStock}
    className="w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
>
    {mutation.isPending
        ? "Adding..."
        : "Add to Cart"}
</button>
            </div>

        </div>
    );
}

export default ProductCard;