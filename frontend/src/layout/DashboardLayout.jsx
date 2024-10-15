import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaUsersCog } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { FaUser } from "react-icons/fa";

import logo from "/webLogo.png";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-left justify-start">
        {/* Page content here */}
        <div className=" flex items-center justify-between mx-4 gap-36">
          <label
            htmlFor="my-drawer-2"
            className="btn bg-darkGrey text-white drawer-button lg:hidden"
          >
            <TiThMenu />
          </label>

          <button className=" btn bg-darkGrey text-white rounded-full px-6 flex items-center gap-2 mt-2">
            <FaUser /> Logout
          </button>
        </div>

        {/* Outlet */}
        <div className=" mt-5 md:mt-2 mx-4">
          <Outlet />
        </div>


      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li className=" mb-4">
            <Link to="/dashboard">
              <img src={logo} alt="logo" className=" h-12" />
              <div className="badge badge-primary">Admin</div>
            </Link>
          </li>
          <hr className=" mb-1" />
          <li>
            <Link to="/dashboard">
              <MdDashboard /> Dashboard
            </Link>
          </li>

          <li>
            <Link to="/dashboard">
              <FaShoppingBag /> Manage Booking
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users">
              <IoMdAddCircle /> Add Products
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <FaEdit /> Manage Products
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users">
              <FaUsersCog /> All User
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
