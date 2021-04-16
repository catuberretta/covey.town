A DESIGN.md document that includes documentation of your design (using CRC cards, UML class diagrams, and/or UML sequence diagrams as you find necessary; remember that a picture is worth a thousand words!). In particular, for any change that you had to make to the existing codebase, provide a rationale for why the change was made, and what alternatives were considered.



CRC Cards – Documenting our design 

| Class Name: TownMaps                                                |
| ----------------------- | ----------------------------------------- |
| State: defaultMap, allTownMaps                                      |
| ----------------------- | ----------------------------------------- |
| Responsibilities        | Collaborators                             |
| ----------------------- | ----------------------------------------- |
| Keeps track of users uploading their own maps or using the default maps.    | WorldMap |


<!-- | Class Name: CoveyTypes                                              |
| ----------------------- | ----------------------------------------- |
| State: defaultMap                                                   |
| ----------------------- | ----------------------------------------- |
| Responsibilities        | Collaborators                             |
| ----------------------- | ----------------------------------------- |
|    | |
|                                                    |  |
|  |   |
|  |  | -->


| Class Name: WorldMap                                                |
| ----------------------- | ----------------------------------------- |
| State: townMapInfo, spriteSheetInfo                                 |
| ----------------------- | ----------------------------------------- |
| Responsibilities        | Collaborators                             |
| ----------------------- | ----------------------------------------- |
| Keeps track of all the player movement as well as maps and avatar information.    | App |
|                                                    |  |
|  |   |
|  |  |

| Class Name: Player                                                  |
| ----------------------- | ----------------------------------------- |
| State: location, _spriteSheet, _id, _userName                       |
| ----------------------- | ----------------------------------------- |
| Responsibilities        | Collaborators                             |
| ----------------------- | ----------------------------------------- |
| Keeps track of the necessary information needed for a player in a town.    | TownServiceClient, App, CoveyTypes, CoveyTownController, PlayerSession |
|                                                    |  |


| Class Name: TownJoinResponse (interface inside of CoveyTownRequestHandlers)|
| ----------------------- | ----------------------------------------- |
| State: coveyUserID, currentSpriteSheet, coveySessionToken, providerVideoToken, currentPlayers, friendlyName, isPubliclyListed, currentTownMap |
| ----------------------- | ----------------------------------------- |
| Responsibilities        | Collaborators                             |
| ----------------------- | ----------------------------------------- |
| Maintains the format of a response to join a Town, includes information about the current sprite sheet and current map of the town.    | App, TownsServiceClient, Video, Login, TownSelection, TownsServiceClient, CoveyTownRequestHandlers |
|                                                    |  |
|  |   |
|  |  |


# should we include CoveyTypes, PlayerProfile?