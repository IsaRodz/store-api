const connection = require('../config/database');

class ProductController {
    search(req, res) {
        const { name, category, minPrice, maxPrice } = req.query;
        const requestHandler = (error, result) => {
            if (error) {
                console.log({ error });
                return res.status(500).send('Something went wrong');
            }

            return res.json(result);
        };

        let sql = `SELECT * FROM product WHERE name LIKE '%${name}%'`;

        if (category) {
            sql += ` AND category = ${category}`;
        }

        if (minPrice) {
            sql += ` AND price > ${minPrice}`;
        }

        if (maxPrice) {
            sql += ` AND price < ${maxPrice}`;
        }

        connection.query(sql, requestHandler);
    }

    getById(req, res) {
        const { id } = req.params;
        const sql = `
            SELECT 
                product.id, 
                product.name as name, 
                product.url_image, 
                product.price, 
                product.discount,
                category.name as category
            FROM product INNER JOIN category ON product.category=category.id 
            WHERE product.id = ${id}`;

        const requestHandler = (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).send('Something went wrong');
            }

            return res.json(result[0]);
        };
        connection.query(sql, requestHandler);
    }
}

module.exports = new ProductController();
