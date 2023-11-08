import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { Const } from 'src/app/core/services/static/const';
import { FullCalendarComponent } from "@fullcalendar/angular";

@Component({
  selector: 'app-montly-report',
  templateUrl: './montly-report.component.html',
  styleUrls: ['./montly-report.component.scss']
})
export class MontlyReportComponent {
  breadCrumbItems!: Array<{}>;
  eventData: any[] = []
  taskData: any
  loading: boolean = false


  calendarOptions: CalendarOptions = {
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'dayGridMonth,dayGridWeek,dayGridDay',
      center: 'title',
      right: 'today,prevYear,prev,next,nextYear'
    },
    initialView: "dayGridMonth",
    events: [],
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  };

  @ViewChild("detailTask") detailModal!: TemplateRef<any>;
  @ViewChild("calendar") calendarComponent!: FullCalendarComponent

  constructor(
    private apiService: ApiService,
    public common: CommonService
  ) {}

  async ngOnInit() {
    this.breadCrumbItems = [
      { label: "Planner" },
      { label: "Tasks", active: true },
    ];
    await this.getTaskData().finally(() => this.loading = false)
  }


  async getTaskData() {
    return new Promise((resolve, reject) => {
      this.loading = true
      this.apiService.getAllschedule().subscribe({
        
        next: (res: any) => {
          let data: any[] = res.data
          let itemData: any[] = []
          console.log('data', itemData);
          for (let item of data) {
            if (!itemData.includes(item.id_schedule)) {
              itemData.push(item.id_schedule)
            }
          }
          if (itemData.length > 0) {
            data.forEach((task) => {
              this.eventData.push({
                id: task.id_schedule,
                date: task.event_date,
                title: `${task.event_name}`,
                allDay: true,
                backgroundColor: this.common.getTaskAreaColor(task.id_schedule, itemData),
                allData: task,
              })
            })
            console.log('terkirim', this.eventData);
            
          }
        },
        error: (err: string | undefined) => {
          reject(err)
          this.common.showServerErrorAlert(Const.ERR_GET_MSG("Task"), err)
        },
        complete: () => {
          this.calendarOptions.events = this.eventData
          console.log(this.calendarOptions.events);
          resolve(true)
        }
      })
    })
  }

}
