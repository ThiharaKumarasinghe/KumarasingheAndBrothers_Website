const express = require('express');
const router = express.Router();

const userController = require('../controllers/usersController');

// get all users
router.get('/', userController.getAllUsers);

// create a new user
router.post('/', userController.createUser);

// delete a user
router.delete('/:id', userController.deleteUser);

// get admin
router.get('/admin/:email', userController.getAdmin);

// create a new admin
router.put('/admin/:id', userController.makeAdmin);


module.exports = router;
