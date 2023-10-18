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
  imageUrl = `${environment.API_URL}${environment.getImage}`;

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
        this.data.img_problem = this.data.img_problem.split(',');
        this.data.img_cause = this.data.img_cause.split(',');
        this.data.img_capa_currection = this.data.img_capa_currection.split(',');
        this.data.img_capa_currective = this.data.img_capa_currective.split(',');
      }, error => {
        console.error('Error:', error);
      });
    });
  }
}

