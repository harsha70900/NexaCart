import { useParams } from "react-router-dom";
import { getProductById } from "../api/productApi";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function ProductDetailsPage() {

    const {id} = useParams();
    const productId = Number(id);

    const {
        data: product, isLoading, error,
    }=useQuery({queryKey:["product",productId],
        queryFn: () => getProductById(productId),
    });

    if (isLoading) {
    return <LoadingSpinner />;
}

    if (error) {
    return (

        <h2 className="p-10 text-center text-red-600">

            Failed to load product.

        </h2>

    );

}
      if (!product) {
    return (
        <h2 className="p-10 text-center">
            Product not found.
        </h2>
    );
}  

    return (
    <div className="mx-auto max-w-6xl px-6 py-12">

        <div className="grid gap-12 md:grid-cols-2">

            {/* Product Image */}
            <div>

                <img
                    src={
                        product.imageUrl ||
                        "https://placehold.co/600x600?text=No+Image"
                    }
                    alt={product.name}
                    className="h-[500px] w-full rounded-xl object-cover shadow-lg"
                />

            </div>

            {/* Product Information */}
            <div>

                <h1 className="text-4xl font-bold">

                    {product.name}

                </h1>

                <p className="mt-4 text-3xl font-semibold text-blue-600">

                    ₹{product.price.toLocaleString()}

                </p>

                <div className="mt-6">

                    <span className="rounded-full bg-gray-200 px-4 py-2">

                        {product.category}

                    </span>

                </div>

                <p className="mt-6">

                    {product.stock > 0 ? (
                        <span className="font-medium text-green-600">

                            ✅ In Stock ({product.stock})

                        </span>
                    ) : (
                        <span className="font-medium text-red-600">

                            ❌ Out of Stock

                        </span>
                    )}

                </p>

                <div className="mt-8">

                    <h2 className="mb-2 text-xl font-semibold">

                        Description

                    </h2>

                    <p className="leading-8 text-gray-700">

                        {product.description}

                    </p>

                </div>

                <button
                    className="mt-10 rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
                    disabled={product.stock === 0}
                >

                    Add to Cart

                </button>

            </div>

        </div>

    </div>
);
}

export default ProductDetailsPage;