import { useQuery } from "@tanstack/react-query";

import ProductGrid from "../components/products/ProductGrid";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useState } from "react";
import { getProducts } from "../api/productApi";
import { useMemo } from "react";
import ProductSearch from "../components/products/ProductSearch";
import CategoryFilter from "../components/products/CategoryFilter";
import SortDropdown from "../components/products/SortDropdown";

function ProductsPage() {

const [search, setSearch] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All");
const [sortBy, setSortBy] = useState("default");

    const {

        data: products = [],

        isLoading,

        error,

    } = useQuery({

        queryKey: ["products"],

        queryFn: getProducts,

    });

        const categories = useMemo(() => {

    return [
        "All",
        ...new Set(products.map(product => product.category))
    ];

}, [products]);


const filteredProducts = useMemo(() => {

    // Filter first
    const filtered = products.filter((product) => {

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });

    // Create a copy before sorting
    const sorted = [...filtered];

    switch (sortBy) {

        case "price-asc":
            sorted.sort((a, b) => a.price - b.price);
            break;

        case "price-desc":
            sorted.sort((a, b) => b.price - a.price);
            break;

        case "name-asc":
            sorted.sort((a, b) =>
                a.name.localeCompare(b.name)
            );
            break;

        case "name-desc":
            sorted.sort((a, b) =>
                b.name.localeCompare(a.name)
            );
            break;

        default:
            break;
    }

    return sorted;

}, [products, search, selectedCategory, sortBy]);

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

            <ProductSearch
    value={search}
    onChange={setSearch}
/>

<CategoryFilter
    categories={categories}
    selectedCategory={selectedCategory}
    onSelect={setSelectedCategory}
/>


<SortDropdown
    value={sortBy}
    onChange={setSortBy}
/>

<ProductGrid
    products={filteredProducts}
/>


        </div>

    );

}

export default ProductsPage;