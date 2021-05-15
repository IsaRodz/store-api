const connection = require('../config/database');

class CategoryController {
    getAllCategories(req, res) {
        connection.query('SELECT * FROM category', (error, result) => {
            res.json(result);
        });
    }
}

module.exports = new CategoryController();
