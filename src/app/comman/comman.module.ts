import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommanRoutingModule } from './comman-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, LeftSidebarComponent],
  imports: [
    CommonModule,
    CommanRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LeftSidebarComponent
  ]
})
export class CommanModule { }
