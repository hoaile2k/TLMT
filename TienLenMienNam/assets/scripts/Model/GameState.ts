import {Director} from "../Base/Director";
import io from "../libs/socket.io.js";

export class GameState{
    private Director: Director;
    private _socket;
    private _userInfo = {
        userId: null
    }
    constructor(Director) {
        this.Director = Director;
        this.prepareWebSocket("ws://localhost:8080");
    }

    prepareWebSocket (wss) {
        this._socket = io(wss, {
            transports: ['websocket']  // forces websockets only
        });
        this._socket.on("connected", (data)=>{
            console.log("Socket msg:", data.msg)
        })
        this._socket.on("login-success", this.onLoginSuccess.bind(this));
        this._socket.on("join-game-lobby", this.joinGameLobby.bind(this));
        this._socket.on("join-table-success", this.joinTableSuccess.bind(this));
    }
    onLoginSuccess(loginData) {
        const {userId} = loginData;
        this._userInfo.userId = userId;
    }

    joinGameLobby(lobbyData) {
        this.Director.joinGameLobby(lobbyData);
    }

    requestLogin(userId) {
        this._socket.emit("request-login", userId);
    }

    requestJoinTable(tableId) {
        this._sendRequestWithId("request-join-table", {tableId});
    }

    joinTableSuccess(eventData) {
        const {msg, data} = eventData;
        console.warn(msg, data);
        this.Director.joinGameTable(data);
    }

    _sendRequestWithId(request, data) {
        this._socket.emit(request, {
            userId: this._userInfo.userId,
            data
        });
    }
}

