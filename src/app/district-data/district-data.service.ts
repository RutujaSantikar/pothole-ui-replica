import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictDataService {

  constructor( private http : HttpClient) { }

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
    return  this.http.get(url +  'getDivisionsV2?disId='+disData, {params : queryParams});
  }

  public getSubDivision( disData:any, divisionData:any) : Observable<any> {
    const url = "http://114.143.217.43:8080/";
    let queryParams = new HttpParams();
    queryParams =  queryParams.append('disId', disData);
    queryParams =  queryParams.append('divId', divisionData);
    // queryParams =  queryParams.append('divName', divName);
    // queryParams =  queryParams.append('sudId', sudId);
    return  this.http.get(url + 'getSubDivisionsV2?disId='+disData+'&divId='+divisionData , {params : queryParams});

  }


  public getPothol( disData:any, divisionData:any, subDivisionData:any) : Observable<any> {
    const url = "http://114.143.217.43:8080/";
    let queryParams = new HttpParams();
    // queryParams =  queryParams.append('disId', disData);
    // queryParams =  queryParams.append('divId', divisionData);
    // queryParams =  queryParams.append('sudId', subDivisionData);
    return  this.http.get(url + 'getPotholesV5?disId='+disData+'&divId='+divisionData+'&sudId='+subDivisionData , {params : queryParams});
  }

}


// getPotholSummaryReportV5
