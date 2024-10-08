import * as cc from 'cc';
import {Subscriber} from "../Base/index";
import {EVENT_CODE} from "../GameDefine/GameDefine";
const { ccclass, property } = cc._decorator;

@ccclass('LobbyItem')
export class LobbyItem extends Subscriber {
    @property(cc.Node) tableId: cc.Node;
    @property(cc.Node) totalPlayer: cc.Node;

    _tableId;
    onLoad() {
        super.onLoad();
        this.node.on(cc.Button.EventType.CLICK, ()=>{
            this.fireEvent(EVENT_CODE.JOIN_TABLE, {tableId: this._tableId});
        })
    }

    setupData(itemInfo) {
        const {tableId, curPlayer, maxPlayer} = itemInfo;
        this._tableId = tableId;
        this.tableId.getComponent(cc.Label).string = tableId;
        this.totalPlayer.getComponent(cc.Label).string = `${curPlayer}/${maxPlayer}`;
    }
}

