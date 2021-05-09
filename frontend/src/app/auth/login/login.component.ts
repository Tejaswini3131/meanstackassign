import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Users } from "../../model/users.model";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator  } from "../../helpers/must-match.validator";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMsg : boolean = false;
  error: any;

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public router: Router) { }

    public errorHandling = (control: string, error: string) => {
      return this.loginForm.controls[control].hasError(error);
    }
  
    reactiveForm() {
      this.loginForm = this.fb.group({
        email : ['', [Validators.required,Validators.email]],
        password : ['', [Validators.required]],
      }
      )
    }

    submitForm() {
      this.authService.login(this.loginForm.value)
    }

  ngOnInit(): void {
    this.reactiveForm()
  }

}
