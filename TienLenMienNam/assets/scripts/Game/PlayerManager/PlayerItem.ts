import * as cc from 'cc';
import {Subscriber} from "../../Base/index";
const { ccclass, property } = cc._decorator;

@ccclass('PlayerItem')
export class PlayerItem extends Subscriber {
    @property(cc.Node) avatar: cc.Node = null;
    @property(cc.Node) score: cc.Node = null;
    @property(cc.Node) userId: cc.Node = null;

    setupInfo(pInfo) {
        const {avatar, score, userId} = pInfo;
        //TODO avatar
        this.score.getComponent(cc.Label).string = score;
        this.userId.getComponent(cc.Label).string = userId;
    }
}

