const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

const Users = require("../models/users");
const initDB = require("../__init_db");

const userDB = async (req, res) => { 
   try {
      const { database, token } = req.query;
      const { _id } = req.user;
      const user = await Users.findById({ _id });
      res.status(201).json({ user, message : "success", type : "success"});
   } catch (error) {
      res.status(500).json({ error, message : "Internal server error", type : "danger"});
   }

};

module.exports = userDB;