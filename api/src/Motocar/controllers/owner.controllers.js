const fs = require('fs');
const pdf = require('html-pdf');
const path = require('path');
const ejs = require('ejs');

const Drivers = require("../models/driver.model");
const Owners = require("../models/owner.model");
const Engines = require("../models/engine.model");

const { driverSchema } = require("../models/driver.auth.model");
const { ownerSchema, ownerSchema_2 } = require("../models/owner.auth.model");
const { engineSchema } = require("../models/owner.auth.model");

exports.create = async (req, res, next) => {
  try{
   const { modelOwner } = req.body;
   let modelInherited = {...modelOwner};
  

   if(modelOwner.isPP == true) { 
      const result = await ownerSchema.validateAsync(modelOwner);
      modelInherited.isPP = true;
   }else { 
     const result = await ownerSchema_2.validateAsync(modelOwner);
     modelInherited.isPP = false;
   }

    const ownersWithThisEngine = await Owners.find({ engines: modelOwner.engines[ 0 ] });
    
   if(ownersWithThisEngine.length) return res.json({ 
     message: modelOwner.names + " has been registered with this engine !.",
     type:"danger"
   });
    
    //Try to create an engine owner;

   const newlOwner = new Owners(modelInherited); //prepare ne owner
   const savedOwner = await newlOwner.save(); //Save owner
   //const driver = await Drivers.find({ _id : modelOwner.engines[0]}); //find driver

   res.json({
      message : "Recent engine owner was created sucessfully",
      success : true,
      type : "success",
      data : savedOwner,
   });

   }catch(error){
    console.log(error);
    res.json({
      message : ""+error,
      type: 'danger',
      success : false,
      error : error
    });
  }
};

exports.find = async (req, res) =>
{
  try {
    const data = await Owners.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ 
      message: `something went wrong ${error}`,
      type : "type"
    });
  }
}


exports.findOne = async (req, res) =>
{
  try {
    const { id } = req.params;
    const owner = await Owners.findOne( { _id : id });
    return res.status(200).json({ 
      owner
    });
  } catch (error) {
    return res.status(500).json({message: `something went wrong ${error}`,type : "danger"});
  }
}


exports.updateOne = async (req,res) =>
{
  const { id } = req.params;
}


exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Owners.findByIdAndDelete({ _id : id })
    if (data) {
      return res.status(200).json({ message: "deleted successfully!" });
    } else {
      return res.status(404).json({ message: "user not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: `something went wrong ${error}` });
  }
}

exports.deleteMany = async (req, res) => { 
  try {
    const data = await Owners.deleteMany({})
    return res.status(200).json({ 
      message: "deleted successfully!",
      data
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error : ${error}` });
  }
}

