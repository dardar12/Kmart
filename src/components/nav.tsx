
import { Link } from "react-router-dom";
import type { Product } from "../pages/home";
import { useFavorite } from "../providers/favouriteProvider";
import { useCart } from "../providers/cartProvider";


interface PropType {
  products?: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function Nav({ products, setProducts }: PropType) {
  const { totalCount } = useCart();
  const { favorites } = useFavorite();

  const filterByTitle = (search: string) => {
    if (!setProducts) return;

    const filterProducts = search
      ? products?.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
      : products;

    setProducts(filterProducts || []);
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">


        <Link to="/" className="flex items-center gap-x-2.5 cursor-pointer group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-black text-xl tracking-tighter">K</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent tracking-tight">
            Mart
          </h1>
        </Link>

        {products && (
          <div className="flex-1 max-w-md mx-4">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative group">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
              </div>

              <input
                type="search"
                id="search"
                onChange={(event) => filterByTitle(event.target.value)}
                className="block w-full py-2 ps-10 pe-20 bg-zinc-900/90 border border-zinc-800 text-zinc-100 text-sm rounded-xl focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 placeholder:text-zinc-500 transition-all duration-200"
                placeholder="Search products..."
              />

              <button
                type="button"
                className="absolute end-1.5 top-1/2 -translate-y-1/2 text-black bg-emerald-400 hover:bg-emerald-300 font-semibold rounded-lg text-xs px-3 py-1.5 transition-all duration-200 active:scale-95 shadow-sm"
              >
                Search
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center gap-x-1">
          <Link to="/" className="text-zinc-300 hover:text-white hover:bg-zinc-900/80 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200">
            Home
          </Link>
          <Link to="/profile" className="text-zinc-300 hover:text-white hover:bg-zinc-900/80 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200">
            Profile
          </Link>
          <Link to="/aboutus" className="text-zinc-300 hover:text-white hover:bg-zinc-900/80 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200">
            About Us
          </Link>

          {/* fav sec*/}
          <Link to="/favorites" className="relative text-zinc-300 hover:text-white hover:bg-zinc-900/80 p-2 rounded-lg transition-all duration-200 ml-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* cart sec*/}
          <Link to="/cart" className="relative text-zinc-300 hover:text-white hover:bg-zinc-900/80 p-2 rounded-lg transition-all duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </Link>
        </div>

      </div>
    </nav>
  );
}