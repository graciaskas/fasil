const Joi = require("joi");

exports.provinceAuthModel = Joi.object({
   nom : Joi.string().required(),
   code : Joi.string().required(),
   cheflieu: Joi.string().required(),
   gouverneur:Joi.string().required(),
   active : Joi.boolean().allow("")
}).options({allowUnknown: true});

