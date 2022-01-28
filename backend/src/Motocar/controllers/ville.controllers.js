const Villes = require("../models/ville.model");
const { villeAuthModel } = require("../models/ville.auth.model");

exports.create = async (req,res) => { 
   try {
      const { model } = req.body;
      const ville = new villes(model);
      const validate = await villeAuthModel.validateAsync(model);  
      const save = await ville.save();
      //Response
      return res.status(200).json({
         message : "A new ville was created successfully",
         type : "success",
         ville
      });
   } catch (error) {
      return res.status(500).json({
         message : ""+error,
         type : "danger"
      });
   }
};

exports.findMany = async (req,res) => { 
   try {
      const data = await Villes.find({ active : true });
      return res.status(200).json({ villes : data , message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({message : ""+error, type : "danger"});
   }
};

exports.findOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const ville = await Villes.findById({ id });
      return res.status(200).json({ ville, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};

exports.updateOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const { model } = req.body
      const action = await Villes.findOneAndUpdate({ id },model );
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
      const action = await Villes.findOneAndDelete({ id } );
      return res.status(200).json({ action, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};
exports.deleteMany = async (req,res) => { 

};