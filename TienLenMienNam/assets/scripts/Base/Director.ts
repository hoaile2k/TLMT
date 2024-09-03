import * as cc from 'cc';
import {Subscriber} from "./Subscriber";
import {GameState} from "../Model/GameState";
const { ccclass, property } = cc._decorator;

@ccclass('Director')
export class Director extends Subscriber {
    @property(cc.Node) game = null;

    gameStateManager: GameState;
    onLoad() {
        super.onLoad();
        this.initGameState();
    }
    initGameState() {
        this.gameStateManager = new GameState(this);
    }
    onConnected(msg) {
        cc.warn(msg);
    }
}

