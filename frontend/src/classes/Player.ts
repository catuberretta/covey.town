export default class Player {
  public location?: UserLocation;

  private readonly _id: string;

  private readonly _userName: string;

  private _spriteSkin: SpriteInfo;

  public sprite?: Phaser.GameObjects.Sprite;

  public label?: Phaser.GameObjects.Text;

  constructor(id: string, userName: string, location: UserLocation) {
    this._id = id;
    this._userName = userName;
    this.location = location;
    this._spriteSkin = { spriteName: 'Misa', spritePNG: 'atlas.png', spriteJSON: 'atlas.json', };
  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  get spriteSkin(): SpriteInfo {
    return this._spriteSkin;
  }

  // set spriteSkin(newSprite: SpriteInfo) {
  //    this._spriteSkin === newSprite;
  // }

  static fromServerPlayer(playerFromServer: ServerPlayer): Player {
    return new Player(playerFromServer._id, playerFromServer._userName, playerFromServer.location);
  }
}
export type ServerPlayer = { _id: string, _userName: string, location: UserLocation };

export type Direction = 'front'|'back'|'left'|'right';

export type UserLocation = {
  x: number,
  y: number,
  rotation: Direction,
  moving: boolean
};

export type SpriteInfo = 
{ spriteName: string, 
  spritePNG: string, 
  spriteJSON: string 
}
