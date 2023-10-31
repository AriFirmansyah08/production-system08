import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent {
  searchTerm: string = ''; 
  breadCrumbItems!: Array<{}>;
  totalRecords: any; 
  page: number = 1;
  pageSize : number = 5;
  startIndex: number = 1;
  endIndex: number = this.pageSize;

  //fungsi data yang real/ dan di tambahkan
  isConnected = false;
  abnormalData: any;
  DataById: any;
  id:any;
  filteredAbnormalData: any[] = [];
  totalPages: number = 0;

  constructor(public apiservice:ApiService,
    private router: Router,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getAllAbnormal()
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Abnormal', active: true},
    ];

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.apiservice.getByIdabnormal(id).subscribe((res: any) => {
        });
      }
    });
  }

  getShowingText(): string {
    const startIndex = (this.page - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.page * this.pageSize, this.totalRecords);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  onPageSizeChange() {
    this.startIndex = 1; // Reset startIndex
    this.endIndex = this.pageSize; // Update endIndex
  }
  setPaginationData() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

    getAllAbnormal() {
    this.isConnected = true;
    this.apiservice.getAllabnormal().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.abnormalData = res.data
          this.filteredAbnormalData = this.abnormalData;
          this.totalRecords = this.filteredAbnormalData.length; // Total jumlah data Anda
          this.setPaginationData();
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

  getByIdAbnormal(id: any) {
    console.log('Id Yang Di tangkap', id);
    this.apiservice.getByIdabnormal(id).subscribe({
      next: (res: any) => {
        this.DataById = res;
        console.log(this.DataById)
        this.router.navigate(['abnormal/detail', id], { state: { data: this.DataById } });
      },
      error: (err: any) => {
        console.error(err);
        setTimeout(() => {
        }, 1000);
      }
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredAbnormalData = this.abnormalData;
      console.log('data', this.abnormalData);
      console.log('filter', this.filteredAbnormalData);
    } else {
      this.filteredAbnormalData = this.abnormalData.filter((data: { id_abnormal: string, date: string, problem: string, cause: string, capa_currection: string, capa_currective: string, section: string }) => {
        return (
          data.id_abnormal.toString().includes(this.searchTerm) ||
          data.section.toString().includes(this.searchTerm) ||
          data.date.toString().includes(this.searchTerm) ||
          data.problem.toString().includes(this.searchTerm) ||
          data.cause.toString().includes(this.searchTerm) ||
          data.capa_currection.toString().includes(this.searchTerm) ||
          data.capa_currective.toString().includes(this.searchTerm)
        );
      });
    }
  }
}

