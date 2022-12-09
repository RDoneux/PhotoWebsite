import path from "path";
import fs from "fs";
import { GoogleDriveService } from "./google-drive.service";
import { Request } from "express";
import multer from "multer";

export async function uploadToGoogleDrive(file: string): Promise<string> {
  const driveClientId = process.env.GOOGLE_DRIVE_CLIENT_ID || "";
  const driveClientSecret = process.env.GOOGLE_DRIVE_CLIENT_SECRET || "";
  const driveRedirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI || "";
  const driveRefreshToken = process.env.GOOGLE_DRIVE_REFRESH_TOKEN || "";
  const googleDriveUrlPrefix = process.env.GOOGLE_DRIVE_URL_PREFIX || "";

  const googleDriveService = new GoogleDriveService(
    driveClientId,
    driveClientSecret,
    driveRedirectUri,
    driveRefreshToken
  );

  return googleDriveUrlPrefix + (await googleDriveService.uploadFile(file));
}

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = path.join(
      __dirname,
      process.env.PRODUCTION === "true" ? "temp" : "../temp"
    );
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    cb(null, uploadFolder);
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};

export const imageUpload = multer({
  storage: diskStorage,
  fileFilter: fileFilter,
});
