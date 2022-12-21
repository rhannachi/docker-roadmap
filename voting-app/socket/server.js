const amqplib = require('amqplib/callback_api')
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = express.Router();

const PORT = process.env.PORT;
const QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME
const RABBITMQ_URI = process.env.RABBITMQ_URI

const app = express();
app.use(router);
const server = http.createServer(app);
const io = socketIo(server);

amqplib.connect(RABBITMQ_URI, (err, connection) => {
    if (err) { process.exit(); }
    else {
        connection.createChannel((_err, channel) => {
            channel.assertQueue(QUEUE_NAME, { durable: false });
            channel.consume(QUEUE_NAME, message => {
                console.info();
                console.info(`===> Waiting for messages`);
                console.info(`===> ${QUEUE_NAME} - ${message?.content.toString()}`);
                console.info();
            }, { noAck: true });
        });
    }
});




router.get("/", (req, res) => {
    res.send({ response: "From socket Welcome !!!" }).status(200);
});



let interval;

io.on("connection", (socket) => {
    console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));