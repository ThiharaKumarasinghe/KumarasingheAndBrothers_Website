const express = require('express');
const router = express.Router();

// import cart controller
const cartController = require("../controllers/CartController");

// get carts using email
router.get("/", cartController.getCartUsingEmail);

// add to cart button -> POST cart
router.post("/", cartController.addToCart);

// delete a cart item
router.delete("/:id", cartController.deleteCartItem);

// update the cart item
router.put("/:id", cartController.updateCart);

// get single recipe
router.get("/:id", cartController.getSingleCart);




module.exports = router;




