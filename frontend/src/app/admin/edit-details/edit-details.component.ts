import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog"; 
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent implements OnInit {

  editData : any;
  form: FormGroup;
  errorMsg : boolean = false;
  error: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    ) {
    this.editData = data.firstname
    
    this.form = fb.group({
      firstname: [this.data.firstname],
      lastname: [this.data.lastname],
      gender: [this.data.gender],
      dob: [this.data.dob],
      mobilenumber: [this.data.mobilenumber],
      roles: [this.data.roles],
      email: [this.data.email]
  });
   }

  ngOnInit(): void {
  }

  save() {
    this.dialogRef.close(this.form.value);
}

close() {
  this.dialogRef.close();
}

}
