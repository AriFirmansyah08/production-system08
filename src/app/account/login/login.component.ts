import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { UserData } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginData: UserData = {
    nik: null,
    password: '',
  };

  isNIKEmpty: boolean = false;
  isPasswordEmpty: boolean = false;
  year: number = new Date().getFullYear();
  isLoginFailed: boolean = false;
  isRemembered: boolean = false;

  constructor(private AuthenticationService : AuthenticationService, private router: Router) {}

  login() {
    console.log('login clicked')
    this.isLoginFailed = false;
    this.validateForm();
    if (!this.isNIKEmpty && !this.isPasswordEmpty) {
      this.AuthenticationService
        .login(this.loginData.nik, this.loginData.password)
        .subscribe({
          next: (res: any) => {
            if (!res.error) {
              if (!this.isRemembered) {
                this.AuthenticationService.setToken(res.token);
                this.AuthenticationService.setUserData(res.userData);
              } else {
                this.AuthenticationService.setAuthData(
                  res.token,
                  res.refreshToken,
                  res.userData
                );
              }
              this.router.navigate(['/pages/gateway']);
              console.log(
                'Refresh token:' + this.AuthenticationService.getRefreshToken()
              );
            } else {
              console.error(`Failed to login. Error: ${res.message}`);
              this.isLoginFailed = true;
            }
          },
          error: (err: any) => {
            console.error(err);
            this.isLoginFailed = true;
          },
        });
    }
  }

  onRememberMeChecked() {
    if (!this.isRemembered) {
      this.isRemembered = true;
      console.log('Remembered');
    } else {
      this.isRemembered = false;
      console.log('NotRemembered');
    }
  }

  validateForm() {
    this.isNIKEmpty = this.loginData.nik === null;
    this.isPasswordEmpty = this.loginData.password.trim() === '';
  }
}
