A DESIGN.md document that includes documentation of your design (using CRC cards, UML class
diagrams, and/or UML sequence diagrams as you find necessary; remember that a picture is worth a
thousand words!). In particular, for any change that you had to make to the existing codebase,
provide a rationale for why the change was made, and what alternatives were considered.

Your design document should give a general sense of what you did-- what pieces did you add or
modify?  How do the pieces fit together? Choosing how to explain this is up to you.

DESIGN.md file contains a description of any substantive changes to the existing Covey.Town
codebase, and the architecture of your new code. It uses CRC cards, or state diagrams or any of the
other techniques that help describe the structure. The document is at most 4 pages (fewer pages are
absolutely acceptable, consider this a rough limit) Added 4/8

Documenting our design

In the front-end, we created three new components for each of our features:

<img src='mdImages/2.Player Profile.png'>
<img src='mdImages/3.TownMaps.png'>
<img src='mdImages/4.HostMaps.png'>

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
