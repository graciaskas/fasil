const mongoose = require("mongoose");
const { Schema } = mongoose;

const model = new Schema({
   nom : String,
   code : String,
   maire : String,
   ville : String,
   province : String,
   isChefLieu : { type : Boolean, default : false},
   active : { type : Boolean, default : false},
   created_at : { type : Date, default : Date.now() },
   updated_at : { type : Date, default : Date.now() },
   create_uid : String,
   update_uid: String,
   active: { type: Boolean, default: true}
});

module.exports = mongoose.model("Villes", model);