const express = require('express');
const router = express.Router()
const { getProduct, getStaticProduct } = require('../controllers/products')

// router.get('/', getProduct)
// router.get('/static', getStaticProduct)
router.route('/').get(getProduct),
router.route('/static').get(getStaticProduct)

module.exports= router