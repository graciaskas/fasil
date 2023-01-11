const mongoose = require('mongoose');

const Motodriver = new mongoose.Schema({
    id: { type: Number, required: true },
    names: { type: String, min: 15 },
    image : String,
    nationality: String,
    gender : String,
    birthTown : String,
    birthDay: String,
    phone: String,
    fingerprint : String,
    gillet : String,
    email: String,
    id_no: String,
    id_driver : String,
    type: String,
    affiliation: String,
    isOwner : { type : Boolean, default : true },
    address: {
        province: String, 
        ville: String, 
        commune: String, 
        quartier: String, 
        avenue: String, 
        no: String
    },
    state : { type : String, default : "unassigned"},
    created_at : { type : Date, default : Date.now() },
    updated_at : { type : Date, default : Date.now() },
    create_uid : { type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    update_uid: String,
    active: { type: Boolean, default: true}
});

module.exports = mongoose.model('Drivers', Motodriver);