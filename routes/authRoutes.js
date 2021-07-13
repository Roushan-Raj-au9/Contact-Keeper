const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { signup, signin  } = require('../controllers/authController');
// const { signin, signout, singup  } = require('../controllers/authController');

//register
router.post('/signup', 
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check("password", "password length  should be at least 3 ").isLength({ min: 3 })
    ],
    signup
)

//login
router.post('/signin', 
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password").exists()
    ],
    signin
)

// //logout user
// router.get('/signout', signout)


module.exports = router  