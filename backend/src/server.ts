import 'dotenv/config';  // Import dotenv and immediately run it
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import movieRoutes from './routes/movieRoutes.ts';  // Ensure this path is correct
import authRoutes from './routes/authRoutes.ts';  // Ensure this path is correct
import userRoutes from './routes/userRoutes.ts';  // Ensure this path is correct
import reviewRoutes from './routes/reviewRoutes.ts';  // Ensure this path is correct
import { appendFile } from 'fs';

// express app
const app = express()
const mongo_uri= process.env.MONGO_URI as string;

// middleware
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})
app.use(cors());
app.use(express.json());


// routes
app.use('/api/movies',movieRoutes)
app.use('/api/auth', authRoutes) 
app.use('/api/user', userRoutes)
app.use('/api/review', reviewRoutes) // Ensure this path is correct
// connect to db
mongoose.connect(mongo_uri)
    .then(()=>{
        // listen for request
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })