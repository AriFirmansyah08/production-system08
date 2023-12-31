import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DropzoneEvent } from 'ngx-dropzone-wrapper/lib/dropzone.interfaces';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { Apps } from '../myapps.model';
import { MdbModalRef} from 'mdb-angular-ui-kit/modal';


@Component({
  selector: 'app-myapps-modal',
  templateUrl: './myapps-modal.component.html',
  styleUrls: ['./myapps-modal.component.scss']
})
export class MyappsModalComponent  {
  dropzoneConfig: DropzoneConfigInterface = {
    url: `${environment.API_URL}${environment.image}`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    maxFilesize: 5,
    acceptedFiles: 'image/*',
    maxFiles: 1,
  };
  dropzoneResponse: any;

  DEFAULT_ICON = 'app-icon-default.png';

  title: string | null = null;
  fileName: string = '';
  appData: Apps = {
    app_id: undefined,
    name: '',
    icon: '',
    description: '',
    url: '',
  };

  previousIcon: string = '';
  imageUrl = `${environment.API_URL}${environment.getImage}`;
  isNameEmpty: boolean = false;
  isDescEmpty: boolean = false;
  isUrlEmpty: boolean = false;
  urlError: string = '';
  isIconEmpty: boolean = false;

  isOnIconChange: boolean = false;
  isOnRemoveDialog: boolean = false;
  isOnLogoutDialog: boolean = false;

  constructor(
    public modalRef: MdbModalRef<MyappsModalComponent>,
    private apiService: ApiService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.title === 'Log Out') {
      this.isOnLogoutDialog = true;
    }
  }

  onEmptyIconChecked() {
    if (!this.isIconEmpty) {
      this.isIconEmpty = true;
      if (this.dropzoneResponse !== undefined) {
        this.deleteIcon(this.appData.icon);
      }
    } else this.isIconEmpty = false;
  }

  onChangeIconClick() {
    if (!this.isOnIconChange) {
      this.previousIcon = this.appData.icon as string;
      this.isOnIconChange = true;
    } else {
      if (this.dropzoneResponse !== undefined) {
        this.deleteIcon(this.appData.icon);
      }
      this.appData.icon = this.previousIcon;
      this.isOnIconChange = false;
    }
  }

  onNegativeButtonClick() {
    if (this.isOnLogoutDialog) {
      this.logOut();
    } else this.onRemoveAppClick();
  }

  onRemoveAppClick() {
    if (!this.isOnRemoveDialog) {
      this.isOnRemoveDialog = true;
    } else {
      if (this.appData.app_id !== undefined) {
        this.deleteApplication(this.appData.app_id);
      }
    }
  }

  onClose(): void {
    if (this.dropzoneResponse !== undefined) {
      this.deleteIcon(this.appData.icon);
    }
    this.modalRef.close();
  }

  onSave(): void {
    this.validateForm();
    if (
      !this.isNameEmpty &&
      !this.isDescEmpty &&
      !this.isUrlEmpty &&
      !this.urlError
    ) {
      if (this.appData.app_id !== undefined) {
        this.updateApplication(this.appData.app_id, this.appData);
      } else {
        if (this.isIconEmpty || this.appData.icon === '') {
          let appData = this.appData;
          delete appData['icon'];
          this.insertApplication(appData);
        } else this.insertApplication(this.appData);
      }
    }
  }

  onUploadIconSuccess(event: DropzoneEvent) {
    this.dropzoneResponse = event[1];
    if (this.dropzoneResponse !== undefined) {
      this.fileName = this.dropzoneResponse.filename;
      this.appData.icon = this.fileName;
    }
  }

  insertApplication(data: any) {
    this.apiService.insertApp(data).subscribe({
      next: (res: any) => {
        if (res.status) {
          let success = true;
          this.modalRef.close(success);
        }
      },
      error: (err: any) => console.error(err),
    });
  }

  updateApplication(id: number, data: any) {
    this.apiService.updateApp(id, data).subscribe({
      next: (res: any) => {
        if (res.status) {
          if (
            this.dropzoneResponse !== undefined &&
            this.previousIcon !== this.DEFAULT_ICON
          ) {
            this.deleteIcon(this.previousIcon);
          }
          let success = true;
          this.modalRef.close(success);
        }
      },
      error: (err: any) => console.error(err),
    });
  }

  deleteApplication(id: number) {
    this.apiService.deleteApp(id).subscribe({
      next: (res: any) => {
        if (res.data === 1) {
          let success = true;
          this.deleteIcon(this.appData.icon);
          this.modalRef.close(success);
        }
      },
      error: (err: any) => console.error(err),
    });
  }

  deleteIcon(icon: string | undefined) {
    if (icon !== this.DEFAULT_ICON || this.dropzoneResponse !== undefined) {
      this.apiService.deleteImage(icon as string).subscribe({
        next: (res: any) => {
          if (!res.error) {
            console.log(res.message);
          }
        },
        error: (err: any) => console.error(err),
      });
      this.isIconEmpty = true;
      this.dropzoneResponse = undefined;
    }
  }

  logOut() {
    this.modalRef.close();
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  validateForm() {
    this.isNameEmpty = this.appData.name.trim() === '';
    this.isDescEmpty = this.appData.description.trim() === '';
    this.isUrlEmpty = this.appData.url.trim() === '';
    if (!this.isUrlValid(this.appData.url)) {
      this.urlError = 'The URL is not valid.';
    } else {
      this.urlError = '';
      let validUrl = this.validUrl(this.appData.url);
      this.appData.url = validUrl;
    }
  }

  isUrlValid(url: string): boolean {
    const httpPattern = /^https?:\/\/.+/;
    const urlPattern = /^[a-z0-9\-]+(\.[a-z0-9\-]+)+$/i;

    if (httpPattern.test(url) || urlPattern.test(url)) {
      return true;
    } else return false;
  }

  validUrl(url: string): string {
    const httpPattern = /^https?:\/\/.+/;
    if (httpPattern.test(url)) {
      return url;
    } else {
      let validUrl = `http://${url}`;
      return validUrl;
    }
  }
}