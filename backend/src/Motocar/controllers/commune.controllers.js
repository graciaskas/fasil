const Communes = require("../models/commune.model");

exports.create = (req,res) => { 
   const { model } = req.body;
   const commune = new Communes(model);
};

exports.findMany = async (req,res) => { 
   try {
      const Communes = await Communes.find({ active : true });
      return res.status(200).json({ Communes, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};

exports.findOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const commune = await Communes.findById({ id });
      return res.status(200).json({ commune, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};

exports.updateOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const { model } = req.body
      const action = await Communes.findOneAndUpdate({ id },model );
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
      const action = await Communes.findOneAndDelete({ id } );
      return res.status(200).json({ action, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};
exports.deleteMany = async (req,res) => { 

};