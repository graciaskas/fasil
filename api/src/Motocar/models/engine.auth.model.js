const Joi = require("joi");

exports.engineAuthModel = Joi.object({
   model : Joi.string().required(),
   marque : Joi.string().required(),
   image : Joi.string().allow(""),
   moteur : Joi.string().required(),
   chassis : Joi.string().required(),
   plaque : Joi.string().required(),
   typePneu : Joi.string().required(),
   couleur : Joi.string().required(),
   driver : Joi.string().required(),
   owner : Joi.string().allow(""),
   stolen : Joi.boolean().required(),
   location: { 
      latitude: Joi.number().allow(""), 
      longitude: Joi.number().allow(""),
   },
}).options({allowUnknown: true});
