import { Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { DropzoneComponent, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DropzoneEvent } from 'ngx-dropzone-wrapper/lib/dropzone.interfaces';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @ViewChild(DropzoneComponent) dropzone!: DropzoneComponent;
  formSection: FormGroup;
  breadCrumbItems!: Array<{}>;
  cause: any;
  ca_pa:any;
  problem: any;
  postData:any;
  fileName: any;
  img_problem : any = [];
  img_cause: any = [];
  img_capa_currection:any = []
  img_capa_currective:any = []
  MachineData: any;
  img_action: any =[];
  section: string = '';
  sectionValue : string='';
  startTimeValue : any;
  endTimeValue : any;
  selectedGroup = 'Choose a Section';

  constructor(
    private apiService: ApiService,
    private route: Router,
    private fb: FormBuilder
    ) { 
      this.formSection = this.fb.group({
        section: [''],
        start_time: [''],
        end_time: ['']
      });
  }

  ngOnInit(): void {
    this.getAllMachine()
    this.dropzone.config = this.dropzoneConfig;
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Abnormal', link: '/production/abnormal'},
      { label: 'Add', active: true }
    ];
  }

  dropzoneConfig: DropzoneConfigInterface = {
    url: `${environment.API_URL}${environment.Image_abnormal}`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    acceptedFiles: 'image/*',
  };
  dropzoneResponse: any;

  onUploadImgProblem(event: DropzoneEvent) {
    this.dropzoneResponse = event[1];
    if (this.dropzoneResponse !== undefined) {
      this.fileName = this.dropzoneResponse.filename
      this.img_problem.push(this.fileName)
    }
  }

  onUploadImgCause(event: DropzoneEvent) {
    this.dropzoneResponse = event[1];
    if (this.dropzoneResponse !== undefined) {
      this.fileName = this.dropzoneResponse.filename
      this.img_cause.push(this.fileName);
    }
  }
  onUploadImgCapaCurrention(event: DropzoneEvent) {
    this.dropzoneResponse = event[1];
    if (this.dropzoneResponse !== undefined) {
      this.fileName = this.dropzoneResponse.filename
      this.img_capa_currection.push(this.fileName)
    }
  }
  onUploadImgCapaCurrentive(event: DropzoneEvent) {
    this.dropzoneResponse = event[1];
    if (this.dropzoneResponse !== undefined) {
      this.fileName = this.dropzoneResponse.filename
      this.img_capa_currective.push(this.fileName)
    }
  }

  onUploadImgAction(event: DropzoneEvent) {
    this.dropzoneResponse = event[1];
    if (this.dropzoneResponse !== undefined) {
      this.fileName = this.dropzoneResponse.filename
      this.img_action.push(this.fileName)
    }
  }
  
  onSubmit() {
    // Ambil nilai dari textarea dan simpan dalam variabel
    const problem = document.getElementById('problemInput') as HTMLTextAreaElement;
    const cause = document.getElementById('causeInput') as HTMLTextAreaElement;
    const capa_currection = document.getElementById('ca_pationInput') as HTMLTextAreaElement;
    const capa_currective = document.getElementById('ca_pativeInput') as HTMLTextAreaElement;
    const action = document.getElementById('action') as HTMLTextAreaElement;
    // const currentDate = new Date();
  
    // Ambil nilai dari formSection
    const sectionValue = this.formSection.get('section')?.value;
    const startTimeValue = this.formSection.get('start_time')?.value;
    const endTimeValue = this.formSection.get('end_time')?.value;
  
    const postData = {
      problem: problem.value,
      cause: cause.value,
      capa_currection: capa_currection.value,
      capa_currective: capa_currective.value,
      action: action.value,
      img_problem: this.img_problem.join(','),
      img_cause: this.img_cause.join(','),
      img_capa_currection: this.img_capa_currection.join(','),
      img_capa_currective: this.img_capa_currective.join(','),
      img_action: this.img_action.join(','),
      section: sectionValue,
      start_time: startTimeValue,
      end_time: endTimeValue,
    };
  
    this.apiService.insertabnormal(postData).subscribe(
      {
      next: (res: any) => {
        if (res.status) {
          console.log('Data berhasil disimpan ke database', res);
          problem.value = '';
          cause.value = '';
          capa_currection.value = '';
          capa_currective.value = '';
          action.value = '';
        } else {
          console.error('Gagal menyimpan data ke database', res);
        }
      },
      error: (err: any) => {
        console.error('Terjadi kesalahan saat menyimpan data ke database', err);
      }
    });
  }

  getAllMachine() {
    this.apiService.getAllMachine().subscribe({
      next: (res: any) => {
        if (res.status) {
          this.MachineData = res.data
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
  
  /**
   * cancel sweet alert
   * @param confirm modal content
   */
  confirm() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons
      .fire({
        title: 'Anda Serius Ingin Menyimpan?',
        text: 'Lihat Lagi Laporan Anda!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Simpan Laporan!',
        cancelButtonText: 'No, Melihat Laporan!',
      })
      .then(result => {
        if (result.isConfirmed) {
          this.onSubmit();
          Swal.fire({
            title: 'Success!',
            text: 'Terimakasih Atas Laporannya Salam Sehat Selalu.',
            confirmButtonColor: 'rgb(3, 142, 220)',
            icon: 'success',
          }).then(() => {
            this.route.navigate(['/production/abnormal']);
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelled',
            text: 'Perhatikan Kembali Laporannya :)',
            confirmButtonColor: 'rgb(3, 142, 220)',
            icon: 'error',
          });
        }
      });
  }
}