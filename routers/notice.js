const express = require('express');
const noticeController = require('../controllers/notice');

const api = express.Router();

const md_auth = require("../middleware/authenticated");

api.post("/new-notice", noticeController.subirArchivo, noticeController.newNotice);
api.put("/update-notice/:id", noticeController.subirArchivo, noticeController.updateNotice);
api.delete("/delete-notice/:id", noticeController.deleteNotice);
api.get("/notices", noticeController.getNotices);
api.get("/get-notice/:id", noticeController.getNoticeById);


module.exports = api;