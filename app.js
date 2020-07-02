const express = require('express');
const app = express();
const mongo = require('mongoose');
require('dotenv/config');
var bodyParser = require('body-parser')
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json())

//IMPORT ROUTE
const authRoute = require('./routes/auth');
const produtRoute = require('./routes/product');

app.use('/auth', authRoute);
app.use('/product', produtRoute);


mongo.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB_CONNETED')
});

app.get('/',(req,res)=>{
    res.send('connected')
});



io.on('connection', function (socket) {
    console.log('client connect');
    socket.on('echo', function (data) {
    io.sockets.emit('message', data);
 });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));