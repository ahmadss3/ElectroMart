const { pool } = require('../config/database');

class ProductModel {
    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM product');
        return rows;
    }

    static async findById(id) {
        const { rows } = await pool.query(
            'SELECT * FROM product WHERE productid = $1',
            [id]
        );
        return rows[0];
    }

    static async create(productData) {
        const { name, description, price, stockquantity, brandid, categoryid } = productData;
        const insertText = `
            INSERT INTO product
                (name, description, price, stockquantity, brandid, categoryid)
            VALUES
                ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [name, description, price, stockquantity, brandid, categoryid];
        const { rows } = await pool.query(insertText, values);
        return rows[0];
    }

    static async update(id, productData) {
        const { name, description, price, stockquantity, brandid, categoryid } = productData;
        const { rowCount } = await pool.query(
            `UPDATE product
            SET name = $1,
                description = $2,
                price = $3,
                stockquantity = $4,
                brandid = $5,
                categoryid = $6
            WHERE productid = $7`,
            [name, description, price, stockquantity, brandid, categoryid, id]
        );
        
        if (rowCount === 0) {
            return null;
        }

        return this.findById(id);
    }

    static async delete(id) {
        const { rowCount } = await pool.query(
            'DELETE FROM product WHERE productid = $1',
            [id]
        );
        return rowCount > 0;
    }
}

module.exports = ProductModel; 