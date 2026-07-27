import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../../api/cartApi";
import {
  useQueryClient,
} from "@tanstack/react-query";

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

  const queryClient = useQueryClient();

  const mutation = useMutation({

    mutationFn: addToCart,

    onSuccess: () => {

        queryClient.invalidateQueries({
            queryKey: ["cart"],
        });
         console.log("Added to cart");

    },
     onError: (error) => {

        console.error(error);

    },

});

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">

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
          {inStock ? "✓ In Stock" : "Out of Stock"}
        </p>

        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition duration-200 ease-in-out"
    disabled={mutation.isPending}
    onClick={() => mutation.mutate(productId)}
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