const jwt = require("jsonwebtoken");
const initDB = require("../../Database/__init_db");

exports.authenticate  = async (req, res, next) => {
    let database = req.method === "GET" ? req.query.database : req.body.database;
    if (req.headers.database) database = req.headers.database;
    
    //verify if database select
    if (database === null || database === undefined || database == "") {
        return res.status(400).json({
            message: "No database selected for this request !",
            type: 'danger'
        });
    }
      
    //initialise database
    initDB(database);

    //Authorization
    if (!req.headers['authorization'])
        return res.status(403).json({ message: 'Unauthorized', type: "danger" });
    
    try {
        const token = req.headers['authorization'].split(" ")[1];
        // verify token
        const decoded = jwt.decode(token);
        //if fail to decode
        if(!decoded) return res.status(403).json({  message : 'Invalid token',  type : 'danger' }); 
        const expired = Date.now() > decoded.exp * 1000;
        //verify if token expired
        if(expired) return res.status(403).json({  message : 'Token expired',  type : 'danger' });
        //verify token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) return res.status(403).json({  message : 'Authorization required',  type : 'danger'});
            req.user = payload;
            next();
        });
    } catch (error) {
        console.error(error); //log error
        return res.status(403).json({ message : 'Forbiden', type : 'danger'  });
    }
};



