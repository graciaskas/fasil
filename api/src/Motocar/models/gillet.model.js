const mongoose = require('mongoose');

const Gillet = new mongoose.Schema({
    num : { type: String },
    image : { type: String },
    motard : { type: Array},
    province : { type: Array},
    commune : { type: Array},
    ville : String,
    type:Number,
    association : String,
    state : { type: String, default: "unassigned" },
    created_at : { type : Date, default : Date.now() },
    updated_at : { type : Date, default : Date.now() },
    create_uid : String,
    update_uid: String,
    active: { type: Boolean, default: true}
});

module.exports = mongoose.model('Gillets', Gillet);