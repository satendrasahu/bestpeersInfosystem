const express = require('express');

const router = new express.Router();
const { saveCart, getCart, deleteProductByid, updateCartProductById, findCartByProductId } = require('../Controllers/CartController');
router.post('/cart', saveCart)
router.get('/cart', getCart)
router.put('/cart/:productId', findCartByProductId)
router.patch('/cart/:id', updateCartProductById)
router.delete('/cart/:id', deleteProductByid)


module.exports = router