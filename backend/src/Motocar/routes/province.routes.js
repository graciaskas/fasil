const express = require('express');
const router = express.Router();

const { 
   create, 
   findMany, 
   findOne, 
   updateOne,
   updateMany, 
   deleteOne, 
   deleteMany } = require('../controllers/province.controllers.js');
    
const { userMiddleware, superAdminMiddleware, adminMiddleware} = require('../../Base/middlewares/authorization.middleware.js');

// only the super-admin is allowed to create a user

// only admin the super-admin is allowed to see the list of all users
router.get('/', [ userMiddleware, adminMiddleware, superAdminMiddleware, findMany ]); 
router.get('/:id', [ userMiddleware, adminMiddleware, superAdminMiddleware, findOne ]); 

router.post('/', [ userMiddleware, adminMiddleware, superAdminMiddleware, create ]);
// each user is allowed to update his profile information
router.put('/:id', [ userMiddleware, adminMiddleware, superAdminMiddleware,  updateOne ]); 
//only admin the super-admin is allowed to remove an existing user
router.delete('/:id', [ superAdminMiddleware, deleteOne ]);
router.delete('/', [ superAdminMiddleware, deleteMany ]);

module.exports = router;