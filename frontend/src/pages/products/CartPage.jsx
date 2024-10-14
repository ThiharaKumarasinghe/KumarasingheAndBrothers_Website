import React, { useContext, useState, useEffect } from "react";
import useCart from "../../hooks/useCart";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState(cart);
  const [totalPrice, setTotalPrice] = useState(0);

  // Update cartItems state whenever the cart data changes
  useEffect(() => {
    setCartItems(cart);
    calculateTotalPrice(cart);
  }, [cart]);

  // Calculate the total price of all cart items
  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      return sum + item.quantity * item.price; // quantity * price for each item
    }, 0);
    setTotalPrice(total);
  };

  // Handle delete item
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Make the delete request
        fetch(`http://localhost:6001/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json()) // return the parsed JSON response
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the item.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  // Handle increase quantity
  const handleIncrease = (item) => {
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }), // Increment quantity by 1
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return { ...cartItem, quantity: cartItem.quantity + 1 };
            }
            return cartItem;
          });

          setCartItems(updatedCart);
          calculateTotalPrice(updatedCart); // Recalculate the total price
          refetch(); // Refetch data to sync with backend
        }
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };

  // Handle decrease quantity
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }), // Decrease quantity by 1
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            const updatedCart = cartItems.map((cartItem) => {
              if (cartItem._id === item._id) {
                return { ...cartItem, quantity: cartItem.quantity - 1 };
              }
              return cartItem;
            });

            setCartItems(updatedCart);
            calculateTotalPrice(updatedCart); // Recalculate the total price
            refetch(); // Refetch data to sync with backend
          }
        })
        .catch((error) => console.error("Error updating quantity:", error));
    }
  };

  return (
    <div className="section-container">
      {/* Page Title */}
      <div className="space-y-6 px-4 mt-20 flex items-center justify-center">
        <h2 className="md:text-5xl text-4xl font-semibold md:leading-snug leading-snug">
          Products Added to{" "}
          <span className="text-darkGrey font-extrabold">Cart</span>
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto my-10">
        <table className="table">
          <thead className="bg-darkGrey text-white rounded-full">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {cart.map((item, index) => (
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
                <td>
                  <button
                    className="btn bg-lightGrey btn-xs mx-2"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    className="w-10 text-center border-none outline-none"
                    readOnly
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }} // Remove arrows
                  />
                  <button
                    className="btn bg-lightGrey btn-xs mx-2"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td>
                  <button className="btn btn-ghost btn-xs">{item.price}</button>
                </td>
                <td>
                  <MdDelete
                    className="text-red-500 cursor-pointer text-lg hover:scale-110 transition-all hover:bg-lightGrey rounded-md m-2"
                    onClick={() => handleDeleteItem(item)}
                  />
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
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Order details */}
      <div className="my-10 flex flex-col md:flex-row gap-4">
        {/* Customer details */}
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Customer Details</h3>
          <p>Name : {user.displayName}</p>
          <p>Email : {user.email}</p>
          <p>User_ID : {user.uid}</p>
        </div>

        {/* Shopping Details */}
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Shopping Details</h3>
          <p>Total Items : {cartItems.length}</p>
          <p>Total Price : {totalPrice}</p> {/* Updated total price */}
          <button className="btn bg-darkGrey text-white hover:text-darkGrey">
            Process Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
