import { useEffect, useState } from "react";
import Nav from "../components/nav";
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProductsData = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data?.products);
      setFilteredProducts(data?.products);
    } catch (error) {
      console.error("Error fetching data:", error);
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
                <div className="relative overflow-hidden bg-zinc-900 aspect-[4/3] p-4 flex items-center justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-zinc-100 text-sm group-hover:text-emerald-400 transition-colors line-clamp-1">
                      {product.title}
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] font-medium text-zinc-500 uppercase">
                        Price
                      </span>
                      <span className="text-base font-bold text-emerald-400">
                        ${product.price}
                      </span>
                    </div>

                    <button className="text-xs font-medium bg-zinc-800 hover:bg-emerald-500 hover:text-black text-zinc-200 px-3.5 py-1.5 rounded-lg border border-zinc-700 transition-colors duration-200 active:scale-95">
                      View Detail
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