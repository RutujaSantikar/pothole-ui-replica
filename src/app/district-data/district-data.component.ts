import { Component , OnInit} from '@angular/core';
import { DistrictDataService } from './district-data.service';
import { FormGroup , FormControl} from '@angular/forms';
import { GlobalVarComponent } from '../global-var/global-var.component';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.scss']
})
export class DistrictDataComponent implements OnInit{

  getDistrict:any[]= [];
  getDivision:any[]= [];
  getSubDivision:any[]= [];
  // disId='';
  // disName='';
  // divId='';
  // divName='';
  // sudId='';

  disId = GlobalVarComponent.disId;
  disName = GlobalVarComponent.disName;
  divId = GlobalVarComponent.divId;
  divName = GlobalVarComponent.divName;
  sudId = GlobalVarComponent.sudId;


  constructor(private districtDataService : DistrictDataService) { }

     dataForm = new FormGroup({

         disData : new FormControl(''),
         divisionData : new FormControl(''),
          subDivisionData : new FormControl('')

     });


     onChangeDistrict(disId:any){

      if(disId){
        this.districtDataService.getDivision(disId).subscribe((response:any) => {
        console.log(response);
        this.getDivision= response.data;
         this.getSubDivision=[];
      });

      }
      else{
        this.getDivision=[];
        this.getSubDivision=[];
      }
     }


     onChangeDivision(divId:any){

      if(divId)   {
        this.districtDataService.getSubDivision(this.disId,divId).subscribe((response:any) => {
        console.log(response);
        this.getSubDivision= response.data;
        //  this.getSubDivision=[];
      });

      }
      else{
        this.getSubDivision=[];

      }
     }





  ngOnInit(): void {
    this.getDistrict=[];
    this.districtDataService.getDistrict(this.disId).subscribe((response:any) => {
    console.log(response);
    this.getDistrict= response.data;
    console.log(this.getDistrict) });

      this.getDivision=[];
      this.districtDataService.getDivision(this.divId).subscribe((response:any) => {
      console.log(response);
      this.getDivision= response.data;
      console.log(this.getDivision)});

      this.getSubDivision=[];
      this.districtDataService.getSubDivision(this.disId,this.divId).subscribe((response:any) => {
     console.log(response);
      this.getSubDivision= response.data;
      console.log(this.getSubDivision)

      });

}



  view(){

    console.log(this.dataForm.value)
  }


}





