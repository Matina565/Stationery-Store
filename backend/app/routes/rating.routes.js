module.exports = (app) => {
  const ratings = require("../controllers/rating.controller.js");

  var router = require("express").Router();

  // Create a new rating
  router.post("/", ratings.create);

  // Retrieve all ratings
  router.get("/", ratings.findAll);

  // Retrieve a single rating with id
  router.get("/:id", ratings.findOne);

  // Retrieve all ratings for a specific product
  router.get("/product/:productId", ratings.findByProductId);

  // Retrieve all ratings by a specific user
  router.get("/user/:userId", ratings.findByUserId);

  // Update a rating with id
  router.put("/:id", ratings.update);

  // Delete a rating with id
  router.delete("/:id", ratings.delete);

  // Delete all ratings for a specific product
  router.delete("/product/:productId", ratings.deleteAllByProductId);

  app.use("/api/ratings", router);
};
