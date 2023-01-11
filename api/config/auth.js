const jsonwebtoken = require("jsonwebtoken");

module.exports = {
    auth:(req,res,next) => {
        const autHeader = req.headers['authorization'];
        const token = autHeader && autHeader.split(' ')[1];

        if (!token || token == null) return res.sendStatus(401);

        jsonwebtoken.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
            if(err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
}


