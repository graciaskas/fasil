const express = require("express");
const router = express.Router();

const company = require("./routes/company.routes");
// const users = require("./routes/user.routes");
// const applications = require("./routes/applications.routes");




router.use("/company",   [ company ]);
// router.use("/users", [ users ])
// router.use("/applications",  [ applications ]);


module.exports = router