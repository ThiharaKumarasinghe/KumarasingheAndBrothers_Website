import React from "react";
import useProducts from "../../../hooks/useProducts";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from 'sweetalert2'


const ManageProduct = () => {
  const [products, loading, refetch] = useProducts();
  const axiosSecure = useAxiosSecure();
  // console.log(products)

  //   handleDeleteItem
  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/products/${item._id}`);
        // console.log(res);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  // handle edit item
  const handleEditItem=(item)=>{

  };

  return (
    <div className="  w-full md:w-[870px] px-4 mx-auto">
      {/* Banner */}
      <h2 className=" text-2xl font-medium my-4">
        {" "}
        Manage <span className="text-darkGrey font-extrabold">Products</span>
      </h2>

      {/* Product table */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}

            {products.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <th>
                  <button className="btn btn-ghost bg-blue-500 btn-xs" onClick={()=>handleEditItem(item)} >
                    <FaEdit />
                  </button>
                </th>
                <th>
                  <button className="btn btn-ghost bg-red-400 btn-xs" onClick={()=>handleDeleteItem(item)}>
                    <MdDelete />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
