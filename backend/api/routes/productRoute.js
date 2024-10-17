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

// get single product
router.get("/:id", productController.singleProductItem);

// update single product
router.put("/:id", productController.updateProductItem);





module.exports = router;