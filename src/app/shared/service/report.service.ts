import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../model/Item.model';

const statuses: {type: string}[] = [
  {type: 'PENDING'},
  {type: 'RESOLVE'}
];

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Report[]>
  {
    return this.httpClient.get<Report[]>(`${environment.api}/reports`, {withCredentials: true});
  }

  createReport(report: Report): Observable<Response>
  {
    delete report.user?.create_time;
    return this.httpClient.post<Response>(`${environment.api}/reports/${report.item?.id}`, report, {withCredentials: true});
  }

  getStatuses(): {type: string}[]
  {
    return statuses;
  }

  modifyReport(report: Report): Observable<Response>
  {
    delete report.user?.create_time;
    return this.httpClient.put<Response>(`${environment.api}/reports`, report, {withCredentials: true});
  }

  deleteReport(reportID: number): Observable<Response>
  {
    return this.httpClient.delete<Response>(`${environment.api}/reports/${reportID}`, {withCredentials: true});
  }
}
