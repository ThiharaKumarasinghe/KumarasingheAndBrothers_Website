import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css"

const Main = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Childrens */}
      <div className=" min-h-screen"><Outlet/></div>
      

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Main;
