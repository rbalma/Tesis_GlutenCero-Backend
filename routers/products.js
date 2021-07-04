const express = require('express');
const productsController = require('../controllers/products');
const md_auth = require("../middleware/authenticated");

const api = express.Router();


api.get('/products-anmat', productsController.getProducts);

api.post('/products-anmat', [md_auth.ensureAuth], productsController.subirArchivo );

module.exports = api;