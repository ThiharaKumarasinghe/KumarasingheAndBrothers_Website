const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');
const verifyToken = require('../middleware/varifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');


// get all users
router.get('/',verifyToken, verifyAdmin,userController.getAllUsers);

// create a new user
router.post('/', userController.createUser);

// delete a user
router.delete('/:id',verifyToken, verifyAdmin, userController.deleteUser);

// get admin
router.get('/admin/:email', verifyToken, userController.getAdmin);

// create a new admin
router.patch('/admin/:id',verifyToken, verifyAdmin, userController.makeAdmin);


module.exports = router;
