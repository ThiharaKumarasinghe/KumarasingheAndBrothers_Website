import React from "react";

const LoadingSpinner = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
