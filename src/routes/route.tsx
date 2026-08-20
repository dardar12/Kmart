import { createBrowserRouter } from "react-router";
import Home from "../pages/home";

import Profile from "../pages/profile";
import AboutUs from "../pages/aboutus";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },

    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/aboutus",
        element: <AboutUs />,
    },

]);

export default router;