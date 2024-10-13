import React, { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook, FaApple } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";

const ModelLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useContext
  const { signupWithGmail, user, loginWithEmailAndPaswword } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("")

  // to redirection to home page
  const location = useLocation();
  const navigation = useNavigation();
  const from = location.state?.from?.pathname || "/";


  // Handle Google Sign-In
  const handleLogin = () => {
    signupWithGmail()
      .then((result) => {
        // The signed-in user info
        const user = result.user;
        alert("Login successful!");
        document.getElementById("loginModel").close()
        navigation(from, {replace: true})
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    loginWithEmailAndPaswword(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        alert("Login successful!");
        document.getElementById("loginModel").close()
        navigation(from, {replace: true})
      })
      .catch((error) => {
        const errorMsg = error.message;
        setErrorMessage("Provide correct Email and Password");
      });
  };

  return (
    <dialog id="loginModel" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-center">Please Login!</h3>
        <div className="modal-action flex flex-col justify-center">
          {/* Form Start */}
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* error message */}
            {
                errorMessage? <p className=" text-red-500 text-sm italic ">{errorMessage}</p>: ""
            }


            <div className="form-control mt-6">
              {/* Login button */}
              <input
                type="submit"
                value="Login"
                className="btn bg-darkGrey text-white hover:bg-grey"
              />
            </div>
            {/* Warning msg */}
            <p className=" text-center">
              Don't have an account?{" "}
              <Link
                className=" underline cursor-pointer text-darkGrey font-semibold"
                to="/signup"
              >
                Signup Now
              </Link>
            </p>
          </form>

          {/* Social Media Sign-in Buttons */}
          <div className="text-center space-x-3 mb-5">
            <button className="btn btn-square" onClick={handleLogin}>
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

        {/* Close Button */}
        <button
          onClick={() => document.getElementById("loginModel").close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
      </div>
    </dialog>
  );
};

export default ModelLogin;
