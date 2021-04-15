export default class Player {
  public location?: UserLocation;

  private readonly _id: string;

  private readonly _userName: string;

  private _spriteSheet: SpriteSheetInfo;

  public sprite?: Phaser.GameObjects.Sprite;

  public label?: Phaser.GameObjects.Text;


  constructor(id: string, userName: string, location: UserLocation) {
    this._id = id;
    this._userName = userName;
    this.location = location;
    this._spriteSheet = { spriteName: 'Misa', spritePNG: 'atlas.png' };
  }

  get userName(): string {
    return this._userName;
  }

  get id(): string {
    return this._id;
  }

  get spriteSeheet(): SpriteSheetInfo {
    return this._spriteSheet;
  }

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

export type SpriteSheetInfo = 
{ spriteName: string, 
  spritePNG: string, 
}
