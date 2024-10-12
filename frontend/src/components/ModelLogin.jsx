import React from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaApple } from "react-icons/fa6";
import { useForm } from "react-hook-form"

const ModelLogin = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()

      const onSubmit = (data) => console.log(data)

  return (
    <dialog id="loginModel" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Please Login!</h3>
        <div className="modal-action flex flex-col justify-center">
          {/* Form Start */}
          <form className="card-body" method="dialog" onSubmit={handleSubmit(onSubmit)}>
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
                value="Login"
                className="btn bg-darkGrey text-white hover:bg-grey"
              />
            </div>

            {/* Warninh msg */}
            <p className=" text-center">
              Don't have an account?{" "}
              <Link
                className=" underline cursor-pointer text-darkGrey font-semibold "
                to="/signup"
              >
                Signup Now
              </Link>
            </p>
          </form>

          {/* Social media btn */}
          <div className=" text-center space-x-3 mb-5">
            <button className="btn btn-square">
              <FcGoogle />
            </button>
            <button className="btn btn-square">
              <FaSquareFacebook />
            </button>
            <button className="btn btn-square">
              <FaApple />
            </button>
          </div>
        </div>

        {/* close button */}
        <button 
        htmlFor="loginModel"
        onClick={() => document.getElementById("loginModel").close()}

        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </div>
    </dialog>
  );
};

export default ModelLogin;
