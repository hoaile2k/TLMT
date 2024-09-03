import {Director} from "../Base/Director";
import io from "../libs/socket.io.js";

export class GameState{
    private Director: Director;
    constructor(Director) {
        this.Director = Director;
        this.prepareWebSocket("ws://localhost:8080");
    }

    prepareWebSocket (wss) {
        const socket = io(wss, {
            transports: ['websocket']  // forces websockets only
        });
        socket.on("connected", (data)=>{
            console.log("Socket msg:", data.msg)
        })
    }
}

