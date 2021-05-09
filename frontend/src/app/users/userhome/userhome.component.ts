import { Component, OnInit } from '@angular/core';
import { Users } from "../../model/users.model";
import { AuthService } from "../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

  userdata = new Users;
  userForm: FormGroup;
  errorMsg : boolean = false;
  error: any;
  isEdited : boolean = false;
  userId : any;

  

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public apiService : ApiService,
    public router: Router) {  }

  ngOnInit() {
    this.getUserDeatils()
  }

  getUserDeatils(){
    if(localStorage.getItem('userId')){
      this.userId = localStorage.getItem('userId')
      this. adminUser(this.userId)
    }
    else{
      this.userId = localStorage.getItem('Id')
      this.loginUser(this.userId)
    }
  }

  loginUser(loginId){
    this.authService.getUserProfile(loginId).subscribe((result) => {
      this.userForm = this.fb.group({
        firstname : [result.users.firstname],
        lastname : [result.users.lastname],
        mobilenumber : [result.users.mobilenumber],
        email : [result.users.email],
        dob : [result.users.dob],
        gender : [result.users.gender],
        roles : [result.users.roles]
      }) 
      
    })
  }

  adminUser(adminId){
    this.apiService.viewUsersProfile(adminId).subscribe((result) => {
     
      this.userForm = this.fb.group({
        firstname : [result.firstname],
        lastname : [result.lastname],
        mobilenumber : [result.mobilenumber],
        email : [result.email],
        dob : [result.dob],
        gender : [result.gender],
        roles : [result.roles]
      }) 
      
    })
  }

 

}
