const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));

module.exports = app;
