//import HeroSection from "../components/home/HeroSection";
import CategorySection from "../components/home/CategorySection";
import ProductCard from "../components/ui/ProductCard";

const products = [
  {
    id: 1,
    name: "iPhone 16 Pro",
    price: 89999,
    image: "https://picsum.photos/400/300?random=1",
    rating: 4.8,
    inStock: true,
  },
  {
    id: 2,
    name: "MacBook Pro M4",
    price: 179999,
    image: "https://picsum.photos/400/300?random=2",
    rating: 4.9,
    inStock: true,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: 29999,
    image: "https://picsum.photos/400/300?random=3",
    rating: 4.7,
    inStock: false,
  },
];

function HomePage() {
  return (
    <>
     

      <CategorySection />

      <section className="mx-auto max-w-7xl px-6 py-12">

        <h2 className="mb-8 text-3xl font-bold">
          Featured Products
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              rating={product.rating}
              inStock={product.inStock}
            />
          ))}

        </div>

      </section>
    </>
  );
}

export default HomePage;