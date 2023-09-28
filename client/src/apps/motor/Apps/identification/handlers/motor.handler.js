import Model from "../models/model.motor";

export const setMoteur = e => Model.moteur = e.target.value;
export const setModel = e => Model.model = e.target.value;
export const setImage = base64 => Model.image = base64;
export const setMarque = e => Model.marque = e.target.value;
export const setChassis = e => Model.chassis = e.target.value;
export const setPlaque = e => Model.plaque = e.target.value;
export const setTypePneu = e => Model.typePneu = e.target.value;
export const setCouleur = value => Model.couleur = value;
export const setDriver = driverID => Model.driver = driverID