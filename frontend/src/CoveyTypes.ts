import { Socket } from 'socket.io-client';
import Player, { UserLocation, SpriteSheetInfo } from './classes/Player';
import { CoveyTownMapInfo } from './classes/Town';

import TownsServiceClient from './classes/TownsServiceClient';

export type CoveyEvent = 'playerMoved' | 'playerAdded' | 'playerRemoved';

export type VideoRoom = {
  twilioID: string,
  id: string
};
export type UserProfile = {
  displayName: string,
  id: string
};
export type NearbyPlayers = {
  nearbyPlayers: Player[]
};

export type CoveyAppState = {
  sessionToken: string,
  userName: string,
  currentTownHost: string,
  currentTownFriendlyName: string,
  currentTownID: string,
  currentTownIsPubliclyListed: boolean,
  currentTownMap: CoveyTownMapInfo,
  myPlayerID: string,
  currentSpriteSheet: SpriteSheetInfo,
  players: Player[],
  currentLocation: UserLocation,
  nearbyPlayers: NearbyPlayers,
  emitMovement: (location: UserLocation) => void,
  socket: Socket | null,
  apiClient: TownsServiceClient,
};

