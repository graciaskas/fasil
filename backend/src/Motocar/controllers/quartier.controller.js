const Quartiers = require("../models/quartier.model");

exports.create = (req,res) => { 
   const { model } = req.body;
   const quartier = new Quartiers(model);
};

exports.findMany = async (req,res) => { 
   try {
      const Quartiers = await Quartiers.find({ active : true });
      return res.status(200).json({ Quartiers, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};

exports.findOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const quartier = await Quartiers.findById({ id });
      return res.status(200).json({ quartier, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};

exports.updateOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const { model } = req.body
      const action = await Quartiers.findOneAndUpdate({ id },model );
      return res.status(200).json({ action, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};
exports.updateMany = async (req,res) => { 
   
};

exports.deleteOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const action = await Quartiers.findOneAndDelete({ id } );
      return res.status(200).json({ action, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};
exports.deleteMany = async (req,res) => { 

};