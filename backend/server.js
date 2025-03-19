import 'dotenv/config';  // Import dotenv and immediately run it
import express from 'express';
import mongoose from 'mongoose';
import movieRoutes from './routes/movieRouter.js';  // Ensure this path is correct
// import loadMovies from './importMovie.js'
// express app
const app = express()

// app.use('/importMovies', loadMovies)
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