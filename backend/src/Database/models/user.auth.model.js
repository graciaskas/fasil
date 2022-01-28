const Joi = require("joi");

exports.userSchema = Joi.object({
   name : Joi.string().allow(""),
   username : Joi.string().required(),
   password : Joi.string().required(),
   email: Joi.string().email().allow(""),
   avatar: Joi.string().allow(""),
   image: Joi.string().allow(""),
   database : Joi.string().required(),
   title: { 
      name : Joi.string().required(),
      value : Joi.string().required(),
      access: Joi.string().required()
   },
   role: Joi.string().required(),
   active : Joi.boolean().required()
}).options({allowUnknown : true });
