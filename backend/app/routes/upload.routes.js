const express = require("express");
const upload = require("../middleware/upload");
const uploadController = require("../controllers/upload.controller");

module.exports = (app) => {
  const router = express.Router();

  // Upload a product image
  router.post("/product", 
    upload.single('image'), 
    uploadController.uploadProductImage
  );

  // Get a product image
  router.get("/product/:filename", 
    uploadController.getProductImage
  );

  // Delete a product image
  router.delete("/product/:filename", 
    uploadController.deleteProductImage
  );

  app.use("/api/upload", router);
};
