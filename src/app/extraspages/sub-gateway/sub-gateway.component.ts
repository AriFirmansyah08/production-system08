import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventInput } from '@fullcalendar/core';
import { EventService } from 'src/app/core/services/event.service';
import { LAYOUT_VERTICAL } from 'src/app/layouts/layout.model';


@Component({
  selector: 'app-sub-gateway',
  templateUrl: './sub-gateway.component.html',
  styleUrls: ['./sub-gateway.component.scss']
})
export class SubGatewayComponent implements OnInit {
  // eventsToday: any[] = [];
  // categories = category;
  // events: EventInput[] = calendarEvents;

  @Output() settingsButtonClicked = new EventEmitter();
  offcanvasService: any;
  menuItems: any;
  eventNotification: any;
  layout: any;
  attribute: any;

  constructor(private router: Router, private eventService: EventService) { }
  onMaintClick(){

    sessionStorage.setItem("subCategory", "maintenance");
    this.router.navigate(['dashboard-maint']);
  }

  onProdClick(){
    sessionStorage.setItem("subCategory", "production");
    this.router.navigate(['dashboard-prod']);
  }

  onHCDClick(){
    sessionStorage.setItem("subCategory", "hcd")
    this.router.navigate(['/dashboard']);
  }

  onYKKClick(){
    sessionStorage.setItem("subCategory", "ykk")
    this.router.navigate(['/dashboard']);
  }

  onRemove(){
    sessionStorage.removeItem('category')
    sessionStorage.removeItem('subCategory')
  }

  ngOnInit(): void {
    this.layout = LAYOUT_VERTICAL;
    this.attribute = '';

    this.showEventsToday();

    // // Langganan notifikasi
    // this.notificationService.eventNotification$.subscribe(message => {
    //   this.eventNotification = message;
    // });
  }

  showEventsToday(): void {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // this.eventsToday = calendarEvents.filter(event => {
    //   if (event.date instanceof Date) {
    //     const eventDate = event.date.getDate();
    //     const eventMonth = event.date.getMonth();
    //     const eventYear = event.date.getFullYear();

    //     return eventDate === todayDate && eventMonth === todayMonth && eventYear === todayYear;
    //   }
    //   return false;
    // });
  }

  ngAfterViewInit() { }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.attribute = layout;
    if (layout == 'vertical') {
      this.eventService.broadcast('changeLayout', 'vertical');
    } else {
      this.eventService.broadcast('changeLayout', layout);
    }
    document.documentElement.setAttribute('data-layout', layout);
    document.body.setAttribute('layout', layout);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 1000);
  }

  back(){
    this.router.navigate(['/pages/gateway']);
  }

}

