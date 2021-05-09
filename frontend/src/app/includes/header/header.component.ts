import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName : any;

  constructor(public authService: AuthService) { }

  getUserDeatils(){
    this.authService.getUserProfile(localStorage.getItem('Id')).subscribe((result) => {
      
      this.userName = result.users.firstname
    })
  }

  ngOnInit(): void {
    this.getUserDeatils()
  }

}
