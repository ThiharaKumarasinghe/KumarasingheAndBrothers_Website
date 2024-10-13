import React, { useContext } from "react";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../contexts/AuthProvider";

const Profile = ({ user }) => {

    const {logout}=useContext(AuthContext)

    const handleRefresh = () => {
        window.location.reload();
      };

    const hadleLogout =()=>{

        logout().then(() => {
            // Sign-out successful.
            alert("Logout successful!")
            handleRefresh();
          }).catch((error) => {
            // An error happened.
          });

    }
  return (
    <div>
      <div className="drawer drawer-end z-[60]">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              {user.photoURL ? (
                <img
                  alt="Profile Photo"
                  src={user.photoURL}
                  className="object-cover rounded-full"
                />
              ) : (
                <CgProfile className="text-4xl mx-auto" />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile">Profile</a>
            </li>
            <li>
              <a>Order</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={hadleLogout}>Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;