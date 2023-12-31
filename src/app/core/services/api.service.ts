import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

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

  insertImageAbnormal(file: any) {
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

  deleteImageAbnormal(filename: string) {
    return this.httpClient.delete<any>(
      environment.API_URL + environment.Image_abnormal + filename,
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
    (environment.API_URL + `master/daily_report`, {form_data : data}, 
    this.httpOptions())
  }
  resetdaily(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `master/reset_daily_report`, {form_data : data}, 
    this.httpOptions())
  }
  getByIdDaily(id: number) {
    return this.httpClient.get<any>(
      environment.API_URL + `master/daily_report/${id}`, 
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


  //dail_activity
  getAlldailyActivity() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/daily_activity', 
    this.httpOptions())
  }

  insertDataActivity(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `master/daily_activity`, {form_data : data}, 
    this.httpOptions())
  }

  getByIdActivity(id: number){
    return this.httpClient.get<any>
    (environment.API_URL + `master/daily_activity/${id}`, 
    this.httpOptions())
  }

  updateActivity(id: number, data: any) {
    return this.httpClient.put<any>(
      environment.API_URL + 'master/daily_activity/' + id,
      { form_data: data },
      this.httpOptions()
    );
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

  insertData(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `/master/history`, {form_data : data}, 
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
  getByIdSchedule(id: number){
    return this.httpClient.get<any>
    (environment.API_URL + `/master/schedule/${id}`, 
    this.httpOptions())
  }

  updateschedule(id: number, data: any) {
    return this.httpClient.put<any>(
      environment.API_URL + '/master/schedule/'+id,
      { form_data: data },
      this.httpOptions()
    );
  }

  deleteschedule(id: number) {
    return this.httpClient.delete<any>(
      environment.API_URL + '/master/schedule/'+id,
      this.httpOptions()
    );
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

  updatereset(id: number, data: any) {
    return this.httpClient.put<any>(
      environment.API_URL + environment.historyId + id,
      { form_data: data },
      this.httpOptions()
    );
  }
  
  getAllMachine() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/machine', 
    this.httpOptions())
  }

  getByIdMachine(id: number) {
    return this.httpClient.get<any>(
      environment.API_URL + `master/machine/${id}`, 
      this.httpOptions())
  }

  deleteMachine(id: number) {
    return this.httpClient.delete<any>(
      environment.API_URL + '/master/machine/'+id,
      this.httpOptions()
    );
  }

  insertMachine(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `master/machine`, {form_data : data}, 
    this.httpOptions())
  }

  updatemachine(id: number, data: any) {
    return this.httpClient.put<any>(
      environment.API_URL + '/master/machine/'+id,
      { form_data: data },
      this.httpOptions()
    );
  }

  insertProfile(data: any) {
    return this.httpClient.post<any>(
      environment.API_URL + environment.getImageUser,
      { form_data: data },
      this.httpOptions()
    );
  }

  //Weekly Report
  getAllWeekly() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/weekly', 
    this.httpOptions())
  }

  insertWeekly(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `master/weekly`, {form_data : data}, 
    this.httpOptions())
  }

  getByIdWeekly(id: number){
    return this.httpClient.get<any>
    (environment.API_URL + `master/weekly/${id}`, 
    this.httpOptions())
  }

  //Users
  getAllUsers() {
    return this.httpClient.get<any>
    (environment.API_URL + 'master/user', 
    this.httpOptions())
  }

  insertUser(data: any) {
    return this.httpClient.post<any>
    (environment.API_URL + `master/user`, {form_data : data}, 
    this.httpOptions())
  }

  getByIdUser(id: number){
    return this.httpClient.get<any>
    (environment.API_URL + `master/user/${id}`, 
    this.httpOptions())
  }

  updateUser(id: number, data: any) {
    return this.httpClient.put<any>(
      environment.API_URL + '/master/user/'+id,
      { form_data: data },
      this.httpOptions()
    );
  }

  getImageUser(filename: string) {
    return this.httpClient.get<any>(
      environment.API_URL + environment.getImageUser + filename,
      this.httpOptions()
    );
  }

  insertImageUser(file: any) {
    return this.httpClient.post<any>(
      environment.API_URL + environment.Image_user, file
    );
  }

    //Planning Montly Report
    getAllPlanning() {
      return this.httpClient.get<any>
      (environment.API_URL + 'master/planning', 
      this.httpOptions())
    }
  
    insertDataPlanning(data: any) {
      return this.httpClient.post<any>
      (environment.API_URL + `master/planning`, {form_data : data}, 
      this.httpOptions())
    }
  
    getByIdPlanning(id: number){
      return this.httpClient.get<any>
      (environment.API_URL + `master/planning/${id}`, 
      this.httpOptions())
    }

    updatePlanning(id: number, data: any) {
      return this.httpClient.put<any>(
        environment.API_URL + 'master/planning/'+id,
        { form_data: data },
        this.httpOptions()
      );
    }

  //Pending Job Montly Report
    getAllPendingJob() {
      return this.httpClient.get<any>
      (environment.API_URL + 'master/pending', 
      this.httpOptions())
    }

    insertDataPendingJob(data: any) {
      return this.httpClient.post<any>
      (environment.API_URL + `master/pending`, {form_data : data}, 
      this.httpOptions())
    }

    getByIdPendingJob(id: number){
      return this.httpClient.get<any>
      (environment.API_URL + `master/pending/${id}`, 
      this.httpOptions())
    }

    updatePending(id: number, data: any) {
      return this.httpClient.put<any>(
        environment.API_URL + 'master/pending/'+id,
        { form_data: data },
        this.httpOptions()
      );
    }

    //Pending Job Montly Report
    getAllResume() {
      return this.httpClient.get<any>
      (environment.API_URL + 'master/resume', 
      this.httpOptions())
    }

    insertDataResume(data: any) {
      return this.httpClient.post<any>
      (environment.API_URL + `master/resume`, {form_data : data}, 
      this.httpOptions())
    }

    getByIdResume(id: number){
      return this.httpClient.get<any>
      (environment.API_URL + `master/resume/${id}`, 
      this.httpOptions())
    }
}