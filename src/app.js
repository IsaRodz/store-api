const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Settings
app.set('port', process.env.PORT || 5000);

//Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
