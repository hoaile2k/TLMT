import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('DataStore')
export class DataStore extends Component {
    _userId;
    setUserId(userId) {
        this._userId = userId;
    }

    getUserId() {
        return this._userId;
    }
}

