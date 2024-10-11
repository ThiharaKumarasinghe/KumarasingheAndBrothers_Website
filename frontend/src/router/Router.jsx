import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", 
        element: <Home /> 
      },
      { path: "/products", 
        element: <Products /> 

      },
    ],
  },
]);

export default router;
