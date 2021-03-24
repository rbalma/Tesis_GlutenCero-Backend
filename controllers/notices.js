const Notice = require('../models/notices');


const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

const configuracionMulter = {
  // 1 Mb
  limits: { fileSize: 1000001 },
  storage: (fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + "../../uploads/notices");
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


// Agrega nuevas noticias
function newNotices (req, res) {

    const notice = new Notice();

    const {title, date, description} = req.body;
    notice.title = title;
    notice.date = date;
    notice.description = description;

    if(!title || !date || !description || !req.file){
        res.status(404).send({message:"Todos los campos son obligatorios"});
    } else {
        notice.image = req.file.filename;
        notice.save((err, noticeStored) => {
            if(err){
                console.log(err)
                res.status(404).send({message: "La noticia ya existe"});
            } else {
                if(!noticeStored){
                    res.status(404).send({message: "Error al crear la noticia"});
                }else{
                    res.status(200).send({ notice:noticeStored });
                }
            }
        });
    }

}


module.exports = {
    newNotices,
    subirArchivo
}