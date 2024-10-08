import * as cc from 'cc';
import {Subscriber} from "../Base/index";
import {LobbyWriter} from "./LobbyWriter";
import {LobbyItem} from "./LobbyItem";
const { ccclass, property } = cc._decorator;

@ccclass('LobbyDirector')
export class LobbyDirector extends Subscriber {
    @property(cc.Prefab) lobbyItem: cc.Prefab = null;
    @property(cc.Node) lobbyWrapper: cc.Node = null;

    _lobbyWriter = null;

    onLoad() {
        super.onLoad();
        this._initEvent();
    }

    _initEvent() {
        this.node.on("_setupLobby", this._setupLobby.bind(this));
    }

    initLobby() {
        this._lobbyWriter = new LobbyWriter();
    }

    joinLobby(lobbyData) {
        this._executeScripts(lobbyData, this._lobbyWriter.makeScriptRenderLobby);
    }

    _executeScripts(data, cb) {
        const scripts = cb(data);
        for (let script of scripts) {
            const {code, data} = script;
            this.node.emit(code, data);
        }
    }

    _setupLobby(data) {
        if (data) {
            for (let item of data) {
                const lobbyItem = cc.instantiate(this.lobbyItem);
                lobbyItem.parent = this.lobbyWrapper;
                lobbyItem.getComponent(LobbyItem).setupData(item);
            }
        }
    }
}

