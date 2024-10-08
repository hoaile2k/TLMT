import * as cc from 'cc';
import {Subscriber} from "../../Base/index";
import {PlayerItem} from "./PlayerItem";

const {ccclass, property} = cc._decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Subscriber {

    @property(cc.Node) listPlayer: cc.Node[] = [];

    _mapPlayerByUserId = {};

    onLoad() {
        super.onLoad();
    }

    setupPlayer(arrPlayer) {
        let arrPlayerSorted = this._sortFromMainPlayer(arrPlayer);
        for (let i = 0; i < this.listPlayer.length; i++) {
            const pItem = this.listPlayer[i].getComponent(PlayerItem) as PlayerItem;
            const pInfo = arrPlayerSorted[i];
            if(pInfo) {
                pItem.node.active = true;
                this._mapPlayerByUserId[pInfo.userId] = pItem;
                pItem.setupInfo(pInfo);
                continue;
            }
            pItem.node.active = false;
        }
    }
    _sortFromMainPlayer(arrPlayer) {
        let mainIdx = -1;
        for (let i = 0; i < arrPlayer.length; i++) {
            if(arrPlayer[i].userId === this.getDataStore().getUserId()) {
                mainIdx = i;
                break;
            }
        }
        return arrPlayer.slice(mainIdx).concat(arrPlayer.slice(0, mainIdx));
    }
}

