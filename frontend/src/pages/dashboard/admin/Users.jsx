import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MdDelete } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure()
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get('/users');
      return response.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  const handleDeleteUser = user => {
    axiosSecure.delete(`/users/${user._id}`).then(res => {
      alert(`${user.name} is removed from database`);
      refetch();
    })
  }

  return (
    <div>
      <div className=" flex items-center justify-between m-4">
        <h5 className=" text-lg font-bold text-darkGrey">All Users</h5>
        <h5>Total Users : {users.length}</h5>
      </div>

      {/* User details */}
      <div className="overflow-x-auto">
        <table className="table md:w-[870px]">
          {/* head */}
          <thead className=" bg-darkGrey text-white rounded-lg">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
            {users
              ? users.map((user, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {
                        user.role === "admin" ? (
                          "Admin"
                        ) : (
                          <button onClick={()=>{handleMakeAdmin(user)}} className=" btn btn-sm text-darkGrey">
                            <GrUserAdmin />
                          </button>
                        )
                        // default role is user if not admin or user
                      }
                    </td>
                    <td>
                      <button onClick={()=>{handleDeleteUser(user)}} className=" btn btn-sm bg-red-500 text-black">
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))
              : "Data not available"}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
