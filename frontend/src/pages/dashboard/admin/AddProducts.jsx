import React from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AddProducts = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // image hosting key
  const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const imageHosting_API = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostingKey}`


  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(imageHosting_API, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data)
    if (hostingImg.data.success) {
      const item = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price), 
        description: data.description,
        image: hostingImg.data.data.display_url
      };

      // console.log(menuItem);
      const postItem = axiosSecure.post('/products', item);
      if(postItem){
        reset()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Item is inserted successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };




  return (
    <div className=" w-full md:w-[870px] px-4 mx-auto">
      <h2 className=" text-2xl font-medium my-4">
        {" "}
        Upload <span className="text-darkGrey font-extrabold">New Product</span>
      </h2>

      {/* Form Start */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Name*</span>
            </label>
            <input
              type="text"
              placeholder="Product Name"
              className="input input-bordered w-full"
              {...register("name", { required: true })}
            />
          </div>

          {/* 2nd row */}
          <div className=" my-6 flex items-center gap-4">
            {/* categoty */}
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Choose Categoty*</span>
              </div>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled>Select Category</option>
                <option value="Pans">Pans</option>
                <option value="Pots">Pots</option>
                <option value="Bakeware">Bakeware</option>
                <option value="Cookers">Cookers</option>
              </select>
            </label>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <label className="form-control my-6">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell about this product"
            ></textarea>
          </label>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          {/* Submit button */}
          <button className="btn bg-darkGrey text-white hover:text-darkGrey my-6 ">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
