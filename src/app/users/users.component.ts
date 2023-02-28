import { Component , OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from './user.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


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



  @ViewChild(MatPaginator) paginator:any= MatPaginator;
  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;
  }
  constructor(private userService : UserService, private dialog: MatDialog) { }

  userForm = new FormGroup({
      disData: new FormControl(''),
      divisionData: new FormControl(''),
      subDivisionData: new FormControl(''),
    });




       onChangeDistrict() {
           const disData = this.userForm.get('disData')?.value;


           if(disData){
      this.userService.getDivision(disData).subscribe((response:any) => {
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

          onChangeDivision() {

             const disData = this.userForm.get('disData')?.value;
            const divisionData = this.userForm.get('divisionData')?.value;
            this.userService.getSubDivision(disData,divisionData).subscribe((response:any) => {
               this.getSubDivision= response.data;

            });
          }



     ngOnInit() {
      this.getDistrict=[];
      this.userService.getDistrict().subscribe((response:any) => {
      console.log(response);
      this.getDistrict= response.data;
      console.log(this.getDistrict);
  });
     }

         viewData(){

          const disData= this.userForm.get('disData')?.value;
          const divisionData = this.userForm.get('divisionData')?.value;
          const subDivisionData = this.userForm.get('subDivisionData')?.value;
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

          console.log(this.dataSource.data);
          console.log(this.dataSource1.data);


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
