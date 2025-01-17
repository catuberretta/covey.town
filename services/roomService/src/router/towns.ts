import BodyParser from 'body-parser';
import { Express } from 'express';
import fileupload from 'express-fileupload';
import { Server } from 'http';
import { StatusCodes } from 'http-status-codes';
import * as path from 'path';
import io from 'socket.io';
import {
  playerUpdateHandler,
  townCreateHandler,
  townDeleteHandler,
  townJoinHandler,
  townListHandler,
  townSubscriptionHandler,
  townUpdateHandler,
  updateMapsHandler,
} from '../requestHandlers/CoveyTownRequestHandlers';
import { logError } from '../Utils';

export default function addTownRoutes(http: Server, app: Express): io.Server {
  /*
   * Create a new session (aka join a town)
   */
  app.post('/sessions', BodyParser.json(), async (req, res) => {
    try {
      const result = await townJoinHandler({
        userName: req.body.userName,
        coveyTownID: req.body.coveyTownID,
      });
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error, please see log in server for more details',
      });
    }
  });

  /**
   * Delete a town
   */
  app.delete('/towns/:townID/:townPassword', BodyParser.json(), async (req, res) => {
    try {
      const result = await townDeleteHandler({
        coveyTownID: req.params.townID,
        coveyTownPassword: req.params.townPassword,
      });
      res.status(200).json(result);
    } catch (err) {
      logError(err);
      res.status(500).json({
        message: 'Internal server error, please see log in server for details',
      });
    }
  });

  /**
   * List all towns
   */
  app.get('/towns', BodyParser.json(), async (_req, res) => {
    try {
      const result = await townListHandler();
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error, please see log in server for more details',
      });
    }
  });

  /**
   * Create a town
   */
  app.post('/towns', BodyParser.json(), async (req, res) => {
    try {
      const result = await townCreateHandler(req.body);
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error, please see log in server for more details',
      });
    }
  });

  /**
   * Update a town
   */
  app.patch('/towns/:townID', BodyParser.json(), async (req, res) => {
    try {
      const result = await townUpdateHandler({
        coveyTownID: req.params.townID,
        isPubliclyListed: req.body.isPubliclyListed,
        friendlyName: req.body.friendlyName,
        townMap: req.body.townMap,
        coveyTownPassword: req.body.coveyTownPassword,
      });
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error, please see log in server for more details',
      });
    }
  });

  /**
   * Update a player
   */
  app.patch('/players', BodyParser.json(), async (req, res) => {
    try {
      const result = await playerUpdateHandler({
        coveyTownID: req.body.coveyTownID,
        playerID: req.body.playerID,
        newSprite: req.body.newSprite,
      });
      res.status(StatusCodes.OK).json(result);
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error, please see log in server for more details',
      });
    }
  });

  /**
   * Upload a file
   */
  app.use(fileupload());

  app.post('/uploads', BodyParser.json(), async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        // return res.status(400).send('No files were uploaded.');
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'No files were uploaded.',
        });
      } else {
        // Get file
        const uploadedFile = req.files.uploaded_file as fileupload.UploadedFile;
        const fileName = uploadedFile.name;

        // Check file extension, make sure file is JSON
        if (fileName.substring(fileName.length - 4, fileName.length) !== 'json') {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Incorrect file type. Must be a JSON file.',
          });
        } else {
          // Make path
          const actualPath = path.join(__dirname, '../../../../');
          const uploadPath = `${actualPath}frontend/public/assets/tilemaps/${fileName}`;

          // Move to right path
          uploadedFile.mv(uploadPath);

          const newMap = {
            mapName: fileName.substring(0, fileName.length - 5),
            loadImg: 'tuxmon-sample-32px-extruded.png',
            mapJSON: fileName,
          };

          const result = await updateMapsHandler(newMap);
          res.status(StatusCodes.OK).json(result);
        }
      }
    } catch (err) {
      logError(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Internal server error, please see log in server for more details',
      });
    }
  });

  const socketServer = new io.Server(http, { cors: { origin: '*' } });
  socketServer.on('connection', townSubscriptionHandler);
  return socketServer;
}
