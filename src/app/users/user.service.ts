import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(private http : HttpClient) { }

  public getDistrict() : Observable<any> {
    const url = "http://114.143.217.43:8080/getDistrictsV1?";
    let queryParams = new HttpParams();
      // queryParams =  queryParams.append('disId', disId);
      // queryParams =  queryParams.append('disName', disName);
      return  this.http.get(url);
    }

    public getDivision(disData:any) : Observable<any> {
    const url = "http://114.143.217.43:8080/";
      let queryParams = new HttpParams();
      // queryParams =  queryParams.append('divId', divId);
      // queryParams =  queryParams.append('divName', divName);
      queryParams =  queryParams.append('disId', disData);
      return  this.http.get(url +  'getDivisionsV2?disId='+disData);


    }

    public getSubDivision( disData:any, divisionData:any) : Observable<any> {
      const url = "http://114.143.217.43:8080/";
      let queryParams = new HttpParams();
      queryParams =  queryParams.append('disId', disData);
      queryParams =  queryParams.append('divId', divisionData);
      // queryParams =  queryParams.append('divName', divName);
      // queryParams =  queryParams.append('sudId', sudId);
      return  this.http.get(url + 'getSubDivisionsV2?disId='+disData+'&divId='+divisionData);

    }


    public getUsers(disData:any, divisionData:any, subDivisionData:any):Observable<any>{
      const url = "http://114.143.217.43:8080/";
      // return this.http.get(url + 'getUsersByUgpV1?ugpId=1'+'&disId='+disData+'&divId='+divisionData+'&sudId='+subDivisionData);

      // if( (disData == undefined || divisionData == undefined || subDivisionData == undefined) || (disData == 0 || divisionData == 0 || subDivisionData == 0)  ){

      //   // return this.http.get(url + 'getUsersByUgpV1?ugpId=1');

      //   return this.http.get(url + 'getUsersByUgpV1?ugpId=1'+'&disId='+disData+'&divId='+divisionData+'&sudId='+subDivisionData);
      // }



        // else if( disData &&   divisionData && subDivisionData){

        //   return this.http.get(url + 'getUsersByUgpV1?ugpId=1'+'&disId='+disData+'&divId='+divisionData+'&sudId='+subDivisionData);
        // }
        // else{

        //   return this.http.get(url + 'getUsersByUgpV1?ugpId=1'+'&disId='+disData+'&divId='+divisionData+'&sudId='+subDivisionData);

        // }





        if((disData == undefined || disData == null || disData == 0) &&
         (divisionData == undefined || divisionData == null || divisionData == 0) &&
          (subDivisionData == undefined || subDivisionData == null || subDivisionData == 0) ){
          return this.http.get(url + 'getUsersByUgpV1?ugpId=1');
        }


        else if((disData != undefined || disData != null || disData != 0) &&
        (divisionData == undefined || divisionData == null || divisionData == 0) &&
        (subDivisionData == undefined || subDivisionData == null || subDivisionData == 0) ){
          return this.http.get(url + 'getUsersByUgpV1?ugpId=1'+'&disId='+disData);
        }

        else {

          return this.http.get(url + 'getUsersByUgpV1?ugpId=1'+'&disId='+disData+'&divId='+divisionData+'&sudId='+subDivisionData);
        }



        }






































    }

















