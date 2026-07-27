import { useQuery } from "@tanstack/react-query";

import ProductGrid from "../components/products/ProductGrid";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import { getProducts } from "../api/productApi";

function ProductsPage() {

    const {

        data: products = [],

        isLoading,

        error,

    } = useQuery({

        queryKey: ["products"],

        queryFn: getProducts,

    });

    if (isLoading) {

        return <LoadingSpinner />;

    }

    if (error) {

        return (

            <h2 className="p-10 text-center text-red-600">

                Failed to load products.

            </h2>

        );

    }

    return (

        <div className="mx-auto max-w-7xl px-6 py-12">

            <h1 className="mb-10 text-4xl font-bold">

                All Products

            </h1>

            <ProductGrid products={products} />

        </div>

    );

}

export default ProductsPage;