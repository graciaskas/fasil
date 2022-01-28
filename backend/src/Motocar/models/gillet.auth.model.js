const Joi = require("joi");

exports.gilletSchema = Joi.object({
   num : Joi.string().required(),
   image : Joi.string().allow("",null),
   motard : Joi.string().allow("",null),
   province : Joi.string().required(),
   commune : Joi.string().required(),
   ville : Joi.string().required(),
   couleur : Joi.string(),
   association : Joi.string().required(),
   type : Joi.number().required(),
   state : Joi.string().allow("",null),
}).options({allowUnknown: true});
