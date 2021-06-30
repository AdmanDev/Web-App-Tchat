const { setupLoginEvents } = require("./loginService");

// Server configuration
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: process.env.ADDRESS + ":" + process.env.PORT,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

process.setMaxListeners(0);
io.sockets.setMaxListeners(0);

// on client is connected
io.on("connection", (socket) => {
    // Add login listeners to the socket
    setupLoginEvents(io, socket);
});

console.log("Server liten", process.env.ADDRESS);
httpServer.listen(process.env.PORT, process.env.IP);
