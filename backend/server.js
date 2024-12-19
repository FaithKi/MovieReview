require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const movieRoutes = require('./routes/movies')

// express app
const app = express()

// middleware
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})
app.use(express.json());

// routes
app.use('/api/movies',movieRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })