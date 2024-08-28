import {Server} from "socket.io";

const io = new Server(8080, {
    transports: ['websocket']  // forces websockets only
});

io.on("connection", (socket) => {
    console.log(socket.id + " connection");
    socket.emit("connected", {
        msg: "socket are connection"
    })
});