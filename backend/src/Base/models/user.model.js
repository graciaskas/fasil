const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    name : String,
    email: String,
    avatar: String,
    image: String,
    password: String,
    database: String,
    title: { 
        name : String,
        value : String,
        access: String
    },
    role: {type: String, default: "Administrator"},
    active: { type : Boolean, default : false},
    created_at: { type : Date, default : Date.now() },
    updated_at: { type : Date, default : Date.now() },
});

module.exports = mongoose.model("users", userSchema);