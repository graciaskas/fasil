const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

const Users = require("../models/users");

const initDB = require("../__init_db");

const createDB = async (req, res) => {
	try {
        let { 
			username, 
			password, 
			name,
			number,
			database 
		} = req.body;

		//--- initialize database connection;
		await initDB(database);

		//--- hash password
		const hashedPassword = await bcryptjs.hash(password, 12);

		//Check if database exits
		const DBexists = await Users.find({ database });
		if( DBexists.length == 0 ) { 
			//--- Saving user in database 
			const newUser = new Users({ 
				username, 
				email : username,
				password : hashedPassword, 
				number,
				name,
				active : true,
				role : "superAdmin",
				database 
			});
			newUser.save((error, success ) => {
				if(error) return res.status(500).json({message:""+error,type:"danger"}); 
				return res.status(201).json({ 
					message : "Database created successfully.",
					type: "success",
					database : database
				});
			});
		} else {
			res.statusCode = 400; 
			return res.json({
				success : false,
				type : "danger",
				message : "Database name already exists"
			});
		}
	//--- catch exception
	} catch (error) {
		console.log(error);
		res.statusCode = 500; 
		return res.json({
			message :""+error,
			success : false, 
			type: "danger"
		});
	}
}

module.exports = createDB;