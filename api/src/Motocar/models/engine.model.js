const mongoose = require('mongoose');

const Engine = new mongoose.Schema({
    model : String,
    marque : String,
    image : String,
    moteur : String,
    chassis : String,
    plaque : String,
    typePneu : String,
    couleur : String,
    driver : String,
    owner : String,
    location: [{latitude: {type: String, default: '0.0'}, longitude: {type: String, default: '0.0'}}],
    stolen:{type:Boolean, default:false},
    created_at : { type : Date, default : Date.now() },
    updated_at : { type : Date, default : Date.now() },
    create_uid : String,
    update_uid: String,
    active: { type: Boolean, default: true}
});

module.exports = mongoose.model('Engines', Engine);