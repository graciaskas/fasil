const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken"); 

const initDB = require("../../Database/__init_db");
const Users = require("../../Base/models/user.model");

const login = async (req,res) => { 
    try {   
        let { username, password, database } = req.body;
        //--- initialize database
        await initDB(database, req, res);
        let email = username;
        //--- verify login info
        if (!email || !password || !database) { 
            return res.status(400).json({ 
                message: 'Please fill all fields before to continue!' ,
                type : "danger"
            });
        }
        //Get user from database users model
		let user = await Users.findOne({ username, database });
        //--- verify if user is not found
        if (!user || user === null ) return res.json({ message: 'Invalid username or password !', type:"danger"}); 
        //destructure user
        const { _id, role, title, active } = user;

        //verify user is active account of false
        if (active === false)
            return res.status(403).json({ message: 'Account not activated!', type: "danger" });
        //--- verfiy user hashed password and user given password
        if (await bcryptjs.compare(password.toString(), user.password)) {
            const token = await jwt.sign({ _id, role, title }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 28800 });
            const cookieOptions = await {
                expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000),
                httpOnly: true
            }
           return res.status(200).json({ token, cookieOptions });
        } else { return res.status(401).json({ message: 'Incorrect password!',type: "danger" });}
    //Exception
	} catch (error) {
		return res.status(500).json({
			message: ''+error,
            type : "danger"
		});
	}
};

module.exports = login