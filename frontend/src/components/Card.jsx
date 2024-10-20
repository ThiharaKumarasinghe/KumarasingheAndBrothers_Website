import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import useCart from "../hooks/useCart";

const Card = ({ product }) => {
  const { _id, name, description, price, category, image } = product;
  const [cart, refetch] = useCart();
  const [isHeartFillted, setIsHeartFilltered] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const haddleHeartClick = () => {
    setIsHeartFilltered(!isHeartFillted);
  };



// add to cart handler
const handleAddToCart = (item) => {
  if (user && user.email) {
    const cartItem = {
      productID: item._id,  
      name: item.name,
      quantity: 1,
      image: item.image,
      price: item.price,
      email: user.email,
    };

    axios
      .post("http://localhost:6001/carts", cartItem)
      .then((response) => {
        if (response.status === 201) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Item Added to Cart.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : "Error adding to cart!";
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `${errorMessage}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  } else {
    Swal.fire({
      title: "Please login to order the Products",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Login now!",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/signup", { state: { from: location } });
      }
    });
  }
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
      </Link>

      {/* Details */}
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className=" font-semibold">
            <span className=" text-red-500">$</span> {product.price}
          </h5>
          <button
            className="btn bg-darkGrey text-white hover:text-darkGrey"
            onClick={() => {
              handleAddToCart(product);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
