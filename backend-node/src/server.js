require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');
const productRoutes = require('./routes/product.routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
testConnection();

// Routes
app.get('/health', (req, res) => res.status(200).send('OK'));
app.use('/products', productRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server with port fallback
const startServer = async (retries = 0) => {
    const basePort = parseInt(process.env.PORT || '3000', 10);
    const port = basePort + retries;

    try {
        await new Promise((resolve, reject) => {
            const server = app.listen(port)
                .once('listening', () => {
                    console.log(`✅ Server running on http://localhost:${port}`);
                    resolve(server);
                })
                .once('error', (err) => {
                    if (err.code === 'EADDRINUSE' && retries < 10) {
                        console.log(`⚠️ Port ${port} is busy, trying ${port + 1}...`);
                        server.close();
                        startServer(retries + 1);
                    } else {
                        console.error('❌ Failed to start server:', err);
                        reject(err);
                    }
                });
        });
    } catch (err) {
        console.error('❌ Failed to start server after retries:', err);
        process.exit(1);
    }
};

startServer(); 