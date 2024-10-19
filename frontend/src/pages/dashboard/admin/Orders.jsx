import React, { useContext } from 'react';
import useOrder from '../../../hooks/useOrder';
import { AuthContext } from '../../../contexts/AuthProvider';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, refetch] = useOrder(); // Renamed to 'orders' for clarity
  const axiosSecure = useAxiosSecure();


  const deleteOrder = async (order) => {
    try {
      await axiosSecure.delete(`/orders/${order._id}`);
      // Use toast notification instead of alert for better UX
      alert("Order is removed from the database");
      refetch();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className='section-container mt-20'>
      <div className="flex items-center justify-between m-4">
        <h5 className="text-lg font-bold text-darkGrey">All Orders</h5>
        <h5>Total Orders: {Array.isArray(orders) ? orders.length : 0}</h5> {/* Added check for orders */}
      </div>

      {/* Order details */}
      <div className="overflow-x-auto">
        <table className="table md:w-[870px]">
          {/* head */}
          <thead className="bg-darkGrey text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {Array.isArray(orders) && orders.length > 0 ? ( // Added check for orders
              orders.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td>
                    {order.cart.map((item) => (
                      <div key={item._id}> {/* Use item._id directly */}
                        <p className="font-semibold">
                          {item.name} - {item.quantity}
                        </p>
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      onClick={() => deleteOrder(order)} // Pass the order object
                      className="btn btn-sm bg-red-500 text-white"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">Data not available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
