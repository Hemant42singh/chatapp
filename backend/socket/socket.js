import {Server} from "socket.io"
import http from "http"
import express from 'express'


const app = express();

const server = http.createServer(app);
const io = new Server(server , {
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET', 'POST'],
    },
});

const userSocketMap = {};// {userid-> socketid}

io.on('connection', (socket)=>{// jese hi user connect hoga uski id socket ke ander milegi
    console.log('user connected', socket.id);
    
    const userId = socket.handshake.query.userId
    console.log("handshake query:", socket.handshake.query);

    if(userId!== undefined){
        userSocketMap[userId] = socket.id;
    }
    
    io.emit('getOnlineUsers', Object.keys(userSocketMap))// IT SEND DATA FROM BACKEND TO FRONTEND 

    socket.on('disconnect', ()=>{
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap))
    })
})


export {app, io, server}