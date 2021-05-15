const { Router } = require('express');
const router = Router();
const productController = require('../controllers/product.controller');

router.route('/').get(productController.getAllProducts);

module.exports = router;
