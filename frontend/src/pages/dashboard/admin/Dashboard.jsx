import React, { useState, useEffect } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Orders from "./Orders";

ChartJS.register(...registerables);

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();

  // React Query to fetch users and orders
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axiosSecure.get("/orders/all");
      return response.data;
    },
  });

  useEffect(() => {
    // Fetch Products Data
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:6001/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  // Bar chart for Orders by Month
  const orderChartData = {
    labels: ["January", "February", "March", "April", "May", "June"], // example labels
    datasets: [
      {
        label: "Orders",
        data: orders.map((order) => order.totalPrice),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Pie chart for Products by Category
  const productCategories = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const productChartData = {
    labels: Object.keys(productCategories),
    datasets: [
      {
        data: Object.values(productCategories),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  // Line chart for Users Growth over Time
  const userChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // example weeks
    datasets: [
      {
        label: "Users",
        data: users.map((_, index) => index + 1), // Simulating user growth
        fill: false,
        backgroundColor: "#FF6384",
        borderColor: "#FF6384",
      },
    ],
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <h2 className="text-2xl text-darkGrey font-bold mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Users Growth */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            User Growth
          </h3>
          <div className="h-64">
            <Line
              data={userChartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Products by Category */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Products by Category
          </h3>
          <div className="h-64">
            <Pie
              data={productChartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Orders by Month */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Orders by Month
          </h3>
          <div className="h-64">
            <Bar
              data={orderChartData}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
