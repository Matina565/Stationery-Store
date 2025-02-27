const { query } = require("./db.js");
const baseUrl = "http://localhost:8080";

// constructor
class Stationery {
    constructor(stationery) {
        this.name = stationery.name;
        this.description = stationery.description;
        this.price = stationery.price;
        this.stock = stationery.stock || 0;
        this.image = stationery.image;
        this.brand = stationery.brand;
        this.category = stationery.category;
    }

    static async create(newStationery) {
        try {
            const result = await query("INSERT INTO products SET ?", newStationery);
            return { id: result.insertId, ...newStationery };
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const result = await query("SELECT * FROM products WHERE id = ?", [id]);
            return result[0];
        } catch (error) {
            throw error;
        }
    }

    static async getAll(name = "") {
        try {
            let sql = "SELECT * FROM products";
            if (name) {
                sql += " WHERE name LIKE ?";
                const result = await query(sql, [`%${name}%`]);
                return result.map(item => ({
                    ...item,
                    imageUrl: `${baseUrl}/images/${item.image}`,
                }));
            }
            return (await query(sql)).map(item => ({
                ...item,
                imageUrl: `${baseUrl}/images/${item.image}`,
            }));
        } catch (error) {
            throw error;
        }
    }

    static async getAllInStock() {
        try {
            const sql = "SELECT * FROM products WHERE stock > 0";
            return (await query(sql)).map(item => ({
                ...item,
                imageUrl: `${baseUrl}/images/${item.image}`,
            }));
        } catch (error) {
            throw error;
        }
    }

    static async findByBrand(brand) {
        try {
            const sql = "SELECT * FROM products WHERE brand = ?";
            return (await query(sql, [brand])).map(item => ({
                ...item,
                imageUrl: `${baseUrl}/images/${item.image}`,
            }));
        } catch (error) {
            throw error;
        }
    }

    static async findByCategory(category) {
        try {
            const sql = "SELECT * FROM products WHERE category = ?";
            return (await query(sql, [category])).map(item => ({
                ...item,
                imageUrl: `${baseUrl}/images/${item.image}`,
            }));
        } catch (error) {
            throw error;
        }
    }

    static async updateById(id, stationery) {
        try {
            const result = await query(
                "UPDATE products SET ? WHERE id = ?",
                [stationery, id]
            );
            if (result.affectedRows === 0) {
                throw { kind: "not_found" };
            }
            return { id: id, ...stationery };
        } catch (error) {
            throw error;
        }
    }

    static async remove(id) {
        try {
            const result = await query("DELETE FROM products WHERE id = ?", [id]);
            if (result.affectedRows === 0) {
                throw { kind: "not_found" };
            }
            return result;
        } catch (error) {
            throw error;
        }
    }

    static async removeAll() {
        try {
            return await query("DELETE FROM products");
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Stationery;
