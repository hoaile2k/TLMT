import * as cc from "cc";
const { ccclass, property } = cc._decorator;

@ccclass('AssetsManager')
export class AssetsManager extends cc.Component {
    @property(cc.SpriteAtlas) avatarAtlas: cc.SpriteAtlas = null;
    @property(cc.SpriteAtlas) cardAtlas: cc.SpriteAtlas = null;
}

