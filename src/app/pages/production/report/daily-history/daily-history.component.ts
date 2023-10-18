import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { dataattribute, existingList, FuzzyList, paginationlist } from 'src/app/core/helpers/data-daily';
import { DecimalPipe } from '@angular/common';
import { DailyReportService } from 'src/app/core/services/daily-report.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DailyReportModel } from 'src/app/core/models/daily-reports';
import { NgDailySortableHeader} from '../daily-report/daily-report-sortable.directive'
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-daily-history',
  templateUrl: './daily-history.component.html',
  styleUrls: ['./daily-history.component.scss'],
  providers: [DailyReportService, DecimalPipe]
})

export class DailyHistoryComponent {
  searchTerm: string = '';
  filteredHistoryData: any[] = [];

  breadCrumbItems!: Array<{}>;

  submitted = false;
  masterSelected!: boolean;
  ListJsDatas: any;
  page: any = 1;
  pageSize: any = 3;
  startIndex: number = 0;
  endIndex: number = 3;
  totalRecords: number = 0;

  paginationDatas: any;
  attributedata: any;
  existingData: any;
  fuzzyData: any;

  existingTerm: any;
  fuzzyTerm: any;
  dataterm: any;
  term: any;
  selectedFilter: string = 'daily'; // Filter default: daily
  id: number | undefined;
  // Table data
  datatabel!: Observable<DailyReportModel[]>;
  total: Observable<number>;
  @ViewChildren(NgDailySortableHeader) headers!: QueryList<NgDailySortableHeader>;
  isConnected: boolean | undefined;
  historyData: any;
  DataById: any;
  constructor( 
    public service: DailyReportService, 
    public apiservice:ApiService,
    private router: Router,
    private route: ActivatedRoute,) {
    this.datatabel = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {
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

        // Selanjutnya, Anda dapat menggunakan this.id untuk mengambil data yang sesuai
        // dan melakukan operasi lain sesuai kebutuhan.
      }
    });

    this.datatabel.subscribe(x => {
      this.ListJsDatas = Object.assign([], x);
    });

    this.attributedata = dataattribute
    this.existingData = existingList
    this.fuzzyData = FuzzyList
    this.paginationDatas = paginationlist
    this.totalRecords = this.paginationDatas.length
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(this.startIndex - 1, this.endIndex);
    this.getAllHistory()
  }

  loadPage() {
    this.startIndex = (this.page - 1) * this.pageSize + 1;
    this.endIndex = (this.page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.paginationDatas = paginationlist.slice(this.startIndex - 1, this.endIndex);
  }

  /**
  * Open modal
  * @param content modal content
  /**
  * Sort table data
  * @param param0 sort the column
  *
  */

  // onSearch(): void {
  //   if (!this.searchTerm) {
  //     this.filteredHistoryData = this.historyData;
  //   } else {
  //     this.filteredHistoryData = this.historyData.filter((data: { id_history: number; date: Date; lot_number: Date; status: string }) => {
  //       const searchString = this.searchTerm.toLowerCase();
  //       const idMatch = data.id_history.toString().includes(searchString);
  //       const dateMatch = data.date && data.date.toString().includes(searchString);
  //       const lotNumberMatch = data.lot_number && data.lot_number.toString().includes(searchString);
  //       const status = data.lot_number ? "closed" : "panding";
  //       const statusMatch = status.toLowerCase().includes(searchString);
  
  //       return idMatch || dateMatch || lotNumberMatch || statusMatch;
  //     });
  //   }
  // }

  getAllHistory() {
    this.isConnected = true;
    this.apiservice.getAllHistory().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.historyData = res.data;
          this.filteredHistoryData = this.historyData; // Isi filteredHistoryData
          console.log(this.historyData);
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

  getByIdHistory(id: any) {
    console.log('Id Yang Di tangkap', id);
    this.apiservice.getByIdHistory(id).subscribe({
      
      next: (res: any) => {
        this.DataById = res.data
        console.log(this.DataById)
        // this.router.navigate(['daily/history/', id], { state: { data: this.DataById } })
        this.router.navigate(['production/report/daily/history/', id]);
      },
      error: (err: any) => {
        console.error(err);
        setTimeout(() => {
          this.isConnected = false;
        }, 1000);
      },
    });
  }  

  setFilter(filter: string) {
    this.selectedFilter = filter;
    // Reset pencarian
    this.searchTerm = '';
    this.onSearch();
  }

  onSearch(): void {
    if (!this.searchTerm) {
      this.filteredHistoryData = this.historyData.filter((data: any) => this.checkFilter(data));
    } else {
      this.filteredHistoryData = this.historyData.filter((data: { id_history: { toString: () => string | string[]; }; }) => {
        return (
          data.id_history.toString().includes(this.searchTerm) &&
          this.checkFilter(data)
        );
      });
    }
  }
  
  checkFilter(data: any): boolean {
    if (this.selectedFilter === 'daily') {
      return data.date && this.isDaily(data.date);
    } else if (this.selectedFilter === 'weekly') {
      return data.date && this.isWeekly(data.date);
    } else if (this.selectedFilter === 'monthly') {
      return data.date && this.isMonthly(data.date);
    }
    return true; // Return true if no filter is active
  }
  
  isDaily(date: Date): boolean {
    // Tambahkan logika untuk filter harian di sini
    return true;
  }
  
  isWeekly(date: Date): boolean {
    // Tambahkan logika untuk filter mingguan di sini
    return true;
  }
  
  isMonthly(date: Date): boolean {
    // Tambahkan logika untuk filter bulanan di sini
    return true;
  }
  
  

}



