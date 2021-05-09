import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { EditDetailsComponent } from "../edit-details/edit-details.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  getData;
  getId : any;
  isEdited : boolean = false;
  dataSource = [];
  userData : any;
  displayedColumns: string[] = ['Id','Name', 'Mobile number', 'DOB', 'Gender', 'action'];

  constructor(private apiService: ApiService, private dialog: MatDialog,public router: Router,public authService: AuthService) { }

  editData(data) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data
    this.getId = data._id;
   const dialogRef = this.dialog.open(EditDetailsComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(
    data => {
      if(data){
        this.apiService.editData(data, this.getId).subscribe((result) => {
          this.isEdited = true;
          this.getUsersData();
        },
        (err) =>{
          console.log(err)
        } )
      }
      else{
        console.log("Data not edited");
      }
    }
);
  
  }

  getUsersData(){
    this.apiService.getUsersList().subscribe((result) => {
      this.getData = result
      this.dataSource = this.getData
    })
  }

  navigate(userId){
    this.userData = userId._id;
    localStorage.setItem('userId',this.userData)
    this.router.navigateByUrl('/user/dashboard')
    
  }

  ngOnInit() {
    this.getUsersData()
  }




}
