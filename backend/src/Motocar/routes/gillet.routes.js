const express = require('express');
const router = express.Router();
const { authenticate }  = require("../../Base/middlewares/authenticate.middleware");

const { 
    find,
    findOne,
    updateOne,
    deleteOne,
    create,
    deleteMany
} = require("../controllers/gillet.controllers");

const {
    sharedMiddleware,
    userSuperAdminMiddleware,
    superAdminMiddleware } = require('../../Base/middlewares/authorization.middleware.js');

/***--- Gets */
router.get("/",  [ sharedMiddleware, find ]);
router.get("/:id", [ sharedMiddleware, findOne ]);
/***---  Post / Create  */
router.post("/",  [ userSuperAdminMiddleware, create ]);
/***--- Update */
router.put("/:id",  [ userSuperAdminMiddleware, updateOne ]);
/***--- Deletes */
router.delete("/:id",  [ userSuperAdminMiddleware, deleteOne ]);
router.delete("/",  [ superAdminMiddleware, deleteMany ]);
    

module.exports = router;