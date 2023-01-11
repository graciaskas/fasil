const Joi = require("joi");

exports.affiliationSchema = Joi.object({
   name : Joi.string().required(),
   email : Joi.string().email().allow("",null),
   contact : Joi.number().allow("",null),
   president : Joi.string().allow("",null),
   motards: Joi.number().allow("",null),
    address : { 
       province : Joi.string().required(),
       ville : Joi.string().required(),
       commune : Joi.string().required(),
       quartier : Joi.string().required(),
       avenue : Joi.string().allow("",null),
       num: Joi.number().allow("",null),
   },
}).options({allowUnknown: true});