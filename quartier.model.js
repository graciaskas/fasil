
const mongoose = require("mongoose");
const { Schema } = mongoose;

const model = new Schema({
   nom : String,
   province : String,
   ville: String,
   code : String,
   chef :String,
   active : Boolean
});

groups = "group_account_manager"
groups = "group_account_invoice"
groups = "group_account_user"

module.exports = mongoose.model("Quartiers", model);