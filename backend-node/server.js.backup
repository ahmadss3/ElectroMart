require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

const { Pool } = require('pg');
const pool = new Pool({
    host:     process.env.DB_HOST,
    port:     parseInt(process.env.DB_PORT, 10),
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection on startup
pool.connect()
    .then(client => {
        console.log('✅ Connected to PostgreSQL:', process.env.DB_NAME);
        client.release();
    })
    .catch(err => {
        console.error('❌ Error connecting to PostgreSQL:', err);
        process.exit(1);
    });

const PORT = process.env.PORT || 3000;

// Health-check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// GET all products
app.get('/products', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM product');
        res.json(rows);
    } catch (err) {
        console.error('❌ Error fetching products:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST a new product
app.post('/products', async (req, res) => {
    const { name, description, price, stockquantity, brandid, categoryid } = req.body;

    try {
        const insertText = `
            INSERT INTO product
                (name, description, price, stockquantity, brandid, categoryid)
            VALUES
                ($1, $2, $3, $4, $5, $6)
                RETURNING *;
        `;
        const values = [name, description, price, stockquantity, brandid, categoryid];
        const { rows } = await pool.query(insertText, values);

        res.status(201).json(rows[0]);
    } catch (err) {
        console.error('❌ Error inserting product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET a single product by its ID
app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const { rows } = await pool.query(
            'SELECT * FROM product WHERE productid = $1',
            [productId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error('❌ Error fetching product by ID:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// UPDATE a product by ID
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, stockquantity, brandid, categoryid } = req.body;
    try {
        const { rowCount } = await pool.query(
            `UPDATE product
       SET name = $1,
           description = $2,
           price = $3,
           stockquantity = $4,
           brandid = $5,
           categoryid = $6
       WHERE productid = $7`,
            [name, description, price, stockquantity, brandid, categoryid, productId]
        );
        if (rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Return the updated record
        const { rows } = await pool.query(
            'SELECT * FROM product WHERE productid = $1',
            [productId]
        );
        res.json(rows[0]);
    } catch (err) {
        console.error('❌ Error updating product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE a product by ID
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const { rowCount } = await pool.query(
            'DELETE FROM product WHERE productid = $1',
            [productId]
        );
        if (rowCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(204).send(); // 204 No Content on success
    } catch (err) {
        console.error('❌ Error deleting product:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
