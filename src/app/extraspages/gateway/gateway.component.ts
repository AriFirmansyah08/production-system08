import { Component, OnInit } from '@angular/core';
// import { category } from 'src/app/pages/apps/calendar/data';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './toast-service'; 



@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.scss']
})
export class GatewayComponent{


  // [x: string]: any;

  userData: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    public toastService: ToastService,) {}

  // ngOnInit(): void {
  //   this.userData = this.tokenStorageService.getUser();
  // }
  ngOnInit(): void {
    this.userData = this.tokenStorageService.getUser();
    const category = sessionStorage.getItem('category');
    if (!category) {
      this.toastService.show('Session Anda Kosong', { classname: 'bg-primary text-center text-white', delay: 10000 });
    }
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
  }
  

}
