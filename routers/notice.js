const express = require('express');
const noticeController = require('../controllers/notice');
const md_auth = require("../middleware/authenticated");

const api = express.Router();


api.post("/new-notice", [md_auth.ensureAuth], noticeController.subirArchivo, noticeController.newNotice);
api.get("/get-image/:imageName", noticeController.getImage);
api.put("/update-notice/:id", [md_auth.ensureAuth], noticeController.subirArchivo, noticeController.updateNotice);
api.delete("/delete-notice/:id", [md_auth.ensureAuth], noticeController.deleteNotice);
api.get("/notices", noticeController.getNotices);
api.get("/get-notice/:id", [md_auth.ensureAuth], noticeController.getNoticeById);


module.exports = api;