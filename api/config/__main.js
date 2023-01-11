const express = require("express");
const jsonwebtoken = require("jsonwebtoken");


const app = express.Router();

const company_model = require("./models/config");
const auth = require("./auth").auth;


app.get("/config", async(req,res,next) => {
    res.json(await config_model.find());
});

app.post("/company",(req,res) => {
  res.json(req.body);
})




module.exports = app;