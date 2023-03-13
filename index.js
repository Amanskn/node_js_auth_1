import dotenv from "dotenv"
dotenv.config();

import express from 'express';
import cors from "cors";
import connectDB from "./config/connectdb.js";
import userRoutes from './routes/userRoutes.js';
const app=express();
const port = process.env.port;
const DATABASE_URL = process.env.DATABASE_URL




// app.get('/',(req,res)=>{
//     if(!req.body)
//      {
//         return res.send("inside if")
//     }
//     console.log("Outside code")
//      res.send("outside if");
// })


app.use(cors());

// Database connection
connectDB(DATABASE_URL);


// Json
app.use(express.json());



// loading the routes
app.use('/api/user',userRoutes);

app.listen(port,function(err){
    if(err){
        console.log("Error in running the server",err);
        return;
    }
    console.log("Server is running on Port:",port);
    return ;
})