import * as cc from 'cc';
import {Subscriber} from "../Base/index";
import {GameWriter} from "./GameWriter";
import {PlayerManager} from "./PlayerManager/PlayerManager";
const { ccclass, property } = cc._decorator;

@ccclass('GameDirector')
export class GameDirector extends Subscriber {

    @property(cc.Node) playerManager_node: cc.Node = null;

    playerManager: PlayerManager;
    _writer: GameWriter;
    onLoad() {
        super.onLoad();
        this._initComponent();
        this.registerNodeEvents();
    }

    _initComponent() {
        this.playerManager = this.playerManager_node.getComponent(PlayerManager);
    }

    registerNodeEvents() {
        this.node.on("_setupTable", this._setupTable.bind(this));
    }

    initGame() {
        this._writer = new GameWriter();
    }

    joinTable(tData) {
        this._executeScripts(tData, this._writer.makeScriptJoinTable);
    }

    _executeScripts(data, cb) {
        const scripts = cb(data);
        for (let script of scripts) {
            const {code, data} = script;
            this.node.emit(code, data);
        }
    }

    _setupTable(data) {
        console.error("_setupTable", data)
        this.playerManager.setupPlayer(data.listUser);
    }
}

