const amqplib = require('amqplib/callback_api')
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const router = express.Router();
const app = express();

const PORT = process.env.PORT;
const FRONT_SOCKET_URL = process.env.FRONT_SOCKET_URL;
const QUEUE_NAME = process.env.RABBITMQ_QUEUE_NAME
const RABBITMQ_URI = process.env.RABBITMQ_URI

router.get("/", (req, res) => {
    res.send({ response: "From socket Welcome !!!" }).status(200);
});

app.use(router);
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: `${FRONT_SOCKET_URL}`
    }
});

amqplib.connect(RABBITMQ_URI, (err, connection) => {
    if (err) { process.exit(); }
    else {
        connection.createChannel((_err, channel) => {
            channel.assertQueue(QUEUE_NAME, { durable: false });
            channel.consume(QUEUE_NAME, message => {
                const content = message?.content.toString()
                console.info();
                console.info(`===> Receive a message From Api project`);
                console.info(`===> ${QUEUE_NAME} - ${content}`);
                console.info();
                console.info(`===> Send message to front-socket project`);
                // socket.emit("FromAPI", content);
                io.to("send-message").emit('socket-message',content)
                console.info();
            }, { noAck: true });
        });
    }
});

io.on("connection", (socket) => {
    console.info();
    console.info("New client connected from front-socket project : client ID", socket.id);
    console.info();
    // Join socket
    socket.join("send-message")
    // Disconnect socket
    socket.on("disconnect", () => {
        console.info("Client disconnected");
    });
});

server.listen(PORT, () => console.info(`Listening on port ${PORT}`));