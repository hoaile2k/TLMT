import * as cc from 'cc';
import {Observer} from "./Observer";
const { ccclass, property } = cc._decorator;

@ccclass('Subscriber')
export class Subscriber extends cc.Component {
    private _observer: Observer;
    onLoad() {
        this._observer = cc.find("Canvas").getComponentInChildren(Observer);
    }
    getConfig() {
        this._observer.getConfig();
    }
    getAssetsManager() {
        this._observer.getAssetsManager();
    }
    getDataStore() {
        this._observer.getDataStore();
    }
}

