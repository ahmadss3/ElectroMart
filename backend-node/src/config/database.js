const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test the database connection
const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Connected to PostgreSQL:', process.env.DB_NAME);
        client.release();
    } catch (err) {
        console.error('❌ Error connecting to PostgreSQL:', err);
        process.exit(1);
    }
};

module.exports = {
    pool,
    testConnection
}; 