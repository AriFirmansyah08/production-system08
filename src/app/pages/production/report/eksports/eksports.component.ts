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
  finalFinish: any;
  averageResult: number | undefined;
  totalProductionHours: number | undefined;

  
  breadCrumbItems!: Array<{}>;
  lineEfficiency: any;
  lineEfficiency_: any;
  constructor(private route: ActivatedRoute, private apiservice: ApiService, private http: HttpClient) {}

  ngOnInit(): void {

    this.breadCrumbItems = [
      { label: 'Production', link: '/dashboard-prod' },
      { label: 'Report', link: '/production/report'},
      { label: 'Daily', link: 'production/report/daily/history'},
      { label: 'Eksports', active: true },
    ];
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  const apiUrl = `${environment.API_URL}master/history/${this.id}`;

  this.http.get(apiUrl).subscribe((response: any) => {
    this.data = response.data;
    this.calculateStatistics();
  });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.apiservice.getByIdHistory(id).subscribe((res: any) => {
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

    // Menambahkan perhitungan efisiensi garis
    const machineSpeed = 530; // Ganti dengan nilai kecepatan mesin yang sesuai
    this.lineEfficiency = this.calculateLineEfficiency(this.totalProductionHours, machineSpeed);
    console.log('line efisiensi', this.lineEfficiency);
  }
}

calculateTotalProductionHours(data: any[]): number {
  return data.length;
}

calculateLineEfficiency(totalProductionHours: number, machineSpeed: number): number {
  // Konversi total jam produksi ke dalam menit
  const totalProductionMinutes = totalProductionHours * 60;
  // Hitung efisiensi garis
  const lineEfficiency = (totalProductionMinutes * (machineSpeed));
  
  return lineEfficiency;
}
}
