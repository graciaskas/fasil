const Provinces = require("../models/province.model");
const { provinceAuthModel } = require("../models/province.auth.model");

exports.create = async (req,res) => { 
   try {
      const { model } = req.body;
      const province = new Provinces(model);
      const validate = await provinceAuthModel.validateAsync(model);  
      const save = await province.save();
      //Response
      return res.status(200).json({
         message : "A new province was created successfully",
         type : "success",
         province
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
      const provinces = await Provinces.find({ active : true });
      return res.status(200).json({ provinces, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ message: ""+error, type : "danger"});
   }
};

exports.findOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const province = await Provinces.findById({ id });
      return res.status(200).json({ province, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ message: ""+error, type : "danger"});
   }
};

exports.updateOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const { model } = req.body
      const updated = await Provinces.findOneAndUpdate({ id },model );
      return res.status(200).json({ updated, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ message: ""+error, type : "danger"});
   }
};

exports.updateMany = async (req,res) => { 
   
};

exports.deleteOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const deleted = await Provinces.findOneAndDelete({ id } );
      return res.status(200).json({ deleted, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({  message : ""+error, type : "danger"});
   }
};

exports.deleteMany = async (req,res) => { 
   try {
      const deleted = await Provinces.deleteMany({ });
      return res.status(200).json({ deleted, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({  message : ""+error, type : "danger"});
   }
};