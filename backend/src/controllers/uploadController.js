const {
  uploadToCloudinary
} = require("../services/uploadService");

const uploadImage = async (
  req,
  res
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const result =
      await uploadToCloudinary(
        req.file.buffer,
        "raviraj-portfolio"
      );

    res.status(200).json({
      success: true,
      message:
        "File uploaded successfully",
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  uploadImage
};