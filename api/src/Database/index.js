//importing modules
const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require("mongodb").MongoClient;
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const { execFile, exec, execFileSync, spawn } = require('child_process');

const login  = require("./controllers/login.controller");
const listDB  = require("./controllers/listDB.controller");
const createDB  = require("./controllers/createDB.controller");
const userDB = require("./controllers/user.controller");
const { authenticate } = require("../Base/middlewares/authenticate.middleware");


//set up app Router
const app = express.Router();

app.get('/list', [ listDB ]); //Database list route
app.get("/user", [ authenticate, userDB ]); //get user;

app.post('/login', [ login ]); //login route

app.post('/create', [ createDB ]); //Database creation route

app.delete('/:database', async (req, res) => {
	try {
		const { DB_USER, DB_PASSWORD} = process.env;
		const url = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/admin?authSource=admin`;
		const { database } = req.params; 
		MongoClient.connect(url,(err,client) => {
			const db = client.db(database);
			db.dropDatabase();
			res.json({ message : "success", type : "success" });
		})
	}catch(e) { 
		res.json({ message : "Danger", type : "danger", error : e });
	}
});

module.exports = app;
