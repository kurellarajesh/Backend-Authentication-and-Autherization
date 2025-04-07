const Image = require('../models/image');
const uploadToCloudinary = require('../helpers/cloudinaryHelper');
const { findById } = require('../models/user');
const cloudinary = require('../config/cloudinary');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong, Please upload again'
            });
        }

        const { url, publicId } = await uploadToCloudinary(req.file.path);

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newlyUploadedImage.save();

        res.status(201).json({
            success: true,
            message: 'Uploaded successfully',
            image: newlyUploadedImage
        });
    } catch (error) {
        console.error('Error in uploadImage:', error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        });
    }
};


//Fetch Image
const fetchImage = async(req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const skip = (page - 1)*limit;

        const sortBy = req.query.sortBy || 'createdAt()';
        const sortOrder = req.query.sortOeder === asc ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages/ limit);

        const sortObj = {};
        sortObj[sortBy] = sortOrder

        const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if(images){
            return res.status(200).json({
                success : true,
                currentPage : page,
                totalPages : totalPages,
                totalImages : totalImages,
                data : images,
                message : 'Images fetched successfull'
            });
        }
    } catch(error){
        console.log(error);
        return res.status(400).json({
            success : false,
            message : 'No images found'
        });
    }
};

//Delete Image
const deleteImage = async(req, res) => {
    try {
        const currentImageId = req.params.id;

        const userId = req.userInfo.userId;

        const image = await findById(currentImageId);

        if(!image){
            return res.status(404).json({
                success : false,
                message : 'Image not found'
            });
        }

        if(Image.uploadedBy.toString() != userId){
            return res.status(400).json({
                success : false,
                message : 'Not Authorized'
            });
        }

        //Delete from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        //Delete From DataBase

        await Image.findByIdAndUpdate(currentImageId);

        res.status(200).json({
            success : true,
            message : 'Deleted successfully'
        });

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success : false,
            message : 'Image deletion failed'
        });
    }
};

module.exports = {uploadImage, fetchImage, deleteImage}