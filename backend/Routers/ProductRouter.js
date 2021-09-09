const express = require('express');
const { saveProduct, getProduct, updateProductById, deleteProductByid } = require('../Controllers/ProductController')

const router = new express.Router();

router.post('/product', saveProduct)
router.get('/product', getProduct)
router.patch('/product/:id', updateProductById)
router.delete('/product/:id', deleteProductByid)


module.exports = router