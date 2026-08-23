
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "../components/nav";
import { useCart } from "../providers/cartProvider";
import { useFavorite } from "../providers/favouriteProvider";
import type { Product } from "./home";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorite();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Nav />
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-10 h-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-zinc-400 font-medium text-sm mt-4">Loading details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100">
        <Nav />
        <div className="text-center py-32">
          <p className="text-zinc-400">Product not found.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-emerald-500 text-black font-semibold rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Nav />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
       
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-zinc-900/80 border border-zinc-800 p-6 md:p-8 rounded-3xl">
          {/* main img*/}
          <div className="relative aspect-square bg-zinc-950 rounded-2xl p-6 flex items-center justify-center overflow-hidden border border-zinc-800">
            <button
              onClick={() => toggleFavorite(product)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-red-500 transition-all duration-200"
            >
              <svg
                className={`w-5 h-5 ${
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
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>

         
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-zinc-100">
                {product.title}
              </h1>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                {product.description}
              </p>

              <div className="flex items-center gap-4 mt-6">
                <span className="text-3xl font-bold text-emerald-400">
                  ${product.price}
                </span>
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium">
                  {product.discountPercentage}% OFF
                </span>
              </div>

              <div className="mt-4 flex items-center gap-4 text-xs text-zinc-400">
                <span>Rating: <strong className="text-zinc-200">⭐ {product.rating}</strong></span>
                <span>Stock: <strong className="text-zinc-200">{product.stock} left</strong></span>
              </div>

           
              {product.images && product.images.length > 0 && (
                <div className="mt-6 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {product.images.map((imgUrl, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-zinc-950 border-2 transition-all duration-200 p-1.5 ${
                        selectedImage === imgUrl
                          ? "border-emerald-500 ring-4 ring-emerald-500/20 opacity-100 scale-105"
                          : "border-zinc-800 hover:border-zinc-700 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-zinc-800 flex items-center gap-4">
              <button
                onClick={() => addToCart(product)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold py-3 px-6 rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-emerald-500/10 text-sm"
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}