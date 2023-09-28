import Model from "../models/model.driver";

export default { 
    
    setQuartier : value => Model.address.quartier = value,

    setOwner : ({ name, value }) => Model.isOwner = value,

    setCommune: value => Model.address.commune = value,

    setAvenue : e => { Model.address.avenue = e.target.value },

    setProprietaire : e => Model.names = e.target.value,

    setNationalite: ({ name, value}) => Model.nationality = name,

    setGender: ({ name, value}) => Model.gender = name,

    setVilleNaissance : value => Model.birthTown = value,

    setDateBirth: e => Model.birthDay = e.target.value,

    setNumero: e =>  Model.address.no = e.target.value,

    setMobile: e => Model.phone = e.target.value,

    setEmail : e => Model.email = e.target.value,
    setCarte : e => Model.id_no = e.target.value,

    setPermis : e => Model.id_driver = e.target.value,
    setNumImpot : e => Model.numImpot = e.target.value,

    setRccm : e =>  Model.rccm = e.target.value,
    setIdnat : e => Model.idnat = e.target.value,
    setWeb : e => Model.website = e.target.value,
    setIsPP_ : ({ name, value }) => Model.isPP = value,
    setGillet :  value => Model.gillet = value,
    
    //driver type handler
    setType : (value, state) => { 
        Model.type = value; //Update driver type to selected type
        if(value == 2) { Model.isOwner = true ; }
        return state(value);
    }
}