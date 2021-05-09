const express = require('express');
const router = express.Router();

const userController = require("../controller/userController")
const jwtHelper = require('../middelware/verifyToken');

router.post('/register', userController.register)

router.post('/login', userController.login)

router.get('/userProfile',jwtHelper.verifyJwtToken, userController.userProfile);

router.get('/listUsers', userController.listUsers);

router.put('/editUsers/:id', userController.editUsers);

router.get('/viewUseres/:id', userController.viewUseres);

module.exports = router;