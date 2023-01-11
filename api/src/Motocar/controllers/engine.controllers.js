const __init_db = require("../../Database/__init_db");
const Engines = require("../models/engine.model");
const Gillets = require("../models/gillet.model");
const Drivers = require("../models/driver.model");
const Owners = require("../models/owner.model");
const { engineAuthModel } = require("../models/engine.auth.model");

exports.find = async (req, res) =>
{
  const { q, field, groupBy } = req.query;
  try {
    if(q && field) { //if searching
      let key = field;
			let query = {}; query[key] = { $regex: q, $options: 'i' } //mongo query with regular express ignoring case sentive
			const data = await Engines.find(query).sort({ created_at : -1 });			
			return res.status(200).json({type: 'success', data});
    //if request for groupBy
    } else if(groupBy){
      let query = {};
      query[groupBy] = groupBy;
      query['total'] = { $sum : 1 } 
      const data = await Engines.aggregate([
        { $group: { _id : "stolen ", total: { $sum: 1 }}},
        { $sort: { "created_date": -1 }}
      ]);
      return res.json(data);
      
    } else {// default data
      const data = await Engines.find({}).sort({ created_at : -1 });
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: `something went wrong ${error}`});
  }
};

exports.findOne = async (req, res) =>
{
  const { id } = req.params;
  const { owner, driver } = req.query;
  try {
    const data = await Engines.findOne({ id });
    if(owner && !driver) { // if only engine's owner requested
      const ownner_data = await Owners.findOne({ engines : data._id });
      return res.status(200).json({ data, type: "success", message: "", ownner_data });
    }
    if(!owner && driver) { // if only engine's owner requested
      const driver_data = await Drivers.findOne({ _id : data.driver });
      return res.status(200).json({ data, type: "success", message: "", driver_data });
    }
    return res.status(200).json({ data, type: "success", message: ""}); // return only engine data
  } catch (error) {
    return res.status(500).json({message: `${error}`, type: "danger"});
  }
}

exports.create = async (req, res) => {
  try {
    const { Model, database } = req.body;
    Model.stolen = false;
    const {  driver } = Model;
    const validate = await engineAuthModel.validateAsync(Model);
    //Check if driver exits
    const exist_driver = await Engines.findOne({ driver });
    if ( exist_driver ) return res.status(400).json({ 
      message : "Driver is registered with another engine.",
      type : "danger"
    });
    //check if plate number exists
    const exist_plaque = await Engines.findOne({ plaque : Model.plaque});
    if ( exist_plaque ) return res.status(400).json({ 
      message : "Plate number exists ",
      type : "danger"
    });

    const newEngine = new  Engines(Model); //define new engine;
    const saved = await newEngine.save(); //create new engine;
    const driver_ = await Drivers.findById({ _id : driver });
    await Gillets.findByIdAndUpdate({ _id : driver },{ state : "assigned" }); //update driver state
    //send response
    return res.status(201).json({
      
      success:true,
      message : "An identification terminated successfully !",
      type : "success",
      data : saved,
      driver : driver_

    });

  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      message: ` ${error}`,
      type : 'danger'
    });
  }
};


exports.updateOne = async (req, res) =>
{
  const { id } = req.params;
  const { update } = req.query;
  try {
    if(update) { //Check if update query is set
      if(update == "stolen") {  // if is of value stole
        const { stolen } = req.body;
        const data = await Engines.findOneAndUpdate({ _id: id}, { $set: { stolen: stolen }});
        console.log(data, id );
        if(data)  return res.json({message: `Engine ${data.marque} [${data.plaque}] was updated!`, type:"success"});
        return res.json({message: 'Could not update', type:"danger"});
      }
    }else { //if update all document
      const {mark, plate, engine_no, color, affiliation, driver, owner } = req.body;
      if (!mark || !affiliation || !driver || !owner || !plate ) throw res.status(400).json('fill all the fields before to continue');
      // if (req.user._id !== _id || active === false) throw res.status(400).json({message: "access denied! you're not allowed to perfom such action"});
      const data = await Engines.findByIdAndUpdate(_id, {...req.body});
      if(data){
        return res.status(200).json({message: 'An engine was updated', type:"success"});
      } else {
        return res.status(404).json({message: 'Document not updated', type : "danger"});
      }
    }
  } catch (error) {
    res.status(400).json({message: `something went wrong: ${error}`});
  }
}

exports.deleteOne = async (req, res) => {
  const {_id} = req.params;
  const {database} = req.body;
  
  try {
    const data = await Engines.findByIdAndDelete(_id);
    if (data) {
      return res.status(200).json({ message: "deleted successfully!" });
    } else {
      return res.status(404).json({ message: "user not found!" });
    }
  } catch (error) {
    return res.status(500).json({ message: `something went wrong ${error}` });
  }
};

exports.deleteMany = async (req, res) => {  
  try {
    const data = await Engines.deleteMany({});
    if (data) {
      return res.status(200).json({ message: "deleted successfully!",type : "success" });
    } else {
      return res.status(404).json({ message: "user not found!",type : "danger"  });
    }
  } catch (error) {
    return res.status(500).json({ message: `something went wrong ${error}`,type : "danger"  });
  }
};