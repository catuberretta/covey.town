import { nanoid } from 'nanoid';


export default class TownMapInfo {
    
    private _mapName: string;

    private _loadImage: string;

    private _tilemapTiledJSON: string;

    constructor(mapName: string, loadImg: string, mapJSON: string) {
        this._mapName = mapName;
        this._loadImage  = loadImg;
        this._tilemapTiledJSON = mapJSON;
      }

    get loadImage(): string | undefined {
        return this._loadImage;
    }

    get tilemapTiledJson(): string | undefined {
        return this._tilemapTiledJSON;
    }

    get mapName(): string {
        return this._mapName;
    }

    set mapName(newID: string) {
        this._mapName = newID;
    }


}