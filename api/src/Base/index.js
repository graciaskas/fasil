const router = require("express").Router();
const { find } = require("./controllers/country.controllers");


router.route("/countries")
    .get(find)
    .post(function (req, res) {
        
    })

module.exports = router;