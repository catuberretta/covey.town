import { nanoid } from 'nanoid';


export default class TownMapInfo {
    
    private _mapName: string;

    private _loadImage: string;

    private _tilemapTiledJSON: string;

<<<<<<< HEAD

    // Sprite image
    private _atlaspng: string;

    // Sprite json
    private _atlasjson: string;

    constructor() {
        this._mapID = "lol";
        this._loadImage  = '/assets/tilesets/tuxmon-sample-32px-extruded.png';
        // this._tilemapTiledJSON = '/assets/tilemaps/tuxemon-town.json';
        this._tilemapTiledJSON = '/LocalStorage/default_map1.tmx';
        this._atlaspng = '/assets/atlas/atlas.png';
        this._atlasjson = '/assets/atlas/atlas.json';
=======
    constructor(mapName: string, loadImg: string, mapJSON: string) {
        this._mapName = mapName;
        this._loadImage  = loadImg;
        this._tilemapTiledJSON = mapJSON;
>>>>>>> 8d90cba6759391281c1491632fdb8e3cd4a63ab3
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