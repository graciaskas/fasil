
const QRCODE = require('qrcode');

const Drivers = require('../models/driver.model');
const Owners = require('../models/owner.model');
const Engines = require('../models/engine.model');
const Gillets = require('../models/gillet.model');

const { driverSchema, driverSchema_2, driverSchema_3 } = require('../models/driver.auth.model');
const { ownerSchema } = require('../models/owner.auth.model');
const { engineSchema } = require('../models/owner.auth.model');
const { _id } = require('../../../config/functions');
const { paginate, QueryOrder } = require("../../Base/utils/core");


exports.create = async (req, res, next) => {
	try {
		 
		const count = await Drivers.find({}).count();
		//destructure request body to get moedl
		const { modelIdentification } = req.body; 
		//increment id
		modelIdentification.id = count + 1;
		const { gillet, type } = modelIdentification; //destructure model to get gillet;

		let modelInehireted = { ...modelIdentification };
	

		//return res.json({ message : "Gracias Kasongo is a good programmer", type: "danger"})
		if(type == 2 || type == 3 ) { 
			if(type == 2) { 
				modelInehireted.isOwner = true;
				const result = await driverSchema_3.validateAsync(modelInehireted); // Joi validator
			}
			if(type == 3) { 
				modelInehireted.isOwner = false;
				const result = await driverSchema_3.validateAsync(modelInehireted); // Joi validator
			}
			
		} else {
			const result = await driverSchema.validateAsync(modelIdentification); // Joi validator
		}
		// console.log(modelInehireted);

		// return res.json({ message : "hello", type : "danger"})
		modelInehireted.create_uid = req.user;
		const newDriver = new Drivers(modelInehireted); // prepare driver model
		const savedNewDriver = await newDriver.save(); //Save new driver information
		await Gillets.findOneAndUpdate(
			{ num: gillet },
			{ state: 'assigned ', motard: savedNewDriver._id },
		); //update gillet state and assign to driver
		res.json({
			message: 'Created sucessfully',
			success: true,
			data: savedNewDriver,
		});

	} catch (error) {
		res.json({
			message: '' + error,
			type: 'danger',
			success: false,
			error: error,
		});
	}
};

exports.find = async (req, res) => {
	const { q, field, owner, engine } = req.query;
	 let { __order, warn_message, query } = QueryOrder(req, Drivers );
	//Define empty objects
	let data = {};
	try { //try blog

		if(q && field) { 	// searching by field
			query[field] = { $regex: q, $options: 'i' }; //query
			let result = await paginate(Drivers, { query, __order }, req); //paginated data
			return res.status(200).json({ type: 'success', result});
		} else if(owner && !engine){ 
		
		}else if (!owner && engine){ 

		}else if(owner && engine){
			data = await Drivers.find().sort({ created_at : -1 });
			return res.status(200).json({ message: 'Success', type: 'success', data });
		//Default render logic
		}else{
			let result = await paginate(Drivers, { query, __order }, req); //paginated data
			return res.status(200).json({ type: 'success', result});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: `something went wrong ${error}`,
			type: 'danger',
		});
	}
};


exports.findById = async (req, res) => {
	try {
		const { id } = req.params;
		const { engine, owner } = req.query;
		//driver data only
		if (!engine && !owner) {
			const data = await Drivers.findOne({ _id: id });
			return res.status(200).json(data);
		}

		//driver , engine, owner
		if (engine && owner) {
			//Query data
			const driver = await Drivers.findOne({ _id: id });
			const engine = await Engines.findOne({ driver: id });
			const gillet = await Gillets.findOne({ num: driver.gillet });
			let owner = [];

			//if driver is not owner and engine is not null;
			if (!driver.isOwner && engine != null) {
				const owner_ = await Owners.find({ engines: [engine._id.toString()] });
				owner= owner_
			}

			await Gillets.findOneAndUpdate(
				{ num: driver.gillet },
				{ state: 'assigned ', motard: driver._id },
			);

			//send response
			return res
				.status(201)
				.json({
					driver,
					engine: engine ? engine : [],
					gillet,
					owner: owner[0]
				});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: `something went wrong ${error}` });
	}
};

exports.updateDriver = async (req, res) => {
	const { id } = req.params;
};

exports.deleteDriver = async (req, res) => {
	const { id } = req.params;
	try {
		const data = await Drivers.findByIdAndDelete({ _id: id });
		if (data) {
			return res.status(200).json({ message: 'deleted successfully!' });
		} else {
			return res.status(404).json({ message: 'user not found!' });
		}
	} catch (error) {
		return res.status(500).json({ message: `something went wrong ${error}` });
	}
};

exports.deleteDrivers = async (req, res) => {
	try {
		const data = await Drivers.deleteMany({});
		return res.status(200).json({
			message: 'deleted successfully!',
			data,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ message: `Internal server error : ${error}` });
	}
};

