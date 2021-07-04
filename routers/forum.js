const express = require('express');
const threadsController = require('../controllers/thread');
const postController = require('../controllers/post');

const md_auth = require("../middleware/authenticated");

const api = express.Router();

//api.use(md_auth.ensureAuth);

/*
    THREADS
*/
api.post("/new-thread", [md_auth.ensureAuth], threadsController.newThread);
api.get("/threads", threadsController.getThread);
api.put("/update-thread/:id", [md_auth.ensureAuth], threadsController.updateThread);
api.delete("/delete-thread/:id", [md_auth.ensureAuth], threadsController.deleteThread);
api.get("/threads/user/:user", [md_auth.ensureAuth], threadsController.getThreadByUser);
api.get("/threads/:id", [md_auth.ensureAuth], threadsController.getThreadById);


/*
    POSTS
*/
api.post("/threads/:id/posts", [md_auth.ensureAuth], postController.addPost);
api.get("/threads/:id/posts", postController.getPosts);
api.get("/threads/:id/last-post", postController.getLastPost);
api.get("/posts/:idPost", [md_auth.ensureAuth], postController.getPostById);
api.get("/posts/user/:idUser", [md_auth.ensureAuth], postController.getPostsByUser);
api.put("/threads/:id/posts/:idPost", [md_auth.ensureAuth], postController.updatePost);
api.delete("/posts/:idPost", [md_auth.ensureAuth], postController.deletePost);


module.exports = api;