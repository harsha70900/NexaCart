import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    PackageSearch,
    SlidersHorizontal,
    X,
} from "lucide-react";

import ProductGrid from "../components/products/ProductGrid";
import ProductSearch from "../components/products/ProductSearch";
import CategoryFilter from "../components/products/CategoryFilter";
import SortDropdown from "../components/products/SortDropdown";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import { getProducts } from "../api/productApi";

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
            ...new Set(
                products.map((product) => product.category)
            ),
        ];

    }, [products]);

    const filteredProducts = useMemo(() => {

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

    }, [
        products,
        search,
        selectedCategory,
        sortBy,
    ]);

    const hasActiveFilters =
        search !== "" ||
        selectedCategory !== "All" ||
        sortBy !== "default";

    const clearFilters = () => {

        setSearch("");
        setSelectedCategory("All");
        setSortBy("default");

    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {

        return (
            <div className="flex min-h-[60vh] items-center justify-center px-6">

                <div className="text-center">

                    <PackageSearch
                        size={52}
                        className="mx-auto mb-4 text-red-500"
                    />

                    <h2 className="text-2xl font-bold text-slate-900">
                        Unable to load products
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Please try again later.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-12">

                {/* HEADER */}

                <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">

                    <div>

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                            NexaCart Collection
                        </p>

                        <h1 className="mt-2 text-5xl font-bold tracking-tight text-slate-900">
                            All Products
                        </h1>

                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">
                            Discover electronics, gadgets and accessories
                            carefully selected for your shopping experience.
                        </p>

                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">

                        <PackageSearch
                            size={18}
                            className="text-blue-600"
                        />

                        {filteredProducts.length}{" "}
                        {filteredProducts.length === 1
                            ? "Product"
                            : "Products"}

                    </div>

                </div>

{/* ================= SEARCH + SORT ================= */}

<div className="flex items-center gap-3 w-full">

    <div className="flex-1 min-w-0">

        <ProductSearch
            value={search}
            onChange={setSearch}
        />

    </div>

    <div className="shrink-0 w-52">

        <SortDropdown
            value={sortBy}
            onChange={setSortBy}
        />

    </div>

</div>


{/* ================= CATEGORIES ================= */}

<div className="mt-4 flex items-center gap-5 border-b border-slate-200 pb-5">

    <div className="flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-600">

        <SlidersHorizontal
            size={17}
            className="text-blue-600"
        />

        <span>
            Categories
        </span>

    </div>

    <div className="flex-1">

        <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
        />

    </div>

    {hasActiveFilters && (

        <button
            onClick={clearFilters}
            className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-red-500"
        >

            <X size={15} />

            Clear

        </button>

    )}

</div>

                {/* PRODUCTS HEADER */}

                <div className="mb-6 mt-9 flex items-end justify-between">

                    <div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            Products
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">

                            {hasActiveFilters
                                ? `Showing ${filteredProducts.length} filtered results`
                                : `Showing all ${products.length} products`}

                        </p>

                    </div>

                </div>

                {/* PRODUCTS */}

                {filteredProducts.length > 0 ? (

                    <ProductGrid
                        products={filteredProducts}
                    />

                ) : (

                    <div className="py-20 text-center">

                        <PackageSearch
                            size={56}
                            className="mx-auto text-slate-300"
                        />

                        <h2 className="mt-5 text-2xl font-bold text-slate-900">
                            No products found
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Try changing your search or category filter.
                        </p>

                        <button
                            onClick={clearFilters}
                            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default ProductsPage;