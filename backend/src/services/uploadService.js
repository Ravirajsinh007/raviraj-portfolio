const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

/**
 * Upload file buffer to Cloudinary
 * @param {Buffer} fileBuffer
 * @param {String} folder
 * @returns {Promise<Object>}
 */
const uploadToCloudinary = (
  fileBuffer,
  folder = "raviraj-portfolio"
) => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto"
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(fileBuffer)
      .pipe(uploadStream);
  });
};

/**
 * Delete file from Cloudinary
 * @param {String} publicId
 * @returns {Promise<Object>}
 */
const deleteFromCloudinary = async (
  publicId
) => {
  try {
    const result =
      await cloudinary.uploader.destroy(
        publicId
      );

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary
};