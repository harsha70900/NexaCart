import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import ProductCard from "../components/ui/ProductCard";
import { getProducts } from "../api/productApi";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

function HomePage() {

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

if(error) {
  return (
    <h2 className="text-center text-red-600">
            Failed to load products.
        </h2>
  );
}

if (products.length === 0) {

    return (

        <h2 className="p-10 text-center">

            No Products Available

        </h2>

    );

}

  return (
    <>
      <HeroSection />

      <CategorySection />

      <section className="mx-auto max-w-7xl px-6 py-16">

        <h2 className="mb-8 text-4xl font-bold">
          Featured Products
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (
            <ProductCard
    key={product.id}
    productId={product.id}
    name={product.name}
    price={product.price}
    image={product.imageUrl}
    rating={4.8}
    inStock={product.stock > 0}
/>
          ))}

        </div>

      </section>
    </>
  );
}

export default HomePage;