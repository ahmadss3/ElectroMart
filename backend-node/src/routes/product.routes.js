const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/product.controller');

// GET all products
router.get('/', ProductController.getAllProducts);

// GET a single product by ID
router.get('/:id', ProductController.getProductById);

// POST a new product
router.post('/', ProductController.createProduct);

// PUT update a product
router.put('/:id', ProductController.updateProduct);

// DELETE a product
router.delete('/:id', ProductController.deleteProduct);

module.exports = router; 