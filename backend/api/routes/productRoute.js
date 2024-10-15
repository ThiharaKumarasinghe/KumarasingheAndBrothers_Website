const express = require("express");
const router = express.Router();

// import product controller
const productController = require("../controllers/ProductController")

//get all products
router.get("/", productController.getAllProducts);


module.exports = router;