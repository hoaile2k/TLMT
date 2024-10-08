import * as cc from 'cc';
import {Observer} from "./Observer";
import {DataStore} from "./DataStore";

const {ccclass, property} = cc._decorator;

@ccclass('Subscriber')
export class Subscriber extends cc.Component {
    private _observer: Observer;

    onLoad() {
        this._observer = cc.find("Canvas").getComponentInChildren(Observer);
    }

    getConfig(): any {
        return this._observer.getConfig();
    }

    getAssetsManager(): any {
        return this._observer.getAssetsManager();
    }

    getDataStore(): any {
        return this._observer.getDataStore();
    }

    fireEvent(eventName, data) {
        this._observer.node.emit(eventName, data);
    }

    registerEvent(eventName, cb) {
        this._observer.node.on(eventName, (data) => {
            cb && cb(data)
        });
    }
}

