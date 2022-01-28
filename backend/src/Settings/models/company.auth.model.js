const Joi = require("joi");

exports.companyAuthModel = Joi.object({ 

   nom : Joi.string().required(),
   image : Joi.string().allow(""),
   rccm : Joi.string().allow(""),
   idnat : Joi.string().allow(""),
   numImpot : Joi.string().allow(""),
   email : Joi.string().allow(""),
   website : Joi.string().allow(""),
   phone : Joi.number().required(),

   address : { 
      province: Joi.string().allow(""),
      ville: Joi.string().allow(""),
      commune: Joi.string().allow(""),
      quartier: Joi.string().allow(""),
      avenue : Joi.string().allow(""),
      num: Joi.number().required(),
   },

}).options({ allowUnknown : true });
