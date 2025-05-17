const ProductModel = require('../models/product.model');

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const products = await ProductModel.findAll();
            res.json(products);
        } catch (err) {
            console.error('❌ Error fetching products:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getProductById(req, res) {
        try {
            const product = await ProductModel.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            console.error('❌ Error fetching product by ID:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async createProduct(req, res) {
        try {
            const product = await ProductModel.create(req.body);
            res.status(201).json(product);
        } catch (err) {
            console.error('❌ Error creating product:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateProduct(req, res) {
        try {
            const product = await ProductModel.update(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (err) {
            console.error('❌ Error updating product:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteProduct(req, res) {
        try {
            const deleted = await ProductModel.delete(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(204).send();
        } catch (err) {
            console.error('❌ Error deleting product:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = ProductController; 