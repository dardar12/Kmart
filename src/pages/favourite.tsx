import Nav from "../components/nav";
import { useCart } from "../providers/cartProvider";
import { useFavorite } from "../providers/favouriteProvider";


export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorite();
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Nav />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-2xl font-bold mb-6">Favorite Items</h1>

        {favorites.length === 0 ? (
          <p className="text-zinc-400">No favorite items </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="group relative bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative overflow-hidden bg-zinc-900 aspect-[4/3] p-4 flex items-center justify-center">
                  <button
                    onClick={() => toggleFavorite(product)}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-zinc-950/60 border border-zinc-800 text-red-500 hover:text-zinc-400 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4 fill-red-500 stroke-red-500"
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

                    <button 
                      onClick={() => addToCart(product)}
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