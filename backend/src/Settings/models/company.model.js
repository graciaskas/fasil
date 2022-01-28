const mongoose = require("mongoose");
const { Schema } = mongoose;

const company = new Schema({ 

   nom : String,
   image : String,
   rccm : String,
   idnat : String,
   numImpot : String,
   email : String,
   website : String,
   phone : Number,

   address : { 
      province : String,
      ville : String,
      commune :String,
      quartier : String,
      avenue : String,
      num: Number
   },
   
   active : { type : Boolean, default : true },
   created_at: { type : Date, default : Date.now() },
   updated_at: { type : Date, default : Date.now() },
   create_uid : String,
   update_uid : String

});

module.exports = mongoose.model("Companies", company);