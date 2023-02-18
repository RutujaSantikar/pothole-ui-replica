import { Component , OnInit} from '@angular/core';
import { DistrictDataService } from './district-data.service';
import { FormGroup , FormControl} from '@angular/forms';
import { GlobalVarComponent } from '../global-var/global-var.component';

@Component({
  selector: 'app-district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.scss']
})
export class DistrictDataComponent implements OnInit{

  getDistrictData:any[]= [];
  getDivisionData:any[]= [];
  getSubDivisionData:any[]= [];

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



  ngOnInit(): void {
    this.getDistrictData=[];
    this.districtDataService.getDistrictData(this.disId, this.disName).subscribe((response:any) => {
    console.log(response);
    this.getDistrictData= response.data;
    console.log(this.getDistrictData) });

      this.getDivisionData=[];
      this.districtDataService.getDivisionData(this.divId, this.disId).subscribe((response:any) => {
      console.log(response);
      this.getDivisionData= response.data;
      console.log(this.getDivisionData)});

      this.getSubDivisionData=[];
      this.districtDataService.getSubDivisionData(this.disId,this.divId,this.sudId).subscribe((response:any) => {
     console.log(response);
      this.getSubDivisionData= response.data;
      console.log(this.getSubDivisionData)

      });

}

   onChangeDistrict(disId :any){

   if(disId){
     this.districtDataService.getDivisionData(this.divId, this.disId).subscribe((response:any) => {
       this.getDivisionData= response.data;
       console.log(this.getDivisionData)
     });

   }

  }

  view(){

    console.log(this.dataForm.value)
  }


}





