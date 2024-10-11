import React, { useEffect, useState } from "react";
import Card from "../../components/Card";

const Products = () => {
  const [products, setProducts] = useState([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track selected category
  const [sortOption, setSortOption] = useState("Default"); // Track sort option
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 9;

  // Loading data from backend or JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products.json");
        const data = await response.json();
        // console.log("Fetched products:", data); // Debug log for fetched products
        setProducts(data);
        setFilteredProducts(data); // Initially display all products
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  // Filter products based on category
  const filterProduct = (category) => {
    const filtered =
      category === "All"
        ? products
        : products.filter((item) => item.category === category);
    // console.log("Filtered products:", filtered); // Debug log for filtered products
    setFilteredProducts(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Show all products function
  const showAll = () => {
    setFilteredProducts(products);
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  // Sort products on A-Z, Z-A, Low-High, and High-Low
  const handleSortChange = (option) => {
    setSortOption(option);

    // Shallow copy of filteredProducts to sort independently
    let sortedProducts = [...filteredProducts];

    switch (option) {
      case "A-Z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Low-High":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "High-Low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  };

  //Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

 



  return (
    <div className="section-container mt-20">
      {/* Product banner */}
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="md:w-3/4 space-y-6 px-4 text-center">
          <h2 className="md:text-5xl text-4xl font-semibold md:leading-snug leading-snug">
            Welcome to Our Aluminium{" "}
            <span className="text-darkGrey font-extrabold">
              Kitchen Essentials
            </span>
          </h2>

          <p className="text-xl text-grey mt-4">
            Transform your cooking experience with our premium aluminium kitchen
            items. Durable, lightweight, and stylish—perfect for every home
            chef!
          </p>

          {/* Order Now Button */}
          <button className="text-white bg-darkGrey font-bold py-3 px-8 items-center justify-center rounded-full mt-8 hover:scale-105 transition-all">
            Order Now
          </button>
        </div>
      </div>

      {/* Product Section */}
      <div className=" my-10 ">
        {/* Filtering buttons and sort option */}
        <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
          {/* Category buttons */}
          <button
            onClick={showAll}
            className={
              selectedCategory === "All"
                ? "text-darkGrey underline font-bold"
                : ""
            }
          >
            All
          </button>
          <button
            onClick={() => filterProduct("Pans")}
            className={
              selectedCategory === "Pans"
                ? "text-darkGrey underline font-bold"
                : ""
            }
          >
            Pans
          </button>
          <button
            onClick={() => filterProduct("Pots")}
            className={
              selectedCategory === "Pots"
                ? "text-darkGrey underline font-bold"
                : ""
            }
          >
            Pots
          </button>
          <button
            onClick={() => filterProduct("Bakeware")}
            className={
              selectedCategory === "Bakeware"
                ? "text-darkGrey underline font-bold"
                : ""
            }
          >
            Bakeware
          </button>
          <button
            onClick={() => filterProduct("Cookers")}
            className={
              selectedCategory === "Cookers"
                ? "text-darkGrey underline font-bold "
                : ""
            }
          >
            Cookers
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            className=" ml-10 bg-lightGrey rounded-xl py-2 px-4"
          >
            <option value="Default">Default</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="Low-High">Price: Low to High</option>
            <option value="High-Low">Price: High to Low</option>
          </select>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {currentProducts.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>

        {/* Pagination section */}
        <div className=" my-6  justify-center flex">
            {
                Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }, (_, i) => i + 1)
                   .map((page) => (
                        <button
                            key={page}
                            className={`px-4 py-2 text-center ${currentPage === page? 'bg-darkGrey text-white rounded-full p-3' : 'text-darkGrey'}`}
                            onClick={() => paginate(page)}
                        >
                            {page}
                        </button>
                    ))
            }
        </div>
      </div>
    </div>
  );
};

export default Products;
