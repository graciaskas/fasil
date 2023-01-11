const express = require("express");
const router = express.Router();

const affiliations = require("./routes/affiliation.routes");
const users = require("./routes/user.routes");
const drivers = require("./routes/driver.routes");
const owners = require("./routes/owner.routes");
const gillets = require("./routes/gillet.routes");
const engines = require("./routes/engine.routes");
const reports = require("./routes/report.routes")

const provinces = require("./routes/province.routes");
const villes = require("./routes/ville.routes");
const quartiers = require("./routes/quartier.routes");
const communes = require("./routes/commune.routes");

router.use("/users",   [ users ]);
router.use("/drivers", [ drivers ])
router.use("/owners",  [ owners ]);
router.use("/gillets", [ gillets ]);
router.use("/engines", [ engines ]);
router.use("/affiliations", [ affiliations ]);
router.use("/report", [ reports ]);

//country data
router.use("/provinces", [ provinces ]);
router.use("/villes", [ villes ]);
router.use("/communes", [ communes ]);
router.use("/quartiers", [ quartiers ]);

module.exports = router;