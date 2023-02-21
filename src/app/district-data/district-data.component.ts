import { Component , OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { DistrictDataService } from './district-data.service';
import { FormGroup , FormControl} from '@angular/forms';
import { GlobalVarComponent } from '../global-var/global-var.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { SnackbarService } from './snackbar.service';
// import {MatSort} from '@angular/material/sort';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-district-data',
  templateUrl: './district-data.component.html',
  styleUrls: ['./district-data.component.scss']
})
export class DistrictDataComponent implements OnInit, AfterViewInit{


 EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  getDistrict:any[]= [];
  getDivision:any[]= [];
  getSubDivision:any[]= [];
  showData:any[]=[];
  data:any[]=[];
   showExcel = false
   showFilter = false
   showTable = false

 displayedColumns: string[] = ['disName', 'potDivision', 'sudName', 'total', 'assign', 'close', 'pending'];
 dataSource = new MatTableDataSource<any>;



 @ViewChild(MatPaginator) paginator:any= MatPaginator;
//  @ViewChild(MatSort) sort: any=MatSort;


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;

  }

   applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

   }

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
                    // error message handling
        // this.districtDataService.getDivision(disData).subscribe((response:any) => {
        // console.log(response);
        // if(response.status === "Success"){
        //   this.getDivision= response.data;
        //   this.getSubDivision=[];
        // }
        // else{
        //       this.snackbarService.backendWarningSnackBar("Data not found")
        // }
        // })

          this.districtDataService.getDivision(disData).subscribe((response:any) => {

             if(!response.error){
              if(response.status === "Success"){
                // console.log(response);

                this.getSubDivision=[];

                if(response.data.length >  0){

                  this.getDivision= response.data;
                }
              }
              else{
                this.snackbarService.backendWarningSnackBar("Data not found")
              }

             }
             else{
                this.snackbarService.warningSnackBar(response.error)
             }

          });


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
                    // error message handling
      //  this.districtDataService.getSubDivision(disData,divisionData).subscribe((response:any) => {
      //   if(response.status === "Success"){
      //     console.log(response);
      //     this.getSubDivision= response.data;
      //   }
      //   else{
      //     this.snackbarService.backendWarningSnackBar("Data not found")
      //   }
      // })

            this.districtDataService.getSubDivision(disData,divisionData).subscribe((response:any) => {

            if(!response.error){
            if(response.status === "Success"){
              console.log(response);

              if(response.data.length >  0){
                this.getSubDivision= response.data;
             }
            }
            else{
              this.snackbarService.backendWarningSnackBar("Data not found")
            }
            }
            else{
              this.snackbarService.warningSnackBar(response.error)
            }
            })
            }



  ngOnInit() {
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


      //  getDivisionByDistrict(divId:any){
      //   this.getDivision=[];
      //   this.districtDataService.getDivision(divId).subscribe((response:any) => {
      //   console.log(response);
      //   this.getDivision= response.data;
      //    this.getSubDivision=[];
      // });
      //  }

    //    getSubDivisionByDivision(disId:any,divId:any){
    //     this.getSubDivision=[];
    //     this.districtDataService.getSubDivision(disId,divId).subscribe((response:any) => {
    //     console.log(response);
    //     this.getSubDivision= response.data;
    //   });
    // }



  view(){
    this.showExcel=true;
    this.showFilter=true;
    this.showTable=true;
    const disData= this.dataForm.get('disData')?.value;
    const divisionData = this.dataForm.get('divisionData')?.value;
    const subDivisionData = this.dataForm.get('subDivisionData')?.value;
    this.districtDataService.getPothol(disData, divisionData, subDivisionData).subscribe((response:any) => {
    console.log(response);
    this.dataSource.data = response[1].data;

    this.showData = response[1].data;
      for(let i=0 ; i<this.showData.length ; i++){
       this.data.push({
          "District" : this.showData[i]['potDistrict'],
          "Division ": this.showData[i]['potDivision'],
          "SubDivision": this.showData[i]['potSubDivision'],
                  })
                }
    console.log(this.dataSource.data);

    // this.dataSource = new MatTableDataSource<any>(response.data);
    // console.log(this.dataSource)
  });

  }

     showInExcel(){

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, 'Pothol');
     }
  saveAsExcelFile(buffer:any, fileName:string){

        const data: Blob = new Blob([buffer], {type: this.EXCEL_TYPE});
         FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + this.EXCEL_EXTENSION);

  }

}





