const { query } = require('./db');

class Product {
    constructor(product) {
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
        this.category = product.category;
        this.image_url = product.image_url;
    }

    // Create a new product
    static async create(newProduct) {
        try {
            const sql = 'INSERT INTO products SET ?';
            const result = await query(sql, newProduct);
            return { id: result.insertId, ...newProduct };
        } catch (error) {
            throw error;
        }
    }

    // Get all products
    static async getAll() {
        try {
            const sql = 'SELECT * FROM products';
            return await query(sql);
        } catch (error) {
            throw error;
        }
    }

    // Find product by ID
    static async findById(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id = ?';
            const result = await query(sql, [id]);
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    // Update product by ID
    static async updateById(id, product) {
        try {
            const sql = 'UPDATE products SET ? WHERE id = ?';
            const result = await query(sql, [product, id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Delete product by ID
    static async removeById(id) {
        try {
            const sql = 'DELETE FROM products WHERE id = ?';
            const result = await query(sql, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Product;
