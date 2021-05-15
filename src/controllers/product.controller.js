const connection = require('../config/database');

class ProductController {
    getAllProducts(req, res) {
        connection.query('SELECT * FROM product', (error, result) => {
            return res.json(result);
        });
    }
}

module.exports = new ProductController();
