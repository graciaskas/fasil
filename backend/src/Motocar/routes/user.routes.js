const express = require('express');
const router = express.Router();
const { authenticate } = require("../../Base/middlewares/authenticate.middleware");

const { 
    createUser, getAllUsers,
    getProfile, 
    updateUser, 
    updateUserState, 
    deleteUser } = require('../controllers/user.controllers.js');
    
const {
    superAdminMiddleware, 
    adminMiddleware} = require('../../Base/middlewares/authorization.middleware.js');

// only the super-admin is allowed to create a user
router.post('/', [ adminMiddleware, createUser ]);
// only admin the super-admin is allowed to see the list of all users
router.get('/', [ adminMiddleware, getAllUsers ]); 
router.get('/:id', [ adminMiddleware, getProfile ]); 
// each user is allowed to update his profile information
router.put('/:id', [ adminMiddleware,superAdminMiddleware,  updateUser]); 
// only admin the super-admin can to change the user's state
router.put('/state/:id', [ adminMiddleware, superAdminMiddleware, updateUserState]); 
//only admin the super-admin is allowed to remove an existing user
router.delete('/:id', [ superAdminMiddleware, deleteUser ]);

module.exports = router;