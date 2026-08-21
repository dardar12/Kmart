
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import router from "./routes/route";
import { CartProvider } from "./providers/cartProvider";
import { FavoriteProvider } from "./providers/favouriteProvider";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartProvider>
      <FavoriteProvider>
        <RouterProvider router={router} />
      </FavoriteProvider>
    </CartProvider>
  </React.StrictMode>
);