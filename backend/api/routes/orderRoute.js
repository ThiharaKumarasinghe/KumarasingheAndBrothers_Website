const express = require('express');
const router = express.Router();

// import order controller
const orderController = require("../controllers/OrderController");
const verifyToken = require('../middleware/varifyToken');


//get orders usding email
router.get("/",verifyToken, orderController.getOrdersUsingEmail);

// POST order
router.post("/", orderController.postOrder);

// get all orders
router.get("/all", orderController.getAllOrders);

// delete order
router.delete("/:id", orderController.deleteOrder);

// POST order RSA
router.post("/rsa", orderController.postOrderRSA);






module.exports = router;
