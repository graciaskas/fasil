const mongoose = require('mongoose');

const Affiliation = new mongoose.Schema({
    name : String,
    email : String,
    contact : String,
    president : String,
    motards:String,
    address : { 
        province: { type: String, default: null  },
        ville : { type: String, default: null  },
        commune : { type: String, default: null  },
        quartier : { type: String, default: null  },
        avenue : { type: String, default: null  },
        num:{ type: String, default: null  }
    },
    created_at : { type : Date, default : Date.now() },
    updated_at : { type : Date, default : Date.now() },
    create_uid : String,
    update_uid: String,
    active: { type: Boolean, default: true}
});

module.exports = mongoose.model('Affiliations', Affiliation);