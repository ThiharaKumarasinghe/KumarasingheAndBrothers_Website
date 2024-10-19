import React from "react";
import bannerImage from "/homePage/bannerImage.png";
import item1 from "/homePage/item1.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="mx-auto xl:px-24 px-4 bg-gradient-to-r from-white from-0% to-lightGrey to-100% min-h-screen flex justify-center items-center">
      <div className=" flex py-24 flex-col-reverse md:flex-row items-center justify-between gap-8 max-w-screen-2xl">
        {/* Texts */}
        <motion.div
          className=" md:w-1/2 space-y-6 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className=" md:text-5xl text-4xl font-semibold md:leading-snug leading-snug">
            Welcome to Our Aluminium{" "}
            <span className=" text-darkGrey font-extrabold">
              Kitchen Essentials
            </span>
          </h2>

          <p className=" text-xl text-grey mt-4">
            Transform your cooking experience with our premium aluminium kitchen
            items. Durable, lightweight, and stylish perfect for every home
            chef!
          </p>

          {/* Button */}
          <motion.button
            className="text-white bg-darkGrey font-bold py-3 px-8 items-center justify-center rounded-full mt-8 hover:scale-105 transition-all"
            whileHover={{ scale: 1.1 }}
          >
            Order Now
          </motion.button>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 50, duration: 1 }}
        >
          <img
            src={bannerImage}
            alt="Banner Image"
            className="object-contain w-full h-full"
          />

          {/* Best product with rating */}
          <div className="md:flex hidden flex-col md:flex-row items-center justify-around -m-24 gap-5">
            <motion.div
              className="bg-white flex py-2 px-3 rounded-2xl items-center gap-4 shadow-md min-w-64"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 rounded-2xl">
                <img
                  src={item1}
                  alt="product"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h5 className="font-medium mb-1">Product 01</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
                <p className="text-red-500">Rs. 300.00</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white flex py-2 px-3 rounded-2xl items-center gap-4 shadow-md min-w-64"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 rounded-2xl">
                <img
                  src={item1}
                  alt="product"
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <h5 className="font-medium mb-1">Product 01</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                  />
                </div>
                <p className="text-red-500">Rs. 300.00</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
