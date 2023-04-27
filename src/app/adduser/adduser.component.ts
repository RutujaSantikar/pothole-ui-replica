import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import{AdduserService} from './adduser.service';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../users/user.service';
import { SnackbarService } from '../users/snackbar.service';



@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit{

   getDesignation:any[]= [];
   getDistrict:any[]= [];
   getDivision:any[]= [];
   getSubDivision:any[]= [];
   drop1=false;
    drop2=false;
    drop2drop=false;
    drop3=false;

    constructor(private snackbarService:SnackbarService,private userService: UserService,private addUserService: AdduserService,public dialogRef: MatDialogRef<AdduserComponent>) { }

     addUserForm = new FormGroup({
      designation: new FormControl(),
      fullName: new FormControl(),
      emailId: new FormControl(),
      phoneNumber: new FormControl(),
      password: new FormControl(),
      disData: new FormControl(),
      divisionData: new FormControl(),
      subDivisionData: new FormControl(),

     });


     onChangeDesignation(){
      console.log( this.addUserForm)
      const designation= this.addUserForm.value.designation?.degId;
          if(designation == '3' || designation == '4' || designation == '5' || designation == '6' ){
            this.drop1=true;
             this.getDistrict =[];
             this.userService.getDistrict().subscribe((response:any) => {
             console.log(response)
             this.getDistrict = response.data;
             console.log(this.getDistrict);

             });
    }
           if(designation == '5'){
            this.drop2drop=true;
            this.onChangeDistrict();
           }
            if(designation == '6'){
             this.drop2=true;
             this.drop3=true;
             this.onChangeDivision();
           }

}



        onChangeDistrict() {
           const disData = this.addUserForm.value.disData?.disId;
             console.log(disData);
                this.userService.getDivision(disData).subscribe((response:any) => {
                if(!response.error){
                    if(response.status === "Success"){
                      // console.log(response);
                        this.getSubDivision=[];
                        if(response.data.length > 0){
                            this.getDivision= response.data;
                            }
                            else{
                              this.snackbarService.errorSnackBar("record not found")
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
                console.log( this.addUserForm)
                  const disData = this.addUserForm.value.disData?.disId;
                  const divisionData = this.addUserForm.value.divisionData?.divId;
                  console.log(divisionData)
                        // proper error handling
                      this.userService.getSubDivision(disData,divisionData).subscribe((response:any) => {
                      if(!response.error){
                        if(response.status == "Success"){
                            console.log(response);
                          if(response.data.length >  0){
                              this.getSubDivision= response.data;
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

                  getDesignationData(){
                      this.getDesignation =[];
                        this.addUserService.getDesignation().subscribe((response:any) => {
                        console.log(response)
                        this.getDesignation = response.data;
                        console.log(this.getDesignation);
                        });
                      }


  ngOnInit(): void {
    this.getDesignationData();
   }

      addUser(){
        this.addUserService.addUser(this.addUserForm.value).subscribe((response:any) => {
          console.log(response);
        //  console.log(this.addUserForm.value);
          this.dialogRef.close();
          this.snackbarService.successSnackBar("User Added Successfully")
         });
      }

      closeDialog() {
       this.snackbarService.backendWarningSnackBar("User not added");
       this.dialogRef.close();
  }


}


