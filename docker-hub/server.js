const express = require('express')
const http = require('http')
const port = 80;
const app = express();

app.get("/", (req, res) => {
    console.info('/health', { success: true, message: "It is working" })
    res.send({ success: true, message: "It is working" });
});

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(port);
server.on('listening', () => {
    console.info("listening on port " + port);
})
