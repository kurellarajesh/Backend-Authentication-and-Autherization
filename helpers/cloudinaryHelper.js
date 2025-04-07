const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = async (filePath, retries = 3) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: "uploads",
            transformation: [
                { width: 1000, height: 1000, crop: "limit" } // Limits large images
            ]
        });
        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error('Error while uploading to Cloudinary:', error);
        if (error.http_code === 499 && retries > 0) {
            console.log(`Retrying upload... (${3 - retries + 1})`);
            return uploadToCloudinary(filePath, retries - 1);
        }
        throw new Error('Error while uploading to Cloudinary: ' + error.message);
    }
};

module.exports = uploadToCloudinary;