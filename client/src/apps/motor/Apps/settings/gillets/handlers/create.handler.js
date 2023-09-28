import Model from "../models/gillet";
import { setKeyValue } from "components/base/functions/all";
import { provinces } from "components/motor/Apps/data/provinces";
import { communes  } from "components/motor/Apps/data/communes";


export const setNum = e => { 
    Model.num = e.target.value
};

export const setProvince = value => { 
    Model.province = value
};

export const setCommune = value => { 
    Model.commune = value
};

export const setColor = value => { 
    Model.couleur = value;
} 

export const setVille = value => { 
    Model.ville = value;
} 

export const setAssociation = value => { 
    Model.association = value;
} 

export const setType = value => { 
    Model.type = value
}