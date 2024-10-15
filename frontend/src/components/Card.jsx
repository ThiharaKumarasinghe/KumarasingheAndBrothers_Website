import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";

const Card = ({ product }) => {
  const { _id, name, description, price, category, image } = product;
  const [isHeartFillted, setIsHeartFilltered] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const haddleHeartClick = () => {
    setIsHeartFilltered(!isHeartFillted);
  };

  // Add to cart button
  const handleAddToCart = async (item) => {
    if (user && user?.email) {
      // Fetch current cart items to check if the product is already added
      const response = await fetch(
        `http://localhost:6001/carts?email=${user.email}`
      );
      const cartData = await response.json();

      // Check if the item already exists in the cart
      const existingItem = cartData.find(
        (cartItem) => cartItem.productID === item._id
      );

      if (existingItem) {
        // If item is already in the cart, show message
        Swal.fire({
          position: "center",
          icon: "info",
          title: "Item is already in the cart",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // If item is not in the cart, add it
        const cartItem = {
          productID: item._id,
          name: item.name,
          quantity: 1,
          image: item.image,
          price: item.price,
          email: user.email,
        };

        // Add the item to the cart
        fetch("http://localhost:6001/carts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cartItem),
        })
          .then((res) => res.json())
          .then((data) => {
            // Check if the response contains the cart item ID (_id)
            if (data._id) { // MongoDB usually returns _id
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Product Added to Cart",
                showConfirmButton: false,
                timer: 1500,
              });
            } else {
              // Handle case where item was not added
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Failed to add product to cart",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            // Catch any errors during the fetch operation
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Error occurred",
              text: error.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    } else {
      // If user is not logged in, show login prompt
      Swal.fire({
        title: "Please Login",
        text: "Without an account, you cannot add products to the cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now",
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
