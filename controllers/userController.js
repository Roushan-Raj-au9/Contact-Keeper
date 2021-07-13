const User = require('../models/userModel');

exports.LoginUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password')
      
      res.json(user)
    } 
    catch (err) {
        console.error(err.message)
        res.status(500).json({
            message: "Error with fecthing loged in user profile..."
        })
    }
}