const express = require('express');
const router = express.Router();


const { create, find, findOne, updateOne, deleteMany, deleteOne } = require('../controllers/company.controllers.js');

const { 
    adminMiddleware, 
    userMiddleware, 
    superAdminMiddleware,
    userSuperAdminMiddleware,
    sharedMiddleware } = require("../../Base/middlewares/authorization.middleware");



router.get('/', [ sharedMiddleware, find, ]);
router.get('/:id', [ superAdminMiddleware, findOne ]);
router.post('/', [ superAdminMiddleware, create ]);
router.put('/:id', [ superAdminMiddleware, updateOne ]);
router.delete('/:id', [ superAdminMiddleware, deleteOne ]);
router.delete('/', [ superAdminMiddleware, deleteMany ]);



module.exports = router;