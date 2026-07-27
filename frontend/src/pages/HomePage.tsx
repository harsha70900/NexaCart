import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import ProductCard from "../components/ui/ProductCard";
import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";
import type { Product } from "../types/product";

function HomePage() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {

    async function loadProducts() {

        try {

            const data = await getProducts();

            console.log(data);

            setProducts(data);

        } catch (error) {

            console.error(error);

        }

    }

    loadProducts();

}, []);

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