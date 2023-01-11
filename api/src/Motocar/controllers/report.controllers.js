const fs = require('fs');
const pdf = require('html-pdf');
const path = require('path');
const ejs = require('ejs');

//Logos
const logo_mairie = fs.readFileSync(path.join(__dirname, 'src/logo_mairie.png'),{ encoding: 'base64' });
const logo_congo = fs.readFileSync(path.join(__dirname, 'src/logo_congo.png'),{ encoding: 'base64' });
const no_image = fs.readFileSync(path.join(__dirname, 'src/no_image.png'),{ encoding: 'base64' });


const Drivers = require('../models/driver.model');
const Owners = require('../models/owner.model');
const Engines = require('../models/engine.model');
const Gillets = require('../models/gillet.model');

/**
 * This controller is used to get report of all identifications
 * and return a blob has response if no error occured
 */
exports.identificationsReport = async ( req, res) => { 
	try {
      const { model } = req.body;
      const { type, filter, commune, quartier,date } = model;
      if(filter != null) {
         let drivers = []; 
         if(filter === "type" && type == null) return res.status(400).json({ message: "Type is not allowed to be empty", type: "danger" })
         if (filter === "type") { 
            if (commune != null && quartier != null){// if data by type of identification
               drivers = await Drivers.find({ $and: [ {type: type},{'address.commune': commune}, {'address.quartier': quartier }]});
            } else  if (commune == null && quartier != null){// if data by type of identification
               drivers = await Drivers.find({ $and: [{ type: type }, { 'address.quartier': quartier } ]});
            } else if (commune != null && quartier == null ){ // if data by type of identification
               drivers = await Drivers.find({  $and: [{type: type}, {'address.commune': commune }] });
            } else { 
               drivers = await Drivers.find({ type: type });
            }
         } else { 
            if (commune != null && quartier != null){// if data by type of identification
               drivers = await Drivers.find({ $and: [ {'address.commune': commune}, {'address.quartier': quartier }]});
            } else  if (commune == null && quartier != null){// if data by type of identification
               drivers = await Drivers.find({ $and: [{ 'address.quartier': quartier } ]});
            } else if (commune != null && quartier == null ){ // if data by type of identification
               drivers = await Drivers.find({  $and: [ {'address.commune': commune }] });
            } else { 
               drivers = await Drivers.find({ });
            }
         }  //if all data
         //render ejs pdf file dynamique template
         ejs.renderFile(
            path.join(__dirname, 'views/identifications.ejs'),
            { drivers, logo_congo, logo_mairie, type, commune, quartier },  //data
            (err, data) => {
               if (err)  return res.json({ message: 'Error' + err, type: 'danger' });
               let options = { "format": 'A4' };
               //create pdf usign html-pdf
               pdf
                  .create(data, options)
                  .toFile(path.join(__dirname, 'views/identifications.pdf'), function (err, data) {
                     if (err) return res.json({ message: 'Error' + err, type: 'danger' });
                     return res.download(path.join(__dirname, 'views/identifications.pdf'));
                  });
            },
         );
      } else   return res.status(400).json({ message: "Filter is not allowed to be empty", type: "danger" })
                 
	} catch (error) {
        console.log(error);
		return res.status(500).json({ 
			message: ""+error,
			type: "danger"
		});
	}
};

/**
 * This controller is used to get report of and identification
 * and return a blob has response if no error occured
 */
exports.identificationReport = async (req, res) => {

	const { id } = req.params;
	const imageExists = file => { 
		if(!file) return  "data:image/png;base64,"+no_image;
		if(file === "" || file === null) return "data:image/png;base64,"+no_image
		return file
	};
	//Data function returns objects
	const getData = () => {
		return new Promise(async (resolve, reject) => {
			try {
				const driver = await Drivers.findOne({ _id: id });
				const engine = await Engines.findOne({ driver: id });
				const gillet = await Gillets.findOne({ motard: driver._id });
				const owner = await Owners.find({ engines : engine._id.toString() });
				const content = { driver, engine, gillet, owner: owner[0] };
				resolve(content);
			} catch (error) {
				reject(error);
			}
		});
	};

	try {

		const data = await getData();
		const { driver, engine, gillet, owner } = data;
		//render ejs pdf file dynamique template
		ejs.renderFile(
			path.join(__dirname, 'views/identification.ejs'),
			{ driver, engine, gillet, owner, logo_congo, logo_mairie, imageExists },  //data
			(err, data) => {
				if (err) return res.json({ message: 'Error' + err, type: 'danger' });
				let options = { "format": 'Letter' };
				//create pdf usign html-pdf
				pdf
					.create(data, options)
					.toFile(path.join(__dirname, 'views/file.pdf'), function (err, data) {
						if (err)
							return res.json({ message: 'Error' + err, type: 'danger' });
						res.download(path.join(__dirname, 'views/file.pdf'));
					});
			},
		);
	} catch (error) {
		console.log(error);
		return res.json({ message:  error.message, type: 'danger' });
	}
};
