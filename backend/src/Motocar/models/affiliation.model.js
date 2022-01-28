const mongoose = require('mongoose');

const Affiliation = new mongoose.Schema({
    name : String,
    email : String,
    contact : String,
    president : String,
    motards:String,
    address : { 
        province : String,
        ville : String,
        commune : String,
        quartier : String,
        avenue : String,
        num:String
    },
    created_at : { type : Date, default : Date.now() },
    updated_at : { type : Date, default : Date.now() },
    create_uid : String,
    update_uid : String
});

module.exports = mongoose.model('Affiliations', Affiliation);