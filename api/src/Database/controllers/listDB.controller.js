const mongoose = require("mongoose");

const options =  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
};

const { DB_USER,DB_PASSWORD } = process.env;

const listBD = (req, res) => {
    try {
        //create connection
        const connection =
            mongoose
                .createConnection(
                    `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/admin?authSource=admin`,
                    options
                );
        //check if connection fails
        connection.on('error', (error) => {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
        connection.on('open', () => {
            //get mongo Admin Class
            const Admin = mongoose.mongo.Admin;
            new Admin(connection.db).listDatabases(function (err, result) {
                //Send Error Message
                if (err)
                    return res.status(500).json({
                        message: error.message
                    });

                let databases = result.databases.filter((database) => {
                    return (
                        database.name != 'config' &&
                        database.name != 'admin' &&
                        database.name != 'local'
                    );
                });
                //send all databases
                return res.status(200).json(databases);
            });
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            type: "danger"
        });
    }
};

module.exports = listBD