const express = require("express");
const router = express.Router();

/**
 * Apps
 */
const Motor = require("./src/Motocar/index");
const Settings  = require("./src/Settings/index");
/***
 * Routes
 */
//Motocar Router
router.use(`/motor`, [ Motor ]);
//Settings Router
router.use("/settings", [ Settings ]);;

module.exports = router;