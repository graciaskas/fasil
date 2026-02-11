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
                .connect('mongodb://localhost:27017/zeslap', options);
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

                  

            try {
                axios.get("http://localhost:8020/database/list")
                .then( data => {
                    const found = data.data.filter( db => db.name == database ).length;
                    console.log(data.data)
                    if(found == 0) { 
                        return res.json({ 
                            message : "Can not connect to this database.Please select an available one!", 
                            type : "danger"
                        })
                    } else { 
                        reConnect()
                    }   
                }).catch(e => {
                    console.log(e);
                }) 
            } catch (error) {
                console.log(error);
            }

        } else { 
            reConnect();
        }

    } catch (error) {
        console.log(error);
        return 
    }
   
}