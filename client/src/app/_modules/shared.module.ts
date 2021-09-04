import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TimeagoModule } from 'ngx-timeago';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }) ,
    PaginationModule.forRoot(),
    TimeagoModule.forRoot()
  ],
  exports: [
    PaginationModule,
    TimeagoModule
    
  ]
})
export class SharedModule { }
