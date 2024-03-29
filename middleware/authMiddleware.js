const jwt = require('jsonwebtoken');
const User =  require('../models/userModel');
const config = require('config');

exports.isSignedIn = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, config.get('jwtSecret'))

            req.user = await User.findById(decoded.id).select('-password')

            next()
        }
        catch(err){
            console.error(err)
            return res.status(401).json({
                message: "Something went wrong in isSignedIn..."
            })
        }
    }

    if(!token){
        return res.status(401).json({
            message: "Not authorized, No Token !!"
        })
    }
}