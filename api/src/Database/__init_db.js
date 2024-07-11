const mongoose = require("mongoose");
const mongodb = require("mongodb");
const http = require("http");
const axios = require("axios");

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   autoIndex: true,
};

const { DB_USER, DB_PASSWORD } = process.env;

module.exports = async (database, req, res) => {
   try {
      if (req && res) {
         const { data } = await axios.get("http://localhost:8020/v1/db/list");
         const dbFound = data.filter((db) => db.name == database);
         const exists = dbFound.length > 0 ? true : false;
         if (!exists) {
            return res.status(400).json({
               message:
                  "Impossible de se connecter à une base de données non trouvée !",
               type: "danger",
            });
         }
      }
      // await mongoose.connection.close();
      await mongoose.connect(
         `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:27017/${database}?authSource=admin`,
         options
      );
   } catch (error) {
      console.log(error);
      return;
   }
};
