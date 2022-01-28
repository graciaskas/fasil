const Companies = require("../models/company.model");
const { companyAuthModel } = require("../models/company.auth.model");

exports.create = async (req,res) => { 
   try {
      const { companyModel } = req.body;
      console.log(req.body);
      const validate =  await companyAuthModel.validateAsync(companyModel);
      const company = new Companies(companyModel);
      const save = await  company.save();
      return res.json({ 
         message : "Company Successfully created !",
         type : "success"
      });
   } catch (error) {
      return res.json({ 
         message : ""+error,
         type : "danger"
      });
   }
};

exports.find = async (req,res) => { 
   try {
      const data = await Companies.find({ active : true });
      return res.status(200).json({ data , message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};

exports.findOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const data = await Companies.findById({ id });
      return res.status(200).json({ data, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};

exports.updateOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const { modelCompany } = req.body
      const data = await Companies.findOneAndUpdate({ id }, modelCompany );
      return res.status(200).json({ data, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};
exports.updateMany = async (req,res) => { 
   
};

exports.deleteOne = async (req,res) => { 
   try {
      const { id } = req.params;
      const data = await Companies.findOneAndDelete({ id } );
      return res.status(200).json({ data, message : "Success", type : "success"});
   } catch (error) {
      return res.status(500).json({ error , message : "Error", type : "danger"});
   }
};

exports.deleteMany = async (req,res) => { 
   return res.json({ data:[] , message : "Can not do such action", type : "danger"});
};