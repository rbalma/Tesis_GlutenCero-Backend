const express = require("express");
const UserController = require("../controllers/user");


const md_auth = require("../middleware/authenticated");


const api = express.Router();

api.post("/sign-up", UserController.signUp);
api.post("/sign-in", UserController.signIn);
api.get("/users", [md_auth.ensureAuth], UserController.getUsers);
api.get("/users-active", [md_auth.ensureAuth], UserController.getUsersActive);

api.put("/upload-avatar/:id", UserController.subirArchivo, UserController.uploadAvatar);
api.get("/get-avatar/:avatarName", UserController.getAvatar);

api.get("/get-user/:id", UserController.getUserById);
api.put("/update-user/:id", [md_auth.ensureAuth], UserController.updateUser);
api.put("/activate-user/:id", [md_auth.ensureAuth], UserController.activateUser);
api.delete("/delete-user/:id", [md_auth.ensureAuth], UserController.deleteUser);

api.post("/sign-up-admin", md_auth.ensureAuth, UserController.signUpAdmin);

module.exports = api;