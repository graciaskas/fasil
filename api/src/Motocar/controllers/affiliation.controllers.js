const Affiliation = require("../models/affiliation.model");
const { affiliationSchema } = require("../models/affiliation.auth.model");
const { paginate, QueryOrder }  = require("../../Base/utils/core");

exports.createAffiliation = async (req, res) => {
  let { modelCooperative } = req.body;

  if (!modelCooperative)
    return res.json({ message: 'Request body is undefined', type: 'danger' });
  
  const { name, province, ville } = modelCooperative;

  //If user don't send a correct model with adress
  //We recreat it;
  if (!modelCooperative.address.province) {
    modelCooperative = {
      ...modelCooperative,
        address: { 
          province: "-",
          ville : "-",
          commune : "-",
          quartier : "-",
          avenue : "-",
          num: 0
      },
    }
  }


  try {
   
    const validate = await affiliationSchema.validateAsync(modelCooperative);
    const is_exist = await Affiliation.findOne({ name });
    if (!is_exist) {

      const _affiliation = new Affiliation(modelCooperative);
      const affiliation = await _affiliation.save();

      if (!affiliation) {
        return res
          .status(400)
          .json({ message: "An error occured while saving affiliation" , type : "danger"});
      }

      return res
        .status(201)
        .json({ 
          message: "Recent affiliation was created successfully !", 
          type : "success",
          data : affiliation });
    } else {
      return res.status(400).json({ message: "This affiliation already exists !", type: "danger" });
    }
  } catch (error) {
    return res.status(500).json({ message: "" + error, type : "danger" });
  }
};


exports.getAffiliations = async (req, res) => {
  try {
    let { __order, warn_message, query } = QueryOrder(req, Affiliation);
    
    let result = await paginate(Affiliation, { query, __order }, req); //paginated data
      return res.status(200).json({
        message : "",
        type : "success",
        result
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `something went wrong ${error}`,
      type : "danger"
    });
  }
}

exports.findOne = async (req, res) => {
  try {
      const { id } = req.params
      const data = await Affiliation.findById({ _id: id });
      return res.status(200).json({
        message : "",
        type : "success",
        data
      });
  } catch (error) {
    return res.status(500).json({
      message: `${error}`,
      type : "danger"
    });
  }
}

exports.updateAffiliation = async (req, res) =>
{
  try { 
    if (!username || !phone || !database) throw res.status(400).json('fill all the fields before to continue');
    if (req.user._id !== _id || active === false) throw res.status(400).json({message: "access denied! you're not allowed to perfom such action"});
    const data = await Affiliation.findByIdAndUpdate(_id, {...req.body});
    if (data)
    {
      res.status(200).json({message: 'successfully updated!'});
    } else
    {
      res.status(404).json({message: 'affiliation not found!'});
    }
  } catch (error) {
    res.status(400).json({message: `something went wrong: ${error}`});
  }
}

exports.deleteAffiliation = async (req, res) => {
  const { id } = req.params;  
  try {
   
    const data = await Affiliation.findByIdAndDelete({ _id : id });
    if (data) {
      return res.status(200).json({ message: "An affiliation was deleted successfully!" , type : "success"});
    } else {
      return res.status(404).json({ message: "affiliation not found!", type : "danger" });
    }
  } catch (error) {
    return res.status(500).json({ message: `${error}`, type : "danger" });
  }
};

exports.deleteAffiliations = async (req, res) => { 
  try {
    const data = await Affiliation.deleteMany();
    return res.status(200).json({ 
      message: "deleted successfully!",
      type : "success",
      data 
    });
  } catch (error) {
    return res.status(500).json({ 
      message: `something went wrong ${error}` ,
      type : "danger",
    });
  }
};