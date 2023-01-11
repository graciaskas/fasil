const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
    name : String,
    username : String,
    password : String,
    email: String,
    avatar: String,
    image: String,
    database : String,
    title: { type : String, default : "CEO"},
    role: {type: String, default: "user"},
    active: { type : Boolean, default : false},
    created_at: { type : Date, default : Date.now() },
    updated_at: { type : Date, default : Date.now() },
});

module.exports = mongoose.model("Users", User);