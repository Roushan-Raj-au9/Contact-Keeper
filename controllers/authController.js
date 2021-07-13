const User = require('../models/userModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {

    const errors = validationResult(req)

    // Validate request
    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        })
    }

    const { name, email, password } = req.body

    try {
        let user = await User.findOne({ email: email })

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        user = new User({
            name,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save()

        if (user) {
            //create token
            const Jtoken = jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: 86400 })

            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                token: Jtoken
            })
        }
        else {
            return res.status(400).send({
                message: 'Error While SignUp'
            })
        }
    }
    catch (err) {
        console.error(err.message) 
        res.status(500).send('Server error in SignUp')
    }

};


exports.signin = async (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            message: errors.array()[0].msg
        })
    }

    try {
        const user = await User.findOne({ email: email })

        if (user) {
            // const matchpassword = bcrypt.compareSync(password, user.password)
            const matchpassword = await bcrypt.compare(password, user.password)

            if (!matchpassword) {
                return res.status(401).json({
                    // message: "Invalid Password"
                    message: "Invalid Credentials"
                })
            }

            //create token
            const Jtoken = jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: 86400 })

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: Jtoken
            })
        }
        else {
            return res.status(401).json({
                // message: "Invalid Email"
                message: "Invalid Credentials"
            })
        }
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send('Server error in SignIn')
    }

}