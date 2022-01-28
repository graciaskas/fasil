const mongoose = require('mongoose');
const mongodb = require("mongodb")
const http = require("http");
const axios = require("axios");

module.exports = async (database, req, res) =>
{
    try {
          // await mongoose.connection.close();
        const connect = async (database) => { 
            return  await mongoose.connect(`mongodb://localhost:27017/${database}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
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
                return res.json({ 
                    message : "Can not connect to this database.Please select an available one!", 
                    type : "danger"
                })
            } else { 
                await reConnect()
            }        
        } else { 
            await reConnect();
        }


    } catch (error) {
        console.log(error);
        return 
    }
   
}