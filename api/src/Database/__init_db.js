const mongoose = require('mongoose');
const mongodb = require("mongodb")
const http = require("http");
const axios = require("axios");

const options =  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
};

const { DB_USER,DB_PASSWORD } = process.env;


module.exports = async (database, req, res) =>
{
    try {
          // await mongoose.connection.close();
        const connect = async (database) => { 
            return await mongoose
                .connect(`mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/${database}?authSource=admin`, options);
        };

        const reConnect = async () => { 
            if(mongoose.connections.length) { //if connections
                const databaseConnected =  mongoose.connections[0].name;
                if(databaseConnected === database) { 
                    let { client } = mongoose.connection;
                    return client;
                } else { 
                    await connect(database);
                }
            } else { 
                await connect(database);
            }  
        }

     

        if(req && res) { 
            const { data} = await axios.get("http://localhost:8020/database/list");
            const dbFound = data.filter( db => db.name == database );
            const exists = dbFound.length > 0 ? true : false;
            if(!exists) { 
                res.json({ 
                    message : "Can not connect to this database.Please select an available one!", 
                    type : "danger"
                })
            } else { 
                reConnect();
            }        
        } else { 
            reConnect();
        }


    } catch (error) {
        console.log(error);
        return 
    }
   
}