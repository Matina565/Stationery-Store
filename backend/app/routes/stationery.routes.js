module.exports = (app) => {
  const stationery = require("../controllers/stationery.controller.js");
  const upload = require("../middleware/upload");
  const router = require("express").Router();

  // Create a new stationery item with image upload
  router.post("/", upload.single('image'), stationery.create);

  // Retrieve all stationery items
  router.get("/", stationery.findAll);

  // Retrieve all in-stock stationery items
  router.get("/in-stock", stationery.findAllInStock);

  // Retrieve a single stationery item with id
  router.get("/:id", stationery.findOne);

  // Retrieve all stationery items by brand
  router.get("/brand/:brand", stationery.findByBrand);

  // Retrieve all stationery items by category
  router.get("/category/:category", stationery.findByCategory);

  // Update a stationery item with id
  router.put("/:id", upload.single('image'), stationery.update);

  // Delete a stationery item with id
  router.delete("/:id", stationery.delete);

  // Delete all stationery items
  router.delete("/", stationery.deleteAll);

  app.use("/api/stationery", router);
};
