import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { dataattribute, existingList, FuzzyList, paginationlist } from 'src/app/core/helpers/data-daily';
import { NgDailySortableHeader, listSortEvent } from './daily-report-sortable.directive';
import { DailyReportService } from 'src/app/core/services/daily-report.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { DailyReportModel } from 'src/app/core/models/daily-reports';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss'],
  providers: [DailyReportService, DecimalPipe]
})

export class DailyReportComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  submitted = false;
  dailyReportForm!: UntypedFormGroup;
  editDailyReportForm!: UntypedFormGroup;
  ListJsData!: DailyReportModel[];
  checkedList: any;
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

  isConnected: boolean = false;
  userData: any;
  dailyData:any;
  dailyDataById:any;
  leadersData: any;

  hoursData = [
    { label:'0:00' },
    { label:'1:00' },
    { label:'2:00' },
    { label:'3:00' },
    { label:'4:00' },
    { label:'5:00' },
    { label:'6:00' },
    { label:'7:00' },
    { label:'8:00' },
    { label:'9:00' },
    { label:'10:00' },
    { label:'11:00' },
    { label:'12:00' },
    { label:'13:00' },
    { label:'14:00' },
    { label:'15:00' },
    { label:'16:00' },
    { label:'17:00' },
    { label:'18:00' },
    { label:'19:00' },
    { label:'20:00' },
    { label:'21:00' },
    { label:'22:00' },
    { label:'23:00' },
    { label:'24:00' },
  ]
  
  // Table data
  datatabel!: Observable<DailyReportModel[]>;
  total: Observable<number>;
  dataEdit: any;
  @ViewChildren(NgDailySortableHeader) headers!: QueryList<NgDailySortableHeader>;
  currentPage: number | undefined;

  constructor(
    private modalService: NgbModal, 
    public service: DailyReportService, 
    private formBuilder: UntypedFormBuilder, 
    private apiService: ApiService, 
    private AuthenticationService: AuthenticationService) {
    
    //service.
    this.datatabel = service.countries$;
    this.total = service.total$;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Report', link: '/production/report'},
      { label: 'Daily', active: true }
    ];
    this.userData = this.AuthenticationService.getUserData();

    this.dailyReportForm = this.formBuilder.group({
      shift_leaders: [null],
      production_hours: [null],
      result: [null]
    })

    this.editDailyReportForm = this.formBuilder.group({
      shift_leaders: [null],
      production_hours: [null],
      result: [null]
    })

    /**
    * fetches data
    */
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
    this.getAllDaily()
    this.getAllLeaders()
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  get form() {
    return this.dailyReportForm.controls;
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
  */

  editModal(content: any, data: any) {
    this.dataEdit = data
    this.modalService.open(content, { size: 'md', centered: true });
    this.editDailyReportForm.get('shift_leaders')?.setValue(data.shift_leaders)       
    this.editDailyReportForm.get('production_hours')?.setValue(data.production_hours)       
    this.editDailyReportForm.get('result')?.setValue(data.result) 
  }
  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({ column, direction }: listSortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.listsortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  getAllDaily() {
      this.isConnected = true;
      this.apiService.getAlldaily().subscribe({
        next: (res: any) => {
          if (res.status) {
            this.dailyData = res.data
            // console.log(this.dailyData);
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

    getByIdDaily(id:any) {
      this.isConnected = true;
      this.apiService.getByIdDaily(id).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.dailyDataById = res.data
            console.log(this.dailyDataById);
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

    getAllLeaders() {
      this.isConnected = true;
      this.apiService.getAllleaders().subscribe({
        next: (res: any) => {
          if (res.status) {
            this.leadersData = res.data
            // console.log(this.leadersData);
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
      this.apiService.insertdaily(this.dailyReportForm.value).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.modalService.dismissAll()
            this.ngOnInit()
          }         
        },
        error: (err: any) => console.error(err)
      });
    }

    onUpdate(){
      this.apiService.updatedaily(this.dataEdit.id_dailyReport, this.editDailyReportForm.value).subscribe({
        next: (res: any) => {
          if (res.status) {
            this.modalService.dismissAll()
            this.ngOnInit()
          } 
        },
        error: (err: any) => console.error(err),
      });
    }

    onReset(){
      this.apiService.resetdaily(this.dailyData).subscribe({
        next: (res: any) => {
          this.ngOnInit()
        },
        error: (err: any) => console.error(err)
      });
    }

    filter(): void {
      this.currentPage = 1;
      const filteredDailyData = this.dailyData.filter(
        (daily: any) =>
          daily.id_daily_report
            .toLowerCase()
            .includes(this.service.searchTerm.trim().toLowerCase()) ||
          daily.shift_leaders
            .toLowerCase()
            .includes(this.service.searchTerm.trim().toLowerCase()) ||
          daily.production_hours
            .toLowerCase()
            .includes(this.service.searchTerm.trim().toLowerCase()) ||
          daily.start
            .toLowerCase()
            .includes(this.service.searchTerm.trim().toLowerCase()) ||
          daily.finish
            .toLowerCase()
            .includes(this.service.searchTerm.trim().toLowerCase()) ||
          daily.result
            .toLowerCase()
            .includes(this.service.searchTerm.trim().toLowerCase())
      );
    }
}
