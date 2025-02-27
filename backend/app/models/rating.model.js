const sql = require("./db.js");

// constructor
const Rating = function(rating) {
  this.userId = rating.userId;
  this.productId = rating.productId;
  this.rating = rating.rating;
  this.comment = rating.comment;
  this.created_at = rating.created_at || new Date();
  this.updated_at = rating.updated_at || new Date();
};

Rating.create = (newRating, result) => {
  sql.query("INSERT INTO ratings SET ?", newRating, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created rating: ", { id: res.insertId, ...newRating });
    result(null, { id: res.insertId, ...newRating });
  });
};

Rating.findById = (id, result) => {
  sql.query(
    `SELECT r.*, u.name as user_name, p.name as product_name 
     FROM ratings r 
     JOIN users u ON r.userId = u.id 
     JOIN products p ON r.productId = p.id 
     WHERE r.id = ?`, 
    [id], 
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found rating: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Rating.getAll = (productId, result) => {
  let query = `
    SELECT r.*, u.name as user_name, p.name as product_name 
    FROM ratings r 
    JOIN users u ON r.userId = u.id 
    JOIN products p ON r.productId = p.id`;

  if (productId) {
    query += ` WHERE r.productId = ${productId}`;
  }

  query += ` ORDER BY r.created_at DESC`;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ratings: ", res);
    result(null, res);
  });
};

Rating.findByProductId = (productId, result) => {
  sql.query(
    `SELECT r.*, u.name as user_name 
     FROM ratings r 
     JOIN users u ON r.userId = u.id 
     WHERE r.productId = ? 
     ORDER BY r.created_at DESC`,
    [productId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found ratings: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Rating.findByUserId = (userId, result) => {
  sql.query(
    `SELECT r.*, p.name as product_name 
     FROM ratings r 
     JOIN products p ON r.productId = p.id 
     WHERE r.userId = ? 
     ORDER BY r.created_at DESC`,
    [userId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found ratings: ", res);
        result(null, res);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Rating.updateById = (id, rating, result) => {
  sql.query(
    "UPDATE ratings SET rating = ?, comment = ?, updated_at = ? WHERE id = ?",
    [rating.rating, rating.comment, new Date(), id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated rating: ", { id: id, ...rating });
      result(null, { id: id, ...rating });
    }
  );
};

Rating.remove = (id, result) => {
  sql.query("DELETE FROM ratings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted rating with id: ", id);
    result(null, res);
  });
};

Rating.removeAllByProductId = (productId, result) => {
  sql.query("DELETE FROM ratings WHERE productId = ?", [productId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ratings for product ${productId}`);
    result(null, res);
  });
};

module.exports = Rating;
