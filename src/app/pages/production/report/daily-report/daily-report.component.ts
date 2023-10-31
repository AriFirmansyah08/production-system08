import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ApiService } from 'src/app/core/services/api.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-daily-report',
  templateUrl: './daily-report.component.html',
  styleUrls: ['./daily-report.component.scss'],
  providers: [DecimalPipe]
})

export class DailyReportComponent implements OnInit{
  breadCrumbItems!: Array<{}>;
  submitted = false;
  dailyReportForm!: UntypedFormGroup;
  editDailyReportForm!: UntypedFormGroup;
  ReportFormReset!: UntypedFormGroup;
  dataonReset: any
  isConnected: boolean = false;
  userData: any;
  dailyData:any;
  dailyDataById:any;
  leadersData: any;
  dataEdit: any[]=[];
  // hoursData = [
  //   { label:'0:00' },
  //   { label:'1:00' },
  //   { label:'2:00' },
  //   { label:'3:00' },
  //   { label:'4:00' },
  //   { label:'5:00' },
  //   { label:'6:00' },
  //   { label:'7:00' },
  //   { label:'8:00' },
  //   { label:'9:00' },
  //   { label:'10:00' },
  //   { label:'11:00' },
  //   { label:'12:00' },
  //   { label:'13:00' },
  //   { label:'14:00' },
  //   { label:'15:00' },
  //   { label:'16:00' },
  //   { label:'17:00' },
  //   { label:'18:00' },
  //   { label:'19:00' },
  //   { label:'20:00' },
  //   { label:'21:00' },
  //   { label:'22:00' },
  //   { label:'23:00' },
  //   { label:'24:00' },
  // ]
  
  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder, 
    private apiService: ApiService, 
    private AuthenticationService: AuthenticationService) {
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
    this.ReportFormReset = this.formBuilder.group({
      lot_number: [null]
    })
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
   * Open modal
   * @param contentLot modal content
   */
  ModalReset(contentLot: any) {
    this.submitted = false;
    this.modalService.open(contentLot, { size: 'md', centered: true });
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

  get form() {
    return this.dailyReportForm.controls;
  }

  onReset(){
    this.apiService.resetdaily(this.dailyData).subscribe({
      next: (res: any) => {
        this.ngOnInit(), console.log('daily data',this.dailyData);
        const id = res.data
        const data = {lot_number: this.dataonReset}
        this.apiService.updatereset(id, data).subscribe({
          next: (res:any) => {
            console.log(res)
            this.modalService.dismissAll()
          },
          error: (err) => {
            console.log('error',err);
          }
        })
        console.log('data terkirim',(this.dataonReset));
      }
      ,
      error: (err: any) => console.error(err)
    });
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

}
