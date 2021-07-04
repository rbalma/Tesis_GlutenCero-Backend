const XLSX = require('xlsx');
const multer = require('multer');
const fs = require('fs');
const path = require("path");


const getProducts = (req, res) => {

    try {

        const workbook = XLSX.readFile('./docs/listado-anmat.xlsx');
        //const workbookSheets = workbook.SheetNames;
        const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets['Resumen Productos']);
        res.json( {ok: true, dataExcel});

    } catch (error) {
        console.log(error);
        res.json( { ok: false, message: 'No se pueden cargar los productos'} );
    }

}



const configuracionMulter = {
    // 1 Mb
    limits: { fileSize: 5000001 },
    storage: (fileStorage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, __dirname + "../../docs");
      },
      filename: (req, file, cb) => {
        const extension = 'xlsx';
        cb(null, `listado-anmat.${extension}`);
      },
    })),
    fileFilter(req, file, cb) {
      if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        cb(null, true);
      } else {
        cb(new Error("La extension no es válida. (Extensión permitida: xlsx)"));
      }
    },
  };


  // pasar la configuración
const upload = multer(configuracionMulter).single('file');

// Sube un archivo 
const subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            if(error instanceof multer.MulterError){
                if(error.code === 'LIMIT_FILE_SIZE') {
                    res.status(404).send({ ok: false, message: 'La imagen es muy grande. Límite de 1 MB'});
                } else {
                  res.status(404).send({ok: false, message: error.message})
                }
            } else if(error.hasOwnProperty('message')) {
              res.status(404).send({ok: false, message: error.message})
            } 
        }
        return res.json({ok: true, message: 'Archivo Excel guardado'});
    })
  }

  module.exports = {
      getProducts,
      subirArchivo
  }