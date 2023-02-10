export interface UploadFile extends File {
  imageSrc: string;
  id: string;
  uploading: boolean;
  uploaded: boolean;
}
