import { Component , OnInit} from '@angular/core';
import { DistrictDataService } from './district-data.service';
import { FormGroup , FormControl} from '@angular/forms';
import { GlobalVarComponent } from '../global-var/global-var.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SnackbarService } from './snackbar.service';

@Component({
  selector: 'app-district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.scss']
})
export class DistrictDataComponent implements OnInit{


  getDistrict:any[]= [];
  getDivision:any[]= [];
  getSubDivision:any[]= [];

 displayedColumns: string[] = ['disName', 'potDivision', 'sudName', 'total', 'assign', 'close', 'pending'];
 dataSource = new MatTableDataSource<any>;

  // disId = GlobalVarComponent.disId;
  // disName = GlobalVarComponent.disName;
  // divId = GlobalVarComponent.divId;
  // divName = GlobalVarComponent.divName;
  // sudId = GlobalVarComponent.sudId;


  constructor(private districtDataService : DistrictDataService , private snackbarService : SnackbarService) { }

     dataForm = new FormGroup({

         disData : new FormControl(''),
         divisionData : new FormControl(''),
          subDivisionData : new FormControl('')

     });


     onChangeDistrict( ){
      const disData= this.dataForm.get('disData')?.value;
      console.log(disData)
      // if(disData){
      //   this.districtDataService.getDivision(disData).subscribe((response:any) => {
      //   console.log(response);
      //   this.getDivision= response.data;
      //    this.getSubDivision=[];
      // });

      // }
      // else{
      //   this.getDivision=[];
      //   this.getSubDivision=[];
      // }

        this.districtDataService.getDivision(disData).subscribe((response:any) => {

        console.log(response);
        if(response.status === "Success"){
          this.getDivision= response.data;
          this.getSubDivision=[];
        }
        else{
              this.snackbarService.backendWarningSnackBar("Data not found")
        }
        })


     }


     onChangeDivision(){
      const disData= this.dataForm.get('disData')?.value;
      const divisionData = this.dataForm.get('divisionData')?.value;
      console.log(divisionData)
      // if(divisionData)   {
      //   this.districtDataService.getSubDivision(disData,divisionData).subscribe((response:any) => {
      //   console.log(response);
      //   this.getSubDivision= response.data;
      //   //  this.getSubDivision=[];
      // });

      // }
      // else{
      //   this.getSubDivision=[];


      // }

       this.districtDataService.getSubDivision(disData,divisionData).subscribe((response:any) => {
        console.log(response);
        if(response.status === "Success"){
          this.getSubDivision= response.data;
          this.getSubDivision=[];
        }
        else{
          this.snackbarService.backendWarningSnackBar("Data not found")
        }

       })
     }






  ngOnInit(): void {
    this.getDistrict=[];
    this.districtDataService.getDistrict().subscribe((response:any) => {
    console.log(response);
    this.getDistrict= response.data;
    console.log(this.getDistrict)
  });
    //   this.getDivision=[];
    //   this.districtDataService.getDivision(this.divId).subscribe((response:any) => {
    //   console.log(response);
    //   this.getDivision= response.data;
    //   console.log(this.getDivision)});
    //   this.getSubDivision=[];
    //   this.districtDataService.getSubDivision(this.disId,this.divId).subscribe((response:any) => {
    //  console.log(response);
    //   this.getSubDivision= response.data;
    //   console.log(this.getSubDivision)
    //   });
}


       getDivisionByDistrict(divId:any){

        this.getDivision=[];
        this.districtDataService.getDivision(divId).subscribe((response:any) => {
        console.log(response);
        this.getDivision= response.data;
         this.getSubDivision=[];
      });
       }

       getSubDivisionByDivision(disId:any,divId:any){
        this.getSubDivision=[];
        this.districtDataService.getSubDivision(disId,divId).subscribe((response:any) => {
        console.log(response);
        this.getSubDivision= response.data;
      });
    }



  view(){

    const disData= this.dataForm.get('disData')?.value;
    const divisionData = this.dataForm.get('divisionData')?.value;
    const subDivisionData = this.dataForm.get('subDivisionData')?.value;
    this.districtDataService.getPothol(disData, divisionData, subDivisionData).subscribe((response:any) => {
    console.log(response);
    this.dataSource.data = response[1].data;
    console.log(this.dataSource.data);

    // this.dataSource = new MatTableDataSource<any>(response.data);
    // console.log(this.dataSource)
  });

  }


}





