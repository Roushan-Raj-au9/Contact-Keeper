const express = require('express');
const app = express();
const path = require('path')

const connectDB = require('./config/db');

//Routes import 
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

const PORT = process.env.PORT || 5000;

//connecting to DataBase
connectDB()

//Init Middleware
app.use(express.json({ extended: false }))


// app.get('/', (req, res) => {
//     res.send('api is running...')
// })


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes)


//Serve Static Assests in Production
if(process.env.NODE_ENV === 'production') {
    //set Static Folder
    app.use(express.static('frontend/build')) 

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })

}


app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server is running on port ${PORT}`)
})