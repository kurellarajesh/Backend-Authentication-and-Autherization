const express = require('express');
const router = express.Router();
const homeMiddleware = require('../middleware/homepage-middleware');

router.get('/welcome', homeMiddleware, (req, res) => {
    const {userId, emailid, role} = req.userInfo;
    res.json({
        message : 'welcome to the home page',
        user : {
            _id : userId,
            emailid,
            role
        }
    });
});

module.exports = router;