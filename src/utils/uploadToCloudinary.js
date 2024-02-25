const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const uploadToCloudinary = async (filePath, options) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, options);
    return result.secure_url; // Đường dẫn URL của ảnh trên Cloudinary
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

module.exports = uploadToCloudinary;
