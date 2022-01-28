const mongoose = require('mongoose');

module.exports.connect = async function(uri) {
    try {
        return await mongoose.connect(
            uri, {
                useNewUrlParser:true,
                useUnifiedTopology:true
            }
        );
    } catch (error) {
        return false;
    }
}