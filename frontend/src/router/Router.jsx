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
import UpdateProduct from "../pages/dashboard/admin/UpdateProduct";
import ProcessCheckout from "../pages/products/ProcessCheckout";
import ManageOrder from "../pages/dashboard/admin/ManageOrder";
import Orders from "../pages/dashboard/admin/Orders";
import RSA from "../pages/products/RSA";

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
      {
        path:"/process-checkout",
        element:<ProcessCheckout/>
      },
      {
        path:"/orders",
        element:<Orders/>
      },
      {
        path:"/rsa",
        element:<RSA/>
      }
      
    ],
  },
  { 
    path: "/signup", 
    element: <Signup /> 
  },
  //admin routers
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
      },
      {
        path : "update-product/:id",
        element: <UpdateProduct/>,
        loader: ({params})=>fetch(`http://localhost:6001/products/${params.id}`)
      },
      {
        path : "manage-order",
        element: <ManageOrder/>,
      }
    
    ]
  }
]);

export default router;
