const express = require('express');
const noticesController = require('../controllers/notices');

const api = express.Router();

const md_auth = require("../middleware/authenticated");

api.post("/new-notices", noticesController.subirArchivo,noticesController.newNotices);



module.exports = api;