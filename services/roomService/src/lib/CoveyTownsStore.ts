import { CoveyTownList, CoveyTownMapInfo, SpriteSheetInfo } from '../CoveyTypes';
import CoveyTownController from './CoveyTownController';

function passwordMatches(provided: string, expected: string): boolean {
  if (provided === expected) {
    return true;
  }
  if (process.env.MASTER_TOWN_PASSWORD && process.env.MASTER_TOWN_PASWORD === provided) {
    return true;
  }
  return false;
}

export default class CoveyTownsStore {
  private static _instance: CoveyTownsStore;

  private _towns: CoveyTownController[] = [];

  private defaultMap = {
    mapName: 'Tuxedo Town',
    loadImg: 'tuxmon-sample-32px-extruded.png',
    mapJSON: 'tuxemon-town.json',
  };

  private roseTown = {
    mapName: 'Rose Town',
    loadImg: 'tuxmon-sample-32px-extruded.png',
    mapJSON: 'rose-town.json',
  };

  private snowTown = {
    mapName: 'Snow Town',
    loadImg: 'tuxmon-sample-32px-extruded.png',
    mapJSON: 'snow-town.json',
  };

  private _townMaps: CoveyTownMapInfo[] = [this.defaultMap, this.roseTown, this.snowTown];

  static getInstance(): CoveyTownsStore {
    if (CoveyTownsStore._instance === undefined) {
      CoveyTownsStore._instance = new CoveyTownsStore();
    }
    return CoveyTownsStore._instance;
  }

  getTownMaps(): CoveyTownMapInfo[] {
    return this._townMaps;
  }

  addTownMap(newMap: CoveyTownMapInfo): boolean {
    this._townMaps.push(newMap);
    return true;
  }

  getControllerForTown(coveyTownID: string): CoveyTownController | undefined {
    return this._towns.find(town => town.coveyTownID === coveyTownID);
  }

  getTowns(): CoveyTownList {
    return this._towns
      .filter(townController => townController.isPubliclyListed)
      .map(townController => ({
        coveyTownID: townController.coveyTownID,
        friendlyName: townController.friendlyName,
        currentOccupancy: townController.occupancy,
        maximumOccupancy: townController.capacity,
        coveyTownMap: townController.coveyTownMap,
        coveyTownHost: townController.townHost,
      }));
  }

  createTown(
    friendlyName: string,
    isPubliclyListed: boolean,
    playerName: string,
  ): CoveyTownController {
    const newTown = new CoveyTownController(friendlyName, isPubliclyListed, playerName);
    this._towns.push(newTown);
    return newTown;
  }

  updateTown(
    coveyTownID: string,
    coveyTownPassword: string,
    friendlyName?: string,
    makePublic?: boolean,
    townMap?: CoveyTownMapInfo,
  ): boolean {
    const existingTown = this.getControllerForTown(coveyTownID);
    if (existingTown && (passwordMatches(coveyTownPassword, existingTown.townUpdatePassword) || existingTown.townHost === coveyTownPassword)) {
      if (friendlyName !== undefined) {
        if (friendlyName.length === 0) {
          return false;
        }
        existingTown.friendlyName = friendlyName;
      }
      if (makePublic !== undefined) {
        existingTown.isPubliclyListed = makePublic;
      }
      if (townMap !== undefined) {
        existingTown.updateTownMap(townMap);
      }
      return true;
    }
    return false;
  }

  updateSprite(coveyTownID: string, playerID: string, newSprite: SpriteSheetInfo): boolean {
    const existingTown = this.getControllerForTown(coveyTownID);
    let result = false;
    if (existingTown && playerID.length !== 0) {
      const foundPlayer = existingTown.players.find(player => player.id === playerID);
      if (foundPlayer) {
        foundPlayer.updateSpriteSheet(newSprite);
        result = true;
      }
    }
    return result;
  }

  deleteTown(coveyTownID: string, coveyTownPassword: string): boolean {
    const existingTown = this.getControllerForTown(coveyTownID);
    if (existingTown && passwordMatches(coveyTownPassword, existingTown.townUpdatePassword)) {
      this._towns = this._towns.filter(town => town !== existingTown);
      existingTown.disconnectAllPlayers();
      return true;
    }
    return false;
  }
}
