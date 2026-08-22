import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Profile from "../pages/profile";

import Cart from "../pages/cart";
import ProductDetail from "../pages/productDetails";
import Favorites from "../pages/favourite";
import AboutUs from "../pages/aboutUs";





const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id", 
    element: <ProductDetail />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  },
]);

export default router;