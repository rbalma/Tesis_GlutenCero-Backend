const express = require('express');
const threadsController = require('../controllers/thread');
const postController = require('../controllers/post');

const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.use(md_auth.ensureAuth);

/*
    THREADS
*/
api.post("/new-thread", threadsController.newThread);
api.get("/threads", threadsController.getThread);
api.put("/update-thread/:id", threadsController.updateThread);
api.delete("/delete-thread/:id", threadsController.deleteThread);
api.get("/threads/user/:user", threadsController.getThreadByUser);
api.get("/threads/:id", threadsController.getThreadById);


/*
    POSTS
*/
api.post("/threads/:id/posts", postController.addPost);
api.get("/threads/:id/posts", postController.getPosts);
api.get("/threads/:id/last-post", postController.getLastPost);
api.get("/posts/:idPost", postController.getPostById);
api.get("/posts/user/:idUser", postController.getPostsByUser);
api.put("/threads/:id/posts/:idPost", postController.updatePost);
api.delete("/posts/:idPost",  postController.deletePost);


module.exports = api;