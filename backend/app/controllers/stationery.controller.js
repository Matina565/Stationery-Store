const Stationery = require("../models/stationery.model.js");
const upload = require("../middleware/upload");
const fs = require('fs').promises;
const path = require('path');
const db = require('../models/db');

// Create and Save a new Stationery item
exports.create = async (req, res) => {
    try {
        // Validate request
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        // Handle image upload if present
        let imagePath = null;
        if (req.file) {
            imagePath = req.file.filename;
        }

        // Create a Stationery item
        const stationery = new Stationery({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock || 0,
            image: imagePath,
            brand: req.body.brand,
            category: req.body.category
        });

        // Save Stationery in the database
        const data = await Stationery.create(stationery);
        res.send({
            ...data,
            imageUrl: data.image ? `/uploads/products/${data.image}` : null
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Stationery item."
        });
    }
};

// Retrieve all Stationery items from the database
exports.findAll = async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM stationery'); 
        res.json(results); 
    } catch (error) {
        console.error('Error fetching stationery:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Find a single Stationery item by Id
exports.findOne = async (req, res) => {
    try {
        const data = await Stationery.findById(req.params.id);
        if (!data) {
            res.status(404).send({
                message: `Not found Stationery item with id ${req.params.id}.`
            });
        } else {
            res.send({
                ...data,
                imageUrl: data.image ? `/uploads/products/${data.image}` : null
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error retrieving Stationery item with id " + req.params.id
        });
    }
};

// Find all in-stock Stationery items
exports.findAllInStock = async (req, res) => {
    try {
        const data = await Stationery.getAllInStock();
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stationery items."
        });
    }
};

// Find Stationery items by brand
exports.findByBrand = async (req, res) => {
    try {
        const data = await Stationery.findByBrand(req.params.brand);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stationery items."
        });
    }
};

// Find Stationery items by category
exports.findByCategory = async (req, res) => {
    try {
        const data = await Stationery.findByCategory(req.params.category);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stationery items."
        });
    }
};

// Update a Stationery item by id
exports.update = async (req, res) => {
    try {
        // Validate Request
        if (!req.body) {
            return res.status(400).send({
                message: "Content can not be empty!"
            });
        }

        const id = req.params.id;
        
        // Handle image upload if present
        let imagePath = undefined;
        if (req.file) {
            // If there's an existing image, delete it
            const existingItem = await Stationery.findById(id);
            if (existingItem && existingItem.image) {
                const oldImagePath = path.join(__dirname, '../../uploads/products', existingItem.image);
                try {
                    await fs.unlink(oldImagePath);
                } catch (error) {
                    console.log('Error deleting old image:', error);
                }
            }
            imagePath = req.file.filename;
        }

        const stationeryData = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            brand: req.body.brand,
            category: req.body.category
        };

        // Only update image if a new one was uploaded
        if (imagePath) {
            stationeryData.image = imagePath;
        }

        const data = await Stationery.updateById(id, stationeryData);
        if (!data) {
            res.status(404).send({
                message: `Cannot update Stationery item with id=${id}. Maybe item was not found!`
            });
        } else {
            res.send({
                ...data,
                imageUrl: data.image ? `/uploads/products/${data.image}` : null
            });
        }
    } catch (err) {
        res.status(500).send({
            message: "Error updating Stationery item with id=" + req.params.id
        });
    }
};

// Delete a Stationery item with the specified id
exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Get the item to find its image
        const item = await Stationery.findById(id);
        
        // Delete the item from database
        const result = await Stationery.remove(id);
        
        if (!result) {
            res.status(404).send({
                message: `Cannot delete Stationery item with id=${id}. Maybe item was not found!`
            });
            return;
        }

        // If item had an image, delete it from filesystem
        if (item && item.image) {
            const imagePath = path.join(__dirname, '../../uploads/products', item.image);
            try {
                await fs.unlink(imagePath);
            } catch (error) {
                console.log('Error deleting image file:', error);
            }
        }

        res.send({
            message: "Stationery item was deleted successfully!"
        });
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Stationery item with id=" + req.params.id
        });
    }
};

// Delete all Stationery items from the database
exports.deleteAll = async (req, res) => {
    try {
        const data = await Stationery.removeAll();
        res.send({
            message: `${data.affectedRows} Stationery items were deleted successfully!`
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all stationery items."
        });
    }
};
