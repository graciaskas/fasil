import Model from "../models/model.owner";

export default { 
    
    setQuartier : value => Model.address.quartier = value,

    setAssociation : value => Model.affiliation = value,

    setOwner : ({ name, value }) => Model.isOwner = value,

    setCommune:  ({ name, value }) => Model.address.commune = name,

    setAvenue : e => { Model.address.avenue = e.target.value },

    setProprietaire : e => Model.names = e.target.value,

    setNationalite: ({ name, value}) => Model.nationality = name,

    setGender: ({ name, value}) => Model.gender = name,

    setVilleNaissance : e => Model.birthTown = e.target.value,

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
}