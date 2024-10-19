const express = require('express');
const router = express.Router();

// import order controller
const orderController = require("../controllers/OrderController");

//get orders usding email
router.get("/", orderController.getOrdersUsingEmail);

// POST order
router.post("/", orderController.postOrder);

// get all orders
router.get("/all", orderController.getAllOrders);

// delete order
router.delete("/:id", orderController.deleteOrder);






module.exports = router;
