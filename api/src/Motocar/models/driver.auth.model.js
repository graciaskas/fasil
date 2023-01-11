const Joi = require("joi");

exports.driverSchema = Joi.object({
    names: Joi.string().required(),
    image : Joi.string().allow(""),
    fingerprint : Joi.string().allow(""),
    gillet:Joi.string().required(),
    nationality: Joi.string().required(),
    gender : Joi.string().required(),
    birthTown : Joi.string().required(),
    birthDay: Joi.string().allow(""),
    phone: Joi.number().required(),
    email: Joi.string().email().allow(""),
    id_no: Joi.number().required(),
    id_driver : Joi.string().allow(""),
    affiliation: Joi.string().required(),
    type : Joi.number().required(),
    isOwner : Joi.boolean().required(),
    address: {
        province: Joi.string().allow(""), 
        ville: Joi.string().allow(""),
        commune: Joi.string().required(),
        quartier: Joi.string().required(),
        avenue: Joi.string().allow(""), 
        no: Joi.number().allow("")
    },
    state : Joi.string()
}).options({ allowUnknown: true })

exports.driverSchema_3 = Joi.object({
    names: Joi.string().required(),
    image : Joi.string().allow(""),
    fingerprint : Joi.string().allow(""),
    gillet:Joi.string().required(),
    nationality: Joi.string().required(),
    gender : Joi.string().required(),
    birthTown : Joi.string().required(),
    birthDay: Joi.string().allow(""),
    phone: Joi.number().required(),
    email: Joi.string().email().allow(""),
    id_no: Joi.number().required(),
    id_driver : Joi.string().allow(""),
    affiliation: Joi.string().allow(""),
    type : Joi.number().required(),
    isOwner : Joi.boolean().required(),
    address: {
        province: Joi.string().allow(""), 
        ville: Joi.allow(),
        commune: Joi.string().required(),
        quartier: Joi.string().required(),
        avenue: Joi.string(), 
        no: Joi.number().allow("")
    },
    created_at : Joi.date(),
    updated_at : Joi.date(),
    state : Joi.string()
}).options({ allowUnknown: true })