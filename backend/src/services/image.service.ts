import { GoogleDriveService } from "./google-drive.service";

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
