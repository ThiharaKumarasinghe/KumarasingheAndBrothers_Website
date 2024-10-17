import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Signup from "../components/Signup";
import PrivateRouter from "../privateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/products/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddProducts from "../pages/dashboard/admin/AddProducts";
import ManageProduct from "../pages/dashboard/admin/ManageProduct";

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
        // element: <PrivateRouter><Products /> </PrivateRouter>
      },
      { path: "/update-profile", 
        element: <UpdateProfile /> 
      },
      { path: "/cart-page", 
        element: <CartPage /> 
      },
      
    ],
  },
  { 
    path: "/signup", 
    element: <Signup /> 
  },
  {
    path: "/dashboard", 
    element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
    children:[
      { path: "", 
        element: <Dashboard /> 
      },
      { path: "users", 
        element: <Users /> 
      },
      {
        path : "add-product",
        element: <AddProducts/>
      },
      {
        path : "manage-product",
        element: <ManageProduct/>
      }
    
    ]
  }
]);

export default router;
