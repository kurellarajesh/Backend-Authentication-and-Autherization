const express = require('express');
const router = express.Router();
const homeMiddleware = require('../middleware/homepage-middleware');
const adminMiddleware = require('../middleware/adminpage-middleware');

router.get('/admin-page', homeMiddleware, adminMiddleware, (req, res) => {
    return res.json({
        success : true,
        message : 'Welcome to the admin page'
    });
});

module.exports = router;