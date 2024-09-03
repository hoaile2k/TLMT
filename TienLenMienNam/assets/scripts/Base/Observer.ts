import { _decorator, Component, Node } from 'cc';
import {Config} from "./Config";
import {DataStore} from "./DataStore";
import {AssetsManager} from "./AssetsManager";
const { ccclass, property } = _decorator;

@ccclass('Observer')
export class Observer extends Component {
    getConfig(): Config {
        return this.node.getComponent(Config);
    }

    getDataStore(): DataStore {
        return this.node.getComponent(DataStore);
    }

    getAssetsManager(): AssetsManager {
        return this.node.getComponent(AssetsManager);
    }
}

