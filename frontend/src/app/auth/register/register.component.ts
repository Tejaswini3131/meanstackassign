import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Users } from "../../model/users.model";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { passwordMatchValidator  } from "../../helpers/must-match.validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  errorMsg : boolean = false;
  error: any;

  constructor( public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
    ) { }

   
   public errorHandling = (control: string, error: string) => {
    return this.myForm.controls[control].hasError(error);
  }

  get f() { 
    return this.myForm.controls; 
  }

  reactiveForm() {
    this.myForm = this.fb.group({
      firstname : ['', [Validators.required]],
      lastname : ['', [Validators.required]],
      mobilenumber : ['', [Validators.required,Validators.minLength(10)]],
      email : ['', [Validators.required,Validators.email]],
      password : ['', [Validators.required,Validators.minLength(6)]],
      confirmpassword : ['', [Validators.required]],
      dob : ['', [Validators.required]],
      gender : ['', [Validators.required]],
      roles : ['', [Validators.required]]
    },
    { validators: this.password.bind(this) }
    )
    
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  


  submitForm() {
    this.authService.register(this.myForm.value).subscribe((result)=>{
      if(result.status){
        alert("Registration Done Successfully")
        this.router.navigateByUrl("auth/login")
      }
    },
    (err) => {
      this.errorMsg = true
    })
  }

  ngOnInit(): void {
    this.reactiveForm()
  }

  

}
