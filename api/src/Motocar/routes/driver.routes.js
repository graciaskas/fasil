const express = require('express');
const router = express.Router();

const { find, findById, create, updateDriver, deleteDrivers, deleteDriver
} = require("../controllers/driver.controllers");

const { userAdminMiddleware, adminMiddleware, 
    superAdminMiddleware, sharedMiddleware, userSuperAdminMiddleware } = require("../../Base/middlewares/authorization.middleware")


router.get("/",  [ sharedMiddleware, find ]);

router.get("/:id", [ sharedMiddleware, findById ]);
/***---  Post / Create  */
router.post("/",  [ userSuperAdminMiddleware, create ]);
/***--- Update */
router.put("/:id",  [ userSuperAdminMiddleware, updateDriver ]);
/***--- Deletes */
router.delete("/:id",  [ userSuperAdminMiddleware, deleteDriver ]);
router.delete("/",  [ superAdminMiddleware, deleteDrivers ]);
    

module.exports = router;