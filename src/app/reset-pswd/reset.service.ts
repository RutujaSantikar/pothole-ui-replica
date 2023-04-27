import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  constructor(private http:HttpClient) { }


  public resetPassword(usrNum:any):Observable<any>{

     const url = "http://114.143.217.43:8080/getPwdUsers";
     return this.http.get(url);
 }
}
