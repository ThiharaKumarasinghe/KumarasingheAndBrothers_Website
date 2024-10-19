import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDelete, MdDone } from "react-icons/md";

const ManageOrder = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: orderList = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axiosSecure.get("/orders/all");
      return response.data;
    },
  });

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

  const acceptOrder = async (id) => {
    try {
      await axiosSecure.put(`/orders/${id}/accept`);
      refetch(); // Refetch orders after acceptance
      console.log("Order has been accepted");
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4">
        <h5 className="text-lg font-bold text-darkGrey">All Orders</h5>
        <h5>Total Orders: {orderList.length}</h5>
      </div>

      {/* Order details */}
      <div className="overflow-x-auto">
        <table className="table md:w-[870px]">
          {/* head */}
          <thead className="bg-darkGrey text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {orderList.length > 0 ? (
              orderList.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>
                    {order.cart.map((item, i) => (
                      <div key={item._id || i}> {/* Use item._id if available */}
                        <p className="font-semibold">
                          {item.name} - {item.quantity}
                        </p>
                      </div>
                    ))}
                  </td>
                  <td>
                    <button
                      onClick={() => acceptOrder(order._id)} // Call acceptOrder instead
                      className="btn btn-sm bg-blue-500 text-white"
                    >
                      <MdDone />
                    </button>
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
                <td colSpan="5" className="text-center">Data not available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrder;
