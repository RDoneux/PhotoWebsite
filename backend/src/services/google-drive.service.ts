import fs from "fs";
const { google } = require("googleapis");
import * as path from "path";
import { Logger } from "../util/logger";

type PartialDriveFile = {
  id: string;
  name: string;
};

type SearchResultResponse = {
  kind: "drive#fileList";
  nextPageToken: string;
  incompleteSearch: boolean;
  files: PartialDriveFile[];
};

/* istanbul ignore file */
export class GoogleDriveService {
  private driveClient;

  public constructor(
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    refreshToken: string
  ) {
    this.driveClient = this.createDriveClient(
      clientId,
      clientSecret,
      redirectUri,
      refreshToken
    );
  }

  private createDriveClient(
    clientId: string,
    clientSecret: string,
    redirectUri: string,
    refreshToken: string
  ) {
    const client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    client.setCredentials({ refresh_token: refreshToken });

    return google.drive({
      version: "v3",
      auth: client,
    });
  }

  createFolder(folderName: string): Promise<PartialDriveFile> {
    return this.driveClient.files.create({
      resource: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
      },
      fields: "id, name",
    });
  }

  searchFolder(folderName: string): Promise<PartialDriveFile | null> {
    return new Promise((resolve, reject) => {
      this.driveClient.files.list(
        {
          q: `mimeType='application/vnd.google-apps.folder' and name='${folderName}'`,
          fields: "files(id, name)",
        },
        (err: any, res: { data: SearchResultResponse }) => {
          if (err) {
            return reject(err);
          }

          return resolve(res.data.files ? res.data.files[0] : null);
        }
      );
    });
  }

  searchFiles(fileName: string): Promise<PartialDriveFile | null> {
    return new Promise((resolve, reject) => {
      this.driveClient.files.list(
        {
          q: `name='${fileName}'`,
          fields: "files/id",
        },
        (err: any, res: { data: SearchResultResponse }) => {
          if (err) {
            return reject(err);
          }

          return resolve(res.data.files ? res.data.files[0] : null);
        }
      );
    });
  }

  saveFile(
    fileName: string,
    filePath: string,
    fileMimeType: string,
    folderId?: string
  ) {
    return this.driveClient.files.create({
      requestBody: {
        name: fileName,
        mimeType: fileMimeType,
        parents: folderId ? [folderId] : [],
      },
      media: {
        mimeType: fileMimeType,
        body: fs.createReadStream(filePath),
      },
    });
  }

  async uploadFile(fileName: string): Promise<string> {
    const finalPath = path.resolve(
      __dirname,
      process.env.PRODUCTION === "true" ? "temp" : "../temp",
      fileName
    );
    const folderName = "Photos";
    if (!fs.existsSync(finalPath)) {
      Logger.error("file not found");
    }

    let folder = await this.searchFolder(folderName).catch((error) => {
      Logger.error(error);
      return null;
    });

    if (!folder) {
      folder = await this.createFolder(folderName);
    }

    await this.saveFile(fileName, finalPath, "image/jpg", folder.id).catch(
      (error: any) => {
        Logger.error(error);
      }
    );

    Logger.info("File uploaded successfully!");

    // Delete the file on the server
    fs.unlinkSync(finalPath);
    const id = await this.searchFiles(fileName);
    return id?.id ?? "undefined";
  }
}
