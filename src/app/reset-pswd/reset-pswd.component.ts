import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import{ResetService} from '../reset-pswd/reset.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reset-pswd',
  templateUrl: './reset-pswd.component.html',
  styleUrls: ['./reset-pswd.component.scss']
})
export class ResetPswdComponent implements OnInit{

  getUsers:any[] = [];
  constructor(private resetService:ResetService,public dialogRef: MatDialogRef<ResetPswdComponent>) { }


      resetForm = new FormGroup({
       usrNum: new FormControl(),
      });

    getUserData(){
      console.log(this.resetForm);
      const usrNum = this.resetForm.value.usrNum?.usrPhoneNumber;
       this.resetService.resetPassword(usrNum).subscribe((response:any) => {
        // console.log(response);
        this.getUsers = response;
        console.log(this.getUsers);
      });
    }
  ngOnInit() {

      this.getUserData();

  }

   closeDialog(){

    this.dialogRef.close();
   }

}
