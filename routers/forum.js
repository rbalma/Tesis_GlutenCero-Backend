const express = require('express');
const forumController = require('../controllers/forum');

const api = express.Router();

//const md_auth = require("../middleware/authenticated");

api.post("/new-thread", forumController.newThread);
api.get("/threads", forumController.getThread);
api.delete("/delete-threads/:id", forumController.deleteThread);


api.post("/new-post/:idThread", forumController.newPost);
api.get("posts/:idThread", forumController.getPosts);
api.get("get-lastpost/:idThread", forumController.getLastPost);

//api.get("get-post/:id", );
//api.put("/update-post/:id", );
//api.delete("/delete-post/:id", );


module.exports = api;