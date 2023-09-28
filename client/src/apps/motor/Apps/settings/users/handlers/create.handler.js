import userModel from "../models/user.model";

export const setName = e => userModel.name = e.target.value;
export const setUsername = e => userModel.username = e.target.value;
export const setRole = ( value ) => userModel.role = value; 
export const setTitle = value => userModel.title = value;
export const setImage =  image => userModel.image = image; 
export const setActive =  ({ name, value }) => userModel.active = value; 
export const setPassword = e => userModel.password = e.target.value; 
export const setDatabase = name  => userModel.database = name; 
export const setEmail = e  => userModel.email = e.target.value; 
