const express = require('express');
const router = express.Router();
const { authenticate } = require("../../Base/middlewares/authenticate.middleware");

const {
    create, 
    find,
    findOne, 
    updateOne, 
    deleteOne,
    deleteMany } = require("../controllers/engine.controllers");

const {
    adminMiddleware,
    sharedMiddleware,
    userSuperAdminMiddleware,
    userAdminMiddleware,
    superAdminMiddleware } = require('../../Base/middlewares/authorization.middleware.js');

//Get engines
router.get('/', [  sharedMiddleware, find ]);
//Get engine
router.get('/:id', [ sharedMiddleware, findOne ]);
//create engine
router.post('/', [ userSuperAdminMiddleware, create ]);
//update engine
router.put('/:id', [ userSuperAdminMiddleware, updateOne ]); // e
//delete engine
router.delete('/:id', [ userSuperAdminMiddleware, deleteOne ]); //
//delete engines
router.delete('/', [ userSuperAdminMiddleware, deleteMany ]); //

module.exports = router;