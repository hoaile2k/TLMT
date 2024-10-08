export class LobbyWriter {
    constructor() {
    }

    makeScriptRenderLobby(lobbyData) {
        let scripts = [];
        scripts.push({
            code: "_setupLobby",
            data: lobbyData
        })
        return scripts;
    }
}