const Product = require('../models/product.model');

exports.create = async (req, res) => {
    try {
        if (!req.body.name || !req.body.price) {
            return res.status(400).send({
                message: "Product name and price are required"
            });
        }

        const product = new Product(req.body);
        const data = await Product.create(product);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the product."
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.send(products);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving products."
        });
    }
};

exports.findOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
        }
        res.send(product);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error retrieving product with id " + req.params.id
        });
    }
};

exports.update = async (req, res) => {
    try {
        const success = await Product.updateById(req.params.id, req.body);
        if (!success) {
            return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
        }
        res.send({ message: "Product updated successfully." });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Error updating product with id " + req.params.id
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const success = await Product.remove(req.params.id);
        if (!success) {
            return res.status(404).send({
                message: `Product not found with id ${req.params.id}`
            });
        }
        res.send({ message: "Product deleted successfully!" });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Could not delete product with id " + req.params.id
        });
    }
};