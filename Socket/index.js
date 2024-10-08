import {Server} from "socket.io";

const io = new Server(8080, {
    transports: ['websocket']  // forces websockets only
});

let mapUserData = {};
let mapTableData = {};
let mapUserPlaying = {};
io.on("connection", (socket) => {
    console.log(socket.id + " connection");
    socket.emit("connected", {
        msg: "socket are connection"
    })

    socket.on("request-login", (userId) => {
        socket.emit("login-success", {userId});
        if (!mapUserData[userId]) {
            mapUserData[userId] = {
                userId: userId,
                loginState: SOCKET_DEFINE.LOGIN_STATE.LOBBY, //1: lobby, 2: table
            };
        }
        const userInfo = mapUserData[userId];
        if (userInfo.loginState === SOCKET_DEFINE.LOGIN_STATE.LOBBY) {
            socket.emit("join-game-lobby", mockLobby)
        } else {
            //TODO
        }
        mapUserData[userId].userId = userId;
    });

    socket.on("request-join-table", (requestData) => {
        console.log("request-join-table",requestData)
        const {data, userId} = requestData;
        const {tableId} = data;
        if(!mapTableData[tableId]) {
            mapTableData[tableId] = {
                listUser: [],
            };
        }
        const pJoin = mapUserData[userId];
        pJoin.score = 0;
        mapTableData[tableId].listUser.push(pJoin);
        if(mapTableData[tableId].listUser.length > SOCKET_DEFINE.MAX_PLAYER) {
            mapTableData[tableId].listUser.length = SOCKET_DEFINE.MAX_PLAYER;
            socket.emit("join-table-fail", {
                msg: "table is full"
            });
            return;
        }
        console.log(mapTableData)
        mapUserData[userId].loginState = SOCKET_DEFINE.LOGIN_STATE.TABLE;
        socket.emit("join-table-success", {
            msg: "join table " + tableId + " success",
            data: mapTableData[tableId]
        });
    });
});

const SOCKET_DEFINE = {
    LOGIN_STATE: {
        LOBBY: 1,
        TABLE: 2
    },
    MAX_PLAYER: 4
}

const mockLobby = [
    {
        tableId: 1,
        curPlayer: 1,
        maxPlayer: 4,
    },
    {
        tableId: 2,
        curPlayer: 2,
        maxPlayer: 4,
    },
    {
        tableId: 3,
        curPlayer: 1,
        maxPlayer: 4,
    },
    {
        tableId: 4,
        curPlayer: 2,
        maxPlayer: 4,
    },
    {
        tableId: 5,
        curPlayer: 1,
        maxPlayer: 4,
    },
    {
        tableId: 6,
        curPlayer: 2,
        maxPlayer: 4,
    },
]