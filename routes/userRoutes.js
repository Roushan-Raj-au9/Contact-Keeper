const express = require('express');
const router = express.Router();

const { isSignedIn } = require('../middleware/authMiddleware');
const { LoginUserProfile } = require('../controllers/userController');


router.get('/me', isSignedIn, LoginUserProfile )


module.exports = router;
