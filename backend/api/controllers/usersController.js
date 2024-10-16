const Users = require("../models/Users");

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new user
const createUser = async (req, res) => {
  const newUser = req.body;
  const query = { email: newUser.email };

  try {
    // Use findOne() to check if a user with the given email already exists
    const existingUser = await Users.findOne(query);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Create the new user if no existing user is found
    const result = await Users.create(newUser);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await Users.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User deleted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get admin
const getAdmin = async (req, res) => {
  const email = req.params.email;
  const query = { email: email };

  try {
    const user = await Users.findOne(query);
    if (email !== req.decoded.email) {
      return res.status(401).json({ message: "Unauthorized access!" });
    }

    let admin = false;
    if (user) {
      admin = user?.role == "admin";
    }
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// make a admin of a user
const makeAdmin = async (req, res) => {
  const userId = req.params.id;
  const { name, email, photoURL, roles } = req.body;
  try {
    const updateUser = await Users.findByIdAndUpdate(
      userId,
      { role: "admin" },
      { new: true, runValidators: true }
    );
    
    if (!updateUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
};
