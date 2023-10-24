import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

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
  img_capa_currection:any = []
  img_capa_currective:any = []

  constructor(
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
  
  onSubmit() {
    // Ambil nilai dari textarea dan simpan dalam variabel
    const problem = document.getElementById('problemInput') as HTMLTextAreaElement;
    const cause = document.getElementById('causeInput') as HTMLTextAreaElement;
    const capa_currection = document.getElementById('ca_pationInput') as HTMLTextAreaElement;
    const capa_currective = document.getElementById('ca_pationInput') as HTMLTextAreaElement;

    // Generate the current date
    const currentDate = new Date();
    const postData = {
      date: currentDate,
      problem: problem.value,
      cause: cause.value,
      capa_currection: capa_currection.value,
      capa_currective: capa_currective.value,
      img_problem: this.img_problem.join(','),
      img_cause: this.img_cause.join(','),
      img_capa_currection: this.img_capa_currection.join(','),
      img_capa_currective: this.img_capa_currective.join(','),
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
          capa_currection.value = '';
          capa_currective.value = '';
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

  deleteImage(): void {
    // Periksa apakah ada gambar yang diunggah
    if (this.dropzoneResponse) {
      // Di sini Anda dapat menentukan logika untuk menghapus gambar yang diunggah
      // Misalnya, jika Anda menyimpan informasi gambar dalam properti `dropzoneResponse`, Anda dapat menghapusnya:
      this.dropzoneResponse = undefined;

      // Selanjutnya, Anda perlu menambahkan logika untuk menghapus gambar fisik di server sesuai kebutuhan aplikasi Anda.
    }
  }

  deleteImageProblem(): void {
    // Periksa apakah ada gambar yang diunggah pada img_problem atau dalam dropzoneResponse
    if (this.img_problem || this.dropzoneResponse) {
      let imageToDelete: string | undefined;

      // Ambil nama gambar dari properti img_problem atau dropzoneResponse
      if (this.img_problem) {
        imageToDelete = this.img_problem.imageName; // Gantilah "imageName" dengan properti yang sesuai
      } else if (this.dropzoneResponse) {
        imageToDelete = this.dropzoneResponse.imageName; // Gantilah "imageName" dengan properti yang sesuai
      }

      // Periksa apakah ada nama gambar yang akan dihapus
      if (imageToDelete) {
        // Panggil API atau metode Anda untuk menghapus gambar
        this.apiService.deleteImage(imageToDelete).subscribe({
          next: (res: any) => {
            if (!res.error) {
              console.log(res.message);
            }
          },
          error: (err: any) => console.error(err),
        });

        // Setel properti img_problem atau dropzoneResponse menjadi undefined setelah menghapus gambar
        this.img_problem = undefined;
        this.dropzoneResponse = undefined;
      }
    }
  }


}