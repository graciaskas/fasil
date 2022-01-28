const Joi = require("joi");

exports.villeAuthModel = new Joi.object({
   nom : Joi.string().required(),
   code : Joi.string().allow(""),
   maire : Joi.string().required(),
   province : Joi.string().required(),
   isChefLieu : Joi.boolean().required(),
   active : Joi.boolean().allow(""),
}).options({allowUnknown: true});