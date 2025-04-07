const express = require('express');
const router = express.Router();
const {loginUser, registerUser, changePassword} = require('../controllers/auth-controllers');
const homeMiddleware = require('../middleware/homepage-middleware');

//Login
router.post('/login', loginUser);


//Register user
router.post('/register', registerUser);

//Changer Password
router.post('/change-password',homeMiddleware, changePassword);

module.exports = router;