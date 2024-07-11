const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const initDB = require("../../Database/__init_db");
const Users = require("../../Base/models/user.model");

const login = async (req, res) => {
   try {
      let { username, password, database } = req.body;

      let email = username;
      //--- verify login info
      if (!email || !password || !database) {
         return res.json({
            errors: {
               message: "Please fill all fields before to continue!",
               type: "danger",
               code: 400,
            },
         });
      }

      //--- initialize database
      initDB(database, req, res);

      //Get user from database users model
      let user = await Users.findOne({ username, database });

      console.log(user);
      //--- verify if user is not found
      if (!user || user === null)
         return res.json({
            errors: {
               message:
                  "Le nom d'utilisateur ou le mot de pass est incorrecte !",
               type: "danger",
               code: 404,
            },
         });
      //destructure user
      const { _id, role, name, active } = user;

      //verify user is active account of false
      if (active === false)
         return res
            .status(403)
            .json({ message: "Account not activated!", type: "danger" });
      //--- verfiy user hashed password and user given password
      if (await bcryptjs.compare(password.toString(), user.password)) {
         const token = await jwt.sign(
            { _id, role, name },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: 28800 }
         );
         const cookieOptions = await {
            expires: new Date(
               Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
            ),
            httpOnly: true,
         };
         return res.status(200).json({ token, cookieOptions, user });
      } else {
         return res
            .status(401)
            .json({ message: "Incorrect password!", type: "danger" });
      }
      //Exception
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({
         message: "" + error,
         type: "danger",
      });
   }
};

module.exports = login;
