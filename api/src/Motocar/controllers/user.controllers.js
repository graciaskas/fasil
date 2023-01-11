const bcryptjs = require('bcryptjs');
const User = require("../../Base/models/user.model");
const { userSchema } = require("../../Database/models/user.auth.model");
const { paginate, QueryOrder }  = require("../../Base/utils/core");

exports.createUser = async (req, res) => {
  const { database, Model } = req.body;
  const { role, password,image, username, name, email,phone,title,active } = Model;
  try {
    const result = await userSchema.validateAsync(Model);
    //check user role
    const admin = (req.user.role === "admin");
    const superAdmin = (req.user.role === "superAdmin");
    if (!admin && !superAdmin ) return res.json({ 
      message: "Access denied! you're not allowed to perform such action...",
      type : "danger"
    });
    //verify if user exists
    const user_exist = await User.findOne({ name : Model.name, username : Model.username });
    if (!user_exist) {
      const hashed_pass = await bcryptjs.hash(password, 12);
      const _user = new User({
        name : name,
        username,
        image,
        email,
        password: hashed_pass,
        phone,
        title,
        active,
        role,
        database
      });
      const user = await _user.save();
      if (!user) return res.status(500).json({ message: "Error occured while creatign user" , type : "danger"});
      return res.status(201).json({ data : user, message: "User successfully created!", type : "success" });
    } else { return res.status(400).json({ message: "User already exits", type : "danger" }); }
  } catch (error) {
    return res.status(400).json({
      message : ""+error,
      type: 'danger',
      success : false,
      error : error
    });
  }
};

exports.getAllUsers = async (req, res) => {
  let { __order, warn_message, query } = QueryOrder(req, User );
  try{
    const result = await paginate(User, { query, __order }, req);
    return res.status(200).json({type: "success",result});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: error.message, type:"danger"});
  }
}

exports.getProfile = async (req, res) =>
{
  const { id } = req.params;
  try {
    const data = await User.find({ _id : id });
    if (!data) return res.status(400).json({ 
      message: 'user not found!',
      type : "danger"
    });
    return res.status(200).json({data : data[0]});
  } catch (error) {
    return res.status(500).json({message: `something went wrong ${error}`});
  }
}

exports.updateUser = async (req, res) =>
{
  const { id } = req.params;
  const { username, email, role, password, phone, active, title,name,image} = req.body.Model;
  try {
    const result = await userSchema.validateAsync(req.body.Model);
    //check user role
    const admin = (req.user.role === "admin");
    const superAdmin = (req.user.role === "superAdmin");
    if (!admin && !superAdmin ) return res.json({ 
      message: "Access denied! you're not allowed to perform such action...",
      type : "danger"
    });
    const hashed_pass = await bcryptjs.hash(password, 12);
    const data = await User.findByIdAndUpdate( { _id : id }, {
      username,
      email,
      password: hashed_pass,
      phone,
      title,
      role,
    });
    if (data)
    {
      res.status(200).json({
        message: 'successfully updated!',
        type : "success"});
    } else
    {
      res.status(404).json({message: 'user not found!',type: "danger"});
    }
  } catch (error) {
    res.status(400).json({
      message: `something went wrong: ${error}`,
      type : "danger"
    });
  }
}

exports.updateUserState = async (req, res) =>
{
  const { id } = req.params;
  try {
    const {active} = await User.findOne({ id });
    const data = await User.findByIdAndUpdate( { id }, { active: !active });
    if (data){
      res.status(200).json({message: 'successfully updated!', type:"success"});
    } else {
      res.status(404).json({message: 'user not found!',type:"danger"});
    }
  } catch (error) {
    res.status(400).json({message: `something went wrong: ${error}`,type:"danger"});
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.findByIdAndDelete({ _id : id });
    if (data) {
      return res.status(200).json({ message: "A User was deleted!",type:"success" });
    } else {
      return res.status(404).json({ message: "user not found!",type:"danger" });
    }
  } catch (error) {
    return res.status(500).json({ message: `something went wrong ${error}`,type:"danger" });
  }
};