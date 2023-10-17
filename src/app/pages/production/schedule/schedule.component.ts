import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

// Calendar option
import { CalendarOptions, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

// BootStrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

// Sweet Alert
import Swal from 'sweetalert2';

// Calendar Services
import { restApiService } from "../../../core/services/rest-api.service";
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  // calendar
  calendarEvents!: any[];
  editEvent: any;
  formEditData!: UntypedFormGroup;
  newEventDate: any;
  submitted = false;
  scheduleData: any;
  isConnected: boolean | undefined;

  category=[
  {
      name: 'Major',
      value: 'bg-soft-danger',
      option: ""
  },
  {
      name: 'Very High',
      value: 'bg-soft-success',
      option: ""
  },
  {
      name: 'High',
      value: 'bg-soft-primary',
      option: ""
  },
  {
      name: 'Medium',
      value: 'bg-soft-info',
      option: ""
  },
  {
      name: 'Low',
      value: 'bg-soft-dark',
      option: ""
  },
  {
      name: 'Very Low',
      value: 'bg-soft-warning',
      option: ""
  }
  ]

  // Calendar click Event
  formData!: UntypedFormGroup;
  @ViewChild('editmodalShow') editmodalShow!: TemplateRef<any>;
  @ViewChild('modalShow') modalShow !: TemplateRef<any>;

    // Schedule click Event
    formDataSchedule!: UntypedFormGroup;
    @ViewChild('editmodalShow') editmodal!: TemplateRef<any>;
    @ViewChild('modalShow') openmodal !: TemplateRef<any>;


  constructor(
    private modalService: NgbModal, 
    private formBuilder: UntypedFormBuilder,
    private datePipe: DatePipe, 
    public apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllSchedule()
    this.breadCrumbItems = [
      { label: 'Production' },
      { label: 'Schedule', active: true }
    ];

    // Validation
    this.formDataSchedule = this.formBuilder.group({
      event_name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      event_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    });

    interface EventData {
      event_name: string;
      category: string;
      location: string;
      description: string;
      event_date: string;
      start_time: string;
      end_time: string;
    } 
    
  }

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'dayGridMonth,dayGridWeek,dayGridDay',
      center: 'title',
      right: 'prevYear,prev,next,nextYear'
    },

    initialView: "dayGridMonth",
    themeSystem: "bootstrap",
    initialEvents: this.calendarEvents,
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    dateClick: this.openModal.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];

  /**
   * Event add modal
   */
  openModal(event?: any) {
    this.newEventDate = event;
    this.modalService.open(this.modalShow, { centered: true });
  }

  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {
    this.editEvent = clickInfo.event;
    this.formEditData = this.formBuilder.group({
      editTitle: clickInfo.event.title,
      editCategory: clickInfo.event.classNames[0],
      editlocation: clickInfo.event.extendedProps['location'],
      editDescription: clickInfo.event.extendedProps['description'],
      editDate: clickInfo.event.start,
      editStart: clickInfo.event.start,
      editEnd: clickInfo.event.end,
    });
    this.modalService.open(this.editmodalShow, { centered: true });
  }

  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }


  /**
   * Close event modal
   */
  closeEventModal() {
    this.formDataSchedule = this.formBuilder.group({
      event_name: '',
      category: '',
      location: '',
      description: '',
      event_date: '',
      start_time: '',
      end_time: ''
    });
    this.modalService.dismissAll();
  }

  /***
   * Model Position Set
   */
  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /***
   * Model Edit Position Set
   */
  Editposition() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been Updated',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /**
   * Event Data Get
   */
  get form() {
    return this.formDataSchedule.controls;
  }

  saveEvent() {
    if (this.formData.valid) {
      const className = this.formData.get('category')!.value;
      const title = this.formData.get('title')!.value;
      const location = this.formData.get('location')!.value;
      const description = this.formData.get('description')!.value
      const date = this.formData.get('date')!.value
      const starttime = this.formData.get('start')!.value;
      const endtime = this.formData.get('end')!.value;
      const yy = new Date(date).getFullYear();
      const mm = new Date(date).getMonth() + 1;
      const dd = new Date(date).getDate();

      const end = new Date(mm + '-' + dd + '-' + yy);
      end.setHours((endtime.split(' ')[0]).split(':')[0]);
      end.setMinutes((endtime.split(' ')[0]).split(':')[1]);

      const start = new Date(mm + '-' + dd + '-' + yy);
      start.setHours((starttime.split(' ')[0]).split(':')[0]);
      start.setMinutes((starttime.split(' ')[0]).split(':')[1]);
      const calendarApi = this.newEventDate.view.calendar;

      calendarApi.addEvent({
        id: createEventId(),
        title,
        date,
        start,
        end,
        location,
        description,
        className: className + ' ' + 'text-white'
      });
      this.position();
      this.formData = this.formBuilder.group({
        title: '',
        category: '',
        location: '',
        description: '',
        date: '',
        start: '',
        end: ''
      });
      this.modalService.dismissAll();
    } else {
    }
    this.submitted = true;
  }


  saveData() {
    if (this.formData.valid) {
      const className = this.formDataSchedule.get('category')!.value;
      const event_name = this.formDataSchedule.get('event_name')!.value;
      const location = this.formDataSchedule.get('location')!.value;
      const description = this.formDataSchedule.get('description')!.value
      const event_date = this.formDataSchedule.get('event_date')!.value
      const start_time = this.formDataSchedule.get('start_time')!.value;
      const end_time = this.formDataSchedule.get('end_time')!.value;
      const yy = new Date(event_date).getFullYear();
      const mm = new Date(event_date).getMonth() + 1;
      const dd = new Date(event_date).getDate();

      const end = new Date(mm + '-' + dd + '-' + yy);
      end.setHours((end_time.split(' ')[0]).split(':')[0]);
      end.setMinutes((end_time.split(' ')[0]).split(':')[1]);

      const start = new Date(mm + '-' + dd + '-' + yy);
      start.setHours((start_time.split(' ')[0]).split(':')[0]);
      start.setMinutes((start_time.split(' ')[0]).split(':')[1]);

      const calendarApi = this.scheduleData.view.calendar;
      console.log(this.scheduleData);
      

      calendarApi.addEvent({
        event_name,
        event_date,
        start_time,
        end_time,
        location,
        description,
        className: className + ' ' + 'text-white'
      });
      this.position();
      this.formDataSchedule = this.formBuilder.group({
        event_name: '',
        category: '',
        location: '',
        description: '',
        event_date: '',
        start_time: '',
        end_time: ''
      });
      this.modalService.dismissAll();
    } else {
    }
    this.submitted = true;
  }

  editEventSave() {
    const editTitle = this.formEditData.get('editTitle')!.value;
    const editCategory = this.formEditData.get('editCategory')!.value;

    const editId = this.calendarEvents.findIndex(
      (x) => x.id + '' === this.editEvent.id + ''
    );

    this.editEvent.setProp('title', editTitle);
    this.editEvent.setProp('classNames', editCategory);

    this.calendarEvents[editId] = {
      ...this.editEvent,
      title: editTitle,
      id: this.editEvent.id,
      classNames: editCategory,
    };
    this.Editposition();
    this.formEditData = this.formBuilder.group({
      editTitle: '',
      editCategory: '',
    });
    this.modalService.dismissAll();
  }

  confirm() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.deleteEventData();
        Swal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    });
  }

  deleteEventData() {
    this.editEvent.remove();
    this.modalService.dismissAll();
  }

  getAllSchedule() {
    this.isConnected = true;
    this.apiService.getAllschedule().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.scheduleData = res.data;
          this.calendarOptions.initialEvents = this.scheduleData.map(
            (evt:any) => {
              return { date: evt.event_date, title: evt.event_name,className:"bg-soft-primary",location:evt.location,descriptiocalendarEventscalendarEventsn:evt.description }
            }) 
            console.log('option',this.calendarOptions);
            
        } else {
          console.error(`${res.data.message}`);
          setTimeout(() => {
            this.isConnected = false;
          }, 1000);
        }
      },
      error: (err: any) => {
        console.error(err);
        setTimeout(() => {
          this.isConnected = false;
        }, 1000);
      },
    });
  }

  onSubmit(){
    this.apiService.insertschedule(this.formDataSchedule.value).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.modalService.dismissAll()
          this.ngOnInit()
        }         
      },
      error: (err: any) => console.error(err)
    });
  }

}
function createEventId() {
  throw new Error('Function not implemented.');
}

