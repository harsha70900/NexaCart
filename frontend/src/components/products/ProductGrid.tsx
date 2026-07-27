import ProductCard from "../ui/ProductCard";
import type { Product } from "../../types/product";

type ProductGridProps = {
    products: Product[];
};

function ProductGrid({products}: ProductGridProps) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product)=> (
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
    );
}
export default ProductGrid;