import Model from "../models/company.model";

export const setName = e => Model.nom = e.target.value;
export const setImage = image => Model.image = image;