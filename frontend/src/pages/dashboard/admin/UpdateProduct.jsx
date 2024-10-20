import React, { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from 'sweetalert2'
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpdateProduct = () => {

    const item = useLoaderData();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const navitage = useNavigate();

    // image hosting key
    const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const imageHosting_API = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
    
    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);  // Set loading to true when submission starts

        const formData = new FormData();
        formData.append("image", data.image[0]);

        try {
          // Upload image to imgbb
          const hostingImg = await axiosPublic.post(imageHosting_API, formData, {
            headers: {
              "content-type": "multipart/form-data",
            },
          });

          if (hostingImg.data.success) {
            const updatedProduct = {
              name: data.name,
              category: data.category,
              price: parseFloat(data.price),
              description: data.description,
              image: hostingImg.data.data.display_url
            };
    
            // Update product in the backend
            const postItem = await axiosSecure.put(`/products/${item._id}`, updatedProduct);
            if (postItem) {
              reset();  // Reset the form
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your product is updated successfully!",
                showConfirmButton: false,
                timer: 1500
              });
              navitage('/dashboard/manage-product')
            }
          }
        } catch (error) {
          console.error("Error updating product:", error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Failed to update product!",
            showConfirmButton: false,
            timer: 1500
          });
        } finally {
          setIsLoading(false);  // Set loading to false when process is complete
        }
      };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-medium my-4">
        Update <span className="text-darkGrey font-extrabold">Product</span>
      </h2>

      {/* Show loading spinner or message */}
      {isLoading && (
        <div className="my-4 text-center">
          <div className="loader">Loading...</div>
          <p>Updating Product, Please Wait...</p>
        </div>
      )}

      {!isLoading && (
        <div>
          {/* Form Start */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name*</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="input input-bordered w-full"
                defaultValue={item.name}
                {...register("name", { required: true })}
              />
            </div>

            {/* 2nd row */}
            <div className="my-6 flex items-center gap-4">
              {/* Category */}
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Choose Category*</span>
                </div>
                <select
                  {...register("category", { required: true })}
                  className="select select-bordered"
                  defaultValue={item.category}
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
                  defaultValue={item.price}
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
                defaultValue={item.description}
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
              Update Product
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
