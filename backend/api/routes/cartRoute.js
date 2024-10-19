const express = require('express');
const router = express.Router();

// import cart controller
const cartController = require("../controllers/CartController");
const verifyToken = require('../middleware/varifyToken');


// get carts using email
router.get("/",verifyToken, cartController.getCartUsingEmail);

// add to cart button -> POST cart
router.post("/", cartController.addToCart);

// delete a cart item
router.delete("/:id", cartController.deleteCartItem);

// update the cart item
router.put("/:id", cartController.updateCart);

// get single recipe
router.get("/:id", cartController.getSingleCart);

// clear cart
router.delete("/", cartController.clearCartByEmail);




module.exports = router;




