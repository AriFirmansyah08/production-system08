import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  saveEvent() {
    throw new Error('Method not implemented.');
  }
  
  apiUrl: any;
  public httpOptions(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };
  }

  constructor(private httpClient: HttpClient) {}

  getCustomApps(userId: number) {
    return this.httpClient.get<any>(
      environment.API_URL + environment.userAppId + userId,
      this.httpOptions()
    );
  }

  insertCustomApp(data: any) {
    return this.httpClient.post<any>(
      environment.API_URL + environment.userApp,
      { form_data: data },
      this.httpOptions()
    );
  }

  deleteCustomApp(customId: number) {
    return this.httpClient.delete<any>(
      environment.API_URL + environment.userAppId + customId,
      this.httpOptions()
    );
  }

  getAllApps() {
    return this.httpClient.get<any>(
      environment.API_URL + environment.applications,
      this.httpOptions()
    );
  }

  insertApp(data: any) {
    return this.httpClient.post<any>(
      environment.API_URL + environment.applications,
      { form_data: data },
      this.httpOptions()
    );
  }

  updateApp(id: number, data: any) {
    return this.httpClient.put<any>(
      environment.API_URL + environment.applicationId + id,
      { form_data: data },
      this.httpOptions()
    );
  }

  deleteApp(id: number) {
    return this.httpClient.delete<any>(
      environment.API_URL + environment.applicationId + id,
      this.httpOptions()
    );
  }

  getImage(filename: string) {
    return this.httpClient.get<any>(
      environment.API_URL + environment.getImage + filename,
      this.httpOptions()
    );
  }

  insertImage(file: any) {
    return this.httpClient.post<any>(
      environment.API_URL + environment.image,
      { file: file },
      this.httpOptions()
    );
  }

  deleteImage(filename: string) {
    return this.httpClient.delete<any>(
      environment.API_URL + environment.image + filename,
      this.httpOptions()
    );
  }

  // daily Endpoints
  getAlldaily() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/daily_report', 
    this.httpOptions())
  }

  insertdaily(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `/master/daily_report`, {form_data : data}, 
    this.httpOptions())
  }
  resetdaily(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `/master/reset_daily_report`, {form_data : data}, 
    this.httpOptions())
  }
  getByIdDaily(id: number) {
    return this.httpClient.get<any>(
      environment.API_URL + `/master/daily_report/${id}`, 
      this.httpOptions())
  }

  updatedaily(id: number, data: any) {
    return this.httpClient.put<any>(
      environment.API_URL + '/master/daily_report/' + id,
      { form_data: data },
      this.httpOptions()
    );
  }

  getAllleaders() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/leaders', 
    this.httpOptions())
  }

  getAllHistory() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/history', 
    this.httpOptions())
  }

  getByIdHistory(id: number){
    return this.httpClient.get<any>
    (environment.API_URL + `/master/history/${id}`, 
    this.httpOptions())
  }

  // schedule Endpoints
  getAllschedule() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/schedule', 
    this.httpOptions())
  }

  insertschedule(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `master/schedule`, {form_data : data}, 
    this.httpOptions())
  }

  // abnormal Endpoints
  getAllabnormal() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/abnormal', 
    this.httpOptions())
  }

  getByIdabnormal(id: number) {
    return this.httpClient.get<any>(
      environment.API_URL + `master/abnormal/${id}`, 
      this.httpOptions())
  }

  insertabnormal(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `/master/abnormal`, {form_data : data}, 
    this.httpOptions())
  }

}
