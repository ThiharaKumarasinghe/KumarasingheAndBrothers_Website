import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import ModelLogin from "./ModelLogin";
const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
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

            {/* login btn */}
            <input
              type="submit"
              value="Signup"
              className="btn bg-darkGrey text-white hover:bg-grey"
            />

            {/* close button */}
            <Link to="/" className="btn bg-coolGrey text-black hover:bg-grey my-2">
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
      </div>

      {/* Login model */}
      <ModelLogin />
    </div>
  );
};

export default Signup;
