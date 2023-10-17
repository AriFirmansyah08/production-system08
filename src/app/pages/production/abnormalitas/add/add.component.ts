import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// Ck Editer
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { data } from 'jquery';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DropzoneEvent } from 'ngx-dropzone-wrapper/lib/dropzone.interfaces';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @ViewChild('problemInput') problemInput!: ElementRef;
  

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  Form: FormGroup | undefined;
  cause: any;
  ca_pa:any;
  problem: any;
  postData:any;
  fileName: any;
  img_problem : any = [];
  img_cause: any = [];
  img_ca_pa:any = []

  constructor(
    private form: FormBuilder,
    private apiService: ApiService,
    private route: Router) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Abnormal', link: '/production/abnormal'},
      { label: 'Add', active: true }
    ];
  }

  dropzoneConfig: DropzoneConfigInterface = {
    url: `${environment.API_URL}${environment.image}`,
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    acceptedFiles: 'image/*',
  };
  dropzoneResponse: any;
  uploadedImages: string[] = [];

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
  onUploadImgCapa(event: DropzoneEvent) {
    this.dropzoneResponse = event[1];
    if (this.dropzoneResponse !== undefined) {
      this.fileName = this.dropzoneResponse.filename
      this.img_ca_pa.push(this.fileName)
    }
  }
  
  onSubmit() {
    // Ambil nilai dari textarea dan simpan dalam variabel
    const problem = document.getElementById('problemInput') as HTMLTextAreaElement;
    const cause = document.getElementById('causeInput') as HTMLTextAreaElement;
    const ca_pa = document.getElementById('ca_paInput') as HTMLTextAreaElement;

    // Generate the current date
    const currentDate = new Date();
  
    // Buat objek data yang akan dikirim ke API sesuai dengan struktur yang diperlukan oleh API Anda
    console.log(this.img_ca_pa)
    const postData = {
      date: currentDate,
      problem: problem.value,
      cause: cause.value,
      ca_pa: ca_pa.value,
      img_problem: this.img_problem.join(','),
      img_cause: this.img_cause.join(','),
      img_ca_pa: this.img_ca_pa.join(','),
    };
  
    // Panggil metode layanan apiService untuk menyimpan data ke dalam tabel yang sesuai dalam database
    this.apiService.insertabnormal(postData).subscribe(
      {
      next: (res: any) => {
        if (res.status) {
          console.log('Data berhasil disimpan ke database', res);
          // Lakukan tindakan setelah data berhasil disimpan, misalnya mengatur ulang nilai-nilai inputan
          problem.value = '';
          cause.value = '';
          ca_pa.value = '';
          // Navigate to the "production/abnormal" page
          this.route.navigate(['/production/abnormal']);
        } else {
          console.error('Gagal menyimpan data ke database', res);
          // Tangani kesalahan jika perlu
        }
      },
      error: (err: any) => {
        console.error('Terjadi kesalahan saat menyimpan data ke database', err);
        // Tangani kesalahan jika terjadi masalah koneksi atau masalah lainnya
      }
    });
  }

}