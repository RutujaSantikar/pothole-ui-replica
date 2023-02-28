import { Component,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogService } from './dialog.service';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {


    message = 'Active'
  constructor(  private dialogService: DialogService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


     ngOnInit(): void {
        console.log(this.data);
        if(this.data.status == 'Y'){

          this.message = 'InActive'
         }
         else{
          this.message = 'Active'
         }

     }



       closeDialog(){
      this.dialogRef.close();
       }
    enable(){
      if(this.data.status == 'Y'){
          this.dialogService.inActiveUser(this.data.usrId).subscribe((response:any) => {

             this.dialogRef.close();

          });
      }
      else{
        this.dialogService.activeUser(this.data.usrId).subscribe((response:any) => {
         this.dialogRef.close();
        });
      }
    }

  //   disable(data:any){
  //  this.dialogService.inActiveUser(this.data.usrId).subscribe((response:any) => {

  //         console.log(response);
  //  });

    // }


}
