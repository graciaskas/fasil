const mongoose = require("mongoose");
const { Schema } = mongoose;

const model = new Schema({
   nom : String,
   code : String,
   bourgmestre : String,
   ville : String,
   active : Boolean,
   created_at : { type : Date, default : Date.now() },
   updated_at : { type : Date, default : Date.now() },
   create_uid : String,
   update_uid: String,
   active: { type: Boolean, default: true}
});

module.exports = mongoose.model("Communes", model);