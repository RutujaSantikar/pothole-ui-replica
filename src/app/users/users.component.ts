import { Component , OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SnackbarService } from './snackbar.service';
import { ResetPswdComponent } from '../reset-pswd/reset-pswd.component';
import { AdduserComponent } from '../adduser/adduser.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  getDistrict:any[]= [];
  getDivision:any[]= [];
  getSubDivision:any[]= [];
  showData:any[]=[];
  data:any[]=[];
  array1:any[]=[];
  array2:any[]=[];
  editBtn=true;
  displayedColumns: string[] = ['srNo','name', 'emailid', 'phone', 'designation','division','subdivision','edit'];
  dataSource = new MatTableDataSource<any>;
  dataSource1 = new MatTableDataSource<any>;
  showTable=false;




  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
  }
  constructor(private userService : UserService, private dialog: MatDialog, private snackbarService : SnackbarService) { }

  userForm = new FormGroup({
      disData: new FormControl(),
      divisionData: new FormControl(),
      subDivisionData: new FormControl(),

    });


     onChangeDistrict() {
        console.log( this.userForm)
          //  const disData = this.userForm.get('disData')?.value;
            const disData = this.userForm.value.disData?.disId;

           console.log(disData);
            this.userService.getDivision(disData).subscribe((response:any) => {
            if(!response.error){
                if(response.status === "Success"){
                  // console.log(response);

                  this.getDivision.push({
                    divId:0,
                    divName:"All"
                  })

                     this.getSubDivision=[];
                     if(response.data.length >  0){

                          this.getDivision.push(...response.data);
                        //  this.getDivision= response.data;
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
        console.log( this.userForm)
        // const disData= this.userForm.get('disData')?.value;
        // const divisionData = this.userForm.get('divisionData')?.value;
         const disData = this.userForm.value.disData?.disId;
          const divisionData = this.userForm.value.divisionData?.divId;
        console.log(divisionData)
                 // proper error handling
              this.userService.getSubDivision(disData,divisionData).subscribe((response:any) => {
              if(!response.error){
                if(response.status == "Success"){


                  this.getSubDivision.push({
                    sudId:0,
                    sudName:"All"

                  })

                  console.log(response);
                   if(response.data.length >  0){

                          this.getSubDivision.push(...response.data);
                      //  this.getSubDivision= response.data;
                         }
                        else{
                           this.snackbarService.errorSnackBar("record not found")
                            }
                 }
                else{
                  this.snackbarService.backendWarningSnackBar("Data not found")
                  this.getSubDivision=[];
                }
              }
              else{
                this.snackbarService.warningSnackBar(response.error)
              }
              })
              }



     ngOnInit() {
      this.getDistrict=[];
      this.userService.getDistrict().subscribe((response:any) => {
      console.log(response);
      this.getDistrict.push({
        disId:0,
        disName:"All"
      })


      this.getDistrict.push(...response.data);
      console.log(this.getDistrict)

      // this.getDistrict= response.data;
      // console.log(this.getDistrict);
  });
     }

         viewData(){

          this.showTable=true;
             console.log(this.userForm)
          // const disData= this.userForm.get('disData')?.value;
          // const divisionData = this.userForm.get('divisionData')?.value;
          // const subDivisionData = this.userForm.get('subDivisionData')?.value;

          const disData = this.userForm.value.disData?.disId;
          const divisionData = this.userForm.value.divisionData?.divId;
          const subDivisionData = this.userForm.value.subDivisionData?.sudId;

          console.log(disData);
          console.log(divisionData);
          console.log(subDivisionData);

          this.userService.getUsers(disData,divisionData,subDivisionData).subscribe((response:any) => {


            for(let i=0; i<response.length; i++){

            if(response[i].usrEnableYn === 'Y'){

              this.array1.push(response[i]);
              this.editBtn=true;

             }
             else if(response[i].usrEnableYn === 'N'){

             this.array2.push(response[i]);
              this.editBtn=false;

             }
            }

            this.dataSource.data = this.array1;
            this.dataSource1.data = this.array2;


          });
          this.array1=[]
          this.array2=[]

          console.log(this.dataSource.data);
          console.log(this.dataSource1.data);


       }

       addNewUser(){
      const dialogRef = this.dialog.open(AdduserComponent, {

          width: '1000px',
      });

       }

       resetPassword(){

           const dialogRef = this.dialog.open(ResetPswdComponent, {

              width: '500px',

           })
       }

   openDialog(row:any) {

       const dialogRef = this.dialog.open(DialogComponent, {

          width: '500px',
          data:{
            usrId:row.usrId,
            status:row.usrEnableYn
          }


       });

   }

}
