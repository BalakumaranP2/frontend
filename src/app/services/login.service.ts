import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn=new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  signUp(body: any): Observable<any>{
    const headers= {'Content-type': 'application/json'}
    return this.http.post('http://localhost:21397/api/UserAuth', body, { headers })
      .pipe(map(res => (
        this.setSessionData(res)
        // console.log(res.token);
      )))
  }

  setSessionData(authData: any): any{
    console.log(authData);
    
    // const expiry =  moment().add(authData.expiresIn,'second')
    // console.log(expiry.valueOf(), 'expiry');
    localStorage.setItem('id_token', authData.token);
    localStorage.setItem('id', authData.id);
    //this.isLoggedIn=true;
    this.isLoggedIn.next(true);
    // localStorage.setItem('expiresIn', JSON.stringify(expiry.valueOf()));
    return authData;
  }

  login(body: any): Observable<any> {
    return this.http.post('http://localhost:21397/api/UserAuth/authenticate', body)
      .pipe(map(res => ( this.setSessionData(res))));
  }
}
