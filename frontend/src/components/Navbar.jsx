import React, { useEffect, useState } from "react";
import logo from "/webLogo_2.png";
import mobilelogo from "/webLogo.png";
import { FaUser } from "react-icons/fa";
import ModelLogin from "./ModelLogin";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  // haddle scroll function
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  // Nav bar items
  const navItems = (
    <>
      <li>
        <a href="/">Home</a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Products</summary>
          <ul className="p-2">
            <li>
              <a href="/products">All</a>
            </li>
            <li>
              <a href="#submenu2">Aluminium</a>
            </li>
            <li>
              <a href="#submenu2">Wood</a>
            </li>
          </ul>
        </details>
      </li>

      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a href="#submenu1">Service 1</a>
            </li>
            <li>
              <a href="#submenu2">Service 2</a>
            </li>
            <li>
              <a href="#submenu2">Service 3</a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <a href="#item3">Offers</a>
      </li>
    </>
  );

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 right-0 left-0 transition-all duration-300 ease-in-out z-50 ">
      <div
        className={`navbar rounded-full xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          {/* Mobile dropdown button */}
          <div className="dropdown">
            <label
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navItems}
            </ul>
          </div>
          {/* Logo for both mobile and desktop */}
          <div className="btn btn-ghost">
            <img src={logo} alt="Logo" className="h-10 hidden md:flex" />
            <img
              src={mobilelogo}
              alt="Mobile Logo"
              className="h-10 flex md:hidden"
            />
          </div>
        </div>

        {/* Navbar for larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Right side buttons */}
        <div className="navbar-end items-center justify-end gap-2">
          {/* Search */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart */}
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hidden lg:flex"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => document.getElementById("loginModel").showModal()}
            className="btn rounded-full px-6 mr-4 bg-darkGrey text-white"
          >
            <FaUser /> Login
          </button>

          {/* Login model */}
          <ModelLogin/>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
