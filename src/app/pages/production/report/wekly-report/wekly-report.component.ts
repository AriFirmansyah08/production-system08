
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
// this.getCurrentTimeFromServer();--> untuk meilhat waktu server

// getCurrentTimeFromServer() {
//   this.http.get('http://localhost:8880/api/time').subscribe((data: any) => {
//     this.serverTime = data.currentTime;
//   });
// }


@Component({
  selector: 'app-wekly-report',
  templateUrl: './wekly-report.component.html',
  styleUrls: ['./wekly-report.component.scss']
})
export class WeklyReportComponent implements OnInit{
  breadCrumbItems!: Array<{}>;
  submitted = false;
  
  weeklyadd!: UntypedFormGroup;
  formeditweekly!: UntypedFormGroup;

  userData: any;
  dataWeekly: any;
  weeklyId: any;

  totalRecords: any; 
  page: number = 1;
  pageSize : number = 5;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  totalPages: number = 0;
  searchTerm: string = '';
  filterdata: any[] = [];

  //roll akses
  isAdmin: boolean = false;
  isKaryawan: boolean = false;
  isStaff: boolean = false;
  

  //contructor
  constructor(
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder, 
    private apiService: ApiService,
    private AuthenticationService: AuthenticationService,) {
  }


  ngOnInit(): void {
    this.getDataBasedOnRole()
    this.userData = this.AuthenticationService.getUserData();
    this.isAdmin = this.AuthenticationService.isAdmin();
    this.isKaryawan = this.AuthenticationService.isKaryawan();
    this.isStaff = this.AuthenticationService.isStaff();
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Report', link: '/production/report'},
      { label: 'Daily', active: true }
    ];

        // Validation
        this.weeklyadd = this.formBuilder.group({
          pic:[null],
          task: [null],
          due_start: [null],
          remark: [null],
          next_plan: [null],
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

    onSubmit() {
      if (this.weeklyadd.valid) {
        const formData = { ...this.weeklyadd.value };
        if (!formData.due_start.to) {
          formData.due_start.to ;
        }
        console.log('data tersimpan', formData);
        const StartDate = new Date(formData.due_start.from);
        const EndDate = new Date(formData.due_start.to);
        formData.due_start = StartDate;
        formData.due_end = EndDate;
        this.apiService.insertWeekly(formData).subscribe({
          next: (res: any) => {
            if (res.status) {
              this.modalService.dismissAll();
              this.ngOnInit()
            }
          },
          error: (err: any) => console.error(err)
        });
      }
    }

getDataBasedOnRole() {
  if (this.AuthenticationService.isAdmin() || this.AuthenticationService.isStaff()) {
    // Panggil metode untuk mendapatkan data khusus admin
    console.log('admin masuk', this.isAdmin);
    

    this.getAllWeeklyAdmin();
  } else if (this.AuthenticationService.isKaryawan()) {
    // Panggil metode untuk mendapatkan data khusus karyawan
    console.log('yang di tanggapi karyawan', this.isKaryawan);
    
    this.getAllWeeklyKaryawan();
  } else{
    alert('error | not found')
  }
}

getAllWeeklyAdmin() {
  const dataadmin = this.AuthenticationService.getUserData();
  console.log('data admin', dataadmin);
  
  this.apiService.getAllWeekly().subscribe({
    next: (res: any) => {
          if (res.status) {
            this.dataWeekly = res.data
            this.filterdata = this.dataWeekly;
          this.totalRecords = this.filterdata.length; // Total jumlah data Anda
          this.setPaginationData();
            console.log('data admin',this.dataWeekly);
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

getAllWeeklyKaryawan() {
  const karyawanData = this.AuthenticationService.getUserData();
  const karyawanName = karyawanData.name; // Asumsikan 'name' adalah properti yang menyimpan nama pengguna
  console.log('Data masuk:', karyawanData);

  this.apiService.getAllWeekly().subscribe({
    next: (res: any) => {
      console.log('Respon:', res);

      if (res.status) {
        // Pastikan res.data dan res.data adalah array sebelum menggunakan filter
        if (Array.isArray(res.data)) {
          this.dataWeekly = res.data.filter((data: { pic: string }) => {
            return data.pic === karyawanName;
          });

          console.log('Data karyawan:', this.dataWeekly);

          // Pastikan this.dataWeekly adalah array sebelum mengakses properti length
          if (Array.isArray(this.dataWeekly)) {
            this.filterdata = this.dataWeekly;
            this.totalRecords = this.filterdata.length; // Total jumlah data Anda
            this.setPaginationData();
          } else {
            console.error('Data Weekly tidak valid.');
          }
        } else {
          console.error('Data respon tidak valid.');
        }
      } else {
        console.error(`${res.data.message}`);
        setTimeout(() => {
        }, 1000);
      }
    },
    error: (err: any) => {
      console.error('Kesalahan dalam permintaan:', err);
      setTimeout(() => {
      }, 1000);
    },
  });
}

getByIdWeekly(id: number) {
  console.log('Id Yang Di tangkap', id);
  this.apiService.getByIdWeekly(id).subscribe({
    next: (res: any) => {
      this.weeklyId = res;
      console.log(this.weeklyId)
    },
    error: (err: any) => {
      console.error(err);
      setTimeout(() => {
      }, 1000);
    }
  });
}



//plugin yang di gunakan
onSearch(): void {
  if (!this.searchTerm) {
    this.filterdata = this.dataWeekly;
    console.log('data', this.dataWeekly);
    console.log('filter', this.filterdata);
  } else {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filterdata = this.dataWeekly.filter((data: 
      { pic: string, task: string, due_start:string, remark:string, next_plan:string}) => {
      return (
        data.pic.toString().toLowerCase().includes(searchTermLower) ||
        data.task.toString().toLowerCase().includes(searchTermLower) ||
        data.due_start.toString().toLowerCase().includes(searchTermLower) ||
        data.remark.toString().toLowerCase().includes(searchTermLower) ||
        data.next_plan.toString().toLowerCase().includes(searchTermLower) 
      );
    });
  }
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


}


