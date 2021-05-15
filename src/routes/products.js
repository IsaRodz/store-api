const { Router } = require('express');
const router = Router();
const productController = require('../controllers/product.controller');

router.route('/').get(productController.search);
router.route('/:id').get(productController.getById);

module.exports = router;
