const Products = require("../models/Products");

const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// post a new menu item
const postProductItem = async(req, res) => {
    const newItem = req.body;
    try {
        const result = await Products.create(newItem);
        res.status(200).json(result)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllProducts,
    postProductItem
};
