import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const Main = () => {
  const { loading } = useContext(AuthContext);
  return (
    <div>
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <div>
          {/* Navigation Bar */}
          <Navbar />

          {/* Childrens */}
          <div className=" min-h-screen">
            <Outlet />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;
