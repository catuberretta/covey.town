
export default class TownMapInfo {
    
    private _mapName: string;

    private _loadImage: string;

    private _loadImageLocation: string;

    private _tilemapTiledJSON: string;


    constructor(mapName: string, loadImg: string, mapJSON: string) {
        this._mapName = mapName;
        this._loadImage  = loadImg;
        this._loadImageLocation  = `/assets/tilesets/${loadImg}`;
        this._tilemapTiledJSON = `/assets/tilemaps/${mapJSON}`;
      }

    get loadImage(): string  {
        return this._loadImage;
    }

    get loadImageLocation(): string  {
        return this._loadImageLocation;
    }

    get tilemapTiledJson(): string  {
        return this._tilemapTiledJSON;
    }

    get mapName(): string {
        return this._mapName;
    }

    set mapName(newID: string) {
        this._mapName = newID;
    }


}