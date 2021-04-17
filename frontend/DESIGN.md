A DESIGN.md document that includes documentation of your design (using CRC cards, UML class
diagrams, and/or UML sequence diagrams as you find necessary; remember that a picture is worth a
thousand words!). In particular, for any change that you had to make to the existing codebase,
provide a rationale for why the change was made, and what alternatives were considered.

Your design document should give a general sense of what you did-- what pieces did you add or
modify?  How do the pieces fit together? Choosing how to explain this is up to you.

CRC Cards – Documenting our design

| Class Name: Player                                                      |
| ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| State: location, \_spriteSheet, \_id, \_userName                        |
| -----------------------                                                 | -----------------------------------------                              |
| Responsibilities                                                        | Collaborators                                                          |
| -----------------------                                                 | -----------------------------------------                              |
| Keeps track of the necessary information needed for a player in a town. | TownServiceClient, App, CoveyTypes, CoveyTownController, PlayerSession |
|                                                                         |                                                                        |

| Class Name: TownJoinResponse (interface inside of CoveyTownRequestHandlers)                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| State: coveyUserID, currentSpriteSheet, coveySessionToken, providerVideoToken, currentPlayers, friendlyName, isPubliclyListed, currentTownMap |
| -----------------------                                                                                                                       | -----------------------------------------                                                          |
| Responsibilities                                                                                                                              | Collaborators                                                                                      |
| -----------------------                                                                                                                       | -----------------------------------------                                                          |
| Maintains the format of a response to join a Town, includes information about the current sprite sheet and current map of the town.           | App, TownsServiceClient, Video, Login, TownSelection, TownsServiceClient, CoveyTownRequestHandlers |
|                                                                                                                                               |                                                                                                    |
|                                                                                                                                               |                                                                                                    |
|                                                                                                                                               |                                                                                                    |

# should we include CoveyTypes, PlayerProfile?
