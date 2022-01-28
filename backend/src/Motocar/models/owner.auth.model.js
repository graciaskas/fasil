const Joi = require("joi");

exports.ownerSchema = Joi.object({
   names: Joi.string().required(),
   image : Joi.string().allow(""),
   nationality: Joi.string().required(""),
   gender : Joi.string().required(""),
   birthTown : Joi.string().required(""),
   birthDay: Joi.string().allow(""),
   phone: Joi.string().required(),
   fingerprint : Joi.string().allow(""),
   website : Joi.string().allow(""),
   rccm: Joi.string().allow(""),
   idnat: Joi.string().allow(""),
   numImpot : Joi.string().allow(""),
   isPP: Joi.boolean().required(""),
   email: Joi.string().email().allow(""),
   id_no: Joi.string().required(""),
   engines : Joi.array().required(""),
   address: {
      province: Joi.string().allow(""), 
      ville: Joi.string().allow(""),
      commune: Joi.string().required(),
      quartier: Joi.string().required(),
      avenue: Joi.string().allow(""), 
      no: Joi.number().allow("")
   },
}).options({allowUnknown: true});

exports.ownerSchema_2 = Joi.object({
   names: Joi.string().required(),
   image : Joi.string().allow(""),
   nationality: Joi.string().allow(""),
   gender : Joi.string().allow(""),
   birthTown : Joi.string().allow(""),
   birthDay: Joi.string().allow(""),
   phone: Joi.string().required(),
   fingerprint : Joi.string().allow(""),
   website : Joi.string().allow(""),
   rccm: Joi.string().required(""),
   idnat: Joi.string().required(""),
   numImpot : Joi.string().required(""),
   isPP: Joi.boolean().required(""),
   email: Joi.string().email().allow(""),
   id_no: Joi.string().allow(""),
   engines : Joi.array().required(""),
   address: {
      province: Joi.string().allow(""), 
      ville: Joi.string().allow(""),
      commune: Joi.string().required(),
      quartier: Joi.string().required(),
      avenue: Joi.string().allow(""), 
      no: Joi.number().allow("")
   },
}).options({allowUnknown: true});

