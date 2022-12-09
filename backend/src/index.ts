import { Server } from "./server/server";
import figlet from "figlet";
import { TestController } from "./controllers/test/test.controller";
import dotenv from "dotenv";
import { ImageController } from "./controllers/image/image.controller";
import { CollectionController } from "./controllers/collection/collection.controller";

dotenv.config();
console.log(figlet.textSync("Photo Website"));
new Server(Number(process.env.PORT ?? 3000), [
  new TestController(),
  new ImageController(),
  new CollectionController(),
]);

// import * as path from 'path';
// import * as fs from 'fs';

// import { GoogleDriveService } from './services/google-drive.service';
// import { Logger } from "./util/logger";

// dotenv.config();

// const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || '';
// const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || '';
// const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || '';
// const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || '';

// (async () => {
//   const googleDriveService = new GoogleDriveService(driveClientId, driveClientSecret, driveRedirectUri, driveRefreshToken);

//   const finalPath = path.resolve(__dirname, './spacex-uj3hvdfQujI-unsplash.jpg');
//   const folderName = 'Picture';

//   if (!fs.existsSync(finalPath)) {
//     Logger.error("file not found")
//     throw new Error('File not found!');
//   }

//   let folder = await googleDriveService.searchFolder(folderName).catch((error) => {
//     console.error(error);
//     return null;
//   });

//   if (!folder) {
//     folder = await googleDriveService.createFolder(folderName);
//   }

//   await googleDriveService.saveFile('SpaceX', finalPath, 'image/jpg', folder.id).catch((error: any) => {
//     console.error(error);
//   });

//   console.info('File uploaded successfully!');

//   // Delete the file on the server
//   fs.unlinkSync(finalPath);
// })();
