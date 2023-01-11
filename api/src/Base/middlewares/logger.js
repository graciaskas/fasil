const { writeFileSync } = require("fs");


export const logger = (req, res, next) => {
    const time = new Date().toLocaleDateString();
    //Destructure request object
    const { method, url }  = req;
    //Write logs file
    fs.writeFileSync("logs.log",`[${method}] ${url} ${time} \n`,{
        flag : "a"
    });
    //console log
    console.log([method], url, time);
    //next middlewre
    next();
}