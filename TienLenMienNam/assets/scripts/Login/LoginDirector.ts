import * as cc from 'cc';
import {Subscriber} from "../Base/index";
import {EVENT_CODE} from "../GameDefine/GameDefine";
const { ccclass, property } = cc._decorator;

@ccclass('LoginDirector')
export class LoginDirector extends Subscriber {
    @property(cc.EditBox) editBox: cc.EditBox = null;
    @property(cc.Node) btnConfirm: cc.Node = null;

    onLoad() {
        super.onLoad();
        this.btnConfirm.on(cc.Button.EventType.CLICK, this._onLogin.bind(this))
        this.editBox.node.on(cc.EditBox.EventType.EDITING_RETURN, this._onLogin.bind(this));
    }

    _onLogin() {
        this.fireEvent(EVENT_CODE.LOGIN_WITH_ID, {userId: this.editBox.string});
        this.getDataStore().setUserId(this.editBox.string);
    }
}

