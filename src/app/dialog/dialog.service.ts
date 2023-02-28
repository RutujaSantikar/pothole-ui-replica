import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private http:  HttpClient) { }

  activeUser(usrId:any):Observable<any>{
    const url = "http://114.143.217.43:8080/";
    return this.http.post<any>(url + 'activeUser?usrId='+usrId,null)
  }

  inActiveUser(usrId:any){
    const url = "http://114.143.217.43:8080/";
    return this.http.post<any>(url + 'inActiveUser?usrId='+usrId,null)

  }


}
