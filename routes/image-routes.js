const express = require('express');
const router = express.Router();
const homeMiddleware = require('../middleware/homepage-middleware');
const adminMiddleware = require('../middleware/adminpage-middleware');
const uploadmiddleware = require('../middleware/upload-middleware');
const {uploadImage} = require('../controllers/image-controllers');
const {fetchImage} = require('../controllers/image-controllers');
const {deleteImage} = require('../controllers/image-controllers');
//upload the image
router.post('/upload', 
    homeMiddleware, 
    adminMiddleware, 
    uploadmiddleware.single('image'), 
    uploadImage
);

router.get('/fetch', homeMiddleware, fetchImage);
router.delete('/deleteimage',homeMiddleware, adminMiddleware, deleteImage );



//Get all the images


module.exports = router;