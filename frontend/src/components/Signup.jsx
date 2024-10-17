import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import ModelLogin from "./ModelLogin";
import { AuthContext } from "../contexts/AuthProvider";
import axios from "axios";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import useAxiosPublic from "../hooks/useAxiosPublic";



const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { createUser, user, updateUserProfile, signupWithGmail } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  const axiosPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // Create account
  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    // console.log(email, password)
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        updateUserProfile(data.email, data.photoURL).then(() => {
          const userInfor = {
            name: data.name,
            email: data.email,
          };
          axiosPublic.post("/users", userInfor)
            .then((response) => {
              // console.log(response);
              alert("Signin successful!");
              navigate(from, { replace: true });
            });
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  // login with google
  const handleRegister = () => {
    signupWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        axios
            .post("http://localhost:6001/users", userInfor)
            .then((response) => {
              // console.log(response);
              alert("Account Creation successful!");
              navigate("/");
            });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className=" max-w-md flex items-center justify-center my-20 shadow  mx-auto rounded-xl">
      <div className=" flex justify-center items-center">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Upper msg */}
          <h3 className="font-bold text-lg text-center">Please Signup Now!</h3>

          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="name"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name")}
            />
          </div>


          {/* email*/}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
              required
            />
          </div>
          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            {/* Error msg */}
            {errorMessage ? (
              <p className=" text-red-500 text-sm italic mb-2 ">
                {errorMessage}
              </p>
            ) : (
              ""
            )}

            {/* login btn */}
            <input
              type="submit"
              value="Signup"
              className="btn bg-darkGrey text-white hover:bg-grey"
            />

            {/* close button */}
            <Link
              to="/"
              className="btn bg-coolGrey text-black hover:bg-grey my-2"
            >
              Close
            </Link>
          </div>

          {/* Warninh msg */}
          <p className=" text-center">
            Have an account?{" "}
            <button
              className=" underline cursor-pointer text-darkGrey font-semibold "
              onClick={() => document.getElementById("loginModel").showModal()}
            >
              Login
            </button>
          </p>
        </form>

        {/* <div className="text-center space-x-3">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-lightGrey hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-lightGrey hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-lightGrey hover:text-white">
            <FaGithub />
          </button>
        </div> */}


      </div>

      {/* Login model */}
      <ModelLogin />
    </div>
  );
};

export default Signup;
