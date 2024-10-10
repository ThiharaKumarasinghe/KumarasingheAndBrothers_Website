import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Card = ({ product }) => {
  const [isHeartFillted, setIsHeartFilltered] = useState(false);

  const haddleHeartClick = () => {
    setIsHeartFilltered(!isHeartFillted);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl max-w-80">
      {/* Heart button */}
      <div
        className={`rating gap-1  absolute right-2 top-2 p-4 bg-darkGrey ${
          isHeartFillted ? "text-red-500" : "text-white"
        } z-10 rounded-xl`}
        onClick={haddleHeartClick}
      >
        <FaHeart className=" h-5 w-5 cursor-pointer" />
      </div>

      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <figure className=" md:h-72  items-center justify-center ">
          <img
            src={product.image}
            alt={product.name}
            className=" hover:scale-105 transition-all duration-200 w-full h-full object-contain"
          />
        </figure>

        {/* Details */}
        <div className="card-body">
          <h2 className="card-title">{product.name}</h2>
          <p>{product.description}</p>
          <div className="card-actions justify-between items-center mt-2">
            <h5 className=" font-semibold">
              <span className=" text-red-500">$</span> {product.price}
            </h5>
            <button className="btn bg-darkGrey text-white hover:text-darkGrey">
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
