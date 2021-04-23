const express = require('express');
const recipeController = require('../controllers/recipe');

const api = express.Router();

const md_auth = require("../middleware/authenticated");

api.post("/new-recipe", [md_auth.ensureAuth], recipeController.subirArchivo, recipeController.newRecipe);
api.get("/recipes", [md_auth.ensureAuth], recipeController.getRecipes);
api.get("/recipes-active", recipeController.getRecipesActive);

api.put("/upload-image-recipe/:id", recipeController.subirArchivo, recipeController.uploadImage);
api.get("/get-image-recipe/:imageName", recipeController.getImage);

api.get("/get-recipe/:id", [md_auth.ensureAuth], recipeController.getRecipeById);
api.put("/update-recipe/:id", [md_auth.ensureAuth], recipeController.updateRecipe);
api.put("/activate-recipe/:id", [md_auth.ensureAuth], recipeController.activateRecipe);
api.delete("/delete-recipe/:id", [md_auth.ensureAuth], recipeController.deleteRecipe);


module.exports = api;