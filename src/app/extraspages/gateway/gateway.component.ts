import { Component, OnInit } from '@angular/core';
// import { category } from 'src/app/pages/apps/calendar/data';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { LAYOUT_HORIZONTAL } from 'src/app/layouts/layout.model';



@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent{


  // [x: string]: any;

  userData: any;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.userData = this.tokenStorageService.getUser();
  }
  
  onCANClick(){
      sessionStorage.setItem("category", "can")
  }

  onPETClick(){
      sessionStorage.setItem("category", "pet")
  }

  onAppClick(app: any) {
      // Set the value based on app.category
      if (app.category === 'can') {
        sessionStorage.setItem("category", "can");
      } else if (app.category === 'can') {
        sessionStorage.setItem("category", "pet");
      }
      // console.log (category)
  }

  // logout() {
  //   this.AuthenticationService.logout();
  //   this.router.navigate(['/auth/login']);
  // }

}
