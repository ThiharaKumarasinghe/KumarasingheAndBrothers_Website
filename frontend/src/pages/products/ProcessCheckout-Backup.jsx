import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import { useLocation, useNavigate } from "react-router-dom";

const ProcessCheckout = () => {
  const { user } = useAuth();
  const [cart] = useCart();
  const [cartItems] = useState(cart); // Assume cartItems are fetched correctly
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckout = async (cartItems, user) => {
    // Calculate total price
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (user && user.email) {
      const orderItems = {
        name: user.displayName || "Anonymous User",
        totalPrice: totalPrice,
        email: user.email,
        cart: cartItems,
      };

      try {
        const response = await axios.post("http://localhost:6001/orders", orderItems);

        
        if (response.status === 201) {
          const clearCart = await axios.delete(` http://localhost:6001/carts?email=${user.email}`)

          if (clearCart.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Order processed and added to the database successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/", { state: { from: location } });
            
          }


        }
      } catch (error) {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : "Error adding to Order!";
        Swal.fire({
          position: "center",
          icon: "warning",
          title: `${errorMessage}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else {
      Swal.fire({
        title: "Please login",
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
    <div className="section-container mt-20">
      <h2 className="text-2xl text-darkGrey font-bold mb-8">Checkout</h2>

      {/* User details */}
      <div className="font-semibold text-sm mb-3">
        <h2>User Name : {user?.displayName || "Anonymous"}</h2>
        <h2>User Email : {user?.email || "Not provided"}</h2>
      </div>

      {/* Cart details */}
      <div className="overflow-x-auto my-10">
        <table className="table">
          <thead className="bg-darkGrey text-white rounded-full">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt="Product Image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">{item.price}</button>
                </td>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Total Price and Button */}
      <div className="flex flex-col items-end p-2 mb-28">
        <p className="font-semibold mb-2">
          Total Price: Rs.{" "}
          {cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </p>
        <button
          onClick={() => handleCheckout(cartItems, user)}
          className="btn"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ProcessCheckout;
