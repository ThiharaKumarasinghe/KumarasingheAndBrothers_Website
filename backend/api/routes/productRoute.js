const express = require("express");
const router = express.Router();

// import product controller
const productController = require("../controllers/ProductController")

//get all products
router.get("/", productController.getAllProducts);

// post a product
router.post("/", productController.postProductItem);

// delete a product
router.delete("/:id", productController.deleteProductItem);


module.exports = router;