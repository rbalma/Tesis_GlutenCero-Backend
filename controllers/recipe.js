const Recipe = require('../models/recipe');

const multer = require('multer');
const shortid = require('shortid');
const path = require("path");
const fs = require('fs');

const configuracionMulter = {
  // 1 Mb
  limits: { fileSize: 1000001 },
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/recipes");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${shortid.generate()}.${extension}`);
    },
  })),
  fileFilter(req, file, cb) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("La extension de la imagen no es válida. (Extensiones permitidas: .png y .jpg)"));
    }
  },
};

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('image');

// Sube un archivo 
const subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            if(error instanceof multer.MulterError){
                if(error.code === 'LIMIT_FILE_SIZE') {
                    res.status(404).send({mensaje: 'La imagen es muy grande. Límite de 1 MB'});
                } else {
                  res.status(404).send({mensaje: error.message})
                }
            } else if(error.hasOwnProperty('message')) {
              res.status(404).send({message: error.message})
            } 
        }
        return next();
    })
  }


// Agrega nuevas recetas
function newRecipe (req, res) {

    const recipe = new Recipe();

    const { title, category, ingredient, description, userId, userName, userLastName } = req.body;
    recipe.title = title.toLowerCase();
    recipe.category = category;
    recipe.ingredients = ingredient;
    recipe.description = description;
    recipe.userId = userId;
    recipe.userName = userName;
    recipe.userLastName = userLastName;
    recipe.active = false;
    recipe.date = new Date();

    if(!title || !category || !ingredient || !description || !userId || 
      !userName || !userLastName || !req.file){
        res.status(404).send({message:"Todos los campos son obligatorios"});
    } else {
        recipe.image = req.file.filename;
        recipe.save((err, recipeStored) => {
            if(err){
                console.log(err)
                res.status(404).send({message: "La receta ya existe"});
            } else {
                if(!recipeStored){
                    res.status(404).send({message: "Error al crear la receta"});
                }else{
                    res.status(200).send({message: "La receta se creó con éxito"});
                }
            }
        });
    }
}


function uploadImage(req, res) {
    const params = req.params;
    let imagenAnteriorPath = '';
    Recipe.findById({ _id: params.id }, (err, recipeData) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!recipeData) {
          res.status(404).send({ message: "No se ha encontrado ninguna receta." });
        } else {
          let recipe = recipeData;
  
            if(recipeData.image){
            imagenAnteriorPath = __dirname + `/../uploads/recipes/${recipeData.image}`;
            }
  
          if (req.file) {
  
            let fileName = req.file.filename;
              recipe.image = fileName;
              Recipe.findByIdAndUpdate(
                { _id: params.id },
                recipe,
                (err, recipeResult) => {
                  if (err) {
                    res.status(500).send({ message: "Error del servidor." });
                  } else {
                    if (!recipeResult) {
                      res
                        .status(404)
                        .send({ message: "No se ha encontrado ningun usuario." });
                    } else {
                          res.status(200).send({ imageName: fileName });
                      
                  if(imagenAnteriorPath){  
                       //Eliminar archivo con filesystem
                      fs.unlink(imagenAnteriorPath, (err) => {
                         if (err) {
                           res.status(404).send({
                            message: "La imagen de la receta no se pudo eliminar del File System."
                           });
                         } 
                      })
                    }
  
                    }
                  }
                }
          );
        }
      }}
    });
  }
  
  
function getImage(req, res) {
    const imageName = req.params.imageName;
    const filePath = "./uploads/recipes/" + imageName;
  
    fs.exists(filePath, exists => {
      if (!exists) {
        res.status(404).send({ message: "La imagen que buscas no existe." });
      } else {
        res.sendFile(path.resolve(filePath));
      }
    });
  }

// Actualizar receta
function updateRecipe(req, res) {
    let recipeData = req.body;
    recipeData.email = req.body.title.toLowerCase();
    const params = req.params;
    
    Recipe.findByIdAndUpdate({ _id: params.id }, recipeData, (err, recipeUpdate) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!recipeUpdate) {
          res
            .status(404)
            .send({ message: "No se ha encontrado ninguna receta." });
        } else {
          res.status(200).send({ message: "Receta actualizada correctamente." });
        }
      }
    });
}

// Obtener una receta por id
function getRecipeById(req, res) {
    const params = req.params;
  
    Recipe.findById({_id: params.id}, (err, recipeData) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!recipeData) {
          res.status(404).send({ message: "No se ha encontrado ninguna receta." });
        } else {
          let recipe = recipeData;
          res.status(200).send({ recipe });
      }
    }});
  }

// Obtener todas las recetas
function getRecipes(req, res) {
    
    Recipe.find().then(recipes => {
      if(!recipes){
        res.status(404).send({message:"No se ha encontrado ninguna receta"});
      } else {
        res.status(200).send({ recipes });
      }
    });
  }


// Borrar noticia
function deleteRecipe(req, res) {
  const { id } = req.params;

  Recipe.findByIdAndRemove(id, (err, recipeDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!recipeDeleted) {
        res.status(404).send({ message: "Receta no encontrada." });
      } else {
        const imagenAnteriorPath = __dirname + `/../uploads/recipes/${recipeDeleted.image}`;
            res.status(200).send({
              message: "La receta ha sido eliminado correctamente."
            });

               //Eliminar archivo con filesystem
               fs.unlink(imagenAnteriorPath, (err) => {
                if (err) {
                  res.status(404).send({
                    message: "La imagen de la receta no se pudo eliminar del File System."
                  });
                }})
      }
    }
  })
}


// Para activar o desactivar recetas
function activateRecipe(req, res) {
    const { id } = req.params;
    const { active } = req.body;
  
    Recipe.findByIdAndUpdate(id, { active }, (err, recipeStored) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!recipeStored) {
          res.status(404).send({ message: "No se ha encontrado la receta." });
        } else {
          if (active === true) {
            res.status(200).send({ message: "Receta activada correctamente." });
          } else {
            res
              .status(200)
              .send({ message: "Receta desactivada correctamente." });
          }
        }
      }
    });
  }


// Obtener recetas activas
function getRecipesActive(req, res) {

    const query = req.query;
  
    Recipe.find({ active: query.active}).then(recipes => {
      if(!recipes){
        res.status(404).send({message:"No se ha encontrado ninguna receta"})
      } else {
        res.status(200).send({ recipes });
      }
    });
  
  }


module.exports = {
    newRecipe,
    subirArchivo,
    uploadImage,
    getImage,
    updateRecipe,
    getRecipeById,
    getRecipes,
    deleteRecipe,
    activateRecipe,
    getRecipesActive
}