import React, { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { FaCartArrowDown } from "react-icons/fa6";
import { RiCustomerService2Fill } from "react-icons/ri";

import logo from "/webLogo.png";
import Signup from "../components/Signup";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../contexts/AuthProvider";

const sharedLink = (
  <>
    <li>
      <Link to="/">
        <IoHome /> Home
      </Link>
    </li>
    <li>
      <Link to="/products">
        <RiAlignItemLeftFill /> Products
      </Link>
    </li>
    <li>
      <Link to="/">
        <FaCartArrowDown /> Orders
      </Link>
    </li>
    <li>
      <Link to="/">
        <RiCustomerService2Fill /> Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Declare useNavigate hook

  if (loading || isAdminLoading) {
    return <LoadingSpinner />;
  }

  const handleLogout = () => {
    logout()
      .then(() => {
        // Sign-out successful
        alert("Logout successful!");

        // Navigate to homepage after successful logout
        navigate("/");
      })
      .catch((error) => {
        // Handle error
        console.error("Error logging out:", error);
      });
  };

  return (
    <div>
      {isAdmin ? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-left justify-start">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4 gap-36">
              <label
                htmlFor="my-drawer-2"
                className="btn bg-darkGrey text-white drawer-button lg:hidden"
              >
                <TiThMenu />
              </label>

              <button
                onClick={handleLogout}
                className="btn bg-darkGrey text-white rounded-full px-6 flex items-center gap-2 mt-2"
              >
                <FaUser /> Logout
              </button>
            </div>

            {/* Outlet */}
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li className="mb-4">
                <Link to="/dashboard">
                  <img src={logo} alt="logo" className="h-12" />
                  <div className="badge badge-primary">Admin</div>
                </Link>
              </li>
              <hr className="mb-1" />
              <li>
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>

              <li>
                <Link to="/dashboard/manage-order">
                  <FaShoppingBag /> Manage Orders
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-product">
                  <IoMdAddCircle /> Add Products
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-product">
                  <FaEdit /> Manage Products
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users">
                  <FaUsersCog /> All User
                </Link>
              </li>

              <hr className="mb-1 mt-3" />

              {/* Shared Link */}
              {sharedLink}
            </ul>
          </div>
        </div>
      ) : (
        <Signup />
      )}
    </div>
  );
};

export default DashboardLayout;
