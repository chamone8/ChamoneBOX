const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());


//inicio da conexão individual 
const server = require('http').Server(app);

const io = require('socket.io')(server);

io.on("connection", socket => {
    socket.on("connectRoom", box => {
        socket.join(box);
    })
    
});

//fim da conexão individual 
mongoose.connect("mongodb+srv://admin:root@node-v001-nwj0m.mongodb.net/Box?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//inicio da conexão individual 
app.use((req,res,next)=>{
    req.io = io;
    return next();
})

//fim da conexão individual 

app.use(express.json());// server pra enteder requisições post json
app.use(express.urlencoded({ extended: true })); // serve pra receber arquivos como requisições
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 90);//sem o server não funciona


