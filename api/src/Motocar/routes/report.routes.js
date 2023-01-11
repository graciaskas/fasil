const express = require('express');
const router = express.Router();

const { identificationsReport, identificationReport } = require("../controllers/report.controllers");

const { userAdminMiddleware, adminMiddleware, 
    superAdminMiddleware, sharedMiddleware, userSuperAdminMiddleware } = require("../../Base/middlewares/authorization.middleware")



router.post("/identifications", [ identificationsReport ]);
router.get("/identifications/:id",[ userSuperAdminMiddleware, identificationReport ])

    

module.exports = router;