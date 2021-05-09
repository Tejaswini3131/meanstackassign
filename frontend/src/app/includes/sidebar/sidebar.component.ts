import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  userRole : boolean = false;

  ngOnInit(): void {
    this.getUserDeatils()
  }

  logout() {
    this.authService.logout()
    
  }

  getUserDeatils(){
    this.authService.getUserProfile(localStorage.getItem('Id')).subscribe((result) => {
      
      if(result.users.roles === "users"){
        this.userRole = true
      }
    })
  }



}
