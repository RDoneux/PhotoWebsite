import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { v4 as uuid } from 'uuid';
import { UploadFile } from './file-upload.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  filesUploaded: UploadFile[] = [];
  dropZoneMessage: string = '';
  uploadString: string = 'Upload';
  success: boolean = false;
  uploading: boolean = false;

  dropZoneDefaultMessage: string =
    'Drag your files here, or click here to upload';

  constructor(
    private httpClient: HttpClient,
    private authorisationService: AuthorisationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dropZoneMessage = this.dropZoneDefaultMessage;
  }

  addFileForUpload(event: any) {
    const files = event.target.files || event.dataTransfer.files;
    Object.keys(files).forEach(async (key: any) => {
      files[key]['imageSrc'] = await this.imageFileToBase64(files[key]);
      files[key]['id'] = uuid();
      this.filesUploaded.push(files[key]);
      this.uploadString = `Upload ${this.filesUploaded.length} image${
        this.filesUploaded.length > 1 ? 's' : ''
      }`;
    });
  }

  async uploadFiles() {
    const authToken = await this.authorisationService.getBearerToken();
    this.uploading = true;
    this.dropZoneMessage = 'Uploading...';
    this.filesUploaded.forEach((file: UploadFile, index: number) => {
      file.uploading = true;

      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      this.httpClient
        .post('api/images', formData, {
          headers: new HttpHeaders({
            Authorization: authToken,
          }),
        })
        .subscribe({
          next: () => {
            file.uploading = false;
            file.uploaded = true;

            if (index === this.filesUploaded.length - 1) {
              this.success = true;
              this.dropZoneMessage = this.setSuccessMessage(false);
            }
          },
          error: () => {
            this.dropZoneMessage = this.setSuccessMessage(true);
          },
        });
    });
  }

  async imageFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        resolve(reader.result);
      };
    });
  }

  reset() {
    this.dropZoneMessage = this.dropZoneDefaultMessage;
    this.success = false;
    this.filesUploaded = [];
    this.uploading = false;
  }

  navigateToAdminMenu() {
    this.router.navigate(['/admin-dashboard']);
  }

  setSuccessMessage(hasError: boolean): string {
    return hasError
      ? 'There was an issue with one or more uploads. Please try again later'
      : `${this.filesUploaded.length ? this.filesUploaded.length : '0'} file${
          this.filesUploaded.length != 1 ? 's' : ''
        } successfully uploaded.`;
  }

  removeToken(event: string) {
    this.filesUploaded = this.filesUploaded.filter((file) => {
      return file.id !== event;
    });
  }
}
