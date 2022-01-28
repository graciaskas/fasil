import Model from "../models/model.cooperative";

export const name = e => { 
    const value = e.target.value.trim();
    Model.name = value;
};

export const email = e => { 
    const value = e.target.value.trim();
    Model.email = value;
};

export const contact = e => { 
    const value = e.target.value.trim();
    Model.contact = value;
};

export const president = e => {
    const value = e.target.value.trim();
    Model.president = value;
};

export const province = value => {
    Model.address.province = value;
};

export const ville = value => {
    Model.address.ville = value;
};

export const commune = value => {
    Model.address.commune = value;
};

export const quartier = value => {
    Model.address.quartier = value;
};

export const avenue = e => {
    const value = e.target.value.trim();
    Model.address.avenue = value;
};

export const setNum = e => { 
    const value = e.target.value.trim();
    Model.address.num = value;
};

