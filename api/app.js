const mongoose = require("mongoose");
const express = require("express");
const logger  = require("morgan");
const env = require("dotenv");
const path = require("path");
const cors = require("cors");
const ejs = require("ejs");
const fs = require("fs");

env.config(); //Env variables

const { authenticate }  = require("./src/Base/middlewares/authenticate.middleware");
const Database = require("./src/Database/index");
const Apps = require("./app.routes");
const { default: axios } = require("axios");

const app = express(); //Express application

/**
 * Middlewares
 */
app.use(cors());
app.use(logger("dev"));
app.use(express.json({ limit : "5mb" }))
app.use(express.urlencoded({extended:false, limit : "5mb" }));
app.use(express.static(path.join(__dirname,"public"))); //Static files directory
app.set("view engine","ejs");

app.use("/database", Database); // database middleware
app.use(`/${process.env.API_V}`, [authenticate, Apps]); //apps middleware



//Handle 404 requests 
app.use(( req, res ) => { 
   res.statusCode = 404;
   res.json({
      message : "Not found",
      type : "danger",
      requestUrl : req.url,
      requestMethod : req.method,
   });
});


app.listen(process.env.PORT ||  8020,() => console.log("Server on http://localhost:8020 ")); //Server listening ...