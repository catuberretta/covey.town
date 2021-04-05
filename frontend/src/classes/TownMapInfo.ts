
export default class TownMapInfo {
    
    private _mapID: string;

    private _loadImage: string;

    private _tilemapTiledJSON: string;

    private _atlaspng: string;

    private _atlasjson: string;

    constructor() {
        this._mapID = "lol";
        this._loadImage  = '/assets/tilesets/tuxmon-sample-32px-extruded.png';
        this._tilemapTiledJSON = '/assets/tilemaps/tuxemon-town.json';
        this._atlaspng = '/assets/atlas/atlas.png';
        this._atlasjson = '/assets/atlas/atlas.json';
      }

    get loadImage(): string | undefined {
        return this._loadImage;
    }

    get tilemapTiledJson(): string | undefined {
        return this._tilemapTiledJSON;
    }

    get atlaspng(): string | undefined {
        return this._atlaspng;
    }

    get atlasjson(): string | undefined {
        return this._atlasjson;
    }

    get mapID(): string {
        return this._mapID;
    }

    set mapID(newID: string) {
        this._mapID = newID;
    }


}