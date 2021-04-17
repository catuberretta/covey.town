export type Direction = 'front' | 'back' | 'left' | 'right';
export type UserLocation = {
  x: number;
  y: number;
  rotation: Direction;
  moving: boolean;
};

export type SpriteSheetInfo = 
{ spriteName: string, 
  spritePNG: string, 
};

export type CoveyTownList = { friendlyName: string; coveyTownID: string; currentOccupancy: number; maximumOccupancy: number, coveyTownHost: string, coveyTownMap: CoveyTownMapInfo }[];
export type CoveyTownMapInfo = { mapName: string, loadImg: string, mapJSON: string };
export type CoveyMapList = CoveyTownMapInfo[];

