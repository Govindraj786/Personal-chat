const express = require('express');
const app = express();
const cors = require("cors");
// const bodyParse = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');


app.use(cors());
// app.use(express.json());
// app.use(bodyParse.urlencoded({extended: true}))
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log(`User Connection: ${socket.id}`);
    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`user with id:${socket.id} join room : ${data}`);
    });
socket.on("send_message",(data)=>{
  socket.to(data.room).emit("receive_message",data)
  console.log(data,"data");
})
    socket.on("disconnet",()=>{
        console.log("User disconnetion",socket.id);
    });
});



server.listen(8080,()=>{
    console.log(`SERVER RUNNING PORT : 8080`);
})