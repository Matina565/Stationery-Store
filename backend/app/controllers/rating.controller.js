const Rating = require("../models/rating.model.js");

// Create and Save a new Rating
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Rating
  const rating = new Rating({
    userId: req.body.userId,
    productId: req.body.productId,
    rating: req.body.rating,
    comment: req.body.comment || "",
    created_at: new Date()
  });

  // Save Rating in the database
  Rating.create(rating, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Rating."
      });
    else res.send(data);
  });
};

// Retrieve all Ratings from the database
exports.findAll = (req, res) => {
  const productId = req.query.productId;

  Rating.getAll(productId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving ratings."
      });
    else res.send(data);
  });
};

// Find a single Rating by Id
exports.findOne = (req, res) => {
  Rating.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rating with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Rating with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Find all ratings by product ID
exports.findByProductId = (req, res) => {
  Rating.findByProductId(req.params.productId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No ratings found for product ID ${req.params.productId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ratings for product ID " + req.params.productId
        });
      }
    } else res.send(data);
  });
};

// Find all ratings by user ID
exports.findByUserId = (req, res) => {
  Rating.findByUserId(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No ratings found for user ID ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ratings for user ID " + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Update a Rating identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Rating.updateById(
    req.params.id,
    new Rating({
      rating: req.body.rating,
      comment: req.body.comment,
      updated_at: new Date()
    }),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Rating with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Rating with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Rating with the specified id in the request
exports.delete = (req, res) => {
  Rating.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Rating with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Rating with id " + req.params.id
        });
      }
    } else res.send({ message: "Rating was deleted successfully!" });
  });
};

// Delete all Ratings for a specific product
exports.deleteAllByProductId = (req, res) => {
  Rating.removeAllByProductId(req.params.productId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all ratings for this product."
      });
    else res.send({ message: `All ratings for product ${req.params.productId} were deleted successfully!` });
  });
};
