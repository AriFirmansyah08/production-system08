import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';



@Component({
  selector: 'app-wekly-report',
  templateUrl: './wekly-report.component.html',
  styleUrls: ['./wekly-report.component.scss']
})
export class WeklyReportComponent implements OnInit{
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
  serverTime: any;

  //contructor
  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder, 
    private apiService: ApiService,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Report', link: '/production/report'},
      { label: 'Daily', active: true }
    ];

    this.getCurrentTimeFromServer();

    // this.userData = this.AuthenticationService.getUserData();
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

  getCurrentTimeFromServer() {
    this.http.get('http://localhost:8880/api/time').subscribe((data: any) => {
      this.serverTime = data.currentTime;
    });
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

  Default = [
    { name: 'Choice 1' },
    { name: 'Choice 2' },
    { name: 'Choice 3' },
  ];

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

     /**
   * Default Select2
   */
  selectedAccount = 'This is a placeholder';

  /**
   * Option groups Select2
   */
   selectedGroup = 'Choose a city';
   Groups = [
     { name: 'Montreal', country: 'CA', child: { state: 'Active' } },
     { name: 'Toronto', country: 'CA', child: { state: 'Active' } },
     { name: 'Vancouver', country: 'CA', child: { state: 'Active' } },
     { name: 'Lyon', country: 'FR', child: { state: 'Active' } },
     { name: 'Marseille', country: 'FR', child: { state: 'Active' } },
     { name: 'Paris', country: 'FR', child: { state: 'Active' } },
     { name: 'Barcelona', country: 'SP', child: { state: 'Active' } },
     { name: 'Madrid', country: 'SP', child: { state: 'Active' } },
     { name: 'Liverpool', country: 'UK', child: { state: 'Active' } },
     { name: 'London', country: 'UK', child: { state: 'Active' } },
     { name: 'Manchester', country: 'UK', child: { state: 'Active' } },
     { name: 'Michigan', country: 'US', child: { state: 'Active' } },
     { name: 'New York', country: 'US', child: { state: 'Active' } },
     { name: 'Washington', country: 'US', child: { state: 'Inactive' } }
   ];

   /**
  * Option Disabled groups Select2
  */
    selectedOption = 'Label Six';
    Options = [
      { name: 'Label Five' },
      { name: 'Label Four', 'disabled': true },
      { name: 'Label One' },
      { name: 'Label Six' },
      { name: 'Label Three' },
      { name: 'Label Two', 'disabled': true },
      { name: 'Zero' }];
  /**
   * Multiple Default Select2
   */
  multiDefaultOption = 'Adam';

  /**
* Multiple Default Select2
*/
selectValue = ['Alaska', 'Hawaii', 'California', 'Nevada', 'Oregon', 'Washington', 'Arizona', 'Colorado', 'Idaho', 'Montana', 'Nebraska', 'New Mexico', 'North Dakota', 'Utah', 'Wyoming', 'Alabama', 'Arkansas', 'Illinois', 'Iowa'];


}


