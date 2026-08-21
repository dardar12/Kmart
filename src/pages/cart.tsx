import Nav from "../components/nav";
import { useCart } from "../providers/cartProvider";



export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Nav />
      <main className="container mx-auto px-4 py-8 max-w-4xl">


        {cart.length === 0 ? (
          <p className="text-zinc-400">Empty Cart</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-zinc-900 p-4 rounded-xl border border-zinc-800"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg bg-zinc-950"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-emerald-400 font-bold">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 font-bold hover:text-emerald-400"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 font-bold hover:text-emerald-400"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 active:scale-95 group"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <svg
                      className="w-5 h-5 stroke-current group-hover:scale-110 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-lg font-semibold">Total Price:</span>
              <span className="text-xl font-bold text-emerald-400">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}