import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common'; 


@NgModule({
  declarations: [
    FooterComponent, 
    HeaderComponent, 
    SidebarComponent
  ],
  imports : [
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    CommonModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ]
})
export class IncludesModule { }
