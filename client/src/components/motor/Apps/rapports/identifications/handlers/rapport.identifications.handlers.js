import rapportIdentificationsModel from "../models/rapport.identifications.model";

export const setDate = value => {
   return rapportIdentificationsModel.date = value;
};

export const setFilterGot = value => { 
   return rapportIdentificationsModel.filter = value;
};

export const setCommune = value => { 
   return rapportIdentificationsModel.commune = value;
};

export const setQuartier = value => { 
   return rapportIdentificationsModel.quartier = value;
};

export const setType = value => { 
   return rapportIdentificationsModel.type = value;
};