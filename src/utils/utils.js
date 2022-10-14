const cloudinary = require("cloudinary").v2;

// function to upload image

const upload_image_on_cloudinary = async (image, file_path) => {
  try {
    let image_upload = await cloudinary.uploader.upload(image, {
      folder: file_path,
    });
    return image_upload;
  } catch (error) {
    return error;
  }
};

module.exports = {
  upload_image_on_cloudinary,
};
