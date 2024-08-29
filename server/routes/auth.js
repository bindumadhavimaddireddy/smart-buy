const express = require('express');
const {createOrUpdateUser, currentUser} = require('../controllers/auth')
const {authCheck, adminCheck} = require('../middlewares/auth');
const router = express.Router();

// create route
router.post('/create-or-update-user', authCheck, createOrUpdateUser ); // createOrUpdateUser decides what to do when path is /api ( authCheck runs first before createOrUpdateUser)

// in the moddile we need to check whether we got the token adn the token is valid or not

router.post('/current-user', authCheck, currentUser ); 
router.post('/current-admin', authCheck, adminCheck, currentUser ); 

module.exports = router;