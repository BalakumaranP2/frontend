import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  
  sawdetails(): Observable<any>{
 
    return this.http.get('http://localhost:32786/api/ComponentProc');
  }


  sendOrderDetails(body:any): Observable<any>{
    const headers= {'Content-type': 'application/json'}
    return this.http.post('http://localhost:32786/api/ComponentProc', body, { headers} );
  }

  updateStatus(status :any,requestId:Number): Observable<any>{
    const headers= {'Content-type': 'application/json'}
    return this.http.patch(`http://localhost:32786/api/ComponentProc/${requestId}`, status, {headers});
  }
}
