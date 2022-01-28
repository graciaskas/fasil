const express = require('express');
const router = express.Router();

const { 
   create, 
   find, 
   findOne,
   updateOne,
   deleteMany,
   deleteOne
} = require('../controllers/owner.controllers.js');

const {  
   sharedMiddleware,
   userSuperAdminMiddleware,
   superAdminMiddleware} = require("../../Base/middlewares/authorization.middleware");

/**--------- Gets */
router.get('/', [ sharedMiddleware, find ]); 
router.get('/:id', [ sharedMiddleware, findOne ]); 
/**--------- Create */
router.post('/', [ userSuperAdminMiddleware, create  ]); 
/**--------- Update */
router.put('/:id', [ userSuperAdminMiddleware, updateOne ]);
/**---------- Deletes */
router.delete('/:id', [ userSuperAdminMiddleware, deleteOne ]);
router.delete('/', [ superAdminMiddleware , deleteMany ]);  // only admin the super-admin is allowed to remove an existing user

module.exports = router;