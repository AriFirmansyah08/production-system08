import { Component, OnInit } from '@angular/core';
import { LAYOUT_HORIZONTAL } from './layout-category.model';
import { EventService} from '../core/services/event.service';

@Component({
  selector: 'app-layout-category',
  templateUrl: './layout-category.component.html',
  styleUrls: ['./layout-category.component.scss']
})
export class LayoutCategoryComponent implements OnInit {

  layoutType!: string;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.layoutType = LAYOUT_HORIZONTAL;

    document.body.setAttribute('layout',this.layoutType)

     // listen to event and change the layout, theme, etc
    this.eventService.subscribe('changeLayout', (layout) => {
      this.layoutType = layout;
    });
    
  }

  /**
   * Check if the horizontal layout is requested
   */
   isHorizontalLayoutRequested() {
    return this.layoutType === LAYOUT_HORIZONTAL;
  }
}
