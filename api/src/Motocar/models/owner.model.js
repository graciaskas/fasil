const mongoose = require('mongoose');

const Proprietors = new mongoose.Schema({
   names: String,
   image : String,
   nationality: String,
   gender : String,
   birthTown : String,
   birthDay: String,
   phone: String,
   fingerprint : String,
   website : String,
   rccm: String,
   idnat: String,
   numImpot : String,
   isPP: String,
   email: String,
   id_no: String,
   engines : Array,
   address: {
      province: String, 
      ville: String, 
      commune: String, 
      quartier: String, 
      avenue: String, 
      no: String
   },
   created_at : { type : Date, default : Date.now() },
   updated_at : { type : Date, default : Date.now() },
   create_uid : String,
   update_uid: String,
   active: { type: Boolean, default: true}
});

module.exports = mongoose.model('Onwers', Proprietors);