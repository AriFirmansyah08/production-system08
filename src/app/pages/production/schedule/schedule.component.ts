import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// Calendar option
import { CalendarOptions, EventClickArg, EventApi,} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
// BootStrap
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
// Sweet Alert
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/core/services/api.service';
import { Const } from 'src/app/core/services/static/const';
import { CommonService } from 'src/app/core/services/common.service';

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
  submitted = false;
  scheduleData: any;
  isConnected: boolean | undefined;
  id: any

  eventData: any[] = []
  taskData: any
  loading: boolean = false
  newEventDate: any = { startStr: '' }; // Inisialisasi dengan nilai yang sesuai

  category = [
  {
      name: 'Major',
      value: '#F20B0B',
      className:'bg-soft-success'
  },
  {
      name: 'Very High',
      value: '#ff7c2a',
      className:''
  },
  {
      name: 'High',
      value: '#8af42e',
      className:''
  },
  {
      name: 'Medium',
      value: '#6ff6ee',
      className:''
  },
  {
      name: 'Low',
      value: '#fffe02',
      className:''
  },
  {
      name: 'Very Low',
      value: '#9edceb',
      className:''
  }
  ]

    // Schedule click Event
    formDataSchedule!: UntypedFormGroup;
    @ViewChild('editmodalShow') editmodal!: TemplateRef<any>;
    @ViewChild('modalShow') openmodal !: TemplateRef<any>;
    editEventId!: string;
    DataById!: any;

  constructor(
    private modalService: NgbModal, 
    private formBuilder: UntypedFormBuilder,
    public apiService: ApiService,
    public common: CommonService) {}

    async ngOnInit() {
      this.breadCrumbItems = [
        { label: "Planner" },
        { label: "Tasks", active: true },
      ];
      await this.getAllSchedule().finally(() => this.loading = false);

    // Validation
    this.formDataSchedule = this.formBuilder.group({
      event_name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required]
    });

    this.formEditData = this.formBuilder.group({
      editTitle: [null], // Nilai default untuk semua bidang
      editCategory: [null],
      editLocation: [null],
      editDescription: [null],
      editStartDate: [null],
      editEndDate: [null],
      editStart: [null],
      editEnd: [null],
    });
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
  openModal(event?: any) {
    this.newEventDate = event;
    this.modalService.open(this.openmodal, { centered: true });
  }

  closeEventModal() {
    this.formDataSchedule = this.formBuilder.group({
      event_name: '',
      category: '',
      location: '',
      description: '',
      start_date: '',
      start_time: '',
      end_time: ''
    });
    this.modalService.dismissAll();
  }

  get form() {
    return this.formDataSchedule.controls;
  }

  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
  saveData() {
    if (this.formDataSchedule.valid) {
        const className = this.formDataSchedule.get('category')!.value;
        const event_name = this.formDataSchedule.get('event_name')!.value;
        const location = this.formDataSchedule.get('location')!.value;
        const description = this.formDataSchedule.get('description')!.value;
        const start_date = this.formDataSchedule.get('start_date')!.value;
        const end_date = this.formDataSchedule.get('end_date')!.value;
        const start_time = this.formDataSchedule.get('start_time')!.value;
        const end_time = this.formDataSchedule.get('end_time')!.value;
        const start = new Date(`${start_date}T${start_time}`);
        const end = new Date(`${end_date}T${end_time}`);
        if (end <= start) {
            alert('Tanggal selesai harus lebih besar dari tanggal mulai.');
        } else {
            const calendarApi = this.scheduleData.view.calendar;
            calendarApi.addEvent({
                title: event_name,
                start: start,
                end: end,
                location: location,
                description: description,
                className: className + ' bold-text'
            });

            this.position();
            this.formDataSchedule.reset(); // Reset form setelah disubmit
            this.modalService.dismissAll();
        }
    }
    this.submitted = true;
}


// onSubmit() {
//   if (this.formDataSchedule.valid) {
//     const formData = { ...this.formDataSchedule.value };
//     if (!formData.start_date.to) {
//       formData.start_date.to = null;
//     }
//     console.log('data tersimpan', formData);
//     const eventStartDate = new Date(formData.start_date.from);
//     const eventEndDate = formData.start_date.to ? new Date(formData.start_date.to) : null;
//     eventStartDate.setDate(eventStartDate.getDate() + 1);
//     if (eventEndDate) {
//       eventEndDate.setDate(eventEndDate.getDate() + 1);
//     }
//     formData.start_date = eventStartDate;
//     formData.end_date = eventEndDate;
//     this.apiService.insertschedule(formData).subscribe({
//       next: (res: any) => {
//         if (res.status) {
//           this.modalService.dismissAll();
//           window.location.reload();
//         }
//       },
//       error: (err: any) => console.error(err)
//     });
//   }
// }

onSubmit() {
  if (this.formDataSchedule.valid) {
    const formData = { ...this.formDataSchedule.value };
    if (!formData.start_date.to) {
      formData.start_date.to = formData.start_date.from; // Set nilai to ke from jika tidak ada
    }
    console.log('data tersimpan', formData);
    const eventStartDate = new Date(formData.start_date.from);
    const eventEndDate = new Date(formData.start_date.to);
    eventStartDate.setDate(eventStartDate.getDate() + 1);
    eventEndDate.setDate(eventEndDate.getDate() + 1);
    formData.start_date = eventStartDate;
    formData.end_date = eventEndDate;
    this.apiService.insertschedule(formData).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.modalService.dismissAll();
          window.location.reload();
        }
      },
      error: (err: any) => console.error(err)
    });
  }
}

// async getAllSchedule() {
//   return new Promise((resolve, reject) => {
//     this.apiService.getAllschedule().subscribe({
//       next: (res: any) => {
//         const data: any[] = res.data;
//         const itemData: any[] = [];
//         console.log('data item', itemData);
//         for (let item of data) {
//           if (!itemData.includes(item.id_schedule)) {
//             itemData.push(item.id_schedule);
//           }
//         }
//         if (itemData.length > 0) {
//           data.forEach((schedule: any) => {
//             const selectedCategory = this.category.find(cat => cat.name === schedule.category);
//             if (selectedCategory) {
//                 const serverStartDate = new Date(schedule.start_date);
//                 const serverEndDate = new Date(schedule.end_date);
//                 // Mengonversi zona waktu ke "Asia/Jakarta"
//                 serverStartDate.setHours(serverStartDate.getHours() + 7);
//                 serverEndDate.setHours(serverEndDate.getHours() + 7);
//                 this.eventData.push({
//                     id: schedule.id_schedule,
//                     start: serverStartDate,
//                     end: serverEndDate,
//                     title: `${schedule.event_name}`,
//                     allDay: false,
//                     backgroundColor: selectedCategory.value,
//                     allData: {
//                         category: schedule.category,
//                         description: schedule.description,
//                         end_date: serverEndDate.toISOString(),
//                         end_time: schedule.end_time,
//                         event_name: schedule.event_name,
//                         id_schedule: schedule.id_schedule,
//                         location: schedule.location,
//                         start_date: serverStartDate.toISOString(),
//                         start_time: schedule.start_time,
//                     }
//                 });
//             }
//         });
//         }
//       },
//       error: (err: string | undefined) => {
//         reject(err);
//         this.common.showServerErrorAlert(Const.ERR_GET_MSG("schedule"), err);
//       },
//       complete: () => {
//         console.log('All Data');
//         this.calendarOptions.events = this.eventData;
//         console.log('data masuk id', this.calendarOptions.events);
//         resolve(true);
//       }
//     });
//   });
// }

getAllSchedule() {
  return new Promise((resolve, reject) => {
    this.apiService.getAllschedule().subscribe({
      next: (res: any) => {
        const data: any[] = res.data;
        const itemData: any[] = [];
        console.log('data item', itemData);
        for (let item of data) {
          if (!itemData.includes(item.id_schedule)) {
            itemData.push(item.id_schedule);
          }
        }
        if (itemData.length > 0) {
          data.forEach((schedule: any) => {
            const selectedCategory = this.category.find(cat => cat.name === schedule.category);
            if (selectedCategory) {
              const serverStartDate = new Date(schedule.start_date);
              const serverEndDate = new Date(schedule.end_date);
              // Mengonversi zona waktu ke "Asia/Jakarta"
              serverStartDate.setHours(serverStartDate.getHours() + 7);
              serverEndDate.setHours(serverEndDate.getHours() + 7);
              this.eventData.push({
                id: schedule.id_schedule,
                start: serverStartDate,
                end: serverEndDate,
                title: `${schedule.event_name}`,
                allDay: false,
                backgroundColor: selectedCategory.value,
                allData: {
                  category: schedule.category,
                  description: schedule.description,
                  end_date: serverEndDate.toISOString(),
                  end_time: schedule.end_time,
                  event_name: schedule.event_name,
                  id_schedule: schedule.id_schedule,
                  location: schedule.location,
                  start_date: serverStartDate.toISOString(),
                  start_time: schedule.start_time,
                },
                overlap: false, // Menonaktifkan tumpang tindih
              });
            }
          });
        }
      },
      error: (err: string | undefined) => {
        reject(err);
        this.common.showServerErrorAlert(Const.ERR_GET_MSG("schedule"), err);
      },
      complete: () => {
        console.log('All Data');
        this.calendarOptions.events = this.eventData;
        console.log('data masuk id', this.calendarOptions.events);
        resolve(true);
      }
    });
  });
}




handleEventClick(clickInfo: EventClickArg) {
  this.editEventId = clickInfo.event.id;
  this.editEvent = clickInfo.event;
  this.getByIdSchedule(this.editEventId);

}

getByIdSchedule(id: any) {
  console.log('Id', id);
  this.apiService.getByIdSchedule(id).subscribe({
    next: (res: any) => {
      this.DataById = res[0];
      const startDate = new Date(this.DataById.start_date);
      const endDate = new Date(this.DataById.end_date);
      console.log('Data ID ', this.DataById);
      const startDateWIB = new Date(this.DataById.start_date);
      startDateWIB.setHours(startDateWIB.getHours());
      const endDateWIB = new Date(this.DataById.end_date);
      endDateWIB.setHours(endDateWIB.getHours());
      const startTimeFormatted = this.DataById.start_time;
      const endTimeFormatted = this.DataById.end_time;
      this.formEditData.get('editTitle')?.setValue(this.DataById.event_name || '');
      this.formEditData.get('editCategory')?.setValue(this.DataById.category || '');
      this.formEditData.get('editLocation')?.setValue(this.DataById.location || '');
      this.formEditData.get('editDescription')?.setValue(this.DataById.description || '');

      this.formEditData.get('editStartDate')?.setValue(startDate);
      this.formEditData.get('editEndDate')?.setValue(endDate);
      this.formEditData.get('editStart')?.setValue(startTimeFormatted);
      this.formEditData.get('editEnd')?.setValue(endTimeFormatted);
      this.modalService.open(this.editmodal, { centered: true });
    },
    error: (err: any) => {
      console.error(err);
      setTimeout(() => {
      }, 1000);
    },
  });
}

editEventSave() {
  if (this.formEditData.valid) {
    const updatedData = this.formEditData.value;
    const updatedEventData = {
      event_name: updatedData.editTitle,
      category: updatedData.editCategory,
      location: updatedData.editLocation,
      description: updatedData.editDescription,
      start_date: new Date(updatedData.editStartDate), // Konversi ke objek Date
      end_date: updatedData.editEndDate ? new Date(updatedData.editEndDate) : null, // Konversi ke objek Date atau beri nilai null jika tidak ada
      start_time: updatedData.editStart,
      end_time: updatedData.editEnd,
    };
    // Handle zona waktu di sini sesuai kebutuhan
    // Misalnya, jika Anda ingin menghitung dengan zona waktu "Asia/Jakarta":
    updatedEventData.start_date.setHours(updatedEventData.start_date.getHours() - 7); // Kurangi 7 jam
    if (updatedEventData.end_date) {
      updatedEventData.end_date.setHours(updatedEventData.end_date.getHours() - 7);
    }

    if (updatedEventData.start_date) {
      updatedEventData.start_date.setDate(updatedEventData.start_date.getDate() + 1);
    }
    if (updatedEventData.end_date) {
      updatedEventData.end_date.setDate(updatedEventData.end_date.getDate() + 1);
    }
    this.apiService.updateschedule(this.DataById.id_schedule, updatedEventData).subscribe(
      (res) => {
        console.log('Event updated successfully', res);
        this.modalService.dismissAll();
          window.location.reload();
      },
      (error) => {
        console.error('Error updating event', error);
      }
    );
  }
}

  confirm(id: any) {
    console.log('id yang di klik', id);
    
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
        this.deleteEventData(id); // Menggunakan parameter 'id' yang telah Anda terima
      }
    });
  }

  deleteEventData(id: any) {
    this.apiService.deleteschedule(id).subscribe({
      next: (res: any) => {
        if (res.data === 1) {
          this.modalService.dismissAll();
          window.location.reload();
        }
      },
      error: (err: any) => console.error(err),
    });
  }

  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }
}


