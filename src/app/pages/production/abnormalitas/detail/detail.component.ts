import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isConnected: boolean | undefined;
  imageUrl = `${environment.API_URL}${environment.getImageAbnormal}`;
  record_time: any;

  constructor(
    public apiservice: ApiService,
    private route: ActivatedRoute,
  ) {}

  id: number | undefined;
  data: any;

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Abnormal', link: '/production/abnormal'},
      { label: 'Eksports', active: true },
    ];

    this.route.params.subscribe(params => {
      console.log(params);
      const id = params['id'];
      this.apiservice.getByIdabnormal(id).subscribe((response: any) => {
        // Pastikan Anda memeriksa apakah 'id_abnormal' ada dalam respons
        console.log(response);
        this.data = response.data[0]
        this.data.section = this.data.section;
        this.data.img_problem = this.data.img_problem.split(',');
        this.data.img_cause = this.data.img_cause.split(',');
        this.data.img_capa_currection = this.data.img_capa_currection.split(',');
        this.data.img_capa_currective = this.data.img_capa_currective.split(',');
        this.calculateRecordTime();
      }, error => {
        console.error('Error:', error);
      });
    }); 
  }
  formatTime(time: string): string {
    // Memisahkan jam dan menit dari waktu
    const timeParts = time.split(':');
    const hours = timeParts[0];
    const minutes = timeParts[1];
  
    // Menggabungkan kembali dalam format yang diinginkan
    return `${hours}:${minutes}`;
  }

  calculateRecordTime() {
    const startTimeParts = this.data.start_time.split(':');
    const endTimeParts = this.data.end_time.split(':');

    const startHour = parseInt(startTimeParts[0], 10);
    const startMinute = parseInt(startTimeParts[1], 10);
    const endHour = parseInt(endTimeParts[0], 10);
    const endMinute = parseInt(endTimeParts[1], 10);

    const totalMinutesStart = startHour * 60 + startMinute;
    const totalMinutesEnd = endHour * 60 + endMinute;

    const differenceMinutes = totalMinutesEnd - totalMinutesStart;
    const hours = Math.floor(differenceMinutes / 60);
    const minutes = differenceMinutes % 60;

    this.record_time = `${hours} jam ${minutes} menit`;
  }
}

