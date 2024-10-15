const Carts = require("../models/Carts");



// get carts using email
const getCartUsingEmail = async (req, res) => {

    try {
        const email = req.query.email;
        const query = {email: email};
        const result = await Carts.find(query).exec();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// add to cart button -> POST cart
const addToCart = async (req, res) => {
    try {
      const { productID, name, quantity, image, price, email } = req.body;
      const cartItem = await Carts.create({
        productID, name, quantity, image, price, email,
      });
  
      console.log(productID, name, quantity, image, price)
      res.status(200).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Delete a cart item
const deleteCartItem = async (req, res) => {
    const cartId = req.params.id;
    try {
        const deletedCart = await Carts.findByIdAndDelete(cartId);
        if(!deletedCart){
            return res.status(401).json({message: "Cart Items not found!"})
        }
        res.status(200).json({message: "Cart Item Deleted Successfully!"})
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateCart = async (req, res) => {
    const cartId = req.params.id;  // Get cart item ID from the request parameters
    const { quantity } = req.body; // Get the new quantity from the request body

    try {
        // Find the cart item by ID and update only the quantity field
        const updatedCart = await Carts.findByIdAndUpdate(
            cartId, 
            { $set: { quantity: parseInt(quantity, 10) } }, // Ensure quantity is an integer
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        // If no cart item is found, return a 404 response
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        // Return the updated cart item
        res.status(200).json(updatedCart);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
};

// get single recipe
const getSingleCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const cartItem = await Carts.findById(cartId)
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getCartUsingEmail,
    addToCart,
    deleteCartItem,
    updateCart,
    getSingleCart,

};
