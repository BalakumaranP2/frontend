import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  constructor(private http: HttpClient) { }

  getProcessingData(requestId:Number): Observable<any> {
    return this.http.get(`http://localhost:32786/api/ComponentProc/${requestId}`)

  }
}
