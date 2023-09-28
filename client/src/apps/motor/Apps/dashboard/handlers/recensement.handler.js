import recensementModel from "../models/recensement.model";


//**-- Default handler object */
export default { 
    /**
     * Handler reference input value
     * @param {*} e 
     */
    reference : function(e) { 
        e.preventDefault();
        recensementModel.reference = e.target.value;
    },

    noparcelle : function(e) { 
        e.preventDefault();
        recensementModel.noparcelle = e.target.value;
    },

    responsable : function(e) { 
        e.preventDefault();
        recensementModel.responsable = e.target.value;
    },

    proprietaire : function(e) { 
        recensementModel.proprietaire = e.value;
    },

    name  : function(e, array) { 
        e.preventDefault();

        if( !array ) return
        recensementModel[array].properties.noms = e.target.value;
    }
}