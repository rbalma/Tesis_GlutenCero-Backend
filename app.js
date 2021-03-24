const express = require("express");
const bodyParser = require("body-parser");


const app = express();

const { API_VERSION } = require("./config");

// Load routing
const authRoutes = require('./routers/auth');
const userRoutes = require("./routers/user");
const noticesRoutes = require("./routers/notices");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, noticesRoutes);


// carpeta publica
app.use(express.static('uploads'));

module.exports = app;