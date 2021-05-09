import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncludesModule } from "../includes/includes.module";
import { UsersRoutingModule } from './users-routing.module';
import { UserhomeComponent } from './userhome/userhome.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserhomeComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    
    IncludesModule,
    MatSidenavModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
