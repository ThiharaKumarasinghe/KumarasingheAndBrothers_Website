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

router.put("/:id", cartController.updateCart);




module.exports = router;




