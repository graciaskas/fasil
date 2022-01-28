const mongoose = require("mongoose");

const  listBD = (req,res) => { 
    //create connection
    const connection = mongoose.createConnection(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //check if connection fails
    connection.on('error', (error) =>
        res.status(500).json({ message: 'Internal Server Error' }),
    );
    connection.on('open', () => {
        //get mongo Admin Class
        const Admin = mongoose.mongo.Admin;
        new Admin(connection.db).listDatabases(function (err, result) {
            //Send Error Message
            if (err)
                return res.status(500).json({ message: 'Internal Server Error' });

            let databases = result.databases.filter((database) => {
                return (
                    database.name != 'config' &&
                    database.name != 'admin' &&
                    database.name != 'local'
                );
            });
            //send all databases
            res.json(databases);
        });
    });
};

module.exports = listBD