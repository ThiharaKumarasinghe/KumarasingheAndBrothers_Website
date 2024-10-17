const Products = require("../models/Products");

const getAllProducts = async (req, res) => {
    try {
        // Fetch all products and sort by createdAt in descending order
        const products = await Products.find({}).sort({ createdAt: -1 });
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

// delete a menu item
const deleteProductItem = async(req, res) => {
    const productID = req.params.id;
    // console.log(productID)
    try {
        const deletedItem = await Products.findByIdAndDelete(productID);

        // console.log(deletedItem);

        if(!deletedItem){
            return res.status(404).json({ message:"Item not found"})
        }
        res.status(200).json({message: "Item deleted successfully!"})
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get single menu item
const singleProductItem = async (req, res) => {
    const Id = req.params.id;
    try {
        const res = await Products.findById(Id);
        res.status(200).json(res)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update single menu item
const updateProductItem = async (req, res) => {
    const menuId = req.params.id;
    const { name, image, category, price} = req.body;
    try {
        const updatedMenu = await Products.findByIdAndUpdate(menuId, 
            { name, image, category, price}, 
            {new: true, runValidator: true}
            );

        if(!updatedMenu) {
            return res.status(404).json({ message:"Item not found"})
        }

        res.status(200).json(updatedMenu)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getAllProducts,
    postProductItem,
    deleteProductItem,
    singleProductItem,
    updateProductItem

};
