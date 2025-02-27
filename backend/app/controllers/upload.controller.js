const fs = require('fs');
const path = require('path');

exports.uploadProductImage = async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({
        success: false,
        message: req.fileValidationError
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file"
      });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: {
        filename: req.file.filename,
        path: `/uploads/products/${req.file.filename}`
      }
    });
  } catch (error) {
    console.error('Error in uploadProductImage:', error);
    res.status(500).json({
      success: false,
      message: "Could not upload the image"
    });
  }
};

exports.getProductImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../../uploads/products', filename);

    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    res.sendFile(filepath);
  } catch (error) {
    console.error('Error in getProductImage:', error);
    res.status(500).json({
      success: false,
      message: "Could not retrieve the image"
    });
  }
};

exports.deleteProductImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../../uploads/products', filename);

    // Check if file exists
    if (!fs.existsSync(filepath)) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    // Delete file
    fs.unlinkSync(filepath);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully"
    });
  } catch (error) {
    console.error('Error in deleteProductImage:', error);
    res.status(500).json({
      success: false,
      message: "Could not delete the image"
    });
  }
};
