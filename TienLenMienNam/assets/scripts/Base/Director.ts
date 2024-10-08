import * as cc from 'cc';
import {Subscriber} from "./Subscriber";
import {GameState} from "../Model/GameState";
import {LobbyDirector} from "../Lobby/LobbyDirector";
import {GameDirector} from "../Game/GameDirector";
import {EVENT_CODE} from "../GameDefine/GameDefine";
import {LoginDirector} from "../Login/LoginDirector";
const { ccclass, property } = cc._decorator;

@ccclass('Director')
export class Director extends Subscriber {
    @property(cc.Node) login_node = null;
    @property(cc.Node) lobby_node = null;
    @property(cc.Node) game_node = null;

    gameStateManager: GameState;
    login: LoginDirector;
    lobby: LobbyDirector;
    game: GameDirector;
    onLoad() {
        super.onLoad();
        this._initComponent();
        this._bindEvents();
        this.initGameState();
    }
    _bindEvents() {
        this.registerEvent(EVENT_CODE.JOIN_TABLE, (data)=>{
            const {tableId} = data;
            this.gameStateManager.requestJoinTable(tableId);
        })
        this.registerEvent(EVENT_CODE.LOGIN_WITH_ID, (data)=>{
            const {userId} = data;
            this.gameStateManager.requestLogin(userId);
        })
    }
    _initComponent() {
        this.login = this.login_node.getComponent(LoginDirector);
        this.lobby = this.lobby_node.getComponent(LobbyDirector);
        this.game = this.game_node.getComponent(GameDirector);
    }
    initGameState() {
        this.gameStateManager = new GameState(this);
        this.lobby.initLobby();
        this.game.initGame();
        this.lobby_node.active = false;
        this.game_node.active = false;
        this.login_node.active = true;
    }
    onConnected(msg) {
        cc.warn(msg);
    }
    joinGameLobby(lData) {
        this.login_node.active = false;
        this.lobby_node.active = true;
        this.lobby.joinLobby(lData);
    }
    joinGameTable(tData) {
        this.lobby_node.active = false;
        this.login_node.active = false;
        this.game_node.active = true;
        this.game.joinTable(tData);
    }
}

