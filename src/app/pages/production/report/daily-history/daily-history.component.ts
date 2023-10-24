import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { dataattribute, existingList, FuzzyList, paginationlist } from 'src/app/core/helpers/data-daily';
import { DecimalPipe } from '@angular/common';
import { DailyReportService } from 'src/app/core/services/daily-report.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-daily-history',
  templateUrl: './daily-history.component.html',
  styleUrls: ['./daily-history.component.scss'],
  providers: [DailyReportService, DecimalPipe]
})

export class DailyHistoryComponent {
  searchTerm: string = ''; 
  breadCrumbItems!: Array<{}>;
  totalRecords: any; 
  page: number = 1;
  pageSize : number = 5;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  abnormalData: any;
  DataById: any;
  totalPages: number = 0;
  filteredHistoryData: any[] = [];

  historyData:any;
  id: number | undefined;
  
  constructor( 
    public service: DailyReportService, 
    public apiservice:ApiService,
    private router: Router,
    private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.getAllHistory()
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Report', link: '/production/report'},
      { label: 'Daily', link: '/production/report/daily'},
      { label: 'History', active: true }
    ];

    this.route.params.subscribe(params => {
      // Periksa apakah parameter 'id' ada
      if ('id' in params) {
        this.id = params['id'];
        console.log('Id Yang Di tangkap', this.id);
      }
    });
  }

  getByIdHistory(id: any) {
    console.log('Id Yang Di tangkap', id);
    this.apiservice.getByIdHistory(id).subscribe({
      next: (res: any) => {
        this.DataById = res.data
        console.log(this.DataById)
        this.router.navigate(['production/report/daily/history/', id]);
      },
      error: (err: any) => {
        console.error(err);
        setTimeout(() => {
        }, 1000);
      },
    });
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredHistoryData = this.historyData;
    } else {
      this.filteredHistoryData = this.historyData.filter((data: { id_history: number; date: Date; lot_number: Date; status: string }) => {
        const searchString = this.searchTerm.toLowerCase();
        const idMatch = data.id_history.toString().includes(searchString);
        const dateMatch = data.date && data.date.toString().includes(searchString);
        const lotNumberMatch = data.lot_number && data.lot_number.toString().includes(searchString);
        const status = data.lot_number ? "closed" : "panding";
        const statusMatch = status.toLowerCase().includes(searchString);
  
        return idMatch || dateMatch || lotNumberMatch || statusMatch;
      });
    }
  }

  getAllHistory() {
    this.apiservice.getAllHistory().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.historyData = res.data;
          this.filteredHistoryData = this.historyData;
          this.totalRecords = this.filteredHistoryData.length; // Total jumlah data Anda
          this.setPaginationData();
        } else {
          console.error(`${res.data.message}`);
          setTimeout(() => {

          }, 1000);
        }
      },
      error: (err: any) => {
        console.error(err);
        setTimeout(() => {
        }, 1000);
      },
    });
  }  
  
  getShowingText(): string {
    const startIndex = (this.page - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.page * this.pageSize, this.totalRecords);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  // onPageSizeChange() {
  //   this.startIndex = 1; 
  //   this.endIndex = this.pageSize;
  // }
  onPageSizeChange() {
    this.page = 1; // Kembali ke halaman pertama
    this.setPaginationData();
  }
  
  setPaginationData() {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }
}



