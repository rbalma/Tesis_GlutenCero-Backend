const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

// Para evitar error que sale por consola
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(
  `mongodb://${IP_SERVER}:${PORT_DB}/glutencero`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexion a la base de datos es correcta.");

      app.listen(port, () => {
        console.log("###### API REST ######");
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
      });
    }
  }
);