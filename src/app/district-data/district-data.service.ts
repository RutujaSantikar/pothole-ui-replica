import { Injectable } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictDataService {

  constructor( private http : HttpClient) { }

  public getDistrictData(disId:any, disName:any) : Observable<any> {
  const url = "http://114.143.217.43:8080/getDistrictsV1?";
  let queryParams = new HttpParams();
    queryParams =  queryParams.append('disId', disId);
    queryParams =  queryParams.append('disName', disName);
    return  this.http.get(url , {params : queryParams});
  }

  public getDivisionData(divId:any,disId:any) : Observable<any> {
  const url = "http://114.143.217.43:8080/getDivisionsV2?disId="+disId+"&divId="+divId;
    let queryParams = new HttpParams();
    queryParams =  queryParams.append('divId', divId);
    // queryParams =  queryParams.append('divName', divName);
    queryParams =  queryParams.append('disId', disId);
    return  this.http.get(url , {params : queryParams});
  }

  public getSubDivisionData(sudId:any, divId:any, disId:any) : Observable<any> {
    const url = "http://114.143.217.43:8080/getSubDivisionsV2?disId="+disId+"&divId="+divId+"&sudId="+sudId;
    let queryParams = new HttpParams();
    queryParams =  queryParams.append('divId', divId);
    // queryParams =  queryParams.append('divName', divName);
    queryParams =  queryParams.append('disId', disId);
    queryParams =  queryParams.append('sudId', sudId);
    return  this.http.get(url , {params : queryParams});

  }


}
