const express = require('express');
const router = express.Router();
const { authenticate } = require("../../Base/middlewares/authenticate.middleware");

const { 
    createAffiliation, 
    updateAffiliation,
    getAffiliations ,
    findOne,
    deleteAffiliation,
    deleteAffiliations
} = require('../controllers/affiliation.controllers.js');

const { 
    adminMiddleware, 
    userMiddleware, 
    superAdminMiddleware,
    userSuperAdminMiddleware,
    sharedMiddleware } = require('../../Base/middlewares/authorization.middleware.js');



router.get('/', [ sharedMiddleware, getAffiliations, ]);
router.get('/:id', [ sharedMiddleware, findOne ]);
router.post('/', [ userSuperAdminMiddleware, createAffiliation ]);
router.put('/:id', [ userSuperAdminMiddleware, updateAffiliation]);
router.delete('/:id', [ userSuperAdminMiddleware, deleteAffiliation]);
router.delete('/', [ superAdminMiddleware, deleteAffiliations]);



module.exports = router;