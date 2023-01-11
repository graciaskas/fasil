const mongoose = require("mongoose");
const { Schema } = mongoose;

const model = new Schema({
   nom : String,
   image : String,
   code : String,
   cheflieu: String,
   gouverneur : String,
   active : { type : Boolean, default: true },
   created_at : { type : Date, default : Date.now() },
   updated_at : { type : Date, default : Date.now() },
   create_uid : String,
   update_uid: String,
   active: { type: Boolean, default: true}
});

module.exports = mongoose.model("Provinces", model);