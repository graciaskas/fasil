const mongodb = require("mongodb");
const Client = mongodb.MongoClient;
/**
 * Start Express application and connect database
 * @param {*} app Express application
 * @param {*} connect MongoDB Connection
 */
exports.initDB = async (app) => {
    try {
        const db = await Client.connect("`mongodb://localhost:27017/");
        app.listen(process.env.PORT ||  8020,() => console.log("Server on http://localhost:8020 "))
        return app.locals.db = db; 
    } catch (error) {
        console.error(error);
    }
};
