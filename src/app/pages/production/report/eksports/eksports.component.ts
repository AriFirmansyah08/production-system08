import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-eksports',
  templateUrl: './eksports.component.html',
  styleUrls: ['./eksports.component.scss'],
  providers: [DecimalPipe]
})


export class EksportsComponent implements OnInit {
  id: number | undefined;
  DataById: any;
  dataID: any;
  data: any;
  finalFinish: number | undefined;
  averageResult: number | undefined;
  totalProductionHours: number | undefined;
  

  constructor(private route: ActivatedRoute, private apiservice: ApiService, private http: HttpClient) {}

  ngOnInit(): void {
    // Mengambil nilai 'id' dari parameter URL dan mengonversinya ke tipe number
  this.id = Number(this.route.snapshot.paramMap.get('id'));


  // Menggunakan nilai 'id' dalam URL API
  const apiUrl = `${environment.API_URL}master/history/${this.id}`;

  this.http.get(apiUrl).subscribe((response: any) => {
    this.data = response.data;
    this.calculateStatistics();
  });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.apiservice.getByIdHistory(id).subscribe((res: any) => {
          // Proses data yang diterima dari API
        });
      }
    });

    this.route.params.subscribe(params => {
      console.log(params);
      const id = params['id'];
      this.apiservice.getByIdHistory(id).subscribe((response: any) => {
        // Pastikan Anda memeriksa apakah 'id_abnormal' ada dalam respons
        console.log(response);
        this.dataID = response.data[0]
      }, error => {
        console.error('Error:', error);
      });
    });

    
  }  
calculateStatistics(): void {
  if (this.data && this.data.length > 0) {
    // Mengambil nilai finish dari entri terakhir dalam array data
    this.finalFinish = this.data[this.data.length - 1].finish;
    console.log('data finish', this.finalFinish);

    // Menghitung rata-rata produksi (averageResult)
    const resultValues = this.data.map((item: any) => item.result);
    const totalResult = resultValues.reduce((total: number, value: number) => total + value, 0);
    this.averageResult = totalResult / resultValues.length;
    console.log('data rata - rata', this.averageResult);

    // Menghitung total jam produksi (totalProductionHours)
    this.totalProductionHours = this.calculateTotalProductionHours(this.data);
    console.log('data total jam', this.totalProductionHours);
  }
}

// calculateTotalProductionHours(data: any[]): number {
//   let totalHours = 1; // Mulai dari 1 jam.

//   for (let i = 0; i < data.length; i++) {
//     if (i < data.length - 1) {
//       const startTimeParts = data[i].production_hours.split(':');
//       const endTimeParts = data[i + 1].production_hours.split(':');

//       if (startTimeParts.length === 3 && endTimeParts.length === 3) {
//         const startHour = parseInt(startTimeParts[0]);
//         const startMinute = parseInt(startTimeParts[1]);
//         const startSecond = parseInt(startTimeParts[2]);
//         const endHour = parseInt(endTimeParts[0]);
//         const endMinute = parseInt(endTimeParts[1]);
//         const endSecond = parseInt(endTimeParts[2]);

//         const hoursDiff = (endHour - startHour) + (endMinute - startMinute) / 60 + (endSecond - startSecond) / 3600;
//         totalHours += hoursDiff;
//       }
//     }
//   }
//   return totalHours;
// }

calculateTotalProductionHours(data: any[]): number {
  return data.length;
}

}
