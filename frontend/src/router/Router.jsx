import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Signup from "../components/Signup";
import PrivateRouter from "../privateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", 
        element: <Home /> 
      },
      { path: "/products", 
        element: <PrivateRouter><Products /> </PrivateRouter>
      },
      { path: "/update-profile", 
        element: <UpdateProfile /> 
      },
      
    ],
  },
  { 
    path: "/signup", 
    element: <Signup /> 
  },
]);

export default router;
