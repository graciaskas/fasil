const Gillets = require("../models/gillet.model");
const Affiliations = require("../models/affiliation.model");
const Driver = require("../models/driver.model");
const Engine = require("../models/driver.model");
const Owners = require("../models/owner.model");
const { gilletSchema } = require("../models/gillet.auth.model");
const QRCODE = require("qrcode");
const driverModel = require("../models/driver.model");


const setNumber = (count,prefix) => { 
  let inc = count + 1;
  let next = null;
  if(inc < 10) next = prefix+`OOOO${inc}`;
  if (inc > 9 && count <= 99) next = prefix+`OOO${inc}`    
  if (inc > 99 && count <= 999)  next = prefix+`OO${inc}`;   
  if(inc > 999 && count <= 9999)  next = prefix+`O${inc}`   
  if (inc > 9999 )  next = `${prefix}${inc}`;
  return next;
}


exports.create = async (req, res, next) => {
  try{
    const { Model } = req.body;
    if(Model.num === "" || Model.num == 0) return res.json({message:"Number to create can not be zero or empty", type:"danger"});

    const createGillets = async ( num, province, commune, ville, type, association) => { 
      let prefix = "";
      if(type == 2) prefix = "P";
      if(type == 3) prefix = "S";
      const opts = { 
        errorCorrectionLevel : 'H',
        type : 'image/jpeg',
        quality : 100,
        margin : 0,
        color : { 
          dark : '#000',
          light : '#fff'
        }
      };
      for (let index = 1; index <= num; index++) {
        var count = (await Gillets.find({})).length;
        var num_= setNumber(count,prefix);
        const img = await QRCODE.toDataURL(num_, opts);
        const newGillet = new Gillets( { 
          province,
          commune,
          association, 
          type,
          ville,
          image : img,
          num : num_
        });
        await newGillet.save(); 
      }
      const data =  await Gillets.find({});
      return res.json({
        message : num+" gillet(s) was created sucessfully",
        type : "success",
        data
      }); 
    }


    if(Model.type == 1) { 
      const { association, type } = Model;
      if(association === "") return res.json({message:"Association is not allowed to be empty", type:"danger"});
      const association_ = await Affiliations.findOne({ name : association });
      const { province, commune, ville } = association_.address;
      console.log(association_);
      createGillets(Model.num, province, commune, ville, type, association);

    } else { 
      createGillets(Model.num, province = "", commune = "", ville = "", type = Model.type, association = "" );
    }

  }catch(e){
    console.log(e);
    return res.json({
      message : "Error :"+e,
      type : "danger",
    });
  }
};

exports.find = async (req, res) =>
{
  try {
    const { q, type, verify } = req.query;
    let data = { };
  
    if(q){ // if q parameter
      data = await Gillets.find({ num :{ $regex : q }}).sort({ created_at : -1 });
      return res.status(200).json({type: 'success', data});

    } else if(verify) {
      const gillet = await Gillets.findOne({ $and:[ {num : verify }, { state: "assigned "}]}).sort({ created_at : -1 }); // Get gillet
      if(gillet) {
        const _id = gillet.motard.shift();
        const driver = await Driver.findById(_id);
        const engine = await Engine.findOne({ driver: driver._id });
        const owner = driver.isOwner == true ? driver : await Owners.findOne({ engines: engine._id});

        return res.status(200).json({  driver, gillet, engine, owner , type: 'success'});
      }else{
        return res.status(404).json({message: 'pas de resultat', type: 'danger'});
      }      
    } else {
      if(type) { //if type is set
        data = await Gillets.find({ type : type, state : "unassigned" }).sort({ created_at : -1 });
        return res.status(200).json({ message : "success", type : "success", data });
      }else { // Default return data
        data = await Gillets.find({ state : "unassigned" }).sort({ created_at : -1 });
        return res.status(200).json({ message : "success", type : "success", data });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: `${error}`, type : "danger" });
  }
}

exports.findOne = async (req, res) =>
{
  try {
    const { id } = req.params;
    
    const data = await Gillets.findOne({ _id : id });
    return res.status(200).json(data);
  } catch (error) {
      return res.status(500).json({message: `something went wrong ${error}`});
  }
}


exports.updateOne = async (req,res) =>
{
  const { id } = req.params;
  return res.json({ 
    message : "Sorry everything is Okay but cannot update gillet !",
    type : "success",
    id
  });
}

exports.deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Gillets.findByIdAndDelete({ _id: id , state: "unassigned"})
    if (data) {
      return res.status(200).json({ message: "Deleted successfully!", type : "success", data });
    } else {
      return res.status(404).json({ message: "Item found!", type : "danger" });
    }
  } catch (error) {
    return res.status(500).json({ message: `${error}`, type : "danger" });
  }
}

exports.deleteMany = async (req, res) => {
  try {
    const data = await Gillets.deleteMany({ state  : "unassigned"})
    return res.status(200).json({ 
      message: "Deleted items unassigned successfully!",
      type : "success",
      data
    });
  } catch (error) {
    return res.status(500).json({ message: `Internal server error : ${error}` });
  }
}