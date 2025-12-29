// const express = require('express')
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js"
import cors from "cors";
import { app, server } from "./socket/socket.js";

dotenv.config({});



// const app = express();
const PORT = process.env.PORT 

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //  it ensure  the data we are passing form the client side is must be json
app.use(cookieParser());
const corsOption ={
    origin:'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption));


// routes
app.use("/api/auth", userRoute);
app.use("/api/auth/message", messageRoute );
// http:/localhost:8080/api/v1/user/register  above api will run on this  route

server.listen(PORT, ()=>{
    connectDB();
    console.log(`server listen at port ${PORT}`);
})