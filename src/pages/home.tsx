
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/nav";
import { useFavorite } from "../providers/favouriteProvider";
import { useCart } from "../providers/cartProvider";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images?: string[]; // Add this field from DummyJSON API response
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();

  const fetchProductsData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data?.products);
      setFilteredProducts(data?.products);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Nav products={products} setProducts={setFilteredProducts} />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-zinc-400 font-medium text-sm mt-4">
              Loading products...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
              >
             
                <Link to={`/product/${product.id}`} className="block flex-1">
                  <div className="relative overflow-hidden bg-zinc-900 aspect-[4/3] p-4 flex items-center justify-center">
                    {/* fav */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(product);
                      }}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:text-red-500 transition-all duration-200"
                    >
                      <svg
                        className={`w-4 h-4 ${
                          isFavorite(product.id)
                            ? "fill-red-500 stroke-red-500"
                            : "fill-none stroke-current"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>

                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between gap-2">
                    <div>
                      <h2 className="font-semibold text-zinc-100 text-sm group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {product.title}
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </Link>

             
                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-medium text-zinc-500 uppercase">
                        Price
                      </span>
                      <span className="text-base font-bold text-emerald-400">
                        ${product.price}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-1.5 rounded-lg transition-all duration-200 active:scale-95 shadow-sm"
                    >
                      + Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}