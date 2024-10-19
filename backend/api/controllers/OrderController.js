const Orders = require("../models/Orders");

// get orders using email
const getOrdersUsingEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Orders.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post order
const postOrder = async (req, res) => {
  const { email, name, cart, totalPrice } = req.body;
  try {
    const existingOrder = await Orders.findOne({ cart });
    if (existingOrder) {
      return res.status(400).json({ message: "Order already exists!" });
    }
    const order = await Orders.create({ email, name, cart, totalPrice });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a order
const deleteOrder = async (req, res) => {
  const userID = req.params.id;
  try {
    const order = await Orders.findByIdAndDelete(userID);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    res.status(200).json({message:"Order deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrdersUsingEmail,
  postOrder,
  getAllOrders,
  deleteOrder,
};
