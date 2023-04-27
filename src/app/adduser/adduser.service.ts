import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdduserService {

  constructor(public http:HttpClient) { }

   public getDesignation():Observable<any>{

    const url = "http://114.143.217.43:8080/getDesignationV1?usrId=346";
    return this.http.get(url);


   }


    public addUser(data:any):Observable<any>{

      const url='https://reqres.in/api/users';
      return this.http.post(url,data);
    }

}
