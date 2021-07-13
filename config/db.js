const mongoose = require('mongoose');
const config = require('config');

const mongouri = config.get('mongoURI')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongouri,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        })

        console.log("MongoDB Connected...")
    } 
    catch (err) {
        console.error("Error while connecting to DB ", err.message)

        process.exit(1)
    }
}

module.exports = connectDB